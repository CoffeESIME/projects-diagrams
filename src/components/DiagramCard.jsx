import { motion } from 'framer-motion'
import { LuArrowRight, LuCalendar, LuTag } from 'react-icons/lu'

function MiniPreview({ nodes, edges }) {
  if (!nodes?.length) return null
  const xs = nodes.map((n) => n.position.x)
  const ys = nodes.map((n) => n.position.y)
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)
  const W = 340, H = 110
  const s = Math.min((W - 40) / Math.max(maxX - minX + 200, 1), (H - 20) / Math.max(maxY - minY + 100, 1))
  const toXY = (x, y) => ({ cx: (x - minX) * s + 20, cy: (y - minY) * s + 10 })
  const TYPE_COLORS = {
    field: '#10b981', broker: '#f59e0b', backend: '#3b82f6',
    database: '#8b5cf6', frontend: '#f43f5e',
  }
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} className="absolute inset-0">
      {edges?.map((e) => {
        const src = nodes.find((n) => n.id === e.source)
        const tgt = nodes.find((n) => n.id === e.target)
        if (!src || !tgt) return null
        const a = toXY(src.position.x + 100, src.position.y + 40)
        const b = toXY(tgt.position.x + 100, tgt.position.y + 40)
        return <line key={e.id} x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      })}
      {nodes.map((n) => {
        const { cx, cy } = toXY(n.position.x + 100, n.position.y + 40)
        const fill = TYPE_COLORS[n.data?.type] ?? '#94a3b8'
        return (
          <g key={n.id}>
            <circle cx={cx} cy={cy} r="10" fill={fill} opacity="0.2" />
            <circle cx={cx} cy={cy} r="6"  fill={fill} opacity="0.9" />
          </g>
        )
      })}
    </svg>
  )
}

export default function DiagramCard({ diagram, onClick }) {
  const { title, description, category, tags, accentColor, nodes, edges, updatedAt } = diagram
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-shadow duration-200 flex flex-col"
    >
      {/* Preview */}
      <div className="relative h-36 overflow-hidden" style={{ background: `linear-gradient(135deg, ${accentColor}dd, ${accentColor}77)` }}>
        <MiniPreview nodes={nodes} edges={edges} />
        <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase text-white/90 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {category}
        </span>
        <div className="absolute bottom-3 right-3 flex gap-2">
          <span className="text-[10px] text-white/80 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-mono">{nodes?.length ?? 0} nodes</span>
          <span className="text-[10px] text-white/80 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-mono">{edges?.length ?? 0} edges</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div>
          <h3 className="text-sm font-bold text-slate-800 leading-snug">{title}</h3>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">{description}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags?.slice(0, 4).map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              <LuTag size={9} /> {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <LuCalendar size={11} /> {updatedAt}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Open <LuArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.div>
  )
}
