# Decisiones del atlas a partir del análisis

Revisión editorial y de implementación: 7 de septiembre de 2026.

## Material revisado

- `C:/Users/USER/Desktop/Proyectos/graphrag/docs/analisis/INFORME_ANALITICO_GRAPHRAG.md`, leído completo.
- `docs/analisis/saved_paths_metricas.json`: resumen y referencia del caso seleccionado.
- `docs/analisis/auditar_saved_paths.py`: revisado; no ejecutado porque reescribe su informe en el repositorio de GraphRAG.
- `backend/data/saved_paths/serendipity_path_1773992550430.json`, leído completo.
- Rutas relevantes de `analysis.py`, `chat.py` y `enrichment.py` contrastadas con el informe.

No se consultaron bases vivas, no se ejecutó ingesta ni se modificó el backend. Los diagramas documentan el análisis disponible; los cambios de texto no resuelven los hallazgos del sistema.

## Viabilidad de los nueve diagramas solicitados

| Diagrama | Decisión y ubicación | Información que falta |
|---|---|---|
| Camino real de asociación | Creado, 16. Cinco nodos y pesos 0.70, 0.83, 0.90, 0.85 del JSON. | Miniaturas autorizadas, originales/transcripciones, tipos de arista y commit de generación. Iconos de audio, sin inventar etiquetas semánticas. |
| Recorrido de consulta | Actualizado, 07. Pregunta → candidatos → expansión → resultados → inspección o síntesis opcional. | Traza de una consulta ejecutada para convertirlo en ejemplo real con resultados. |
| Un archivo, varias representaciones | Creado, 15. Original, inventario, sidecar, embedding y asociaciones. | Snapshot vinculado de todas las representaciones para mostrar datos concretos. No bloquea el esquema. |
| Revisión humana | Actualizado, 05. Propuesta → corrección/revisión → aprobar y promover, o no promover. | Historial real si se quieren mostrar decisiones concretas; no se inventó un registro de rechazos. |
| Dos umbrales | Creado, 17. Simulación del mismo grafo con sliders independientes y leyenda común. | Dos ejecuciones con corpus/versionado, consulta y parámetros iguales salvo el umbral para afirmar un resultado real. |
| Responsabilidades | Creado, 14. Interfaz, API, procesamiento y cuatro almacenes. | Prueba operativa para hablar de consistencia o garantías del despliegue; no bloquea el esquema. |
| Evidencia e interpretación | Creado, 18. Registro real y diseño de explicación propuesto diferenciados. | Fragmento, página o timestamp verificable y acceso al original para respaldar el contenido. |
| Comunidades | Placeholder, 19. Proyección y Louvain con grupos A/B/C esquemáticos. | Exportación con nodos, relaciones, community_id, pesos, parámetros, versión y fecha. No se infieren comunidades desde los caminos seleccionados. |
| Evaluación futura | Creado como propuesta, 20. Piloto de 80 consultas y cinco métodos. | Consultas, juicios, referencias, particiones, límites de tokens/candidatos, ejecuciones y métricas. No se publican resultados. |

## Correcciones en las láminas conservadas

- 01: separa indexación vectorial automática de promoción humana al grafo; síntesis opcional y contrastable.
- 02–03: el modo privado de creación no se extrapola como garantía de privacidad durante todas las consultas.
- 04: CLAP se declara simulado; la ruta textual no se presenta como chunking real.
- 06: weight no se describe como confianza calibrada. Se distinguen productos, mínimos y suma de complementos según tarea.
- 08: el slider ilustra topo_threshold; threshold lateral afecta costes. La salida actual agrega rutas y pierde pertenencia/coste individual.
- 09: selección aleatoria entre candidatos; no una caminata de transiciones registradas. Ejemplos inventados rotulados.
- 10: Jaccard clásico deja de ser una binarización de la similitud fuzzy. Ambos se calculan sobre los mismos vectores activo-concepto; el umbral filtra relaciones antes de calcular.
- 11: no se promete fuzzy incremental automático ni protección de aristas garantizada al escribir.
- 12: se conserva como ejemplo de curación, sin simular una operación ejecutada.
- 13: las 50 exportaciones y 107 activos son un subconjunto analizado. No son un benchmark, evidencia causal ni prueba de novedad científica.

## Contratos mínimos para sustituir placeholders

Comunidades: generated_at, graph_version, method, min_weight, nodes[{id,label,type,community_id}], edges[{id,source,target,type,weight}], asset_ids_by_community y referencia a los archivos asociados. Añadir versión del algoritmo y procedencia de la proyección.

Caso con evidencia: conservar la exportación original y añadir vínculos a las fuentes, fragmentos con página/timestamp, relación identificada, origen del peso, revisión humana y versiones de extracción/modelo/prompt. Mantener diferenciadas asociación e interpretación.

Comparación de umbrales: query, corpus_version, source, mode, parámetros completos y paths[] por configuración. No comparar subgrafos de consultas diferentes como si sólo cambiara un umbral.

Evaluación: consultas identificadas, familias temáticas para particiones, juicios de relevancia, respuestas cuando proceda, presupuesto fijo, tiempos, costes y valoración humana. Agrupar topologías duplicadas para no contarlas como evidencia independiente.

## Alcance de publicación

Se actualizó el texto promocional local. No se subieron originales, archivos privados ni publicaciones a servicios externos. Mantener visibles estado y notas de procedencia al compartir capturas del atlas.
