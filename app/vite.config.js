import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ppwk-2025/app/", //tämä
  server: {            //tämä
    open: true,        //tämä
    port: 5173         //tämä
  }
})
