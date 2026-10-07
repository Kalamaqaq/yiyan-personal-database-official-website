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
import { readFile, writeFile, readdir, mkdir, access, stat } from 'node:fs/promises';
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

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * 从官网自己的事实源里读 APK 信息。
 * 预览页的下载按钮必须和下载区显示同一个数字 —— 两处各写一次早晚会对不上。
 */
async function readApkInfo() {
  const ts = await readFile(join(here, 'src', 'data', 'site.ts'), 'utf8');
  const file = ts.match(/APK_FILE\s*=\s*'([^']+)'/)?.[1];
  const bytes = Number(ts.match(/APK_BYTES\s*=\s*(\d+)/)?.[1]);
  if (!file || !bytes) throw new Error('读不到 src/data/site.ts 里的 APK_FILE / APK_BYTES');
  return { file, label: (bytes / 1024 / 1024).toFixed(1) + ' MB' };
}

/** 设置屏是 12 个分页；一次快照只能抓到当时那一页，所以这里把 12 份面板并排拼回去 */
const SETTINGS_TABS = [
  'ai',
  'todo',
  'random',
  'dataManager',
  'import',
  'export',
  'backup',
  'restore',
  'cloud',
  'sync',
  'prompts',
  'glm',
];

async function assembleSettings(html) {
  const panels = [];
  for (const key of SETTINGS_TABS) {
    const file = join(SRC, `settings-panel-${key}.html`);
    if (!(await exists(file))) continue;
    const frag = (await readFile(file, 'utf8')).trim();
    const hidden = key === 'ai' ? '' : ' hidden';
    // 面板自带 .settings-panel-content（原应用的类），只在开标签上补标记，不额外包壳
    panels.push(
      frag.replace(
        /^<div class="settings-panel-content"/,
        `<div class="settings-panel-content" data-pv-tab="${key}"${hidden}`
      )
    );
  }
  if (panels.length < 2) return html;

  // 用函数式替换，避免面板正文里的 $& 之类被当成替换模式
  return html.replace(
    /(<main class="settings-content"[^>]*>)[\s\S]*?(<\/main>)/,
    (_m, open, close) => open + panels.join('') + close
  );
}

async function buildCss() {
  const dir = join(main, 'dist', 'assets');
  let files = [];
  try {
    files = (await readdir(dir)).filter((f) => f.endsWith('.css')).sort();
  } catch {
    files = [];
  }

  // Vercel 上读不到本机的主项目 —— 这不是错误，public/app/app.css 已经入库了，直接用。
  // 只有本地（主项目在）才重新拼。缺了这段，线上构建会直接挂掉。
  if (!files.length) {
    const existing = join(OUT, 'app.css');
    if (await exists(existing)) {
      return { count: 0, bytes: (await stat(existing)).size, skipped: true };
    }
    throw new Error(`找不到主项目 CSS：${dir}\n请先在主项目执行 npm run build`);
  }

  const parts = [];
  for (const f of files) parts.push(await readFile(join(dir, f), 'utf8'));
  const css = `/* 记忆库 · 由主项目 dist 的生产 CSS 原样拼接（build-preview.mjs） */\n${parts.join('\n')}\n`;
  await writeFile(join(OUT, 'app.css'), css, 'utf8');
  return { count: files.length, bytes: Buffer.byteLength(css), skipped: false };
}

async function buildHtml() {
  const apk = await readApkInfo();
  const blocks = [];
  for (const s of SCREENS) {
    let raw = await readFile(join(SRC, `${s.id}.html`), 'utf8');
    if (s.id === 'settings') raw = await assembleSettings(raw);
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
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="stylesheet" href="/app/app.css" />
    <link rel="stylesheet" href="/app/demo.css" />
</head>
  <body>
${blocks.join('\n')}

    <!-- 开屏说明：默认就在屏幕正中，不自动消失。关掉之后本次会话不再出现 -->
    <div class="pv-mask" id="pvMask" role="dialog" aria-modal="true" aria-labelledby="pvTitle">
      <div class="pv-card">
        <span class="pv-badge">界面预览</span>
        <h2 class="pv-title" id="pvTitle">这里只有长相，没有逻辑</h2>
        <p class="pv-text">下面这 7 屏是从 Android 版真实抓下来的界面，<b>数据是编的，按钮按下去不会真的干活</b>。点底部图标或首页快捷卡片可以切页；Chat 那屏要从左上角菜单展开侧栏、再点「退出」才能回来。</p>
        <a class="pv-btn pv-btn-main" href="/download/${apk.file}" download>
          下载 APK · ${apk.label}
        </a>
        <button class="pv-btn pv-btn-ghost" id="pvGo" type="button">先看看界面</button>
        <p class="pv-foot">Android 5.1 以上 · 不用注册 · 断网能用</p>
      </div>
    </div>
    <button class="pv-reopen" id="pvReopen" type="button" title="界面预览说明" aria-label="界面预览说明" hidden>?</button>
    <script src="/app/demo.js"></script>
  </body>
</html>
`;
  await writeFile(join(OUT, 'index.html'), html, 'utf8');
  return Buffer.byteLength(html);
}

await mkdir(OUT, { recursive: true });
const css = await buildCss();
const htmlBytes = await buildHtml();
console.log(
  css.skipped
    ? `↷ 找不到主项目 dist，沿用已入库的 app.css（${(css.bytes / 1024).toFixed(1)} KB）`
    : `✓ app.css  ← ${css.count} 个文件，${(css.bytes / 1024).toFixed(1)} KB`
);
console.log(`✓ index.html ← ${SCREENS.length} 屏，${(htmlBytes / 1024).toFixed(1)} KB`);
console.log('  预览：npm run dev 后打开 /app/');
