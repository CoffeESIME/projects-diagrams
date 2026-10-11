import { useLanguage } from '../i18n/LanguageContext'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { LuArrowLeft, LuArrowRight, LuCoffee, LuExpand, LuGithub, LuMinimize2 } from 'react-icons/lu'
import { StoryVisual } from '../components/GraphVisuals'
import { stories } from '../data/graphragStories'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function GraphRagStory({ storyId, onBack, onSelect }) {
  const { t } = useLanguage()
  const [focus, setFocus] = useState(false)
  const index = stories.findIndex(item => item.id === storyId)
  const story = useMemo(() => stories[index] || stories[0], [index])
  const prev = stories[(index - 1 + stories.length) % stories.length]
  const next = stories[(index + 1) % stories.length]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [storyId])

  useEffect(() => {
    const leavePresentation = event => { if (event.key === 'Escape') setFocus(false) }
    window.addEventListener('keydown', leavePresentation)
    return () => window.removeEventListener('keydown', leavePresentation)
  }, [])

  return (
    <motion.main className={`story-page ${focus ? 'focus-mode' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .24 }}>
      <nav className="story-nav">
        <button onClick={onBack}><LuArrowLeft />{t(" Volver al atlas")}</button>
        <div className="brand"><span className="brand-mark"><LuCoffee /></span><span><b>{t("hecho")}</b>{t("concafeina")}</span></div>
        <div className="story-tools"><LanguageSwitcher /><a href="https://github.com/CoffeESIME/fuzzy-graph-rag" target="_blank" rel="noreferrer" aria-label={t("Repositorio de GitHub")}><LuGithub /></a><button onClick={() => setFocus(value => !value)} aria-label={t(focus ? 'Salir del modo presentación' : 'Modo presentación')}>{focus ? <LuMinimize2 /> : <LuExpand />}<span>{t(focus ? 'Salir' : 'Presentar')}</span></button></div>
      </nav>

      <section className="story-layout">
        <aside className="story-sidebar">
          <div className="story-marker" style={{ '--story-color': story.color }}><span>{t(story.number)}</span><i /><b>{t(story.kicker)}</b></div>
          <motion.h1 key={`${story.id}-title`} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5 }}>{t(story.title)}</motion.h1>
          <p>{t(story.description)}</p>
          <div className="story-evidence"><span className="evidence-badge">{t(story.status)}</span><p>{t(story.note)}</p><details><summary>{t("Alcance y fuentes")}</summary><p>{t(story.detail)}</p><ul>{story.sources.map(source => <li key={source}>{t(source)}</li>)}</ul></details></div>
          <div className="story-stats">{story.stats.map(([value, label]) => <div key={label}><b>{t(value)}</b><span>{t(label)}</span></div>)}</div>
          <div className="takeaway"><span>{t("IDEA PARA LLEVAR")}</span><p>{t(story.takeaway)}</p></div>
          <div className="slide-dots">{stories.map(item => <button key={item.id} className={item.id === story.id ? 'active' : ''} onClick={() => onSelect(item.id)} aria-label={t('Ir a lámina {number}', { number: item.number })}><i /></button>)}</div>
        </aside>

        <div className="story-canvas" style={{ '--story-color': story.color }}>
          <div className="canvas-label"><span>{t("HECHOCONCAFEINA / ")}{t(story.number)}</span><span>{t(story.status)}</span></div>
          <motion.div key={story.id} className="visual-stage" initial={{ opacity: 0, scale: .975 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6 }}><StoryVisual id={story.id} /></motion.div>
          <div className="canvas-foot"><span>{t(story.note)}</span><b>{t("Revisión · sep 2026")}</b></div>
        </div>
      </section>
      {focus && <button className="presentation-exit" onClick={() => setFocus(false)} aria-label={t("Cerrar presentación")}><LuMinimize2 />{t(" Salir · Esc")}</button>}

      <div className="story-pagination">
        <button onClick={() => onSelect(prev.id)}><LuArrowLeft /><span><small>{t("ANTERIOR · ")}{t(prev.number)}</small>{t(prev.shortTitle)}</span></button>
        <button onClick={() => onSelect(next.id)}><span><small>{t("SIGUIENTE · ")}{t(next.number)}</small>{t(next.shortTitle)}</span><LuArrowRight /></button>
      </div>
    </motion.main>
  )
}
