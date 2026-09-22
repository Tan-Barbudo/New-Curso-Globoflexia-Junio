import React from 'react';
import { ArrowRight, CircleDot, Dices, Drama, HeartHandshake, LogOut, Sparkles } from 'lucide-react';
import { AcademyUser, LessonModule, UserStats } from '../types';

interface LearningHubProps {
  profile: AcademyUser;
  modules: LessonModule[];
  stats: UserStats;
  onOpenCourse: (courseId: string) => void;
  onLogout: () => void;
}

const additionalCourses = [
  {
    id: 'malabarismo',
    title: 'Malabarismo básico',
    description: 'Pelotas, frutas, clavas, diábolo, platos chinos y tu primera rutina.',
    icon: CircleDot,
    color: 'text-brand-blue',
    background: 'bg-brand-blue/10',
    available: true,
    moduleId: 'malabarismo-intro',
  },
  {
    id: 'trucos',
    title: 'Trucos creativos',
    description: 'Elaboración, estructura y presentación de trucos con propósito.',
    icon: Dices,
    color: 'text-brand-yellow',
    background: 'bg-brand-yellow/10',
    available: false,
  },
  {
    id: 'clown',
    title: 'Descubre tu clown',
    description: 'Un recorrido de 21 días para encontrar tu personaje y expresión.',
    icon: Drama,
    color: 'text-brand-red',
    background: 'bg-brand-red/10',
    available: false,
  },
  {
    id: 'evangelismo',
    title: 'Evangelismo creativo',
    description: 'Herramientas visuales y creativas para compartir el mensaje de Jesús.',
    icon: HeartHandshake,
    color: 'text-brand-green',
    background: 'bg-brand-green/10',
    available: true,
    moduleId: 'evangelismo-intro',
  },
];

export default function LearningHub({ profile, modules, stats, onOpenCourse, onLogout }: LearningHubProps) {
  const availableModules = modules.filter((module) => Boolean(module.videoUrl));
  const completedCount = stats.completedLessons.filter((id) => availableModules.some((module) => module.id === id)).length;
  const progress = availableModules.length ? Math.round((completedCount / availableModules.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-brand-dark">
      <header className="bg-brand-dark text-white border-b-4 border-brand-dark">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/New-Curso-Globoflexia-Junio/logo.jpg" alt="Tan Barbudo" className="w-12 h-12 rounded-full bg-white object-contain border-2 border-white" />
            <div>
              <p className="font-display font-bold text-lg leading-none">Aprende con Tan</p>
              <p className="text-[10px] text-gray-400 mt-1">Creatividad, herramientas y diversión con propósito.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold">{profile.displayName}</p>
              <p className="text-[9px] uppercase tracking-wider text-brand-yellow">{profile.role === 'admin' ? 'Administrador' : 'Alumno'}</p>
            </div>
            <button onClick={onLogout} className="p-2 rounded-xl border border-white/20 hover:bg-white/10" title="Cerrar sesión">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/40 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow" /> Tu espacio para aprender
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-black mt-4">¿Qué quieres aprender hoy?</h1>
          <p className="text-sm md:text-base text-gray-600 mt-3 leading-relaxed">
            Elige una ruta y avanza a tu ritmo. Tus progresos quedarán guardados para continuar cuando quieras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <button onClick={() => onOpenCourse('globoflexia')} className="text-left bg-brand-dark text-white border-4 border-brand-dark rounded-3xl p-6 sticker-shadow-lg group md:row-span-2 flex flex-col justify-between min-h-[330px]">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-brand-yellow flex items-center justify-center text-4xl border-2 border-white/30">🎈</div>
              <span className="inline-flex mt-5 px-3 py-1 bg-brand-green text-white rounded-full text-[9px] font-bold uppercase tracking-wider">Disponible</span>
              <h2 className="font-display text-3xl font-black mt-3">Globoflexia</h2>
              <p className="text-sm text-gray-300 mt-2 leading-relaxed">Técnicas, figuras, personajes, eventos y cuatro bonus especiales.</p>
            </div>
            <div className="mt-8">
              <div className="flex justify-between text-[10px] font-bold mb-2"><span>{completedCount} de {availableModules.length} clases</span><span>{progress}%</span></div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-brand-green" style={{ width: `${progress}%` }} /></div>
              <div className="mt-5 flex items-center justify-between font-display font-bold text-sm uppercase text-brand-yellow">
                <span>{completedCount > 0 ? 'Continuar aprendiendo' : 'Comenzar curso'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {additionalCourses.map((course) => {
            const Icon = course.icon;
            const courseCompleted = course.moduleId ? stats.completedLessons.includes(course.moduleId) : false;
            const CourseWrapper = course.available ? 'button' : 'article';
            return (
              <CourseWrapper
                key={course.id}
                {...(course.available ? { onClick: () => onOpenCourse(course.id), type: 'button' as const } : {})}
                className={`w-full text-left bg-white border-3 border-brand-dark rounded-3xl p-5 sticker-shadow-sm ${course.available ? 'hover:-translate-y-0.5 transition-transform group' : 'opacity-70'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${course.background} flex items-center justify-center border border-brand-dark/10 flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${course.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="font-display text-lg font-black">{course.title}</h2>
                      <span className={`px-2.5 py-1 border rounded-full text-[8px] font-bold uppercase tracking-wider ${course.available ? 'bg-brand-green/10 border-brand-green/30 text-brand-green' : 'bg-gray-100 border-gray-300 text-gray-500'}`}>
                        {course.available ? (courseCompleted ? 'Completado' : 'Disponible') : 'Próximamente'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{course.description}</p>
                  </div>
                </div>
                {course.available && (
                  <div className={`mt-4 flex items-center justify-between text-[10px] font-bold uppercase ${course.color}`}>
                    <span>{courseCompleted ? 'Volver al curso' : 'Comenzar curso'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
              )}
              </CourseWrapper>
            );
          })}
        </div>
      </main>
    </div>
  );
}
