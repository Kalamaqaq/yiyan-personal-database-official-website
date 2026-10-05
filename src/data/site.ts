/**
 * 站点事实源
 *
 * 原则：这里出现的每一个数字都必须能从主仓库里被验证。
 * 官网可以说得动人，但不能说一句查不到出处的话。
 */

/** 主仓库 release/ 下的最新签名包 */
export const APK_FILE = 'yiyan-personal-database-v2.7.3-release.apk';

/** 13,156,110 字节（sha256sum 实测） */
export const APK_BYTES = 13156110;

export const APK_SHA256 =
  '096dcebc51d9deb13d303c8963044992de0f6d150ee5cf06aaa7ca41c4aea0ec';

/** 本站直链（Vercel 静态托管） */
export const APK_URL_PRIMARY = `./download/${APK_FILE}`;

/** 备用镜像：Cloudflare R2 公开域（来自主仓库 .env 的 VITE_CF_R2_PUBLIC_DOMAIN） */
export const APK_URL_MIRROR = `https://yiyanr2.8765777.xyz/app/${APK_FILE}`;

export const APP_VERSION = '2.7.3';

/** 仓库里第一个提交的日期（主仓库 README 记载的项目创建时间） */
export const FIRST_LIGHT = '2026-07-22T00:00:00+08:00';

export const LINKS = {
  source: 'https://github.com/sideonkeibulllll/yiyan-personal-database',
  websiteRepo:
    'https://github.com/sideonkeibulllll/yiyan-personal-database-official-website',
  issues: 'https://github.com/sideonkeibulllll/yiyan-personal-database/issues',
};

/** 12.55 MB —— 按 MiB 换算，和浏览器显示的体积一致 */
export const APK_SIZE_LABEL = (APK_BYTES / 1024 / 1024).toFixed(1) + ' MB';

/** 图书馆连续亮灯天数：从第一次提交算起，真实计算，不写死 */
export function daysLit(): number {
  const start = new Date(FIRST_LIGHT).getTime();
  return Math.max(1, Math.floor((Date.now() - start) / 86400000) + 1);
}
