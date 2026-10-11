import { createRequire } from 'node:module'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'

// Use a local installation, or the desktop runtime without changing project dependencies.
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_DIR ? path.join(process.env.PLAYWRIGHT_MODULE_DIR, 'playwright') : 'playwright')
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 })
const origin = process.env.PUBLICATION_ORIGIN || 'http://127.0.0.1:5173'
const errors = []
page.on('pageerror', error => errors.push(error.message))
await mkdir('public/social', { recursive: true })
try {
  for (const slug of ['01-fuzzy', '02-pathfinder', '03-serendipity']) {
    await page.goto(`${origin}/social/fuzzy-graphrag-launch/${slug}?export=1`)
    await page.evaluate(() => document.fonts.ready)
    const frame = page.locator('.publication-frame')
    const box = await frame.boundingBox()
    assert.equal(box.width, 1080)
    assert.equal(box.height, 1350)
    assert.equal(await page.locator('nav, button, .publication-tools').count(), 0)
    const overflow = await frame.locator('text').evaluateAll(nodes => nodes.filter(n => {
      const b = n.getBBox()
      return b.x < 0 || b.x + b.width > 1080 || b.y < 0 || b.y + b.height > 1350
    }).map(n => n.textContent))
    assert.deepEqual(overflow, [], `Text outside frame: ${slug}`)
    await frame.screenshot({ path: `public/social/fuzzy-graphrag-${slug}.png` })
    await page.setViewportSize({ width: 390, height: 844 })
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 390)
    await page.setViewportSize({ width: 1080, height: 1350 })
    console.log(`Exported ${slug}: 1080 × 1350; mobile width checked`)
  }
  await page.goto(origin)
  assert.equal(await page.locator('.story-card').count(), 20)
  await page.getByRole('link', { name: /Fuzzy GraphRAG · Public launch/ }).click()
  await page.getByRole('link', { name: '02 · Pathfinder real' }).click()
  assert.match(page.url(), /02-pathfinder$/)
  await page.getByRole('link', { name: '03 · Serendipity real' }).click()
  assert.match(page.url(), /03-serendipity$/)
  assert.deepEqual(errors, [])
  console.log('Atlas: 20 stories preserved; collection navigation passed; no browser errors')
} finally {
  await browser.close()
}
