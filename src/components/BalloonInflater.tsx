import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, AlertCircle, Award } from 'lucide-react';

export default function BalloonInflater() {
  const [pumpCount, setPumpCount] = useState(0);
  const [selectedColor, setSelectedColor] = useState('bg-brand-red');
  const [colorName, setColorName] = useState('Rojo Fuego');
  const [status, setStatus] = useState<'idle' | 'inflating' | 'popped' | 'completed'>('idle');
  const [createdFigure, setCreatedFigure] = useState<string | null>(null);
  const [jokeText, setJokeText] = useState('');

  const colors = [
    { bg: 'bg-brand-red', name: 'Rojo Fuego', text: 'text-brand-red' },
    { bg: 'bg-brand-yellow', name: 'Amarillo Barbudo', text: 'text-brand-yellow' },
    { bg: 'bg-brand-green', name: 'Verde Esperanza', text: 'text-brand-green' },
    { bg: 'bg-brand-blue', name: 'Azul Espacial', text: 'text-brand-blue' },
    { bg: 'bg-brand-salmon', name: 'Rosa Pastel', text: 'text-brand-salmon' },
  ];

  const figures = [
    { name: 'Perrito Clásico 🐶', desc: '¡El rey indiscutible de las fiestas animadas!', img: '🐾' },
    { name: 'Espada del Caballero ⚔️', desc: '¡Super flexible, lista para duelos de cosquillas!', img: '✨' },
    { name: 'Loro Tropical 🦜', desc: '¡Listo para posarse en el hombro de un pirata feliz!', img: '🌴' },
    { name: 'Margarita de la Suerte 🌸', desc: '¡Hermosa flor que nunca se marchita!', img: '💚' },
  ];

  const popJokes = [
    "¡Vaya, ese globo se asustó de tu gran sonrisa! 😄",
    "¡BOOM! El globo quería ser confeti... ¡Meta cumplida! 🎉",
    "¡Ouch! El globo aplaudió demasiado fuerte tus dotes de inflado. 👏",
    "¡Pfff! Se marchó volando a buscar al Profe Gustavo. 🎈"
  ];

  const handlePump = () => {
    if (status === 'popped' || status === 'completed') return;
    
    setStatus('inflating');
    const newCount = pumpCount + 1;
    setPumpCount(newCount);

    // If pumped too much (more than 5), it pops with a joke!
    if (newCount > 5) {
      setStatus('popped');
      setJokeText(popJokes[Math.floor(Math.random() * popJokes.length)]);
    }
  };

  const handleTwist = (figureImg: string, figureName: string) => {
    if (pumpCount < 2) return;
    setStatus('completed');
    setCreatedFigure(`${figureImg} ${figureName}`);
  };

  const handleReset = () => {
    setPumpCount(0);
    setStatus('idle');
    setCreatedFigure(null);
  };

  return (
    <div className="bg-white border-4 border-brand-dark rounded-3xl p-6 sticker-shadow relative overflow-hidden" id="inflator-widget">
      {/* Badge Top */}
      <div className="absolute top-3 right-3 bg-brand-yellow text-brand-dark px-2.5 py-1 rounded-full text-xs font-bold border-2 border-brand-dark tracking-normal transform rotate-3">
        ¡Minijuego! 🕹️
      </div>

      <h3 className="font-display font-bold text-lg text-brand-dark flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-brand-yellow animate-bounce" />
        Taller de Práctica Virtual
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        ¿Te da miedo reventar globos reales? ¡Prueba inflar y doblar uno digital aquí!
      </p>

      {/* Arena container */}
      <div className="bg-brand-beige/25 border-3 border-dashed border-gray-300 rounded-2xl my-4 p-4 flex flex-col items-center justify-center min-h-[190px] relative">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">🎈</div>
              <p className="text-xs font-bold text-gray-600">Paso 1: ¡Elige tu color favorito abajo!</p>
              <p className="text-[11px] text-gray-400">Y pulsa el botón "BOMBEAR AIRE" para inflar.</p>
            </motion.div>
          )}

          {status === 'inflating' && (
            <motion.div
              key="inflating"
              className="flex flex-col items-center"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              {/* Elastic tube representing inflation scale */}
              <motion.div
                animate={{
                  width: 30 + pumpCount * 25,
                  height: 18 + pumpCount * 4,
                  borderRadius: '25px',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className={`${selectedColor} border-2 border-brand-dark relative flex items-center justify-end pr-1`}
              >
                {/* Tiny tail representing final escape block */}
                <div className="w-2.5 h-1.5 bg-brand-dark/25 rounded absolute right-0 transform translate-x-1" />
              </motion.div>
              <p className="text-xs font-bold text-brand-dark mt-4">
                Inflado: {pumpCount * 20}% ({pumpCount} bombazos)
              </p>
              {pumpCount < 2 ? (
                <p className="text-[10px] text-gray-400">Insuficiente para doblar. ¡Bombea más!</p>
              ) : pumpCount > 4 ? (
                <p className="text-[10px] text-brand-red font-bold animate-pulse">¡ATENCIÓN! Cerca del límite de explosión.</p>
              ) : (
                <p className="text-[10px] text-brand-green font-bold">¡Listo para doblar! Selecciona figura abajo.</p>
              )}
            </motion.div>
          )}

          {status === 'popped' && (
            <motion.div
              key="popped"
              initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              className="text-center p-2"
            >
              <div className="text-4xl animate-bounce mb-1">💥 ¡BUM! 💥</div>
              <p className="text-xs font-semibold text-brand-red">{jokeText}</p>
              <p className="text-[10px] text-gray-500 mt-2 italic">Aplica la regla de emergencia de Tan Barbudo.</p>
              <button
                onClick={handleReset}
                className="mt-3 px-3 py-1 bg-brand-red text-white text-xs font-bold rounded-lg border-2 border-brand-dark sticker-shadow-sm flex items-center gap-1 mx-auto"
              >
                <RefreshCw className="w-3 h-3" /> Tomar Otro Globo
              </button>
            </motion.div>
          )}

          {status === 'completed' && (
            <motion.div
              key="completed"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="inline-block p-4 bg-brand-green/20 border-3 border-brand-green rounded-full mb-2">
                <span className="text-4xl block animate-pulse">{createdFigure?.split(' ')[0]}</span>
              </div>
              <h4 className="text-sm font-bold text-brand-dark">{createdFigure}</h4>
              <p className="text-[11px] text-gray-500 italic">¡Felicidades! Has modelado un globo virtual.</p>
              <button
                onClick={handleReset}
                className="mt-3 px-3 py-1 bg-brand-green text-white text-xs font-bold rounded-lg border-2 border-brand-dark sticker-shadow-sm flex items-center gap-1 mx-auto"
              >
                <RefreshCw className="w-3 h-3" /> Volver a Crear
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Colors array selector at bottom */}
      {(status === 'idle' || status === 'inflating') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Color de globo:</span>
            <span className="text-xs font-bold text-brand-dark">{colorName}</span>
          </div>
          <div className="flex gap-2">
            {colors.map((c, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedColor(c.bg);
                  setColorName(c.name);
                }}
                disabled={status === 'inflating' && pumpCount > 0}
                className={`w-6 h-6 rounded-full border-2 border-brand-dark cursor-pointer transition-transform ${c.bg} ${
                  selectedColor === c.bg ? 'scale-125 ring-2 ring-brand-blue' : 'hover:scale-110'
                } disabled:opacity-55 disabled:cursor-not-allowed`}
              />
            ))}
          </div>

          {/* Action trigger buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={handlePump}
              disabled={status === 'popped' || status === 'completed'}
              className="py-2.5 px-3 bg-brand-yellow text-brand-dark font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-brand-dark sticker-shadow-sm active:translate-y-0.5"
            >
              💨 Bombear Aire
            </button>
            <button
              disabled={pumpCount < 2 || status === 'popped' || status === 'completed'}
              className="py-2.5 px-3 bg-brand-green text-white font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-brand-dark sticker-shadow-sm active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => {
                const randomFig = figures[Math.floor(Math.random() * figures.length)];
                handleTwist(randomFig.img, randomFig.name);
              }}
            >
              🛠️ Torsión Rápida
            </button>
          </div>
        </div>
      )}

      {/* Special direct twists list if ready */}
      {status === 'inflating' && pumpCount >= 2 && (
        <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
          <p className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-tight">Elige qué figura modelar:</p>
          <div className="grid grid-cols-2 gap-1.5">
            {figures.map((fig, idx) => (
              <button
                key={idx}
                onClick={() => handleTwist(fig.img, fig.name)}
                className="p-1 px-2 bg-[#FFF4E6] hover:bg-brand-yellow/30 text-start text-[11px] font-bold text-brand-dark rounded-lg border border-brand-dark/20 flex gap-1 items-center"
              >
                <span>{fig.img}</span>
                <span className="truncate">{fig.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
