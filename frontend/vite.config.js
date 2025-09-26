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
    proxy:{
      '/api':{
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    },
    allowedHosts: ['a9f8f96a6091.ngrok-free.app']
  }
})
