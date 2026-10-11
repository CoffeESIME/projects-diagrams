import { useLanguage } from '../i18n/LanguageContext'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { LuArrowDown, LuArrowUpRight, LuCheck, LuCoffee, LuCopy, LuGithub, LuMoveRight } from 'react-icons/lu'
import { HeroConstellation, StoryVisual } from '../components/GraphVisuals'
import { chapters, linkedInCopy, stories } from '../data/graphragStories'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function GraphRagHome({ onSelect }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const localizedPost = t(linkedInCopy)

  const copyPost = async () => {
    try {
      await navigator.clipboard.writeText(localizedPost)
      setCopyError(false)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopyError(true)
    }
  }

  return (
    <motion.main className="site-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <nav className="topbar">
        <a href="#top" className="brand" aria-label={t("hechoconcafeina, inicio")}><span className="brand-mark"><LuCoffee /></span><span><b>{t("hecho")}</b>{t("concafeina")}</span></a>
        <div className="nav-meta"><span>{t("GRAPH RAG · MULTIMODAL")}</span><i /><span>{t("RESEARCH BUILD / 2026")}</span></div>
        <div className="nav-actions"><LanguageSwitcher /><a className="source-link" href="https://github.com/CoffeESIME/fuzzy-graph-rag" target="_blank" rel="noreferrer" aria-label={t('Ver proyecto')}><LuGithub />{t(" Ver proyecto ")}<LuArrowUpRight /></a></div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}><span>01—{t(stories.length)}</span>{t(" ATLAS VISUAL DEL PROYECTO")}</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .08 }}>{t("La incertidumbre")}<br />{t("también es ")}<em>{t("información.")}</em></motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .18 }}>{t("Un recorrido visual por un sistema que transforma texto, imagen, audio y memoria en un grafo de conocimiento con grados de significado.")}</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .32 }}>
            <button className="primary-action" onClick={() => onSelect(stories[0].id)}>{t("Explorar la arquitectura ")}<LuMoveRight /></button>
            <a href="#collection">{t('Ver las {count} historias', { count: stories.length })}<LuArrowDown /></a>
          </motion.div>
        </div>
        <motion.div className="hero-visual-wrap" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .12 }}>
          <span className="visual-caption top">{t("KNOWLEDGE / NOT JUST DATA")}</span><HeroConstellation /><span className="visual-caption bottom">{t("RELATIONSHIPS WITH MEANING")}</span>
        </motion.div>
        <div className="hero-index"><b>{t("FUZZY")}</b><span>{t("GRAPH")}</span><span>{t("RAG")}</span></div>
      </section>

      <section className="thesis-strip"><span>01</span><p>{t("Archivos, conceptos y asociaciones graduadas. ")}<strong>{t("Un espacio para explorar una colección cultural.")}</strong>{t(" Los pesos expresan grados de relación, no certeza calibrada.")}</p><i>μ ∈ [0, 1]</i></section>

      <section className="collection" id="collection">
        <header className="section-head"><div><span className="eyebrow">{t("COLECCIÓN / ")}{t(stories.length)}</span><h2>{t(stories.length)}{t(" historias.")}<br />{t("Con contexto y evidencia.")}</h2></div><p>{t("Cuatro capítulos para construir, explorar, evolucionar y revisar lo que sabemos. Cada lámina distingue implementación, datos exportados, ejemplos y propuestas.")}</p></header>
        <div className="atlas-review-note"><b>{t("Revisado con el informe analítico · 07 sep 2026")}</b><p>{t("Las exportaciones son casos de marzo de 2026. Las simulaciones no consultan el corpus. Comunidades espera datos y la evaluación futura es una propuesta sin resultados.")}</p></div>
        {chapters.map(chapter => (
          <section className="story-chapter" key={chapter.id}>
            <header className="chapter-head"><span>{t(chapter.number)}</span><div><h3>{t(chapter.title)}</h3><p>{t(chapter.description)}</p></div><b>{t(stories.filter(story => story.chapter === chapter.id).length.toString().padStart(2, '0'))}{t(" LÁMINAS")}</b></header>
            <div className="story-grid">
              {stories.filter(story => story.chapter === chapter.id).map((story, index) => (
                <motion.article className="story-card" key={story.id} role="button" tabIndex={0} aria-label={t('Abrir: {title}', { title: t(story.shortTitle) })} onClick={() => onSelect(story.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(story.id) } }} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .55, delay: (index % 2) * .08 }}>
                  <div className="card-heading"><span>{t(story.number)}</span><p>{t(story.kicker)}</p><LuArrowUpRight /></div>
                  <span className="evidence-badge">{t(story.status)}</span>
                  <div className="card-visual" style={{ '--accent': story.color }}><StoryVisual id={story.id} compact /></div>
                  <div className="card-copy"><h3>{t(story.shortTitle)}</h3><p>{t(story.description)}</p></div>
                  <div className="card-tags">{story.tags.slice(0, 3).map(tag => <span key={tag}>{t(tag)}</span>)}</div>
                </motion.article>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="copy-lab">
        <div className="copy-title"><span className="eyebrow">{t("LISTO PARA COMPARTIR")}</span><h2>{t("Del diagrama")}<br />{t("a la conversación.")}</h2><p>{t("Una descripción base para presentar el proyecto en LinkedIn. Puedes copiarla y personalizar el cierre.")}</p></div>
        <div className="post-preview">
          <div className="post-author"><span>{t("HC")}</span><div><b>{t("hechoconcafeina")}</b><small>{t("Fuzzy GraphRAG · Open research project")}</small></div></div>
          <p>{localizedPost.split('\n\n').slice(0, 3).join('\n\n')}</p><div className="post-fade" />
          <button onClick={copyPost} className={copied ? 'copied' : ''}>{copied ? <LuCheck /> : <LuCopy />}{t(copied ? 'Texto copiado' : 'Copiar publicación completa')}</button>
          <span className="copy-feedback" role="status">{copyError ? t('No se pudo copiar. Inténtalo de nuevo.') : copied ? t('Texto copiado') : ''}</span>
        </div>
      </section>

      <footer><div className="brand"><span className="brand-mark"><LuCoffee /></span><span><b>{t("hecho")}</b>{t("concafeina")}</span></div><p>{t("Built to make hidden relationships visible.")}</p><span>{t("AGPL-3.0 · 2026")}</span></footer>
    </motion.main>
  )
}
