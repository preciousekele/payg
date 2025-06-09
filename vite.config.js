import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/PayG/', 
  plugins: [
    tailwindcss(),
    react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3005,
    open: true,
    historyApiFallback: true, 
  },
});
