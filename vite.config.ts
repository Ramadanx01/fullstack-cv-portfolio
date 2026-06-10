import { defineConfig } from 'vite'
import react from '@tailwindcss/vite' // أو حسب الإنبورت عندك
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/fullstack-cv-portfolio/', // 🎯 التعديل هنا: خليه بحروف صغيرة بالظبط زي اسم المستودع في الرابط!
})