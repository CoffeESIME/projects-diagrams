import { LuCode, LuCpu, LuServer, LuFactory, LuWifi } from 'react-icons/lu'

export const nodes = [
  {
    id: 'industrial_driver',
    type: 'base',
    position: { x: 400, y: 100 },
    data: {
      label: 'IndustrialDriver',
      sublabel: '<<abstract>>',
      type: 'backend', // Azul para clases base
      tag: 'ABSTRACT CLASS',
      icon: LuCode,
      status: 'idle',
      handles: { targetBottom: true, targetLeft: true },
      metrics: [
        { key: '+ def', value: 'connect()*' },
        { key: '+ def', value: 'disconnect()*' },
        { key: '+ def', value: 'read_tag(t)*' },
        { key: '+ def', value: 'write_tag(t,v)*' }
      ]
    }
  },
  {
    id: 'modbus_driver',
    type: 'base',
    position: { x: 100, y: 400 },
    data: {
      label: 'ModbusDriver',
      sublabel: 'Implementación Modbus',
      type: 'field', // Verde para implementaciones concretas
      tag: 'CLASS',
      icon: LuCpu,
      status: 'idle',
      handles: { sourceTop: true },
      metrics: [
        { key: '+ def', value: 'connect()' },
        { key: '+ def', value: 'read_tag(t)' },
        { key: '+ def', value: 'write_tag(t,v)' }
      ]
    }
  },
  {
    id: 'opcua_driver',
    type: 'base',
    position: { x: 700, y: 400 },
    data: {
      label: 'OpcUaDriver',
      sublabel: 'Implementación OPC UA',
      type: 'field',
      tag: 'CLASS',
      icon: LuServer,
      status: 'idle',
      handles: { sourceTop: true },
      metrics: [
        { key: '+ def', value: 'connect()' },
        { key: '+ def', value: 'read_tag(t)' },
        { key: '+ def', value: 'write_tag(t,v)' }
      ]
    }
  },
  {
    id: 'mqtt_driver',
    type: 'base',
    position: { x: 400, y: 400 },
    data: {
      label: 'MqttDriver',
      sublabel: 'Implementación MQTT / aiomqtt',
      type: 'field',
      tag: 'CLASS',
      icon: LuWifi,
      status: 'idle',
      handles: { sourceTop: true },
      metrics: [
        { key: '+ def', value: 'connect()' },
        { key: '+ def', value: 'read_tag(t)' },
        { key: '+ def', value: 'write_tag(t,v)' }
      ]
    }
  },
  {
    id: 'protocol_factory',
    type: 'base',
    position: { x: 50, y: 100 },
    data: {
      label: 'ProtocolFactory',
      sublabel: 'Patrón Creacional',
      type: 'broker', // Naranja para factories
      tag: 'FACTORY',
      icon: LuFactory,
      status: 'idle',
      handles: { sourceRight: true },
      metrics: [
        { key: '+ def', value: 'get_driver(proto)' }
      ]
    }
  }
]

const ls = { fill: '#64748b', fontFamily: 'monospace', fontSize: 10 }
const lb = { fill: '#fff', fillOpacity: 0.9 }
const markerEnd = { type: 'arrowclosed', width: 20, height: 20, color: '#94a3b8' }

export const edges = [
  {
    id: 'e-modbus-industrial',
    source: 'modbus_driver',
    sourceHandle: 'st',
    target: 'industrial_driver',
    targetHandle: 'tb',
    label: 'Implementa',
    type: 'smoothstep',
    style: { stroke: '#94a3b8', strokeWidth: 2 }, // Gris para herencia
    markerEnd,
    labelStyle: ls,
    labelBgStyle: lb
  },
  {
    id: 'e-opcua-industrial',
    source: 'opcua_driver',
    sourceHandle: 'st',
    target: 'industrial_driver',
    targetHandle: 'tb',
    label: 'Implementa',
    type: 'smoothstep',
    style: { stroke: '#94a3b8', strokeWidth: 2 },
    markerEnd,
    labelStyle: ls,
    labelBgStyle: lb
  },
  {
    id: 'e-mqtt-industrial',
    source: 'mqtt_driver',
    sourceHandle: 'st',
    target: 'industrial_driver',
    targetHandle: 'tb',
    label: 'Implementa',
    type: 'smoothstep',
    style: { stroke: '#94a3b8', strokeWidth: 2 },
    markerEnd,
    labelStyle: ls,
    labelBgStyle: lb
  },
  {
    id: 'e-factory-industrial',
    source: 'protocol_factory',
    sourceHandle: 'sr',
    target: 'industrial_driver',
    targetHandle: 'tl',
    label: 'Instancia',
    type: 'smoothstep',
    style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5 5' }, // Dependencia dashed
    markerEnd: { ...markerEnd, color: '#f59e0b' },
    labelStyle: ls,
    labelBgStyle: lb
  }
]
