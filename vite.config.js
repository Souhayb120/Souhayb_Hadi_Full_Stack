import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion';
          if (id.includes('react') || id.includes('scheduler')) return 'react-vendor';
          if (id.includes('lucide')) return 'icons';
          if (id.includes('lenis')) return 'lenis';
          return 'vendor';
        },
      },
    },
  },
})