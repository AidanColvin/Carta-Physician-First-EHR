"""
Vite configuration for building and deploying the React application.
"""
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/carta-demo/',
})
