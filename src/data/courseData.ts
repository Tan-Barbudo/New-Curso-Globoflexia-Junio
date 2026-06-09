import { LessonModule, DocumentAsset, ForumComment } from '../types';

export const MODULES_DATA: LessonModule[] = [
  // 16 MODULOS REGULARES
  {
    id: 'mod-1',
    title: '1. Los Primeros Pasos en la Globoflexia',
    description: 'Aprende los fundamentos del modelado de globos y la magia detrás de transformar aire en sonrisas instantáneas.',
    isBonus: false,
    order: 1,
    duration: '15 min',
    difficulty: 'Principiante',
    learnPoints: [
      'Bienvenida oficial al curso de la mano de Tan Barbudo.',
      'Mentalidad creativa: Todo error es parte del show.',
      'Qué es exactamente la globoflexia con propósito.',
      'Sistemas recomendados para sacarle el máximo partido a este curso.'
    ],
    videoUrl: 'https://www.youtube.com/embed/9Bv_UbeVlqA',
    videoThumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-1',
        title: 'Guía de Bienvenida - El Manifiesto Barbudo',
        size: '1.2 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'La mentalidad del artista de globos de Tan Barbudo, filosofía de diversión con propósito.'
      }
    ]
  },
  {
    id: 'mod-2',
    title: '2. Conociendo los Materiales',
    description: 'Conoce los calibres profesionales (como el clásico 260Q), marcas adecuadas, infladores de doble acción y el cuidado del material.',
    isBonus: false,
    order: 2,
    duration: '20 min',
    difficulty: 'Principiante',
    learnPoints: [
      'Tipos de globos y calibres profesionales.',
      'Medidas estándar para figuras comerciales.',
      'Marcas profesionales biodegradables (Sempertex, Qualatex).',
      'Herramientas básicas e infladores de doble acción.'
    ],
    videoUrl: 'https://www.youtube.com/embed/S_8qM8Q7sI0',
    videoThumbnail: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-2',
        title: 'Ficha Técnica de Calibres y Marcas Profesionales',
        size: '800 KB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Tabla comparativa para comprar globos sin desperdiciar dinero.'
      }
    ]
  },
  {
    id: 'mod-3',
    title: '3. El Arte de Inflar y Cuidar los Globos',
    description: 'Domina la técnica del inflado correcto dejando la cola de descompresión y entiende la conservación del látex.',
    isBonus: false,
    order: 3,
    duration: '18 min',
    difficulty: 'Principiante',
    learnPoints: [
      'Técnicas ergonómicas para un inflado correcto.',
      'Duración óptima de la figura inflada.',
      'Manejo de gas helio vs aire convencional.',
      'Cuidados esenciales contra el calor y el sol.',
      'Errores comunes al empezar y cómo evitarlos.'
    ],
    videoUrl: 'https://www.youtube.com/embed/jZ_v7G_2N1Y',
    videoThumbnail: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-3',
        title: 'Infografía: Pasos del Inflado y Técnica de Nudo Rápido',
        size: '1.5 MB',
        format: 'PNG',
        downloadUrl: '#',
        description: 'Póster descargable ilustrado para tener al lado de tu mesa de práctica.'
      }
    ]
  },
  {
    id: 'mod-4',
    title: '4. Técnicas Fundamentales',
    description: 'Aprende los giros estelares que forman los bloques constructores de cualquier diseño en globoflexia.',
    isBonus: false,
    order: 4,
    duration: '25 min',
    difficulty: 'Principiante',
    learnPoints: [
      'Amarres seguros que no se deshacen.',
      'Burbujas simétricas de varios calibres.',
      'Torsiones por pliegue, de pellizco y de bucle.',
      'La famosa técnica ergonómica 4x4.',
      'Creación de la cabeza del perro simétrico.'
    ],
    videoUrl: 'https://www.youtube.com/embed/K8Z029Oq4x4',
    videoThumbnail: 'https://images.unsplash.com/photo-1485550409059-9afb054cada4?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-4',
        title: 'Glosario Visual de Torsiones Técnicas',
        size: '950 KB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Diccionario con fotos de cada tipo de doblez: pinch, lock, fold, tulip.'
      }
    ]
  },
  {
    id: 'mod-5',
    title: '5. Figuras para Comenzar',
    description: 'Pon en práctica tus dotes esculpiendo tus primeras tres figuras clásicas que vuelven locos a los niños.',
    isBonus: false,
    order: 5,
    duration: '22 min',
    difficulty: 'Principiante',
    learnPoints: [
      'La clásica e invencible espada pirata.',
      'La margarita estelar de pétalos de bucle.',
      'La simpática y diminuta abejita movediza.'
    ],
    videoUrl: 'https://www.youtube.com/embed/ZqRorKms148',
    videoThumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-5',
        title: 'Esquema de Medidas en Dedos: Espada y Flor',
        size: '500 KB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Medida exacta para que las proporciones queden equilibradas.'
      }
    ]
  },
  {
    id: 'mod-6',
    title: '6. Sombreros y Diversión',
    description: 'Transforma la fiesta en un carnaval vistoso creando coronas y accesorios portátiles que desatan risas.',
    isBonus: false,
    order: 6,
    duration: '15 min',
    difficulty: 'Principiante',
    learnPoints: [
      'El sombrero flamenco ajustable.',
      'El gorro marciano con antenas locas.',
      'El micrófono de globos para karaoke divertido.'
    ],
    videoUrl: 'https://www.youtube.com/embed/p1oE_LwunDo',
    videoThumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-6',
        title: 'Catálogo Visual de Sombreros de Carnaval',
        size: '1.1 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Aprende a medir cabezas de forma interactiva y cómica.'
      }
    ]
  },
  {
    id: 'mod-7',
    title: '7. Figuras vs Personajes',
    description: 'Aprende a diferenciar entre modelar una simple réplica plástica e inyectar carismas alegres a una obra.',
    isBonus: false,
    order: 7,
    duration: '25 min',
    difficulty: 'Intermedio',
    learnPoints: [
      'La paleta de colores para evocar emociones.',
      'Diseño visual y líneas de fuerza en el látex.',
      'Interpretación cómica de personajes.'
    ],
    videoUrl: 'https://www.youtube.com/embed/hbeREw9m_hE',
    videoThumbnail: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-7',
        title: 'Esquema de Colores Emocionales',
        size: '1.4 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Aprende qué colores combinan mejor para evocar alegría.'
      }
    ]
  },
  {
    id: 'mod-8',
    title: '8. Construyendo Personajes',
    description: 'Estudia el ensamble de proporciones humanas anatómicas usando múltiples globos y pellizcos de bloqueo.',
    isBonus: false,
    order: 8,
    duration: '30 min',
    difficulty: 'Intermedio',
    learnPoints: [
      'Modelado de cabezas expresivas.',
      'Brazos y manos con giros pellizco.',
      'Piernas estructuradas y pies planos.',
      'Control riguroso de proporciones.'
    ],
    videoUrl: 'https://www.youtube.com/embed/bZnt9T_u7F8',
    videoThumbnail: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-8',
        title: 'Guía de Construcción Anatómica de Personajes',
        size: '2.0 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Manual de proporciones estandarizadas para personajes de varios globos.'
      }
    ]
  },
  {
    id: 'mod-9',
    title: '9. Estilo Chibi con Globos',
    description: 'La belleza en lo diminuto. Diseña figuras cabezonas de estilo kawaii que cautivan con minimalismo estético.',
    isBonus: false,
    order: 9,
    duration: '28 min',
    difficulty: 'Intermedio',
    learnPoints: [
      'Principios del diseño chibi.',
      'Proporciones de cabeza grande y cuerpo diminuto.',
      'Expresiones cautivantes con trazos mínimos.',
      'Técnicas de personalización.'
    ],
    videoUrl: 'https://www.youtube.com/embed/b6mZpD96vHw',
    videoThumbnail: 'https://images.unsplash.com/photo-1552728089-57bdde30ebd3?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-9',
        title: 'Plantilla de Ojos Chibi y Expresiones Tiernas',
        size: '1.2 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Plantillas que puedes imprimir o calcar sobre tus esferas de látex.'
      }
    ]
  },
  {
    id: 'mod-10',
    title: '10. Cómo Crear Tus Propias Figuras',
    description: 'Desbloquea el libre albedrío artístico. Pasa de replicar tutoriales a inventar tus propias criaturas.',
    isBonus: false,
    order: 10,
    duration: '24 min',
    difficulty: 'Intermedio',
    learnPoints: [
      'Fomentar la creatividad libre infantil.',
      'Adaptación geométrica a formas de la naturaleza.',
      'Improvisación teatral en público activo.',
      'Método de bocetado rápido en un globo.'
    ],
    videoUrl: 'https://www.youtube.com/embed/oQFrC1_N2J4',
    videoThumbnail: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-10',
        title: 'Bitácora Barbuda del Diseñador',
        size: '750 KB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Ficha para dibujar y estructurar tus nuevos diseños y dobles.'
      }
    ]
  },
  {
    id: 'mod-11',
    title: '11. Globoflexia para Cumpleaños y Eventos',
    description: 'Sobrevive y reina en tus primeros eventos reales con alta afluencia de niños sin perder los cabales.',
    isBonus: false,
    order: 11,
    duration: '26 min',
    difficulty: 'Intermedio',
    learnPoints: [
      'Atención infantil respetuosa y lúdica.',
      'Modelado veloz en menos de 45 segundos.',
      'Organización de filas interactivas.',
      'Crear una experiencia mágica inolvidable.'
    ],
    videoUrl: 'https://www.youtube.com/embed/A08pUuEun3s',
    videoThumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-11',
        title: 'Manual de Logística y Filas Divertidas',
        size: '3.1 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Estrategias y chistes para calmar a los niños ansiosos en la fila.'
      }
    ]
  },
  {
    id: 'mod-12',
    title: '12. Presentación y Decoración',
    description: 'Aprende a empaquetar tus figuras y a conformar arcos o torres llamativas para elevar el caché visual del salón.',
    isBonus: false,
    order: 12,
    duration: '35 min',
    difficulty: 'Avanzado',
    learnPoints: [
      'Combos de figuras agrupadas temáticamente.',
      'Exhibición e iluminación de esculturas.',
      'Armado de marcos de decoración básica.'
    ],
    videoUrl: 'https://www.youtube.com/embed/9Bv_UbeVlqA',
    videoThumbnail: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-12',
        title: 'Guía de Arcos y Columnas para Fiestas',
        size: '1.8 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Esquema métrico para armar estructuras de fondo para el pastel.'
      }
    ]
  },
  {
    id: 'mod-13',
    title: '13. Emprendimiento con Globos',
    description: 'Transforma tus globos en un rentable negocio de fin de semana. Precios correctos y marketing estético.',
    isBonus: false,
    order: 13,
    duration: '40 min',
    difficulty: 'Avanzado',
    learnPoints: [
      'Cómo cobrar tarifas profesionales por hora y por pieza.',
      'Cómo comercializar tu show sin prostituir precios.',
      'Sistemas para captar tus primeros 5 clientes de manera veloz.'
    ],
    videoUrl: 'https://www.youtube.com/embed/S_8qM8Q7sI0',
    videoThumbnail: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-13',
        title: 'Plantilla de Cotización de Eventos e Interiores',
        size: '1.5 MB',
        format: 'XLSX',
        downloadUrl: '#',
        description: 'Calculadora de costos de látex y mano de obra.'
      }
    ]
  },
  {
    id: 'mod-14',
    title: '14. Menú de Globos y Canva',
    description: 'Crea catálogos bellos y visuales que faciliten la elección del niño sin abrumar tu espalda infladora.',
    isBonus: false,
    order: 14,
    duration: '30 min',
    difficulty: 'Intermedio',
    learnPoints: [
      'Armado de catálogo con códigos de color de dificultad.',
      'Diseño en Canva usando plantillas minimalistas.',
      'Promoción digital en Instagram y Facebook.'
    ],
    videoUrl: 'https://www.youtube.com/embed/jZ_v7G_2N1Y',
    videoThumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-14',
        title: 'Plantilla de Canva para Catálogo Barbudo',
        size: '150 KB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Enlace directo a plantillas editables en Canva para tu marca.'
      }
    ]
  },
  {
    id: 'mod-15',
    title: '15. Globos y Medio Ambiente',
    description: 'Inculca valores de conservación. Conoce la verdad ecológica del látex 100% biodegradable.',
    isBonus: false,
    order: 15,
    duration: '22 min',
    difficulty: 'Principiante',
    learnPoints: [
      'Por qué usar globos biodegradables y ecológicos.',
      'Técnicas de reciclado y desechado correcto compostable.',
      'Uso responsable educativo con el público infantil.'
    ],
    videoUrl: 'https://www.youtube.com/embed/K8Z029Oq4x4',
    videoThumbnail: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-15',
        title: 'Folleto Ecológico Educativo para Padres',
        size: '1.1 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Folleto didáctico explicativo de látex orgánico.'
      }
    ]
  },
  {
    id: 'mod-16',
    title: '16. Tu Camino Continúa',
    description: 'Resumen final de las lecciones del formador y el gran paso a la graduación como Maestro Barbudo.',
    isBonus: false,
    order: 16,
    duration: '20 min',
    difficulty: 'Avanzado',
    learnPoints: [
      'Resumen de técnicas y trucos de confianza.',
      'Próximos pasos profesionales.',
      'Inspiración y cierre del curso de Globoflexia.'
    ],
    videoUrl: 'https://www.youtube.com/embed/ZqRorKms148',
    videoThumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-16',
        title: 'Certificado Final de Globoflexia',
        size: '2.5 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Certificado de graduación firmado por la Academia Tan Barbudo.'
      }
    ]
  },

  // 4 BONUS EXTRA
  {
    id: 'bonus-1',
    title: 'Bonus 1: Historias con Globos 🎭',
    isBonus: true,
    order: 17,
    description: 'El arte del storytelling inflable. Haz que cada torsión acompañe una fábula cómica encantadora.',
    duration: '35 min',
    difficulty: 'Principiante',
    learnPoints: [
      'Estructuración de cuentos cómicos infantiles.',
      'Uso del globo como accesorio cómico de personajes de cuentos.',
      'Manejo de silencios y chirridos para ambientación acústica natural.'
    ],
    videoUrl: 'https://www.youtube.com/embed/b6mZpD96vHw',
    videoThumbnail: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-b1',
        title: 'Guión Escrito de Cuentos Animados',
        size: '1.4 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Fábulas de 5 minutos listas para actuar con tus globos.'
      }
    ]
  },
  {
    id: 'bonus-2',
    title: 'Bonus 2: Trucos con Globos 🎪',
    isBonus: true,
    order: 18,
    description: 'Ilusionismo cómico. Engaña a la gravedad y a las leyes de la física con el aire templado.',
    duration: '30 min',
    difficulty: 'Intermedio',
    learnPoints: [
      'El globo irrompible atravesado con aguja.',
      'Efectos visuales estáticos y de fricción alegre.',
      'El secreto del globo movedizo que obedece tu voz.'
    ],
    videoUrl: 'https://www.youtube.com/embed/oQFrC1_N2J4',
    videoThumbnail: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-b2',
        title: 'Manual de Ilusionismo para Payasos',
        size: '1.2 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Explicación secreta de 5 trucos de magia inflables.'
      }
    ]
  },
  {
    id: 'bonus-3',
    title: 'Bonus 3: Juegos y Dinámicas con Globos 🎉',
    isBonus: true,
    order: 19,
    description: 'Espacio recreativo interactivo. Juegos colectivos que activan la energía cómica infantil.',
    duration: '25 min',
    difficulty: 'Principiante',
    learnPoints: [
      'La carrera de botes propulsados por aire de globo.',
      'Dinámicas cooperativas sin explosión.',
      'Pasar el globo gigante en cadena humana.'
    ],
    videoUrl: 'https://www.youtube.com/embed/A08pUuEun3s',
    videoThumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-b3',
        title: 'Recetario de Dinámicas Grupales',
        size: '1.5 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Fichero interactivo con 12 juegos listos para iniciar en cualquier patio.'
      }
    ]
  },
  {
    id: 'bonus-4',
    title: 'Bonus 4: Creatividad Escénica y Rutinas ✨',
    isBonus: true,
    order: 20,
    description: 'Logra dominio majestuoso del espacio escénico y saca risas unificadoras partiendo de rutinas estructuradas.',
    duration: '45 min',
    difficulty: 'Avanzado',
    learnPoints: [
      'Gesticulación, voz y expresión corporal en eventos.',
      'Cómo hilar chistes recurrentes de enredos con globos.',
      'El show cómico del inflado imposible sin soltar la sonrisa.'
    ],
    videoUrl: 'https://www.youtube.com/embed/9Bv_UbeVlqA',
    videoThumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=60',
    documents: [
      {
        id: 'doc-b4',
        title: 'Libreto Barbudo de Humor Escénico',
        size: '2.8 MB',
        format: 'PDF',
        downloadUrl: '#',
        description: 'Rutinas cómicas completas de teatrito de humor con látex.'
      }
    ]
  }
];

export const INITIAL_COMMENTS: ForumComment[] = [
  {
    id: 'c-1',
    authorName: 'Profe Gustavo',
    authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=gustavo',
    authorRole: 'Profesor',
    date: 'Hace 2 horas',
    content: '¡Bienvenidos a todos al curso estrella de Globoflexia Tan Barbudo! Estoy súper emocionado de ver sus primeras esculturas. Recuerden iniciar con calma, estirar el globo antes de inflar y, sobre todo, ponerle una sonrisa enorme. ¡El error es solo parte de la diversión!',
    category: 'General',
    likes: 12,
    replies: [
      {
        id: 'r-1-1',
        authorName: 'Santi Cabrera',
        authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=santi',
        authorRole: 'Alumno',
        date: 'Hace 1 hora',
        content: '¡Gracias Profe! Hoy mismo compré mis globos 260Q y ya logré esculpir mi primer perrito. Al principio me daba susto que estallara pero me acordé de dejarle suficiente cola para el aire. ¡Espectacular!'
      }
    ]
  },
  {
    id: 'c-2',
    authorName: 'Maria Paz Gomez',
    authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=paz',
    authorRole: 'Alumno',
    date: 'Hace 1 día',
    content: '¿Alguien tiene algún truco para no quemarse los dedos al apretar o anudar el nudo del globo? Después de inflar unos 10 seguidos los dedos me quedan súper adoloridos. ¿Algún tip, compas de globoflexia?',
    category: 'Duda',
    likes: 5,
    replies: [
      {
        id: 'r-2-1',
        authorName: 'Profe Gustavo',
        authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=gustavo',
        authorRole: 'Profesor',
        date: 'Hace 18 horas',
        content: '¡Excelente pregunta Maria Paz! El secreto es "relajar el látex" un poco antes del nudo desinflando un suspiro de aire (burping). Además, debes rodear tus dedos índice y medio juntos sin apretar, dejando espacio para deslizar la boquilla con el pulgar. En el módulo 3 muestro esa postura de dedos exacta.'
      },
      {
        id: 'r-2-2',
        authorName: 'Felipe Ruiz',
        authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=felipe',
        authorRole: 'Alumno',
        date: 'Hace 12 horas',
        content: 'Iba a comentar exactamente lo mismo que el Profe. Soltar un dedito de aire suaviza el nudo un 100%. ¡Pruébalo!'
      }
    ]
  },
  {
    id: 'c-3',
    authorName: 'Juliana Torres',
    authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=juli',
    authorRole: 'Alumno',
    date: 'Hace 2 días',
    content: '¡LOGRADO! Hice la espada de tres globos para la fiesta de mi sobrino y fui la sensación de toda la tarde. Los niños hacían filas de metros para conseguir una. Gracias por explicarlo con tanto amor y sencillez.',
    category: 'Logro',
    likes: 18,
    replies: []
  },
  {
    id: 'c-4',
    authorName: 'Claudio Flores',
    authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=claudio',
    authorRole: 'Alumno',
    date: 'Hace 3 días',
    content: 'Miren la combinación de colores que usé para el loro del Módulo 9. Quedó genial en un globo base color azul cielo. ¡Subo foto en cuanto aprenda a colgarla aquí en el foro! Muy divertido el curso.',
    category: 'Inspiración',
    likes: 9,
    replies: []
  }
];
