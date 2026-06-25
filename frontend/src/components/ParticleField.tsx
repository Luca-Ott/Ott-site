import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

type Props = { density?: number };

/**
 * Deep-space particle field — web only (no-op on native).
 *
 *  - Dense layer of twinkling stars with a gentle downward drift (parallax feel).
 *  - Occasional "shooting stars" with bright tails streaking across the sky
 *    (X-style meteor effect).
 *  - Performance: single <canvas>, requestAnimationFrame, no DOM nodes.
 */
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

    // -------------------- Background twinkling stars --------------------
    type Star = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      o: number;
      tw: number;
      twSpeed: number;
      hue: 'cool' | 'cyan' | 'warm';
    };
    // Multiply base density to get a dense, "deep space" look
    const STAR_COUNT = Math.round(density * 4.2);
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => {
      const rnd = Math.random();
      const hue: Star['hue'] = rnd < 0.7 ? 'cool' : rnd < 0.9 ? 'cyan' : 'warm';
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        // Mostly drift gently downward (gravity feel), some sideways
        vx: (Math.random() - 0.5) * 0.08,
        vy: Math.random() * 0.18 + 0.04,
        r: Math.random() * 1.4 + 0.3,
        o: Math.random() * 0.6 + 0.25,
        tw: Math.random() * Math.PI * 2,
        twSpeed: Math.random() * 0.035 + 0.012,
        hue,
      };
    });

    // -------------------- Shooting stars (meteors with tail) --------------------
    type Shooter = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number; // 0..1 progress
      maxLife: number;
      length: number; // tail length in px
      thickness: number;
      hue: string;
    };
    const shooters: Shooter[] = [];

    const spawnShooter = () => {
      // Spawn from top edge, angled towards bottom-left or bottom-right
      const fromRight = Math.random() < 0.5;
      const startX = fromRight
        ? window.innerWidth + 80
        : -80;
      const startY = Math.random() * window.innerHeight * 0.55;
      const speed = 8 + Math.random() * 6; // px per frame at 60fps
      // Diagonal direction
      const angle = fromRight
        ? Math.PI * 0.85 // top-right -> bottom-left
        : Math.PI * 0.15; // top-left -> bottom-right
      const hueRoll = Math.random();
      const hue =
        hueRoll < 0.55 ? '255,255,255'
        : hueRoll < 0.85 ? '147,197,253' // light blue
        : '224,231,255'; // cool white
      shooters.push({
        x: startX,
        y: startY,
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 70 + Math.random() * 30, // frames
        length: 120 + Math.random() * 140,
        thickness: 1 + Math.random() * 1.4,
        hue,
      });
    };

    // Spawn first one quickly, then random interval
    let nextSpawn = performance.now() + 600 + Math.random() * 1200;

    // -------------------- Render loop --------------------
    const tick = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // ----- Twinkling stars -----
      for (const p of stars) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += p.twSpeed;
        // Wrap horizontally; respawn at top when falling off bottom
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y > h + 10) {
          p.y = -10;
          p.x = Math.random() * w;
        }
        if (p.y < -20) p.y = h + 10;

        const tw = (Math.sin(p.tw) + 1) / 2;
        const alpha = p.o * (0.35 + tw * 0.65);
        let color: string;
        if (p.hue === 'cyan') {
          color = `rgba(167, 243, 255, ${alpha})`;
        } else if (p.hue === 'warm') {
          color = `rgba(253, 224, 200, ${alpha})`;
        } else {
          color = `rgba(200, 220, 255, ${alpha})`;
        }
        // Bigger stars get a subtle halo
        if (p.r > 1.2 && tw > 0.7) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 6;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // ----- Shooting stars -----
      if (now >= nextSpawn && shooters.length < 4) {
        spawnShooter();
        nextSpawn = now + 1400 + Math.random() * 4200;
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;
        const prog = s.life / s.maxLife;
        // Fade in fast then out slow
        const alpha =
          prog < 0.15
            ? prog / 0.15
            : 1 - (prog - 0.15) / 0.85;
        const safeAlpha = Math.max(0, Math.min(1, alpha));

        // Tail end is opposite the velocity vector
        const norm = Math.hypot(s.vx, s.vy) || 1;
        const ux = s.vx / norm;
        const uy = s.vy / norm;
        const tailX = s.x - ux * s.length;
        const tailY = s.y - uy * s.length;

        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(${s.hue}, ${safeAlpha})`);
        grad.addColorStop(0.4, `rgba(${s.hue}, ${safeAlpha * 0.5})`);
        grad.addColorStop(1, `rgba(${s.hue}, 0)`);

        ctx.save();
        ctx.lineCap = 'round';
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.thickness;
        ctx.shadowColor = `rgba(${s.hue}, ${safeAlpha})`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Bright head
        ctx.shadowBlur = 14;
        ctx.fillStyle = `rgba(255,255,255, ${safeAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.thickness * 1.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Cleanup off-screen or expired
        if (
          s.life > s.maxLife ||
          s.x < -300 ||
          s.x > w + 300 ||
          s.y > h + 300
        ) {
          shooters.splice(i, 1);
        }
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
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  } as any,
});
