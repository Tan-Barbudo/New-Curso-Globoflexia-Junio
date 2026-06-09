import React, { useState } from 'react';
import { LessonModule } from '../types';
import { 
  Sparkles, 
  Video, 
  Image as ImageIcon, 
  CheckCircle, 
  ExternalLink, 
  HelpCircle, 
  Youtube, 
  Facebook, 
  Instagram, 
  MessageSquare, 
  Link as LinkIcon, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { MODULES_DATA } from '../data/courseData';

interface CourseCustomizerProps {
  modules: LessonModule[];
  onUpdateModules: (updatedModules: LessonModule[]) => void;
}

export default function CourseCustomizer({ modules, onUpdateModules }: CourseCustomizerProps) {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0]?.id || 'mod-1');
  const [youtubeInput, setYoutubeInput] = useState<string>('');
  const [imageInput, setImageInput] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Find active editing module
  const currentModule = modules.find(m => m.id === selectedModuleId);

  // Sync inputs when module dropdown changes
  React.useEffect(() => {
    if (currentModule) {
      setYoutubeInput(currentModule.videoUrl || '');
      setImageInput(currentModule.videoThumbnail || '');
      setTitleInput(currentModule.title || '');
      setDescriptionInput(currentModule.description || '');
      setSuccessMsg('');
      setErrorMsg('');
    }
  }, [selectedModuleId, modules]);

  // Extract ID and convert any YouTube URL to an Embed URL
  const convertToEmbedUrl = (url: string): string => {
    if (!url.trim()) return '';
    
    // If it's already an embed link, return as is
    if (url.includes('youtube.com/embed/')) return url;

    try {
      let videoId = '';
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      } else if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get('v') || '';
      } else if (url.includes('youtube.com/shorts/')) {
        videoId = url.split('youtube.com/shorts/')[1]?.split('?')[0];
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (e) {
      console.error("Error parsing youtube URL", e);
    }
    
    return url; // fallback to user entered URL if we cannot parse
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) {
      setErrorMsg('El título del módulo no puede quedar vacío.');
      return;
    }

    const embedVideoUrl = convertToEmbedUrl(youtubeInput);

    const updated = modules.map((item) => {
      if (item.id === selectedModuleId) {
        return {
          ...item,
          title: titleInput,
          description: descriptionInput,
          videoUrl: embedVideoUrl,
          videoThumbnail: imageInput || item.videoThumbnail
        };
      }
      return item;
    });

    onUpdateModules(updated);
    setSuccessMsg('¡Cambios guardados con éxito en el Módulo! Las lecciones se han actualizado en tiempo real.');
    setErrorMsg('');
    
    setTimeout(() => {
      setSuccessMsg('');
    }, 4500);
  };

  const handleRestoreDefaults = () => {
    if (window.confirm('¿Estás seguro de que deseas restablecer el temario y videos a los valores originales del curso? Se perderán las personalizaciones de enlaces actuales.')) {
      onUpdateModules(MODULES_DATA);
      setSuccessMsg('¡Temario original restaurado con éxito!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="space-y-6" id="customizer-container">
      {/* 1. Official Social networks banner top image */}
      <div className="bg-brand-dark border-4 border-brand-dark rounded-3xl overflow-hidden sticker-shadow relative" id="header-interactive-banner">
        <img 
          src="/input_file_4.png" 
          alt="Tan Barbudo Redes Sociales Banner" 
          referrerPolicy="no-referrer"
          className="w-full h-auto object-cover max-h-56 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent flex items-end p-4 md:p-6">
          <div className="text-white">
            <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Comunidad Oficial</span>
            <h2 className="font-display font-medium text-lg md:text-2xl mt-1 text-white">Canales Interactivos de Tan Barbudo</h2>
          </div>
        </div>
      </div>

      {/* 2. Absolute official links grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" id="social-links-grid-wrapper">
        <a 
          href="https://youtube.com/@payasotanbarbudo?si=orYgWrJ4gCb75uxn" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#FF0000]/10 hover:bg-[#FF0000]/20 border-2 border-brand-dark rounded-2xl p-3 flex flex-col justify-between h-24 hover:-translate-y-1 transition-all cursor-pointer"
        >
          <Youtube className="w-6 h-6 text-[#FF0000]" />
          <div>
            <p className="text-[10px] uppercase font-bold text-[#FF0000]">Canal Oficial</p>
            <p className="text-xs font-black text-white flex items-center justify-between">
              YouTube <ExternalLink className="w-3 h-3 text-gray-500" />
            </p>
          </div>
        </a>

        <a 
          href="https://www.tiktok.com/@payasotanbarbudo?_r=1&_t=ZS-94L1Ar177eG" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-zinc-800 hover:bg-zinc-700 border-2 border-brand-dark rounded-2xl p-3 flex flex-col justify-between h-24 hover:-translate-y-1 transition-all cursor-pointer"
        >
          <span className="text-lg font-bold text-teal-400">🎵</span>
          <div>
            <p className="text-[10px] uppercase font-bold text-teal-400">Videos Locos</p>
            <p className="text-xs font-black text-white flex items-center justify-between">
              TikTok <ExternalLink className="w-3 h-3 text-gray-500" />
            </p>
          </div>
        </a>

        <a 
          href="https://www.facebook.com/share/1CyiA78nQJ/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border-2 border-brand-dark rounded-2xl p-3 flex flex-col justify-between h-24 hover:-translate-y-1 transition-all cursor-pointer"
        >
          <Facebook className="w-6 h-6 text-[#1877F2]" />
          <div>
            <p className="text-[10px] uppercase font-bold text-[#1877F2]">Comunidad</p>
            <p className="text-xs font-black text-white flex items-center justify-between">
              Facebook <ExternalLink className="w-3 h-3 text-gray-500" />
            </p>
          </div>
        </a>

        <a 
          href="https://www.instagram.com/payasotanbarbudo?igsh=dWo2a3U0ZmhiNWdn" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border-2 border-brand-dark rounded-2xl p-3 flex flex-col justify-between h-24 hover:-translate-y-1 transition-all cursor-pointer"
        >
          <Instagram className="w-6 h-6 text-[#E1306C]" />
          <div>
            <p className="text-[10px] uppercase font-bold text-[#E1306C]">Fotos y Reels</p>
            <p className="text-xs font-black text-white flex items-center justify-between">
              Instagram <ExternalLink className="w-3 h-3 text-gray-500" />
            </p>
          </div>
        </a>

        <a 
          href="https://whatsapp.com/channel/0029VadZPwbC6ZveKodyvh41" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366]/10 hover:bg-[#25D366]/20 border-2 border-brand-dark rounded-2xl p-3 flex flex-col justify-between h-24 hover:-translate-y-1 transition-all cursor-pointer"
        >
          <MessageSquare className="w-6 h-6 text-[#25D366]" />
          <div>
            <p className="text-[10px] uppercase font-bold text-[#25D366]">Canal Privado</p>
            <p className="text-xs font-black text-white flex items-center justify-between">
              Canal WhatsApp <ExternalLink className="w-3 h-3 text-gray-500" />
            </p>
          </div>
        </a>

        <a 
          href="https://wa.me/message/4KJH22ULJCVYH1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366]/25 hover:bg-[#25D366]/35 border-2 border-brand-dark rounded-2xl p-3 flex flex-col justify-between h-24 hover:-translate-y-1 transition-all cursor-pointer"
        >
          <span className="text-lg">💬</span>
          <div>
            <p className="text-[10px] uppercase font-bold text-green-400">Contacto Directo</p>
            <p className="text-xs font-black text-white flex items-center justify-between">
              Escribir al WhatsApp <ExternalLink className="w-3 h-3 text-gray-500" />
            </p>
          </div>
        </a>

        <a 
          href="https://tanbarbudo-elpayaso.blogspot.com/?m=1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-amber-600/15 hover:bg-amber-600/25 border-2 border-brand-dark rounded-2xl p-3 flex flex-col justify-between h-24 hover:-translate-y-1 transition-all cursor-pointer"
        >
          <span className="text-lg">📰</span>
          <div>
            <p className="text-[10px] uppercase font-bold text-amber-500">Bitácora Oficial</p>
            <p className="text-xs font-black text-white flex items-center justify-between">
              Mi Blogspot <ExternalLink className="w-3 h-3 text-gray-500" />
            </p>
          </div>
        </a>

        <div className="bg-brand-yellow/15 border-2 border-brand-dark rounded-2xl p-3 flex flex-col justify-between h-24 text-center">
          <span className="text-xl animate-bounce">🎈</span>
          <div>
            <p className="text-[10px] uppercase font-bold text-brand-yellow">Total Clases</p>
            <p className="text-xs font-black text-white">{modules.length} Módulos</p>
          </div>
        </div>
      </div>

      {/* 3. Interactive Content Manager Form */}
      <div className="bg-white border-4 border-brand-dark rounded-3xl p-6 md:p-8 sticker-shadow" id="interactive-content-manager-form">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-brand-dark/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-yellow/10 rounded-xl border border-brand-yellow/30 flex items-center justify-center text-xl text-brand-yellow">
              ⚙️
            </div>
            <div>
              <h3 className="font-display font-medium text-lg text-brand-dark">Personalizar Aula: Vincula tus Videos e Imágenes</h3>
              <p className="text-xs text-gray-500">Cambia los links de YouTube y las portadas de cada lección al instante.</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={handleRestoreDefaults}
            className="cursor-pointer px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar Por Defecto
          </button>
        </div>

        {/* Instructive Help Segment */}
        <div className="bg-[#FFF4E6] border-2 border-brand-yellow/50 rounded-2xl p-4 text-xs text-brand-dark mb-6 space-y-2">
          <p className="font-bold flex items-center gap-1.5 text-brand-yellow-800">
            <HelpCircle className="w-4 h-4 text-brand-yellow" />
            ¿Cómo subo un link de YouTube y mis imágenes?
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-gray-700 leading-relaxed">
            <li>
              <strong>Para Videos de YouTube:</strong> Copia el link normal de la barra de direcciones de tu navegador (ej: <code className="bg-white/60 px-1 rounded font-mono">https://www.youtube.com/watch?v=9Bv_UbeVlqA</code> o <code className="bg-white/60 px-1 rounded font-mono">https://youtu.be/9Bv_UbeVlqA</code>) y pégalo abajo. El sistema lo convertirá automáticamente en el reproductor de video de alta velocidad accesible en tu aula.
            </li>
            <li>
              <strong>Para tus Imágenes:</strong> Puedes utilizar cualquier enlace público a tus fotos en la web. Si deseas usar tus propias imágenes, te sugerimos subirlas de forma gratuita a plataformas hosting como <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold underline">ImgBB</a>, <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold underline">PostImages</a> o almacenar archivos directamente en tu Google Drive (asegurando poner el archivo como "Cualquier persona con el enlace puede ver" y copiando el link de visualización directa).
            </li>
          </ul>
        </div>

        <form onSubmit={handleSaveChanges} className="space-y-4">
          {successMsg && (
            <div className="bg-brand-green/10 border-2 border-brand-green text-brand-green px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
              <CheckCircle className="w-4 h-4" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="bg-brand-red/10 border-2 border-brand-red text-brand-red px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
              <span>⚠️ {errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1: Selector of Module or Lesson */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wide">
                1. Selecciona la Clase a Editar:
              </label>
              <div className="relative rounded-xl border border-brand-dark overflow-hidden">
                <select 
                  value={selectedModuleId}
                  onChange={(e) => setSelectedModuleId(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 bg-[#18181B] text-white text-xs font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-sans"
                >
                  <optgroup label="Programa Regular de la Academia">
                    {modules.filter(m => !m.isBonus).map(m => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Súper Regalos Extra (Bonus)">
                    {modules.filter(m => m.isBonus).map(m => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Step 2: Edit Title of lesson if necessary */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wide">
                Título del Módulo:
              </label>
              <input 
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="Nombre descriptivo de la lección"
                className="w-full px-3 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 3: Set YouTube address link */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wide flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-brand-red" />
                Enlace del Video de YouTube:
              </label>
              <input 
                type="text"
                value={youtubeInput}
                onChange={(e) => setYoutubeInput(e.target.value)}
                placeholder="ej: https://www.youtube.com/watch?v=S_8qM8Q7sI0"
                className="w-full px-3 py-2.5 text-xs text-white"
              />
              <p className="text-[10px] text-gray-400">
                Acepta shorts, videos de cuentas o enlaces directos de computadoras y celulares.
              </p>
            </div>

            {/* Step 4: Set Image cover link */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wide flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-brand-blue" />
                Portada o Portada URL del Módulo:
              </label>
              <input 
                type="text"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="ej: https://images.unsplash.com/photo-..."
                className="w-full px-3 py-2.5 text-xs text-white"
              />
              <p className="text-[10px] text-gray-400">
                Pega cualquier URL de imagen para que sirva de miniatura de portada del tema.
              </p>
            </div>
          </div>

          {/* Step 5: Description text */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-brand-dark uppercase tracking-wide">
              Breve Descripción de Claves Técnicas a Aprender:
            </label>
            <textarea
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              rows={2}
              placeholder="Escribe los detalles o propósitos técnicos de este módulo..."
              className="w-full px-3 py-2.5 text-xs text-white"
            />
          </div>

          {/* Current Preview of the Thumbnail box */}
          {imageInput && (
            <div className="border border-brand-dark/15 rounded-xl p-3 flex items-center gap-4 bg-brand-beige/10">
              <img 
                src={imageInput} 
                alt="Miniatura Preview" 
                referrerPolicy="no-referrer"
                onError={() => console.log("Thumbnail preview loading...")}
                className="w-24 h-16 object-cover rounded-lg border border-brand-dark/20 flex-shrink-0" 
              />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Miniatura Activa:</p>
                <p className="text-xs font-bold text-brand-dark truncate max-w-md">{titleInput}</p>
                <p className="text-[10px] text-brand-green">Enlace cargado correctamente</p>
              </div>
            </div>
          )}

          {/* Submit Action Block */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="cursor-pointer px-6 py-3 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-dark font-display font-bold text-xs uppercase tracking-wider border-2 border-brand-dark rounded-xl sticker-shadow-sm active:translate-y-0.5"
            >
              Guardar Cambios en Lección 🚀
            </button>
          </div>
        </form>
      </div>

      {/* 4. Welcome banner general with image_0 */}
      <div className="bg-white border-4 border-brand-dark rounded-3xl p-6 md:p-8 sticker-shadow flex flex-col md:flex-row items-center gap-6" id="welcome-general-promotion-box">
        <img 
          src="/input_file_0.png" 
          alt="Curso de Globoflexia con Tan Banner General" 
          referrerPolicy="no-referrer"
          className="w-full md:w-1/3 h-auto rounded-2xl border-2 border-brand-dark sticker-shadow-sm select-none"
        />
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-red/10 border-2 border-brand-red rounded-full text-xs font-bold text-brand-red">
            <BookOpen className="w-4.5 h-4.5 animate-pulse" />
            <span>PORTADA GENERAL</span>
          </div>
          <h3 className="font-display font-medium text-lg md:text-2xl text-brand-dark">Bienvenido al Curso de Globoflexia Creativo y Personalizado</h3>
          <p className="text-xs md:text-sm text-gray-500 italic mt-0.5 max-w-xl">
            "Aprende a crear alegría con globos, creatividad y diversión"
          </p>
          <p className="text-xs text-gray-700 leading-relaxed md:max-w-xl">
            Este curso fue diseñado para llevarte desde cero hasta convertirte en un profesional capaz de asombrar y divertir a todo público con propósito, amor y gesticulaciones mágicas. ¡Personalízalo para tus clases de fin de semana utilizando los controles interactivos de arriba!
          </p>
        </div>
      </div>
    </div>
  );
}
