import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { motion } from 'framer-motion'

const TYPE_CONFIG = {
  field: {
    headerGrad : 'from-emerald-500 to-teal-600',
    border     : 'border-emerald-300',
    bg         : 'bg-emerald-50',
    ring       : 'ring-emerald-300',
    led        : 'bg-emerald-400 shadow-emerald-300',
    tag        : 'FIELD DEVICE',
  },
  broker: {
    headerGrad : 'from-amber-500 to-orange-500',
    border     : 'border-amber-300',
    bg         : 'bg-amber-50',
    ring       : 'ring-amber-300',
    led        : 'bg-amber-400 shadow-amber-300',
    tag        : 'MESSAGE BROKER',
  },
  backend: {
    headerGrad : 'from-blue-500 to-indigo-600',
    border     : 'border-blue-300',
    bg         : 'bg-blue-50',
    ring       : 'ring-blue-300',
    led        : 'bg-blue-400 shadow-blue-300',
    tag        : 'BACKEND',
  },
  database: {
    headerGrad : 'from-violet-500 to-purple-600',
    border     : 'border-violet-300',
    bg         : 'bg-violet-50',
    ring       : 'ring-violet-300',
    led        : 'bg-violet-400 shadow-violet-300',
    tag        : 'DATABASE',
  },
  frontend: {
    headerGrad : 'from-rose-500 to-pink-600',
    border     : 'border-rose-300',
    bg         : 'bg-rose-50',
    ring       : 'ring-rose-300',
    led        : 'bg-rose-400 shadow-rose-300',
    tag        : 'FRONTEND',
  },
}

const LED_STATUS = {
  online  : 'bg-emerald-400 shadow-md shadow-emerald-300/60',
  warning : 'bg-amber-400 shadow-md shadow-amber-300/60',
  offline : 'bg-red-500 shadow-md shadow-red-400/60',
  idle    : 'bg-slate-400',
}

const HANDLE_BASE = '!w-3 !h-3 !rounded-full !bg-white !border-2 !border-slate-400 hover:!border-blue-500 transition-colors'

/**
 * BaseNode — nodo reutilizable para React Flow.
 *
 * handles config (todos opcionales, default false):
 *   targetLeft   | targetRight | targetTop   | targetBottom
 *   sourceLeft   | sourceRight | sourceTop   | sourceBottom
 *
 * Para imagen local:
 *   import logo from '../assets/logo.png'
 *   data.iconImg = logo
 */
const BaseNode = memo(({ data, selected }) => {
  const {
    label    = 'Node',
    sublabel,
    type     = 'backend',
    icon: Icon,
    iconImg,
    status   = 'online',
    metrics  = [],
    handles  = { targetLeft: true, sourceRight: true },
  } = data

  const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG.backend
  const led = LED_STATUS[status] ?? LED_STATUS.online

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={[
        'relative min-w-[200px] max-w-[250px] rounded-2xl shadow-xl border-2',
        cfg.border, cfg.bg,
        'ring-2 ring-offset-2 transition-all duration-200',
        selected ? cfg.ring : 'ring-transparent',
      ].join(' ')}
    >
      {/* Header */}
      <div className={`flex items-center gap-2 px-4 py-2 rounded-t-2xl bg-gradient-to-r ${cfg.headerGrad}`}>
        <span className="text-[9px] font-extrabold tracking-[0.18em] text-white/90 uppercase">
          {cfg.tag}
        </span>
        <span title={status} className={`ml-auto w-2.5 h-2.5 rounded-full animate-pulse-led ${led}`} />
      </div>

      {/* Body */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-2">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-100">
          {iconImg ? (
            <img src={iconImg} alt={label} className="w-7 h-7 object-contain" />
          ) : Icon ? (
            <Icon size={26} className="text-slate-700" />
          ) : (
            <span className="text-slate-300 text-xl">?</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-slate-800 leading-tight truncate">{label}</p>
          {sublabel && (
            <p className="text-[10px] font-mono text-slate-500 leading-tight mt-0.5 truncate">{sublabel}</p>
          )}
        </div>
      </div>

      {/* Metrics */}
      {metrics.length > 0 && (
        <div className="mx-4 mb-3 mt-1 grid grid-cols-2 gap-x-4 gap-y-1 bg-white/60 rounded-xl px-3 py-2 border border-slate-100">
          {metrics.map(({ key, value }) => (
            <div key={key} className="flex flex-col">
              <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider">{key}</span>
              <span className="text-[11px] font-semibold font-mono text-slate-700">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Handles multi-dirección ── */}
      {handles.targetLeft   && <Handle id="tl" type="target" position={Position.Left}   className={HANDLE_BASE} />}
      {handles.targetRight  && <Handle id="tr" type="target" position={Position.Right}  className={HANDLE_BASE} />}
      {handles.targetTop    && <Handle id="tt" type="target" position={Position.Top}    className={HANDLE_BASE} />}
      {handles.targetBottom && <Handle id="tb" type="target" position={Position.Bottom} className={HANDLE_BASE} />}
      {handles.sourceLeft   && <Handle id="sl" type="source" position={Position.Left}   className={HANDLE_BASE} />}
      {handles.sourceRight  && <Handle id="sr" type="source" position={Position.Right}  className={HANDLE_BASE} />}
      {handles.sourceTop    && <Handle id="st" type="source" position={Position.Top}    className={HANDLE_BASE} />}
      {handles.sourceBottom && <Handle id="sb" type="source" position={Position.Bottom} className={HANDLE_BASE} />}
    </motion.div>
  )
})

BaseNode.displayName = 'BaseNode'
export default BaseNode
