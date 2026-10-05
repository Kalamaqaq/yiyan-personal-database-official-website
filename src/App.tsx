import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './sections/Hero';
import { Manifesto } from './sections/Manifesto';
import { Mechanics } from './sections/Mechanics';
import { NightLibrary } from './sections/NightLibrary';
import { Honesty } from './sections/Honesty';
import { DownloadSection } from './sections/Download';
import { Closing } from './sections/Closing';

/**
 * 记忆库官网 · 单页叙事
 *
 * 版块顺序即情绪曲线：
 *   一封自我介绍（Hero，可亲手操作）
 *   → 一句立场（整理，是遗忘的开始）
 *   → 它怎么做到（机制）
 *   → 谁在守夜（信）
 *   → 它做不到什么（诚实）
 *   → 于是你可以拿走了（下载）
 *   → 灯不会关（落点）
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
        <Manifesto />
        <Mechanics />
        <NightLibrary />
        <Honesty />
        <DownloadSection />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
