import { motion } from 'framer-motion'
import { LuArrowLeft, LuActivity } from 'react-icons/lu'
import FlowCanvas from '../components/FlowCanvas'

export default function DiagramView({ diagram, onBack }) {
  const { title, category, accentColor, nodes, edges, updatedAt } = diagram

  return (
    <motion.div
      className="w-screen h-screen flex flex-col font-sans overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 shadow-sm z-10 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <LuArrowLeft size={14} /> Gallery
          </button>
          <div className="w-px h-5 bg-slate-200" />
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
            <div>
              <h1 className="text-sm font-extrabold text-slate-800 leading-tight">{title}</h1>
              <p className="text-[10px] text-slate-400 font-mono">{category}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex gap-4 text-[10px] text-slate-500 font-mono">
            <span>{nodes?.length ?? 0} nodes</span>
            <span>{edges?.length ?? 0} edges</span>
            <span>Updated: {updatedAt}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <LuActivity size={13} className="text-emerald-500" />
            <span className="font-medium">Live</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden bg-slate-100">
        <FlowCanvas nodes={nodes} edges={edges} />
      </div>
    </motion.div>
  )
}
