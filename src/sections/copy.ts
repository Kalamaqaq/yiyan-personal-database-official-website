/** 全站共用的短文案，集中一处方便校字 */

export const APP_SIZE_NOTE: string[] = [
  '本地优先',
  '无需账号',
  'AI 只建议不动手',
  'Android · 12.6 MB · 免费',
];

export const NOT_DO: { title: string; body: string }[] = [
  {
    title: '不替你自动打标签',
    body:
      'AI 会给出建议，但按下确认键的永远是你。一个连自己的东西都不经过自己手的数据库，不配叫「记录」。',
  },
  {
    title: '不逼你分类归档',
    body:
      '没有预设的目录树，没有必须归位的文件夹。标签自由生长，线自己连。整理从来不是目的，只是某些人的爱好。',
  },
  {
    title: '不把内容交给我们的服务器',
    body:
      '数据存在你自己的 SQLite 里，AI 用你自己填的 Key。云端备份是可选项，而且只有你能决定它通向哪里。',
  },
];

export const MECHANICS: {
  no: string;
  title: string;
  body: string;
  note?: string;
}[] = [
  {
    no: 'M-01',
    title: '加权随机：让旧的浮上来',
    body:
      '星标 ×2、五天内用过的 ×2，倍数是相加的。所以一条被你标过星又刚用过的碎片，被翻出来的机会是普通碎片的 3 倍 —— 你越在意什么，它越容易再遇到你。',
    note: '星标 +1 · 近期 +1 → 权重 3.0',
  },
  {
    no: 'M-02',
    title: '连线：不分类的整理',
    body:
      '两条没关系的东西，也可以连起来，不需要理由、不需要命名。AI 可以帮你找候选，但要不要连，永远是你说。',
    note: '双向 · 无理由 · 手动确认',
  },
  {
    no: 'M-03',
    title: '本地优先：数据在你手里',
    body:
      'SQLite 存在你的设备上，安装包内不含任何密钥。断网照样能写、能查、能抽卡。云备份和 AI 是需要时才打开的开关，不是入场条件。',
    note: 'SQLite · 无账号 · 离线可用',
  },
  {
    no: 'M-04',
    title: '顺手的地方也没落下',
    body:
      '待办带 0–24 点的时间轴与倒计时；备忘录是 Obsidian 式的实时预览（光标那行看源码）；决定不了吃什么的时候，还有一个会转的盘子。',
    note: '21 个页面 · 待办 / 备忘录 / 转盘',
  },
];

export const HONESTY: { title: string; body: string }[] = [
  {
    title: '没有 iOS 版',
    body: '只有 Android 和 Windows。没有计划，也不打算假装有。',
  },
  {
    title: '云端备份要你自己填一个 token',
    body:
      '它走我搭的中转站，token 你手动填一次。备份含条目与附件，但备忘录里的图片存在本机 IndexedDB，不会跟着上云。',
  },
  {
    title: 'AI 要你自己准备 Key',
    body:
      'DeepSeek、硅基流动，或者只用免费的 GLM 池。没有内置额度，也没有「一键开通」——这换来的是你的内容不经过我。',
  },
  {
    title: '源码是 CC BY-NC 4.0',
    body: '可以读、可以改、可以自己搭一份。但不能拿去商用。',
  },
  {
    title: '桌面版还停在旧版本',
    body: '安装包是 2.0.4 时代的，比 Android 版旧了一大截。目前只推荐用 Android。',
  },
];
