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
import AdminUsersPanel from './components/AdminUsersPanel';
import AdminProgressPanel from './components/AdminProgressPanel';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { MODULES_DATA } from './data/courseData';
import { auth, db, isFirebaseConfigured } from './firebase';
import {
  AcademyUser,
  AdminStudentProgress,
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
  const [academyUsers, setAcademyUsers] = useState<AcademyUser[]>([]);
  const [academyProgress, setAcademyProgress] = useState<AdminStudentProgress[]>([]);
  const [progressLoading, setProgressLoading] = useState(false);
  const [progressError, setProgressError] = useState('');
  const [usersLoading, setUsersLoading] = useState(false);
  const [busyUserUid, setBusyUserUid] = useState('');
  const [usersError, setUsersError] = useState('');
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
    if (!authUser || profile?.status !== 'approved' || profile.role !== 'admin' || !db) {
      setAcademyUsers([]);
      setUsersLoading(false);
      return;
    }

    setUsersLoading(true);
    setUsersError('');
    const unsubscribe = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        const nextUsers = snapshot.docs.map((userSnapshot) => {
          const data = userSnapshot.data();
          return {
            uid: userSnapshot.id,
            email: String(data.email || ''),
            displayName: String(data.displayName || 'Alumno'),
            photoURL: String(data.photoURL || ''),
            status: data.status,
            role: data.role,
          } as AcademyUser;
        });
        nextUsers.sort((a, b) => {
          if (a.status === 'pending' && b.status !== 'pending') return -1;
          if (a.status !== 'pending' && b.status === 'pending') return 1;
          return a.displayName.localeCompare(b.displayName, 'es');
        });
        setAcademyUsers(nextUsers);
        setUsersLoading(false);
      },
      (error) => {
        console.error('No se pudieron cargar los usuarios:', error);
        setUsersError('No se pudieron cargar las solicitudes. Revisa las reglas de Firestore.');
        setUsersLoading(false);
      },
    );

    return unsubscribe;
  }, [authUser, profile?.role, profile?.status]);

  useEffect(() => {
    if (!authUser || profile?.status !== 'approved' || profile.role !== 'admin' || !db) {
      setAcademyProgress([]);
      setProgressLoading(false);
      return;
    }

    setProgressLoading(true);
    setProgressError('');
    const unsubscribe = onSnapshot(
      collection(db, 'progress'),
      (snapshot) => {
        setAcademyProgress(snapshot.docs.map((progressSnapshot) => {
          const data = progressSnapshot.data();
          return {
            userId: progressSnapshot.id,
            username: String(data.username || 'Alumno'),
            completedLessons: Array.isArray(data.completedLessons)
              ? data.completedLessons.filter((id) => typeof id === 'string')
              : [],
            joinedDate: String(data.joinedDate || ''),
            updatedAt: data.updatedAt ? formatDate(data.updatedAt) : '',
          } as AdminStudentProgress;
        }));
        setProgressLoading(false);
      },
      (error) => {
        console.error('No se pudo cargar el progreso general:', error);
        setProgressError('No se pudo cargar el progreso. Revisa las reglas de Firestore.');
        setProgressLoading(false);
      },
    );

    return unsubscribe;
  }, [authUser, profile?.role, profile?.status]);

  useEffect(() => {
    if (!authUser || profile?.status !== 'approved' || !db) return;

    const storageKey = `tb_stats_${authUser.uid}`;
    const initialStats: UserStats = {
      username: profile.displayName,
      completedLessons: [],
      favoriteLessons: [],
      joinedDate: new Date().toLocaleDateString('es-AR'),
    };
    const savedStats = localStorage.getItem(storageKey);
    if (savedStats) {
      try {
        Object.assign(initialStats, JSON.parse(savedStats));
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    const progressRef = doc(db, 'progress', authUser.uid);
    const unsubscribe = onSnapshot(
      progressRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setStats(initialStats);
          localStorage.setItem(storageKey, JSON.stringify(initialStats));
          void setDoc(progressRef, { ...initialStats, updatedAt: serverTimestamp() });
          return;
        }

        const data = snapshot.data();
        const syncedStats: UserStats = {
          username: String(data.username || profile.displayName),
          completedLessons: Array.isArray(data.completedLessons)
            ? data.completedLessons.filter((id) => typeof id === 'string')
            : [],
          favoriteLessons: Array.isArray(data.favoriteLessons)
            ? data.favoriteLessons.filter((id) => typeof id === 'string')
            : [],
          joinedDate: String(data.joinedDate || initialStats.joinedDate),
        };
        setStats(syncedStats);
        localStorage.setItem(storageKey, JSON.stringify(syncedStats));
      },
      (error) => {
        console.error('No se pudo sincronizar el progreso:', error);
        setStats(initialStats);
      },
    );

    return unsubscribe;
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
        const errorCode = typeof error?.code === 'string' ? error.code : 'error-desconocido';
        const friendlyMessage: Record<string, string> = {
          'auth/popup-blocked': 'El navegador bloqueó la ventana de Google. Permite las ventanas emergentes y vuelve a intentarlo.',
          'auth/unauthorized-domain': 'Este dominio todavía no está autorizado en Firebase.',
          'auth/network-request-failed': 'No se pudo conectar con Google. Revisa la conexión o desactiva temporalmente el bloqueador de anuncios.',
          'auth/cancelled-popup-request': 'Se canceló la ventana anterior. Espera un momento y vuelve a intentarlo.',
        };
        setAuthError(`${friendlyMessage[errorCode] || 'No se pudo ingresar con Google.'} Código: ${errorCode}`);
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

  const handleToggleComplete = async (moduleId: string) => {
    if (!authUser || profile?.status !== 'approved' || !db) return;

    const completedLessons = stats.completedLessons.includes(moduleId)
      ? stats.completedLessons.filter((id) => id !== moduleId)
      : [...stats.completedLessons, moduleId];
    const updatedStats = { ...stats, completedLessons };
    setStats(updatedStats);
    localStorage.setItem(`tb_stats_${authUser.uid}`, JSON.stringify(updatedStats));
    try {
      await setDoc(
        doc(db, 'progress', authUser.uid),
        { ...updatedStats, updatedAt: serverTimestamp() },
        { merge: true },
      );
    } catch (error) {
      console.error('No se pudo guardar el progreso:', error);
    }
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

  const handleUpdateUserAccess = async (user: AcademyUser, status: AcademyUser['status']) => {
    if (!authUser || profile?.status !== 'approved' || profile.role !== 'admin' || !db) return;
    if (user.uid === authUser.uid) {
      setUsersError('Tu cuenta administradora no puede bloquearse desde este panel.');
      return;
    }

    setBusyUserUid(user.uid);
    setUsersError('');
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('No se pudo actualizar el acceso:', error);
      setUsersError('No se pudo guardar el cambio. Inténtalo nuevamente.');
    } finally {
      setBusyUserUid('');
    }
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
        currentUserProfile={profile}
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
        adminUsersPanel={(
          <AdminUsersPanel
            users={academyUsers}
            currentUserUid={authUser.uid}
            isLoading={usersLoading}
            busyUserUid={busyUserUid}
            error={usersError}
            onUpdateAccess={handleUpdateUserAccess}
          />
        )}
        adminProgressPanel={(
          <AdminProgressPanel
            users={academyUsers}
            progress={academyProgress}
            modules={modules}
            isLoading={usersLoading || progressLoading}
            error={progressError}
          />
        )}
      />
    </div>
  );
}
