import React from 'react';
import { Ban, Clock3, LogOut, ShieldX } from 'lucide-react';
import { AcademyUser } from '../types';

interface AccessStatusProps {
  profile: AcademyUser;
  onLogout: () => void;
}

const statusCopy = {
  pending: {
    icon: Clock3,
    title: 'Solicitud enviada',
    message: 'Tu cuenta está esperando la aprobación de Gustavo. Esta pantalla se actualizará automáticamente cuando seas aprobado.',
    color: 'text-brand-yellow',
    background: 'bg-brand-yellow/10',
  },
  rejected: {
    icon: ShieldX,
    title: 'Solicitud no aprobada',
    message: 'Tu solicitud no fue aprobada. Si consideras que se trata de un error, comunícate con Gustavo.',
    color: 'text-brand-red',
    background: 'bg-brand-red/10',
  },
  blocked: {
    icon: Ban,
    title: 'Acceso bloqueado',
    message: 'El acceso de esta cuenta fue suspendido. Comunícate con Gustavo si necesitas ayuda.',
    color: 'text-brand-red',
    background: 'bg-brand-red/10',
  },
} as const;

export default function AccessStatus({ profile, onLogout }: AccessStatusProps) {
  const copy = profile.status === 'approved' ? statusCopy.pending : statusCopy[profile.status];
  const Icon = copy.icon;

  return (
    <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border-4 border-brand-dark rounded-3xl p-7 md:p-9 sticker-shadow-lg text-center">
        <img
          src="/New-Curso-Globoflexia-Junio/logo.jpg"
          alt="Tan Barbudo"
          className="h-24 mx-auto object-contain mb-6"
        />

        <div className={`w-20 h-20 ${copy.background} rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-brand-dark`}>
          <Icon className={`w-10 h-10 ${copy.color}`} />
        </div>

        <h1 className="font-display font-bold text-2xl text-brand-dark">{copy.title}</h1>
        <p className="text-sm text-gray-600 leading-relaxed mt-3">{copy.message}</p>

        <div className="mt-6 bg-brand-beige/30 border-2 border-brand-dark/10 rounded-2xl p-4">
          <p className="font-bold text-brand-dark">{profile.displayName}</p>
          <p className="text-sm text-gray-500 mt-1">{profile.email}</p>
          <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-white border border-brand-dark text-[10px] font-bold uppercase tracking-wider">
            Estado: {profile.status === 'pending' ? 'Pendiente' : profile.status === 'rejected' ? 'Rechazado' : 'Bloqueado'}
          </span>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-brand-dark bg-white hover:bg-gray-50 font-bold text-sm text-brand-dark"
        >
          <LogOut className="w-4 h-4" />
          Ingresar con otra cuenta
        </button>
      </div>
    </div>
  );
}
