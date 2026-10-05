import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './sections/Hero';
import { SixThings } from './sections/SixThings';
import { SpecSheet } from './sections/SpecSheet';
import { Maker } from './sections/Maker';
import { DownloadSection } from './sections/Download';
import { Closing } from './sections/Closing';

/**
 * 记忆库官网 · 单页叙事
 *
 * 顺序即说服路径：
 *   一句钩子 + 一台能亲手玩的抽卡机（Hero）
 *   → 它其实是六个小工具（具体动作，不讲立场）
 *   → 参数摆在这，不用你猜（规格表，替代「我不做什么」）
 *   → 谁做的（一张名片，替代那封煽情信）
 *   → 拿去用
 *   → 没了。
 */
export function App() {
  return (
    <>
      <a className="skip" href="#hero">
        跳到正文
      </a>
      <ScrollProgress />
      <TopBar />
      <main>
        <Hero />
        <SixThings />
        <SpecSheet />
        <Maker />
        <DownloadSection />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
