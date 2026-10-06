import { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Star, Triangle } from '../components/Geo';
import {
  APK_SIZE_LABEL,
  APK_SHA256,
  APK_URL_MIRROR,
  APK_URL_PRIMARY,
  APP_VERSION,
  LINKS,
} from '../data/site';
import { INSTALL_STEPS } from './copy';
import './Download.css';

type Mirror = 'idle' | 'checking' | 'down' | 'ok';

export function DownloadSection() {
  const [copied, setCopied] = useState<'apk' | 'sha' | null>(null);
  const [mirror, setMirror] = useState<Mirror>('idle');

  const copy = async (value: string, which: 'apk' | 'sha') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  /**
   * 备用镜像：先探活再跳转，宁可说「还没上线」，也不甩个 404 白页给访客。
   *
   * ⚠️ catch 里必须 fail-open（当作可达直接跳），不能判成「镜像挂了」：
   * 这是一次**跨域** HEAD，而 R2 公开域默认不返回 Access-Control-Allow-Origin，
   * 浏览器会直接以 "Failed to fetch" 拦下来 —— 那是 CORS，不是镜像不可用。
   * 早期版本把 catch 当成 down，结果是「镜像明明在线，按钮却永远说它没上线」的假阴性。
   */
  const openMirror = async () => {
    setMirror('checking');
    try {
      const res = await fetch(APK_URL_MIRROR, { method: 'HEAD' });
      if (res.ok) {
        setMirror('ok');
        window.location.href = APK_URL_MIRROR;
      } else {
        // 探活成功但对象不存在（4xx/5xx）—— 这才是真的没上线
        setMirror('down');
      }
    } catch {
      // 多半是 CORS/网络层拦截，读不到状态。当成可达，直接交给浏览器下载
      setMirror('idle');
      window.location.href = APK_URL_MIRROR;
    }
  };

  return (
    <section className="sec dl" id="download">
      <div className="dl-deco" aria-hidden="true">
        <Star className="dd dd1" size={58} color="var(--pink)" />
        <Triangle className="dd dd2" size={38} color="var(--cyan)" />
      </div>

      <div className="shell">
        <Reveal>
          <span className="eyebrow">
            <span className="no">05</span>
            <em>下载</em>
          </span>
        </Reveal>

        <h2 className="display dl-title">
          <Reveal tag="span" mask className="line">
            拿去用。
          </Reveal>
        </h2>

        <div className="dl-grid">
          <div className="dl-left">
            <Reveal delay={100}>
              <p className="lede dl-lede">
                免费。没有广告，没有会员，没有「升级到专业版」的弹窗。开箱即用
              </p>
            </Reveal>

            <Reveal delay={200} className="dl-actions">
              <a className="btn dl-main" href={APK_URL_PRIMARY} download>
                下载 APK · {APK_SIZE_LABEL}
              </a>
              <a className="btn btn-line" href="./app/" target="_blank" rel="noreferrer">
                看看界面长什么样
                <span className="ar">↗</span>
              </a>

              <div className="dl-mirror">
                <button className="linky" onClick={openMirror} disabled={mirror === 'checking'}>
                  {mirror === 'checking' ? '正在检查镜像…' : '备用镜像（Cloudflare R2）'}
                </button>
                {mirror === 'down' && (
                  <span className="dl-mirror-msg">
                    镜像还没上线，用上面的按钮就行
                  </span>
                )}
              </div>
            </Reveal>

            <Reveal delay={280} className="dl-meta">
              <dl className="mono">
                <div>
                  <dt>版本</dt>
                  <dd>
                    v{APP_VERSION} <span className="dim">· 版本号 37</span>
                  </dd>
                </div>
                <div>
                  <dt>体积</dt>
                  <dd>{APK_SIZE_LABEL}</dd>
                </div>
                <div>
                  <dt>系统</dt>
                  <dd>Android 5.1 及以上</dd>
                </div>
                <div>
                  <dt>包名</dt>
                  <dd>com.yiyan.memorydb</dd>
                </div>
                <div>
                  <dt>更新</dt>
                  <dd>2026-10-03</dd>
                </div>
                <div>
                  <dt>校验</dt>
                  <dd>
                    <button
                      className="linky dl-sha"
                      onClick={() => copy(APK_SHA256, 'sha')}
                      title={APK_SHA256}
                    >
                      {copied === 'sha'
                        ? '已复制完整 SHA-256'
                        : `SHA-256 ${APK_SHA256.slice(0, 16)}…`}
                    </button>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={140} className="dl-right">
            <h3 className="h3">装它有三步</h3>
            <ol className="dl-steps">
              {INSTALL_STEPS.map((s, i) => (
                <li key={s}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <p>{s}</p>
                </li>
              ))}
            </ol>

            <div className="dl-notes">
              <div>
                <h4 className="mono">界面预览</h4>
                <p>
                  上面那个按钮打开的是<strong>静态预览</strong>：7 屏真实界面，数据是编的，按钮按下去不会真的干活。
                  之所以不做成能用的网页版，是因为那要拖着 SQLite 一起走 —— 光数据库就得 660 KB，
                  而这一整页预览只有 240 KB。真身是 Android 版，装完才有逻辑。
                </p>
              </div>
              <div>
                <h4 className="mono">Windows 桌面版</h4>
                <p>存在，但停在 2.0.4，比 Android 版旧一大截。建议假装它不存在。</p>
              </div>
              <div>
                <h4 className="mono">iOS</h4>
                <p>没有，也不打算有。</p>
              </div>
            </div>

            <div className="dl-links">
              <button className="linky" onClick={() => copy(APK_URL_PRIMARY, 'apk')}>
                {copied === 'apk' ? '链接已复制' : '复制下载链接（发给手机）'}
              </button>
              <a className="linky" href={LINKS.source} target="_blank" rel="noreferrer">
                看源码 ↗
              </a>
              <a className="linky" href={LINKS.issues} target="_blank" rel="noreferrer">
                提一个问题 ↗
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
