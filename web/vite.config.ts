import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Express server (server/index.js) serves the production build from /dist
// and proxies form submissions. In dev, Vite proxies /api to that server.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
