import { SiPostgresql } from 'react-icons/si'
import { LuTable, LuUsers, LuLayoutDashboard, LuTags, LuBellRing, LuKey } from 'react-icons/lu'

export const nodes = [
  {
    id: 'users',
    type: 'base',
    position: { x: 50, y: 400 },
    data: {
      label: 'users',
      sublabel: 'Tabla Relacional',
      type: 'database',
      icon: LuUsers,
      status: 'idle',
      handles: { sourceTop: true, sourceRight: true, sourceBottom: true },
      metrics: [
        { key: 'id (PK)', value: 'int' },
        { key: 'email', value: 'string' },
        { key: 'username', value: 'string' },
        { key: 'role', value: 'string' },
        { key: 'hashed_pwd', value: 'string' },
        { key: 'is_active', value: 'boolean' }
      ]
    }
  },
  {
    id: 'screens',
    type: 'base',
    position: { x: 50, y: 100 },
    data: {
      label: 'screens',
      sublabel: 'Tabla Relacional',
      type: 'database',
      icon: LuLayoutDashboard,
      status: 'idle',
      handles: { targetBottom: true, sourceRight: true },
      metrics: [
        { key: 'id (PK)', value: 'int' },
        { key: 'name', value: 'string' },
        { key: 'slug', value: 'string' },
        { key: 'layout_data', value: 'jsonb' },
        { key: 'is_home', value: 'boolean' },
        { key: 'owner_id (FK)', value: 'int' }
      ]
    }
  },
  {
    id: 'screen_access',
    type: 'base',
    position: { x: 450, y: 100 },
    data: {
      label: 'screen_access',
      sublabel: 'Tabla Relacional',
      type: 'database',
      icon: LuKey,
      status: 'idle',
      handles: { targetLeft: true },
      metrics: [
        { key: 'id (PK)', value: 'int' },
        { key: 'screen_id (FK)', value: 'int' },
        { key: 'user_id (FK)', value: 'int' },
        { key: 'role', value: 'string' }
      ]
    }
  },
  {
    id: 'tags',
    type: 'base',
    position: { x: 450, y: 400 },
    data: {
      label: 'tags',
      sublabel: 'Tabla Relacional',
      type: 'database',
      icon: LuTags,
      status: 'idle',
      handles: { targetLeft: true, sourceRight: true, sourceTop: true },
      metrics: [
        { key: 'id (PK)', value: 'int' },
        { key: 'name', value: 'string' },
        { key: 'protocol', value: 'string' },
        { key: 'config', value: 'jsonb' },
        { key: 'topic', value: 'string' },
        { key: 'data_type', value: 'string' },
        { key: 'access_mode', value: 'string' },
        { key: 'scan_rate', value: 'int' },
        { key: 'owner_id (FK)', value: 'int' }
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
      status: 'online',
      handles: { targetLeft: true },
      metrics: [
        { key: 'time (PK)', value: 'timestamp' },
        { key: 'tag_id (PK/FK)', value: 'int' },
        { key: 'value', value: 'float' },
        { key: 'quality', value: 'int' }
      ]
    }
  },
  {
    id: 'alarm_definitions',
    type: 'base',
    position: { x: 850, y: 400 },
    data: {
      label: 'alarm_definitions',
      sublabel: 'Tabla Relacional',
      type: 'database',
      icon: LuBellRing,
      status: 'idle',
      handles: { targetLeft: true, sourceBottom: true },
      metrics: [
        { key: 'id (PK)', value: 'int' },
        { key: 'tag_id (FK)', value: 'int' },
        { key: 'severity', value: 'int' },
        { key: 'message', value: 'string' },
        { key: 'limits', value: 'jsonb' },
        { key: 'deadband', value: 'float' },
        { key: 'is_active', value: 'boolean' }
      ]
    }
  },
  {
    id: 'alarm_events',
    type: 'base',
    position: { x: 850, y: 700 },
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
        { key: 'start_time', value: 'timestamp' },
        { key: 'end_time', value: 'timestamp' },
        { key: 'ack_time', value: 'timestamp' },
        { key: 'trigger_val', value: 'float' },
        { key: 'status', value: 'string' },
        { key: 'ack_user_id', value: 'int' }
      ]
    }
  }
]

const ls = { fill: '#64748b', fontFamily: 'monospace', fontSize: 10 }
const lb = { fill: '#fff', fillOpacity: 0.9 }

export const edges = [
  // USERS relations
  {
    id: 'e-users-tags',
    source: 'users',
    sourceHandle: 'sr',
    target: 'tags',
    targetHandle: 'tl',
    label: 'owns (1:N)',
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '4 4' },
    labelStyle: ls,
    labelBgStyle: lb
  },
  {
    id: 'e-users-screens',
    source: 'users',
    sourceHandle: 'st',
    target: 'screens',
    targetHandle: 'tb',
    label: 'owns (1:N)',
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '4 4' },
    labelStyle: ls,
    labelBgStyle: lb
  },
  {
    id: 'e-users-screen-access',
    source: 'users',
    sourceHandle: 'sr',
    target: 'screen_access',
    targetHandle: 'tl',
    label: 'granted_to (1:N)',
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '4 4' },
    labelStyle: ls,
    labelBgStyle: lb
  },
  {
    id: 'e-users-alarm-events',
    source: 'users',
    sourceHandle: 'sb',
    target: 'alarm_events',
    targetHandle: 'tl',
    label: 'acknowledges (1:N)',
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '4 4' },
    labelStyle: ls,
    labelBgStyle: lb
  },
  // TAGS relations
  {
    id: 'e-tags-metrics',
    source: 'tags',
    sourceHandle: 'st',
    target: 'metrics',
    targetHandle: 'tl',
    label: 'records (1:N)',
    type: 'smoothstep',
    style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '4 4' },
    animated: true,
    labelStyle: ls,
    labelBgStyle: lb
  },
  {
    id: 'e-tags-alarmdef',
    source: 'tags',
    sourceHandle: 'sr',
    target: 'alarm_definitions',
    targetHandle: 'tl',
    label: 'has_configuration (1:1)',
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
    labelStyle: ls,
    labelBgStyle: lb
  },
  // SCREENS relations
  {
    id: 'e-screens-screen-access',
    source: 'screens',
    sourceHandle: 'sr',
    target: 'screen_access',
    targetHandle: 'tl',
    label: 'shared_via (1:N)',
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '4 4' },
    labelStyle: ls,
    labelBgStyle: lb
  },
  // ALARM_DEFINITIONS relations
  {
    id: 'e-alarmdef-alarmevt',
    source: 'alarm_definitions',
    sourceHandle: 'sb',
    target: 'alarm_events',
    targetHandle: 'tt',
    label: 'triggers (1:N)',
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '4 4' },
    labelStyle: ls,
    labelBgStyle: lb
  }
]
