import { Reveal } from '../components/Reveal';
import { SIX } from './copy';
import './SixThings.css';

/* —— 六张小示意图：全部是纯 CSS / 纯 SVG 的极简模型，不做假截图 —— */

function InputMock() {
  return (
    <div className="mock mock-input">
      <span className="mi-field">记录你的想法…</span>
      <span className="mi-send">发送</span>
    </div>
  );
}

function WeightMock() {
  const rows = [
    { l: '普通', w: 1 },
    { l: '星标 或 近期', w: 2 },
    { l: '星标 + 近期', w: 3 },
  ];
  return (
    <div className="mock mock-weights">
      {rows.map((r) => (
        <div className="wr" key={r.l}>
          <span className="wr-l mono">{r.l}</span>
          <span className="wr-bar" style={{ '--w': r.w } as React.CSSProperties} />
          <span className="wr-n mono">{r.w.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
}

function LinkMock() {
  return (
    <svg className="mock" viewBox="0 0 240 76" role="img" aria-label="两条碎片之间建立连线">
      <rect x="2" y="14" width="80" height="48" rx="12" fill="var(--panel-3)" stroke="var(--ink)" strokeWidth="2.5" />
      <rect x="158" y="14" width="80" height="48" rx="12" fill="var(--panel-3)" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M84 38h72" stroke="var(--cyan)" strokeWidth="4" strokeDasharray="7 6" />
      <circle cx="120" cy="38" r="13" fill="var(--yellow)" stroke="var(--bg)" strokeWidth="2.5" />
      <text x="120" y="43" textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="700" fill="#17120f">连</text>
    </svg>
  );
}

function TimelineMock() {
  const blocks = [
    ['var(--pink)', 2, 22],
    ['var(--cyan)', 24, 30],
    ['var(--yellow)', 58, 14],
    ['var(--violet)', 74, 20],
  ] as const;
  return (
    <div className="mock mock-timeline">
      <div className="tl-track">
        {blocks.map(([c, left, w], i) => (
          <span key={i} className="tl-block" style={{ background: c, left: `${left}%`, width: `${w}%` }} />
        ))}
      </div>
      <div className="tl-scale mono">
        <span>0</span>
        <span>6</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
      </div>
    </div>
  );
}

function MemoMock() {
  return (
    <div className="mock mock-memo">
      <p className="mm-src mono">## 今天想到的</p>
      <p className="mm-out">
        <strong>今天想到的</strong>
      </p>
      <p className="mm-out mm-dim">光标那一行看源码，其他行已经渲染好了。</p>
    </div>
  );
}

const MOCKS = [InputMock, WeightMock, LinkMock, TimelineMock, MemoMock];

/** 第 6 张给转盘，单独写是因为它需要动 */
function WheelMock() {
  const colors = ['var(--pink)', 'var(--cyan)', 'var(--yellow)', 'var(--violet)', 'rgba(255,255,255,.22)'];
  return (
    <svg className="mock wheel-mini" viewBox="0 0 120 120" role="img" aria-label="决定转盘">
      <g className="wheel-spin">
        {colors.map((c, i) => {
          const a0 = (i / colors.length) * Math.PI * 2;
          const a1 = ((i + 1) / colors.length) * Math.PI * 2;
          const r = 42;
          const large = a1 - a0 > Math.PI ? 1 : 0;
          return (
            <path
              key={i}
              d={`M60 60L${60 + r * Math.cos(a0)} ${60 + r * Math.sin(a0)}A${r} ${r} 0 ${large} 1 ${
                60 + r * Math.cos(a1)
              } ${60 + r * Math.sin(a1)}Z`}
              fill={c}
            />
          );
        })}
      </g>
      <circle cx="60" cy="60" r="12" fill="var(--bg)" stroke="var(--ink)" strokeWidth="3" />
      <path d="M60 6l7 14H53Z" fill="var(--ink)" />
    </svg>
  );
}

const SHADOWS = ['var(--pink)', 'var(--cyan)', 'var(--yellow)', 'var(--cyan)', 'var(--pink)', 'var(--yellow)'];
const TILT = ['-1.1deg', '0.9deg', '1.3deg', '-0.8deg', '1.1deg', '-1.2deg'];

export function SixThings() {
  const Mocks = [...MOCKS.slice(0, 5), WheelMock];

  return (
    <section className="sec six" id="things">
      <div className="shell">
        <Reveal>
          <span className="eyebrow">
            <span className="no">02</span>
            <em>它能干什么</em>
          </span>
        </Reveal>

        <h2 className="h2 six-title">
          <Reveal tag="span" mask className="line">
            它其实是
          </Reveal>
          <Reveal tag="span" mask className="line" delay={120}>
            六个小工具。
          </Reveal>
        </h2>

        <div className="six-grid">
          {SIX.map((s, i) => {
            const Mock = Mocks[i];
            return (
              <Reveal key={s.no} delay={(i % 3) * 90} className="six-card">
                <div
                  className="six-inner"
                  style={
                    {
                      '--sh': SHADOWS[i],
                      '--tilt': TILT[i],
                    } as React.CSSProperties
                  }
                >
                  <div className="six-head">
                    <span className="six-no mono">{s.no}</span>
                    <span className="six-own mono">{s.own}</span>
                  </div>
                  <h3 className="h3 six-h">{s.title}</h3>
                  <p className="six-b">{s.body}</p>
                  <div className="six-viz">
                    <Mock />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
