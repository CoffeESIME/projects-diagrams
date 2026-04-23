import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Gallery from './views/Gallery'
import DiagramView from './views/DiagramView'

export default function App() {
  const [selected, setSelected] = useState(null)

  return (
    <AnimatePresence mode="wait">
      {selected ? (
        <DiagramView
          key="diagram"
          diagram={selected}
          onBack={() => setSelected(null)}
        />
      ) : (
        <Gallery
          key="gallery"
          onSelect={setSelected}
        />
      )}
    </AnimatePresence>
  )
}
