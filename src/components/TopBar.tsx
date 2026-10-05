import { useEffect, useState } from 'react';
import { APP_VERSION, daysLit } from '../data/site';
import './TopBar.css';

const NAV = [
  { href: '#things', label: '能干什么' },
  { href: '#specs', label: '参数' },
  { href: '#maker', label: '谁做的' },
  { href: '#download', label: '下载' },
];

/** 站标：三个几何块叠一叠，比任何图标都更像孟菲斯 */
function Mark() {
  return (
    <svg className="brand-mark" width="30" height="30" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect x="2" y="16" width="18" height="18" fill="var(--cyan)" />
      <circle cx="26" cy="14" r="11" fill="var(--pink)" />
      <polygon points="20,38 34,38 27,24" fill="var(--yellow)" />
    </svg>
  );
}

export function TopBar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`top ${solid ? 'solid' : ''}`}>
      <div className="top-in shell">
        <a className="brand" href="#hero" aria-label="记忆库 首页">
          <Mark />
          <span className="brand-txt">
            记忆库
            <em className="mono">v{APP_VERSION}</em>
          </span>
        </a>

        <nav className="top-nav" aria-label="站内导航">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="top-right">
          <span className="lit mono" title="从仓库第一次提交算起的真实天数">
            <i className="dot" />
            亮灯 {daysLit()} 天
          </span>
          <a className="top-cta" href="#download">
            下载
          </a>
        </div>
      </div>
    </header>
  );
}
