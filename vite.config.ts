import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/

export default ({ mode }) => {
  return defineConfig({
    define: {
      BACKEND_SERVER_URL: `"https://d4kosy-95-181-26-94.ru.tuna.am"`,
      API_URL: `"https://d4kosy-95-181-26-94.ru.tuna.am/api"`,
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

