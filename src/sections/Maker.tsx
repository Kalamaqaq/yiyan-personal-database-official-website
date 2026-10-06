import { Reveal } from '../components/Reveal';
import { Star, Squiggle } from '../components/Geo';
import { LINKS } from '../data/site';
import { useUptimeLabel } from '../hooks/useUptime';
import { MAKER } from './copy';
import './Maker.css';

export function Maker() {
  const uptime = useUptimeLabel();

  return (
    <section className="sec maker" id="maker">
      <div className="maker-deco" aria-hidden="true">
        <Star className="md md1" size={52} color="var(--yellow)" />
        <Squiggle className="md md2" width={160} height={22} color="var(--cyan)" />
      </div>

      <div className="shell">
        <Reveal>
          <span className="eyebrow">
            <span className="no">04</span>
            <em>谁做的</em>
          </span>
        </Reveal>

        <h2 className="h2 maker-title">
          <Reveal tag="span" mask className="line">
            谁做的
          </Reveal>
        </h2>

        <Reveal delay={100} className="card-maker-wrap">
          <div className="card-maker">
            <div className="mk-face">
              <img src="./mascot-192.png" alt="作者的头像" width={128} height={128} loading="lazy" />
              <span className="mk-face-cap mono">{uptime}</span>
            </div>

            <div className="mk-body">
              <dl className="mk-rows">
                {MAKER.map((m) => (
                  <div key={m.k}>
                    <dt className="mono">{m.k}</dt>
                    <dd>
                      {m.href ? (
                        <a className="mk-link" href={m.href} target="_blank" rel="noreferrer">
                          {m.v} ↗
                        </a>
                      ) : (
                        m.v
                      )}
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="mono">可以验证</dt>
                  <dd>
                    <a className="mk-link" href={LINKS.source} target="_blank" rel="noreferrer">
                      去看提交记录 ↗
                    </a>
                  </dd>
                </div>
              </dl>

              <p className="mk-close">风带来故事的种子，时间使之发芽。</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
