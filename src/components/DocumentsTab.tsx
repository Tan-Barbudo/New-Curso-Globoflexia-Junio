import React, { useState } from 'react';
import { DocumentAsset } from '../types';
import { FileText, Download, Search, CheckSquare, Sparkles, Printer, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DocumentsTabProps {
  documentsList: DocumentAsset[];
}

export default function DocumentsTab({ documentsList }: DocumentsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocContent, setSelectedDocContent] = useState<{ title: string; content: string[] } | null>(null);

  // Filtered list based on search term
  const filteredDocs = documentsList.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Predefined beautiful mock text-guides based on what is selected
  const handleViewMockDocument = (title: string) => {
    let steps: string[] = [];
    if (title.includes('Esquema de Medidas del Perro')) {
      steps = [
        "🎈 INFLADO: Inflar el globo de calibre 260Q dejando exactamente 4 dedos (aprox. 8 cm) sin inflar al extremo de la cola.",
        "🐾 PASO 1 (HOCICO Y OREJAS): Doblar una burbuja de 3 dedos para el hocico. Mantenerla firme para que no se suelte. Luego, hacer dos burbujas consecutivas de 3 dedos cada una para las orejas.",
        "🐾 PASO 2 (OJO DE CERRADURA): Juntar los extremos de las dos burbujas de oídos y torcerlas juntas (Lock Twist / Giro de Bloqueo) con un movimiento de rotación triple. ¡Listo la cabecita del cachorro!",
        "🐾 PASO 3 (CUELLO Y PATAS DELANTERAS): Torcer una burbuja de 2 dedos para el cuello. Crear luego dos burbujas de 4 dedos para las patas delanteras. Unirlas con un Lock Twist para fijarlas.",
        "🐾 PASO 4 (CUERPO Y PATAS TRASERAS): Hacer una burbuja larga de 6 dedos para el cuerpo del perrito. Crear dos burbujas de 4 dedos para las patas traseras, uniéndolas con bloqueo.",
        "🎀 CONSEJO BARBUDO: El trozo sobrante de globo pasará a ser la cola levantada. ¡Aprieta suavemente hacia la punta para inflar la bolita final!"
      ];
    } else if (title.includes('Guía de Bienvenida')) {
      steps = [
        "💡 LA GRAN PROMESA: Nuestra promesa de marca es transformar vidas a través de la alegría, la creatividad y mensajes con propósito de vida.",
        "😄 REGLA DE ORO 1 (SIEMPRE DIVERTIDO, NUNCA VACÍO): Ninguna figura viene sin un chiste, una gracia o una bonita lección adjunta. El globo es solo la llave para conectar corazones.",
        "📐 REGLA DE ORO 2 (LA SIMPLICIDAD GANA SIEMPRE): Si un niño no entiende tu diseño en 3 segundos, es demasiado complejo. Simplifica tu estructura.",
        "🤝 REGLA DE ORO 3 (LA CONSISTENCIA GENERA CONFIANZA): Mantén los mismos colores, la misma energía y el mismo amor en cada tarima, cumpleaños o taller.",
        "🎯 TU PRIMERA TAREA: Infla un globo entero, hazle un nudo y déjalo explotar intencionadamente. Perder el miedo al estallido te dará el súper poder de la velocidad."
      ];
    } else if (title.includes('Variaciones de Espadas Rápidas')) {
      steps = [
        "🎈 INFLADO: Inflar el globo dejando solo 1 dedo sin inflar en la punta de la cola.",
        "⚔️ ESTILO 1 (SAble Pirata): Plegar un bucle grande de 12 dedos cerca de la boquilla (Giro de Bucle). Pasar el extremo de la espada a través del bucle. ¡Este asidero protege la mano perfectamente!",
        "⚔️ ESTILO 2 (ESpada Medieval): Torcer una mini burbuja de 2 dedos, luego un bucle de 5 dedos, otra burbuja de 2 dedos y otro bucle de 5 dedos. Esto crea la clásica cruz protectora de acero flexible.",
        "⚔️ ESTILO 3 (LA CATANA JAPONESA): Curvar el cuerpo largo del globo con una suave caricia para darle estilo curvo. Doblar dos Pinch Twist rápidos en la base para hacer la empuñadura de samurái.",
        "🎉 DINÁMICA DE JUEGO: Inventa un juramento de caballería cómica antes de entregar cada espada: '¡Te nombro caballero del buen humor!'"
      ];
    } else if (title.includes('Plantilla de Expresiones Faciales')) {
      steps = [
        "🖊️ MATERIAL RECOMENDADO: Usa marcadores de tinta permanente de punta fina y punta gruesa (tipo Sharpie). ¡Nunca uses bolígrafos de punta metálica porque revientan el látex!",
        "👀 DISEÑO 1 (OJOS COMIC): Dibuja dos óvalos grandes juntos. Rellena la parte inferior dejando una pequeña burbuja blanca arriba como reflejo de luz. Añade cejas arqueadas hacia arriba para dar cara tierna.",
        "🐺 DISEÑO 2 (HOCOTE DE OSO): En la burbuja pequeña de la nariz, dibuja un triángulo invertido, una pequeña línea vertical hacia abajo y una amplia sonrisa redondeada de lado a lado.",
        "😉 DISEÑO 3 (CARITA GUIÑANDO): Haz un ojo cerrado en forma de 'U' acostada y un ojo abierto con pestañas de sticker.",
        "✨ RETO BARBUDO: Añade un toque de corrector líquido blanco para darle brillizos especiales a los ojos de tus personajes o animalitos."
      ];
    } else {
      steps = [
        "🎈 REGLAS GENERALES PARA ESTA ESCULTURA:",
        "1. Estira el material vigorosamente antes de inflar.",
        "2. Deja la cola recomendada para liberar presión a medida que avanzan los dobles.",
        "3. Sujeta la primera y última burbuja con tus dedos meñique y anular para evitar desarme espontáneo.",
        "4. ¡Dibújala con marcador permanente y regálala con un abrazo!",
        "*(Consulta la videoclase correspondiente para ver los gestos manuales del formador)*"
      ];
    }

    setSelectedDocContent({
      title: title,
      content: steps
    });
  };

  return (
    <div className="space-y-6" id="documents-tab-root">
      {/* Search and Intro Bar */}
      <div className="bg-white border-4 border-brand-dark rounded-3xl p-6 sticker-shadow flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-brand-dark flex items-center gap-2">
            <FileText className="w-6 h-6 text-brand-blue" />
            Biblioteca de Guías y Descargables
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Descarga de forma digital todos los folletos de práctica de la Academia de Globoflexia.
          </p>
        </div>

        {/* Brand Search Bar */}
        <div className="relative w-full md:w-72 border-3 border-brand-dark rounded-xl bg-brand-beige/10 flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar guías..."
            className="w-full pl-9 pr-4 py-2.5 bg-transparent rounded-xl text-xs font-bold text-brand-dark focus:outline-none placeholder-gray-400"
          />
        </div>
      </div>

      {/* Main interactive grid of documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="documents-grid-wrapper">
        {filteredDocs.map((doc, idx) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white border-3 border-brand-dark rounded-2xl p-5 sticker-shadow-sm hover:sticker-shadow transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Meta info */}
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 bg-brand-blue/10 border border-brand-blue/30 rounded-lg font-mono text-[10px] font-bold text-brand-blue uppercase">
                  {doc.format}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase">{doc.size}</span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display font-bold text-sm text-brand-dark mt-3 leading-snug">
                {doc.title}
              </h3>
              <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                {doc.description}
              </p>
            </div>

            {/* Actions for reading or downloading */}
            <div className="mt-5 pt-4 border-t border-dashed border-gray-100 flex gap-2">
              <button
                onClick={() => handleViewMockDocument(doc.title)}
                className="flex-1 py-2 bg-brand-badge/10 hover:bg-brand-blue/15 text-brand-blue text-[11px] font-bold border-2 border-brand-blue rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer active:translate-y-0.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Leer en Pantalla</span>
              </button>
              
              <button
                onClick={() => {
                  alert(`¡Simulación de descarga completada!\nEl archivo "${doc.title}.${doc.format.toLowerCase()}" se ha guardado en tu carpeta de descargas.`);
                }}
                className="py-2 px-3 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-dark text-[11px] font-bold border-2 border-brand-dark rounded-xl flex items-center justify-center transition-all cursor-pointer active:translate-y-0.5"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}

        {filteredDocs.length === 0 && (
          <div className="col-span-full bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
            <span className="text-3xl block">🔍</span>
            <p className="text-sm font-bold text-gray-500 mt-2">No se encontraron guías con ese nombre.</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Prueba buscando palabras clave como "perro", "guía" o "espada".</p>
          </div>
        )}
      </div>

      {/* Document Reader Overlay/Modal */}
      <AnimatePresence>
        {selectedDocContent && (
          <div className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-brand-dark rounded-3xl w-full max-w-2xl p-6 md:p-8 sticker-shadow-lg relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDocContent(null)}
                className="absolute top-4 right-4 p-1 bg-brand-beige border-2 border-brand-dark rounded-full cursor-pointer hover:bg-brand-red hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-brand-yellow animate-spin" />
                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/10 px-2 py-0.5 rounded">Folleto Oficial Barbudo</span>
              </div>

              <h3 className="font-display font-bold text-lg md:text-xl text-brand-dark leading-snug border-b-2 border-brand-dark pb-3 mb-5 max-w-[90%]">
                {selectedDocContent.title}
              </h3>

              {/* Instructions steps lists */}
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2" id="document-modal-content">
                {selectedDocContent.content.map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-start p-3.5 bg-brand-beige/10 border-2 border-brand-dark/10 rounded-2xl">
                    <span className="w-6 h-6 bg-brand-yellow text-brand-dark border border-brand-dark font-mono text-xs font-bold flex items-center justify-center rounded-full flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions frame */}
              <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-100 flex items-center justify-between">
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Imprimir esta guía para tu libreta de tareas 📖
                </p>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl border-2 border-brand-dark sticker-shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir Folleto</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
