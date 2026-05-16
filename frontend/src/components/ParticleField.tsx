import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

type Props = { density?: number };

/** Subtle drifting particle field — web only (no-op on native) */
export default function ParticleField({ density = 60 }: Props) {
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; o: number; tw: number };
    const particles: P[] = Array.from({ length: density }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.5 + 0.4,
      o: Math.random() * 0.6 + 0.2,
      tw: Math.random() * Math.PI * 2,
    }));

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.02;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        const tw = (Math.sin(p.tw) + 1) / 2;
        ctx.beginPath();
        ctx.fillStyle = `rgba(180, 210, 255, ${p.o * (0.4 + tw * 0.6)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density]);

  if (Platform.OS !== 'web') return null;

  return (
    <View pointerEvents="none" style={styles.container}>
      {React.createElement('canvas', {
        ref: canvasRef,
        style: { position: 'absolute', inset: 0, width: '100%', height: '100%' },
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', inset: 0, top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 } as any,
});
