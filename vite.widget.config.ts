import { defineConfig } from 'vite';

export default defineConfig({
  base: '/widget/',
  build: {
    lib: {
      entry: 'src/widget/index.ts',
      name: 'ChatbotWidget',
      formats: ['umd'],
      fileName: 'chatbot-widget'
    },
    outDir: 'dist/widget',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});