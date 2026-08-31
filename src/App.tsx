import React, { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import AccessStatus from './components/AccessStatus';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { MODULES_DATA } from './data/courseData';
import { auth, db, isFirebaseConfigured } from './firebase';
import {
  AcademyUser,
  DocumentAsset,
  ForumComment,
  ForumReply,
  LessonModule,
  UserStats,
} from './types';

type FirestoreTimestamp = { toDate?: () => Date } | null | undefined;

const formatDate = (value: FirestoreTimestamp) => {
  const date = value && typeof value.toDate === 'function' ? value.toDate() : null;
  if (!date) return 'Ahora';

  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const avatarFor = (user: User) =>
  user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user.uid)}`;

export default function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AcademyUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signInLoading, setSignInLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [modules, setModules] = useState<LessonModule[]>(MODULES_DATA);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [stats, setStats] = useState<UserStats>({
    username: '',
    completedLessons: [],
    favoriteLessons: [],
    joinedDate: new Date().toLocaleDateString('es-AR'),
  });

  useEffect(() => {
    if (!isFirebaseConfigured || !auth || !db) {
      setAuthError('Firebase todavía no está configurado. Comunícate con el administrador.');
      setAuthLoading(false);
      return;
    }

    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      unsubscribeProfile?.();
      unsubscribeProfile = undefined;
      setAuthUser(user);
      setProfile(null);
      setAuthError('');

      if (!user) {
        setAuthLoading(false);
        return;
      }

      setAuthLoading(true);
      const userRef = doc(db, 'users', user.uid);

      try {
        const userSnapshot = await getDoc(userRef);
        if (!userSnapshot.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || user.email?.split('@')[0] || 'Alumno',
            photoURL: avatarFor(user),
            status: 'pending',
            role: 'student',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }

        unsubscribeProfile = onSnapshot(
          userRef,
          (snapshot) => {
            if (!snapshot.exists()) {
              setAuthError('No se pudo encontrar tu solicitud de acceso.');
              setAuthLoading(false);
              return;
            }

            const data = snapshot.data();
            setProfile({
              uid: user.uid,
              email: String(data.email || user.email || ''),
              displayName: String(data.displayName || user.displayName || 'Alumno'),
              photoURL: String(data.photoURL || avatarFor(user)),
              status: data.status,
              role: data.role,
            });
            setAuthLoading(false);
          },
          (error) => {
            console.error('No se pudo leer el perfil:', error);
            setAuthError('No se pudo verificar tu autorización. Inténtalo nuevamente.');
            setAuthLoading(false);
          },
        );
      } catch (error) {
        console.error('No se pudo crear la solicitud de acceso:', error);
        setAuthError('No se pudo registrar tu solicitud. Revisa la conexión e inténtalo nuevamente.');
        setAuthLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProfile?.();
    };
  }, []);

  useEffect(() => {
    if (!authUser || profile?.status !== 'approved' || !db) {
      setComments([]);
      return;
    }

    const forumQuery = query(collection(db, 'forum'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      forumQuery,
      async (snapshot) => {
        const nextComments = await Promise.all(
          snapshot.docs.map(async (commentSnapshot) => {
            const data = commentSnapshot.data();
            const repliesSnapshot = await getDocs(
              query(collection(db, 'forum', commentSnapshot.id, 'replies'), orderBy('createdAt', 'asc')),
            );
            const replies: ForumReply[] = repliesSnapshot.docs.map((replySnapshot) => {
              const reply = replySnapshot.data();
              return {
                id: replySnapshot.id,
                authorUid: String(reply.authorUid || ''),
                authorName: String(reply.authorName || 'Alumno'),
                authorAvatar: String(reply.authorAvatar || ''),
                authorRole: reply.authorRole === 'Admin' ? 'Admin' : 'Alumno',
                date: formatDate(reply.createdAt),
                content: String(reply.content || ''),
              };
            });
            const likedBy = Array.isArray(data.likedBy) ? data.likedBy.filter((uid) => typeof uid === 'string') : [];

            return {
              id: commentSnapshot.id,
              authorUid: String(data.authorUid || ''),
              authorName: String(data.authorName || 'Alumno'),
              authorAvatar: String(data.authorAvatar || ''),
              authorRole: data.authorRole === 'Admin' ? 'Admin' : 'Alumno',
              date: formatDate(data.createdAt),
              content: String(data.content || ''),
              category: data.category,
              likes: likedBy.length,
              likedByCurrentUser: likedBy.includes(authUser.uid),
              replies,
            } as ForumComment;
          }),
        );

        setComments(nextComments);
      },
      (error) => {
        console.error('No se pudo cargar el foro:', error);
        setComments([]);
      },
    );

    return unsubscribe;
  }, [authUser, profile?.status]);

  useEffect(() => {
    if (!authUser || profile?.status !== 'approved') return;

    const storageKey = `tb_stats_${authUser.uid}`;
    const savedStats = localStorage.getItem(storageKey);
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
        return;
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    const initialStats: UserStats = {
      username: profile.displayName,
      completedLessons: [],
      favoriteLessons: [],
      joinedDate: new Date().toLocaleDateString('es-AR'),
    };
    setStats(initialStats);
    localStorage.setItem(storageKey, JSON.stringify(initialStats));
  }, [authUser, profile]);

  const handleGoogleSignIn = async () => {
    if (!auth) return;
    setSignInLoading(true);
    setAuthError('');

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error?.code !== 'auth/popup-closed-by-user') {
        console.error('Error al ingresar con Google:', error);
        setAuthError('No se pudo ingresar con Google. Inténtalo nuevamente.');
      }
    } finally {
      setSignInLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    setComments([]);
  };

  const handleToggleComplete = (moduleId: string) => {
    if (!authUser || profile?.status !== 'approved') return;

    const completedLessons = stats.completedLessons.includes(moduleId)
      ? stats.completedLessons.filter((id) => id !== moduleId)
      : [...stats.completedLessons, moduleId];
    const updatedStats = { ...stats, completedLessons };
    setStats(updatedStats);
    localStorage.setItem(`tb_stats_${authUser.uid}`, JSON.stringify(updatedStats));
  };

  const handleAddComment = async (
    content: string,
    category: 'Duda' | 'Logro' | 'Inspiración' | 'General',
  ) => {
    if (!authUser || !profile || profile.status !== 'approved' || !db) return;

    await addDoc(collection(db, 'forum'), {
      authorUid: authUser.uid,
      authorName: profile.displayName,
      authorAvatar: profile.photoURL,
      authorRole: profile.role === 'admin' ? 'Admin' : 'Alumno',
      content,
      category,
      likedBy: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  const handleAddReply = async (commentId: string, content: string) => {
    if (!authUser || !profile || profile.status !== 'approved' || !db) return;

    await addDoc(collection(db, 'forum', commentId, 'replies'), {
      authorUid: authUser.uid,
      authorName: profile.displayName,
      authorAvatar: profile.photoURL,
      authorRole: profile.role === 'admin' ? 'Admin' : 'Alumno',
      content,
      createdAt: serverTimestamp(),
    });
    await updateDoc(doc(db, 'forum', commentId), { updatedAt: serverTimestamp() });
  };

  const handleToggleCommentLike = async (commentId: string) => {
    if (!authUser || profile?.status !== 'approved' || !db) return;

    const commentRef = doc(db, 'forum', commentId);
    await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(commentRef);
      if (!snapshot.exists()) return;

      const data = snapshot.data();
      const likedBy = Array.isArray(data.likedBy) ? data.likedBy.filter((uid) => typeof uid === 'string') : [];
      const updatedLikedBy = likedBy.includes(authUser.uid)
        ? likedBy.filter((uid) => uid !== authUser.uid)
        : [...likedBy, authUser.uid];

      transaction.update(commentRef, {
        likedBy: updatedLikedBy,
        updatedAt: serverTimestamp(),
      });
    });
  };

  const handleUpdateModules = (updatedModules: LessonModule[]) => {
    if (profile?.role !== 'admin') return;
    setModules(updatedModules);
  };

  const allDocuments: DocumentAsset[] = [];
  const seenDocIds = new Set<string>();
  modules.forEach((module) => {
    module.documents?.forEach((document) => {
      if (!seenDocIds.has(document.id)) {
        seenDocIds.add(document.id);
        allDocuments.push(document);
      }
    });
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center">
        <div className="text-center">
          <img src="/New-Curso-Globoflexia-Junio/logo.jpg" alt="Tan Barbudo" className="h-24 mx-auto object-contain" />
          <p className="mt-4 text-sm font-bold text-brand-dark">Verificando tu acceso…</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return <Login onGoogleSignIn={handleGoogleSignIn} isLoading={signInLoading} error={authError} />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center p-4">
        <div className="max-w-md bg-white border-4 border-brand-dark rounded-3xl p-7 text-center sticker-shadow-lg">
          <p className="font-bold text-brand-red">{authError || 'No se pudo verificar tu cuenta.'}</p>
          <button onClick={handleLogout} className="mt-5 px-5 py-3 border-2 border-brand-dark rounded-xl font-bold">
            Volver a ingresar
          </button>
        </div>
      </div>
    );
  }

  if (profile.status !== 'approved') {
    return <AccessStatus profile={profile} onLogout={handleLogout} />;
  }

  return (
    <div id="app-viewport-root">
      <Dashboard
        currentUser={profile.displayName}
        modulesData={modules}
        documentsList={allDocuments}
        forumComments={comments}
        userStats={stats}
        onLogout={handleLogout}
        onToggleLessonComplete={handleToggleComplete}
        onAddComment={handleAddComment}
        onAddReply={handleAddReply}
        onToggleCommentLike={handleToggleCommentLike}
        onUpdateModules={handleUpdateModules}
      />
    </div>
  );
}
