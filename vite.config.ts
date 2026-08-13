import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { viteAssetBase } from './src/config/networkConfig'

export default defineConfig({
  base: viteAssetBase,
  plugins: [react()],
  resolve: { dedupe: ['react', 'react-dom', 'three', '@react-three/fiber'] },
  test: { environment: 'jsdom', globals: true },
})
