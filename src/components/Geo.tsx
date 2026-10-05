/**
 * 孟菲斯几何件
 *
 * 全部是纯 SVG 纯色块，没有渐变也没有模糊 —— 除了按钮上的那道塑料高光，
 * 孟菲斯不接受任何「柔」的东西。颜色一律走 CSS 变量，方便整站换色。
 */

type ShapeProps = { className?: string; size?: number; color?: string };

export function Zigzag({ className = '', width = 120, height = 14, color = 'var(--cyan)' }: {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}) {
  const step = 12;
  const n = Math.max(3, Math.floor(width / step));
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) pts.push(`${i * step},${i % 2 ? 2 : height - 2}`);
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${n * step} ${height}`}
      aria-hidden="true"
      focusable="false"
    >
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="4" strokeLinejoin="miter" />
    </svg>
  );
}

export function Squiggle({ className = '', width = 150, height = 20, color = 'var(--pink)' }: {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}) {
  const w = 150;
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${w} ${height}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 12c8-12 16-12 24 0s16 12 24 0 16-12 24 0 16 12 24 0 16-12 24 0"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 不规则波点：每颗半径与位置都不同，这是「不规则」的关键 */
export function DotCluster({ className = '', size = 90, color = 'var(--yellow)' }: ShapeProps) {
  const dots = [
    [8, 10, 7],
    [34, 6, 4],
    [58, 16, 9],
    [80, 8, 4],
    [14, 34, 5],
    [44, 30, 11],
    [74, 40, 6],
    [26, 58, 8],
    [58, 64, 4],
    [84, 60, 7],
    [10, 78, 4],
    [40, 82, 6],
  ];
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      {dots.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={color} />
      ))}
    </svg>
  );
}

export function Triangle({ className = '', size = 34, color = 'var(--cyan)' }: ShapeProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <polygon points="20,2 38,38 2,38" fill={color} />
    </svg>
  );
}

export function Plus({ className = '', size = 30, color = 'var(--pink)' }: ShapeProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect x="15" y="0" width="10" height="40" fill={color} />
      <rect x="0" y="15" width="40" height="10" fill={color} />
    </svg>
  );
}

export function Ring({ className = '', size = 42, color = 'var(--yellow)' }: ShapeProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 44 44" aria-hidden="true" focusable="false">
      <circle cx="22" cy="22" r="17" fill="none" stroke={color} strokeWidth="7" />
    </svg>
  );
}

export function Block({ className = '', size = 38, color = 'var(--violet)' }: ShapeProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="32" height="32" fill={color} />
    </svg>
  );
}

/** 爆炸星：孟菲斯海报里最典型的那个「啪」 */
export function Star({ className = '', size = 54, color = 'var(--yellow)' }: ShapeProps) {
  const spikes = 10;
  const r1 = 22;
  const r2 = 9;
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 ? r2 : r1;
    const a = (Math.PI * i) / spikes - Math.PI / 2;
    pts.push(`${24 + r * Math.cos(a)},${24 + r * Math.sin(a)}`);
  }
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <polygon points={pts.join(' ')} fill={color} />
    </svg>
  );
}

/** 锯齿状分隔带：整节之间的「色带」，一眼就把章节切开 */
export function ZigzagBand({ color = 'var(--pink)', flip = false }: { color?: string; flip?: boolean }) {
  const n = 40;
  const step = 20;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) pts.push(`${i * step},${i % 2 ? 0 : 26}`);
  return (
    <div
      className="zzband"
      style={{ transform: flip ? 'scaleY(-1)' : undefined, lineHeight: 0 }}
      aria-hidden="true"
    >
      <svg width="100%" height="26" viewBox={`0 0 ${n * step} 26`} preserveAspectRatio="none">
        <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="9" />
      </svg>
    </div>
  );
}
