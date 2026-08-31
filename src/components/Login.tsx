import React from 'react';
import { ArrowRight, Compass, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onGoogleSignIn: () => void;
  isLoading: boolean;
  error: string;
}

export default function Login({ onGoogleSignIn, isLoading, error }: LoginProps) {
  return (
    <div className="min-h-screen bg-[#FFFBF5] flex flex-col items-center justify-between p-4 relative overflow-hidden" id="login-container">
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-yellow/10 blur-xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-60 h-60 rounded-full bg-brand-red/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md text-center pt-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF4E6] border-2 border-brand-dark rounded-full sticker-shadow-sm text-sm font-bold text-brand-dark"
        >
          <Sparkles className="w-4 h-4 text-brand-yellow" />
          <span>Diversión que transforma corazones</span>
        </motion.div>
      </div>

      <div className="w-full max-w-md my-auto z-10" id="login-card-wrapper">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="bg-white border-4 border-brand-dark rounded-3xl p-6 md:p-8 sticker-shadow-lg relative overflow-hidden"
        >
          <div className="text-center mb-7">
            <img
              src="/New-Curso-Globoflexia-Junio/logo.jpg"
              alt="Tan Barbudo"
              className="h-28 mx-auto object-contain drop-shadow-md"
            />

            <div className="flex justify-center items-center gap-3 bg-brand-yellow/10 border border-brand-yellow/30 rounded-2xl p-2.5 mt-4 max-w-sm mx-auto">
              <img
                src="/New-Curso-Globoflexia-Junio/tan-con-globos.png"
                alt="Tan Barbudo con globos"
                className="w-16 h-16 object-contain rounded-xl border border-brand-dark/10"
              />
              <div className="text-left">
                <h1 className="text-sm font-display font-medium text-brand-yellow leading-tight">
                  Academia de Globoflexia
                </h1>
                <p className="text-[11px] text-gray-500">
                  Aprende a crear sonrisas con globos inflados de amor.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-brand-red/10 border-2 border-brand-red text-brand-red px-4 py-3 rounded-xl text-sm font-semibold">
              {error}
            </div>
          )}

          <div className="bg-brand-blue/5 border-2 border-brand-blue/30 rounded-2xl p-4 mb-5 flex gap-3">
            <ShieldCheck className="w-6 h-6 text-brand-blue flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-brand-dark">Acceso protegido</p>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Ingresa con Google. Si es tu primera vez, tu solicitud quedará pendiente hasta que Gustavo la apruebe.
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            type="button"
            onClick={onGoogleSignIn}
            disabled={isLoading}
            className="w-full py-4 bg-white hover:bg-gray-50 text-brand-dark border-3 border-brand-dark font-display font-bold text-base rounded-2xl transition-all sticker-shadow flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-wait"
          >
            <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-black text-lg text-[#4285F4]">G</span>
            <span>{isLoading ? 'Conectando…' : 'Continuar con Google'}</span>
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </motion.button>

          <p className="text-[10px] text-gray-400 text-center mt-4 leading-relaxed">
            Usaremos tu nombre, correo y foto de Google solamente para identificarte dentro de la academia.
          </p>

          <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex justify-around text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Compass className="w-3 h-3 text-brand-green" /> Propósito</span>
            <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-brand-red" /> Amor</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-brand-yellow" /> Transformación</span>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-md text-center pb-6 z-10">
        <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">
          Tan Barbudo — Escuela de Sonrisas y Modelado
        </p>
      </div>
    </div>
  );
}
