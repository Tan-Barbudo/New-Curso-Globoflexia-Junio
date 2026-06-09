import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  RefreshCw, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Flame, 
  Trophy, 
  BookOpen, 
  Lightbulb,
  Heart
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const TRIVIA_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "¿Qué significan estructuralmente los números en un globo profesional clásico \"260Q\"?",
    options: [
      "Que resiste hasta 260 libras de presión de aire continuo antes de romperse.",
      "Mide 2 pulgadas de diámetro y 60 pulgadas de largo al inflarse de forma estándar.",
      "Se infla en 2 segundos y tiene un peso neto pluma de 60 gramos de látex."
    ],
    correctIdx: 1,
    explanation: "¡El primer dígito representa el diámetro (2 pulgadas) y los siguientes dos representan lo largo (60 pulgadas)! La 'Q' hace referencia a Qualatex, el fabricante estándar mundial."
  },
  {
    id: 2,
    question: "¿Por qué es un mandamiento vital dejar una porción de \"cola\" sin inflar al extremo opuesto de la boquilla?",
    options: [
      "Para que el perrito o la figura terminada tenga una silueta graciosa de cola de descompresión.",
      "Para permitir el libre desplazamiento del aire a medida que realizamos giros y torsiones.",
      "Para evitar gastar aire de más del inflador de doble acción."
    ],
    correctIdx: 1,
    explanation: "Cada vez que doblas o giras el globo, el aire atrapado se desplaza hacia atrás. Si no dejas cola, la presión interna sube al máximo ¡y tu globo estallará con un divertido BOOM! 💥"
  },
  {
    id: 3,
    question: "¿Cómo se llama el truco de dejar salir libremente un \"suspiro\" de aire antes de hacer el nudo?",
    options: [
      "Deflación forzada estática.",
      "Liberación mística del payaso.",
      "\"Burping\" o ablandamiento del globo."
    ],
    correctIdx: 2,
    explanation: "El 'burping' reduce la tensión excesiva de la boquilla, lo que protege tus dedos y hace que el anudado sea sumamente dócil y fácil de realizar."
  },
  {
    id: 4,
    question: "¿Cuál es la torsión fundamental que sirve para fijar belfos, orejas de oso o de perro, impidiendo que giren libres?",
    options: [
      "Torsión de Pellizco (Pinch Twist).",
      "Torsión de Pliegue simple (Fold Twist).",
      "Burbuja espacial flotante."
    ],
    correctIdx: 0,
    explanation: "El pellizco o 'pinch twist' es el candado articulado de la globoflexia. Dobla la burbuja sobre sí misma, tira del látex con amor y gírala para fijar la estructura."
  },
  {
    id: 5,
    question: "Si diseñas una espada pirata simple, ¿cuánta cola sin inflar debes dejar para no desperdiciar material?",
    options: [
      "Solo unos 2 o 3 dedos de cola, ya que apenas requiere 3 bucles simples de plegado.",
      "Por lo menos medio globo entero vacío para que no explote con los duelos.",
      "Ninguna, hay que inflarlo exactamente al 100% hasta la punta."
    ],
    correctIdx: 0,
    explanation: "Como la espada de caballero solo tiene la empuñadura y un bucle de encaje, requiere muy poco desplazamiento de aire. ¡Con 2 o 3 dedos de cola es perfecto!"
  },
  {
    id: 6,
    question: "¿Cuál es la verdad ecológica detrás de marcas profesionales como Sempertex o Qualatex?",
    options: [
      "Tardan 200 años en diluirse por ser de polímero acrílico puro.",
      "Son del tipo biodegradable 100% natural, extraídos de la savia del árbol Hevea.",
      "Son biodegradables únicamente si los lavas con agua caliente antes de inflarlos."
    ],
    correctIdx: 1,
    explanation: "¡Son de látex orgánico 100% natural! Se descomponen bajo el sol y la lluvia a la misma velocidad que una hoja común de roble, haciéndolos respetuosos con el planeta."
  },
  {
    id: 7,
    question: "¿Qué técnica asegura que un grupo de 3 o más burbujas consecutivas queden unidas sin deshacerse?",
    options: [
      "Torsión de bloqueo o de junta (Lock Twist).",
      "Soplar aire caliente y aplicar calor para que se peguen.",
      "Anudar la boquilla con un hilván transparente."
    ],
    correctIdx: 0,
    explanation: "El 'lock twist' consiste en doblar dos burbujas juntas sobre sí mismas por su punto de contacto para fijarlas firmemente sin nudos cansados."
  },
  {
    id: 8,
    question: "Estás en pleno show infantil de cumpleaños y un globo estalla. ¿Cómo reacciona un discípulo de Tan Barbudo?",
    options: [
      "Se disculpa tímidamente y cancela temporalmente el show por seguridad.",
      "Recoge de inmediato los trozos de látex (¡seguridad preventiva!) e integra el estallido con humor.",
      "Le echa la culpa bromeando a algún papá de la fila del público."
    ],
    correctIdx: 1,
    explanation: "¡Eso es mentalidad creativa! Recoger el residuo rápido para evitar que un bebé lo chupe, y decir entre risas: '¡Vaya, el globo aplaudió con demasiadas ganas de verme!'."
  }
];

const GRADUATION_FIGURES = [
  { name: 'Perrito Chibi Dorado 🐶', emoji: '🐕✨', text: '¡Un fiel canino dorado con su corona de torsiones!' },
  { name: 'Corona Imperial del Aire 👑', emoji: '👑🎈', text: '¡Te corona como el rey de las fiestas divertidas!' },
  { name: 'Flor Gigante Tridimensional 🌸', emoji: '🌺💐', text: '¡Un combo de tres globos con pétalos lock-twist de fantasía!' },
  { name: 'Súper Loro Escénico 🦜', emoji: '🦜🌴', text: '¡Listo para posarse en tu cabeza en el teatro cómico de la risa!' }
];

export default function BalloonInflater() {
  const [activeMode, setActiveMode] = useState<'trivia' | 'free'>('trivia');

  // TRIVIA MODE STATE
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [triviaPumps, setTriviaPumps] = useState(0);
  const [triviaStatus, setTriviaStatus] = useState<'playing' | 'popped' | 'won'>('playing');
  const [streak, setStreak] = useState(0);
  const [randomGraduation, setRandomGraduation] = useState<{name: string, emoji: string, text: string} | null>(null);

  // FREE PLAY STATE
  const [freePumpCount, setFreePumpCount] = useState(0);
  const [freeColor, setFreeColor] = useState('bg-brand-red');
  const [freeColorName, setFreeColorName] = useState('Rojo Fuego');
  const [freeStatus, setFreeStatus] = useState<'idle' | 'inflating' | 'popped' | 'completed'>('idle');
  const [freeCreatedFigure, setFreeCreatedFigure] = useState<string | null>(null);
  const [freeJoke, setFreeJoke] = useState('');

  const freeColorsList = [
    { bg: 'bg-brand-red', name: 'Rojo Fuego' },
    { bg: 'bg-brand-yellow', name: 'Amarillo Tan Barbudo' },
    { bg: 'bg-brand-green', name: 'Verde Éxito' },
    { bg: 'bg-brand-blue', name: 'Azul Fiesta' },
    { bg: 'bg-brand-salmon', name: 'Naranja Cómico' },
  ];

  const freeFiguresList = [
    { name: 'Perrito Clásico 🐶', img: '🐾' },
    { name: 'Espada del Caballero ⚔️', img: '✨' },
    { name: 'Loro del Pirata 🦜', img: '🌴' },
    { name: 'Flor Multicolores 🌸', img: '💚' },
  ];

  const freeJokesList = [
    "¡Vaya, ese globo se asustó de tu gran sonrisa! 😄",
    "¡BOOM! El látex quería ser confeti... ¡Meta cumplida! 🎉",
    "¡Ouch! El globo aplaudió con demasiada emoción por tu show. 👏",
    "¡Pfff! Se marchó volando a buscar al Profe Gustavo. 🎈"
  ];

  // Pick a random graduation figure once when winning trivia
  useEffect(() => {
    if (triviaStatus === 'won') {
      const idx = Math.floor(Math.random() * GRADUATION_FIGURES.length);
      setRandomGraduation(GRADUATION_FIGURES[idx]);
    }
  }, [triviaStatus]);

  // Handle Trivia choice select
  const handleAnswerClick = (optIdx: number) => {
    if (showExplanation) return; // prevent double clicks
    setSelectedAnswerIdx(optIdx);
    setShowExplanation(true);

    const question = TRIVIA_QUESTIONS[currentQuestionIdx];
    if (optIdx === question.correctIdx) {
      // Correct!
      setScore(prev => prev + 1);
      setTriviaPumps(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      // Incorrect! A pops scenario or streak breakdown
      setStreak(0);
    }
  };

  const handleNextTrivia = () => {
    setShowExplanation(false);
    setSelectedAnswerIdx(null);

    // If answer is incorrect, the balloon has a chance to pop!
    // Or if pumps are at an appropriate amount:
    const isCorrect = selectedAnswerIdx === TRIVIA_QUESTIONS[currentQuestionIdx].correctIdx;
    
    if (!isCorrect) {
      // If failed, balloon pops! Game over for this round
      setTriviaStatus('popped');
      return;
    }

    // Check if we reached the end of standard round (e.g. 5 successful pumps)
    if (triviaPumps >= 5) {
      setTriviaStatus('won');
      return;
    }

    // Advance question index
    if (currentQuestionIdx < TRIVIA_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Loop questions if more are required to reach 5 wins
      setCurrentQuestionIdx(0);
    }
  };

  const resetTriviaGame = () => {
    setCurrentQuestionIdx(Math.floor(Math.random() * (TRIVIA_QUESTIONS.length - 4)));
    setSelectedAnswerIdx(null);
    setShowExplanation(false);
    setScore(0);
    setTriviaPumps(0);
    setTriviaStatus('playing');
    setStreak(0);
    setRandomGraduation(null);
  };

  // FREE PUMP ACTIONS
  const handleFreePump = () => {
    if (freeStatus === 'popped' || freeStatus === 'completed') return;
    setFreeStatus('inflating');
    const nextCount = freePumpCount + 1;
    setFreePumpCount(nextCount);

    if (nextCount > 5) {
      setFreeStatus('popped');
      setFreeJoke(freeJokesList[Math.floor(Math.random() * freeJokesList.length)]);
    }
  };

  const handleFreeTwist = (img: string, name: string) => {
    if (freePumpCount < 2) return;
    setFreeStatus('completed');
    setFreeCreatedFigure(`${img} ${name}`);
  };

  const resetFreeGame = () => {
    setFreePumpCount(0);
    setFreeStatus('idle');
    setFreeCreatedFigure(null);
  };

  return (
    <div className="bg-[#1A1A1A] border-4 border-brand-dark rounded-3xl p-5 md:p-6 sticker-shadow relative overflow-hidden" id="virtual-game-section">
      {/* Decorative tag */}
      <div className="absolute top-3 right-3 bg-brand-yellow text-[#1C1917] px-3 py-1 rounded-full text-[10px] uppercase font-black border-2 border-brand-dark tracking-normal transform rotate-3 animate-pulse">
        PRÁCTICA Y TRIVIA
      </div>

      <div className="mb-4">
        <h3 className="font-display font-medium text-lg leading-tight text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-salmon animate-bounce" />
          Doblado Virtual y Reta Barbuda 🎈
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Aprende las técnicas, apréndete el temario ¡y modela globos sin gastar un solo céntimo de látex!
        </p>
      </div>

      {/* MODE SELECTOR TABS */}
      <div className="flex gap-2 p-1 bg-[#121212] rounded-xl border border-brand-beige mb-5">
        <button
          onClick={() => {
            setActiveMode('trivia');
            resetTriviaGame();
          }}
          className={`cursor-pointer flex-1 py-2 text-xs font-display font-bold uppercase rounded-lg transition-all ${
            activeMode === 'trivia'
              ? 'bg-brand-yellow text-brand-dark shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🏆 Trivia con Reta de Aire
        </button>
        <button
          onClick={() => {
            setActiveMode('free');
            resetFreeGame();
          }}
          className={`cursor-pointer flex-1 py-2 text-xs font-display font-bold uppercase rounded-lg transition-all ${
            activeMode === 'free'
              ? 'bg-brand-yellow text-brand-dark shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          ⚙️ Práctica de Inflado Libre
        </button>
      </div>

      {/* ARENA CONTAINER */}
      <div className="bg-[#121212] border-2 border-brand-beige/50 rounded-2xl p-4 md:p-5 min-h-[300px]">
        <AnimatePresence mode="wait">
          
          {/* 1. TRIVIA MODE SCENARIOS */}
          {activeMode === 'trivia' && (
            <motion.div
              key="trivia-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* CURRENT PLAYING STATUS */}
              {triviaStatus === 'playing' && (
                <div className="space-y-4" id="trivia-active-game">
                  {/* Progress Indicator and Score */}
                  <div className="flex justify-between items-center bg-[#1A1A1A] p-2.5 rounded-xl border border-brand-beige/20 text-xs">
                    <span className="font-bold text-gray-300">
                      Progreso del Inflado: <span className="text-brand-yellow">{triviaPumps} / 5 Bombazos Correctos</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-brand-red animate-pulse" />
                      <span className="font-black text-brand-salmon">Racha: {streak}</span>
                    </div>
                  </div>

                  {/* VISUAL MINI BALLOON - Inflates as we reply correctly! */}
                  <div className="flex flex-col items-center justify-center py-3 bg-[#1A1A1A]/50 border border-brand-beige/10 rounded-xl relative overflow-hidden">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold select-none">Presión en el Tubo:</div>
                    
                    {/* The balloon */}
                    <div className="relative flex items-center justify-center min-h-[60px] w-full">
                      <motion.div
                        animate={{
                          width: 40 + triviaPumps * 35,
                          height: 20 + triviaPumps * 4,
                          borderRadius: '20px',
                        }}
                        transition={{ type: 'spring', stiffness: 120, damping: 9 }}
                        className="bg-brand-yellow border-2 border-brand-dark flex items-center justify-end relative shadow-lg"
                      >
                        {/* air bubble ring indicator */}
                        <div className="w-2.5 h-full bg-white/20 rounded-l absolute left-2 top-0" />
                        {/* knot tail */}
                        <div className="w-3 h-2 bg-brand-yellow/80 rounded absolute right-0 transform translate-x-1 border-r border-[#1C1917]" />
                      </motion.div>
                    </div>

                    <p className="text-[11px] text-gray-400 mt-2">
                      {triviaPumps === 0 && "🎈 El globo está vacío. ¡Contesta bien para bombear aire con prudencia!"}
                      {triviaPumps > 0 && triviaPumps < 4 && "👍 ¡Buena presión! El aire se está expandiendo con solidez."}
                      {triviaPumps >= 4 && "🔥 ¡Súper presión! Un solo paso más para amarrar tu figura legendaria."}
                    </p>
                  </div>

                  {/* QUESTION CONTAINER */}
                  <div className="bg-[#1A1A1A] border border-brand-beige/40 p-4 rounded-xl space-y-3" id="trivia-question-content">
                    <div className="inline-block px-2.5 py-0.5 bg-brand-salmon text-brand-dark font-black text-[9px] uppercase rounded-md tracking-wider">
                      Pregunta Técnica
                    </div>
                    <h4 className="text-sm font-bold text-white leading-relaxed">
                      {TRIVIA_QUESTIONS[currentQuestionIdx].question}
                    </h4>

                    {/* OPTIONS */}
                    <div className="space-y-2 pt-2">
                      {TRIVIA_QUESTIONS[currentQuestionIdx].options.map((option, idx) => {
                        let btnStyle = "border-zinc-800 hover:border-brand-yellow/50 bg-[#151515] text-[#E7E5E4]";
                        
                        if (showExplanation) {
                          if (idx === TRIVIA_QUESTIONS[currentQuestionIdx].correctIdx) {
                            btnStyle = "border-brand-green bg-brand-green/10 text-emerald-400 font-bold";
                          } else if (idx === selectedAnswerIdx) {
                            btnStyle = "border-brand-red bg-brand-red/10 text-rose-400";
                          } else {
                            btnStyle = "opacity-45 border-zinc-800 bg-zinc-900/45";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={showExplanation}
                            onClick={() => handleAnswerClick(idx)}
                            className={`w-full p-3 text-left text-xs rounded-xl border-2 transition-all cursor-pointer flex items-start gap-2.5 ${btnStyle}`}
                          >
                            <span className="font-bold text-brand-yellow bg-zinc-800 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="leading-tight">{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* EXPLANATION POPDOWN */}
                    <AnimatePresence>
                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-3 border-t border-brand-beige/25 mt-3 space-y-2"
                        >
                          <div className="flex items-start gap-1.5 text-xs text-amber-500 bg-brand-yellow/5 p-2.5 rounded-lg border border-brand-yellow/20">
                            <Lightbulb className="w-4.5 h-4.5 text-brand-yellow flex-shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <p className="font-bold text-white uppercase text-[10px]">Explicación de Tan Barbudo:</p>
                              <p className="text-gray-300 leading-relaxed text-[11px]">
                                {TRIVIA_QUESTIONS[currentQuestionIdx].explanation}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={handleNextTrivia}
                            className="w-full mt-2 cursor-pointer py-2 bg-brand-yellow text-brand-dark font-display font-medium text-xs uppercase tracking-wide rounded-xl border-2 border-brand-dark shadow-sm active:translate-y-0.5 flex items-center justify-center"
                          >
                            {selectedAnswerIdx === TRIVIA_QUESTIONS[currentQuestionIdx].correctIdx 
                              ? "Siguiente Bombeo 💨" 
                              : "Ver resultado del globo 💥"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* TRIVIA LÁTEX EXPLODED - POPPED */}
              {triviaStatus === 'popped' && (
                <motion.div
                  key="trivia-popped"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8 space-y-4"
                  id="trivia-popped-view"
                >
                  <div className="text-5xl animate-bounce">💥</div>
                  <h4 className="font-display font-medium text-lg text-brand-red uppercase tracking-wider">
                    ¡¡BOOM!! ¡EL GLOBO SE ESTALLÓ!
                  </h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                    Elegiste una opción incorrecta. No te preocupes, Profe Gustavo siempre dice: 
                    <span className="text-brand-salmon italic font-bold"> "¡El error es solo parte de la diversión y el show cósmico!"</span>. Recoge el látex virtual ¡y vuelve a intentarlo!
                  </p>
                  
                  <div className="p-3 bg-brand-red/10 border border-brand-red/30 rounded-xl inline-block max-w-xs text-xs text-red-300 text-left">
                    <span className="font-black">💡 Pista de Tan:</span> Lee con atención las explicaciones. ¡Ahí está el secreto para no romper el globo real en tus shows!
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={resetTriviaGame}
                      className="px-5 py-2.5 bg-brand-red hover:bg-brand-red/90 text-white font-display font-medium text-xs uppercase tracking-wider border-2 border-brand-dark rounded-xl sticker-shadow-sm active:translate-y-0.5 flex items-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" /> Tomar Globo Nuevo 🎈
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TRIVIA GRADUATION SCREEN - WON */}
              {triviaStatus === 'won' && (
                <motion.div
                  key="trivia-won"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-6 space-y-4"
                  id="trivia-won-view"
                >
                  <div className="inline-flex p-4 bg-brand-green/20 border-4 border-brand-green rounded-full relative">
                    <span className="text-5xl block animate-pulse select-none">
                      {randomGraduation ? randomGraduation.emoji : '🏆'}
                    </span>
                    <div className="absolute -bottom-1 -right-1 bg-brand-yellow text-[#1C1917] p-1 rounded-full border border-brand-dark font-bold text-[10px]">
                      ⭐
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-medium text-xl text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-2">
                      <Award className="w-5 h-5 text-brand-yellow" />
                      ¡MAESTRO MODELADOR graduado!
                    </h4>
                    <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                      ¡Contestaste 5 preguntas técnicas correctamente de forma consecutiva! Inflaste virtualmente tu globo por completo y has doblado un:
                    </p>
                    <p className="text-sm font-black text-white bg-zinc-800 px-3 py-1.5 rounded-lg inline-block border border-brand-beige/25 mt-2">
                      {randomGraduation?.name}
                    </p>
                    <p className="text-[11px] text-gray-400 italic max-w-xs mx-auto drop-shadow">
                      "{randomGraduation?.text}"
                    </p>
                  </div>

                  <div className="p-3 bg-brand-green/10 border border-brand-green/40 rounded-xl inline-block max-w-sm text-xs text-emerald-300 leading-relaxed text-left">
                    <span className="font-bold text-white block mb-0.5">🏆 Gran Premio Barbudo:</span>
                    ¡Felicidades! Domínas los principios del diámetro, la cola de aire, las marcas biodegradables, el "burping" y los candados de candela. Estás listo para asombrar a los niños reales en canchas y patios.
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={resetTriviaGame}
                      className="px-5 py-2.5 bg-brand-green text-white font-display font-medium text-xs uppercase tracking-wider border-2 border-brand-dark rounded-xl sticker-shadow-sm active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" /> Desafiar Otra Vez
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* 2. FREE PLAY MODE SCENARIOS */}
          {activeMode === 'free' && (
            <motion.div
              key="free-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 text-center"
            >
              {freeStatus === 'idle' && (
                <div className="py-8 space-y-3">
                  <div className="text-5xl animate-pulse">🎈</div>
                  <p className="text-xs font-bold text-gray-300">Paso 1: ¡Elige tu color de látex favorito abajo!</p>
                  <p className="text-[11px] text-gray-400">Y usa el botón "BOMBEAR AIRE" para inflarlo poco a poco.</p>
                </div>
              )}

              {freeStatus === 'inflating' && (
                <div className="flex flex-col items-center py-4">
                  {/* Elastic tube representing inflation scale */}
                  <div className="text-[10px] text-gray-505 uppercase tracking-widest mb-3 font-bold">Tubo de Látex:</div>
                  <motion.div
                    animate={{
                      width: 45 + freePumpCount * 30,
                      height: 18 + freePumpCount * 3,
                      borderRadius: '25px',
                    }}
                    transition={{ type: 'spring', stiffness: 180, damping: 9 }}
                    className={`${freeColor} border-2 border-brand-dark relative flex items-center justify-end pr-1 shadow-lg`}
                  >
                    {/* Air ring indicator */}
                    <div className="w-2.5 h-full bg-white/20 rounded-l absolute left-2 top-0" />
                    {/* Tiny tie block */}
                    <div className="w-2.5 h-1.5 bg-brand-dark/25 rounded absolute right-0 transform translate-x-1" />
                  </motion.div>

                  <p className="text-xs font-bold text-white mt-4 uppercase">
                    Inflado: <span className="text-brand-yellow">{freePumpCount * 20}% ({freePumpCount} bombazos)</span>
                  </p>
                  
                  {freePumpCount < 2 ? (
                    <p className="text-[10.5px] text-gray-400 mt-1">Insuficiente para doblar una figura. ¡Bombea un poco más!</p>
                  ) : freePumpCount > 4 ? (
                    <p className="text-[10.5px] text-brand-red font-bold animate-pulse mt-1">¡CUIDADO! Estás rozando los límites de tensión del látex virtual.</p>
                  ) : (
                    <p className="text-[10.5px] text-brand-green font-bold mt-1">¡Presión espectacular! Elige una figura barbudita para modelarla abajo.</p>
                  )}
                </div>
              )}

              {freeStatus === 'popped' && (
                <div className="py-6 space-y-3">
                  <div className="text-5xl animate-bounce">💥 BUM 💥</div>
                  <p className="text-xs font-bold text-brand-red max-w-xs mx-auto leading-relaxed">{freeJoke}</p>
                  <button
                    onClick={resetFreeGame}
                    className="mt-3 cursor-pointer px-4 py-2 bg-brand-red text-white text-xs font-bold rounded-xl border-2 border-brand-dark shadow-sm flex items-center gap-1 mx-auto active:translate-y-0.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Tomar Otro Globo
                  </button>
                </div>
              )}

              {freeStatus === 'completed' && (
                <div className="py-6 space-y-4">
                  <div className="inline-block p-4 bg-brand-green/20 border-3 border-brand-green rounded-full">
                    <span className="text-5xl block animate-pulse">
                      {freeCreatedFigure?.split(' ')[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{freeCreatedFigure}</h4>
                    <p className="text-xs text-gray-400 italic">¡Felicidades! Has modelado un globo virtual sin ruidos estruendosos.</p>
                  </div>
                  <button
                    onClick={resetFreeGame}
                    className="cursor-pointer px-4 py-2 bg-brand-green text-white text-xs font-bold rounded-xl border-2 border-brand-dark shadow-sm flex items-center gap-1.5 mx-auto active:translate-y-0.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Volver a Modelar
                  </button>
                </div>
              )}

              {/* COLORS SELECTOR FOR FREE MODE */}
              {(freeStatus === 'idle' || freeStatus === 'inflating') && (
                <div className="space-y-4 pt-3 border-t border-brand-beige/15 text-start">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-400">Color Seleccionado:</span>
                    <span className="font-bold text-white">{freeColorName}</span>
                  </div>

                  <div className="flex gap-2.5">
                    {freeColorsList.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setFreeColor(c.bg);
                          setFreeColorName(c.name);
                        }}
                        disabled={freeStatus === 'inflating' && freePumpCount > 0}
                        className={`w-7 h-7 rounded-full border-2 border-brand-dark cursor-pointer transition-transform ${c.bg} ${
                          freeColor === c.bg ? 'scale-125 ring-2 ring-brand-blue' : 'hover:scale-110'
                        } disabled:opacity-55 disabled:cursor-not-allowed`}
                      />
                    ))}
                  </div>

                  {/* ACTION TRIGGER PUMPS */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={handleFreePump}
                      disabled={freeStatus === 'popped' || freeStatus === 'completed'}
                      className="cursor-pointer py-2.5 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-dark font-display font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-brand-dark shadow-sm active:translate-y-0.5"
                    >
                      💨 Bombear Aire
                    </button>
                    <button
                      disabled={freePumpCount < 2 || freeStatus === 'popped' || freeStatus === 'completed'}
                      className="cursor-pointer py-2.5 bg-brand-green hover:bg-brand-green/90 text-white font-display font-semibold text-xs uppercase tracking-wider rounded-xl border-2 border-brand-dark shadow-sm active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600 disabled:border-zinc-900"
                      onClick={() => {
                        const randomFig = freeFiguresList[Math.floor(Math.random() * freeFiguresList.length)];
                        handleFreeTwist(randomFig.img, randomFig.name);
                      }}
                    >
                      🛠️ Torsión Rápida
                    </button>
                  </div>

                  {/* MINI DIRECT SELECTION IF SUFFICIENTLY INFLATED */}
                  {freeStatus === 'inflating' && freePumpCount >= 2 && (
                    <div className="pt-2 animate-fade-in">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Esculpe una figura directa:</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {freeFiguresList.map((fig, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleFreeTwist(fig.img, fig.name)}
                            className="cursor-pointer p-1.5 bg-brand-beige/25 hover:bg-brand-yellow/15 text-center text-[10.5px] font-bold text-white rounded-lg border border-brand-dark/20 flex flex-col items-center justify-center gap-1"
                          >
                            <span className="text-lg">{fig.img}</span>
                            <span className="truncate w-full block text-[9.5px]">{fig.name.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER COMMENTARY */}
      <div className="mt-4 p-3 bg-[#121212] border border-brand-beige/20 rounded-xl text-center text-xs text-gray-400">
        <p className="flex justify-center items-center gap-1">
          <Heart className="w-3.5 h-3.5 text-brand-red" />
          <span>¡Sube tu puntaje o comparte tus figuras en el foro de alumnos!</span>
        </p>
      </div>
    </div>
  );
}
