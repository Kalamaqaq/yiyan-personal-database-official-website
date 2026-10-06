import { Reveal } from '../components/Reveal';
import { Star, DotCluster } from '../components/Geo';
import scriptMotto from '../assets/script-motto.svg?raw';
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
          <p className="closing-sub">喜欢一个事情就勇敢去做罢</p>
        </Reveal>

        {/* 花体英文：字形已转成 SVG 路径，不依赖任何字体文件 */}
        <Reveal delay={320}>
          <div
            className="closing-script"
            role="img"
            aria-label="Don't care about the worldly gaze, pursue your own light"
            dangerouslySetInnerHTML={{ __html: scriptMotto }}
          />
        </Reveal>

        <Reveal delay={400}>
          <p className="closing-sub closing-sub-cn">
            不必在意世俗的眼光，去追寻属于你自己的光。
          </p>
        </Reveal>
      </div>
    </section>
  );
}