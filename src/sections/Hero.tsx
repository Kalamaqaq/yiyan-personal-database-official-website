import { Reveal } from '../components/Reveal';
import { HeroDemo } from './HeroDemo';
import { ZigzagBand, DotCluster, Star, Ring, Triangle, Plus, Squiggle } from '../components/Geo';
import { HERO } from './copy';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero" id="hero">
      {/* 几何拼贴：贴纸一样撒在版面四周，全部 aria-hidden */}
      <div className="hero-deco" aria-hidden="true">
        <DotCluster className="d d1" size={120} color="var(--pink)" />
        <Star className="d d2" size={62} color="var(--yellow)" />
        <Ring className="d d3" size={54} color="var(--cyan)" />
        <Triangle className="d d4" size={40} color="var(--violet)" />
        <Plus className="d d5" size={30} color="var(--cyan)" />
        <Squiggle className="d d6" width={130} height={22} color="var(--pink)" />
        <DotCluster className="d d7" size={80} color="var(--cyan)" />
      </div>

      <div className="shell hero-grid">
        <div className="hero-copy">
          <Reveal className="hero-badges">
            <div className="hero-badges-row">
              {HERO.badge.map((b, i) => (
                <span className={`tag ${i === 0 ? 'tag-pink' : i === 1 ? 'tag-cyan' : 'tag-yellow'}`} key={b}>
                  {b}
                </span>
              ))}
            </div>
          </Reveal>

          <h1 className="display hero-title">
            <Reveal tag="span" mask className="line">
              扔进来，
            </Reveal>
            <Reveal tag="span" mask className="line" delay={130}>
              然后<span className="mark">忘掉它</span>。
            </Reveal>
          </h1>

          <Reveal delay={280} className="hero-sub">
            <p className="lede">
              {HERO.sub[0]}
              <br />
              {HERO.sub[1]}
            </p>
          </Reveal>

          <Reveal delay={380} className="hero-hint">
            <span className="mono">{HERO.demoHint}</span>
          </Reveal>
        </div>

        <div className="hero-demo-wrap">
          <Reveal delay={180}>
            <HeroDemo />
          </Reveal>
        </div>
      </div>

      <div className="hero-zz" aria-hidden="true">
        <ZigzagBand color="var(--pink)" />
      </div>
    </section>
  );
}
