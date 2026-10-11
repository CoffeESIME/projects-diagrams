// Editorial provenance: local repository review, not a live deployment audit.
export const auditDate = '07 sep 2026'

export const realAssociation = {
  file: 'serendipity_path_1773992550430.json',
  generatedAt: '20 mar 2026 · 07:42 UTC',
  nodes: [
    { name: 'Aislamiento y Soledad', type: 'Concept' },
    { name: 'The Motorleague — Everyone Is Digital.mp3', type: 'Asset', weight: .70 },
    { name: 'Pérdida de Identidad', type: 'Concept', weight: .83 },
    { name: 'Bad Religion — I Love My Computer.mp3', type: 'Asset', weight: .90 },
    { name: 'Crítica a Internet y la Era Digital', type: 'Concept', weight: .85 },
  ],
}

export const storyEvidence = {
  'system-architecture': {
    status: 'Esquema de implementación',
    note: 'Mapa de responsabilidades y flujos descritos en el repositorio. La ingesta completa y los servicios vivos no se verificaron en el análisis.',
    detail: 'La indexación vectorial y la promoción de relaciones son flujos distintos. La síntesis es opcional; sus narrativas requieren contrastarse con los originales.',
    sources: ['INFORME_ANALITICO_GRAPHRAG.md · Qué has construido realmente'],
  },
  'privacy-routing': {
    status: 'Implementación parcial',
    note: 'La ingesta dispone de modos local/cloud. La política más restrictiva por fuente todavía debe resolverse en el servidor durante consultas y explicaciones.',
    detail: 'El explicador fija provider=openai y usa un booleano de la petición. La síntesis tampoco deriva la restricción de los activos. Esto identifica una garantía ausente, no una filtración observada.',
    sources: ['backend/app/routers/analysis.py · explain', 'backend/app/routers/chat.py · synthesize'],
  },
  'context-memory': {
    status: 'Esquema de implementación',
    note: 'Contexto y MemorySpace están descritos en el código de ingesta. El modo privado de creación no certifica la privacidad de todas las consultas posteriores.',
    detail: 'El contexto editable ayuda a interpretar un archivo; convertirlo en memoria crea otra representación con identidad propia. Evitar equiparar una interpretación personal con evidencia del original.',
    sources: ['backend/worker/tasks.py · spawn_memory_asset / convert_to_memory'],
  },
  'ingestion-pipeline': {
    status: 'Implementación parcial',
    note: 'La ruta CLAP devuelve un identificador simulado. Audio transcrito y embedding acústico no deben presentarse como la misma capacidad.',
    detail: 'process_text_chunk_task vectoriza una cadena por archivo/colección: no acredita fragmentos con offsets. /tasks/dispatch sí envía trabajo; /tasks/start no despacha a Celery.',
    sources: ['backend/worker/tasks.py · process_text_chunk_task / CLAP', 'backend/app/routers/tasks.py · dispatch / start'],
  },
  'human-curation': {
    status: 'Esquema de implementación',
    note: 'La aprobación promueve asociaciones al grafo. Revisar una sugerencia registra criterio humano, pero no la convierte automáticamente en un hecho demostrado.',
    detail: 'El staging y la revisión de entidades están implementados. El esquema de rechazo representa no promover la propuesta; no presupone un historial de rechazos completo.',
    sources: ['backend/app/routers/inbox.py · aprobación de entidades y relaciones'],
  },
  'fuzzy-logic': {
    status: 'Ejemplo didáctico',
    note: 'weight mezcla actualmente afinidad, confianza de extracción y similitud. No es una probabilidad calibrada de verdad.',
    detail: 'Recuperación multiplica pesos; comunidades agrega mínimos; rutas directas suman 1−weight. Separar membership, extraction_confidence y semantic_similarity es una propuesta del informe.',
    sources: ['INFORME_ANALITICO_GRAPHRAG.md · La lógica difusa necesita una definición más precisa'],
  },
  'fuzzy-search': {
    status: 'Esquema de implementación',
    note: 'El grafo interviene en la selección de activos. No se ha medido una mejora frente a recuperación híbrida bajo el mismo presupuesto.',
    detail: 'La síntesis deduplica por archivo y recorta texto por caracteres. El comparador actual cambia modalidades y volumen de contexto entre columnas; no es un benchmark controlado.',
    sources: ['backend/app/routers/search.py · búsqueda fuzzy', 'backend/app/routers/chat.py · deduplicate_results / synthesize'],
  },
  pathfinder: {
    status: 'Simulación didáctica',
    note: 'El control mostrado corresponde exclusivamente a topo_threshold. En modo lateral, threshold modifica el coste y puede admitir aristas por debajo de su valor.',
    detail: 'Directo: suma de 1−weight. Lateral: penaliza pesos fuera de una franja. Topológico: minimiza saltos con filtro opcional. La API agrega K rutas y no conserva paths[] independientes con coste.',
    sources: ['backend/app/routers/analysis.py · find_path / PathfinderRequest'],
  },
  serendipity: {
    status: 'Simulación didáctica',
    note: 'Las variantes de esta lámina son ejemplos inventados. El caso exportado real se muestra en la lámina 16.',
    detail: 'El código selecciona candidatos completos con azar y penalización de hubs. No registra transiciones de una caminata paso a paso. Exigir una arista ≤ .79 no mide por sí mismo la utilidad de la sorpresa.',
    sources: ['backend/app/routers/analysis.py · serendipity_path'],
  },
  'jaccard-matrix': {
    status: 'Simulación calculada',
    note: 'Matriz calculada sobre un conjunto didáctico común de activos. El modo clásico también produce valores fraccionarios: intersección / unión.',
    detail: 'El umbral filtra primero pesos de las relaciones. Después se calcula Jaccard; no se ocultan celdas por su similitud final. Fuzzy usa Σmin / Σmax con una relación por par activo-concepto en este ejemplo.',
    sources: ['backend/app/routers/analysis.py · analyze_heatmap'],
  },
  'latent-enrichment': {
    status: 'Implementación parcial',
    note: 'Los vecinos generan candidatos, no evidencia independiente. La integración automática del cálculo fuzzy incremental no está acreditada.',
    detail: 'El informe identifica una protección de relaciones en preview que no se garantiza al aplicar pesos. Repetir una mezcla puede modificar el peso sin nueva evidencia.',
    sources: ['backend/app/routers/explore.py · aprobación latente', 'backend/app/routers/enrichment.py · preview / apply', 'backend/worker/tasks.py · fuzzy incremental'],
  },
  'ontology-cleanup': {
    status: 'Ejemplo didáctico',
    note: 'IA / AI y las etiquetas mostradas son un ejemplo, no una limpieza ejecutada sobre el corpus. Parecido entre nombres no demuestra identidad.',
    detail: 'La revisión debe distinguir sinónimos de polisemia. Conectar o fusionar más nodos no demuestra una mejora de recuperación.',
    sources: ['INFORME_ANALITICO_GRAPHRAG.md · Qué conservar, eliminar o replantear'],
  },
  'value-map': {
    status: 'Hipótesis de utilidad',
    note: 'Las exportaciones muestran asociaciones culturales. No prueban causalidad, superioridad de respuestas ni novedad científica.',
    detail: 'La diferencia defendible es el enfoque de exploración cultural y curación personal. La originalidad de implementación, la diferenciación de producto y la novedad científica son afirmaciones distintas.',
    sources: ['INFORME_ANALITICO_GRAPHRAG.md · Dictamen / Casos'],
  },
  responsibilities: {
    status: 'Esquema de implementación',
    note: 'Responsabilidades verificadas en repositorio; sin prueba de consistencia distribuida ni ejecución de servicios en vivo.',
    detail: 'Un hash ayuda a enlazar representaciones. No vuelve atómicas las escrituras entre PostgreSQL, MinIO, Weaviate y Neo4j.',
    sources: ['INFORME_ANALITICO_GRAPHRAG.md · Consistencia, operación y mantenimiento'],
  },
  representations: {
    status: 'Esquema de implementación',
    note: 'Muestra representaciones de un activo, no fragmentos direccionables ya implementados. MemorySpace corresponde a una memoria creada aparte.',
    detail: 'Original, sidecar, inventario, vectores y asociaciones pueden evolucionar de forma independiente. Se requiere reconciliación para detectar discrepancias.',
    sources: ['backend/app/services/ingest.py', 'backend/worker/tasks.py · process_text_chunk_task'],
  },
  'real-association': {
    status: 'Caso real exportado',
    note: 'Topología y pesos del JSON del 20 de marzo de 2026. No contiene miniaturas, originales, tipos de relación ni commit generador.',
    detail: 'Los iconos de audio sustituyen miniaturas ausentes. Las aristas se rotulan “asociación registrada”; no se inventa un tipo semántico. No se reproduce como verdad la explicación causal del LLM.',
    sources: ['backend/data/saved_paths/serendipity_path_1773992550430.json'],
  },
  'threshold-comparison': {
    status: 'Simulación didáctica',
    note: 'Dos cortes del mismo grafo inventado con origen y pesos constantes. No son resultados de dos consultas ejecutadas.',
    detail: 'Aumentar el corte reduce las conexiones admitidas. La comparación muestra cobertura y selectividad, sin estimar precisión ni relevancia.',
    sources: ['backend/app/routers/analysis.py · topo_threshold'],
  },
  'evidence-interpretation': {
    status: 'Caso + diseño propuesto',
    note: 'La asociación está exportada; su respaldo puntual en el original no está disponible. La separación visual de niveles es una propuesta para las explicaciones.',
    detail: 'Una fuente identificada, una asociación almacenada y una interpretación del modelo son niveles distintos. Una cita de archivo no sustituye fragmento, página o timestamp.',
    sources: ['INFORME_ANALITICO_GRAPHRAG.md · Casos / Recuperación, rutas y explicaciones'],
  },
  communities: {
    status: 'Pendiente de datos reales',
    note: 'El algoritmo está en el código; los grupos A/B/C son un esquema sin resultados del corpus. No se asignaron comunidades inventadas a archivos reales.',
    detail: 'Falta una exportación con nodos, aristas, pertenencia a comunidad, pesos, método, min_weight, versión y fecha. No se acreditan resúmenes jerárquicos usados por síntesis.',
    sources: ['backend/app/routers/analysis.py · analyze_communities'],
  },
  'future-evaluation': {
    status: 'Propuesta · no ejecutada',
    note: 'Piloto de 80 consultas propuesto en el informe. No hay puntuaciones, ganador ni mejora medida.',
    detail: 'Faltan consultas y juicios de relevancia, respuestas de referencia, separación desarrollo/evaluación, presupuestos fijados y ejecuciones registradas. Los 50 caminos guardados sirven como casos de estudio, no como benchmark.',
    sources: ['INFORME_ANALITICO_GRAPHRAG.md · Cómo demostrar si realmente aporta valor', 'docs/analisis/saved_paths_metricas.json'],
  },
}
