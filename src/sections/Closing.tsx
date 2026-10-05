import { Reveal } from '../components/Reveal';
import { Star, DotCluster } from '../components/Geo';
import './Closing.css';

export function Closing() {
  return (
    <section className="closing">
      <div className="closing-deco" aria-hidden="true">
        <Star className="cd cd1" size={46} color="var(--cyan)" />
        <DotCluster className="cd cd2" size={92} color="var(--pink)" />
        <Star className="cd cd3" size={30} color="var(--yellow)" />
      </div>

      <div className="shell">
        <h2 className="display closing-line">
          <Reveal tag="span" mask className="line">
            没了。
          </Reveal>
        </h2>
        <Reveal delay={240}>
          <p className="closing-sub">一个自己用的东西，顺手放上来。要不要都行。</p>
        </Reveal>
      </div>
    </section>
  );
}
