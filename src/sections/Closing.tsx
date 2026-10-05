import { Butterfly } from '../components/Butterfly';
import { Reveal } from '../components/Reveal';
import { daysLit } from '../data/site';
import './Closing.css';

export function Closing() {
  return (
    <section className="closing">
      <div className="shell">
        <Reveal>
          <Butterfly size={26} className="closing-b" />
        </Reveal>
        <h2 className="display closing-line">
          <Reveal tag="span" mask className="line">
            这座图书馆的灯，
          </Reveal>
          <Reveal tag="span" mask className="line" delay={140}>
            不会关。
          </Reveal>
        </h2>
        <Reveal delay={300}>
          <p className="closing-sub mono">
            已亮 {daysLit()} 天 · 没有一天是被人催着开的
          </p>
        </Reveal>
      </div>
    </section>
  );
}
