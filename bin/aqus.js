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
import { PRESETS, renderCSS, hueWarning } from '../lib/tokens.js'
import { detectEntry, injectImports } from '../lib/detect.js'
import { claudeExists, installAgent } from '../lib/agent.js'

const [,, cmd, ...rawArgs] = process.argv

function parseFlags(argv) {
  const flags = {}
  for (const a of argv) {
    if (a === '-y') { flags.y = true; continue }
    if (!a.startsWith('--')) continue
    const eq = a.indexOf('=')
    if (eq === -1) flags[a.slice(2)] = true
    else flags[a.slice(2, eq)] = a.slice(eq + 1)
  }
  return flags
}

if (cmd === 'init') {
  init(parseFlags(rawArgs)).catch(e => { console.error(e.message); process.exit(1) })
} else if (cmd === 'agent' && rawArgs[0] === 'install') {
  agentOnly(parseFlags(rawArgs.slice(1))).catch(e => { console.error(e.message); process.exit(1) })
} else {
  console.log(`
  Aqus CLI

  Commands:
    npx aqus init              Full project setup (accent + CSS + agent)
    npx aqus agent install     Install Claude agent skill only

  Flags (init):
    --yes, -y                 Non-interactive: use defaults, skip prompts
    --accent=<name>            Pick a preset by name (case-insensitive)
    --hue=<0-360> --chroma=<0.12-0.24> --lightness=<0.55-0.72>
                                Custom accent (skips the preset prompt)
    --agent[=project|global]   Install the Claude agent non-interactively
    --no-agent                 Skip the agent step entirely

  Flags (agent install):
    --global                   Install globally instead of per-project
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

async function init(flags = {}) {
  const cwd = process.cwd()
  const nonInteractive = flags.yes === true || flags.y === true
  const dim = s => `\x1b[2m${s}\x1b[0m`
  const bold = s => `\x1b[1m${s}\x1b[0m`
  const accentColor = s => `\x1b[36m${s}\x1b[0m`

  console.log(`\n  ${bold(accentColor('Aqus'))} setup\n`)

  // ── 1. Accent color ────────────────────────────────────────────────────────

  let accent_params
  if (typeof flags.hue !== 'undefined' || typeof flags.chroma !== 'undefined' || typeof flags.lightness !== 'undefined') {
    const H = parseFloat(flags.hue)
    const C = parseFloat(flags.chroma)
    const L = parseFloat(flags.lightness)
    if ([H, C, L].some(isNaN)) { console.error('  --hue/--chroma/--lightness must all be numbers.'); process.exit(1) }
    const w = hueWarning(H); if (w) console.log(`  ${dim('!')} ${w}\n`)
    accent_params = { H, C, L, name: 'Custom' }
  } else if (typeof flags.accent === 'string') {
    accent_params = PRESETS.find(p => p.name.toLowerCase() === flags.accent.toLowerCase())
    if (!accent_params) { console.error(`  Unknown --accent "${flags.accent}". Presets: ${PRESETS.map(p => p.name).join(', ')}`); process.exit(1) }
    console.log(`  ${dim('→')} ${accent_params.name} selected (via --accent)\n`)
  } else if (nonInteractive) {
    accent_params = PRESETS[0]
    console.log(`  ${dim('→')} ${accent_params.name} selected (default, --yes)\n`)
  } else {
    const rl = makeRL()
    console.log('  Pick an accent color:\n')
    PRESETS.forEach((p, i) => {
      console.log(`  ${String(i + 1).padStart(2)}. ${p.name.padEnd(10)} ${dim(`H ${p.H}  L ${p.L}  C ${p.C}`)}`)
    })
    console.log(`  ${String(PRESETS.length + 1).padStart(2)}. Custom     ${dim('enter H / C / L yourself')}\n`)

    const pick = await ask(rl, `  Choice [1–${PRESETS.length + 1}]: `)
    const idx = parseInt(pick, 10) - 1

    if (idx >= 0 && idx < PRESETS.length) {
      accent_params = PRESETS[idx]
      console.log(`  ${dim('→')} ${accent_params.name} selected\n`)
    } else {
      const H = parseFloat(await ask(rl, '  Hue (0–360): '))
      const C = parseFloat(await ask(rl, '  Chroma (0.12–0.24): '))
      const L = parseFloat(await ask(rl, '  Lightness (0.55–0.72): '))
      if ([H, C, L].some(isNaN)) { rl.close(); console.error('  Invalid values.'); process.exit(1) }
      const w = hueWarning(H); if (w) console.log(`\n  ${dim('!')} ${w}`)
      accent_params = { H, C, L, name: 'Custom' }
      console.log()
    }
    rl.close()
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
  if (flags['no-agent'] === true) {
    console.log(`  ${dim('Skipping agent install (--no-agent).')}`)
  } else if (typeof flags.agent !== 'undefined') {
    if (!claudeExists()) {
      console.log(`  ${dim('Claude Code not detected (~/.claude not found) — skipping --agent.')}`)
    } else {
      const global = flags.agent === 'global'
      const dir = installAgent(cwd, global)
      const dirRel = global ? dir : relative(cwd, dir)
      console.log(`  ✓ agent installed → ${bold(dirRel)}`)
      console.log(`  ${dim('Restart Claude Code, then use /aqus-design to activate the skill.')}`)
    }
  } else if (nonInteractive) {
    console.log(`  ${dim('Skipping interactive agent prompt (--yes). Pass --agent[=project|global] to install non-interactively.')}`)
  } else if (claudeExists()) {
    const rl = makeRL()
    const installQ = await ask(rl, '  Install Aqus design agent for Claude Code? [Y/n]: ')
    if (installQ === '' || installQ.toLowerCase() === 'y') {
      const scopeQ = await ask(rl, '  Install for (1) this project only  (2) all my projects globally? [1/2]: ')
      const global = scopeQ.trim() === '2'
      const dir = installAgent(cwd, global)
      const dirRel = global ? dir : relative(cwd, dir)
      console.log(`  ✓ agent installed → ${bold(dirRel)}`)
      console.log(`  ${dim('Restart Claude Code, then use /aqus-design to activate the skill.')}`)
    }
    rl.close()
  } else {
    console.log(`  ${dim('Claude Code not detected. Run `npx aqus agent install` later to add the design agent.')}`)
  }

  console.log(`\n  ${bold('Done.')} Import components and start building:\n`)
  console.log(`  ${dim("import { Button, Card, NavBar } from '@agustin/aqus'")}\n`)
}

// ── agent only ────────────────────────────────────────────────────────────────

async function agentOnly(flags = {}) {
  const cwd = process.cwd()

  if (!claudeExists()) {
    console.log('\n  Claude Code not detected (~/.claude not found).\n')
    return
  }

  let global
  if (flags.global === true) {
    global = true
  } else if (flags.yes === true || flags.y === true) {
    global = false
  } else {
    const rl = makeRL()
    const scopeQ = await ask(rl, '  Install for (1) this project  (2) globally? [1/2]: ')
    global = scopeQ.trim() === '2'
    rl.close()
  }

  const dir = installAgent(cwd, global)
  const dirRel = global ? dir : relative(cwd, dir)
  console.log(`\n  ✓ Aqus agent installed → ${dirRel}`)
  console.log('  Restart Claude Code, then use /aqus-design to activate.\n')
}
