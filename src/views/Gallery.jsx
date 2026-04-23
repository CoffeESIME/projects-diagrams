import { useState } from 'react'
import { motion } from 'framer-motion'
import { LuSearch, LuZap, LuActivity, LuPlus } from 'react-icons/lu'
import { diagrams } from '../diagrams'
import DiagramCard from '../components/DiagramCard'

const ALL = 'All'

export default function Gallery({ onSelect }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(ALL)

  const categories = [ALL, ...new Set(diagrams.map((d) => d.category))]

  const filtered = diagrams.filter((d) => {
    const matchQ = d.title.toLowerCase().includes(query.toLowerCase()) ||
                   d.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    const matchC = category === ALL || d.category === category
    return matchQ && matchC
  })

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 shadow-sm px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md">
            <LuZap size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-slate-800 tracking-tight">Diagram Studio</h1>
            <p className="text-[10px] text-slate-400 font-mono">Architecture Diagrams · Interactive</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <LuActivity size={13} className="text-emerald-500" />
            <span className="font-medium">{diagrams.length} diagrams</span>
          </span>
          <button className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
            <LuPlus size={14} /> New Diagram
          </button>
        </div>
      </header>

      <div className="px-8 pt-8 pb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative w-72">
          <LuSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search diagrams or tags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-slate-400"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={[
                'text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-150',
                category === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 px-8 pb-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400">
            <p className="text-sm">No diagrams match your search.</p>
          </div>
        ) : (
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {filtered.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 22 }}
              >
                <DiagramCard diagram={d} onClick={() => onSelect(d)} />
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
