import { Reveal } from '../components/Reveal';
import { Butterfly } from '../components/Butterfly';
import { HeroDemo } from './HeroDemo';
import { APP_SIZE_NOTE } from './copy';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-amb" aria-hidden="true">
        <Butterfly className="amb amb-1" size={26} />
        <Butterfly className="amb amb-2" size={15} color="var(--blue-deep)" />
        <Butterfly className="amb amb-3" size={19} />
        <Butterfly className="amb amb-4" size={12} color="var(--blue-deep)" />
      </div>

      <div className="shell hero-grid">
        <div className="hero-copy">
          <Reveal className="hero-eyebrow">
            <span className="eyebrow">
              <span className="no">01</span>
              <em>一个不会帮你整理的私人记忆库</em>
            </span>
          </Reveal>

          <h1 className="display hero-title">
            <Reveal tag="span" mask className="line">
              把过去，
            </Reveal>
            <Reveal tag="span" mask className="line" delay={130}>
              还给你。
            </Reveal>
          </h1>

          <Reveal delay={300} className="hero-sub">
            <p className="lede">
              你在某个深夜随手扔进去的一句话，
              <br />
              会在某一天，自己回来找你。
            </p>
          </Reveal>

          <Reveal delay={420} className="hero-meta mono">
            {APP_SIZE_NOTE.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </Reveal>
        </div>

        <div className="hero-demo-wrap">
          <Reveal delay={220}>
            <HeroDemo />
          </Reveal>
        </div>
      </div>

      <div className="hero-foot shell">
        <span className="mono dim">往下看 · 它为什么值得存在</span>
        <span className="hero-rule" aria-hidden="true" />
      </div>
    </section>
  );
}
