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
    allowedHosts:['6532-2400-1a00-bd11-761a-559f-959b-99ce-e818.ngrok-free.app']
  }
})
