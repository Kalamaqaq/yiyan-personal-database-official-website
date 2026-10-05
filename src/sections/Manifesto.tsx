import { Reveal } from '../components/Reveal';
import { NOT_DO } from './copy';
import './Manifesto.css';

export function Manifesto() {
  return (
    <section className="sec mani" id="manifesto">
      <div className="shell">
        <Reveal>
          <span className="eyebrow">
            <span className="no">02</span>
            <em>立场</em>
          </span>
        </Reveal>

        <h2 className="display mani-title">
          <Reveal tag="span" mask className="line">
            整理，
          </Reveal>
          <Reveal tag="span" mask className="line" delay={130}>
            是<span className="mark">遗忘</span>的开始。
          </Reveal>
        </h2>

        <div className="mani-body">
          <Reveal delay={120}>
            <p className="lede">
              每个笔记软件都在教你如何归得更整齐。可你回头想想：上一次打开那些整理得漂漂亮亮的文件夹，
              是什么时候？
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="lede">
              分类是一种提前的判断。你得在还没有想清楚之前，就决定它属于哪里 ——
              而大多数值得留下来的东西，恰恰是你当时想不通的那种。
            </p>
            <p className="mani-pull">
              「先把话说难听，再改好听」——
              <br />
              这句话本身就不属于任何一个文件夹。
            </p>
          </Reveal>
        </div>

        <div className="mani-not">
          {NOT_DO.map((item, i) => (
            <Reveal key={item.title} delay={i * 110} className="not-card card">
              <span className="not-x mono">不做</span>
              <h3 className="h3">{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mani-close">
            所以这里没有「全部整理」。只有一件事反复发生 ——
            <span className="mark">它自己回来找你</span>。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
