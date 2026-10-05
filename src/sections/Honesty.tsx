import { Reveal } from '../components/Reveal';
import { HONESTY } from './copy';
import './Honesty.css';

export function Honesty() {
  return (
    <section className="sec hon" id="honesty">
      <div className="shell">
        <Reveal>
          <span className="eyebrow">
            <span className="no">05</span>
            <em>诚实清单</em>
          </span>
        </Reveal>

        <div className="hon-grid">
          <Reveal className="hon-left">
            <h2 className="h2">
              它做不到的
              <br />
              五件事。
            </h2>
            <p className="lede hon-lede">
              大部分产品页只在讲自己有什么。这一节反着来 ——
              因为一个你事先知道缺点的东西，才值得被信任。
            </p>
            <p className="mono hon-stamp">— 以下是全部已知的硬伤，没有藏起来的第六条 —</p>
          </Reveal>

          <ol className="hon-list">
            {HONESTY.map((h, i) => (
              <Reveal tag="li" key={h.title} delay={i * 70} className="hon-item">
                <span className="mono hon-no">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="hon-t">{h.title}</h3>
                  <p className="hon-b">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={100}>
          <p className="hon-close">
            看完这些，如果你还想要它 ——
            <span className="mark">那它大概真的适合你</span>。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
