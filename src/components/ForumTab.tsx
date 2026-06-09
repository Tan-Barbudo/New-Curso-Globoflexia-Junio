import React, { useState } from 'react';
import { ForumComment } from '../types';
import { MessageSquare, Heart, Send, Filter, AlertCircle, MessageCircle, HelpCircle, Star, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';

interface ForumTabProps {
  comments: ForumComment[];
  currentUser: string;
  onAddComment: (content: string, category: 'Duda' | 'Logro' | 'Inspiración' | 'General') => void;
  onAddReply: (commentId: string, content: string) => void;
  onToggleLike: (commentId: string) => void;
}

export default function ForumTab({ comments, currentUser, onAddComment, onAddReply, onToggleLike }: ForumTabProps) {
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentCategory, setNewCommentCategory] = useState<'Duda' | 'Logro' | 'Inspiración' | 'General'>('General');
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [activeReplyBox, setActiveReplyBox] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Duda' | 'Logro' | 'Inspiración' | 'General'>('All');

  const categories: ('Duda' | 'Logro' | 'Inspiración' | 'General')[] = ['General', 'Duda', 'Logro', 'Inspiración'];

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    onAddComment(newCommentText.trim(), newCommentCategory);
    setNewCommentText('');
  };

  const handlePostReply = (commentId: string) => {
    const text = replyTexts[commentId];
    if (!text || !text.trim()) return;
    onAddReply(commentId, text.trim());
    setReplyTexts({ ...replyTexts, [commentId]: '' });
    setActiveReplyBox(null);
  };

  // Filter based on selected tag
  const filteredComments = comments.filter(c => 
    categoryFilter === 'All' ? true : c.category === categoryFilter
  );

  return (
    <div className="space-y-6" id="forum-tab-container">
      {/* Community Intro Banner */}
      <div className="bg-white border-4 border-brand-dark rounded-3xl p-6 sticker-shadow md:flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-brand-dark flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-brand-salmon" />
            Foro Comunitario - Alumnos Barbudos
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Resuelve tus dudas, inspira a otros con tus figuras y celebra tus logros con la red de estudiantes.
          </p>
        </div>

        {/* Category Filters row */}
        <div className="flex flex-wrap gap-1.5 mt-4 md:mt-0" id="forum-filters">
          <button
            onClick={() => setCategoryFilter('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 border-brand-dark cursor-pointer transition-all ${
              categoryFilter === 'All' 
                ? 'bg-brand-dark text-white' 
                : 'bg-white hover:bg-brand-beige/35 text-brand-dark'
            }`}
          >
            Todos ({comments.length})
          </button>
          {categories.map((cat) => {
            const count = comments.filter(c => c.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 border-brand-dark cursor-pointer transition-all flex items-center gap-1 ${
                  categoryFilter === cat 
                    ? cat === 'Duda' ? 'bg-brand-red text-white' :
                      cat === 'Logro' ? 'bg-brand-green text-white' :
                      cat === 'Inspiración' ? 'bg-brand-blue text-brand-dark' :
                      'bg-brand-yellow text-brand-dark'
                    : 'bg-white hover:bg-brand-beige/35 text-brand-dark'
                }`}
              >
                <span>
                  {cat === 'Duda' ? '❓' :
                   cat === 'Logro' ? '🏆' :
                   cat === 'Inspiración' ? '💡' : '🎈'}
                </span>
                <span>{cat} ({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="forum-columns-grid">
        {/* Left Column: Create Post Form */}
        <div className="lg:col-span-1 space-y-4">
          <form 
            onSubmit={handlePostComment}
            className="bg-white border-4 border-brand-dark rounded-3xl p-5 md:p-6 sticker-shadow space-y-4"
            id="create-post-form"
          >
            <h3 className="font-display font-bold text-base text-brand-dark">
              ¿Quieres compartir algo? Let's go!
            </h3>

            {/* Select category */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-500 uppercase">Categoría de Mensaje</label>
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNewCommentCategory(cat)}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-bold border-2 border-brand-dark tracking-wide flex items-center gap-1 justify-center transition-all ${
                      newCommentCategory === cat
                        ? cat === 'Duda' ? 'bg-brand-red/10 border-brand-red text-brand-red' :
                          cat === 'Logro' ? 'bg-brand-green/10 border-brand-green text-brand-green' :
                          cat === 'Inspiración' ? 'bg-brand-blue/10 border-brand-blue text-brand-blue' :
                          'bg-brand-yellow/10 border-brand-yellow text-brand-yellow-850'
                        : 'bg-transparent text-gray-500 hover:bg-brand-beige/10'
                    }`}
                  >
                    <span>
                      {cat === 'Duda' ? '❓' :
                       cat === 'Logro' ? '🏆' :
                       cat === 'Inspiración' ? '💡' : '🎈'}
                    </span>
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input content */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-500 uppercase">Mensaje</label>
              <div className="border-3 border-brand-dark rounded-xl bg-brand-beige/10 p-1">
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="ej: ¿Cómo les quedó el osito del Módulo 8? Aquí batallando con las orejitas de pellizco..."
                  rows={4}
                  className="w-full bg-transparent p-2 text-xs md:text-sm font-semibold text-brand-dark placeholder-gray-400 focus:outline-none resize-none"
                />
              </div>
              <p className="text-[10px] text-gray-400 italic">
                *Por favor, sé amable y mantén el respeto comunitario.
              </p>
            </div>

            {/* Submit btn */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-brand-salmon hover:bg-brand-salmon/90 text-white font-display font-bold border-2 border-brand-dark rounded-2xl cursor-pointer transition-all sticker-shadow-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Publicar Comentario</span>
            </motion.button>
          </form>

          {/* Guidelines info card */}
          <div className="bg-[#FFF4E6] border-2 border-brand-yellow rounded-2xl p-4 flex gap-3 text-xs text-brand-dark">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-brand-yellow" />
            <div>
              <p className="font-bold">Reglas del Foro Tan Barbudo:</p>
              <p className="mt-0.5 text-gray-600 leading-normal">
                Nuestros facilitadores y el Profe Gustavo leen el foro a diario. Si tienes problemas técnicos de globos que se revientan, ¡asegúrate de etiquetar tu duda como <span className="font-bold text-brand-red">#Duda</span>!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Feed of comments */}
        <div className="lg:col-span-2 space-y-4" id="forum-feed-wrapper">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white border-4 border-brand-dark rounded-3xl p-5 md:p-6 sticker-shadow relative"
              id={`comment-${comment.id}`}
            >
              {/* Comment Header: Author info & Category tag */}
              <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={comment.authorAvatar}
                    alt={comment.authorName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full border-2 border-brand-dark bg-brand-beige"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-brand-dark">{comment.authorName}</h4>
                      <span className={`px-2 py-0.5 text-[9px] font-bold rounded border uppercase tracking-wider ${
                        comment.authorRole === 'Profesor' ? 'bg-brand-yellow/15 text-brand-yellow-800 border-brand-yellow' :
                        comment.authorRole === 'Admin' ? 'bg-brand-blue/10 text-brand-blue border-brand-blue' :
                        'bg-gray-100 text-gray-500 border-gray-300'
                      }`}>
                        {comment.authorRole}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold">{comment.date}</p>
                  </div>
                </div>

                {/* Category Badge element */}
                <span className={`px-2.5 py-1 text-[10px] font-bold border-2 border-brand-dark rounded-full ${
                  comment.category === 'Duda' ? 'bg-brand-red/10 text-brand-red' :
                  comment.category === 'Logro' ? 'bg-brand-green/10 text-brand-green' :
                  comment.category === 'Inspiración' ? 'bg-brand-blue/10 text-brand-blue' :
                  'bg-brand-yellow/15 text-brand-yellow-850'
                }`}>
                  {comment.category === 'Duda' ? '❓ Duda' :
                   comment.category === 'Logro' ? '🏆 Logro' :
                   comment.category === 'Inspiración' ? '💡 Inspiración' : '🎈 General'}
                </span>
              </div>

              {/* Core Content */}
              <p className="text-xs md:text-sm text-gray-700 font-medium leading-relaxed my-2 whitespace-pre-wrap">
                {comment.content}
              </p>

              {/* Actions row: Like buttons, Reply hooks */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-dashed border-gray-100 text-xs font-bold text-gray-500">
                <button
                  onClick={() => onToggleLike(comment.id)}
                  id={`like-comment-btn-${comment.id}`}
                  className={`flex items-center gap-1 hover:text-brand-red transition-all cursor-pointer ${
                    comment.likedByCurrentUser ? 'text-brand-red scale-105' : ''
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${comment.likedByCurrentUser ? 'fill-current text-brand-red' : ''}`} />
                  <span>{comment.likes} {comment.likes === 1 ? 'Me gusta' : 'Me gustas'}</span>
                </button>

                <button
                  onClick={() => setActiveReplyBox(activeReplyBox === comment.id ? null : comment.id)}
                  className="flex items-center gap-1 hover:text-brand-blue transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Responder ({comment.replies.length})</span>
                </button>
              </div>

              {/* Nested Replies Loop */}
              {comment.replies.length > 0 && (
                <div className="mt-4 pl-4 md:pl-6 border-l-3 border-brand-yellow space-y-3 bg-brand-beige/10 p-3 rounded-2xl">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="text-xs">
                      <div className="flex items-center gap-1.5 mb-1 bg-white inline-flex px-1.5 py-0.5 rounded border border-gray-200">
                        <img
                          src={reply.authorAvatar}
                          alt={reply.authorName}
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full border border-brand-dark bg-brand-beige"
                        />
                        <span className="font-bold text-brand-dark">{reply.authorName}</span>
                        <span className={`text-[8px] font-bold uppercase ${
                          reply.authorRole === 'Profesor' ? 'text-brand-yellow' : 'text-gray-400'
                        }`}>
                          • {reply.authorRole}
                        </span>
                        <span className="text-[8px] text-gray-400">• {reply.date}</span>
                      </div>
                      <p className="text-gray-600 font-medium leading-relaxed pl-1">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Toggle Reply box area */}
              {activeReplyBox === comment.id && (
                <div className="mt-4 pt-3 border-t border-dashed border-gray-100 flex gap-2">
                  <div className="flex-1 border-2 border-brand-dark bg-[#FFFDFB] rounded-xl px-2.5 py-1.5 flex items-center">
                    <input
                      type="text"
                      placeholder="Escribe tu respuesta aquí..."
                      value={replyTexts[comment.id] || ''}
                      onChange={(e) => setReplyTexts({ ...replyTexts, [comment.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handlePostReply(comment.id);
                      }}
                      className="w-full bg-transparent text-xs font-semibold text-brand-dark focus:outline-none placeholder-gray-400"
                    />
                  </div>
                  <button
                    onClick={() => handlePostReply(comment.id)}
                    className="py-2 px-4 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-dark text-xs font-bold border-2 border-brand-dark rounded-xl transition-all cursive"
                  >
                    Enviar
                  </button>
                </div>
              )}
            </div>
          ))}

          {filteredComments.length === 0 && (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
              <span className="text-3xl block">💬</span>
              <p className="text-sm font-bold text-gray-500 mt-2">No hay publicaciones en esta categoría todavía.</p>
              <p className="text-[11px] text-gray-400 mt-0.5">¡Sé el primero e inicia la conversación escribiendo al lado izquierdo!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
