import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // ESTA LÍNEA ES NECESARIA

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Mapeo del símbolo @ a la carpeta src para importaciones absolutas
      '@': path.resolve(__dirname, './src'),
    },
  },
})