import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    open: false
  },
  resolve: {
    alias: {
      '@controls': path.resolve(__dirname, './src/controls'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@data': path.resolve(__dirname, './src/data'),
      '@mockData': path.resolve(__dirname, './src/mockData'),
      '@redux': path.resolve(__dirname, './src/redux'),
    }
  },
  define: {
    'process.env': process.env
  }
})
