import evidence from '../data/publication/launch-evidence.json'
import '../publication.css'

const base = '/social/fuzzy-graphrag-launch'
const pieces = [
  { id: '01-fuzzy', title: 'Fuzzy paths', component: Fuzzy },
  { id: '02-pathfinder', title: 'Pathfinder real', component: Pathfinder },
  { id: '03-serendipity', title: 'Serendipity real', component: Serendipity },
]
const violet = '#6143ad', blue = '#2758b4', orange = '#b64b24', paper = '#f3f0e7'

function Text({ x = 72, y, size = 30, fill, children, className = '', ...props }) {
  return <text x={x} y={y} fontSize={size} fill={fill} className={className} {...props}>{children}</text>
}
function Icon({ x, y, type, scale = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} fill={paper} stroke={type === 'Concept' ? violet : orange} strokeWidth="2.5">
    {type === 'Concept' ? <circle r="10" /> : type === 'Text' ? <><path d="M-9-13H4L10-7V13H-9Z" /><path d="M-4-3H5M-4 3H5M-4 8H3" /></> : type === 'Audio' ? <><circle r="14" /><path d="M-7-3V3M-2-8V8M3-5V5M8-2V2" /></> : <><rect x="-15" y="-12" width="30" height="24" /><path d="M-12 9L-3-2L3 4L8-2L13 7" /><circle cx="5" cy="-6" r="2" /></>}
  </g>
}
function Frame({ title, label, children }) {
  return <svg className="publication-frame" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350" role="img" aria-label={title}>
    <title>{title}</title>
    <rect width="1080" height="1350" fill={paper} />
    <path d="M72 105H1008M72 1251H1008" stroke="#c6c0b2" />
    <Text y={72} size={23} fontWeight="700" letterSpacing="2">FUZZY GRAPH RAG</Text>
    <Text x={1008} y={72} size={21} textAnchor="end" fill="#6a645e">{label}</Text>
    {children}
    <Text y={1294} size={22} fontWeight="600">github.com/CoffeESIME/fuzzy-graph-rag</Text>
    <Text x={1008} y={1294} size={20} textAnchor="end" fill="#6a645e">Repositorio público ↗</Text>
  </svg>
}
function Fuzzy() {
  return <Frame title="¿Y si retrieval pudiera encontrar relaciones que nunca pensamos buscar?" label="EXPLORACIÓN ASOCIATIVA">
    <Text y={190} size={62} className="pub-display">¿Y si retrieval pudiera</Text>
    <Text y={265} size={62} className="pub-display">encontrar relaciones</Text>
    <Text y={340} size={62} className="pub-display">que nunca pensamos</Text>
    <Text y={427} size={88} className="pub-serif" fill={violet}>buscar?</Text>
    <Text y={479} size={27}>Fuzzy GraphRAG · analogía, metáfora y exploración asociativa</Text>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M142 761C248 761 236 600 350 600L651 600C774 600 811 761 938 761" stroke={violet} strokeWidth="9" />
      <path d="M142 761L373 731L642 777L938 761" stroke={blue} strokeWidth="6" />
      <path d="M142 761C240 761 257 930 385 930L690 911C830 911 819 761 938 761" stroke={orange} strokeWidth="4" />
      <path d="M350 600L373 731L385 930M651 600L642 777L690 911" stroke="#b5aca2" strokeWidth="2" />
    </g>
    {[[350,600],[651,600],[373,731],[642,777],[385,930],[690,911]].map(([x,y], i) => <circle key={i} cx={x} cy={y} r="17" fill={paper} stroke={i < 2 ? violet : i < 4 ? blue : orange} strokeWidth="5" />)}
    {[142,938].map(x => <g key={x}><circle cx={x} cy="761" r="32" fill={paper} stroke={violet} strokeWidth="3" /><circle cx={x} cy="761" r="13" fill={violet}/></g>)}
    <Text x={142} y={835} textAnchor="middle" size={24} fontWeight="700">ORIGEN</Text>
    <Text x={938} y={835} textAnchor="middle" size={24} fontWeight="700">DESTINO</Text>
    <Text x={479} y={578} size={29} fill={violet}>0.92</Text>
    <Text x={485} y={719} size={29} fill={blue}>0.84</Text>
    <Text x={805} y={648} size={27} fill={violet}>0.71</Text>
    <Text x={505} y={971} size={29} fill={orange}>0.58</Text>
    <Text x={1008} y={1020} size={20} textAnchor="end" fill="#6a645e">Esquema conceptual · pesos ilustrativos</Text>
    <Text y={1092} size={31}>Una relación puede tener grado, no solo existir o no existir.</Text>
    <Text y={1142} size={31}>Rutas diferentes pueden producir lecturas diferentes.</Text>
    <Text y={1211} size={24} fill={violet} letterSpacing="2">analogía · metáfora · serendipia</Text>
  </Frame>
}

function Pathfinder() {
  const a = evidence.pathfinder.routes[0]
  const b = evidence.pathfinder.routes.find(r => r.nodes.some(n => n.name === 'Resignación'))
  const enriched = b.edges.find(e => e.provenance === 'interactive_latent_explorer' && e.weight === 0.7138)
  const assetName = n => n.type === 'Text' ? 'texto' : n.name.replace('.mp3', '').replace(' - ', ' — ')
  return <Frame title="Mismos extremos. Cinco caminos distintos." label="PATHFINDER / CASO REAL">
    <Text y={199} size={67} className="pub-display">Mismos extremos.</Text>
    <Text y={284} size={76} className="pub-serif" fill={violet}>Cinco caminos distintos.</Text>
    <Text y={343} size={27}>{evidence.pathfinder.uniqueCount} secuencias guardadas · caso real</Text>
    <Text x={540} y={422} size={40} fontWeight="700" textAnchor="middle" fill={violet}>{a.nodes[0].name.toUpperCase()}</Text>
    <path d="M540 444C540 469 110 455 110 492V972C110 995 540 987 540 1017M540 444C540 469 579 455 579 492V972C579 995 540 987 540 1017" fill="none" stroke="#b8afcd" strokeWidth="3" />
    <Text x={147} y={492} size={23} fill="#6a645e">RUTA A · {a.hops} SALTOS</Text>
    <Text x={616} y={492} size={23} fill="#6a645e">RUTA B · {b.hops} SALTOS</Text>
    {[a,b].map((r, column) => r.nodes.slice(1,-1).map((node, i) => {
      const x = column ? 579 : 110, y = 539 + i * 69
      return <g key={`${r.id}-${node.id}`}><Icon x={x} y={y-8} type={node.type}/><Text x={x+28} y={y} size={node.type === 'Concept' ? 30 : 24} fontWeight={node.type === 'Concept' ? 700 : 500} fill={node.type === 'Concept' ? violet : orange}>{node.type === 'Concept' ? node.name : assetName(node)}</Text></g>
    }))}
    <path d="M579 687V724" stroke={orange} strokeWidth="5" strokeDasharray="5 5" />
    <Text x={616} y={714} size={19} fill={orange}>{enriched.weight} · relación enriquecida</Text>
    <Text x={540} y={1058} size={38} textAnchor="middle" fontWeight="700" fill={violet}>{a.nodes.at(-1).name}</Text>
    <g><Icon x={86} y={1108} type="Concept"/><Text x={110} y={1116} size={21}>Concepto</Text><Icon x={271} y={1108} type="Text"/><Text x={295} y={1116} size={21}>Texto</Text><Icon x={419} y={1108} type="Audio"/><Text x={443} y={1116} size={21}>Audio</Text><Text x={1008} y={1116} textAnchor="end" size={20} fill="#6a645e">Dos de las cinco rutas guardadas</Text></g>
    <Text y={1172} size={32}>Encontrar B no es lo único interesante.</Text>
    <Text y={1216} size={32} fontWeight="700">También importa por dónde llegamos.</Text>
  </Frame>
}

function Serendipity() {
  const nodes = evidence.serendipity.nodes
  return <Frame title="¿Qué tienen que ver Khayyam y Ramanujan?" label="SERENDIPITY / CASO REAL">
    <Text y={192} size={61} className="pub-display">¿Qué tienen que ver</Text>
    <Text y={280} size={90} className="pub-serif" fill={orange}>Khayyam y Ramanujan?</Text>
    <Text y={340} size={29}>Serendipity encontró un puente a través de la intuición.</Text>
    <path d="M160 431V989" stroke="#b8afcd" strokeWidth="3" />
    {nodes.slice(1).map((n,i) => <g key={i}><path d={`M160 ${470+i*137}v37m-5-5 5 5 5-5`} fill="none" stroke={violet} strokeWidth="2"/><Text x={113} y={497+i*137} size={24} textAnchor="end" fill="#6a645e">{n.weight.toFixed(2).replace('0.','.')}</Text></g>)}
    <Icon x={160} y={435} type="Concept" scale={1.5}/><Text x={213} y={448} size={41} fontWeight="700" fill={violet}>{nodes[0].name}</Text>
    <Icon x={160} y={572} type="Text" scale={1.6}/><Text x={213} y={540} size={21} fill={orange} letterSpacing="2">ARCHIVO TEXTUAL / RUBAIYAT</Text><Text x={213} y={596} size={61} className="pub-serif" fill={orange}>Omar Khayyam</Text>
    <rect x="200" y="656" width="800" height="114" fill={violet}/><Icon x={160} y={709} type="Concept" scale={1.5}/><Text x={227} y={738} size={83} className="pub-serif" fill={paper}>{nodes[2].name}</Text><Text x={965} y={730} size={50} fill={paper} textAnchor="end">↘</Text>
    <Icon x={160} y={846} type="Image" scale={1.6}/><Text x={213} y={817} size={21} fill={orange} letterSpacing="2">ARCHIVO VISUAL / IMAGEN</Text><Text x={213} y={872} size={61} className="pub-serif" fill={orange}>Srinivasa Ramanujan</Text>
    <Icon x={160} y={983} type="Concept" scale={1.5}/><Text x={213} y={996} size={41} fontWeight="700" fill={violet}>{nodes[4].name}</Text>
    <Text y={1064} size={20} fill="#6a645e">Nombres de los autores: contexto de la explicación guardada.</Text>
    <Text y={1134} size={32}>Una asociación inesperada no es una conclusión.</Text>
    <Text y={1179} size={32} fontWeight="700">Es una posibilidad para investigar.</Text>
    <Text y={1220} size={23} fill={violet} letterSpacing="1.5">analogía · metáfora · pensamiento lateral</Text>
  </Frame>
}

export default function PublicationLaunch() {
  const slug = window.location.pathname.slice(base.length).replace(/^\/|\/$/g, '')
  const piece = pieces.find(p => p.id === slug) || pieces[0]
  const clean = new URLSearchParams(window.location.search).get('export') === '1'
  const Piece = piece.component
  return <main className={`publication-page${clean ? ' publication-export' : ''}`}>
    {!clean && <header className="publication-tools"><a href="/">← Volver al atlas</a><div><p>Publication Assets</p><h1>Fuzzy GraphRAG · Public launch</h1></div><nav aria-label="Piezas de publicación">{pieces.map((p,i) => <a key={p.id} href={`${base}/${p.id}`} aria-current={p.id === piece.id ? 'page' : undefined}>{String(i+1).padStart(2,'0')} · {p.title}</a>)}</nav><div className="publication-actions"><a href={`${base}/${piece.id}?export=1`}>Abrir frame limpio ↗</a><a href={`/social/fuzzy-graphrag-${piece.id}.png`} download>Descargar PNG ↓</a><span>1080 × 1350 px · 4:5</span></div></header>}
    <Piece />
    {!clean && <details className="publication-provenance"><summary>Procedencia y criterio editorial</summary><p>Las piezas 2 y 3 usan una transcripción verificable de los exports originales. La pieza 1 es un esquema conceptual con pesos ilustrativos. A y B identifican las dos rutas seleccionadas, no una nueva clasificación.</p><p>Pathfinder: {evidence.pathfinder.export}; rutas 1 y 3. El tramo Metallica → Resignación procede de interactive_latent_explorer.</p><p>Serendipity: {evidence.serendipity.export}. Los nombres de Khayyam y Ramanujan proceden de la explicación guardada; no son nodos nuevos. El recorrido conserva los cinco nodos y cuatro pesos del export.</p><p>Los pesos son grados de asociación; las rutas sugieren lecturas explorables, no hechos demostrados.</p></details>}
  </main>
}
