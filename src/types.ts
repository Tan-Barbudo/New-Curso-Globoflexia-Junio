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

export interface AdminStudentProgress {
  userId: string;
  username: string;
  completedLessons: string[];
  joinedDate: string;
  updatedAt: string;
}

export type AccessStatus = 'pending' | 'approved' | 'rejected' | 'blocked';
export type UserRole = 'student' | 'admin';

export const COURSE_IDS = ['globoflexia', 'malabarismo', 'evangelismo', 'trucos', 'clown'] as const;
export type CourseId = typeof COURSE_IDS[number];
export const LEGACY_COURSES: CourseId[] = ['globoflexia', 'malabarismo', 'evangelismo'];
export const COURSE_LABELS: Record<CourseId, string> = {
  globoflexia: 'Globoflexia',
  malabarismo: 'Malabarismo básico',
  evangelismo: 'Evangelismo creativo',
  trucos: 'Trucos creativos',
  clown: 'Descubre tu clown',
};
export function parseCourseAccess(value: unknown): CourseId[] | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? COURSE_IDS.filter(id => value.includes(id)) : [];
}
export function hasCourseAccess(user: AcademyUser, id: string): boolean {
  return user.status === 'approved' && (COURSE_IDS as readonly string[]).includes(id)
    && (user.role === 'admin' || (user.courseAccess ?? LEGACY_COURSES).includes(id as CourseId));
}

export interface AcademyUser {
  courseAccess?: CourseId[];
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  status: AccessStatus;
  role: UserRole;
}
