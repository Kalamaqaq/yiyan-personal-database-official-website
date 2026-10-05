import { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Butterfly } from '../components/Butterfly';
import {
  APK_SIZE_LABEL,
  APK_SHA256,
  APK_URL_MIRROR,
  APK_URL_PRIMARY,
  APP_VERSION,
  LINKS,
} from '../data/site';
import './Download.css';

type Mirror = 'idle' | 'checking' | 'down' | 'ok';

const STEPS = [
  '点上面的按钮，13 MB 左右，几秒钟的事。',
  '手机会提示「未知来源」—— 允许就行。这个包没有上应用商店，所以系统不认识它。',
  '装完直接能用。第一次打开会慢一点，因为它正在你手机里建自己的库。',
];

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
   * 备用镜像先探活再跳转 —— 宁可告诉访客「镜像还没上线」，
   * 也不要甩给他一个 404 的白页。
   */
  const openMirror = async () => {
    setMirror('checking');
    try {
      const res = await fetch(APK_URL_MIRROR, { method: 'HEAD' });
      if (res.ok) {
        setMirror('ok');
        window.location.href = APK_URL_MIRROR;
      } else {
        setMirror('down');
      }
    } catch {
      setMirror('down');
    }
  };

  return (
    <section className="sec dl" id="download">
      <div className="shell">
        <Reveal>
          <span className="eyebrow">
            <span className="no">06</span>
            <em>下载</em>
          </span>
        </Reveal>

        <div className="dl-grid">
          <div className="dl-left">
            <Reveal>
              <h2 className="display dl-title">
                <span className="line">拿走它。</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="lede dl-lede">
                免费。没有广告，没有账号，没有会员，没有「升级到专业版」。
                我也不会拿到你的任何一条内容。
              </p>
            </Reveal>

            <Reveal delay={240} className="dl-actions">
              <a className="btn btn-primary dl-main" href={APK_URL_PRIMARY} download>
                <Butterfly size={17} color="currentColor" />
                下载 Android 版 · {APK_SIZE_LABEL}
              </a>

              <a className="btn btn-ghost" href="./app/" target="_blank" rel="noreferrer">
                不用装，先在网页上试用一次
                <span className="ar">↗</span>
              </a>

              <div className="dl-mirror">
                <button className="linky" onClick={openMirror} disabled={mirror === 'checking'}>
                  {mirror === 'checking' ? '正在检查镜像…' : '备用镜像（Cloudflare R2）'}
                </button>
                {mirror === 'down' && (
                  <span className="dl-mirror-msg">
                    镜像还没上线，用上面的主按钮就行 —— 同一个文件。
                  </span>
                )}
              </div>
            </Reveal>

            <Reveal delay={320} className="dl-meta">
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
                  <dt>签名校验</dt>
                  <dd>
                    <button
                      className="linky dl-sha"
                      onClick={() => copy(APK_SHA256, 'sha')}
                      title={APK_SHA256}
                    >
                      {copied === 'sha' ? '已复制完整 SHA-256' : `SHA-256 ${APK_SHA256.slice(0, 16)}…`}
                    </button>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={160} className="dl-right card">
            <h3 className="h3">装它有三步，只有一步可能卡住</h3>
            <ol className="dl-steps">
              {STEPS.map((s, i) => (
                <li key={s}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <p>{s}</p>
                </li>
              ))}
            </ol>

            <div className="dl-notes">
              <div>
                <h4 className="mono">网页版</h4>
                <p>
                  和 Android 版同一套代码，数据存在浏览器本地。第一次打开要等几秒加载，
                  换浏览器或者清缓存就等于换一台新设备 —— 这是浏览器的限制，不是 bug。
                </p>
              </div>
              <div>
                <h4 className="mono">Windows 桌面版</h4>
                <p>
                  存在，但还停在 2.0.4，比 Android 版旧了一大截，不建议现在用。
                  想自己构建的话，仓库里有完整的打包脚本。
                </p>
              </div>
              <div>
                <h4 className="mono">iOS</h4>
                <p>没有。也不打算有。</p>
              </div>
            </div>

            <div className="dl-links">
              <button className="linky" onClick={() => copy(APK_URL_PRIMARY, 'apk')}>
                {copied === 'apk' ? '下载链接已复制' : '复制下载链接（发给手机）'}
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
