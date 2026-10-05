import { useCallback, useMemo, useRef, useState } from 'react';
import {
  PRESET_FRAGMENTS,
  STARTER_LINES,
  makeMine,
  type Fragment,
} from '../data/fragments';
import { Star } from '../components/Geo';
import { DEMO_COPY } from './copy';
import './HeroDemo.css';

/** 加权随机：与主项目 src/services/random.ts 同规则，倍数是相加的 */
function pickWeighted(pool: Fragment[], exclude: Set<string>): Fragment | null {
  const live = pool.filter((f) => !exclude.has(f.id));
  const source = live.length ? live : pool;
  const total = source.reduce((s, f) => s + f.weight, 0);
  let r = Math.random() * total;
  for (const f of source) {
    r -= f.weight;
    if (r <= 0) return f;
  }
  return source[source.length - 1] ?? null;
}

export function HeroDemo() {
  const [text, setText] = useState('');
  const [mine, setMine] = useState<Fragment | null>(null);
  const [drawn, setDrawn] = useState<Fragment | null>(null);
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const [round, setRound] = useState(0);
  const [misses, setMisses] = useState(0);
  const [fedTick, setFedTick] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const pool = useMemo(
    () => (mine ? [...PRESET_FRAGMENTS, mine] : PRESET_FRAGMENTS),
    [mine]
  );
  const totalWeight = useMemo(() => pool.reduce((s, f) => s + f.weight, 0), [pool]);
  const drawnCount = closed.size;
  const won = drawn?.mine === true;

  const feed = useCallback(() => {
    const v = text.trim();
    if (!v) {
      inputRef.current?.focus();
      return;
    }
    setMine(makeMine(v));
    setDrawn(null);
    setClosed(new Set());
    setMisses(0);
    setFedTick((t) => t + 1);
    setText('');
  }, [text]);

  const draw = useCallback(() => {
    const next = pickWeighted(pool, closed);
    if (!next) return;
    setDrawn(next);
    setClosed((prev) => {
      const s = new Set(prev);
      s.add(next.id);
      return s;
    });
    setRound((r) => r + 1);
    if (next.mine) setMisses(0);
    else if (mine) setMisses((m) => m + 1);
  }, [pool, closed, mine]);

  const reset = useCallback(() => {
    setMine(null);
    setDrawn(null);
    setClosed(new Set());
    setMisses(0);
    setText('');
  }, []);

  const chance = totalWeight > 0 && drawn ? drawn.weight / totalWeight : 0;

  return (
    <div className="demo">
      <div className="demo-head">
        <span className="demo-badge">抽卡机</span>
        <span className="demo-stats mono">
          池中 {pool.length} · 总权重 {totalWeight.toFixed(1)} · 已抽 {drawnCount}
        </span>
      </div>

      <div className="demo-input">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') feed();
          }}
          placeholder="现在脑子里的一句话……"
          aria-label="投喂一句记忆"
          maxLength={120}
        />
        <button className="demo-feed" onClick={feed} disabled={!text.trim()}>
          {mine ? '换一句' : '扔进去'}
        </button>
      </div>

      <div className="demo-hintline">
        {!mine ? (
          <>
            <span className="dim">不知道写什么？</span>
            <button
              className="linky"
              onClick={() =>
                setText(STARTER_LINES[Math.floor(Math.random() * STARTER_LINES.length)])
              }
            >
              偷一句现成的
            </button>
          </>
        ) : (
          <span className="demo-ok mono" key={fedTick}>
            已入库 · 你这条权重 3.0，会被优先翻出来
          </span>
        )}
      </div>

      <div className={`demo-stage ${won ? 'payoff' : ''}`}>
        {drawn ? (
          <article className={`frag ${drawn.mine ? 'frag-mine' : ''}`} key={round}>
            <p className="frag-text">{drawn.text}</p>
            <div className="frag-foot">
              <span className="mono frag-origin">{drawn.origin}</span>
              <span className="mono frag-w">
                权重 {drawn.weight.toFixed(1)}
                {drawn.starred && <i className="chip">★</i>}
                {drawn.recent && <i className="chip">近</i>}
              </span>
            </div>
          </article>
        ) : (
          <div className="frag-empty">
            <span className="mono">这里会出现一张牌</span>
            <span>规则和 App 里一模一样：星标 +1、五天内用过 +1，倍数是相加的。</span>
          </div>
        )}

        {won && (
          <div className="burst" aria-hidden="true">
            <Star size={30} className="b b1" color="var(--pink)" />
            <Star size={20} className="b b2" color="var(--cyan)" />
            <Star size={26} className="b b3" color="var(--violet)" />
            <Star size={16} className="b b4" color="var(--yellow)" />
          </div>
        )}
      </div>

      <div className="demo-copy" aria-live="polite">
        {won ? (
          <>
            <strong className="win">{DEMO_COPY.winTitle}</strong>
            <span>{DEMO_COPY.winBody}</span>
          </>
        ) : drawn ? (
          <>
            <strong>{DEMO_COPY.missTitle}</strong>
            <span>
              这一张 {drawn.weight.toFixed(1)} 分，占全池 {totalWeight.toFixed(1)} 分里的{' '}
              {(chance * 100).toFixed(0)}%。
              {misses >= 2 ? '继续抽，它跑不掉。' : '再抽一张。'}
            </span>
          </>
        ) : (
          <>
            <strong>{DEMO_COPY.emptyTitle}</strong>
            <span>{DEMO_COPY.emptyBody}</span>
          </>
        )}
      </div>

      <div className="demo-actions">
        <button className="btn btn-yellow demo-draw" onClick={draw}>
          抽一张
        </button>
        {drawnCount > 0 && (
          <button className="linky demo-reset" onClick={reset}>
            重来
          </button>
        )}
      </div>
    </div>
  );
}
