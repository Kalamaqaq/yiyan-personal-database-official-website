# 记忆库 · 官方网站

> 把过去，还给你。

「记忆库」是 [yiyan-personal-database](https://github.com/sideonkeibulllll/yiyan-personal-database) 的官方网站。
一个不会帮你整理的私人记忆库 —— 你在深夜随手扔进去的碎片，会在某一天自己回来找你。

---

## 这个仓库是什么

一个**纯静态**单页站点，部署在 Vercel。没有后端、没有数据库、没有统计脚本、没有 Cookie。
访问者的浏览器不向任何第三方发起请求 —— 全站零 Web 字体、零 CDN 依赖，这是刻意的取舍：
目标读者在国内网络环境下，任何境外字体或脚本都是首屏风险。

## 技术栈

| 层 | 选型 | 理由 |
|---|---|---|
| 构建 | Vite 5 | 产物小、构建快 |
| 视图 | React 18 + TypeScript | 首屏有一个真正的交互演示，需要状态管理 |
| 样式 | 手写 CSS（CSS 变量） | 不引入 UI 框架，避免生成「一眼就是模板」的观感 |
| 字体 | 系统字体栈 | 中文 Web 字体动辄好几 MB，收益远小于代价 |
| 动效 | CSS transition/animation + IntersectionObserver | 不引入动画库，主线程零负担 |
| 托管 | Vercel（纯静态） | 免费、全球 CDN |

## 目录

```
src/
├─ data/          站点事实源与演示数据（所有数字都必须可被主仓库验证）
├─ components/    顶栏、页脚、进度线、蝴蝶符号、进场包装器
├─ sections/      七个版块，各自的文案与样式就近放置
│  ├─ Hero        首屏：可亲手投喂 + 加权抽卡的交互演示
│  ├─ Manifesto   立场：整理，是遗忘的开始
│  ├─ Mechanics   机制：加权随机 / 连线 / 本地优先 / 顺手的地方
│  ├─ NightLibrary 守夜人的信
│  ├─ Honesty     诚实清单：它做不到的五件事
│  ├─ Download    下载与安装说明
│  └─ Closing     落点
└─ styles/        设计令牌与基础版式
public/
├─ app/           主项目 Web 构建的镜像（免安装试用），由脚本同步
├─ download/      签名 APK，由脚本同步
├─ assets/        sql-wasm.wasm（jeep-sqlite 走绝对路径 /assets 取它）
├─ mascot-*.png   吉祥物「值班猫」
└─ og.jpg         社交分享图
```

## 本地开发

```bash
npm install
npm run dev          # http://127.0.0.1:5199
npm run build        # 产物在 dist/
npm run preview      # 预览构建结果
```

## 同步主项目的产物

`public/app` 与 `public/download` **不要手改**，它们来自主仓库：

```bash
npm run sync:app                       # 使用默认主项目路径
node scripts/sync-app.mjs <主项目路径>   # 或显式指定
```

同步脚本会：
1. 把主项目 `dist/` 整体搬到 `public/app/`（主项目 `base: './'`，因此可任意子路径加载）
2. 修正 index.html 里那条绝对路径的 favicon
3. 把 `sql-wasm.wasm` 放到站点根 `assets/` 与 `app/assets/`（jeep-sqlite 取绝对路径）
4. 从 `release/` 里挑版本最高的签名包放进 `public/download/`

> ⚠️ 换了 App 版本号之后，必须同步修改 `src/data/site.ts` 的
> `APK_FILE` / `APK_BYTES` / `APK_SHA256` / `APP_VERSION` 四项。
> 官网宁可少写一个数字，也不写一个对不上的数字。

## 部署到 Vercel

仓库已含 `vercel.json`（APK 走 `application/octet-stream` + `attachment`，
静态资源长缓存）。两种方式任选：

**A. 命令行**
```bash
npx vercel --prod
```

**B. Git 集成（推荐，之后每次 push 自动发布）**
在 Vercel 里 Import 本仓库 → Framework 选 **Vite** → Build `npm run build` → Output `dist`。

## 几条不能破的规矩

1. **不许写查不到出处的数字。** 版本、体积、校验值、平台支持，全部对得上主仓库。
2. **不许承诺没有的功能。** 没有 iOS；云备份要自填 token 且不含备忘录图片；
   AI 要自备 Key；桌面版停在 2.0.4。
3. **AI 只建议，不动手。** 这是产品的骨气，也是官网上必须反复出现的一句话。
4. **不引入境外 CDN 与 Web 字体。**
5. **不加统计脚本。** 页脚已经写明「本站不收集任何数据」，就得是真的。

## 许可

站点代码随主项目采用 [CC BY-NC 4.0](../LICENSE) 协议，不可商用。
