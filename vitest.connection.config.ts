import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/index.tsx'
    })
  ],
  test: {
    environment: 'node',
    globals: true,
    include: ['**/connection.test.ts'],
  }
})
