#!/usr/bin/env node
/**
 * Aqus CLI — npx aqus init
 *
 * Sets up everything in one go:
 *   1. Picks accent color (preset or custom H/C/L)
 *   2. Writes aqus.css with all 9 tokens (light + dark)
 *   3. Injects CSS imports into your entry point
 *   4. Optionally installs the Aqus Claude agent skill
 */
import { createInterface } from 'readline'
import { writeFileSync, existsSync } from 'fs'
import { join, relative } from 'path'
import { PRESETS, renderCSS } from '../lib/tokens.js'
import { detectEntry, injectImports } from '../lib/detect.js'
import { claudeExists, installAgent } from '../lib/agent.js'

const [,, cmd, ...args] = process.argv

if (cmd === 'init') {
  init().catch(e => { console.error(e.message); process.exit(1) })
} else if (cmd === 'agent' && args[0] === 'install') {
  agentOnly().catch(e => { console.error(e.message); process.exit(1) })
} else {
  console.log(`
  Aqus CLI

  Commands:
    npx aqus init              Full project setup (accent + CSS + agent)
    npx aqus agent install     Install Claude agent skill only
`)
}

// ── readline helpers ─────────────────────────────────────────────────────────

function makeRL() {
  return createInterface({ input: process.stdin, output: process.stdout })
}

function ask(rl, prompt) {
  return new Promise(resolve => rl.question(prompt, a => resolve(a.trim())))
}

// ── init ─────────────────────────────────────────────────────────────────────

async function init() {
  const cwd = process.cwd()
  const rl = makeRL()
  const dim = s => `\x1b[2m${s}\x1b[0m`
  const bold = s => `\x1b[1m${s}\x1b[0m`
  const accent = s => `\x1b[36m${s}\x1b[0m`

  console.log(`\n  ${bold(accent('Aqus'))} setup\n`)

  // ── 1. Accent color ────────────────────────────────────────────────────────

  console.log('  Pick an accent color:\n')
  PRESETS.forEach((p, i) => {
    console.log(`  ${String(i + 1).padStart(2)}. ${p.name.padEnd(10)} ${dim(`H ${p.H}  L ${p.L}  C ${p.C}`)}`)
  })
  console.log(`  ${String(PRESETS.length + 1).padStart(2)}. Custom     ${dim('enter H / C / L yourself')}\n`)

  const pick = await ask(rl, `  Choice [1–${PRESETS.length + 1}]: `)
  const idx = parseInt(pick, 10) - 1

  let accent_params
  if (idx >= 0 && idx < PRESETS.length) {
    accent_params = PRESETS[idx]
    console.log(`  ${dim('→')} ${accent_params.name} selected\n`)
  } else {
    const H = parseFloat(await ask(rl, '  Hue (0–360): '))
    const C = parseFloat(await ask(rl, '  Chroma (0.12–0.24): '))
    const L = parseFloat(await ask(rl, '  Lightness (0.55–0.72): '))
    if ([H, C, L].some(isNaN)) { rl.close(); console.error('  Invalid values.'); process.exit(1) }
    accent_params = { H, C, L, name: 'Custom' }
    console.log()
  }

  // ── 2. Write aqus.css ─────────────────────────────────────────────────────

  const css = renderCSS(accent_params)
  const cssPath = existsSync(join(cwd, 'src')) ? join(cwd, 'src', 'aqus.css') : join(cwd, 'aqus.css')
  writeFileSync(cssPath, css)
  const cssRel = relative(cwd, cssPath)
  console.log(`  ✓ ${bold(cssRel)} written`)

  // ── 3. Inject imports ─────────────────────────────────────────────────────

  const entry = detectEntry(cwd)
  if (entry) {
    const accentImportName = relative(join(entry.path, '..'), cssPath)
    const injected = injectImports(entry, accentImportName)
    const entryRel = relative(cwd, entry.path)
    if (injected) console.log(`  ✓ imports added to ${bold(entryRel)}`)
    else           console.log(`  ${dim('~')} ${entryRel} already has aqus imports`)
  } else {
    console.log(`  ${dim('!')} no entry point found — add these imports manually:`)
    console.log(`     ${dim("import '@agustin/aqus/styles.css'")}`)
    console.log(`     ${dim(`import './${cssRel}'`)}`)
  }

  // ── 4. Claude agent ───────────────────────────────────────────────────────

  console.log()
  if (claudeExists()) {
    const installQ = await ask(rl, '  Install Aqus design agent for Claude Code? [Y/n]: ')
    if (installQ === '' || installQ.toLowerCase() === 'y') {
      const scopeQ = await ask(rl, '  Install for (1) this project only  (2) all my projects globally? [1/2]: ')
      const global = scopeQ.trim() === '2'
      const dir = installAgent(cwd, global)
      const dirRel = global ? dir : relative(cwd, dir)
      console.log(`  ✓ agent installed → ${bold(dirRel)}`)
      console.log(`  ${dim('Restart Claude Code, then use /aqus-design to activate the skill.')}`)
    }
  } else {
    console.log(`  ${dim('Claude Code not detected. Run `npx aqus agent install` later to add the design agent.')}`)
  }

  console.log(`\n  ${bold('Done.')} Import components and start building:\n`)
  console.log(`  ${dim("import { Button, Card, NavBar } from '@agustin/aqus'")}\n`)

  rl.close()
}

// ── agent only ────────────────────────────────────────────────────────────────

async function agentOnly() {
  const cwd = process.cwd()
  const rl = makeRL()

  if (!claudeExists()) {
    console.log('\n  Claude Code not detected (~/.claude not found).\n')
    rl.close(); return
  }

  const scopeQ = await ask(rl, '  Install for (1) this project  (2) globally? [1/2]: ')
  const global = scopeQ.trim() === '2'
  const dir = installAgent(cwd, global)
  const dirRel = global ? dir : relative(cwd, dir)
  console.log(`\n  ✓ Aqus agent installed → ${dirRel}`)
  console.log('  Restart Claude Code, then use /aqus-design to activate.\n')

  rl.close()
}
