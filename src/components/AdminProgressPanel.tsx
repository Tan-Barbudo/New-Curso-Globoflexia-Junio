import React, { useMemo, useState } from 'react';
import { Award, BookOpen, CheckCircle2, Clock3, Search, TrendingUp, UserRound } from 'lucide-react';
import { AcademyUser, AdminStudentProgress, LessonModule } from '../types';

interface AdminProgressPanelProps {
  users: AcademyUser[];
  progress: AdminStudentProgress[];
  modules: LessonModule[];
  isLoading: boolean;
  error: string;
}

export default function AdminProgressPanel({ users, progress, modules, isLoading, error }: AdminProgressPanelProps) {
  const [search, setSearch] = useState('');
  const availableModules = useMemo(() => modules.filter((module) => Boolean(module.videoUrl)), [modules]);
  const availableIds = useMemo(() => new Set(availableModules.map((module) => module.id)), [availableModules]);
  const totalLessons = availableModules.length;
  const progressByUserId = useMemo(
    () => new Map(progress.map((item) => [item.userId, item])),
    [progress],
  );

  const rows = useMemo(() => users
    .filter((user) => user.role !== 'admin' && user.status === 'approved')
    .map((user) => {
      const studentProgress = progressByUserId.get(user.uid);
      const completedIds = studentProgress?.completedLessons.filter((id) => availableIds.has(id)) || [];
      const completedCount = completedIds.length;
      const percent = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;
      const lastCompleted = [...availableModules]
        .reverse()
        .find((module) => completedIds.includes(module.id));
      const certificateReady = Boolean(
        modules.find((module) => module.id === 'bonus-4')?.videoUrl
        && completedIds.includes('bonus-4'),
      );

      return { user, studentProgress, completedCount, percent, lastCompleted, certificateReady };
    })
    .filter(({ user }) => {
      const normalized = search.trim().toLocaleLowerCase('es');
      return !normalized
        || user.displayName.toLocaleLowerCase('es').includes(normalized)
        || user.email.toLocaleLowerCase('es').includes(normalized);
    })
    .sort((a, b) => Number(b.certificateReady) - Number(a.certificateReady) || b.percent - a.percent),
  [users, progressByUserId, availableIds, totalLessons, availableModules, modules, search]);

  const startedCount = rows.filter((row) => row.completedCount > 0).length;
  const finishedCount = rows.filter((row) => row.certificateReady).length;

  return (
    <section className="bg-white border-4 border-brand-dark rounded-3xl p-5 md:p-7 sticker-shadow space-y-5">
      <div>
        <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest">Administración</p>
        <h2 className="font-display text-2xl font-black text-brand-dark">Progreso de alumnos</h2>
        <p className="text-xs text-gray-500 mt-1">Información privada disponible únicamente para administradores.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-2xl border-2 border-brand-blue/30 bg-brand-blue/10 flex items-center gap-3">
          <UserRound className="w-6 h-6 text-brand-blue" />
          <div><p className="text-lg font-black text-brand-dark">{rows.length}</p><p className="text-[10px] font-bold text-gray-500">Alumnos aprobados</p></div>
        </div>
        <div className="p-3 rounded-2xl border-2 border-brand-yellow/30 bg-brand-yellow/10 flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-brand-yellow" />
          <div><p className="text-lg font-black text-brand-dark">{startedCount}</p><p className="text-[10px] font-bold text-gray-500">Comenzaron el curso</p></div>
        </div>
        <div className="p-3 rounded-2xl border-2 border-brand-green/30 bg-brand-green/10 flex items-center gap-3">
          <Award className="w-6 h-6 text-brand-green" />
          <div><p className="text-lg font-black text-brand-dark">{finishedCount}</p><p className="text-[10px] font-bold text-gray-500">Listos para certificado</p></div>
        </div>
      </div>

      <label className="relative block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nombre o correo" className="w-full pl-10 pr-4 py-3 text-sm" />
      </label>

      {error && <div className="bg-brand-red/10 border-2 border-brand-red/40 text-brand-red rounded-xl px-4 py-3 text-sm font-semibold">{error}</div>}

      {isLoading ? (
        <div className="py-12 text-center text-sm font-bold text-gray-500">Cargando progreso…</div>
      ) : rows.length === 0 ? (
        <div className="py-12 text-center border-2 border-dashed border-gray-300 rounded-2xl">
          <BookOpen className="w-10 h-10 mx-auto text-gray-400 mb-3" />
          <p className="font-bold text-brand-dark">No hay alumnos para mostrar.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map(({ user, studentProgress, completedCount, percent, lastCompleted, certificateReady }) => (
            <article key={user.uid} className="border-2 border-gray-800 rounded-2xl p-4 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="w-11 h-11 rounded-full object-cover border-2 border-gray-700" />
                  <div className="min-w-0">
                    <p className="font-bold text-brand-dark truncate">{user.displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {certificateReady ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green/15 border border-brand-green/40 text-brand-green rounded-full text-[10px] font-bold uppercase">
                      <Award className="w-3.5 h-3.5" /> Certificado disponible
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 bg-gray-100 border border-gray-300 text-gray-600 rounded-full text-[10px] font-bold uppercase">
                      {completedCount === 0 ? 'No comenzó' : 'En curso'}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1.5">
                    <span>{completedCount} de {totalLessons} clases</span><span>{percent}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full border border-gray-300 overflow-hidden">
                    <div className="h-full bg-brand-green transition-all" style={{ width: `${percent}%` }} />
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 md:text-end space-y-1">
                  <p className="flex md:justify-end items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-brand-green" /> Última: <strong>{lastCompleted?.title || '—'}</strong></p>
                  <p className="flex md:justify-end items-center gap-1"><Clock3 className="w-3.5 h-3.5" /> Actualizado: {studentProgress?.updatedAt || 'Sin actividad'}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
