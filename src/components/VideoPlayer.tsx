import React from 'react';
import { LessonModule } from '../types';
import { Play, CheckCircle2, Clock, Award, FileText, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface VideoPlayerProps {
  module: LessonModule;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  onNavigateToDocs: () => void;
}

export default function VideoPlayer({ module, isCompleted, onToggleComplete, onNavigateToDocs }: VideoPlayerProps) {
  return (
    <div className="space-y-6" id="video-theater-layout">
      {/* Dynamic Main Video Screen Block */}
      <div className="bg-brand-dark border-4 border-brand-dark rounded-3xl overflow-hidden sticker-shadow-lg relative aspect-video" id="interactive-player-viewport">
        {module.videoUrl ? (
          <iframe
            src={module.videoUrl}
            title={module.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-brand-dark to-brand-dark/95 p-6 text-center">
            <Play className="w-16 h-16 text-brand-yellow animate-pulse mb-4" />
            <p className="text-lg font-bold">Simulador de Video - Tan Barbudo</p>
            <p className="text-xs text-gray-400 mt-1 max-w-sm">No pudimos cargar la transmisión. Puedes ver la información detallada abajo o cambiar de clase.</p>
          </div>
        )}
      </div>

      <div className="bg-white border-4 border-brand-dark rounded-3xl p-6 md:p-8 sticker-shadow relative" id="lesson-details-card">
        {/* Banner with course category */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 border-brand-dark ${
              module.isBonus ? 'bg-brand-salmon text-brand-dark' : 'bg-brand-blue text-brand-dark'
            }`}>
              {module.isBonus ? '¡REGALO BONUS!' : `MÓDULO ${module.order}`}
            </span>
            <span className="px-3 py-1 bg-brand-beige border-2 border-brand-dark text-[11px] font-bold text-gray-700 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3 text-brand-yellow" />
              {module.duration}
            </span>
            <span className={`px-3 py-1 border-2 border-brand-dark text-[11px] font-bold rounded-full flex items-center gap-1 ${
              module.difficulty === 'Principiante' ? 'bg-brand-green/20 text-brand-dark' :
              module.difficulty === 'Intermedio' ? 'bg-brand-yellow/20 text-brand-dark' : 'bg-brand-red/20 text-brand-dark'
            }`}>
              <Award className="w-3 h-3" />
              {module.difficulty}
            </span>
          </div>

          {/* Mark Completed Button Header */}
          <button
            onClick={() => onToggleComplete(module.id)}
            id={`toggle-complete-btn-${module.id}`}
            className={`cursor-pointer px-4 py-2 rounded-xl font-display font-bold text-xs uppercase tracking-wider border-2 border-brand-dark transition-all sticker-shadow-sm flex items-center gap-2 ${
              isCompleted 
                ? 'bg-brand-green text-white active:translate-y-0.5' 
                : 'bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90 active:translate-y-0.5'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'fill-current' : ''}`} />
            <span>{isCompleted ? '¡Clase Completada!' : 'Marcar como Completada'}</span>
          </button>
        </div>

        {/* Lesson Title and Description */}
        <h2 className="font-display font-bold text-2xl md:text-3xl text-brand-dark tracking-tight leading-tight">
          {module.title}
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-3">
          {module.description}
        </p>

        {/* Interactive Learn list */}
        <div className="mt-8">
          <h3 className="font-display font-bold text-sm text-brand-dark uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-yellow animate-bounce" />
            ¿Qué aprenderás en esta clase?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="learning-points-grid">
            {module.learnPoints.map((point, idx) => (
              <div key={idx} className="flex gap-2.5 items-start p-3 bg-brand-beige/20 border border-brand-dark/10 rounded-xl">
                <span className="text-brand-green text-sm flex-shrink-0 mt-0.5">✔</span>
                <span className="text-xs md:text-sm text-gray-700 leading-snug">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Document Attachment Links inside class */}
        {module.documents && module.documents.length > 0 && (
          <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-display font-bold text-xs text-brand-dark uppercase tracking-widest flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-brand-blue" />
                Materiales de Apoyo de esta Clase
              </h4>
              <button 
                onClick={onNavigateToDocs}
                className="text-xs text-brand-blue font-bold hover:underline flex items-center gap-0.5"
              >
                Ver todos
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {module.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-white border-2 border-brand-dark rounded-xl sticker-shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-brand-blue/10 border border-brand-blue/30 rounded-lg font-mono text-xs font-bold text-brand-blue">
                      {doc.format}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-brand-dark">{doc.title}</p>
                      <p className="text-[10px] text-gray-400">{doc.size} • Material Oficial de Tan Barbudo</p>
                    </div>
                  </div>
                  <button
                    onClick={onNavigateToDocs}
                    className="p-2 hover:bg-brand-beige/50 text-brand-dark rounded-lg border border-brand-dark/10 text-xs font-bold"
                  >
                    Ver Guía 📑
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tip banner */}
        <div className="mt-6 p-4 bg-[#FFF4E6] border-2 border-brand-yellow rounded-xl flex gap-3 text-xs text-brand-dark">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-brand-yellow" />
          <div>
            <p className="font-bold">💡 Regla Barbuda de Aprendizaje:</p>
            <p className="mt-0.5 text-gray-600 leading-normal">
              No tienes que ver todo el curso de un jalón. ¡Practica cada figura por lo menos 5 veces antes de pasar al siguiente nivel! Recuerda: "La simplicidad gana siempre".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
