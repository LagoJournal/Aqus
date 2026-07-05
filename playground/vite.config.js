import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// The showcase consumes the library exactly like a real consumer would
// (`import { Button } from '@agustin/aqus'`), but during dev/build the alias
// resolves to the live source so the page always reflects the current library.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@agustin/aqus/styles.css': resolve(__dirname, '../styles.css'),
      '@agustin/aqus/foil-fx': resolve(__dirname, '../foil-fx.js'),
      '@agustin/aqus': resolve(__dirname, '../src/index.js'),
    },
  },
  server: {
    fs: { allow: ['..'] },
  },
  // .js files in ../src contain JSX — tell esbuild to parse them as JSX.
  esbuild: { loader: 'jsx', include: /\.[jt]sx?$/ },
  optimizeDeps: {
    esbuildOptions: { loader: { '.js': 'jsx' } },
  },
})
