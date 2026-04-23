import { SiFastapi, SiReact } from 'react-icons/si'
import { LuRadio, LuCpu, LuWifi } from 'react-icons/lu'

export const nodes = [
  { 
    id: 'gsm', 
    type: 'base', 
    position: { x: 50, y: 150 }, 
    data: { 
      label: 'Equipos GSM / PLC', 
      sublabel: 'Capa mTLS - Puerto 8884', 
      type: 'field', 
      icon: LuCpu, 
      status: 'online', 
      handles: { sourceRight: true }, 
      metrics: [{ key: 'Auth', value: '.crt/.key' }, { key: 'Sec', value: 'mTLS' }] 
    } 
  },
  { 
    id: 'backend', 
    type: 'base', 
    position: { x: 50, y: 450 }, 
    data: { 
      label: 'Backend Python', 
      sublabel: 'Capa mTLS - Puerto 8884', 
      type: 'backend', 
      icon: SiFastapi, 
      status: 'online', 
      handles: { sourceRight: true }, 
      metrics: [{ key: 'Auth', value: '.crt/.key' }, { key: 'Sec', value: 'mTLS' }] 
    } 
  },
  { 
    id: 'mosquitto', 
    type: 'base', 
    position: { x: 450, y: 300 }, 
    data: { 
      label: 'Mosquitto Broker', 
      sublabel: 'scada.conf', 
      type: 'broker', 
      icon: LuRadio, 
      status: 'online', 
      handles: { targetLeft: true, targetRight: true }, 
      metrics: [{ key: 'Ports', value: '3' }, { key: 'Listeners', value: 'Active' }] 
    } 
  },
  { 
    id: 'front', 
    type: 'base', 
    position: { x: 850, y: 150 }, 
    data: { 
      label: 'Dashboard React', 
      sublabel: 'Capa TLS - Puerto 8883', 
      type: 'frontend', 
      icon: SiReact, 
      status: 'online', 
      handles: { sourceLeft: true }, 
      metrics: [{ key: 'Auth', value: 'User/Pass' }, { key: 'Sec', value: 'TLS w/ LE' }] 
    } 
  },
  { 
    id: 'otros', 
    type: 'base', 
    position: { x: 850, y: 450 }, 
    data: { 
      label: 'Dispositivos IoT', 
      sublabel: 'Capa Directa - Puerto 1883', 
      type: 'field', 
      icon: LuWifi, 
      status: 'warning', 
      handles: { sourceLeft: true }, 
      metrics: [{ key: 'Auth', value: 'None' }, { key: 'Sec', value: 'Plaintext' }] 
    } 
  },
]

const ls = { fill: '#64748b', fontFamily: 'monospace', fontSize: 10 }
const lb = { fill: '#fff', fillOpacity: 0.9 }

export const edges = [
  { 
    id: 'e-gsm-broker', 
    source: 'gsm', 
    sourceHandle: 'sr', 
    target: 'mosquitto', 
    targetHandle: 'tl', 
    label: 'Posee Certificado .crt/.key', 
    type: 'smoothstep', 
    style: { stroke: '#f97316', strokeWidth: 2 }, 
    animated: true, 
    labelStyle: ls, 
    labelBgStyle: lb 
  },
  { 
    id: 'e-backend-broker', 
    source: 'backend', 
    sourceHandle: 'sr', 
    target: 'mosquitto', 
    targetHandle: 'tl', 
    label: 'Posee Certificado .crt/.key', 
    type: 'smoothstep', 
    style: { stroke: '#f97316', strokeWidth: 2 }, 
    animated: true, 
    labelStyle: ls, 
    labelBgStyle: lb 
  },
  { 
    id: 'e-front-broker', 
    source: 'front', 
    sourceHandle: 'sl', 
    target: 'mosquitto', 
    targetHandle: 'tr', 
    label: "Solo User/Pass (Let's Encrypt)", 
    type: 'smoothstep', 
    style: { stroke: '#06b6d4', strokeWidth: 2 }, 
    animated: true, 
    labelStyle: ls, 
    labelBgStyle: lb 
  },
  { 
    id: 'e-otros-broker', 
    source: 'otros', 
    sourceHandle: 'sl', 
    target: 'mosquitto', 
    targetHandle: 'tr', 
    label: 'Texto Plano / Sin Cert', 
    type: 'smoothstep', 
    style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 5' }, 
    labelStyle: ls, 
    labelBgStyle: lb 
  },
]
