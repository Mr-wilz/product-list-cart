import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  json: {
    // if you want to enable named imports from JSON
    namedExports: true,
  },
});
