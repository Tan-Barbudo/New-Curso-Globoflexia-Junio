import React, { useState } from 'react';
import { Sparkles, HelpCircle, User, Lock, ArrowRight, Play, Compass, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLoginSuccess: (username: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('gustavo@equipandgrow.org');
  const [password, setPassword] = useState('globoflexia');
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Por favor, ingresa tu correo o nombre de usuario.');
      return;
    }
    if (!password.trim()) {
      setError('Por favor, ingresa tu clave secreta de alumno.');
      return;
    }
    
    // Accept any login for convenient access, but validate input
    onLoginSuccess(username);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] flex flex-col items-center justify-between p-4 relative overflow-hidden" id="login-container">
      {/* Decorative Floating Balloons in Back */}
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-yellow/10 blur-xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-60 h-60 rounded-full bg-brand-red/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

      {/* Top Header Slogans */}
      <div className="w-full max-w-md text-center pt-8 z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF4E6] border-2 border-brand-dark rounded-full sticker-shadow-sm text-sm font-bold text-brand-dark"
        >
          <Sparkles className="w-4 h-4 text-brand-yellow animate-spin" />
          <span>Diversión que transforma corazones</span>
        </motion.div>
      </div>

      {/* Main Login Card with Tan Barbudo Style */}
      <div className="w-full max-w-md my-auto z-10" id="login-card-wrapper">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="bg-white border-4 border-brand-dark rounded-3xl p-6 md:p-8 sticker-shadow-lg relative overflow-hidden"
        >
          {/* Brand header simulation */}
          <div className="text-center mb-8">
            <div className="inline-block relative">
              {/* Outer Fun Sticker Frame */}
              <div className="bg-brand-dark text-white text-3xl md:text-4xl font-display font-bold px-6 py-3 rounded-2xl transform -rotate-2 border-2 border-brand-yellow sticker-shadow inline-block tracking-tight">
                <span className="text-brand-red">T</span>
                <span className="text-brand-yellow">A</span>
                <span className="text-brand-green">N</span>
                <span className="text-white"> </span>
                <span className="text-brand-blue">B</span>
                <span className="text-brand-yellow">A</span>
                <span className="text-brand-red">R</span>
                <span className="text-brand-green">B</span>
                <span className="text-brand-blue">U</span>
                <span className="text-brand-yellow">D</span>
                <span className="text-brand-red">O</span>
              </div>
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-brand-salmon rounded-full animate-ping pointer-events-none opacity-40" />
            </div>

            <h2 className="text-lg md:text-xl font-display font-medium text-gray-700 mt-5">
              Academia de Globoflexia
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
              ¡Aprende a crear sonrisas con globos inflados de amor! 🎈
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-red/10 border-2 border-brand-red text-brand-red px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </motion.div>
            )}

            {/* Username Input */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wide">
                Correo Electrónico o Alumno ID
              </label>
              <div className="relative rounded-xl border-3 border-brand-dark bg-brand-beige/20 flex items-center">
                <User className="absolute left-3 w-5 h-5 text-gray-500 pointer-events-none" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError('');
                  }}
                  id="username-input"
                  placeholder="ej. gustavo@equipandgrow.org o alumno"
                  className="w-full pl-10 pr-4 py-3 bg-transparent rounded-xl text-brand-dark font-medium placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wide">
                  Clave de Acceso
                </label>
                <button
                  type="button"
                  onClick={() => setShowHelp(!showHelp)}
                  className="text-xs text-brand-blue font-bold flex items-center gap-1 hover:underline"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  ¿Cuál es mi clave?
                </button>
              </div>
              <div className="relative rounded-xl border-3 border-brand-dark bg-brand-beige/20 flex items-center">
                <Lock className="absolute left-3 w-5 h-5 text-gray-500 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  id="password-input"
                  placeholder="Introduce tu clave de alumno"
                  className="w-full pl-10 pr-10 py-3 bg-transparent rounded-xl text-brand-dark font-medium placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Show help tip panel inside card if activated */}
            {showHelp && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="bg-brand-beige/50 border-2 border-brand-yellow rounded-xl p-3 text-xs text-brand-dark leading-relaxed space-y-1.5"
              >
                <p className="font-bold text-brand-yellow-800">💡 Tip de Ingreso:</p>
                <p>
                  Para propósitos de demostración y evaluación, puedes entrar inmediatamente usando las credenciales predeterminadas sugeridas:
                </p>
                <div className="bg-white p-2 rounded border border-brand-dark font-mono space-y-0.5">
                  <p><strong>Usuario:</strong> gustavo@equipandgrow.org</p>
                  <p><strong>Clave:</strong> globoflexia</p>
                </div>
                <p className="italic">
                  *También puedes ingresar con cualquier nombre y clave que elijas.
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              id="login-submit-btn"
              className="w-full py-4.5 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-dark border-3 border-brand-dark font-display font-bold text-lg rounded-2xl cursor-pointer transition-all sticker-shadow flex items-center justify-center gap-3 active:translate-y-0.5 mt-6"
            >
              <span>¡Entrar al Aula Barbuda!</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Slogan details at bottom of card */}
          <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex justify-around text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Compass className="w-3 h-3 text-brand-green" /> Propósito</span>
            <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-brand-red" /> Amor</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-brand-yellow" /> Transformación</span>
          </div>
        </motion.div>
      </div>

      {/* App Slogan Bottom Footer */}
      <div className="w-full max-w-md text-center pb-6 z-10 flex flex-col items-center">
        <p className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-2">
          ® Tan Barbudo — Escuela de Sonrisas y Modelado
        </p>
        <div className="flex gap-4 text-xs text-brand-blue font-bold">
          <span>#SiempreDivertido</span>
          <span>•</span>
          <span>#LaSimplicidadGana</span>
          <span>•</span>
          <span>#GloboflexiaLove</span>
        </div>
      </div>
    </div>
  );
}
