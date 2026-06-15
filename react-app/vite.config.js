// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Toutes les requêtes commençant par /api seront interceptées par Vite
//       '/api': {
//         target: 'http://localhost/glpi/apirest.php', // L'URL de votre backend GLPI
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '') // Enlève '/api' avant d'envoyer à GLPI
//       }
//     }
//   }


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/glpi-api': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/glpi-api/, '/glpi/apirest.php'),
        configure: (proxy, _options) => {
          proxy.on('error', (err, req, res) => {
            console.error('Proxy Error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[Proxy Request] ${req.method} ${req.url} -> ${proxyReq.path}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[Proxy Response] ${req.method} ${req.url} -> Status ${proxyRes.statusCode}`);
          });
        }
      },
    },
  },
})

