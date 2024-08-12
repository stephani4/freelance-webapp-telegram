import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/

export default ({ mode }) => {
  return defineConfig({
    define: {
      BACKEND_SERVER_URL: `"http://127.0.0.1:8000"`,
      API_URL: `"http://127.0.0.1:8000/api"`,
    },
    server: {
      host: '127.0.0.1'
    },
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}

