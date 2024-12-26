import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'es2022' // Ensure this matches your tsconfig.json
  }
});
