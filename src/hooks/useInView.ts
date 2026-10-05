import { useEffect, useRef, useState } from 'react';

/**
 * 元素进入视口一次就返回 true，之后不再回退。
 * 全站所有进场动效都挂在这一个观察器上——不用滚动监听，不留事件垃圾。
 */
export function useInView<T extends HTMLElement>(
  threshold = 0.18,
  rootMargin = '0px 0px -8% 0px'
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 老浏览器直接降级为「已进入」——内容优先，动效是加分项
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
