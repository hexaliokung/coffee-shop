// ตั้งค่า Vite สำหรับโปรเจคที่ใช้ Tailwind CSS

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})