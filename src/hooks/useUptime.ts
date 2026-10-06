import { useEffect, useState } from 'react';
import { elapsedSince, formatUptime } from '../data/site';

/**
 * 每秒跳一次的运行时长。
 *
 * 页面上有三处要显示它（顶栏 / 名片 / 页脚）。如果每个组件各起一个 setInterval，
 * 就是三个定时器同时打同一个数字 —— 既不必要，也容易慢慢走偏。
 * 所以这里共用一个 ticker：谁挂载谁订阅，最后一个卸载时把定时器收掉。
 */
let timer: number | null = null;
const subscribers = new Set<() => void>();

function startTicker() {
  if (timer !== null) return;
  timer = window.setInterval(() => {
    for (const fn of subscribers) fn();
  }, 1000);
}

function stopTicker() {
  if (timer === null) return;
  window.clearInterval(timer);
  timer = null;
}

export function useUptimeLabel(): string {
  const [, bump] = useState(0);

  useEffect(() => {
    const fn = () => bump((n) => n + 1);
    subscribers.add(fn);
    startTicker();

    return () => {
      subscribers.delete(fn);
      if (subscribers.size === 0) stopTicker();
    };
  }, []);

  return formatUptime(elapsedSince());
}
