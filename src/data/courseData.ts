import { LessonModule, ForumComment } from '../types';

const embed = (videoId: string) => videoId ? `https://www.youtube.com/embed/${videoId}` : '';
const thumbnail = (videoId: string) => videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

export const MODULES_DATA: LessonModule[] = [
  {
    id: 'intro', title: 'Introducción al Curso de Globoflexia',
    description: 'En este video te doy la bienvenida y te explico cómo trabajaremos durante las próximas semanas.',
    isBonus: false, order: 0, duration: 'Bienvenida', difficulty: 'Principiante',
    learnPoints: ['Cómo está organizado el curso.', 'Cómo avanzar y aprovechar cada clase.', 'Qué necesitarás durante las próximas semanas.'],
    videoUrl: embed('W0r-6JJ8SZo'), videoThumbnail: thumbnail('W0r-6JJ8SZo'),
  },
  {
    id: 'mod-1', title: '1. Organización y Primeros Pasos',
    description: 'En esta primera clase conocerás cómo está organizado el curso y comenzaremos a construir una base sólida antes de crear nuestras primeras figuras.',
    isBonus: false, order: 1, duration: 'Clase grabada', difficulty: 'Principiante',
    learnPoints: ['Organización general del curso.', 'Bases necesarias antes de comenzar.', 'Preparación para las primeras figuras.'],
    videoUrl: embed('uabgTdjDMfk'), videoThumbnail: thumbnail('uabgTdjDMfk'),
  },
  {
    id: 'mod-2', title: '2. Infladores para Globoflexia',
    description: 'Conocerás los diferentes tipos de infladores para globoflexia, sus características, ventajas y cuándo conviene utilizar cada uno.',
    isBonus: false, order: 2, duration: 'Clase grabada', difficulty: 'Principiante',
    learnPoints: ['Tipos de infladores.', 'Ventajas de cada modelo.', 'Cómo elegir el inflador adecuado.'],
    videoUrl: embed('mu4jCp8BN3o'), videoThumbnail: thumbnail('mu4jCp8BN3o'),
  },
  {
    id: 'mod-3', title: '3. Tipos y Medidas de Globos',
    description: 'Conocerás a fondo el material con el que trabajaremos: los diferentes tipos de globos, qué significan sus medidas y cómo elegir globos de buena calidad.',
    isBonus: false, order: 3, duration: 'Clase grabada', difficulty: 'Principiante',
    learnPoints: ['Tipos de globos.', 'Significado de sus medidas.', 'Criterios para elegir globos de calidad.'],
    videoUrl: embed('NNaU2kGoMxY'), videoThumbnail: thumbnail('NNaU2kGoMxY'),
  },
  {
    id: 'mod-4', title: '4. Inflado, Nudos y Torsiones Básicas',
    description: 'Aprenderás a inflar correctamente un globo, realizar nudos seguros y dominar las torsiones básicas que son la base de la globoflexia.',
    isBonus: false, order: 4, duration: 'Clase grabada', difficulty: 'Principiante',
    learnPoints: ['Inflado correcto.', 'Nudos seguros.', 'Torsiones fundamentales.'],
    videoUrl: embed('991rgpDtq1g'), videoThumbnail: thumbnail('991rgpDtq1g'),
  },
  {
    id: 'mod-5', title: '5. Mis Primeras Figuras',
    description: 'Comenzarás a transformar las técnicas aprendidas en tus primeras figuras. Practicaremos la técnica 4x4 y realizaremos espada, flor y perro.',
    isBonus: false, order: 5, duration: 'Clase grabada', difficulty: 'Principiante',
    learnPoints: ['Técnica 4x4.', 'Espada, flor y perro.', 'Seguridad, velocidad y precisión.'],
    videoUrl: embed('jyjP7Wy31p0'), videoThumbnail: thumbnail('jyjP7Wy31p0'),
  },
  {
    id: 'mod-6', title: '6. Sombreros con Globos',
    description: 'Aprenderás a crear estructuras básicas de sombreros, adaptarlas y transformarlas en diseños divertidos para cumpleaños, fiestas y actividades infantiles.',
    isBonus: false, order: 6, duration: 'Clase grabada', difficulty: 'Principiante',
    learnPoints: ['Estructuras básicas de sombreros.', 'Adaptación de diseños.', 'Uso en fiestas y actividades infantiles.'],
    videoUrl: embed('ZKy5iBUcZrU'), videoThumbnail: thumbnail('ZKy5iBUcZrU'),
  },
  {
    id: 'mod-7', title: '7. Interpretando y Creando Nuevas Figuras',
    description: 'Ampliaremos el repertorio combinando torsiones conocidas. Aprenderás a interpretar una figura, reconocer sus partes y reutilizar técnicas en diferentes diseños.',
    isBonus: false, order: 7, duration: 'Clase grabada', difficulty: 'Intermedio',
    learnPoints: ['Interpretación de figuras.', 'Reconocimiento de sus partes.', 'Combinación de técnicas conocidas.'],
    videoUrl: embed('8Tsgn9pm6HU'), videoThumbnail: thumbnail('8Tsgn9pm6HU'),
  },
  {
    id: 'mod-8', title: '8. Combinando Medidas de Globos',
    description: 'Aprenderás a incorporar globos 160, 260 y 350, eligiendo la medida adecuada y combinando tamaños, formas y colores para crear figuras más llamativas.',
    isBonus: false, order: 8, duration: 'Clase grabada', difficulty: 'Intermedio',
    learnPoints: ['Uso de globos 160, 260 y 350.', 'Elección de la medida adecuada.', 'Combinación de tamaños, formas y colores.'],
    videoUrl: embed('BZIRceQGIYQ'), videoThumbnail: thumbnail('BZIRceQGIYQ'),
  },
  {
    id: 'mod-9', title: '9. Figuras Estilo Chibi',
    description: 'Crearás figuras estilo chibi, caracterizadas por cabezas grandes, cuerpos pequeños y una apariencia tierna y divertida.',
    isBonus: false, order: 9, duration: 'Clase grabada', difficulty: 'Intermedio',
    learnPoints: ['Proporciones del estilo chibi.', 'Construcción de cabezas y cuerpos.', 'Personalidad y detalles.'],
    videoUrl: embed('hZog_ccBe3s'), videoThumbnail: thumbnail('hZog_ccBe3s'),
  },
  {
    id: 'mod-10', title: '10. Figuras de Mayor Dificultad',
    description: 'Combinaremos varias técnicas dentro de una misma figura, observando proporciones, uniendo partes y trabajando detalles para lograr resultados más profesionales.',
    isBonus: false, order: 10, duration: 'Clase grabada', difficulty: 'Intermedio',
    learnPoints: ['Combinación de técnicas.', 'Proporciones y unión de partes.', 'Detalles para un acabado profesional.'],
    videoUrl: embed('6JKL09Wr3cY'), videoThumbnail: thumbnail('6JKL09Wr3cY'),
  },
  {
    id: 'mod-11', title: '11. Replicando y Diseñando Figuras',
    description: 'Pasarás de copiar figuras a comprender cómo están construidas: observar formas, dividir una figura en partes y adaptar técnicas para crear diseños propios.',
    isBonus: false, order: 11, duration: 'Clase grabada', difficulty: 'Intermedio',
    learnPoints: ['Análisis de formas.', 'División de la figura en partes.', 'Adaptación y creación de diseños propios.'],
    videoUrl: embed('g1csfJzci4w'), videoThumbnail: thumbnail('g1csfJzci4w'),
  },
  {
    id: 'mod-12', title: '12. Emprendiendo con Globos',
    description: 'Aprenderás sobre costos, materiales, cálculo de precios, tiempo de trabajo, presentación del servicio y cómo comenzar a ofrecer globoflexia en eventos.',
    isBonus: false, order: 12, duration: 'Clase grabada', difficulty: 'Intermedio',
    learnPoints: ['Costos y materiales.', 'Cálculo de precios y tiempo.', 'Presentación y venta del servicio.'],
    videoUrl: embed('4Yf0n9S5VfI'), videoThumbnail: thumbnail('4Yf0n9S5VfI'),
  },
  {
    id: 'mod-13', title: '13. Globos y Medio Ambiente',
    description: 'Conocerás el látex, la biodegradabilidad, la compostabilidad, los globos metalizados y el helio, junto con buenas prácticas de uso y descarte responsable.',
    isBonus: false, order: 13, duration: 'Clase grabada', difficulty: 'Principiante',
    learnPoints: ['Látex y biodegradabilidad.', 'Globos metalizados y helio.', 'Uso y descarte responsable.'],
    videoUrl: embed('2UIMpBKhDWU'), videoThumbnail: thumbnail('2UIMpBKhDWU'),
  },
  {
    id: 'mod-14', title: '14. Menú de Figuras con Globos',
    description: 'Organizarás tus figuras en un menú práctico, seleccionando diseños según dificultad y tiempo, limitando opciones y presentando el repertorio claramente.',
    isBonus: false, order: 14, duration: 'Clase grabada', difficulty: 'Intermedio',
    learnPoints: ['Selección de diseños.', 'Organización por dificultad y tiempo.', 'Presentación clara del repertorio.'],
    videoUrl: embed('HvO4XDg0OKg'), videoThumbnail: thumbnail('HvO4XDg0OKg'),
    documents: [
      {
        id: 'doc-menu-globoflexia',
        title: 'Plantilla de Menú de Globoflexia',
        size: 'Plantilla editable',
        format: 'CANVA',
        downloadUrl: 'https://canva.link/0b36i1thsnzlx0i',
        description: 'Plantilla editable para organizar y presentar tu menú de figuras.',
      },
    ],
  },
  {
    id: 'mod-15', title: '15. Globoflexia en Cumpleaños y Eventos',
    description: 'Aprenderás qué preguntar antes de un evento, calcular tiempos, organizar turnos, elegir figuras, preparar materiales e interactuar con el público.',
    isBonus: false, order: 15, duration: 'Clase grabada', difficulty: 'Intermedio',
    learnPoints: ['Planificación del evento.', 'Cálculo de tiempos y organización de turnos.', 'Preparación e interacción con el público.'],
    videoUrl: embed('C9NOWPMT-kQ'), videoThumbnail: thumbnail('C9NOWPMT-kQ'),
  },
  {
    id: 'mod-16', title: '16. Últimas Figuras y Cierre',
    description: 'Realizaremos nuevas figuras, repasaremos los conocimientos adquiridos y veremos cómo continuar practicando, ampliar el repertorio y desarrollar un estilo propio.',
    isBonus: false, order: 16, duration: 'Clase grabada', difficulty: 'Avanzado',
    learnPoints: ['Aplicación final de las técnicas.', 'Repaso del recorrido.', 'Próximos pasos y estilo propio.'],
    videoUrl: embed('vqgb5m7Wfrw'), videoThumbnail: thumbnail('vqgb5m7Wfrw'),
  },
  {
    id: 'bonus-1', title: 'Bonus 1: Contando Historias con Globos',
    description: 'Aprende a utilizar figuras y transformaciones con globos para acompañar historias, captar la atención y comunicar un mensaje.',
    isBonus: true, order: 17, duration: 'Clase bonus', difficulty: 'Intermedio',
    learnPoints: ['Estructura de una historia con globos.', 'Transformaciones visuales.', 'Participación y mensaje final.'],
    videoUrl: embed('dlz4x84Ho-E'), videoThumbnail: thumbnail('dlz4x84Ho-E'),
    documents: [
      {
        id: 'doc-contando-historias',
        title: 'Contando Historias con Globos',
        size: 'Ebook',
        format: 'PDF',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=16h36SGpHWzMysT_iOw_Sn9pfs3bqYI2_',
        description: 'Ebook complementario del bonus Contando Historias con Globos.',
      },
    ],
  },
  {
    id: 'bonus-2', title: 'Bonus 2: Estructura y Trucos usando Globoflexia',
    description: 'Descubre cómo estructurar y presentar trucos con globos para crear expectativa, sorpresa y un cierre memorable.',
    isBonus: true, order: 18, duration: 'Clase bonus', difficulty: 'Intermedio',
    learnPoints: ['Estructura de presentación.', 'Trucos y efectos con globos.', 'Sorpresa y cierre.'],
    videoUrl: embed('EeHNfRi13eQ'), videoThumbnail: thumbnail('EeHNfRi13eQ'),
  },
  {
    id: 'bonus-3', title: 'Bonus 3: Rutinas y Guiones con Globos',
    description: 'Contenido en preparación. Aquí aprenderás a transformar trucos y figuras en rutinas completas con estructura, interacción y cierre.',
    isBonus: true, order: 19, duration: 'Próximamente', difficulty: 'Intermedio',
    learnPoints: ['Estructura de rutinas.', 'Interacción con el público.', 'Creación de guiones con globos.'],
    videoUrl: '', videoThumbnail: '',
  },
  {
    id: 'bonus-4', title: 'Bonus 4: Globoterapia Recreativa',
    description: 'Contenido en preparación. Trabajaremos participación, creatividad, expresión, juego e interacción mediante actividades recreativas con globos.',
    isBonus: true, order: 20, duration: 'Próximamente', difficulty: 'Intermedio',
    learnPoints: ['Participación y creatividad.', 'Expresión y juego.', 'Actividades recreativas con globos.'],
    videoUrl: '', videoThumbnail: '',
  },
];

// El foro comienza vacío. Las publicaciones reales se cargan desde Firestore.
export const INITIAL_COMMENTS: ForumComment[] = [];
