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



// ═══════════════════════════════════════════════════════════════════════════
// HELPERS DE ESTILO POR TIPO DE CONEXIÓN
// ═══════════════════════════════════════════════════════════════════════════
const labelStyle = { fill: '#64748b', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }
const labelBgStyle = { fill: '#ffffff', fillOpacity: 0.9 }

const edgeField = (extra = {}) => ({ type: 'smoothstep', labelStyle, labelBgStyle, style: { stroke: '#10b981', strokeWidth: 2 }, ...extra })
const edgeMqtt = (extra = {}) => ({ type: 'smoothstep', labelStyle, labelBgStyle, style: { stroke: '#f59e0b', strokeWidth: 2.5 }, animated: true, ...extra })
const edgeInternal = (extra = {}) => ({ type: 'smoothstep', labelStyle, labelBgStyle, style: { stroke: '#3b82f6', strokeWidth: 2 }, ...extra })
const edgeDb = (extra = {}) => ({ type: 'smoothstep', labelStyle, labelBgStyle, style: { stroke: '#8b5cf6', strokeWidth: 1.8, strokeDasharray: '6 3' }, ...extra })
const edgeHttp = (extra = {}) => ({ type: 'smoothstep', labelStyle, labelBgStyle, style: { stroke: '#f43f5e', strokeWidth: 2 }, ...extra })
const edgeBidi = (extra = {}) => ({ type: 'smoothstep', labelStyle, labelBgStyle, style: { stroke: '#f43f5e', strokeWidth: 1.8 }, markerEnd: { type: 'arrowclosed' }, markerStart: { type: 'arrowclosed' }, ...extra })

// ═══════════════════════════════════════════════════════════════════════════
// EDGES — replicando todas las conexiones del flowchart
// ═══════════════════════════════════════════════════════════════════════════

export const initialNodes = [
  // ── CAPA DE CAMPO (Fuentes de Datos) ───────────────────────────────────
  {
    id: 'dev_modbus',
    type: 'base',
    position: { x: 200, y: 80 },
    data: {
      label: 'PLC / RTU',
      sublabel: 'Modbus TCP/RTU',
      type: 'field',
      icon: LuCpu,
      status: 'online',
      handles: { sourceBottom: true },
      metrics: [{ key: 'Protocol', value: 'Modbus' }, { key: 'Polling', value: '100 ms' }],
    },
  },
  // {
  //   id: 'dev_opc',
  //   type: 'base',
  //   position: { x: 380, y: 80 },
  //   data: {
  //     label: 'DCS / PLC Avanzado',
  //     sublabel: 'OPC UA / DA',
  //     type: 'field',
  //     icon: LuServer,
  //     status: 'online',
  //     handles: { sourceBottom: true },
  //     metrics: [{ key: 'Protocol', value: 'OPC UA' }, { key: 'Polling', value: '500 ms' }],
  //   },
  // },
  {
    id: 'dev_iot',
    type: 'base',
    position: { x: 740, y: 80 },
    data: {
      label: 'Sensor IoT / ESP8266',
      sublabel: 'Telemetría Cruda',
      type: 'field',
      icon: LuWifi,
      status: 'online',
      handles: { sourceBottom: true },
      metrics: [{ key: 'Transport', value: 'MQTT' }, { key: 'QoS', value: '0' }],
    },
  },

  // ── CAPA DE BACKEND (El Cerebro) ──────────────────────────────────────
  {
    id: 'api',
    type: 'base',
    position: { x: 350, y: 600 },
    data: {
      label: 'API REST',
      sublabel: 'FastAPI — HTTP',
      type: 'backend',
      icon: SiFastapi,
      status: 'online',
      handles: { targetRight: true, sourceLeft: true },
      metrics: [{ key: 'Latency', value: '12 ms' }, { key: 'Req/s', value: '340' }],
    },
  },
  {
    id: 'edge_gateway',
    type: 'base',
    position: { x: 180, y: 340 },
    data: {
      label: 'Edge Gateway',
      sublabel: 'Lazo Central (ProtocolFactory)',
      type: 'backend',
      icon: LuActivity,
      status: 'online',
      handles: { targetTop: true, targetRight: true, sourceBottom: true, sourceRight: true },
      metrics: [{ key: 'Normalización', value: 'JSON' }, { key: 'Tags/s', value: '420' }],
    },
  },

  // ── CAPA DE MENSAJERÍA ────────────────────────────────────────────────
  {
    id: 'broker',
    type: 'base',
    position: { x: 740, y: 340 },
    data: {
      label: 'MQTT Broker',
      sublabel: 'Mosquitto (mTLS / WSS)',
      type: 'broker',
      icon: LuRadio,
      status: 'online',
      handles: { targetTop: true, targetLeft: true, sourceLeft: true, sourceBottom: true },
      metrics: [{ key: 'Clients', value: '14' }, { key: 'QoS max', value: '2' }],
    },
  },

  // ── CAPA DE PERSISTENCIA ──────────────────────────────────────────────
  {
    id: 'tsdb',
    type: 'base',
    position: { x: 40, y: 600 },
    data: {
      label: 'TimescaleDB',
      sublabel: 'PostgreSQL · Series de Tiempo',
      type: 'database',
      icon: SiPostgresql,
      status: 'online',
      handles: { targetTop: true, targetRight: true },
      metrics: [{ key: 'Rows/s', value: '1.2 k' }, { key: 'Retention', value: '90 d' }],
    },
  },

  // ── CAPA DE FRONTEND ──────────────────────────────────────────────────
  {
    id: 'store',
    type: 'base',
    position: { x: 740, y: 600 },
    data: {
      label: 'Zustand Store',
      sublabel: 'Estado Global Reactivo',
      type: 'frontend',
      icon: LuLayers,
      status: 'online',
      handles: { targetTop: true, sourceLeft: true, sourceRight: true },
      metrics: [{ key: 'Slices', value: '5' }, { key: 'Subs', value: '18' }],
    },
  },
  {
    id: 'ui',
    type: 'base',
    position: { x: 1080, y: 600 },
    data: {
      label: 'HMI Web',
      sublabel: 'React Flow · SCADA',
      type: 'frontend',
      icon: SiReact,
      status: 'online',
      handles: { targetLeft: true },
      metrics: [{ key: 'FPS', value: '60' }, { key: 'Norma', value: 'ISA-101' }],
    },
  },
];


export const initialEdges = [
  // ── 1. Adquisición hacia el Gateway (Inputs) ──────────────────────────
  {
    id: 'e-modbus-gateway',
    source: 'dev_modbus', sourceHandle: 'sb',
    target: 'edge_gateway', targetHandle: 'tt',
    label: 'Modbus TCP/RTU\n(Polling Activo)',
    ...edgeField(),
  },
  {
    id: 'e-opc-gateway',
    source: 'dev_opc', sourceHandle: 'sb',
    target: 'edge_gateway', targetHandle: 'tt',
    label: 'OPC UA\n(Polling Activo)',
    ...edgeField(),
  },
  {
    id: 'e-iot-broker',
    source: 'dev_iot', sourceHandle: 'sb',
    target: 'broker', targetHandle: 'tt',
    label: 'Publica Data Cruda',
    ...edgeMqtt(),
  },
  {
    id: 'e-broker-gateway',
    source: 'broker', sourceHandle: 'sl',
    target: 'edge_gateway', targetHandle: 'tr',
    label: 'Suscribe a IoT\n(Listener Asíncrono)',
    ...edgeMqtt(),
  },

  // ── 2. Distribución desde el Gateway (Outputs) ────────────────────────
  {
    id: 'e-gateway-tsdb',
    source: 'edge_gateway', sourceHandle: 'sb',
    target: 'tsdb', targetHandle: 'tt',
    label: 'Inserta JSON Normalizado\n(Persistencia Histórica)',
    ...edgeDb(),
  },
  {
    id: 'e-gateway-broker',
    source: 'edge_gateway', sourceHandle: 'sr',
    target: 'broker', targetHandle: 'tl',
    label: 'Publica JSON Normalizado\n(Tiempo Real)',
    ...edgeInternal(),
  },

  // ── 3. Consultas Históricas (API y TSDB) ──────────────────────────────
  {
    id: 'e-api-tsdb',
    source: 'api', sourceHandle: 'sl',
    target: 'tsdb', targetHandle: 'tr',
    label: 'Consulta SQL\n(Históricos)',
    ...edgeDb(),
  },
  {
    id: 'e-store-api',
    source: 'store', sourceHandle: 'sl',
    target: 'api', targetHandle: 'tr',
    label: 'HTTP GET\n(Históricos / Auth)',
    ...edgeHttp(),
  },

  // ── 4. Distribución al Frontend (Tiempo Real y UI) ────────────────────
  {
    id: 'e-broker-store',
    source: 'broker', sourceHandle: 'sb',
    target: 'store', targetHandle: 'tt',
    label: 'WebSockets RX\n(Mutación de Estado)',
    ...edgeMqtt(),
  },
  {
    id: 'e-store-ui',
    source: 'store', sourceHandle: 'sr',
    target: 'ui', targetHandle: 'tl',
    label: 'Renderiza\n(Norma ISA-101)',
    ...edgeBidi(),
  },
];