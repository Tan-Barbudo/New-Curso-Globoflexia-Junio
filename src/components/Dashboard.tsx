import React, { useState } from 'react';
import { LessonModule, ForumComment, UserStats, DocumentAsset } from '../types';
import { 
  LogOut, 
  Menu, 
  BookOpen, 
  Video, 
  FileText, 
  MessageCircle, 
  Award, 
  Gift, 
  ChevronRight, 
  CheckCircle, 
  X, 
  Play, 
  Flame, 
  Compass, 
  Heart, 
  Activity,
  Smile,
  Instagram,
  Youtube,
  Facebook,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import VideoPlayer from './VideoPlayer';
import DocumentsTab from './DocumentsTab';
import ForumTab from './ForumTab';
import BalloonInflater from './BalloonInflater';
import CourseCustomizer from './CourseCustomizer';

interface DashboardProps {
  currentUser: string;
  modulesData: LessonModule[];
  documentsList: DocumentAsset[];
  forumComments: ForumComment[];
  userStats: UserStats;
  onLogout: () => void;
  onToggleLessonComplete: (id: string) => void;
  onAddComment: (content: string, category: 'Duda' | 'Logro' | 'Inspiración' | 'General') => void;
  onAddReply: (commentId: string, content: string) => void;
  onToggleCommentLike: (commentId: string) => void;
  onUpdateModules: (updatedModules: LessonModule[]) => void;
}

export default function Dashboard({
  currentUser,
  modulesData,
  documentsList,
  forumComments,
  userStats,
  onLogout,
  onToggleLessonComplete,
  onAddComment,
  onAddReply,
  onToggleCommentLike,
  onUpdateModules
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'documents' | 'forum' | 'game' | 'admin'>('video');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mod-1');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter modules
  const regularModules = modulesData.filter(m => !m.isBonus);
  const bonusModules = modulesData.filter(m => m.isBonus);

  // Selected module data
  const activeModule = modulesData.find(m => m.id === selectedModuleId) || modulesData[0];

  // Progress calculations
  const totalLessonsCount = modulesData.length;
  const completedCount = userStats.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessonsCount) * 100);

  // Find level rank based on completed lessons count
  const getLevelRank = (count: number) => {
    if (count === 0) return 'Globo Recluta 🍼';
    if (count < 4) return 'Inflador Novato 🎈';
    if (count < 8) return 'Guerrero de Torsiones ⚔️';
    if (count < 12) return 'Modelador Estrella 🌟';
    if (count < 17) return 'Maestro Barbudo de Honor 🎓';
    return 'Campeón Celestial del Látex 🏆';
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col" id="dashboard-wrapper">
      {/* Dynamic Header Navbar banner replicating "Tan Barbudo's" actual social banners */}
      <header className="bg-brand-dark border-b-4 border-brand-dark sticky top-0 z-40 text-white" id="main-header">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Logo brand & Hamburger Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-xl border border-white/20"
              id="hamburger-menu"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            
            {/* Elegant Tan Barbudo Interactive Badge logo */}
            <div className="flex items-center gap-2">
              <div className="bg-brand-red text-white text-base md:text-xl font-display font-bold px-3 py-1.5 rounded-xl border border-brand-yellow transform -rotate-1 tracking-tight">
                <span className="text-brand-yellow">T</span>AN <span className="text-brand-green">B</span>ARBUDO
              </div>
              <span className="hidden md:inline-block text-[10px] uppercase font-bold tracking-widest text-[#FFF4E6] opacity-85">
                Diversión que transforma corazones
              </span>
            </div>
          </div>

          {/* Social logos simulation exactly like the shared image info */}
          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Redes:</span>
            <a href="https://www.instagram.com/payasotanbarbudo?igsh=dWo2a3U0ZmhiNWdn" target="_blank" rel="noopener noreferrer" className="hover:text-brand-salmon text-gray-300 transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="https://youtube.com/@payasotanbarbudo?si=orYgWrJ4gCb75uxn" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red text-gray-300 transition-colors"><Youtube className="w-4 h-4" /></a>
            <a href="https://www.facebook.com/share/1CyiA78nQJ/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue text-gray-300 transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="https://www.tiktok.com/@payasotanbarbudo?_r=1&_t=ZS-94L1Ar177eG" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow text-gray-300 transition-colors" title="TikTok"><span className="text-xs font-bold leading-none">🎵</span></a>
          </div>

          {/* User profile & Signout */}
          <div className="flex items-center gap-3">
            <div className="text-end hidden sm:block">
              <p className="text-xs font-bold text-[#FFF4E6]">{currentUser}</p>
              <p className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest">
                {getLevelRank(completedCount)}
              </p>
            </div>
            
            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${currentUser.split('@')[0]}`}
              alt={currentUser}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full border border-brand-yellow bg-white"
            />

            <button
              onClick={onLogout}
              id="logout-button"
              className="p-2 ml-1 bg-brand-red/20 border border-brand-red/30 rounded-xl cursor-pointer hover:bg-brand-red text-brand-red hover:text-white transition-all text-xs font-bold flex items-center gap-1"
              title="Salir del aula"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slogans block: Propósito, Amor, Corazones */}
      <div className="bg-[#FFF4E6] border-y-3 border-brand-dark py-1.5 px-4 overflow-hidden" id="slogans-marquee">
        <div className="max-w-7xl mx-auto flex items-center justify-around gap-4 text-center font-display text-[11px] md:text-xs font-bold text-brand-dark uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-brand-green" /> entretenemos con propósito</span>
          <span className="hidden sm:inline text-gray-300">•</span>
          <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-brand-red animate-pulse" /> enseñamos con amor</span>
          <span className="hidden sm:inline text-gray-300">•</span>
          <span className="flex items-center gap-1.5"><Smile className="w-4 h-4 text-brand-yellow" /> transformamos corazones</span>
        </div>
      </div>

      {/* Primary Layout Frame */}
      <div className="flex-1 flex" id="main-frame-dashboard">
        {/* Sidebar Container: Lesson Plan menu */}
        <aside
          className={`fixed inset-y-0 left-0 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-72 bg-white border-r-3 border-brand-dark flex flex-col justify-between`}
          id="course-sidebar-navigation"
        >
          {/* List of lessons program */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Sidebar Title / Header closing button in mobile */}
            <div className="flex justify-between items-center pb-2 border-b-2 border-brand-dark/10">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-brand-yellow" />
                Programa del Curso
              </h3>
              <button
                className="lg:hidden p-1.5 hover:bg-gray-100 rounded-full"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5 text-brand-dark" />
              </button>
            </div>

            {/* Part 1: Regular Modules (13) */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-2 pl-1">
                Clases Teóricas y Prácticas (13)
              </p>
              
              <div className="space-y-1" id="regular-modules-sidebar-list">
                {regularModules.map((m) => {
                  const active = m.id === selectedModuleId;
                  const isDone = userStats.completedLessons.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedModuleId(m.id);
                        setActiveTab('video');
                        setSidebarOpen(false);
                      }}
                      className={`cursor-pointer w-full text-start p-2.5 rounded-xl border-2 transition-all flex items-center justify-between gap-2 ${
                        active 
                          ? 'bg-brand-yellow/10 border-brand-yellow text-brand-dark' 
                          : 'bg-transparent border-transparent text-gray-600 hover:bg-brand-beige/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isDone ? (
                          <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 fill-current" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-brand-dark/20 rounded-full flex-shrink-0" />
                        )}
                        <span className={`text-xs font-bold truncate ${active ? 'text-brand-dark font-black' : ''}`}>
                          {m.title}
                        </span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 opacity-40 ${active ? 'translate-x-0.5 opacity-100 text-brand-yellow' : ''}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Part 2: Bonus Modules (4) */}
            <div className="space-y-1 pt-3 border-t border-dashed border-gray-100">
              <p className="text-[10px] font-bold text-brand-salmon uppercase tracking-widest mb-2 pl-1 flex items-center gap-1">
                <Gift className="w-3 h-3 text-brand-salmon" />
                Regalos de Bonus Especial (4)
              </p>

              <div className="space-y-1" id="bonus-modules-sidebar-list">
                {bonusModules.map((m) => {
                  const active = m.id === selectedModuleId;
                  const isDone = userStats.completedLessons.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedModuleId(m.id);
                        setActiveTab('video');
                        setSidebarOpen(false);
                      }}
                      className={`cursor-pointer w-full text-start p-2.5 rounded-xl border-2 transition-all flex items-center justify-between gap-2 ${
                        active 
                          ? 'bg-brand-salmon/10 border-brand-salmon text-brand-dark' 
                          : 'bg-transparent border-transparent text-gray-600 hover:bg-brand-beige/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isDone ? (
                          <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 fill-current" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-brand-dark/20 rounded-full flex-shrink-0" />
                        )}
                        <span className={`text-xs font-bold truncate ${active ? 'text-brand-dark font-black' : ''}`}>
                          {m.title.replace('Bonus ', 'B')}
                        </span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 opacity-40 ${active ? 'translate-x-0.5 opacity-100 text-brand-salmon' : ''}`} />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Slogan card bottom sidebar */}
          <div className="p-4 bg-brand-dark text-white border-t-3 border-brand-dark">
            <div className="bg-[#1F4F4A] rounded-xl p-3 border border-brand-green/30">
              <p className="text-[10px] font-bold text-brand-green uppercase tracking-wide">💡 Ley del Éxito:</p>
              <p className="text-[10px] text-gray-300 mt-1 leading-normal">
                "La consistencia genera confianza. Haz lo mismo, con el mismo tono y la misma energía todos los días."
              </p>
            </div>
          </div>
        </aside>

        {/* Central main panel container */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-5xl mx-auto space-y-6" id="dashboard-main-panel">
          
          {/* Interactive Progress Board card */}
          <div className="bg-white border-4 border-brand-dark rounded-3xl p-5 md:p-6 sticker-shadow grid grid-cols-1 md:grid-cols-3 gap-6" id="progress-metric-plate">
            {/* Percentage completed Dial */}
            <div className="md:col-span-1 flex items-center gap-4 border-b md:border-b-0 md:border-r border-dashed border-gray-200 pb-4 md:pb-0 md:pr-4">
              <div className="relative w-16 h-16 rounded-full bg-brand-beige flex items-center justify-center border-3 border-brand-dark flex-shrink-0">
                <span className="font-display font-black text-sm text-brand-dark">{progressPercent}%</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-display font-bold text-xs uppercase tracking-wide text-gray-400">Progreso del Alumno</h4>
                <p className="text-sm font-black text-brand-dark mt-0.5">
                  {completedCount} de {totalLessonsCount} Clases
                </p>
                <div className="w-full bg-gray-100 h-2 rounded-full border border-brand-dark overflow-hidden mt-1.5">
                  <div className="bg-brand-green h-full" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Streak & Active Status */}
            <div className="md:col-span-1 flex items-center gap-4 border-b md:border-b-0 md:border-r border-dashed border-gray-200 pb-4 md:pb-0 md:pr-4">
              <div className="w-12 h-12 bg-brand-red/15 rounded-2xl border-2 border-brand-dark flex items-center justify-center text-xl text-brand-red flex-shrink-0">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wide text-gray-400">Racha de Hoy</h4>
                <p className="text-sm font-black text-brand-dark mt-0.5">¡Estudiante Activo! 🔥</p>
                <p className="text-[10px] text-gray-500">Uniendo puntos con amor y risas.</p>
              </div>
            </div>

            {/* Rank / Grade Badge */}
            <div className="md:col-span-1 flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-blue/15 rounded-2xl border-2 border-brand-dark flex items-center justify-center text-xl text-brand-blue flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wide text-gray-400">Rango de Graduado</h4>
                <p className="text-sm font-black text-brand-dark truncate mt-0.5">{getLevelRank(completedCount)}</p>
                <p className="text-[10px] text-gray-500">Completado {progressPercent}% del camino.</p>
              </div>
            </div>
          </div>

          {/* Dynamic Module Tabs switches */}
          <div className="flex flex-wrap gap-2.5 border-b-3 border-brand-dark pb-1" id="tab-selectors-navbar">
            <button
              onClick={() => setActiveTab('video')}
              id="tab-video-button"
              className={`cursor-pointer px-4 py-3 rounded-t-2xl font-display font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 border-t-3 border-x-3 transition-all ${
                activeTab === 'video'
                  ? 'bg-white border-brand-dark text-brand-dark translate-y-[3px]'
                  : 'bg-transparent border-transparent text-gray-500 hover:text-brand-dark'
              }`}
            >
              <Video className="w-4.5 h-4.5 text-brand-red" />
              <span>Ver Clase</span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              id="tab-documents-button"
              className={`cursor-pointer px-4 py-3 rounded-t-2xl font-display font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 border-t-3 border-x-3 transition-all ${
                activeTab === 'documents'
                  ? 'bg-white border-brand-dark text-brand-dark translate-y-[3px]'
                  : 'bg-transparent border-transparent text-gray-500 hover:text-brand-dark'
              }`}
            >
              <FileText className="w-4.5 h-4.5 text-brand-blue" />
              <span>Documentos ({documentsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('forum')}
              id="tab-forum-button"
              className={`cursor-pointer px-4 py-3 rounded-t-2xl font-display font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 border-t-3 border-x-3 transition-all ${
                activeTab === 'forum'
                  ? 'bg-white border-brand-dark text-brand-dark translate-y-[3px]'
                  : 'bg-transparent border-transparent text-gray-500 hover:text-brand-dark'
              }`}
            >
              <MessageCircle className="w-4.5 h-4.5 text-brand-salmon" />
              <span>Foro y Dudas ({forumComments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('game')}
              id="tab-game-button"
              className={`cursor-pointer px-4 py-3 rounded-t-2xl font-display font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 border-t-3 border-x-3 transition-all ${
                activeTab === 'game'
                  ? 'bg-white border-brand-dark text-brand-dark translate-y-[3px]'
                  : 'bg-transparent border-transparent text-gray-500 hover:text-brand-dark'
              }`}
            >
              <Activity className="w-4.5 h-4.5 text-brand-green" />
              <span>Doblado Virtual 🎈</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              id="tab-admin-button"
              className={`cursor-pointer px-4 py-3 rounded-t-2xl font-display font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 border-t-3 border-x-3 transition-all ${
                activeTab === 'admin'
                  ? 'bg-white border-brand-dark text-brand-dark translate-y-[3px]'
                  : 'bg-transparent border-transparent text-gray-500 hover:text-brand-dark'
              }`}
            >
              <Sparkles className="w-4.5 h-4.5 text-brand-yellow animate-pulse" />
              <span>Personalizar Aula ⚙️</span>
            </button>
          </div>

          {/* Active rendering block views */}
          <div className="pt-2" id="rendered-tab-view">
            <AnimatePresence mode="wait">
              {activeTab === 'video' && (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <VideoPlayer
                    module={activeModule}
                    isCompleted={userStats.completedLessons.includes(activeModule.id)}
                    onToggleComplete={onToggleLessonComplete}
                    onNavigateToDocs={() => setActiveTab('documents')}
                  />
                </motion.div>
              )}

              {activeTab === 'documents' && (
                <motion.div
                  key="documents"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <DocumentsTab documentsList={documentsList} />
                </motion.div>
              )}

              {activeTab === 'forum' && (
                <motion.div
                  key="forum"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <ForumTab
                    comments={forumComments}
                    currentUser={currentUser}
                    onAddComment={onAddComment}
                    onAddReply={onAddReply}
                    onToggleLike={onToggleCommentLike}
                  />
                </motion.div>
              )}

              {activeTab === 'game' && (
                <motion.div
                  key="game"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="max-w-xl mx-auto"
                >
                  <BalloonInflater />
                </motion.div>
              )}

              {activeTab === 'admin' && (
                <motion.div
                  key="admin"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <CourseCustomizer
                    modules={modulesData}
                    onUpdateModules={onUpdateModules}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </main>
      </div>

      {/* Primary Brand Slogan footer */}
      <footer className="bg-brand-dark text-white border-t-4 border-brand-dark py-6 mt-12 text-center text-xs space-y-2" id="branding-footer">
        <p className="font-display font-medium text-gray-300">
          "Un globo inflado de aire dibuja una sonrisa; un globo modelado con amor transforma un corazón."
        </p>
        <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">
          © 2026 Academia de Globoflexia Tan Barbudo • Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
