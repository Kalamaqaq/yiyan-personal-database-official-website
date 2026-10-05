/**
 * 同步「网页版试玩」与安装包
 *
 * 官网自己不生产 App。public/app 是主项目 Web 构建的镜像，
 * public/download 里的 APK 是主项目 release/ 的产物 —— 两者都不应该手动复制。
 *
 * 用法：
 *   node scripts/sync-app.mjs [主项目绝对路径]
 *   默认主项目路径见下方 DEFAULT_MAIN。
 */
import { cp, mkdir, readFile, writeFile, access, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const DEFAULT_MAIN = 'C:/Users/tianming/Desktop/test/yiyan-personal-database';

const main = resolve(process.argv[2] ?? DEFAULT_MAIN);
const here = resolve(import.meta.dirname, '..');

const APP_OUT = join(here, 'public', 'app');
const APK_OUT = join(here, 'public', 'download');
const WASM_OUT = join(here, 'public', 'assets');

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/** 主项目的 vite base 是 './'，所以 dist 可以整体搬到任意子路径下 */
async function syncWebApp() {
  const dist = join(main, 'dist');
  if (!(await exists(join(dist, 'index.html')))) {
    throw new Error(`找不到主项目的 Web 构建：${dist}\n请先在主项目执行  npm run build`);
  }

  await mkdir(APP_OUT, { recursive: true });
  await cp(dist, APP_OUT, { recursive: true });

  // 主项目 index.html 里的 favicon 是绝对路径 /vite.svg，搬到子目录会 404
  const idx = join(APP_OUT, 'index.html');
  const html = await readFile(idx, 'utf8');
  await writeFile(idx, html.replace('href="/vite.svg"', 'href="./favicon.svg"'));

  // jeep-sqlite 默认从 /assets 取 wasm（绝对路径），所以站点根下也放一份
  const wasm = join(main, 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');
  if (await exists(wasm)) {
    await mkdir(WASM_OUT, { recursive: true });
    await mkdir(join(APP_OUT, 'assets'), { recursive: true });
    await cp(wasm, join(WASM_OUT, 'sql-wasm.wasm'));
    await cp(wasm, join(APP_OUT, 'assets', 'sql-wasm.wasm'));
  }
  console.log('✓ 网页版已同步 →  public/app');
}

/** release/ 里按版本号排序取最后一个签名包 */
async function syncApk() {
  const rel = join(main, 'release');
  const files = (await readdir(rel)).filter(
    (f) => f.endsWith('-release.apk') && !f.includes('debug')
  );
  if (!files.length) throw new Error(`release/ 里没有找到签名包：${rel}`);

  files.sort((a, b) => {
    const num = (s) => (s.match(/v(\d+\.\d+\.\d+)/)?.[1] ?? '0').split('.').map(Number);
    const [A, B] = [num(a), num(b)];
    for (let i = 0; i < 3; i++) if (A[i] !== B[i]) return A[i] - B[i];
    return 0;
  });

  const latest = files[files.length - 1];
  await mkdir(APK_OUT, { recursive: true });
  await cp(join(rel, latest), join(APK_OUT, latest));
  console.log(`✓ 安装包已同步 →  public/download/${latest}`);
  console.log('\n提醒：换了版本号要同步改 src/data/site.ts 里的');
  console.log('  APK_FILE / APK_BYTES / APK_SHA256 / APP_VERSION 四项。');
}

await syncWebApp();
await syncApk();
