/**
 * 构建 /app/ 界面预览
 *
 * 输入：
 *   preview-source/screens/*.html   —— 从真实 App 里抓下来的 7 屏 DOM（见 README 的重抓步骤）
 *   主项目 dist/assets/*.css        —— 原样的生产 CSS（压缩过的）
 * 输出：
 *   public/app/index.html           —— 拼好的静态预览壳
 *   public/app/app.css              —— 主项目 CSS 原样拼接
 *
 * 只读主项目，不写主项目。
 */
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const DEFAULT_MAIN = 'C:/Users/tianming/Desktop/test/yiyan-personal-database';
const main = resolve(process.argv[2] ?? DEFAULT_MAIN);
const here = resolve(import.meta.dirname, '..');

const SRC = join(here, 'preview-source', 'screens');
const OUT = join(here, 'public', 'app');

/** 屏幕顺序 = 底栏顺序，另外两屏（转盘 / 备忘录）从首页快捷入口进 */
const SCREENS = [
  { id: 'home', label: '录入' },
  { id: 'random', label: '随机' },
  { id: 'todo', label: '待办' },
  { id: 'chat', label: 'Chat' },
  { id: 'settings', label: '设置' },
  { id: 'wheel', label: '决定转盘' },
  { id: 'memo', label: '备忘录' },
];

async function buildCss() {
  const dir = join(main, 'dist', 'assets');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.css')).sort();
  if (!files.length) throw new Error(`找不到主项目 CSS：${dir}\n请先在主项目执行 npm run build`);

  const parts = [];
  for (const f of files) parts.push(await readFile(join(dir, f), 'utf8'));
  const css = `/* 记忆库 · 由主项目 dist 的生产 CSS 原样拼接（build-preview.mjs） */\n${parts.join('\n')}\n`;
  await writeFile(join(OUT, 'app.css'), css, 'utf8');
  return { count: files.length, bytes: Buffer.byteLength(css) };
}

async function buildHtml() {
  const blocks = [];
  for (const s of SCREENS) {
    const raw = await readFile(join(SRC, `${s.id}.html`), 'utf8');
    blocks.push(
      `<section class="screen" data-screen="${s.id}" aria-label="${s.label}"${
        s.id === 'home' ? '' : ' hidden'
      }>${raw.trim()}</section>`
    );
  }

  const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#131416" />
    <title>记忆库 · 界面预览</title>
    <meta name="description" content="记忆库 Android 版界面的静态预览。看不到逻辑，只看得见长相。" />
    <meta name="robots" content="noindex" />
    <link rel="icon" type="image/svg+xml" href="../favicon.svg" />
    <link rel="stylesheet" href="./app.css" />
    <link rel="stylesheet" href="./demo.css" />
  </head>
  <body>
${blocks.join('\n')}
    <div class="pv-toast" id="pvToast" role="status">
      这是<strong>静态界面预览</strong>：数据是编的，按钮不会真的干活。点底部图标或首页快捷卡片可以切页。
    </div>
    <script src="./demo.js"></script>
  </body>
</html>
`;
  await writeFile(join(OUT, 'index.html'), html, 'utf8');
  return Buffer.byteLength(html);
}

await mkdir(OUT, { recursive: true });
const css = await buildCss();
const htmlBytes = await buildHtml();
console.log(`✓ app.css  ← ${css.count} 个文件，${(css.bytes / 1024).toFixed(1)} KB`);
console.log(`✓ index.html ← ${SCREENS.length} 屏，${(htmlBytes / 1024).toFixed(1)} KB`);
console.log('  预览：npm run dev 后打开 /app/index.html');
