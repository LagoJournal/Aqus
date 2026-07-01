import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Tests render Aqus components in jsdom. jsdom does not do layout, so the
// regression suite asserts the *structural* style props that prevent the
// mobile-overflow bugs (e.g. Badge no longer hardcodes white-space:nowrap
// without a max-width). See src/components/**/__tests__.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.{js,jsx}'],
  },
})
