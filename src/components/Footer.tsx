import { Butterfly } from './Butterfly';
import { APP_VERSION, LINKS, daysLit } from '../data/site';
import './Footer.css';

export function Footer() {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot-top">
          <div className="foot-cat">
            <img src="./mascot-192.png" alt="记忆库的值班猫" width={92} height={92} loading="lazy" />
            <div>
              <p className="foot-cat-name">
                值班猫
                <span className="mono">守夜人的替身 · {daysLit()} 天</span>
              </p>
              <p className="foot-cat-line">白天睡觉，晚上守着你的东西。</p>
            </div>
          </div>

          <div className="foot-cols">
            <div className="foot-col">
              <h4 className="mono">站内</h4>
              <a href="#manifesto">立场</a>
              <a href="#mechanics">机制</a>
              <a href="#keeper">守夜人</a>
              <a href="#honesty">诚实清单</a>
              <a href="#download">下载</a>
            </div>
            <div className="foot-col">
              <h4 className="mono">外面</h4>
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
              <span>许可证 CC BY-NC 4.0</span>
              <span>无账号 · 无埋点</span>
            </div>
          </div>
        </div>

        <div className="foot-bot">
          <span className="mono foot-sig">
            <Butterfly size={14} /> 由一个人写出来 · 守护者署名：守夜人
          </span>
          <span className="mono foot-c">
            本站不收集任何数据，也没有统计脚本 —— 所以我不知道你是谁，也不需要知道。
          </span>
        </div>
      </div>
    </footer>
  );
}
