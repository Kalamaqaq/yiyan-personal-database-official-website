import { APP_VERSION, LINKS } from '../data/site';
import { useUptimeLabel } from '../hooks/useUptime';
import { ZigzagBand } from './Geo';
import './Footer.css';

export function Footer() {
  const uptime = useUptimeLabel();

  return (
    <footer className="foot">
      <ZigzagBand color="var(--cyan)" flip />
      <div className="shell">
        <div className="foot-top">
          <div className="foot-cat">
            <img src="./mascot-192.png" alt="记忆库图标上的角色" width={96} height={96} loading="lazy" />
            <div>
              <p className="foot-cat-name">
                她是一只，可长期用的
                <span className="mono">{uptime}</span>
              </p>
              <p className="foot-cat-line">只属于你的专属数据库喵</p>
            </div>
          </div>

          <div className="foot-cols">
            <div className="foot-col">
              <h4 className="mono">站内</h4>
              <a href="#things">能干什么</a>
              <a href="#specs">参数</a>
              <a href="#maker">谁做的</a>
              <a href="#download">下载</a>
            </div>
            <div className="foot-col">
              <h4 className="mono">外面</h4>
              <a href={LINKS.blog} target="_blank" rel="noreferrer">
                作者的博客 ↗
              </a>
              <a href={LINKS.source} target="_blank" rel="noreferrer">
                主仓库 ↗
              </a>
              <a href={LINKS.websiteRepo} target="_blank" rel="noreferrer">
                本站源码 ↗
              </a>
              <a href={LINKS.issues} target="_blank" rel="noreferrer">
                反馈 ↗
              </a>
            </div>
            <div className="foot-col">
              <h4 className="mono">事实</h4>
              <span>版本 v{APP_VERSION}</span>
              <span>CC BY-NC 4.0</span>
              <span>无账号 · 无埋点</span>
            </div>
          </div>
        </div>

        <div className="foot-bot">
          <span className="mono foot-c">
            本站没有统计脚本，也没有 Cookie。所以我不知道你是谁 —— 也不需要知道。
          </span>
          <span className="mono foot-sig">记忆库 · 一个人做的</span>
        </div>
      </div>
    </footer>
  );
}
