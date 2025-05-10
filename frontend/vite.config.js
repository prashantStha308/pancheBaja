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
    allowedHosts:['7767-2400-1a00-bd11-d3e9-ef29-1736-183d-b002.ngrok-free.app']
  }
})
