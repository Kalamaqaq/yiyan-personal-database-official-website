import { Reveal } from '../components/Reveal';
import { DotCluster, Star } from '../components/Geo';
import { SPECS } from './copy';
import './SpecSheet.css';

const ACCENT: Record<string, string> = {
  pink: 'var(--pink)',
  cyan: 'var(--cyan)',
  yellow: 'var(--yellow)',
};

export function SpecSheet() {
  return (
    <section className="sec spec" id="specs">
      <div className="spec-deco" aria-hidden="true">
        <DotCluster className="sd sd1" size={104} color="var(--violet)" />
        <Star className="sd sd2" size={44} color="var(--pink)" />
      </div>

      <div className="shell">
        <Reveal>
          <span className="eyebrow">
            <span className="no">03</span>
            <em>参数</em>
          </span>
        </Reveal>

        <h2 className="h2 spec-title">
          <Reveal tag="span" mask className="line">
            极致优化＋实用主义．
          </Reveal>
          <Reveal tag="span" mask className="line" delay={120}>
            长期用，不卡顿
          </Reveal>
        </h2>

        <dl className="spec-list">
          {SPECS.map((s, i) => (
            <Reveal tag="div" key={s.k} delay={(i % 4) * 60} className="spec-row">
              <dt
                className="spec-k"
                style={{ background: s.accent ? ACCENT[s.accent] : 'var(--panel-3)' }}
              >
                {s.k}
              </dt>
              <dd className="spec-v">{s.v}</dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={80}>
          <p className="spec-note mono">— 就这些。没有藏起来的第九条，也没有小字条款。 —</p>
        </Reveal>
      </div>
    </section>
  );
}
