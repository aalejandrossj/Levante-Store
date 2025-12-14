import devServer from '@hono/vite-dev-server'
import build from '@hono/vite-build/vercel'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/index.tsx'
    }),
    build({
      entry: 'src/index.tsx'
    })
  ],
  test: {
    environment: 'node',
    globals: true,
    exclude: ['**/connection.test.ts', '**/node_modules/**'],
  }
})
