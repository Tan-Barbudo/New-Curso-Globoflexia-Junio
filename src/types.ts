export interface DocumentAsset {
  id: string;
  title: string;
  size: string;
  format: string;
  downloadUrl: string;
  description: string;
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  isBonus: boolean;
  order: number;
  duration: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  learnPoints: string[];
  videoUrl: string;
  videoThumbnail: string;
  isCompleted?: boolean;
  documents?: DocumentAsset[];
}

export interface ForumReply {
  id: string;
  authorUid?: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'Alumno' | 'Profesor' | 'Admin';
  date: string;
  content: string;
}

export interface ForumComment {
  id: string;
  authorUid?: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'Alumno' | 'Profesor' | 'Admin';
  date: string;
  content: string;
  category: 'Duda' | 'Logro' | 'Inspiración' | 'General';
  likes: number;
  likedByCurrentUser?: boolean;
  replies: ForumReply[];
}

export interface UserStats {
  username: string;
  completedLessons: string[]; // List of module ids
  favoriteLessons: string[]; // List of module ids
  joinedDate: string;
}

export type AccessStatus = 'pending' | 'approved' | 'rejected' | 'blocked';
export type UserRole = 'student' | 'admin';

export interface AcademyUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  status: AccessStatus;
  role: UserRole;
}
