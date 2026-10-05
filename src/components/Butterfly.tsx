/** 一只会飘的蝴蝶。品牌符号：一条记忆就是一只停在你肩上的蝴蝶。 */
export function Butterfly({
  className = '',
  size = 22,
  color = 'var(--blue)',
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M32 34c-4.6-8-12-13-16-13 0 0-6 .6-6 7 0 7.6 9.4 13.6 13.4 14.6L32 44l8.6-1.4C44.6 41.6 54 35.6 54 28c0-6.4-6-7-6-7-4 0-11.4 5-16 13Z"
        fill={color}
        opacity="0.9"
      />
      <path
        d="M32 30.5V44M32 30.5C28.6 25 22.6 21.4 19.6 21.4M32 30.5c3.4-5.5 9.4-9.1 12.4-9.1"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <circle cx="32" cy="27.6" r="3.1" fill="var(--gold-soft)" />
    </svg>
  );
}
