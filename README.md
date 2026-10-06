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
├─ components/    顶栏、页脚、进度线、孟菲斯几何件、进场包装器
├─ sections/      六个版块，各自的文案与样式就近放置
│  ├─ Hero        首屏：一句钩子 + 可亲手投喂的加权抽卡机
│  ├─ SixThings   它其实是六个小工具（讲动作，不讲立场）
│  ├─ SpecSheet   参数摆在这，不用你猜（规格表）
│  ├─ Maker       谁做的（一张名片，替代煽情信）
│  ├─ Download    拿去用
│  └─ Closing     没了。
└─ styles/        设计令牌与基础版式
public/
├─ app/           /app/ 界面预览（静态 7 屏），由 build-preview.mjs 生成
├─ download/      签名 APK，由 sync-apk.mjs 同步
├─ mascot-*.png   图标上的那位（圆框放大版）
└─ og.jpg         社交分享图
preview-source/
└─ screens/       从真实 App 抓下来的 7 屏 DOM（预览的原料）
scripts/
├─ build-preview.mjs   原料 + 主项目 CSS → public/app/
└─ sync-apk.mjs        主项目 release/ → public/download/
```

## 视觉与文案规格（改之前先读）

**风格**：暗色孟菲斯（80s 后现代）。暖调深炭灰 `#17120f` 打底，粉 `#ff2e88` / 青 `#12e6c8` /
黄 `#ffd400` 三色霓虹撞色，纯色**硬阴影**（永不带模糊），几何色块拼贴，不规则波点，
锯齿色带，20px 胶囊按钮（霓虹填充 + 左上角塑料高光），粗体几何无衬线 + 白色正文。

**文案三条铁律**（这是第一版翻车换来的）：
1. **不讲立场，只讲动作。** 「我不做什么」对读者毫无意义，他只想知道这东西能干嘛。
2. **不跟任何同类产品比。** 读者不在比价的场景里，比较只会让他一头雾水。
3. **不抒情。** 「我不是一家公司 / 没有团队 / 没有融资」是 AI 文案的标准套路，一律删掉。
   留下具体数字、具体手感、一点自嘲。

**两条工程底线**：不引入 Web 字体（中文用系统黑体加粗，拉丁与数字走 Arial Black），
不引入任何第三方 CDN（含统计脚本）。

## 本地开发

```bash
npm install
npm run dev          # http://127.0.0.1:5199
npm run build        # 产物在 dist/
npm run preview      # 预览构建结果
```

## /app/ 界面预览（静态复刻，不是能用的网页版）

`public/app/` 是官网上的「看看界面长什么样」那一页。它**故意不做成能用的应用**：

- 它由 7 屏**从真实 App 抓下来的 DOM**组成（录入 / 随机 / 待办 / Chat / 设置 / 决定转盘 / 备忘录），
  CSS 直接把主项目 `dist/assets/*.css` 原样拼接，所以是**逐像素级一致**（实测平均偏差 < 1.5%，
  `random` 那 5% 是因为真机每次渲染都重新抽卡，属于内容不同而非版式不同）。
- 全部算下来 **240 KB**。而主项目的真身 Web 构建是 2.8 MB —— 光 SQLite 的 `sql-wasm.wasm` 就 660 KB。
  既然这一页只是「拿来看的」，就没必要拖着数据库走。
- 唯一的脚本是 `demo.js`（3 KB）：切屏（走 hash，浏览器返回键可用）、转盘能转、首次提示一次。

重新生成：

```bash
npm run build:preview     # preview-source/screens/* + 主项目 dist/assets/*.css → public/app/
```

主项目的界面改了以后，需要重抓那 7 屏 DOM（用技能 `zero-dep-cdp-verify` 里的 CDP 客户端
写一个「灌数据 → 逐屏抓 `#root.innerHTML`」的脚本），覆盖 `preview-source/screens/`，再跑上面的命令。

## 同步安装包

`public/download` **不要手改**，它来自主项目 `release/`：

```bash
npm run sync:apk                      # 使用默认主项目路径
node scripts/sync-apk.mjs <主项目路径>  # 或显式指定
```

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
6. **预览页不许冒充可用的应用。** `/app/` 是静态的，页面里要明说，下载区也要明说 ——
   一旦让人以为「装了才知道原来网页版也能用」，这条就破了。

## 许可

站点代码随主项目采用 [CC BY-NC 4.0](../LICENSE) 协议，不可商用。
