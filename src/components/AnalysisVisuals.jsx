import { useLanguage } from '../i18n/LanguageContext'
import { useState } from 'react'
import { LuFileText, LuFileAudio, LuLayers3, LuNetwork, LuDatabase, LuHardDrive, LuServerCog, LuSearch, LuUserCheck, LuBrainCircuit, LuBookOpen, LuArrowRight, LuCheck, LuClock3, LuGitBranch } from 'react-icons/lu'
import { realAssociation } from '../data/atlasEvidence'
import { exampleGraph, thresholdReachable } from '../data/diagramMath'

function Step({ icon: Icon, title, children, tone = 'blue' }) {
  const { t } = useLanguage()
  return <div className={`explain-step tone-${tone}`}><Icon aria-hidden="true" /><div><b>{t(title)}</b><p>{t(children)}</p></div></div>
}

function Responsibilities() {
  const { t } = useLanguage()
  return <>
    <header className="explain-heading"><span>{t("ARQUITECTURA / RESPONSABILIDADES")}</span><h2>{t("Qué conserva cada pieza")}</h2></header>
    <div className="responsibility-control">
      <Step icon={LuUserCheck} title={t("Interfaz")}>{t("Consultar, inspeccionar y revisar.")}</Step>
      <LuArrowRight aria-hidden="true" />
      <Step icon={LuServerCog} title={t("API · FastAPI")}>{t("Recibir peticiones y coordinar operaciones.")}</Step>
      <LuArrowRight aria-hidden="true" />
      <Step icon={LuGitBranch} title={t("Procesamiento · Celery / Redis")}>{t("Colas y tareas; estado registrado en inventario.")}</Step>
    </div>
    <div className="responsibility-stores">
      <Step icon={LuHardDrive} title={t("Archivos · MinIO")} tone="coral">{t("Originales y sidecars para volver a la fuente.")}</Step>
      <Step icon={LuDatabase} title={t("Inventario · PostgreSQL")}>{t("Identidad, metadatos y estados del activo.")}</Step>
      <Step icon={LuLayers3} title={t("Vectores · Weaviate")} tone="green">{t("Representaciones para recuperar por similitud.")}</Step>
      <Step icon={LuNetwork} title={t("Grafo · Neo4j / GDS")} tone="violet">{t("Asociaciones ponderadas y análisis estructural.")}</Step>
    </div>
    <p className="explain-footnote">{t("Hash / UUID vinculan registros. La consistencia entre almacenes requiere control de estados y reconciliación; no hay una transacción única demostrada.")}</p>
  </>
}

function Representations() {
  const { t } = useLanguage()
  return <>
    <header className="explain-heading"><span>{t("UN ACTIVO / VARIAS VISTAS")}</span><h2>{t("Representar no es duplicar el significado")}</h2></header>
    <div className="representation-root"><LuFileText /><div><b>{t("Un archivo de la colección")}</b><span>{t("Identidad común mediante hash / UUID")}</span></div></div>
    <div className="representation-branches">
      <Step icon={LuHardDrive} title={t("Original")} tone="coral">{t("El archivo conservado en MinIO permite comprobar el contenido.")}</Step>
      <Step icon={LuDatabase} title={t("Inventario")}>{t("Nombre, modalidad y estado de procesamiento en PostgreSQL.")}</Step>
      <Step icon={LuBookOpen} title={t("Descripción + contexto")} tone="coral">{t("Sidecar: resumen generado y notas aportadas por la persona.")}</Step>
      <Step icon={LuLayers3} title={t("Embedding")} tone="green">{t("Representación vectorial según modalidad; sirve para hallar candidatos.")}</Step>
      <Step icon={LuNetwork} title={t("Entidades y asociaciones")} tone="violet">{t("Propuesta del modelo y promoción al grafo tras revisión.")}</Step>
    </div>
    <p className="explain-footnote">{t("Una memoria creada a partir del contexto es otro activo en MemorySpace. Chunks con fragmentos y offsets verificables siguen siendo una mejora propuesta.")}</p>
  </>
}

function RealAssociation() {
  const { t } = useLanguage()
  return <>
    <header className="explain-heading"><span>{t("CASO EXPORTADO / ")}{t(realAssociation.generatedAt)}</span><h2>{t("De aislamiento a crítica digital")}</h2></header>
    <div className="real-path">
      {realAssociation.nodes.map((node, index) => <div className="real-path-segment" key={node.name}>
        {index > 0 && <div className="real-path-edge"><span>{t("asociación registrada")}</span><b>{t(node.weight.toFixed(2))}</b><i /></div>}
        <div className={`real-path-node ${node.type === 'Asset' ? 'audio' : 'concept'}`}>
          {node.type === 'Asset' ? <LuFileAudio aria-hidden="true" /> : <LuNetwork aria-hidden="true" />}
          <small>{t(node.type === 'Asset' ? 'ARCHIVO DE AUDIO' : 'CONCEPTO')}</small><b>{t(node.name)}</b>
          {node.type === 'Asset' && <em>{t("Icono de modalidad · sin miniatura")}</em>}
        </div>
      </div>)}
    </div>
    <div className="case-reading"><span>{t("LECTURA PROPUESTA")}</span><p>{t("Comparar cómo dos canciones pueden relacionarse con identidad y experiencia digital. Escuchar y revisar los originales permitiría aceptar, matizar o descartar esa lectura.")}</p></div>
    <p className="explain-footnote">{t(realAssociation.file)}{t(" · Tipos de relación no exportados. Las flechas indican orden de recorrido, no causalidad ni dirección semántica.")}</p>
  </>
}

function GraphCut({ threshold, onChange, name, compact }) {
  const { t } = useLanguage()
  const { kept, reached } = thresholdReachable(threshold)
  return <div className="graph-cut">
    <label>{name} <b>α = {threshold.toFixed(2)}</b>{!compact && <input aria-label={t('Umbral {name}', { name })} type="range" min=".5" max=".95" step=".01" value={threshold} onChange={event => onChange(Number(event.target.value))} />}</label>
    <svg viewBox="0 0 430 235" role="img" aria-label={t('{name}: {edges} conexiones admitidas, {nodes} nodos alcanzables desde origen', { name, edges: kept.length, nodes: reached.size - 1 })}>
      {exampleGraph.edges.map(edge => {
        const a = exampleGraph.nodes.find(node => node.id === edge.from), b = exampleGraph.nodes.find(node => node.id === edge.to)
        return <g className={edge.weight >= threshold ? 'kept-edge' : 'removed-edge'} key={`${edge.from}-${edge.to}`}><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} /><text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 8}>{t(edge.weight.toFixed(2))}</text></g>
      })}
      {exampleGraph.nodes.map(node => <g className={`cut-node ${reached.has(node.id) ? 'reachable' : ''}`} key={node.id}><circle cx={node.x} cy={node.y} r={node.id === 'q' ? 22 : 16} /><text x={node.x} y={node.y + 37}>{t(node.label)}</text></g>)}
    </svg>
    <p><b>{t(kept.length)}/5</b>{t(" conexiones admitidas · ")}<b>{t(reached.size - 1)}/4</b>{t(" nodos alcanzables")}</p>
  </div>
}

function ThresholdComparison({ compact }) {
  const { t } = useLanguage()
  const [left, setLeft] = useState(.55), [right, setRight] = useState(.85)
  return <>
    <header className="explain-heading"><span>{t("SIMULACIÓN / FILTRO TOPOLÓGICO")}</span><h2>{t("Mismo grafo. Distinta selectividad.")}</h2></header>
    <div className="threshold-pair"><GraphCut threshold={left} onChange={setLeft} name="A" compact={compact} /><GraphCut threshold={right} onChange={setRight} name="B" compact={compact} /></div>
    <div className="cut-legend"><span>{t("━━ Admitida")}</span><span>{t("┄┄ Excluida")}</span><span>{t("● Alcanzable desde origen")}</span></div>
    {!compact && <p className="explain-footnote">{t("Ambos paneles usan los mismos cinco nodos y cinco pesos didácticos. Esto ilustra el corte topológico; el umbral lateral opera sobre costes y no equivale a este filtro.")}</p>}
  </>
}

function EvidenceInterpretation() {
  const { t } = useLanguage()
  return <>
    <header className="explain-heading"><span>{t("CASO REGISTRADO / LECTURA RESPONSABLE")}</span><h2>{t("Tres niveles que conviene conservar")}</h2></header>
    <div className="evidence-levels">
      <section><span>{t("01 / FUENTE IDENTIFICADA")}</span><LuFileAudio /><h3>{t("Everyone Is Digital.mp3")}</h3><p>{t("El JSON identifica el archivo. No adjunta el audio, una transcripción verificada ni un timestamp.")}</p><b>{t("Respaldo puntual: pendiente")}</b></section>
      <section><span>{t("02 / ASOCIACIÓN REGISTRADA")}</span><LuGitBranch /><h3>{t("Aislamiento y Soledad · 0.70")}</h3><p>{t("El recorrido exportado conecta el concepto y el activo con ese peso. No declara tipo de relación ni evidencia textual.")}</p><b>{t("Comprobable en la exportación")}</b></section>
      <section><span>{t("03 / INTERPRETACIÓN PROPUESTA")}</span><LuBrainCircuit /><h3>{t("Una lectura sobre identidad digital")}</h3><p>{t("Puede orientar una comparación cultural. No demuestra causas sociales ni efectos psicológicos.")}</p><b>{t("Hipótesis de lectura")}</b></section>
    </div>
    <div className="case-reading"><span>{t("DISEÑO PROPUESTO PARA EXPLICACIONES")}</span><p>{t("Mostrar fragmento verificable, asociación y procedencia, interpretación, incertidumbres y aquello que no se puede justificar.")}</p></div>
  </>
}

function Communities() {
  const { t } = useLanguage()
  return <>
    <header className="explain-heading"><span>{t("PLACEHOLDER / SIN RESULTADOS DEL CORPUS")}</span><h2>{t("Un mapa pendiente de su exportación")}</h2></header>
    <div className="community-placeholder">
      {['A', 'B', 'C'].map((label, index) => <div className={`community-skeleton group-${index}`} key={label}><span>{t("GRUPO ")}{t(label)}</span><div><i /><i /><i /><i /></div><b>{t("Conceptos por identificar")}</b><small>{t("Archivos asociados por cargar")}</small></div>)}
    </div>
    <div className="community-process"><span>{t("Activos compartidos")}</span><LuArrowRight /><span>{t("Proyección entre conceptos")}</span><LuArrowRight /><span>{t("Louvain")}</span><LuArrowRight /><span>{t("Revisión temática")}</span></div>
    <div className="missing-data"><LuClock3 /><p><b>{t("Para convertirlo en un mapa real:")}</b>{t(" nodos, aristas, comunidad de cada nodo, pesos, método, min_weight, fecha y versión del grafo.")}</p></div>
    <p className="explain-footnote">{t("Los grupos A/B/C no representan comunidades detectadas. La agrupación depende de la proyección y los parámetros; no determina verdades temáticas.")}</p>
  </>
}

function FutureEvaluation() {
  const { t } = useLanguage()
  return <>
    <header className="explain-heading"><span>{t("PROPUESTA / EXPERIMENTO NO EJECUTADO")}</span><h2>{t("Una comparación con condiciones comunes")}</h2></header>
    <div className="evaluation-corpus"><b>{t("80 consultas propuestas")}</b><span>{t("20 localizar archivos")}</span><span>{t("20 factuales")}</span><span>{t("20 multifuente")}</span><span>{t("20 exploratorias")}</span></div>
    <div className="evaluation-methods">{['BM25', 'Vectorial', 'Híbrido', 'Híbrido + reranker', 'Híbrido + reranker + grafo'].map((method, index) => <div key={method}><span>{t(String(index + 1).padStart(2, '0'))}</span><b>{t(method)}</b><small>{t("mismo corpus y modalidades")}</small></div>)}</div>
    <div className="evaluation-budget"><LuCheck /><p>{t("Fijar generador, tokens de contexto, candidatos y corpus. Separar desarrollo de evaluación final. Variar un componente por comparación.")}</p></div>
    <div className="evaluation-metrics"><Step icon={LuSearch} title={t("Recuperación")}>{t("Recall@10 · nDCG@10 · primer resultado útil")}</Step><Step icon={LuBookOpen} title={t("Respuesta")} tone="green">{t("Corrección · respaldo · abstención")}</Step><Step icon={LuNetwork} title={t("Exploración")} tone="violet">{t("Novedad · pertinencia · validez · acción útil")}</Step></div>
    <p className="explain-footnote">{t("Además: p50/p95, coste y tiempo humano de revisión. Ablaciones propuestas: sin hubs, pesos constantes/actuales/calibrados y texto original/enriquecido. Sin resultados ni ganador.")}</p>
  </>
}

export function QueryJourney() {
  const { t } = useLanguage()
  return <div className="analysis-visual query-journey">
    <header className="explain-heading"><span>{t("CONSULTA / RECUPERACIÓN Y SÍNTESIS")}</span><h2>{t("¿Qué archivos ayudan a explorar esta idea?")}</h2></header>
    <div className="query-sequence">
      <Step icon={LuSearch} title={t("1. Pregunta")}>{t("El usuario formula una consulta.")}</Step>
      <Step icon={LuLayers3} title={t("2. Candidatos")} tone="green">{t("Búsqueda vectorial / híbrida en espacios seleccionados.")}</Step>
      <Step icon={LuNetwork} title={t("3. Expansión")} tone="violet">{t("Los conceptos del grafo conectan candidatos con otros activos.")}</Step>
      <Step icon={LuGitBranch} title={t("4. Resultados")}>{t("Ranking y selección de archivos para inspeccionar.")}</Step>
    </div>
    <div className="query-outcomes"><Step icon={LuUserCheck} title={t("Explorar archivos")} tone="coral">{t("Abrir, comparar o guardar un recorrido.")}</Step><Step icon={LuBrainCircuit} title={t("Síntesis opcional")} tone="violet">{t("Seleccionar contexto → LLM → respuesta con referencias de archivo.")}</Step></div>
    <p className="explain-footnote">{t("El grafo participa en la selección. La síntesis actual recorta texto por caracteres; las referencias no acreditan citas puntuales. Política de privacidad por fuente pendiente de completar.")}</p>
  </div>
}

export function AnalysisVisual({ id, compact = false }) {
  const { t } = useLanguage()
  const panels = { responsibilities: Responsibilities, representations: Representations, 'real-association': RealAssociation, 'threshold-comparison': ThresholdComparison, 'evidence-interpretation': EvidenceInterpretation, communities: Communities, 'future-evaluation': FutureEvaluation }
  const Panel = panels[id]
  return Panel ? <div className={`analysis-visual ${compact ? 'is-compact' : ''}`}><Panel compact={compact} /></div> : null
}
