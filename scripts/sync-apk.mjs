/**
 * 同步安装包
 *
 * 官网自己不生产 App。public/download 里的 APK 来自主项目 release/ —— 不要手动复制。
 *
 * 注意：/app/ 那个界面预览**不走这个脚本**。
 * 它是 preview-source/screens 下的 7 屏静态 DOM，用 `npm run build:preview` 生成，
 * 和主项目的 Web 构建没有关系（那条路要拖 660 KB 的 sql-wasm.wasm）。
 *
 * 用法：
 *   node scripts/sync-apk.mjs [主项目绝对路径]
 */
import { cp, mkdir, readdir, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const DEFAULT_MAIN = 'C:/Users/tianming/Desktop/test/yiyan-personal-database';

const main = resolve(process.argv[2] ?? DEFAULT_MAIN);
const here = resolve(import.meta.dirname, '..');
const APK_OUT = join(here, 'public', 'download');

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

const rel = join(main, 'release');
if (!(await exists(rel))) throw new Error(`找不到主项目的 release/：${rel}`);

const files = (await readdir(rel)).filter(
  (f) => f.endsWith('-release.apk') && !f.includes('debug')
);
if (!files.length) throw new Error(`release/ 里没有签名包：${rel}`);

const semver = (s) => (s.match(/v(\d+\.\d+\.\d+)/)?.[1] ?? '0.0.0').split('.').map(Number);
files.sort((a, b) => {
  const [A, B] = [semver(a), semver(b)];
  for (let i = 0; i < 3; i++) if (A[i] !== B[i]) return A[i] - B[i];
  return 0;
});

const latest = files[files.length - 1];
await mkdir(APK_OUT, { recursive: true });
await cp(join(rel, latest), join(APK_OUT, latest));

const stale = (await readdir(APK_OUT)).filter((f) => f.endsWith('.apk') && f !== latest);
if (stale.length) {
  console.log(`! public/download 里还有 ${stale.length} 个旧包，确认官网不再引用后自行删除：`);
  for (const f of stale) console.log(`    ${f}`);
}

console.log(`✓ 安装包已同步 →  public/download/${latest}`);
console.log('\n提醒：换了版本号要同步改 src/data/site.ts 的');
console.log('  APK_FILE / APK_BYTES / APK_SHA256 / APP_VERSION 四项。');
