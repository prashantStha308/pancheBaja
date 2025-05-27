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
    allowedHosts: ['dd44-2400-1a00-bd11-8c74-6855-f589-14a6-51dc.ngrok-free.app']
  }
})
