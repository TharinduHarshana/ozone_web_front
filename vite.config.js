import { fileURLToPath } from 'url';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Get the directory name of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vite configuration
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
