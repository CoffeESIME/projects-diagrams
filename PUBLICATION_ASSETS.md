# Fuzzy GraphRAG · Public launch

Colección independiente de tres imágenes editoriales para una publicación de LinkedIn. El atlas, sus 20 historias, los diagramas y sus datos se conservan. No es una nueva presentación completa.

## Ejecutar

`npm run dev` (Vite, normalmente en http://localhost:5173).

Para fijar host y puerto desde PowerShell:

```powershell
node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173
```

Colección: http://127.0.0.1:5173/social/fuzzy-graphrag-launch

| Pieza | Ruta | PNG en el repositorio |
| --- | --- | --- |
| Fuzzy paths | `/social/fuzzy-graphrag-launch/01-fuzzy` | `public/social/fuzzy-graphrag-01-fuzzy.png` |
| Pathfinder real | `/social/fuzzy-graphrag-launch/02-pathfinder` | `public/social/fuzzy-graphrag-02-pathfinder.png` |
| Serendipity real | `/social/fuzzy-graphrag-launch/03-serendipity` | `public/social/fuzzy-graphrag-03-serendipity.png` |

Añadir `?export=1` a cualquier ruta de pieza elimina todos los controles externos. Cada SVG tiene un viewBox de 1080 × 1350, se adapta al ancho de pantalla y se captura a resolución nativa. Los PNG se sirven bajo `/social/` y se descargan desde el selector. El servidor de producción debe resolver estas rutas de SPA a `index.html`, como hace Vite.

## Procedencia verificada

`src/data/publication/launch-evidence.json` es una proyección de campos seleccionados de los originales encontrados en `C:/Users/USER/Desktop/Proyectos/graphrag/backend/data/saved_paths/`:

- `pathfinder_astr_nomo_ciego_to_abandono_de_lo_superficial_1791347443292.json`: cinco resultados y cinco secuencias. Conservamos todas las secuencias con IDs, tipos, saltos, aristas, pesos y origen. La pieza muestra las rutas originales `route-1-c39324b8f0ea` y `route-3-bf6db450d548`, etiquetadas A y B editorialmente. Ambas tienen ocho saltos. Metallica → Resignación: 0.7138, `interactive_latent_explorer`.
- `serendipity_path_1791325018734.json`: Fundamentos → text_836fb8cc.txt → Intuición → FB_IMG_1741149220668.jpg → Genialidad. Pesos: .60, .60, .80, .70. Khayyam/Rubaiyat y Ramanujan proceden de `llm_explanation`; se utilizan como contexto editorial de los archivos, no como nuevos nodos. No se verificó el contenido original de esos archivos ni se reproduce la interpretación causal de la explicación.

La pieza 1 es un esquema didáctico, con pesos explícitamente ilustrativos. Las piezas 2 y 3 se generan a partir del extracto verificado. Texto, audio e imagen tienen símbolos diferentes del concepto; los assets se muestran en naranja y los conceptos en violeta. Los nombres técnicos de textos se abreviaron como «texto»; los títulos de audio solo normalizan el separador y omiten la extensión.

## Capturas y verificación

Con el servidor activo y Playwright disponible:

```powershell
node scripts/export-publication.mjs
```

Si Playwright está en el runtime de Codex y no en el proyecto, definir `PLAYWRIGHT_MODULE_DIR` con la carpeta `node_modules` del runtime antes del comando. Se puede cambiar el servidor con `PUBLICATION_ORIGIN`.

El script captura los tres frames sin navegación a 1080 × 1350; verifica desbordamientos de texto, ausencia de controles dentro de la exportación, ancho móvil de 390 px, las 20 tarjetas originales, la navegación de colección y errores de JavaScript. Validación adicional: `npm run build` y revisión visual de las tres capturas. Las fuentes remotas existentes tienen alternativas locales; en este entorno sin acceso a Google Fonts las capturas usan Bahnschrift, Georgia y Segoe UI. No hay dependencia de imágenes remotas.

## Archivos

Añadidos: `src/views/PublicationLaunch.jsx`, `src/publication.css`, `src/data/publication/launch-evidence.json`, `scripts/export-publication.mjs`, este documento y los tres PNG en `public/social/`.

Modificados: `src/App.jsx` (ruta independiente), `src/views/GraphRagHome.jsx` (entrada Publication Assets). Ninguna historia o diagrama existente fue eliminado o reescrito.

## TODO editorial futuro — no implementado

¿Puede un grafo producir conocimiento sintético antes de que un LLM genere una respuesta?

Contrastar `fuentes → retrieval → LLM → síntesis textual` con `fuentes → grafo ponderado → nueva estructura/camino → inspección humana → interpretación opcional del LLM`. Hipótesis: una ruta nueva y trazable puede ser una estructura sintética de conocimiento existente; no es automáticamente un nuevo hecho verdadero. Esta nota no añade una cuarta pieza.
