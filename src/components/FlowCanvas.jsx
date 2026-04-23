import { useCallback, useState } from 'react'
import {
  ReactFlow, Background, BackgroundVariant,
  Controls, MiniMap, Panel,
  useNodesState, useEdgesState, addEdge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { AnimatePresence, motion } from 'framer-motion'
import { LuX, LuActivity } from 'react-icons/lu'
import BaseNode from './BaseNode'

const nodeTypes = { base: BaseNode }

const miniMapColor = (n) =>
  ({ field: '#10b981', broker: '#f59e0b', backend: '#3b82f6', database: '#8b5cf6', frontend: '#f43f5e' }[n.data?.type] ?? '#94a3b8')

/**
 * FlowCanvas — canvas ReactFlow reutilizable.
 * Recibe nodes/edges como props; cada diagrama los pasa desde su data.js.
 */
export default function FlowCanvas({ nodes: initNodes, edges: initEdges }) {
  const [nodes, , onNodesChange] = useNodesState(initNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges)
  const [selected, setSelected] = useState(null)

  const onConnect  = useCallback((p) => setEdges((e) => addEdge({ ...p, animated: true, type: 'smoothstep' }, e)), [setEdges])
  const onNodeClick = useCallback((_, n) => setSelected(n), [])
  const onPaneClick = useCallback(() => setSelected(null), [])

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* Canvas */}
      <div className="flex-1 h-full relative">
        <ReactFlow
          nodes={nodes} edges={edges}
          onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
          onConnect={onConnect} onNodeClick={onNodeClick} onPaneClick={onPaneClick}
          nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} color="#cbd5e1" />
          <Controls className="!bg-white !rounded-xl !shadow-md !border !border-slate-200" />
          <MiniMap nodeColor={miniMapColor} className="!rounded-xl !shadow-md !border !border-slate-200 !bg-white" maskColor="rgba(241,245,249,0.7)" />

          {/* Leyenda de capas */}
          <Panel position="top-left">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-slate-200 p-3 flex flex-col gap-1.5">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Layers</p>
              {[
                { c: 'bg-emerald-400', l: 'Field Device'   },
                { c: 'bg-amber-400',   l: 'MQTT Broker'    },
                { c: 'bg-blue-400',    l: 'Backend'        },
                { c: 'bg-violet-400',  l: 'Database'       },
                { c: 'bg-rose-400',    l: 'Frontend'       },
              ].map(({ c, l }) => (
                <div key={l} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${c}`} />
                  <span className="text-[11px] text-slate-600 font-medium">{l}</span>
                </div>
              ))}
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Panel de detalle */}
      <AnimatePresence>
        {selected && (
          <motion.aside
            key={selected.id}
            initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="w-68 bg-white border-l border-slate-200 shadow-xl flex flex-col overflow-y-auto"
            style={{ width: 272 }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-800">{selected.data.label}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{selected.data.sublabel}</p>
              </div>
              <button onClick={() => setSelected(null)} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                <LuX size={14} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${selected.data.status === 'online' ? 'bg-emerald-400' : selected.data.status === 'warning' ? 'bg-amber-400' : 'bg-red-500'}`} />
                <span className="text-xs font-semibold capitalize text-slate-700">{selected.data.status}</span>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Layer</p>
                <p className="text-sm text-slate-700 font-semibold capitalize">{selected.data.type}</p>
              </div>
              {selected.data.metrics?.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Metrics</p>
                  <div className="grid grid-cols-2 gap-3">
                    {selected.data.metrics.map(({ key, value }) => (
                      <div key={key} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">{key}</p>
                        <p className="text-sm font-bold font-mono text-slate-800 mt-0.5">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Node ID</p>
                <p className="text-xs font-mono text-slate-600">{selected.id}</p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}
