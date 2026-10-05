import { Reveal } from '../components/Reveal';
import { Butterfly } from '../components/Butterfly';
import './NightLibrary.css';

type Beat = { t: 'p' | 'beat' | 'sig' | 'open'; text: string };

const LETTER: Beat[] = [
  { t: 'open', text: '写给深夜打开这个页面的人' },
  { t: 'p', text: '我不是一家公司。' },
  {
    t: 'p',
    text: '这件事没有团队，没有融资，没有增长目标 —— 只有一个人，一台用旧了的电脑，和一个他不想弄丢的自己。',
  },
  { t: 'p', text: '起因很小。' },
  {
    t: 'p',
    text: '某天我翻到三年前的一条备忘录，里面写着一句我完全不记得自己想过的话。那感觉很怪 —— 像收到一封过去的自己寄来的信，而写信的人已经不在了。',
  },
  { t: 'p', text: '所以它从头到尾只解决一件事：' },
  { t: 'beat', text: '不是「怎么记得更牢」，是「怎么让它重新出现」。' },
  { t: 'p', text: '它不整理。它不归纳。它不替你总结人生。' },
  { t: 'beat', text: '它只记得。' },
  {
    t: 'p',
    text: '然后在某个你毫无防备的深夜，把你说过的话，还给你。',
  },
  { t: 'p', text: '如果你也用得上，拿去。不用付钱，也不用感谢。' },
  {
    t: 'p',
    text: '你只要还愿意在深夜里写下点什么，这座图书馆的灯就不会关。',
  },
  { t: 'sig', text: '守夜人' },
];

export function NightLibrary() {
  return (
    <section className="sec keeper" id="keeper">
      <div className="keeper-bg" aria-hidden="true">
        <span className="lamp" />
      </div>

      <div className="shell">
        <Reveal className="keeper-top">
          <span className="eyebrow">
            <span className="no">04</span>
            <em>守夜人</em>
          </span>
        </Reveal>

        <Reveal className="letterhead" delay={80}>
          <img src="./mascot-192.png" alt="守夜人的头像" width={76} height={76} loading="lazy" />
          <div>
            <p className="letterhead-name">守夜人</p>
            <p className="mono letterhead-line">一个人 · 一台电脑 · 一个不想弄丢的自己</p>
          </div>
        </Reveal>

        <div className="letter">
          {LETTER.map((b, i) => {
            if (b.t === 'open')
              return (
                <Reveal key={i} className="l-open" tag="h2">
                  <span className="h2">{b.text}</span>
                </Reveal>
              );
            if (b.t === 'sig')
              return (
                <Reveal key={i} className="l-sig">
                  <Butterfly size={16} />
                  <span>
                    <em>{b.text}</em>
                    <i className="mono">某个不记得几点的凌晨</i>
                  </span>
                </Reveal>
              );
            return (
              <Reveal
                key={i}
                tag="p"
                className={b.t === 'beat' ? 'l-beat' : 'l-p'}
                threshold={0.05}
              >
                {b.text}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
