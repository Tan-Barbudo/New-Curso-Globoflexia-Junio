import React, { useMemo, useState } from 'react';
import { Ban, Check, Clock3, Search, ShieldCheck, UserCheck, UserX } from 'lucide-react';
import { AcademyUser, AccessStatus } from '../types';

interface AdminUsersPanelProps {
  users: AcademyUser[];
  currentUserUid: string;
  isLoading: boolean;
  busyUserUid: string;
  error: string;
  onUpdateAccess: (user: AcademyUser, status: AccessStatus) => Promise<void>;
}

const statusLabel: Record<AccessStatus, string> = {
  pending: 'Pendiente',
  approved: 'Aprobado',
  rejected: 'Rechazado',
  blocked: 'Bloqueado',
};

const statusStyle: Record<AccessStatus, string> = {
  pending: 'bg-brand-yellow/15 text-brand-yellow border-brand-yellow/40',
  approved: 'bg-brand-green/15 text-brand-green border-brand-green/40',
  rejected: 'bg-brand-red/15 text-brand-red border-brand-red/40',
  blocked: 'bg-gray-500/15 text-gray-400 border-gray-500/40',
};

export default function AdminUsersPanel({
  users,
  currentUserUid,
  isLoading,
  busyUserUid,
  error,
  onUpdateAccess,
}: AdminUsersPanelProps) {
  const [search, setSearch] = useState('');
  const normalizedSearch = search.trim().toLocaleLowerCase('es');
  const filteredUsers = useMemo(
    () => users.filter((user) =>
      !normalizedSearch
      || user.displayName.toLocaleLowerCase('es').includes(normalizedSearch)
      || user.email.toLocaleLowerCase('es').includes(normalizedSearch)),
    [users, normalizedSearch],
  );

  const pendingCount = users.filter((user) => user.status === 'pending').length;

  const requestStatusChange = async (user: AcademyUser, status: AccessStatus) => {
    if ((status === 'rejected' || status === 'blocked')
      && !window.confirm(`¿Confirmas que deseas ${status === 'blocked' ? 'bloquear' : 'rechazar'} a ${user.displayName}?`)) {
      return;
    }
    await onUpdateAccess(user, status);
  };

  return (
    <section className="bg-white border-4 border-brand-dark rounded-3xl p-5 md:p-7 sticker-shadow space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest">Administración</p>
          <h2 className="font-display text-2xl font-black text-brand-dark">Solicitudes de acceso</h2>
          <p className="text-xs text-gray-500 mt-1">Solo tú puedes aprobar, rechazar o bloquear cuentas.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl border-2 border-brand-yellow/40 bg-brand-yellow/10">
          <Clock3 className="w-5 h-5 text-brand-yellow" />
          <span className="font-bold text-sm text-brand-dark">{pendingCount} pendientes</span>
        </div>
      </div>

      <label className="relative block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nombre o correo"
          className="w-full pl-10 pr-4 py-3 text-sm"
        />
      </label>

      {error && (
        <div className="bg-brand-red/10 border-2 border-brand-red/40 text-brand-red rounded-xl px-4 py-3 text-sm font-semibold">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="py-12 text-center text-sm font-bold text-gray-500">Cargando usuarios…</div>
      ) : filteredUsers.length === 0 ? (
        <div className="py-12 text-center border-2 border-dashed border-gray-700 rounded-2xl">
          <UserCheck className="w-10 h-10 mx-auto text-brand-green mb-3" />
          <p className="font-bold text-brand-dark">No hay usuarios para mostrar.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredUsers.map((user) => {
            const isCurrentAdmin = user.uid === currentUserUid;
            const isBusy = busyUserUid === user.uid;

            return (
              <article key={user.uid} className="border-2 border-gray-800 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="w-12 h-12 rounded-full object-cover border-2 border-gray-700" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-brand-dark truncate">{user.displayName}</p>
                      {user.role === 'admin' && (
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider text-brand-blue">
                          <ShieldCheck className="w-3 h-3" /> Administrador
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    <span className={`inline-flex mt-2 px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase tracking-wider ${statusStyle[user.status]}`}>
                      {statusLabel[user.status]}
                    </span>
                  </div>
                </div>

                {isCurrentAdmin ? (
                  <span className="text-xs font-bold text-brand-green">Tu cuenta administradora</span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.status !== 'approved' && (
                      <button
                        disabled={isBusy}
                        onClick={() => requestStatusChange(user, 'approved')}
                        className="px-3 py-2 rounded-xl bg-brand-green/15 border border-brand-green/40 text-brand-green text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" /> Aprobar
                      </button>
                    )}
                    {user.status === 'pending' && (
                      <button
                        disabled={isBusy}
                        onClick={() => requestStatusChange(user, 'rejected')}
                        className="px-3 py-2 rounded-xl bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <UserX className="w-4 h-4" /> Rechazar
                      </button>
                    )}
                    {user.status === 'approved' && (
                      <button
                        disabled={isBusy}
                        onClick={() => requestStatusChange(user, 'blocked')}
                        className="px-3 py-2 rounded-xl bg-gray-500/10 border border-gray-500/30 text-gray-400 text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Ban className="w-4 h-4" /> Bloquear
                      </button>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
