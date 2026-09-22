import React from 'react';
import { ArrowLeft, CheckCircle2, Circle, Sparkles } from 'lucide-react';

interface IntroCourseProps {
  title: string;
  subtitle: string;
  videoId: string;
  moduleId: string;
  accent: 'blue' | 'green';
  isCompleted: boolean;
  onToggleComplete: (moduleId: string) => void;
  onBack: () => void;
}

const themes = {
  blue: {
    page: 'bg-[#F4FAFF]',
    accent: 'bg-brand-blue',
    soft: 'bg-brand-blue/10 text-brand-blue border-brand-blue/30',
    button: 'bg-brand-blue hover:bg-blue-600',
  },
  green: {
    page: 'bg-[#F5FFF8]',
    accent: 'bg-brand-green',
    soft: 'bg-brand-green/10 text-brand-green border-brand-green/30',
    button: 'bg-brand-green hover:bg-green-600',
  },
};

export default function IntroCourse({
  title,
  subtitle,
  videoId,
  moduleId,
  accent,
  isCompleted,
  onToggleComplete,
  onBack,
}: IntroCourseProps) {
  const theme = themes[accent];

  return (
    <div className={`min-h-screen ${theme.page} text-brand-dark`}>
      <header className="bg-brand-dark text-white border-b-4 border-brand-dark">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <button onClick={onBack} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/20 hover:bg-white/10 text-xs font-bold">
            <ArrowLeft className="w-4 h-4" /> Todos los cursos
          </button>
          <div className="flex items-center gap-2">
            <img src="/New-Curso-Globoflexia-Junio/logo.jpg" alt="Tan Barbudo" className="w-10 h-10 rounded-full bg-white object-contain border-2 border-white" />
            <span className="font-display font-bold hidden sm:inline">Aprende con Tan</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${theme.soft}`}>
          <Sparkles className="w-3.5 h-3.5" /> Curso disponible
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-black mt-4">{title}</h1>
        <p className="max-w-2xl text-gray-600 mt-3 leading-relaxed">{subtitle}</p>

        <section className="mt-8 bg-white border-4 border-brand-dark rounded-3xl overflow-hidden sticker-shadow-lg">
          <div className={`h-2 ${theme.accent}`} />
          <div className="p-4 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Módulo 1</p>
                <h2 className="font-display text-xl md:text-2xl font-black mt-1">Introducción al taller</h2>
              </div>
              <span className={`px-3 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${isCompleted ? 'bg-brand-green/10 text-brand-green border-brand-green/30' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                {isCompleted ? 'Completado' : 'Disponible'}
              </span>
            </div>

            <div className="aspect-video bg-black rounded-2xl overflow-hidden border-2 border-brand-dark">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`Introducción a ${title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold">Tu progreso</p>
                <p className="text-[11px] text-gray-500 mt-1">{isCompleted ? '1 de 1 módulo completado' : '0 de 1 módulo completado'}</p>
              </div>
              <button
                onClick={() => onToggleComplete(moduleId)}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-display font-bold uppercase text-xs transition-colors ${isCompleted ? 'bg-brand-dark hover:bg-gray-800' : theme.button}`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                {isCompleted ? 'Módulo completado' : 'Marcar como completado'}
              </button>
            </div>
          </div>
        </section>

        <p className="text-center text-xs text-gray-500 mt-6">
          Los próximos módulos se incorporarán en esta misma ruta y se desbloquearán en orden.
        </p>
      </main>
    </div>
  );
}
