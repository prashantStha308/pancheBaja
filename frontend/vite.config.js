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
    allowedHosts: ['d6d4-2400-1a00-bd11-9eec-4506-31e2-cd64-42d4.ngrok-free.app']
  }
})
