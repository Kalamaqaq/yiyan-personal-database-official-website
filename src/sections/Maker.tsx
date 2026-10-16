import { Reveal } from '../components/Reveal';
import { Star, Squiggle } from '../components/Geo';
import {
  LINKS,
  REPO_STATS,
  COMMIT_MONTHS,
  SRC_DIRS,
} from '../data/site';
import { useUptimeLabel } from '../hooks/useUptime';
import { MAKER } from './copy';
import './Maker.css';

/** 三色映射：数据里只写语义名，这里落到站点变量 */
const ACCENT: Record<string, string> = {
  pink: 'var(--pink)',
  cyan: 'var(--cyan)',
  yellow: 'var(--yellow)',
  violet: 'var(--violet)',
  lime: 'var(--lime)',
  dim: 'var(--ink-4)',
};

/** 顶部五块要挂在仪表盘上的数字 */
function statTiles() {
  return [
    { k: '跟踪文件', v: REPO_STATS.files, sub: `src 占 ${REPO_STATS.filesInSrc}`, accent: 'pink' },
    { k: '代码行数', v: REPO_STATS.lines.toLocaleString('en-US'), sub: 'ts / tsx / css', accent: 'cyan' },
    { k: '提交数', v: REPO_STATS.commits, sub: '唯一作者', accent: 'yellow' },
    { k: '标签', v: REPO_STATS.tags, sub: `最新 ${REPO_STATS.tag}`, accent: 'violet' },
    { k: '仓库体积', v: REPO_STATS.size, sub: `.git ${REPO_STATS.gitSize}`, accent: 'lime' },
  ] as const;
}

/**
 * 「主仓库，摆出来给你看」小仪表盘。
 *
 * 全部是纯 CSS 手绘（硬边色条 + 数字块），没有 Chart.js、没有 CDN ——
 * 一是守住本站「不引第三方」的底线，二是孟菲斯本来就不需要渐变和模糊。
 * 柱高 / 条宽由内联 style 给百分比，进场时靠 CSS transition 弹出来。
 */
function RepoBoard() {
  const tiles = statTiles();
  const maxCommit = Math.max(...COMMIT_MONTHS.map((m) => m.value));
  const maxDir = Math.max(...SRC_DIRS.map((d) => d.value));

  return (
    <Reveal delay={140} className="repo-wrap">
      <div className="repo-board">
        <div className="repo-head">
          <span className="repo-cap mono">主仓库 · 摆出来给你看</span>
          <span className="repo-live mono">
            <i className="repo-dot" aria-hidden="true" />
            {REPO_STATS.tag}
          </span>
        </div>

        <div className="repo-tiles">
          {tiles.map((t) => (
            <div className="repo-tile" key={t.k}>
              <span className="rt-k">{t.k}</span>
              <span className="rt-v" style={{ color: ACCENT[t.accent] }}>
                {t.v}
              </span>
              <span className="rt-sub mono">{t.sub}</span>
            </div>
          ))}
        </div>

        <div className="repo-charts">
          <div className="repo-chart">
            <span className="rc-title mono">提交活跃度 · 按月</span>
            <div className="rc-bars" role="img" aria-label="2026年7月38次，9月1次，10月24次">
              {COMMIT_MONTHS.map((m) => (
                <div className="rb-col" key={m.label}>
                  <span className="rb-val mono">{m.value}</span>
                  <span
                    className="rb-bar"
                    style={{
                      height: `${Math.max(6, (m.value / maxCommit) * 100)}%`,
                      background: ACCENT[m.accent],
                    }}
                  />
                  <span className="rb-lab mono">{m.label.slice(5)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="repo-chart">
            <span className="rc-title mono">src 二级目录 · 文件数</span>
            <div className="rc-rows">
              {SRC_DIRS.map((d) => (
                <div className="rr-row" key={d.label}>
                  <span className="rr-lab mono">{d.label}</span>
                  <span className="rr-track">
                    <span
                      className="rr-fill"
                      style={{
                        width: `${(d.value / maxDir) * 100}%`,
                        background: ACCENT[d.accent],
                      }}
                    />
                  </span>
                  <span className="rr-num mono">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="repo-note mono">
          数字来自 <span>{REPO_STATS.tag}</span> 快照，去{' '}
          <a className="mk-link" href={LINKS.source} target="_blank" rel="noreferrer">
            主仓库
          </a>{' '}
          自己数 ↗
        </p>
      </div>
    </Reveal>
  );
}

export function Maker() {
  const uptime = useUptimeLabel();

  return (
    <section className="sec maker" id="maker">
      <div className="maker-deco" aria-hidden="true">
        <Star className="md md1" size={52} color="var(--yellow)" />
        <Squiggle className="md md2" width={160} height={22} color="var(--cyan)" />
      </div>

      <div className="shell">
        <Reveal>
          <span className="eyebrow">
            <span className="no">05</span>
            <em>谁做的</em>
          </span>
        </Reveal>

        <h2 className="h2 maker-title">
          <Reveal tag="span" mask className="line">
            谁做的
          </Reveal>
        </h2>

        <div className="maker-grid">
          <Reveal delay={100} className="card-maker-wrap">
            <div className="card-maker">
              <div className="mk-face">
                <img
                  src="./avatar.jpg"
                  alt="作者的头像"
                  width={128}
                  height={128}
                  loading="lazy"
                />
                <span className="mk-face-cap mono">{uptime}</span>
              </div>

              <div className="mk-body">
                <dl className="mk-rows">
                  {MAKER.map((m) => (
                    <div key={m.k}>
                      <dt className="mono">{m.k}</dt>
                      <dd>
                        {m.href ? (
                          <a className="mk-link" href={m.href} target="_blank" rel="noreferrer">
                            {m.v} ↗
                          </a>
                        ) : (
                          <>
                            {m.v}
                            {m.sub && <span className="mk-sub">{m.sub}</span>}
                          </>
                        )}
                      </dd>
                    </div>
                  ))}
                  <div>
                    <dt className="mono">可以验证</dt>
                    <dd>
                      <a className="mk-link" href={LINKS.source} target="_blank" rel="noreferrer">
                        去看提交记录 ↗
                      </a>
                    </dd>
                  </div>
                </dl>

                <p className="mk-close">风带来故事的种子，时间使之发芽。</p>
              </div>
            </div>
          </Reveal>

          <RepoBoard />
        </div>
      </div>
    </section>
  );
}
