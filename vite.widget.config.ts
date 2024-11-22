import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/widget/index.ts',
      name: 'ChatbotWidget',
      formats: ['umd'],
      fileName: 'chatbot-widget'
    },
    outDir: 'dist/widget'
  }
});