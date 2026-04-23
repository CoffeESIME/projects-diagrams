// ── Iconos de react-icons ──────────────────────────────────────────────────
import { SiFastapi, SiPostgresql, SiReact } from 'react-icons/si'
import {
  LuCpu,       // PLC / RTU legacy
  LuServer,    // DCS / PLC avanzado
  LuWifi,      // Sensor IoT / ESP8266
  LuRadio,     // MQTT Broker
  LuActivity,  // Protocol Handlers (pollers)
  LuMessageSquare, // Servicio MQTT (aiomqtt)
  LuLayers,    // Zustand store
} from 'react-icons/lu'

// ── Imagen local (ejemplo) ─────────────────────────────────────────────────
// import localLogo from '../assets/logo.png'
// Luego úsala en el nodo: iconImg: localLogo

// ═══════════════════════════════════════════════════════════════════════════
// POSICIONES — Layout TB que replica el flowchart Mermaid
//
//  Row 1 (y:80):  [dev_modbus]  [dev_opc]  [dev_mqtt]
//  Row 2 (y:340): [pollers] [mqtt_client] [broker] [api]
//  Row 3 (y:600): [ui]  [store]              [tsdb]
// ═══════════════════════════════════════════════════════════════════════════

export const initialNodes = [

  // ── CAPA DE CAMPO ─────────────────────────────────────────────────────
  {
    id: 'dev_modbus',
    type: 'base',
    position: { x: 40, y: 80 },
    data: {
      label   : 'PLC / RTU',
      sublabel: 'Legacy — Modbus TCP/RTU',
      type    : 'field',
      icon    : LuCpu,
      status  : 'online',
      handles : { sourceRight: true, sourceBottom: true },
      metrics : [{ key: 'Protocol', value: 'Modbus' }, { key: 'Polling', value: '100 ms' }],
    },
  },
  {
    id: 'dev_opc',
    type: 'base',
    position: { x: 380, y: 80 },
    data: {
      label   : 'DCS / PLC Avanzado',
      sublabel: 'OPC UA / DA',
      type    : 'field',
      icon    : LuServer,
      status  : 'online',
      handles : { sourceRight: true, sourceBottom: true },
      metrics : [{ key: 'Protocol', value: 'OPC UA' }, { key: 'Polling', value: '500 ms' }],
    },
  },
  {
    id: 'dev_mqtt',
    type: 'base',
    position: { x: 740, y: 80 },
    data: {
      label   : 'Sensor IoT / ESP8266',
      sublabel: 'Telemetría Ligera',
      type    : 'field',
      icon    : LuWifi,
      status  : 'online',
      handles : { sourceBottom: true },
      metrics : [{ key: 'Transport', value: 'MQTT' }, { key: 'QoS', value: '0' }],
    },
  },

  // ── CAPA DE MENSAJERÍA ────────────────────────────────────────────────
  {
    id: 'broker',
    type: 'base',
    position: { x: 740, y: 340 },
    data: {
      label   : 'MQTT Broker',
      sublabel: 'Mosquitto / EMQX',
      type    : 'broker',
      icon    : LuRadio,
      status  : 'online',
      // Necesita source+target en ambos lados por conexiones bidireccionales
      handles : { targetTop: true, targetRight: true, sourceLeft: true, sourceBottom: true },
      metrics : [{ key: 'Clients', value: '14' }, { key: 'QoS max', value: '2' }],
    },
  },

  // ── CAPA DE BACKEND ───────────────────────────────────────────────────
  {
    id: 'pollers',
    type: 'base',
    position: { x: 40, y: 340 },
    data: {
      label   : 'Protocol Handlers',
      sublabel: 'Adquisición de datos',
      type    : 'backend',
      icon    : LuActivity,
      status  : 'online',
      handles : { targetLeft: true, targetTop: true, sourceRight: true },
      metrics : [{ key: 'Drivers', value: '3' }, { key: 'Tags/s', value: '420' }],
    },
  },
  {
    id: 'mqtt_client',
    type: 'base',
    position: { x: 380, y: 340 },
    data: {
      label   : 'Servicio MQTT',
      sublabel: 'aiomqtt — async',
      type    : 'backend',
      icon    : LuMessageSquare,
      status  : 'online',
      // Recibe de pollers (left) y de broker (right); envía a broker (right) y a tsdb (bottom)
      handles : { targetLeft: true, targetRight: true, sourceRight: true, sourceBottom: true },
      metrics : [{ key: 'Topics', value: '8' }, { key: 'Msg/s', value: '320' }],
    },
  },
  {
    id: 'api',
    type: 'base',
    position: { x: 1080, y: 340 },
    data: {
      label   : 'API REST',
      sublabel: 'FastAPI — HTTP / WS',
      type    : 'backend',
      icon    : SiFastapi,
      status  : 'online',
      handles : { targetLeft: true, sourceBottom: true },
      metrics : [{ key: 'Latency', value: '12 ms' }, { key: 'Req/s', value: '340' }],
    },
  },

  // ── CAPA DE PERSISTENCIA ──────────────────────────────────────────────
  {
    id: 'tsdb',
    type: 'base',
    position: { x: 1080, y: 600 },
    data: {
      label   : 'TimescaleDB',
      sublabel: 'PostgreSQL · Timeseries',
      type    : 'database',
      icon    : SiPostgresql,
      status  : 'online',
      handles : { targetTop: true, targetLeft: true },
      metrics : [{ key: 'Rows/s', value: '1.2 k' }, { key: 'Retention', value: '90 d' }],
    },
  },

  // ── CAPA DE FRONTEND ──────────────────────────────────────────────────
  {
    id: 'ui',
    type: 'base',
    position: { x: 40, y: 600 },
    data: {
      label   : 'HMI / DataTrend',
      sublabel: 'Componentes React · SCADA',
      type    : 'frontend',
      icon    : SiReact,
      status  : 'online',
      handles : { sourceRight: true, targetLeft: true },
      metrics : [{ key: 'FPS', value: '60' }, { key: 'Charts', value: '12' }],
    },
  },
  {
    id: 'store',
    type: 'base',
    position: { x: 380, y: 600 },
    data: {
      label   : 'Zustand Store',
      sublabel: 'Gestor de Estado Global',
      type    : 'frontend',
      icon    : LuLayers,
      status  : 'online',
      // Recibe de ui (left), de broker (top); envía a api (right) y a broker (top)
      handles : { targetLeft: true, targetTop: true, sourceRight: true, sourceTop: true },
      metrics : [{ key: 'Slices', value: '5' }, { key: 'Subs', value: '18' }],
    },
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS DE ESTILO POR TIPO DE CONEXIÓN
// ═══════════════════════════════════════════════════════════════════════════
const labelStyle   = { fill: '#64748b', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }
const labelBgStyle = { fill: '#ffffff', fillOpacity: 0.9 }

const edgeField    = (extra = {}) => ({ type: 'smoothstep', labelStyle, labelBgStyle, style: { stroke: '#10b981', strokeWidth: 2   }, ...extra })
const edgeMqtt     = (extra = {}) => ({ type: 'smoothstep', labelStyle, labelBgStyle, style: { stroke: '#f59e0b', strokeWidth: 2.5 }, animated: true, ...extra })
const edgeInternal = (extra = {}) => ({ type: 'smoothstep', labelStyle, labelBgStyle, style: { stroke: '#3b82f6', strokeWidth: 2   }, ...extra })
const edgeDb       = (extra = {}) => ({ type: 'smoothstep', labelStyle, labelBgStyle, style: { stroke: '#8b5cf6', strokeWidth: 1.8, strokeDasharray: '6 3' }, ...extra })
const edgeHttp     = (extra = {}) => ({ type: 'smoothstep', labelStyle, labelBgStyle, style: { stroke: '#f43f5e', strokeWidth: 2   }, ...extra })
const edgeBidi     = (extra = {}) => ({ type: 'smoothstep', labelStyle, labelBgStyle, style: { stroke: '#f43f5e', strokeWidth: 1.8 }, markerEnd: { type: 'arrowclosed' }, markerStart: { type: 'arrowclosed' }, ...extra })

// ═══════════════════════════════════════════════════════════════════════════
// EDGES — replicando todas las conexiones del flowchart
// ═══════════════════════════════════════════════════════════════════════════
export const initialEdges = [

  // ── Campo → Backend ───────────────────────────────────────────────────
  {
    id: 'e-modbus-pollers',
    source: 'dev_modbus', sourceHandle: 'sr',
    target: 'pollers',    targetHandle: 'tl',
    label: 'Modbus TCP/RTU\n(Polling)',
    ...edgeField(),
  },
  {
    id: 'e-opc-pollers',
    source: 'dev_opc',    sourceHandle: 'sr',
    target: 'pollers',    targetHandle: 'tl',
    label: 'OPC UA / DA\n(Polling)',
    ...edgeField(),
  },

  // ── Campo → Broker ─────────────────────────────────────────────────────
  {
    id: 'e-mqtt-broker',
    source: 'dev_mqtt',   sourceHandle: 'sb',
    target: 'broker',     targetHandle: 'tt',
    label: 'Publica MQTT',
    ...edgeMqtt(),
  },

  // ── Backend interno ───────────────────────────────────────────────────
  {
    id: 'e-pollers-mqtt',
    source: 'pollers',    sourceHandle: 'sr',
    target: 'mqtt_client',targetHandle: 'tl',
    label: 'Estandariza',
    ...edgeInternal(),
  },

  // ── Broker ↔ Servicio MQTT ─────────────────────────────────────────────
  {
    id: 'e-broker-mqtt-client',
    source: 'broker',     sourceHandle: 'sl',
    target: 'mqtt_client',targetHandle: 'tr',
    label: 'Suscribe\n(Data cruda)',
    ...edgeMqtt(),
  },
  {
    id: 'e-mqtt-client-broker',
    source: 'mqtt_client',sourceHandle: 'sr',
    target: 'broker',     targetHandle: 'tr',
    label: 'Publica\n(Consolidada/Cmds)',
    ...edgeMqtt(),
  },

  // ── Backend → Persistencia ─────────────────────────────────────────────
  {
    id: 'e-mqtt-tsdb',
    source: 'mqtt_client',sourceHandle: 'sb',
    target: 'tsdb',       targetHandle: 'tl',
    label: 'Inserta telemetría',
    ...edgeDb(),
  },
  {
    id: 'e-api-tsdb',
    source: 'api',        sourceHandle: 'sb',
    target: 'tsdb',       targetHandle: 'tt',
    label: 'Consulta históricos',
    ...edgeDb(),
  },

  // ── Frontend ↔ Backend / Broker ────────────────────────────────────────
  {
    id: 'e-store-api',
    source: 'store',      sourceHandle: 'sr',
    target: 'api',        targetHandle: 'tl',
    label: 'HTTP GET/POST\n(Históricos, Auth)',
    ...edgeHttp(),
  },
  {
    id: 'e-broker-store',
    source: 'broker',     sourceHandle: 'sb',
    target: 'store',      targetHandle: 'tt',
    label: 'WebSocket RX\n(Telemetría RT)',
    ...edgeMqtt(),
  },
  {
    id: 'e-store-broker',
    source: 'store',      sourceHandle: 'st',
    target: 'broker',     targetHandle: 'tr',
    label: 'WebSocket TX\n(Comandos PLC/IoT)',
    ...edgeMqtt(),
  },

  // ── Frontend interno (bidireccional) ───────────────────────────────────
  {
    id: 'e-ui-store',
    source: 'ui',         sourceHandle: 'sr',
    target: 'store',      targetHandle: 'tl',
    label: 'Estado',
    ...edgeBidi(),
  },
]
