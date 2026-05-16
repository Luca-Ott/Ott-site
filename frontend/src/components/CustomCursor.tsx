import React, { useEffect } from 'react';
import { Platform } from 'react-native';

/** Custom glowing cursor (desktop web only). Hides on touch / mobile widths. */
export default function CustomCursor() {
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    if (typeof window === 'undefined') return;

    // Don't activate on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.innerWidth < 900) return;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.id = 'ott-cursor-dot';
    ring.id = 'ott-cursor-ring';

    Object.assign(dot.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: '#22D3EE',
      boxShadow: '0 0 12px #22D3EE, 0 0 24px rgba(59,130,246,0.6)',
      transform: 'translate3d(-50%,-50%,0)',
      pointerEvents: 'none',
      zIndex: '99999',
      transition: 'opacity 0.2s ease',
      mixBlendMode: 'screen',
    } as Partial<CSSStyleDeclaration>);

    Object.assign(ring.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: '1.5px solid rgba(96, 165, 250, 0.7)',
      transform: 'translate3d(-50%,-50%,0)',
      pointerEvents: 'none',
      zIndex: '99998',
      transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease',
      backdropFilter: 'blur(2px)',
    } as Partial<CSSStyleDeclaration>);

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    // Hide native cursor on body for full immersion
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @media (pointer: fine) and (min-width: 900px) {
        body, button, a, input, textarea, [role="button"] { cursor: none !important; }
      }
    `;
    document.head.appendChild(styleEl);

    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };
    let raf = 0;
    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], input, textarea, [data-cursor="hover"]');
      if (interactive) {
        ring.style.width = '60px';
        ring.style.height = '60px';
        ring.style.borderColor = 'rgba(168, 85, 247, 0.9)';
        ring.style.background = 'rgba(168, 85, 247, 0.08)';
      } else {
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(96, 165, 250, 0.7)';
        ring.style.background = 'transparent';
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      dot.remove();
      ring.remove();
      styleEl.remove();
    };
  }, []);

  return null;
}
