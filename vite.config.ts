import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        // Cấu hình Supabase trực tiếp theo thông tin dự án
        'process.env.SUPABASE_URL': JSON.stringify('https://dhcqezsrdwreobszsost.supabase.co'),
        'process.env.SUPABASE_KEY': JSON.stringify('sb_publishable_00iBoLS59mqG9Qd87I4VKQ_PWD2_tO_')
      },
      resolve: {
        alias: {
          '@': path.resolve('.'),
        }
      }
    };
});