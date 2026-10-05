import { useEffect, useRef } from 'react';

/** 顶部 1px 阅读进度线。几乎无成本，但让整页感觉被「握在手里」。 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement | null>(null);
  const raf = useRef(0);

  useEffect(() => {
    const paint = () => {
      raf.current = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      if (raf.current) return;
      raf.current = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf.current) window.cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div className="progress" ref={bar} aria-hidden="true" />;
}
