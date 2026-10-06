/// <reference types="vite/client" />

/**
 * Vite 的 `?raw` 导入：把文件当字符串读进来（用于把 SVG 内联进 DOM）。
 */
declare module '*?raw' {
  const content: string;
  export default content;
}