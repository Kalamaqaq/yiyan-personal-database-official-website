import { Reveal } from '../components/Reveal';
import { Block, Ring, Squiggle, Triangle } from '../components/Geo';
import { JOURNEY } from './copy';
import './Journey.css';

/**
 * 八十七天 —— 项目规模快照 + 诞生记入口
 *
 * 这一屏只做一件事：把八十七天压成四个数，然后放行。
 * 不讲故事，故事在 ./history/ 里。
 */

const SHADOWS = ['var(--pink)', 'var(--cyan)', 'var(--yellow)', 'var(--pink)'];
const TILT = ['-1deg', '0.8deg', '-0.6deg', '1deg'];

export function Journey() {
  return (
    <section className="sec journey" id="journey">
      <div className="jr-deco" aria-hidden="true">
        <Block className="jd jd1" size={96} color="var(--yellow)" />
        <Ring className="jd jd2" size={72} color="var(--cyan)" />
        <Triangle className="jd jd3" size={58} color="var(--pink)" />
        <Squiggle className="jd jd4" width={150} height={20} color="var(--violet)" />
      </div>

      <div className="shell jr-in">
        <Reveal>
          <span className="eyebrow">
            <span className="no">03</span>
            <em>{JOURNEY.eyebrow}</em>
          </span>
        </Reveal>

        <h2 className="h2 jr-title">
          <Reveal tag="span" mask className="line" delay={110}>
            {JOURNEY.title}
          </Reveal>
        </h2>

        <Reveal delay={190}>
          <p className="lede jr-sub">{JOURNEY.sub}</p>
        </Reveal>

        <div className="jr-grid">
          {JOURNEY.stats.map((s, i) => (
            <Reveal key={s.label} delay={250 + i * 80} className="jr-card">
              <div
                className="jr-inner"
                style={{ '--sh': SHADOWS[i], '--tilt': TILT[i] } as React.CSSProperties}
              >
                <span className="jr-val display mono">{s.value}</span>
                <span className="jr-label">{s.label}</span>
                <span className="jr-note mono">{s.note}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={620}>
          <div className="jr-go">
            <a className="btn btn-pink jr-btn" href="./history/">
              {JOURNEY.cta}
              <span className="ar">→</span>
            </a>
            <span className="jr-hint mono">{JOURNEY.hint}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
