import { createElement, type ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

type Tag = 'div' | 'section' | 'p' | 'span' | 'li' | 'figure' | 'blockquote' | 'h2' | 'h3';

type Props = {
  children: ReactNode;
  tag?: Tag;
  /** 动效延迟（毫秒），用来做同组元素的梯次进场 */
  delay?: number;
  /** 用揭幕（clip-path）而不是位移 */
  mask?: boolean;
  className?: string;
  threshold?: number;
};

/**
 * 进场包装器。默认是「轻微上浮 + 淡入」，mask 模式是「自下而上揭开」。
 * 两者都只依赖 CSS transition，滚动性能零负担。
 */
export function Reveal({
  children,
  tag = 'div',
  delay = 0,
  mask = false,
  className = '',
  threshold,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold);

  /**
   * 揭幕模式的坑（实测踩过）：
   * 如果把 clip-path 直接写在被观察的元素上，Chrome 计算交叉比例时会把自身裁剪算进去，
   * 于是可见区域为 0，IntersectionObserver 永远不会判定「已进入」——
   * 标题就永久停在揭幕前，整块空白。
   * 因此观察外层（不做任何裁剪），裁剪交给内层 span。
   */
  const cls = `${mask ? 'rv-mask' : 'rv'} ${inView ? 'in' : ''} ${className}`.trim();

  return createElement(
    tag,
    {
      ref,
      className: cls,
      style: delay ? ({ '--d': `${delay}ms` } as React.CSSProperties) : undefined,
    },
    mask ? createElement('span', { className: 'mi' }, children) : children
  );
}
