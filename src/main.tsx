import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/tokens.css';

const mount = document.getElementById('root');

if (mount) {
  createRoot(mount).render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // 首帧画完再撤掉开灯画面，避免出现一次空白闪烁
  requestAnimationFrame(() => {
    const boot = document.getElementById('boot');
    if (!boot) return;
    boot.classList.add('gone');
    window.setTimeout(() => boot.remove(), 700);
  });
}
