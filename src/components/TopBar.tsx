import { useEffect, useState } from 'react';
import { Butterfly } from './Butterfly';
import { APP_VERSION, daysLit } from '../data/site';
import './TopBar.css';

const NAV = [
  { href: '#manifesto', label: '立场' },
  { href: '#mechanics', label: '机制' },
  { href: '#keeper', label: '守夜人' },
  { href: '#honesty', label: '诚实清单' },
  { href: '#download', label: '下载' },
];

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
          <Butterfly size={20} />
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
