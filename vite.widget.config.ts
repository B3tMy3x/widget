import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/widget.ts',
      name: 'ChatbotWidget',
      fileName: 'chatbot-widget',
    },
    rollupOptions: {
      output: {
        globals: {
          'chatbot-widget': 'ChatbotWidget',
        },
      },
    },
  },
});
