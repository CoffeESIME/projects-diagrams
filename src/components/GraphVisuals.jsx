import { useLanguage } from '../i18n/LanguageContext'
import { useState } from 'react'
import { AnalysisVisual, QueryJourney } from './AnalysisVisuals'
import { jaccardMatrix, matrixMemberships } from '../data/diagramMath'
import {
  LuBrainCircuit, LuBoxes, LuCheck, LuDatabase, LuEye, LuFileAudio,
  LuFileImage, LuFileText, LuGitBranch, LuHardDrive, LuLayers3,
  LuNetwork, LuSearch, LuServerCog, LuSparkles, LuUserCheck, LuWorkflow,
  LuCloud, LuLockKeyhole, LuRoute, LuDice5, LuGrid3X3, LuPenLine,
  LuShieldCheck, LuTags, LuMerge, LuBookOpen, LuRefreshCw, LuFileJson,
  LuMemoryStick, LuWandSparkles, LuScanSearch,
} from 'react-icons/lu'

const IconBadge = ({ icon: Icon, label, tone = 'blue' }) => {
  const { t } = useLanguage()
  return <div className={`icon-badge tone-${tone}`}><Icon aria-hidden="true" /><span>{t(label)}</span></div>
}

const FlowArrow = ({ delay = 0, vertical = false, label }) => {
  const { t } = useLanguage()
  return <div className={`flow-arrow ${vertical ? 'vertical' : ''}`} aria-hidden="true">
    {label && <span>{t(label)}</span>}<i style={{ '--delay': `${delay}s` }} />
  </div>
}

function ArchitectureVisual({ compact }) {
  const { t } = useLanguage()
  if (!compact) return <SystemMapVisual />

  return (
    <div className={`architecture-visual ${compact ? 'is-compact' : ''}`}>
      <div className="arch-column sources">
        <small>{t("ENTRADAS")}</small>
        <IconBadge icon={LuFileText} label={t("Texto")} tone="coral" />
        <IconBadge icon={LuFileImage} label={t("Imagen")} tone="coral" />
        <IconBadge icon={LuFileAudio} label={t("Audio")} tone="coral" />
      </div>
      <FlowArrow delay={0} label={t("ingesta")} />
      <div className="arch-core"><div className="core-orbit orbit-a" /><div className="core-orbit orbit-b" /><LuBrainCircuit /><strong>{t("FastAPI + Celery")}</strong><span>{t("orquestación inteligente")}</span></div>
      <FlowArrow delay={.45} label={t("indexa")} />
      <div className="arch-column stores">
        <small>{t("MEMORIA")}</small>
        <IconBadge icon={LuHardDrive} label={t("MinIO")} tone="ink" />
        <IconBadge icon={LuLayers3} label={t("Weaviate")} tone="green" />
        <IconBadge icon={LuNetwork} label={t("Neo4j GDS")} tone="violet" />
        <IconBadge icon={LuDatabase} label={t("PostgreSQL")} tone="blue" />
      </div>
      <FlowArrow delay={.9} label={t("expone")} />
      <div className="arch-column outputs">
        <small>{t("EXPERIENCIAS")}</small>
        <IconBadge icon={LuSearch} label={t("Buscar")} tone="green" />
        <IconBadge icon={LuGitBranch} label={t("Explorar")} tone="violet" />
        <IconBadge icon={LuSparkles} label={t("Descubrir")} tone="coral" />
      </div>
    </div>
  )
}

function SystemMapVisual() {
  const { t } = useLanguage()
  return (
    <div className="system-map-visual" aria-label={t("Mapa completo del sistema Fuzzy GraphRAG")}>
      <div className="system-map-legend">
        <span><i className="legend-auto" />{t(" Automatizado")}</span>
        <span><i className="legend-human" />{t(" Decisión humana")}</span>
        <span><i className="legend-private" />{t(" Dato privado")}</span>
      </div>

      <section className="map-stage map-sources">
        <div className="map-stage-title"><span>01</span><b>{t("Fuentes")}</b><small>{t("El conocimiento llega en distintos formatos")}</small></div>
        <div className="source-stack">
          <span><LuFileText /><b>{t("PDF · DOC")}</b><small>{t("texto y tablas")}</small></span>
          <span><LuFileImage /><b>{t("Imagen")}</b><small>{t("escenas y OCR")}</small></span>
          <span><LuFileAudio /><b>{t("Audio")}</b><small>{t("voz y ambiente")}</small></span>
          <span><LuPenLine /><b>{t("Contexto")}</b><small>{t("notas del usuario")}</small></span>
          <span><LuMemoryStick /><b>{t("Memoria")}</b><small>{t("recuerdo privado")}</small></span>
        </div>
      </section>

      <div className="map-connector"><i /><span>{t("normaliza")}</span></div>

      <section className="map-stage map-unify">
        <div className="map-stage-title"><span>02</span><b>{t("Unificación multimodal")}</b><small>{t("Cada modalidad conserva su mejor representación")}</small></div>
        <div className="processor-grid">
          <span><b>{t("OCR + Parser")}</b><small>{t("estructura textual")}</small></span>
          <span><b>{t("Qwen3-VL")}</b><small>{t("descripción visual")}</small></span>
          <span><b>{t("Whisper")}</b><small>{t("transcripción")}</small></span>
          <span><b>{t("BGE-M3")}</b><small>{t("embedding semántico")}</small></span>
        </div>
        <div className="context-merge"><LuWandSparkles /><span><b>{t("Activo enriquecido")}</b><small>{t("contenido + metadatos + contexto")}</small></span></div>
      </section>

      <div className="map-connector"><i /><span>{t("comprende")}</span></div>

      <section className="map-stage map-intelligence">
        <div className="map-stage-title"><span>03</span><b>{t("Inteligencia relacional")}</b><small>{t("Política de ingesta; consulta por completar")}</small></div>
        <div className="model-split">
          <span className="model-local"><LuLockKeyhole /><b>{t("Local")}</b><small>{t("strict_local")}</small></span>
          <span className="model-cloud"><LuCloud /><b>{t("Cloud")}</b><small>{t("public_cloud")}</small></span>
        </div>
        <div className="llm-draft"><LuBrainCircuit /><span><b>{t("LLM propone")}</b><small>{t("entidades · conceptos · relaciones · μ")}</small></span></div>
        <div className="human-gate"><LuUserCheck /><span><b>{t("Usuario cura")}</b><small>{t("edita, justifica y aprueba")}</small></span><LuCheck /></div>
      </section>

      <div className="map-connector dual"><i /><span>{t("grafo curado")}</span></div>

      <section className="map-stage map-memory">
        <div className="map-stage-title"><span>04</span><b>{t("Doble memoria")}</b><small>{t("Grafo tras revisión · vectores por ruta automática")}</small></div>
        <div className="dual-databases">
          <div className="graph-database">
            <div><LuNetwork /><span><b>{t("Neo4j")}</b><small>{t("grafo ponderado")}</small></span></div>
            <div className="micro-graph"><i /><i /><i /><i /><svg viewBox="0 0 120 64"><path d="M15 35L48 16 70 44 106 21M48 16L106 21M15 35L70 44" /></svg></div>
            <em>{t("Concept ─ μ .65 ─ Asset")}</em>
          </div>
          <div className="vector-database">
            <div><LuLayers3 /><span><b>{t("Weaviate")}</b><small>{t("espacios vectoriales")}</small></span></div>
            <div className="vector-spaces"><span>{t("Text")}</span><span>{t("Visual")}</span><span>{t("Audio")}</span><span>{t("Memory")}</span></div>
            <em>{t("desde procesamiento → embeddings; CLAP simulado")}</em>
          </div>
        </div>
      </section>

      <div className="map-connector"><i /><span>{t("recupera")}</span></div>

      <section className="map-stage map-explore">
        <div className="map-stage-title"><span>05</span><b>{t("Exploración y respuesta")}</b><small>{t("Buscar, atravesar y volver a narrar")}</small></div>
        <div className="map-query"><LuSearch /><span><b>{t("Pregunta")}</b><small>{t("vector seeds → fuzzy expansion")}</small></span></div>
        <div className="analysis-lenses">
          <span><LuRoute />{t(" Pathfinder")}</span>
          <span><LuDice5 />{t(" Serendipia")}</span>
          <span><LuGrid3X3 />{t(" Jaccard")}</span>
          <span><LuMerge />{t(" Ontología")}</span>
        </div>
        <div className="map-answer"><LuBookOpen /><span><b>{t("Lectura propuesta")}</b><small>{t("síntesis opcional · contrastar originales")}</small></span></div>
      </section>

      <div className="system-map-foot">
        <span>{t("INGESTA")}</span><i /><span>{t("COMPRENSIÓN")}</span><i /><span>{t("CRITERIO")}</span><i /><span>{t("MEMORIA")}</span><i /><span>{t("DESCUBRIMIENTO")}</span>
      </div>
    </div>
  )
}

function PrivacyVisual({ compact }) {
  const { t } = useLanguage()
  return (
    <div className={`privacy-visual ${compact ? 'is-compact' : ''}`}>
      <div className="privacy-input"><LuFileJson /><b>{t("Activo + sidecar")}</b><small>{t("privacy_level")}</small></div>
      <FlowArrow vertical delay={0} />
      <div className="privacy-gate"><LuShieldCheck /><span>{t("LLM GATEWAY")}</span><b>{t("¿Puede salir el dato?")}</b></div>
      <div className="privacy-branches">
        <div className="privacy-branch local-branch"><span className="branch-tag"><LuLockKeyhole />{t(" STRICT_LOCAL")}</span><div className="model-chip"><LuBrainCircuit /><b>{t("Modelo local")}</b><small>{t("ruta prevista en ingesta")}</small></div><p>{t("El activo solicita procesamiento local.")}</p></div>
        <div className="privacy-branch cloud-branch"><span className="branch-tag"><LuCloud />{t(" PUBLIC_CLOUD")}</span><div className="model-chip"><LuCloud /><b>{t("API externa")}</b><small>{t("ruta autorizada por política de ingesta")}</small></div><p>{t("Los datos permiten usar servicios externos.")}</p></div>
      </div>
      {!compact && <div className="memory-lock-note"><LuMemoryStick /><span><b>{t("Memorias: creación en modo strict")}</b><small>{t("Síntesis y explicación: falta resolver la política por fuente en servidor.")}</small></span></div>}
    </div>
  )
}

function ContextMemoryVisual({ compact }) {
  const { t } = useLanguage()
  return (
    <div className={`context-visual ${compact ? 'is-compact' : ''}`}>
      <div className="context-asset"><LuFileImage /><b>{t("Archivo original")}</b><small>{t("lo que el sistema puede observar")}</small></div>
      <div className="context-plus">+</div>
      <div className="context-note"><LuPenLine /><b>{t("Contexto del usuario")}</b><small>{t("“Esta foto marca el inicio del proyecto…”")}</small></div>
      <div className="context-fork">
        <div><span>{t("ENRIQUECER")}</span><LuWandSparkles /><b>{t("Prompt con contexto")}</b><small>{t("mejor resumen y relaciones")}</small></div>
        <div><span>{t("CONVERTIR")}</span><LuMemoryStick /><b>{t("Nuevo Memory Asset")}</b><small>{t("privacidad strict_local")}</small></div>
      </div>
      <div className="memory-space"><span>{t("MEMORYSPACE")}</span><div className="memory-rings"><i /><i /><i /></div><b>{t("BGE-M3")}</b><small>{t("índice vectorial independiente")}</small></div>
      {!compact && <div className="context-footer"><span>{t("Sidecar editable")}</span><i /> <span>{t("deduplicación por hash")}</span><i /> <span>{t("TEXT_SUMMARY + USER_MEMORY")}</span></div>}
    </div>
  )
}

function CurationVisual({ compact }) {
  const { t } = useLanguage()
  return (
    <div className={`curation-visual ${compact ? 'is-compact' : ''}`}>
      <div className="curation-source"><LuFileImage /><b>{t("DigitalAsset")}</b><small>{t("contenido + contexto + privacidad")}</small></div>
      <div className="dual-flow">
        <div className="auto-lane"><span className="lane-label">{t("FLUJO AUTOMÁTICO")}</span><div className="lane-box"><LuLayers3 /><b>{t("Embeddings")}</b><small>{t("texto · visual · audio · memoria")}</small></div><FlowArrow delay={0} /><div className="lane-target"><b>{t("WEAVIATE")}</b><small>{t("espacios vectoriales")}</small></div></div>
        <div className="review-lane"><span className="lane-label">{t("HUMAN IN THE LOOP")}</span><div className="lane-box"><LuBrainCircuit /><b>{t("Borrador LLM")}</b><small>{t("entidades · conceptos · pesos")}</small></div><FlowArrow delay={.4} /><div className="review-sheet"><div><LuPenLine /><span><b>{t("Melancolía")}</b><small>{t("EVOKES · 0.65")}</small></span></div><div><LuCheck /><span><b>{t("Usuario aprueba")}</b><small>{t("edita peso y razonamiento")}</small></span></div></div><FlowArrow delay={.8} /><div className="lane-target graph-target"><b>{t("NEO4J")}</b><small>{t("nodos + aristas curadas")}</small></div></div>
      </div>
      {!compact && <><div className="curation-rule">{t("BORRADOR ")}<i />{t(" REVISIÓN ")}<i />{t(" APROBAR → GRAFO")}</div><p className="visual-caveat">{t("Corregir → volver a revisar · Rechazar / no aprobar → no promover al grafo. Aprobar una interpretación no demuestra su veracidad.")}</p></>}
    </div>
  )
}

const pipelineSteps = [
  { icon: LuHardDrive, title: 'Upload', sub: 'MinIO', tone: 'ink' },
  { icon: LuUserCheck, title: 'Staging', sub: 'revisión humana', tone: 'coral' },
  { icon: LuServerCog, title: 'Workers', sub: 'Celery + modelos', tone: 'blue' },
  { icon: LuBoxes, title: 'Representaciones', sub: 'vectores / borrador', tone: 'violet' },
  { icon: LuCheck, title: 'Revisión final', sub: 'aprobar → grafo', tone: 'green' },
]

function PipelineVisual({ compact }) {
  const { t } = useLanguage()
  return (
    <div className={`pipeline-visual ${compact ? 'is-compact' : ''}`}>
      <div className="pipeline-line" /><span className="pipeline-packet packet-a" /><span className="pipeline-packet packet-b" />
      {pipelineSteps.map(({ icon: Icon, title, sub, tone }, index) => (
        <div className="pipeline-step" key={title}>
          <div className={`pipeline-node tone-${tone}`}><Icon /></div><b>{t(index + 1)}. {t(title)}</b><small>{t(sub)}</small>
        </div>
      ))}
      {!compact && <div className="processor-fan"><span>{t("Qwen3-VL · OCR")}</span><span>{t("SigLIP · imagen")}</span><span>{t("Whisper · voz")}</span><span>{t("BGE-M3 · texto")}</span><span>{t("LLM · conceptos")}</span><span>{t("CLAP · simulado")}</span></div>}
    </div>
  )
}

function FuzzyVisual({ compact }) {
  const { t } = useLanguage()
  return (
    <div className={`fuzzy-visual ${compact ? 'is-compact' : ''}`}>
      <div className="logic-panel crisp-panel"><span className="logic-label">{t("LÓGICA CRISP")}</span><div className="crisp-scale"><i /><i /></div><div className="scale-labels"><span>{t("NO · 0")}</span><span>{t("SÍ · 1")}</span></div>{!compact && <p>{t("Una conexión existe o no existe.")}</p>}</div>
      <div className="versus">{t("VS")}</div>
      <div className="logic-panel fuzzy-panel"><span className="logic-label">{t("RELACIONES GRADUADAS")}</span><div className="fuzzy-scale">{[.2, .42, .65, .85, 1].map(value => <i key={value} style={{ '--weight': value }}><em>{t(value)}</em></i>)}</div>{!compact && <p>{t("El peso expresa un grado cuyo significado debe definirse.")}</p>}</div>
      <div className="zadeh-example">
        <div className="concept-node concept-a">{t("Melancolía")}</div><span className="weight-link w65"><i />0.65</span><div className="asset-node"><LuFileImage /><small>{t("asset")}</small></div><span className="weight-link w90"><i />0.90</span><div className="concept-node concept-b">{t("Tristeza")}</div>
      </div>
      {!compact && <div className="formula"><span>{t("min(a, b)")}</span><b>{t("= min(0.65, 0.90) = 0.65")}</b><small>{t("Ejemplo de intersección fuzzy. Recuperación usa productos; rutas directas, suma de 1−peso.")}</small></div>}
    </div>
  )
}

function SearchVisual({ compact }) {
  const { t } = useLanguage()
  if (!compact) return <QueryJourney />
  return (
    <div className={`search-visual ${compact ? 'is-compact' : ''}`}>
      <div className="query-pill"><LuSearch /><span>{t("“automatización y memoria”")}</span></div><FlowArrow vertical delay={0} />
      <div className="search-stage vector-stage"><div className="stage-title"><span>01</span><b>{t("Vector-first")}</b><small>{t("Weaviate encuentra semillas")}</small></div><div className="seed-row"><i className="seed seed-a"><LuFileText /></i><i className="seed seed-b"><LuFileImage /></i><i className="seed seed-c"><LuFileAudio /></i></div></div>
      <FlowArrow vertical delay={.45} />
      <div className="search-stage graph-stage"><div className="stage-title"><span>02</span><b>{t("Fuzzy expansion")}</b><small>{t("Neo4j cruza conexiones ponderadas")}</small></div><div className="mini-network"><span className="net-node n1">{t("A")}</span><span className="net-node n2">{t("C")}</span><span className="net-node n3">{t("D")}</span><span className="net-node n4">{t("P")}</span><svg viewBox="0 0 220 72" preserveAspectRatio="none"><path d="M35 36 C70 10 88 12 112 35 M35 36 C72 64 91 61 112 35 M112 35 C148 16 167 15 194 20 M112 35 C150 52 171 55 194 55" /></svg></div></div>
      {!compact && <div className="score-strip"><span>{t("fuerza del camino")}</span><b>×</b><span>{t("relevancia semántica")}</span><b>×</b><span>{t("penalización de hubs")}</span><b>=</b><strong>{t("descubrimiento diverso")}</strong></div>}
    </div>
  )
}

function PathfinderVisual({ compact }) {
  const { t } = useLanguage()
  const [threshold, setThreshold] = useState(.55)
  const routes = [
    { id: 'A', weight: .91, nodes: ['Origen', 'Control', 'Destino'], tone: 'direct' },
    { id: 'B', weight: .72, nodes: ['Origen', 'Memoria', 'Ética', 'Destino'], tone: 'middle' },
    { id: 'C', weight: .46, nodes: ['Origen', 'Música', 'Ciclos', 'Biología', 'Destino'], tone: 'latent' },
  ]
  const visible = routes.filter(route => route.weight >= threshold).length
  return (
    <div className={`pathfinder-visual ${compact ? 'is-compact' : ''}`}>
      <div className="pathfinder-head"><div><LuRoute /><span><b>{t("Origen")}</b><small>{t("automatización")}</small></span></div><span className="pathfinder-arrow">→</span><div><LuScanSearch /><span><b>{t("Destino")}</b><small>{t("libre albedrío")}</small></span></div></div>
      {!compact && <div className="path-modes"><span>{t("Directo: coste")}</span><span>{t("Lateral: franja")}</span><span className="active">{t("Topológico: filtro")}</span></div>}
      <div className="routes-stack">
        {routes.map(route => <div key={route.id} className={`route-line ${route.tone} ${route.weight < threshold ? 'filtered' : ''}`}><b>{t(route.id)}</b><div>{route.nodes.map((node, index) => <span key={node}><i>{t(node)}</i>{index < route.nodes.length - 1 && <em>— {t(route.weight.toFixed(2))} —</em>}</span>)}</div></div>)}
      </div>
      {!compact && <div className="threshold-control"><div><span>{t("UMBRAL TOPOLÓGICO")}</span><b>α ≥ {t(threshold.toFixed(2))}</b></div><input aria-label={t("Umbral de Pathfinder")} type="range" min="0.30" max="0.90" step="0.01" value={threshold} onChange={event => setThreshold(Number(event.target.value))} /><small>{t(visible)}{t(" de 3 rutas visibles · bájalo para abrir conexiones latentes")}</small></div>}
    </div>
  )
}

const serendipityPaths = [
  [['Misticismo', 'Concept'], ['nota_de_viaje.jpg', 'Asset'], ['Ciclos naturales', 'Concept'], ['control_loop.pdf', 'Asset'], ['Automatización', 'Concept'], [.74, .88, .61, .84]],
  [['Melancolía', 'Concept'], ['rain_recording.wav', 'Asset'], ['Memoria', 'Concept'], ['old_diagram.png', 'Asset'], ['Identidad', 'Concept'], [.68, .82, .77, .91]],
  [['Biología', 'Concept'], ['cells_notes.pdf', 'Asset'], ['Comunicación', 'Concept'], ['modbus_map.csv', 'Asset'], ['Sistemas', 'Concept'], [.87, .72, .58, .79]],
]

function SerendipityVisual({ compact }) {
  const { t } = useLanguage()
  const [variant, setVariant] = useState(0)
  const [nodes, weights] = [serendipityPaths[variant].slice(0, 5), serendipityPaths[variant][5]]
  return (
    <div className={`serendipity-visual ${compact ? 'is-compact' : ''}`}>
      <div className="serendipity-rule"><LuDice5 /><span><b>{t("SELECCIÓN ALEATORIA DE CANDIDATOS")}</b><small>{t("Concepto → Asset → Concepto → Asset → Concepto")}</small></span></div>
      <div className="metro-path">
        {nodes.map(([label, type], index) => <div className={`metro-stop ${type.toLowerCase()}`} key={`${label}-${index}`}><span>{type === 'Asset' ? <LuFileImage /> : <LuSparkles />}</span><b>{t(label)}</b><small>{t(type)}</small>{index < nodes.length - 1 && <em className={weights[index] <= .79 ? 'weak' : ''}>{t(weights[index].toFixed(2))}</em>}</div>)}
      </div>
      {!compact && <div className="serendipity-foot"><span><b>{t("REGLA")}</b>{t(" al menos una arista ≤ .79")}</span><span><b>{t("HEURÍSTICA")}</b>{t(" rand() × exp(-.015 × grado del hub)")}</span><button onClick={() => setVariant(value => (value + 1) % serendipityPaths.length)}><LuRefreshCw />{t(" Ver otro ejemplo")}</button></div>}
    </div>
  )
}

function JaccardVisual({ compact }) {
  const { t } = useLanguage()
  const [mode, setMode] = useState('fuzzy')
  const [threshold, setThreshold] = useState(.2)
  const labels = ['Memoria', 'Arte', 'Ética', 'Tecnología', 'Cuerpo']
  const heatValues = jaccardMatrix(matrixMemberships, mode, threshold)
  return (
    <div className={`jaccard-visual ${compact ? 'is-compact' : ''}`}>
      <div className="matrix-wrap">
        <div className="matrix-corner" />{labels.map(label => <span className="matrix-col" key={label}>{t(label)}</span>)}
        {heatValues.map((row, rowIndex) => <div className="matrix-row" key={labels[rowIndex]}><span className="matrix-label">{t(labels[rowIndex])}</span>{row.map((value, colIndex) => <i key={`${rowIndex}-${colIndex}`} style={{ '--heat': value }}><em>{t(value.toFixed(2))}</em></i>)}</div>)}
      </div>
      <div className="matrix-explain">
        <LuGrid3X3 /><b>{t(mode === 'fuzzy' ? 'Jaccard difuso' : 'Jaccard clásico')}</b>
        <p>{t(mode === 'fuzzy' ? 'Intersección ponderada / unión ponderada.' : 'Número de activos compartidos / número de activos en la unión.')}</p>
        {!compact && <><div className="matrix-toggle"><button aria-pressed={mode === 'classic'} className={mode === 'classic' ? 'active' : ''} onClick={() => setMode('classic')}>{t("Clásico")}</button><button aria-pressed={mode === 'fuzzy'} className={mode === 'fuzzy' ? 'active' : ''} onClick={() => setMode('fuzzy')}>{t("Fuzzy")}</button></div><label>{t("peso mínimo de entrada ")}{t(threshold.toFixed(2))}<input aria-label={t("Umbral de Jaccard")} type="range" min="0" max=".9" step=".05" value={threshold} onChange={event => setThreshold(Number(event.target.value))} /></label><div className="jaccard-formula">{t(mode === 'fuzzy' ? 'J(A,B) = Σ min(wA, wB) / Σ max(wA, wB)' : 'J(A,B) = |A ∩ B| / |A ∪ B|')}</div><small>{t("5 activos didácticos · mismos datos en ambos modos")}</small></>}
      </div>
    </div>
  )
}

function LatentVisual({ compact }) {
  const { t } = useLanguage()
  return (
    <div className={`latent-visual ${compact ? 'is-compact' : ''}`}>
      <div className="latent-seed"><LuNetwork /><b>{t("Concepto semilla")}</b><small>{t("descripción enriquecida")}</small></div><FlowArrow delay={0} />
      <div className="latent-vector"><LuLayers3 /><b>{t("Embedding BGE-M3")}</b><small>{t("buscar vecinos en Weaviate")}</small></div><FlowArrow delay={.35} />
      <div className="neighbor-cloud"><span><LuFileText /><b>.92</b></span><span><LuFileImage /><b>.84</b></span><span><LuFileAudio /><b>.77</b></span><small>{t("ACTIVOS VECINOS")}</small></div><FlowArrow delay={.7} />
      <div className="latent-review"><div><LuBrainCircuit /><b>{t("LLM local")}</b><small>{t("validación opcional")}</small></div><div><LuUserCheck /><b>{t("Usuario")}</b><small>{t("peso · tipo · razonamiento")}</small></div></div><FlowArrow delay={1.05} />
      <div className="latent-result"><LuGitBranch /><b>{t("Nueva asociación")}</b><small>{t("Neo4j · tras aprobación")}</small></div>
      {!compact && <div className="blend-formula"><span>{t("peso del grafo")}</span><b>+</b><span>{t("similitud transformada")}</span><b>=</b><strong>{t("mezcla heurística")}</strong><em>{t("Preview de enriquecimiento: sin calibración demostrada ni protección garantizada al escribir.")}</em></div>}
    </div>
  )
}

function OntologyVisual({ compact }) {
  const { t } = useLanguage()
  return (
    <div className={`ontology-visual ${compact ? 'is-compact' : ''}`}>
      <div className="ontology-before"><small>{t("ANTES")}</small><div className="messy-nodes"><span>{t("IA")}</span><span>{t("Inteligencia artificial")}</span><span>{t("foto")}</span><span>{t("Inteligencia Artificial")}</span><span>{t("azul")}</span><span>{t("AI")}</span></div></div>
      <div className="ontology-ops"><div><LuBrainCircuit /><b>{t("Recomendación")}</b><small>{t("equivalencia semántica")}</small></div><div><LuUserCheck /><b>{t("Confirmación")}</b><small>{t("criterio humano")}</small></div><div className="op-row"><span><LuMerge />{t(" fusionar")}</span><span><LuTags />{t(" degradar")}</span></div></div>
      <div className="ontology-after"><small>{t("DESPUÉS")}</small><div className="canonical-node"><LuSparkles /><b>{t("Inteligencia artificial")}</b><span>{t("aliases: IA · AI")}</span></div><div className="tag-row"><span>{t("#foto")}</span><span>{t("#azul")}</span></div></div>
      {!compact && <div className="ontology-audit"><LuBookOpen /><span><b>{t("ONTOLOGY AUDIT")}</b><small>{t("cada merge, democión y re-tipado queda registrado")}</small></span></div>}
    </div>
  )
}

const lenses = [
  ['ENCONTRAR', LuSearch, '6 modos', 'texto · imagen · audio'],
  ['CONECTAR', LuNetwork, 'grafo fuzzy', 'contexto con intensidad'],
  ['INTERPRETAR', LuEye, 'lecturas propuestas', 'contrastar con originales'],
  ['EXPLORAR', LuSparkles, 'serendipia', 'utilidad por evaluar'],
]

function ValueVisual({ compact }) {
  const { t } = useLanguage()
  return (
    <div className={`value-visual ${compact ? 'is-compact' : ''}`}>
      <div className="value-core"><LuBrainCircuit /><b>{t("TU CONOCIMIENTO")}</b><small>{t("activo · conectado · navegable")}</small></div><div className="value-orbit" />
      {lenses.map(([title, Icon, metric, sub], index) => <div className={`value-lens lens-${index + 1}`} key={title}><Icon /><span><b>{t(title)}</b>{!compact && <><em>{t(metric)}</em><small>{t(sub)}</small></>}</span></div>)}
      {!compact && <div className="analysis-ribbon">{t("Louvain ")}<i />{t(" PageRank ")}<i />{t(" Fuzzy Jaccard ")}<i />{t(" Bridges ")}<i />{t(" Serendipity ")}<i />{t(" Fog of War")}</div>}
    </div>
  )
}

export function StoryVisual({ id, compact = false }) {
  const { t } = useLanguage()
  if (['responsibilities', 'representations', 'real-association', 'threshold-comparison', 'evidence-interpretation', 'communities', 'future-evaluation'].includes(id)) return <AnalysisVisual id={id} compact={compact} />
  if (id === 'system-architecture') return <ArchitectureVisual compact={compact} />
  if (id === 'privacy-routing') return <PrivacyVisual compact={compact} />
  if (id === 'context-memory') return <ContextMemoryVisual compact={compact} />
  if (id === 'ingestion-pipeline') return <PipelineVisual compact={compact} />
  if (id === 'human-curation') return <CurationVisual compact={compact} />
  if (id === 'fuzzy-logic') return <FuzzyVisual compact={compact} />
  if (id === 'fuzzy-search') return <SearchVisual compact={compact} />
  if (id === 'pathfinder') return <PathfinderVisual compact={compact} />
  if (id === 'serendipity') return <SerendipityVisual compact={compact} />
  if (id === 'jaccard-matrix') return <JaccardVisual compact={compact} />
  if (id === 'latent-enrichment') return <LatentVisual compact={compact} />
  if (id === 'ontology-cleanup') return <OntologyVisual compact={compact} />
  return <ValueVisual compact={compact} />
}

export function HeroConstellation() {
  const { t } = useLanguage()
  const nodes = [['TEXT', 16, 24], ['IMAGE', 75, 15], ['AUDIO', 86, 62], ['MEMORY', 18, 77], ['CONCEPT', 52, 42], ['PERSON', 39, 72], ['EVENT', 67, 79]]
  return (
    <div className="hero-constellation" aria-label={t("Constelación animada de conocimiento multimodal")}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M16 24 L52 42 L75 15 M52 42 L86 62 M52 42 L39 72 L18 77 M39 72 L67 79 L86 62 M75 15 L86 62" /><path className="signal-path signal-one" d="M16 24 L52 42 L86 62" /><path className="signal-path signal-two" d="M75 15 L52 42 L39 72 L18 77" /></svg>
      {nodes.map(([label, x, y], i) => <span key={label} className={label === 'CONCEPT' ? 'hero-node central' : 'hero-node'} style={{ left: `${x}%`, top: `${y}%`, '--i': i }}><i />{t(label)}</span>)}
      <div className="hero-core"><LuWorkflow /><b>{t("FUZZY")}</b><small>0.65</small></div>
    </div>
  )
}
