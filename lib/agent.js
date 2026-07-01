/**
 * Install the Aqus Claude agent skill into the target project or globally.
 */
import {
  existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync,
} from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { homedir } from 'os'

const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

export function claudeExists() {
  return existsSync(join(homedir(), '.claude'))
}

export function installAgent(cwd, global = false) {
  const base = global ? join(homedir(), '.claude') : join(cwd, '.claude')
  const skillDir = join(base, 'skills', 'aqus-design')

  mkdirSync(join(skillDir, 'docs'), { recursive: true })

  // Copy SKILL.md, rewriting docs/ paths to point at the installed package
  const pkgDocsPath = join('node_modules', '@agustin', 'aqus', 'docs')
  const skillSrc = readFileSync(join(PKG_ROOT, 'SKILL.md'), 'utf8')
    .replace(/`docs\//g, `\`${pkgDocsPath}/`)
    .replace(/"docs\//g, `"${pkgDocsPath}/`)
    .replace(/'docs\//g, `'${pkgDocsPath}/`)
  writeFileSync(join(skillDir, 'SKILL.md'), skillSrc)

  // Copy docs alongside for offline use
  for (const f of ['AGENT_GUIDE.md', 'ux-laws.md', 'voice-rules.md']) {
    const src = join(PKG_ROOT, 'docs', f)
    if (existsSync(src)) copyFileSync(src, join(skillDir, 'docs', f))
  }

  return skillDir
}
