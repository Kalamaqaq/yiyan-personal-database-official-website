import { Reveal } from '../components/Reveal';
import { MECHANICS } from './copy';
import './Mechanics.css';

/** M-01 · 权重条：倍数相加的直观表达 */
function WeightBars() {
  const rows = [
    { label: '普通碎片', w: 1 },
    { label: '星标 或 近期', w: 2 },
    { label: '星标 + 近期', w: 3 },
  ];
  return (
    <div className="viz viz-weights">
      {rows.map((r) => (
        <div className="wrow" key={r.label}>
          <span className="wlabel mono">{r.label}</span>
          <span className="wbar" style={{ '--w': r.w } as React.CSSProperties} />
          <span className="wnum mono">{r.w.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
}

/** M-02 · 连线：两条没有关系的东西之间，一条不需要理由的线 */
function LinkViz() {
  return (
    <svg className="viz" viewBox="0 0 260 96" role="img" aria-label="两条碎片之间建立连线">
      <rect x="6" y="20" width="86" height="56" rx="10" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.14)" strokeWidth="0.5" />
      <rect x="168" y="20" width="86" height="56" rx="10" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.14)" strokeWidth="0.5" />
      <path d="M92 48h76" stroke="#5b84ff" strokeWidth="1.2" strokeDasharray="4 4" />
      <circle cx="130" cy="48" r="10" fill="#0b0f1a" stroke="rgba(91,132,255,.7)" strokeWidth="0.5" />
      <text x="130" y="52" textAnchor="middle" fontSize="10" fill="#8fb0ff" fontFamily="monospace">连</text>
      <text x="49" y="52" textAnchor="middle" fontSize="11" fill="#a9b1c5" fontFamily="monospace">碎片 A</text>
      <text x="211" y="52" textAnchor="middle" fontSize="11" fill="#a9b1c5" fontFamily="monospace">碎片 B</text>
    </svg>
  );
}

/** M-03 · 本地优先：数据在方框里，云是虚线且被划掉 */
function LocalViz() {
  return (
    <svg className="viz" viewBox="0 0 260 96" role="img" aria-label="数据保存在你自己的设备里">
      <rect x="6" y="16" width="132" height="64" rx="12" fill="rgba(91,132,255,.09)" stroke="rgba(91,132,255,.45)" strokeWidth="0.5" />
      <text x="72" y="40" textAnchor="middle" fontSize="11" fill="#a9b1c5" fontFamily="monospace">你的设备</text>
      <text x="72" y="62" textAnchor="middle" fontSize="13" fill="#eef0f7" fontFamily="monospace">SQLite</text>
      <rect x="158" y="24" width="96" height="48" rx="12" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="0.5" strokeDasharray="4 4" />
      <text x="206" y="53" textAnchor="middle" fontSize="11" fill="#4b5266" fontFamily="monospace">云 · 可选</text>
      <path d="M158 24l96 48" stroke="rgba(255,255,255,.16)" strokeWidth="0.5" />
    </svg>
  );
}

/** M-04 · 顺手的地方：一个自己会转的盘子 */
function WheelViz() {
  const colors = ['#5b84ff', '#d9a85c', '#2b47a8', '#8fb0ff', 'rgba(255,255,255,.18)'];
  return (
    <svg className="viz wheel-mini" viewBox="0 0 120 120" role="img" aria-label="决定转盘">
      <g className="wheel-spin">
        {colors.map((c, i) => {
          const a0 = (i / colors.length) * Math.PI * 2;
          const a1 = ((i + 1) / colors.length) * Math.PI * 2;
          const r = 44;
          const x0 = 60 + r * Math.cos(a0);
          const y0 = 60 + r * Math.sin(a0);
          const x1 = 60 + r * Math.cos(a1);
          const y1 = 60 + r * Math.sin(a1);
          const large = a1 - a0 > Math.PI ? 1 : 0;
          return (
            <path
              key={c + i}
              d={`M60 60L${x0} ${y0}A${r} ${r} 0 ${large} 1 ${x1} ${y1}Z`}
              fill={c}
              opacity={i === 4 ? 0.5 : 0.9}
            />
          );
        })}
      </g>
      <circle cx="60" cy="60" r="9" fill="#070a12" stroke="rgba(255,255,255,.22)" strokeWidth="0.5" />
      <path d="M60 8l5 10h-10Z" fill="#f0ce92" />
    </svg>
  );
}

const VIZ = [WeightBars, LinkViz, LocalViz, WheelViz];

export function Mechanics() {
  return (
    <section className="sec mech" id="mechanics">
      <div className="shell">
        <Reveal>
          <span className="eyebrow">
            <span className="no">03</span>
            <em>机制 · 它到底怎么工作</em>
          </span>
        </Reveal>

        <h2 className="h2 mech-title">
          <Reveal tag="span" mask className="line">
            它不排序，
          </Reveal>
          <Reveal tag="span" mask className="line" delay={120}>
            它只让重要的东西更容易被遇上。
          </Reveal>
        </h2>

        <div className="mech-grid">
          {MECHANICS.map((m, i) => {
            const Viz = VIZ[i];
            return (
              <Reveal key={m.no} delay={(i % 2) * 100} className="mech-card card">
                <div className="mech-head">
                  <span className="mono mech-no">{m.no}</span>
                  {m.note && <span className="mono mech-note">{m.note}</span>}
                </div>
                <h3 className="h3">{m.title}</h3>
                <p className="mech-body">{m.body}</p>
                <div className="mech-viz">
                  <Viz />
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={80}>
          <p className="mech-close mono">
            21 个页面 · 5 个底部入口 · 单机运行 · 无账号体系
          </p>
        </Reveal>
      </div>
    </section>
  );
}
