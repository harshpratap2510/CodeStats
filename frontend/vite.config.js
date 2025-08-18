import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',               // ensures public assets are at the domain root
  plugins: [react()],
})
