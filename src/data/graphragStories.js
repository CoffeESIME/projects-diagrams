import { storyEvidence } from './atlasEvidence.js'

export const chapters = [
  {
    "id": "build",
    "number": "I",
    "title": "Construir memoria",
    "description": "De un archivo aislado a conocimiento multimodal, privado y curado."
  },
  {
    "id": "explore",
    "number": "II",
    "title": "Explorar relaciones",
    "description": "Herramientas para atravesar, comparar y descubrir el grafo."
  },
  {
    "id": "evolve",
    "number": "III",
    "title": "Evolucionar el grafo",
    "description": "Procesos para conectar, limpiar y convertir datos en nuevas narrativas."
  },
  {
    "id": "evidence",
    "number": "IV",
    "title": "Leer la evidencia",
    "description": "Responsabilidades, un caso exportado y las preguntas que todavía debemos evaluar."
  }
]

const storyContent = [
  {
    "id": "system-architecture",
    "chapter": "build",
    "number": "01",
    "kicker": "Arquitectura",
    "title": "Del archivo a la exploración: el recorrido completo",
    "shortTitle": "Mapa completo del sistema",
    "description": "Las fuentes se procesan en representaciones complementarias. Los vectores permiten recuperar candidatos; las asociaciones revisadas alimentan el grafo. Una síntesis opcional propone lecturas que deben contrastarse.",
    "takeaway": "El mapa conecta procesamiento, almacenamiento y exploración; la calidad de sus interpretaciones se evalúa por separado.",
    "color": "#2457e6",
    "stats": [
      [
        "5",
        "etapas conectadas"
      ],
      [
        "2",
        "memorias complementarias"
      ],
      [
        "human",
        "autoridad semántica"
      ]
    ],
    "tags": [
      "Multimodal",
      "Human-in-the-loop",
      "Weaviate",
      "Neo4j GDS"
    ]
  },
  {
    "id": "privacy-routing",
    "chapter": "build",
    "number": "02",
    "kicker": "Gobernanza",
    "title": "Privacidad: una política de ingesta y una garantía aún incompleta",
    "shortTitle": "Privacidad local / cloud",
    "description": "La ingesta diferencia strict_local y public_cloud. En síntesis y explicación, el backend todavía no deriva la política más restrictiva de todas las fuentes utilizadas.",
    "takeaway": "El modo privado de creación no demuestra una protección completa durante todas las consultas.",
    "color": "#c9455d",
    "stats": [
      [
        "ingesta",
        "ruta local / cloud"
      ],
      [
        "consulta",
        "política por completar"
      ],
      [
        "fuente",
        "restricción a propagar"
      ]
    ],
    "tags": [
      "strict_local",
      "public_cloud",
      "LLM Gateway"
    ]
  },
  {
    "id": "context-memory",
    "chapter": "build",
    "number": "03",
    "kicker": "Memoria",
    "title": "El usuario puede añadir el contexto que el archivo no contiene",
    "shortTitle": "Contexto y memorias",
    "description": "Las notas del usuario enriquecen la interpretación. Convertirlas en memoria crea otro activo, marcado strict_local en la ingesta e indexado en MemorySpace.",
    "takeaway": "El contexto personal complementa lo observado; conviene conservar su origen y distinguirlo de la fuente.",
    "color": "#6941c6",
    "stats": [
      [
        "sidecar",
        "contexto editable"
      ],
      [
        "1",
        "espacio de memoria"
      ],
      [
        "strict",
        "privacidad bloqueada"
      ]
    ],
    "tags": [
      "MemorySpace",
      "User context",
      "Sidecar",
      "BGE-M3"
    ]
  },
  {
    "id": "ingestion-pipeline",
    "chapter": "build",
    "number": "04",
    "kicker": "Proceso",
    "title": "Una entrada activa varias tareas y representaciones",
    "shortTitle": "Pipeline multimodal",
    "description": "OCR, descripción visual, transcripción y análisis textual alimentan resúmenes y embeddings. CLAP conserva una ruta simulada; la tarea textual no acredita fragmentación real por offsets.",
    "takeaway": "Distinguir representación disponible, procesamiento parcial y trabajo pendiente permite explicar el sistema con precisión.",
    "color": "#ed5b3a",
    "stats": [
      [
        "async",
        "procesamiento en tareas"
      ],
      [
        "CLAP",
        "ruta simulada"
      ],
      [
        "chunks",
        "evidencia pendiente"
      ]
    ],
    "tags": [
      "Qwen3-VL",
      "SigLIP",
      "Whisper",
      "BGE-M3"
    ]
  },
  {
    "id": "human-curation",
    "chapter": "build",
    "number": "05",
    "kicker": "Human in the loop",
    "title": "El LLM propone relaciones. La persona decide qué entra al grafo.",
    "shortTitle": "Curación humana",
    "description": "El modelo propone entidades y conceptos con pesos y razonamiento. El usuario puede corregir la propuesta, aprobar su promoción a Neo4j o dejarla fuera. Los vectores se indexan por otra ruta.",
    "takeaway": "La revisión registra criterio humano; una asociación aprobada aún puede ser interpretativa.",
    "color": "#0b806b",
    "stats": [
      [
        "draft",
        "propuesta del LLM"
      ],
      [
        "review",
        "edición humana"
      ],
      [
        "approve",
        "promoción al grafo"
      ]
    ],
    "tags": [
      "Review queue",
      "Weighted edges",
      "Reasoning"
    ]
  },
  {
    "id": "fuzzy-logic",
    "chapter": "build",
    "number": "06",
    "kicker": "Idea central",
    "title": "Un peso expresa un grado; hace falta definir de qué",
    "shortTitle": "Por qué fuzzy",
    "description": "El sistema opera con pesos entre 0 y 1, pero hoy mezcla afinidad, confianza de extracción y similitud. Cada análisis combina esos pesos de una manera distinta.",
    "takeaway": "Separar membresía, confianza y similitud es una mejora propuesta. Un peso no es una probabilidad calibrada de verdad.",
    "color": "#6941c6",
    "stats": [
      [
        "0—1",
        "dominio del peso"
      ],
      [
        "× / min",
        "operadores por tarea"
      ],
      [
        "sin",
        "calibración demostrada"
      ]
    ],
    "tags": [
      "Zadeh",
      "Membership",
      "Alpha-cut",
      "Neo4j"
    ]
  },
  {
    "id": "fuzzy-search",
    "chapter": "explore",
    "number": "07",
    "kicker": "Recuperación",
    "title": "Cómo una consulta incorpora asociaciones del grafo",
    "shortTitle": "Búsqueda fuzzy",
    "description": "La pregunta recupera candidatos vectoriales. La expansión por conceptos agrega activos relacionados y el ranking ordena los resultados. El usuario puede explorarlos o solicitar una síntesis.",
    "takeaway": "El grafo cambia qué información se selecciona; demostrar si mejora las respuestas requiere una comparación controlada.",
    "color": "#0b806b",
    "stats": [
      [
        "2",
        "etapas de recuperación"
      ],
      [
        "RRF",
        "fusión multimodal"
      ],
      [
        "MMR",
        "diversidad"
      ]
    ],
    "tags": [
      "Vector-first",
      "Graph expansion",
      "Hub penalty"
    ]
  },
  {
    "id": "pathfinder",
    "chapter": "explore",
    "number": "08",
    "kicker": "Navegador latente",
    "title": "Entre dos ideas puede existir más de un camino",
    "shortTitle": "Pathfinder",
    "description": "Directo suma costes 1−peso; lateral favorece una franja de pesos; topológico minimiza saltos y permite filtrar aristas. El control de esta lámina simula sólo ese filtro topológico.",
    "takeaway": "En lateral, threshold modifica el coste. En topológico, topo_threshold sí elimina conexiones por debajo del mínimo.",
    "color": "#2457e6",
    "stats": [
      [
        "3",
        "modos de ruta"
      ],
      [
        "1—10",
        "caminos alternativos"
      ],
      [
        "8",
        "saltos máximos"
      ]
    ],
    "tags": [
      "Coste por modo",
      "Filtro topológico",
      "Rutas agregadas"
    ]
  },
  {
    "id": "serendipity",
    "chapter": "explore",
    "number": "09",
    "kicker": "Pensamiento lateral",
    "title": "Seleccionar una asociación inesperada para explorarla",
    "shortTitle": "Camino de serendipia",
    "description": "El sistema selecciona caminos candidatos de cinco nodos, exige al menos una arista ≤ .79 y usa azar con penalización de hubs. La novedad útil todavía necesita evaluación.",
    "takeaway": "Una conexión débil puede ser sugerente o errónea. Novedad, pertinencia y validez deben revisarse por separado.",
    "color": "#ed5b3a",
    "stats": [
      [
        "5",
        "nodos por recorrido"
      ],
      [
        "≤ .79",
        "al menos una arista"
      ],
      [
        "exp",
        "penalización de hubs"
      ]
    ],
    "tags": [
      "Selección de candidatos",
      "Arista débil",
      "Exploración cultural"
    ]
  },
  {
    "id": "jaccard-matrix",
    "chapter": "explore",
    "number": "10",
    "kicker": "Comparación",
    "title": "Una matriz revela qué conceptos comparten territorio",
    "shortTitle": "Jaccard clásico / fuzzy",
    "description": "El modo clásico divide activos compartidos entre activos en la unión. El modo fuzzy compara sus pesos. Ambos pueden dar valores fraccionarios y cambian al filtrar las relaciones de entrada.",
    "takeaway": "La matriz describe solapamiento en el corpus, no equivalencia entre conceptos ni certeza de una asociación.",
    "color": "#c9455d",
    "stats": [
      [
        "A∩B",
        "intersección"
      ],
      [
        "A∪B",
        "unión"
      ],
      [
        "0—1",
        "similitud"
      ]
    ],
    "tags": [
      "Heatmap",
      "Co-occurrence",
      "Fuzzy Jaccard"
    ]
  },
  {
    "id": "latent-enrichment",
    "chapter": "evolve",
    "number": "11",
    "kicker": "Enriquecimiento",
    "title": "Los vecinos vectoriales proponen conexiones para revisar",
    "shortTitle": "Conexiones latentes",
    "description": "La similitud entre representaciones ayuda a localizar candidatos. El sistema permite revisar tipo, peso y razonamiento antes de aprobar una nueva asociación.",
    "takeaway": "La similitud ofrece una pista. Si el embedding contiene conceptos generados por el mismo modelo, no aporta evidencia independiente.",
    "color": "#0b806b",
    "stats": [
      [
        "vector",
        "candidatos próximos"
      ],
      [
        "preview",
        "mezcla heurística"
      ],
      [
        "revisión",
        "criterio del usuario"
      ]
    ],
    "tags": [
      "Vector neighbors",
      "Validación opcional",
      "Asociación propuesta"
    ]
  },
  {
    "id": "ontology-cleanup",
    "chapter": "evolve",
    "number": "12",
    "kicker": "Calidad",
    "title": "Un grafo útil también necesita poda, fusión y criterio",
    "shortTitle": "Limpieza ontológica",
    "description": "Detecta sinónimos para fusionar hubs, degrada objetos y formatos a tags, y conserva un registro de auditoría de cada operación.",
    "takeaway": "Conectar más no siempre significa conocer mejor: la estructura también debe depurarse.",
    "color": "#6941c6",
    "stats": [
      [
        "merge",
        "sinónimos reales"
      ],
      [
        "demote",
        "ruido a etiquetas"
      ],
      [
        "audit",
        "operaciones trazables"
      ]
    ],
    "tags": [
      "Dedup",
      "Canonical hubs",
      "Demotion",
      "Audit"
    ]
  },
  {
    "id": "value-map",
    "chapter": "evolve",
    "number": "13",
    "kicker": "Narrativas",
    "title": "Un archivo cultural puede abrir nuevas preguntas",
    "shortTitle": "Datos que cuentan historias",
    "description": "Los caminos exportados conectan textos, música e imágenes mediante asociaciones temáticas. Pueden apoyar curación personal, escucha o escritura; su utilidad y respaldo aún deben medirse.",
    "takeaway": "Implementación propia y enfoque de producto no equivalen a novedad científica ni a superioridad demostrada.",
    "color": "#c9455d",
    "stats": [
      [
        "50",
        "exportaciones analizadas"
      ],
      [
        "107",
        "activos únicos en ellas"
      ],
      [
        "0",
        "benchmarks controlados"
      ]
    ],
    "tags": [
      "Communities",
      "Bridges",
      "Saved paths",
      "Stories"
    ]
  },
  {
    "id": "responsibilities",
    "number": "14",
    "kicker": "Ingeniería",
    "title": "Cada componente responde una pregunta distinta",
    "shortTitle": "Arquitectura por responsabilidades",
    "description": "Interfaz, API y tareas coordinan archivos, inventario, representaciones vectoriales y asociaciones. Los nombres de tecnologías acompañan a su responsabilidad.",
    "takeaway": "La arquitectura se justifica por lo que cada componente conserva y resuelve, junto con el coste de mantenerlos consistentes.",
    "stats": [
      [
        "original",
        "archivo y sidecar"
      ],
      [
        "estado",
        "inventario y tareas"
      ],
      [
        "consulta",
        "vectores y relaciones"
      ]
    ],
    "tags": [
      "Responsabilidades",
      "Identidad de activos",
      "Consistencia"
    ],
    "chapter": "evidence",
    "color": "#2457e6"
  },
  {
    "id": "representations",
    "number": "15",
    "kicker": "Representaciones",
    "title": "Un archivo tiene varias formas de ser encontrado",
    "shortTitle": "Un archivo, varias representaciones",
    "description": "El original, el inventario, el resumen, el embedding y las asociaciones conservan aspectos diferentes del mismo activo. Los identificadores permiten vincularlos.",
    "takeaway": "Un embedding aproxima similitud; un resumen interpreta; el original permite volver a comprobar.",
    "stats": [
      [
        "1",
        "activo de referencia"
      ],
      [
        "5",
        "representaciones visibles"
      ],
      [
        "hash",
        "vínculo entre registros"
      ]
    ],
    "tags": [
      "Original",
      "Sidecar",
      "Embedding"
    ],
    "chapter": "evidence",
    "color": "#2457e6"
  },
  {
    "id": "real-association",
    "number": "16",
    "kicker": "Caso del corpus",
    "title": "Dos canciones conectadas por una pregunta cultural",
    "shortTitle": "Un camino real de asociación",
    "description": "Un recorrido guardado enlaza aislamiento, identidad y crítica digital a través de The Motorleague y Bad Religion. Aquí se reproducen sus nodos y pesos, sin adoptar la explicación causal generada.",
    "takeaway": "El camino puede inspirar una lectura comparada. El grafo no demuestra que una experiencia cause la siguiente.",
    "stats": [
      [
        "5",
        "nodos exportados"
      ],
      [
        "2",
        "archivos de audio"
      ],
      [
        "20 mar",
        "exportación de 2026"
      ]
    ],
    "tags": [
      "Caso exportado",
      "Asociación temática",
      "Sin originales"
    ],
    "chapter": "evidence",
    "color": "#c9455d"
  },
  {
    "id": "threshold-comparison",
    "number": "17",
    "kicker": "Sensibilidad",
    "title": "La misma consulta, dos cortes del mismo grafo",
    "shortTitle": "Comparar dos umbrales",
    "description": "La comparación mantiene origen, nodos y pesos. Sólo cambia el umbral topológico para mostrar qué conexiones permanecen y cuáles quedan fuera.",
    "takeaway": "Más cobertura no implica más precisión. El umbral es una decisión de exploración que debe evaluarse por tarea.",
    "stats": [
      [
        "mismo",
        "origen y grafo"
      ],
      [
        "2",
        "umbrales comparados"
      ],
      [
        "sin",
        "precisión estimada"
      ]
    ],
    "tags": [
      "Simulación",
      "Cobertura",
      "Selectividad"
    ],
    "chapter": "evidence",
    "color": "#2457e6"
  },
  {
    "id": "evidence-interpretation",
    "number": "18",
    "kicker": "Lectura crítica",
    "title": "Una conexión guardada no es toda la evidencia",
    "shortTitle": "Evidencia frente a interpretación",
    "description": "Distinguir el archivo identificado, la asociación registrada y la lectura propuesta evita presentar una narrativa como una conclusión verificada.",
    "takeaway": "La explicación debe decir qué puede comprobarse, qué se interpreta y qué no puede justificarse todavía.",
    "stats": [
      [
        "fuente",
        "identificada"
      ],
      [
        "arista",
        "registrada"
      ],
      [
        "lectura",
        "propuesta"
      ]
    ],
    "tags": [
      "Proveniencia",
      "Interpretación",
      "Respaldo pendiente"
    ],
    "chapter": "evidence",
    "color": "#c9455d"
  },
  {
    "id": "communities",
    "number": "19",
    "kicker": "Organización temática",
    "title": "Comunidades: falta la fotografía real del corpus",
    "shortTitle": "Mapa de comunidades · pendiente",
    "description": "La implementación proyecta conceptos conectados por activos y aplica Louvain. Este esquema reserva el espacio para una exportación reproducible con pertenencias y parámetros.",
    "takeaway": "Una comunidad describe estructura según un método y sus parámetros; no es una clasificación objetiva de la cultura.",
    "stats": [
      [
        "Louvain",
        "algoritmo en código"
      ],
      [
        "pendiente",
        "exportación del grafo"
      ],
      [
        "A/B/C",
        "grupos esquemáticos"
      ]
    ],
    "tags": [
      "Pendiente de datos",
      "Louvain",
      "No es un resultado"
    ],
    "chapter": "evidence",
    "color": "#2457e6"
  },
  {
    "id": "future-evaluation",
    "number": "20",
    "kicker": "Investigación propuesta",
    "title": "¿Cuándo ayuda el grafo y a qué coste?",
    "shortTitle": "Diseño de evaluación futura",
    "description": "El informe propone 80 consultas y métodos comparables con corpus, modalidades y presupuesto comunes. Recuperación, respuestas y exploración se evaluarían por separado.",
    "takeaway": "Primero fijar tareas, controles y criterios; después reportar resultados, incluidos los negativos.",
    "stats": [
      [
        "80",
        "consultas propuestas"
      ],
      [
        "5",
        "métodos a comparar"
      ],
      [
        "0",
        "resultados reportados"
      ]
    ],
    "tags": [
      "Propuesta",
      "Presupuesto común",
      "Sin ganador"
    ],
    "chapter": "evidence",
    "color": "#2457e6"
  }
]

export const stories = storyContent.map(story => ({ ...story, ...storyEvidence[story.id] }))

export const linkedInCopy = "Estoy desarrollando un explorador personal de asociaciones culturales: texto, imágenes, música y memorias conectados mediante relaciones graduadas y revisión humana.\n\nLa experiencia que quiero estudiar es concreta: partir de una idea, encontrar un archivo y descubrir un recorrido que ayude a escuchar, comparar o escribir algo nuevo.\n\nUn LLM propone conceptos y asociaciones; el usuario revisa su interpretación. Los vectores recuperan candidatos y el grafo permite explorar conexiones. Una síntesis opcional propone una lectura de los resultados.\n\nEl análisis de 50 caminos exportados identifica 107 activos distintos entre textos, audios e imágenes. Son casos de estudio, no un benchmark ni una medida del grafo completo. Un caso conecta dos canciones por temas de aislamiento, identidad y crítica digital: una invitación a compararlas, no una explicación causal.\n\nEl análisis también cambió mi forma de presentar el sistema. Los pesos no son confianza calibrada; la privacidad por fuente necesita completarse durante la síntesis; y una narrativa convincente debe contrastarse con sus originales.\n\nEl siguiente experimento propuesto comparará recuperación léxica, vectorial, híbrida y expansión de grafo bajo el mismo presupuesto. Quiero medir pertinencia, respaldo y descubrimientos útiles, además del coste de revisión humana.\n\nEs una implementación propia con un enfoque en curación cultural personal. La novedad científica y la mejora frente a otros métodos quedan como preguntas abiertas.\n\n¿En qué tarea te ayudaría más: recuperar una referencia, explorar tu colección o preparar una nueva lectura?\n\n#GraphRAG #KnowledgeGraph #FuzzyLogic #CuracionDigital #HumanInTheLoop #MultimodalAI #InvestigacionAplicada"
