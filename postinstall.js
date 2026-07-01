#!/usr/bin/env node
/**
 * Runs after `npm install @agustin/aqus`.
 * Only prints when in an interactive terminal — never breaks CI.
 */
import { existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

const isCI = process.env.CI || !process.stdout.isTTY
if (isCI) process.exit(0)

const hasClaude = existsSync(join(homedir(), '.claude'))
const dim  = s => `\x1b[2m${s}\x1b[0m`
const bold = s => `\x1b[1m${s}\x1b[0m`
const cyan = s => `\x1b[36m${s}\x1b[0m`

console.log(`
  ${bold(cyan('Aqus'))} installed.

  Run setup to configure your accent, wire up CSS imports,
  and optionally add the design agent for Claude Code:

    ${bold('npx aqus init')}
${hasClaude ? `
  ${dim('Claude Code detected — init will offer to install the design agent.')}` : ''}`)
