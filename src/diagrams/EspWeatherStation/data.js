import { SiGrafana, SiInfluxdb } from 'react-icons/si'
import { LuCpu, LuWifi, LuRadio, LuThermometer, LuDroplets, LuWorkflow } from 'react-icons/lu'

// import localLogo from '../../assets/logo.png'  // ejemplo de imagen local

const H = { targetLeft: true, sourceRight: true }

export const nodes = [
  { id: 'dht22',   type: 'base', position: { x: 40,  y: 60  }, data: { label: 'DHT22',         sublabel: 'Temperatura & Humedad', type: 'field',    icon: LuThermometer, status: 'online', handles: { sourceRight: true },        metrics: [{ key: 'Out', value: 'GPIO4' }, { key: 'Rate', value: '2 s' }] } },
  { id: 'bme280',  type: 'base', position: { x: 40,  y: 300 }, data: { label: 'BME280',         sublabel: 'Presión / Humedad / Temp', type: 'field',  icon: LuDroplets,    status: 'online', handles: { sourceRight: true },        metrics: [{ key: 'Bus', value: 'I²C' }, { key: 'Addr', value: '0x76' }] } },
  { id: 'esp8266', type: 'base', position: { x: 300, y: 180 }, data: { label: 'ESP8266',        sublabel: 'NodeMCU v3',               type: 'field',  icon: LuCpu,         status: 'online', handles: { targetLeft: true, sourceRight: true }, metrics: [{ key: 'Flash', value: '4 MB' }, { key: 'MHz', value: '80' }] } },
  { id: 'wifi',    type: 'base', position: { x: 560, y: 180 }, data: { label: 'WiFi Router',    sublabel: '802.11 b/g/n',             type: 'broker', icon: LuWifi,        status: 'online', handles: H,                            metrics: [{ key: 'Band', value: '2.4 GHz' }, { key: 'Sec', value: 'WPA2' }] } },
  { id: 'broker',  type: 'base', position: { x: 820, y: 180 }, data: { label: 'MQTT Broker',    sublabel: 'Mosquitto',                 type: 'broker', icon: LuRadio,       status: 'online', handles: H,                            metrics: [{ key: 'QoS', value: '1' }, { key: 'Port', value: '1883' }] } },
  { id: 'nodered', type: 'base', position: { x: 1080,y: 180 }, data: { label: 'Node-RED',       sublabel: 'Flow Processor',           type: 'backend', icon: LuWorkflow,   status: 'online', handles: H,                            metrics: [{ key: 'Flows', value: '4' }, { key: 'Nodes', value: '22' }] } },
  { id: 'influx',  type: 'base', position: { x: 1340,y: 60  }, data: { label: 'InfluxDB',       sublabel: 'Time Series DB',           type: 'database', icon: SiInfluxdb,  status: 'online', handles: { targetLeft: true, sourceBottom: true }, metrics: [{ key: 'Series', value: '6' }, { key: 'Reten', value: '30d' }] } },
  { id: 'grafana', type: 'base', position: { x: 1340,y: 300 }, data: { label: 'Grafana',         sublabel: 'Monitoring Dashboard',     type: 'frontend', icon: SiGrafana,   status: 'online', handles: { targetLeft: true, targetTop: true },    metrics: [{ key: 'Panels', value: '8' }, { key: 'Alerts', value: '3' }] } },
]

const ls = { fill: '#64748b', fontFamily: 'monospace', fontSize: 10 }
const lb = { fill: '#fff', fillOpacity: 0.9 }

export const edges = [
  { id: 'e1', source: 'dht22',   sourceHandle: 'sr', target: 'esp8266', targetHandle: 'tl', label: 'GPIO (DHT)',  type: 'smoothstep', style: { stroke: '#10b981', strokeWidth: 2 }, labelStyle: ls, labelBgStyle: lb },
  { id: 'e2', source: 'bme280',  sourceHandle: 'sr', target: 'esp8266', targetHandle: 'tl', label: 'I²C (BME)',   type: 'smoothstep', style: { stroke: '#10b981', strokeWidth: 2 }, labelStyle: ls, labelBgStyle: lb },
  { id: 'e3', source: 'esp8266', sourceHandle: 'sr', target: 'wifi',    targetHandle: 'tl', label: 'WiFi',        type: 'smoothstep', style: { stroke: '#f59e0b', strokeWidth: 2 }, animated: true, labelStyle: ls, labelBgStyle: lb },
  { id: 'e4', source: 'wifi',    sourceHandle: 'sr', target: 'broker',  targetHandle: 'tl', label: 'TCP/IP',      type: 'smoothstep', style: { stroke: '#f59e0b', strokeWidth: 2 }, animated: true, labelStyle: ls, labelBgStyle: lb },
  { id: 'e5', source: 'broker',  sourceHandle: 'sr', target: 'nodered', targetHandle: 'tl', label: 'Subscribe',   type: 'smoothstep', style: { stroke: '#3b82f6', strokeWidth: 2 }, labelStyle: ls, labelBgStyle: lb },
  { id: 'e6', source: 'nodered', sourceHandle: 'sr', target: 'influx',  targetHandle: 'tl', label: 'Write points',type: 'smoothstep', style: { stroke: '#8b5cf6', strokeWidth: 1.8, strokeDasharray: '5 3' }, labelStyle: ls, labelBgStyle: lb },
  { id: 'e7', source: 'nodered', sourceHandle: 'sr', target: 'grafana', targetHandle: 'tl', label: 'Datasource',  type: 'smoothstep', style: { stroke: '#f43f5e', strokeWidth: 1.8 }, labelStyle: ls, labelBgStyle: lb },
  { id: 'e8', source: 'influx',  sourceHandle: 'sb', target: 'grafana', targetHandle: 'tt', label: 'Query',       type: 'smoothstep', style: { stroke: '#8b5cf6', strokeWidth: 1.8, strokeDasharray: '5 3' }, labelStyle: ls, labelBgStyle: lb },
]
