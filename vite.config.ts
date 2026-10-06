import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * 记忆库官网 —— 纯静态构建
 *
 * 设计取向（刻意为之，不是偷懒）：
 * - 全站零第三方运行时依赖、零 Web 字体。中文用系统字体（观感最稳、体积为 0），
 *   数字与拉丁文用等宽字体做出「冷静的仪器感」。
 * - base: './' 让产物可以在任意子路径下加载（Vercel 根路径 / 本地 file 预览皆可）。
 * - 不使用 CDN：目标用户在国内，任何境外字体/脚本 CDN 都是首屏风险。
 */
/**
 * dev 下让 /app/（目录形式）落到 /app/index.html。
 * 生产不需要它 —— Vercel 与 vite preview 都会自己解析目录索引；
 * 只有 Vite dev server 会把 /app/ 交给 SPA 回退，返回落地页。
 */
function appPreviewDirIndex() {
  return {
    name: 'app-preview-dir-index',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && /^\/app\/?(\?|$)/.test(req.url)) {
          req.url = req.url.replace(/^\/app\/?/, '/app/index.html');
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), appPreviewDirIndex()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
    assetsInlineLimit: 2048,
    cssTarget: 'chrome90',
    rollupOptions: {
      output: {
        // vendor 与站点代码分离：vendor 极少变动，可长期缓存
        manualChunks: (id) =>
          id.includes('node_modules') ? 'vendor' : undefined,
      },
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5199,
  },
});
