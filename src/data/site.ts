/**
 * 站点事实源
 *
 * 原则：这里出现的每一个数字都必须能从主仓库里被验证。
 * 官网可以说得动人，但不能说一句查不到出处的话。
 */

/** 当前发布的 App 版本（换版本号时这是第一处要改的） */
export const APP_VERSION = '2.7.3';

/** 主仓库 release/ 下的最新签名包 */
export const APK_FILE = 'yiyan-personal-database-v2.7.3-release.apk';

/** 13,156,110 字节（sha256sum 实测） */
export const APK_BYTES = 13156110;

export const APK_SHA256 =
  '096dcebc51d9deb13d303c8963044992de0f6d150ee5cf06aaa7ca41c4aea0ec';

/** 本站直链（Vercel 静态托管） */
export const APK_URL_PRIMARY = `./download/${APK_FILE}`;

/** 备用镜像：Cloudflare R2 公开域（来自主仓库 .env 的 VITE_CF_R2_PUBLIC_DOMAIN）
 *
 * ⚠️ 末尾的 `?v=` 不是装饰，别删：
 * R2 公开域返回的 404 带着 `Cache-Control: max-age=14400`，而 Cloudflare 会把它一起缓存。
 * 于是**只要有人在文件上传前访问过这个路径，之后 4 小时内所有人拿到的都是那个缓存的 404**
 * （实测 `cf-cache-status: HIT`）。把版本号拼进 query 当缓存键，每次发新版都是全新 URL，
 * 既绕开旧 404，也让它永远撞不上。
 *
 * 注意 APP_VERSION 必须声明在这行之前，否则 TS2448（用过才知道疼）。 */
export const APK_URL_MIRROR = `https://yiyanr2.8765777.xyz/app/${APK_FILE}?v=${APP_VERSION}`;

/**
 * 计时起点。页面上的「已运行 N 天 SS 秒」就是从这个时刻开始数的，每秒跳一次。
 * （主仓库第一次提交是 2026-07-22，那个数字已经不展示了，别跟这里搞混。）
 */
export const RUN_SINCE = new Date('2026-10-01T00:00:00+08:00').getTime();

export const LINKS = {
  source: 'https://github.com/sideonkeibulllll/yiyan-personal-database',
  websiteRepo:
    'https://github.com/sideonkeibulllll/yiyan-personal-database-official-website',
  issues: 'https://github.com/sideonkeibulllll/yiyan-personal-database/issues',
  /** 作者平时写字的地方，比 GitHub 更适合「想找到人」这件事 */
  blog: 'https://blog.8765777.xyz',
};

/** 12.55 MB —— 按 MiB 换算，和浏览器显示的体积一致 */
export const APK_SIZE_LABEL = (APK_BYTES / 1024 / 1024).toFixed(1) + ' MB';

export type Uptime = {
  /** 整天天数 */
  days: number;
  /**
   * 当天已经走过的秒数（0–86399）—— 就是那个每秒在跳的数字。
   * 注意是「满天进一」而不是「满分钟进一」：它不会在 59 秒时归零，
   * 而是一路数到 86399，等跨过午夜才把天数 +1、自己回到 0。
   */
  seconds: number;
  totalSeconds: number;
};

/** 纯函数，便于单测；不读时钟以外的任何东西 */
export function elapsedSince(start = RUN_SINCE, now = Date.now()): Uptime {
  const totalSeconds = Math.max(0, Math.floor((now - start) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    seconds: totalSeconds % 86400,
    totalSeconds,
  };
}

export function formatUptime(u: Uptime): string {
  return `已运行 ${u.days} 天 ${u.seconds} 秒`;
}

