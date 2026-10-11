import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import './analysis.css'
import GraphRagHome from './views/GraphRagHome'
import GraphRagStory from './views/GraphRagStory'
import PublicationLaunch from './views/PublicationLaunch'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)

  if (window.location.pathname.replace(/\/$/, '').startsWith('/social/fuzzy-graphrag-launch')) {
    return <PublicationLaunch />
  }

  return (
    <AnimatePresence mode="wait">
      {selectedId ? (
        <GraphRagStory
          key={selectedId}
          storyId={selectedId}
          onBack={() => setSelectedId(null)}
          onSelect={setSelectedId}
        />
      ) : (
        <GraphRagHome key="home" onSelect={setSelectedId} />
      )}
    </AnimatePresence>
  )
}
