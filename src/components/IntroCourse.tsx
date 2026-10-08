import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, Circle, Download, Lock, PlayCircle, Sparkles, Target } from 'lucide-react';

export interface CourseModule {
  id: string;
  title: string;
  videoId: string;
  description?: string;
  learnPoints?: string[];
  resource?: {
    title: string;
    url: string;
    format: string;
  };
}

interface IntroCourseProps {
  title: string;
  subtitle: string;
  modules: CourseModule[];
  accent: 'blue' | 'green';
  emoji?: string;
  completedLessons: string[];
  onToggleComplete: (moduleId: string) => void;
  onBack: () => void;
}

const themes = {
  blue: { page: 'bg-[#F4FAFF]', accent: 'bg-brand-blue', soft: 'bg-brand-blue/10 text-brand-blue border-brand-blue/30', button: 'bg-brand-blue hover:bg-blue-600', active: 'border-brand-blue bg-brand-blue/10' },
  green: { page: 'bg-[#F5FFF8]', accent: 'bg-brand-green', soft: 'bg-brand-green/10 text-brand-green border-brand-green/30', button: 'bg-brand-green hover:bg-green-600', active: 'border-brand-green bg-brand-green/10' },
};

export default function IntroCourse({ title, subtitle, modules, accent, emoji = '✨', completedLessons, onToggleComplete, onBack }: IntroCourseProps) {
  const theme = themes[accent];
  const isUnlocked = (index: number) => index === 0 || completedLessons.includes(modules[index - 1].id);
  const firstPending = modules.findIndex((module, index) => isUnlocked(index) && !completedLessons.includes(module.id));
  const [activeModuleId, setActiveModuleId] = useState(modules[Math.max(firstPending, 0)]?.id || '');
  const activeIndex = Math.max(modules.findIndex((module) => module.id === activeModuleId), 0);
  const activeModule = modules[activeIndex];
  const activeCompleted = completedLessons.includes(activeModule.id);
  const completedCount = modules.filter((module) => completedLessons.includes(module.id)).length;
  const progress = Math.round((completedCount / modules.length) * 100);

  useEffect(() => {
    if (!isUnlocked(activeIndex)) setActiveModuleId(modules[0].id);
  }, [completedLessons, activeIndex, modules]);

  const nextModule = useMemo(() => modules[activeIndex + 1], [activeIndex, modules]);
  const toggleAndAdvance = () => {
    onToggleComplete(activeModule.id);
    if (!activeCompleted && nextModule) setActiveModuleId(nextModule.id);
  };

  return (
    <div className={`min-h-screen ${theme.page} text-brand-dark`}>
      <header className="bg-brand-dark text-white border-b-4 border-brand-dark">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <button onClick={onBack} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/20 hover:bg-white/10 text-xs font-bold">
            <ArrowLeft className="w-4 h-4" /> Todos los cursos
          </button>
          <div className="flex items-center gap-2">
            <img src="/New-Curso-Globoflexia-Junio/logo.jpg" alt="Tan Barbudo" className="w-10 h-10 rounded-full bg-white object-contain border-2 border-white" />
            <span className="font-display font-bold hidden sm:inline">Aprende con Tan</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <section className="bg-brand-dark text-white border-4 border-brand-dark rounded-3xl p-6 md:p-8 sticker-shadow-lg overflow-hidden relative">
          <div className={`absolute -right-12 -top-12 w-44 h-44 rounded-full ${theme.accent} opacity-20`} />
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl ${theme.accent} flex items-center justify-center text-3xl border-2 border-white/20`}>{emoji}</div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${theme.soft}`}>
                  <Sparkles className="w-3.5 h-3.5" /> Curso disponible
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-black mt-5">{title}</h1>
              <p className="max-w-2xl text-gray-300 mt-3 leading-relaxed">{subtitle}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 min-w-[150px]">
              <div className="rounded-2xl bg-white/10 border border-white/15 p-4 text-center">
                <p className="font-display text-2xl font-black">{modules.length}</p>
                <p className="text-[9px] uppercase tracking-widest text-gray-400">Clases</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 p-4 text-center">
                <p className="font-display text-2xl font-black">{progress}%</p>
                <p className="text-[9px] uppercase tracking-widest text-gray-400">Completado</p>
              </div>
            </div>
          </div>
          <div className="relative mt-6">
            <div className="flex justify-between text-[10px] font-bold mb-2"><span>{completedCount} de {modules.length} módulos</span><span>{progress}%</span></div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden"><div className={`h-full ${theme.accent} transition-all`} style={{ width: `${progress}%` }} /></div>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white border-2 border-brand-dark rounded-2xl p-4 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-brand-green flex-shrink-0" />
            <div><p className="text-xs font-bold">Aprende a tu ritmo</p><p className="text-[10px] text-gray-500 mt-0.5">Tu avance queda guardado.</p></div>
          </div>
          <div className="bg-white border-2 border-brand-dark rounded-2xl p-4 flex items-center gap-3">
            <Target className="w-8 h-8 text-brand-yellow flex-shrink-0" />
            <div><p className="text-xs font-bold">Avance paso a paso</p><p className="text-[10px] text-gray-500 mt-0.5">Completa una clase para abrir la siguiente.</p></div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 items-start">
          <aside className="bg-white border-3 border-brand-dark rounded-3xl p-3 sticker-shadow-sm space-y-2">
            <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">Contenido del taller</p>
            {modules.map((module, index) => {
              const unlocked = isUnlocked(index);
              const completed = completedLessons.includes(module.id);
              const active = module.id === activeModule.id;
              return (
                <button key={module.id} type="button" disabled={!unlocked} onClick={() => setActiveModuleId(module.id)} className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-colors ${active ? theme.active : 'border-transparent hover:bg-gray-50'} ${!unlocked ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {completed ? <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0" /> : unlocked ? <PlayCircle className="w-5 h-5 flex-shrink-0" /> : <Lock className="w-5 h-5 flex-shrink-0" />}
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{index === 0 ? 'Introducción' : `Módulo ${index}`}</p>
                    <p className="text-xs font-bold leading-tight mt-0.5">{module.title}</p>
                  </div>
                </button>
              );
            })}
          </aside>

          <section className="bg-white border-4 border-brand-dark rounded-3xl overflow-hidden sticker-shadow-lg">
            <div className={`h-2 ${theme.accent}`} />
            <div className="p-4 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{activeIndex === 0 ? 'Introducción' : `Módulo ${activeIndex}`}</p>
                  <h2 className="font-display text-xl md:text-2xl font-black mt-1">{activeModule.title}</h2>
                </div>
                <span className={`px-3 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${activeCompleted ? 'bg-brand-green/10 text-brand-green border-brand-green/30' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>{activeCompleted ? 'Completado' : 'Disponible'}</span>
              </div>
              <div className="aspect-video bg-black rounded-2xl overflow-hidden border-2 border-brand-dark">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${activeModule.videoId}`} title={`${activeModule.title} — ${title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              </div>
              {activeModule.description && <p className="mt-5 text-sm text-gray-600 leading-relaxed">{activeModule.description}</p>}
              {activeModule.learnPoints && activeModule.learnPoints.length > 0 && (
                <div className={`mt-5 rounded-2xl border p-4 ${theme.soft}`}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3">En esta clase</p>
                  <ul className="grid gap-2">
                    {activeModule.learnPoints.map((point) => <li key={point} className="flex items-start gap-2 text-xs font-medium"><CheckCircle2 className="w-4 h-4 mt-[-1px] flex-shrink-0" />{point}</li>)}
                  </ul>
                </div>
              )}
              {activeModule.resource && (
                <div className="mt-5 bg-[#FFF4E6] border-2 border-brand-yellow rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-brand-yellow/20 flex items-center justify-center"><Download className="w-5 h-5 text-brand-yellow" /></div>
                    <div><p className="text-xs font-bold">Material adicional</p><p className="text-[10px] text-gray-500 mt-0.5">{activeModule.resource.title} · {activeModule.resource.format}</p></div>
                  </div>
                  <a href={activeModule.resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-yellow text-brand-dark border-2 border-brand-dark font-display font-bold uppercase text-[10px] hover:-translate-y-0.5 transition-transform">
                    <Download className="w-4 h-4" /> Descargar material
                  </a>
                </div>
              )}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[11px] text-gray-500">{activeCompleted ? 'Clase completada. Puedes continuar con el siguiente módulo.' : 'Mira la clase y márcala como completada para desbloquear la siguiente.'}</p>
                <button onClick={toggleAndAdvance} className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-display font-bold uppercase text-xs transition-colors ${activeCompleted ? 'bg-brand-dark hover:bg-gray-800' : theme.button}`}>
                  {activeCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}{activeCompleted ? 'Módulo completado' : 'Completar y continuar'}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
