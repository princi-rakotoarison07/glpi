import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Toutes les requêtes commençant par /api seront interceptées par Vite
      '/api': {
        target: 'http://localhost/glpi/apirest.php', // L'URL de votre backend GLPI
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Enlève '/api' avant d'envoyer à GLPI
      }
    }
  }
})
