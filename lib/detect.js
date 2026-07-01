/**
 * Detect framework entry points for CSS import injection.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const JS_CANDIDATES = [
  'src/main.tsx', 'src/main.jsx', 'src/main.ts', 'src/main.js',
  'src/index.tsx', 'src/index.jsx',
  'app/layout.tsx', 'app/layout.jsx',
  'pages/_app.tsx', 'pages/_app.jsx',
  'app/root.tsx', 'app/root.jsx',
]

const CSS_CANDIDATES = [
  'app/globals.css',
  'src/index.css', 'src/globals.css', 'src/styles.css',
  'styles/globals.css',
]

export function detectEntry(cwd) {
  for (const p of JS_CANDIDATES) {
    if (existsSync(join(cwd, p))) return { path: join(cwd, p), type: 'js' }
  }
  for (const p of CSS_CANDIDATES) {
    if (existsSync(join(cwd, p))) return { path: join(cwd, p), type: 'css' }
  }
  return null
}

export function injectImports(entry, accentFile) {
  const src = readFileSync(entry.path, 'utf8')
  const accentImport = accentFile
    ? (entry.type === 'js' ? `import './${accentFile}'\n` : `@import './${accentFile}';\n`)
    : ''
  const styleImport = entry.type === 'js'
    ? `import '@agustin/aqus/styles.css'\n`
    : `@import '@agustin/aqus/styles.css';\n`

  if (src.includes('@agustin/aqus/styles.css')) return false // already present

  writeFileSync(entry.path, styleImport + accentImport + src)
  return true
}
