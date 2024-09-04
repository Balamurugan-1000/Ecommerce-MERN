import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  "server": {
    proxy: {

      "/api/": "https:sample-ecommerce-app.onrender.com",
      "/uploads/": "https:sample-ecommerce-app.onrender.com/api/",
      "/api/product": "https:sample-ecommerce-app.onrender.com/product",
    }
  }
})
