import { SiPostgresql } from 'react-icons/si'
import { LuTable, LuUsers, LuLayoutDashboard, LuTags, LuBellRing, LuActivity, LuDatabase } from 'react-icons/lu'

export const nodes = [
  {
    id: 'users',
    type: 'base',
    position: { x: 100, y: 600 },
    data: {
      label: 'users',
      sublabel: 'Tabla Relacional',
      type: 'database',
      icon: LuUsers,
      status: 'idle',
      handles: { sourceRight: true },
      metrics: [
        { key: 'id (PK)', value: 'int' },
        { key: 'email', value: 'string' },
        { key: 'role', value: 'ADMIN/OP' },
        { key: 'is_active', value: 'boolean' }
      ]
    }
  },
  {
    id: 'screens',
    type: 'base',
    position: { x: 100, y: 100 },
    data: {
      label: 'screens',
      sublabel: 'Tabla Relacional',
      type: 'database',
      icon: LuLayoutDashboard,
      status: 'idle',
      handles: {},
      metrics: [
        { key: 'id (PK)', value: 'int' },
        { key: 'name', value: 'string' },
        { key: 'slug', value: 'string' },
        { key: 'layout_data', value: 'jsonb' }
      ]
    }
  },
  {
    id: 'tags',
    type: 'base',
    position: { x: 450, y: 100 },
    data: {
      label: 'tags',
      sublabel: 'Tabla Relacional',
      type: 'database', // Purple
      icon: LuTags,
      status: 'idle',
      handles: { sourceRight: true, sourceBottom: true },
      metrics: [
        { key: 'id (PK)', value: 'int' },
        { key: 'name', value: 'string' },
        { key: 'protocol', value: 'mqtt/opc' },
        { key: 'mqtt_topic', value: 'string' }
      ]
    }
  },
  {
    id: 'alarm_definitions',
    type: 'base',
    position: { x: 450, y: 350 },
    data: {
      label: 'alarm_definitions',
      sublabel: 'Tabla Relacional',
      type: 'database',
      icon: LuBellRing,
      status: 'idle',
      handles: { targetTop: true, sourceBottom: true },
      metrics: [
        { key: 'id (PK)', value: 'int' },
        { key: 'tag_id (FK)', value: 'int' },
        { key: 'severity', value: 'int' },
        { key: 'limits', value: 'jsonb' }
      ]
    }
  },
  {
    id: 'alarm_events',
    type: 'base',
    position: { x: 450, y: 600 },
    data: {
      label: 'alarm_events',
      sublabel: 'Tabla Relacional',
      type: 'database',
      icon: LuTable,
      status: 'idle',
      handles: { targetTop: true, targetLeft: true },
      metrics: [
        { key: 'id (PK)', value: 'int' },
        { key: 'def_id (FK)', value: 'int' },
        { key: 'status', value: 'string' },
        { key: 'ack_user_id', value: 'int (FK)' }
      ]
    }
  },
  {
    id: 'metrics',
    type: 'base',
    position: { x: 850, y: 100 },
    data: {
      label: 'metrics',
      sublabel: 'TimescaleDB Hypertable',
      type: 'database',
      tag: 'HYPERTABLE',
      icon: SiPostgresql,
      status: 'online', // online because it's actively ingesting
      handles: { targetLeft: true },
      metrics: [
        { key: 'time (PK)', value: 'datetime' },
        { key: 'tag_id (PK)', value: 'int' },
        { key: 'value', value: 'float' },
        { key: 'quality', value: 'int' }
      ]
    }
  }
]

const ls = { fill: '#64748b', fontFamily: 'monospace', fontSize: 10 }
const lb = { fill: '#fff', fillOpacity: 0.9 }

export const edges = [
  {
    id: 'e-tags-metrics',
    source: 'tags',
    sourceHandle: 'sr',
    target: 'metrics',
    targetHandle: 'tl',
    label: 'Genera telemetría (1:N)',
    type: 'smoothstep',
    style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '4 4' }, // Blue, dashed for 1:N
    animated: true,
    labelStyle: ls,
    labelBgStyle: lb
  },
  {
    id: 'e-tags-alarmdef',
    source: 'tags',
    sourceHandle: 'sb',
    target: 'alarm_definitions',
    targetHandle: 'tt',
    label: 'Define alarmas (1:1)',
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2 }, // Purple, solid for 1:1
    labelStyle: ls,
    labelBgStyle: lb
  },
  {
    id: 'e-alarmdef-alarmevt',
    source: 'alarm_definitions',
    sourceHandle: 'sb',
    target: 'alarm_events',
    targetHandle: 'tt',
    label: 'Dispara eventos (1:N)',
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '4 4' },
    labelStyle: ls,
    labelBgStyle: lb
  },
  {
    id: 'e-users-alarmevt',
    source: 'users',
    sourceHandle: 'sr',
    target: 'alarm_events',
    targetHandle: 'tl',
    label: 'Reconoce [Ack] (1:N)',
    type: 'smoothstep',
    style: { stroke: '#f43f5e', strokeWidth: 2, strokeDasharray: '4 4' }, // Rose color
    labelStyle: ls,
    labelBgStyle: lb
  }
]
