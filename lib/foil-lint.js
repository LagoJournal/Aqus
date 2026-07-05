/* foil-lint-disable — this file names the banned patterns */
/**
 * Aqus Foil adherence lint — the three law violations that a
 * regex can catch. Not a parser; a tripwire.
 *   no-hue-rotate      hue never spins (law 2)
 *   one-ultra          exactly one .fx-finish.ultra per document (law 4)
 *   no-foil-over-foil  never nest .fx-finish in .fx-finish (the forbidden stack)
 */
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const SCANNABLE = new Set(['.css', '.html', '.jsx', '.tsx', '.js', '.ts', '.vue', '.svelte'])

export function lintSource(file, text) {
  const findings = []

  // opt-out marker for files that mention the banned patterns as text
  // (this linter itself, CLI help, docs tooling)
  if (text.includes('foil-lint-disable')) return findings

  if (/hue-rotate/.test(text)) {
    findings.push({ file, rule: 'no-hue-rotate', msg: 'hue-rotate is banned — the light moves, hue never spins' })
  }

  const ultras = text.match(/class(Name)?=["'`][^"'`]*\bultra\b[^"'`]*["'`]/g) || []
  if (ultras.length > 1) {
    findings.push({ file, rule: 'one-ultra', msg: `${ultras.length} ultra finishes — exactly one ultra hero per view` })
  }

  // fx-finish nesting: scan tags, keep a stack of unclosed elements,
  // flag an fx-finish opening while another is still open.
  // Assumes balanced markup (JSX/HTML).
  const tags = [...text.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g)]
  const stack = []
  for (const [whole, name] of tags) {
    if (whole.startsWith('</')) {
      // pop until we close this tag name (tolerates siblings)
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].name === name) { stack.splice(i, 1); break }
      }
      continue
    }
    if (whole.endsWith('/>')) continue // self-closing can't contain children
    const isFinish = /class(Name)?=["'`][^"'`]*\bfx-finish\b/.test(whole)
    if (isFinish && stack.some(s => s.finish)) {
      findings.push({ file, rule: 'no-foil-over-foil', msg: 'fx-finish nested inside fx-finish — the one forbidden stack' })
    }
    stack.push({ name, finish: isFinish })
  }
  return findings
}

export function lintPath(root) {
  const findings = []
  const walk = (p) => {
    for (const entry of readdirSync(p)) {
      if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.')) continue
      const full = join(p, entry)
      if (statSync(full).isDirectory()) { walk(full); continue }
      // test/spec files legitimately contain violations as fixtures
      if (/\.(test|spec)\./.test(entry)) continue
      if (SCANNABLE.has(extname(entry))) findings.push(...lintSource(full, readFileSync(full, 'utf8')))
    }
  }
  const s = statSync(root)
  if (s.isDirectory()) walk(root)
  else findings.push(...lintSource(root, readFileSync(root, 'utf8')))
  return findings
}
