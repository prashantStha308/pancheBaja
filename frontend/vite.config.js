import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server:{
    allowedHosts:['14e5-2400-1a00-bd11-7f89-7416-e9de-3c83-3b9d.ngrok-free.app']
  }
})
