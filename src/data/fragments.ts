/**
 * 演示用的记忆碎片
 *
 * 这些是「像真人写下来」的句子，不是营销文案。
 * 权重规则直接照搬产品真实算法（原始提示词.md）：
 *   基础 1 · 星标 +1 · 五天内用过 +1 —— 倍数是相加的。
 * 所以一条「星标 + 最近用过」的碎片权重是 3，是最普通碎片的 3 倍。
 */

export type Fragment = {
  id: string;
  text: string;
  origin: string;
  starred: boolean;
  recent: boolean;
  /** 由规则算出来的权重，不手写 */
  weight: number;
  /** 是否是访客自己投喂进来的 */
  mine?: boolean;
};

export function weightOf(starred: boolean, recent: boolean): number {
  return 1 + (starred ? 1 : 0) + (recent ? 1 : 0);
}

type Seed = Pick<Fragment, 'id' | 'text' | 'origin' | 'starred' | 'recent'>;

const SEEDS: Seed[] = [
  {
    id: 'f1',
    text: '我们高估了表达，低估了被理解。',
    origin: '凌晨三点 · 想到的',
    starred: true,
    recent: false,
  },
  {
    id: 'f2',
    text: '最难过的告别，是那种没有告别的。',
    origin: '读书时抄下来的',
    starred: false,
    recent: true,
  },
  {
    id: 'f3',
    text: '梦见回到老房子，所有的门都变矮了。',
    origin: '记一个梦',
    starred: false,
    recent: false,
  },
  {
    id: 'f4',
    text: '我不是不想努力，我是不知道努力给谁看。',
    origin: '朋友说的',
    starred: true,
    recent: true,
  },
  {
    id: 'f5',
    text: '把「我应该」换成「我想要」，会少掉一半的痛苦。',
    origin: '写给自己的提醒',
    starred: false,
    recent: false,
  },
  {
    id: 'f6',
    text: '习惯是一种温柔的牢笼。',
    origin: '买菜路上',
    starred: false,
    recent: false,
  },
];

export const PRESET_FRAGMENTS: Fragment[] = SEEDS.map((s) => ({
  ...s,
  weight: weightOf(s.starred, s.recent),
}));

/** 访客不知道写什么时，给一句现成的——降低第一个动作的门槛 */
export const STARTER_LINES: string[] = [
  '今天在电梯里突然想到：我好像已经很久没有好好看过天空了。',
  '刚才路过一家很小的书店，闻到旧纸的味道，想起了小学的图书角。',
  '记一下：他说话的时候一直在看窗外，我觉得他其实什么都没在听。',
  '刚刚意识到，我讨厌的不是加班，是没有人问我今天过得怎么样。',
];

export function makeMine(text: string): Fragment {
  return {
    id: 'mine',
    text,
    origin: '你刚刚扔进来的',
    starred: true,
    recent: true,
    weight: weightOf(true, true),
    mine: true,
  };
}
