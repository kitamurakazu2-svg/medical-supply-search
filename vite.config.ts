import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({base:'/medical-supply-search/',plugins:[react(),VitePWA({registerType:'prompt',manifest:{name:'診療材料検索（架空データ）',short_name:'材料検索',lang:'ja',start_url:'/medical-supply-search/',scope:'/medical-supply-search/',display:'standalone',background_color:'#f3f7f5',theme_color:'#11685b',icons:[{src:'icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'}]},workbox:{globPatterns:['**/*.{js,css,html,svg,png,json}'],navigateFallback:'/medical-supply-search/index.html'}})]});
