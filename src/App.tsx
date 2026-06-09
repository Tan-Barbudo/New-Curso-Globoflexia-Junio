import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { MODULES_DATA, INITIAL_COMMENTS } from './data/courseData';
import { LessonModule, ForumComment, UserStats, DocumentAsset } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [modules, setModules] = useState<LessonModule[]>([]);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [stats, setStats] = useState<UserStats>({
    username: '',
    completedLessons: [],
    favoriteLessons: [],
    joinedDate: new Date().toLocaleDateString(),
  });

  // 1. Initial hydration and Firebase listener if configured
  useEffect(() => {
    // Current logged in user
    const savedUser = localStorage.getItem('tb_current_user');
    if (savedUser) {
      setCurrentUser(savedUser);
      hydrateUserData(savedUser);
    }

    // Hydrate modules definition
    const savedModules = localStorage.getItem('tb_modules_list');
    if (savedModules) {
      setModules(JSON.parse(savedModules));
    } else {
      setModules(MODULES_DATA);
      localStorage.setItem('tb_modules_list', JSON.stringify(MODULES_DATA));
    }

    // Hydrate forum comments
    const savedComments = localStorage.getItem('tb_forum_comments_list');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      setComments(INITIAL_COMMENTS);
      localStorage.setItem('tb_forum_comments_list', JSON.stringify(INITIAL_COMMENTS));
    }

    
  }, []);

  const hydrateUserData = (username: string) => {
    const userStatsKey = `tb_stats_${username}`;
    const savedStats = localStorage.getItem(userStatsKey);
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    } else {
      const initialStats: UserStats = {
        username,
        completedLessons: ['mod-1'], // Pre-complete introduction to make dashboard progress bar exciting!
        favoriteLessons: [],
        joinedDate: new Date().toLocaleDateString(),
      };
      setStats(initialStats);
      localStorage.setItem(userStatsKey, JSON.stringify(initialStats));
    }
  };

  // 2. Handle Login action
  const handleLogin = (username: string) => {
    setCurrentUser(username);
    localStorage.setItem('tb_current_user', username);
    hydrateUserData(username);
  };

  // 3. Handle Logout action
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('tb_current_user');
  };

  // 4. Marking classes completed toggler
  const handleToggleComplete = (moduleId: string) => {
    if (!currentUser) return;
    
    const isCompleted = stats.completedLessons.includes(moduleId);
    let updatedCompletedList: string[];

    if (isCompleted) {
      updatedCompletedList = stats.completedLessons.filter((id) => id !== moduleId);
    } else {
      updatedCompletedList = [...stats.completedLessons, moduleId];
    }

    const updatedStats = { ...stats, completedLessons: updatedCompletedList };
    setStats(updatedStats);
    localStorage.setItem(`tb_stats_${currentUser}`, JSON.stringify(updatedStats));
  };

  // 5. Forum additions (Fresh post)
  const handleAddComment = async (content: string, category: 'Duda' | 'Logro' | 'Inspiración' | 'General') => {
    if (!currentUser) return;

    const newComment: ForumComment = {
      id: `comment-${Date.now()}`,
      authorName: currentUser.includes('@') ? currentUser.split('@')[0] : currentUser,
      authorAvatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${currentUser.split('@')[0]}`,
      authorRole: 'Alumno',
      date: 'Hace un momento',
      content,
      category,
      likes: 0,
      replies: [],
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('tb_forum_comments_list', JSON.stringify(updatedComments));

  
  };

  // 6. Forum Replies additions
  const handleAddReply = async (commentId: string, replyContent: string) => {
    if (!currentUser) return;

    let targetComment: ForumComment | null = null;

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updated = {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: `reply-${Date.now()}`,
              authorName: currentUser.includes('@') ? currentUser.split('@')[0] : currentUser,
              authorAvatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${currentUser.split('@')[0]}`,
              authorRole: 'Alumno' as const,
              date: 'Hace un momento',
              content: replyContent,
            },
          ],
        };
        targetComment = updated;
        return updated;
      }
      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem('tb_forum_comments_list', JSON.stringify(updatedComments));

   
  };

  // 7. Toggle comment likes count
  const handleToggleCommentLike = async (commentId: string) => {
    let targetComment: ForumComment | null = null;

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const liked = comment.likedByCurrentUser;
        const updated = {
          ...comment,
          likes: liked ? comment.likes - 1 : comment.likes + 1,
          likedByCurrentUser: !liked,
        };
        targetComment = updated;
        return updated;
      }
      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem('tb_forum_comments_list', JSON.stringify(updatedComments));

  
  };

  // Aggregate all files documents from modules
  const allDocuments: DocumentAsset[] = [];
  const seenDocIds = new Set<string>();

  modules.forEach((mod) => {
    if (mod.documents) {
      mod.documents.forEach((doc) => {
        if (!seenDocIds.has(doc.id)) {
          seenDocIds.add(doc.id);
          allDocuments.push(doc);
        }
      });
    }
  });

  // 8. Handle real-time modules editing
  const handleUpdateModules = async (updatedModules: LessonModule[]) => {
    setModules(updatedModules);
    localStorage.setItem('tb_modules_list', JSON.stringify(updatedModules));

   
     
  };

  return (
    <div id="app-viewport-root">
      {currentUser ? (
        <Dashboard
          currentUser={currentUser}
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
      ) : (
        <Login onLoginSuccess={handleLogin} />
      )}
    </div>
  );
}
