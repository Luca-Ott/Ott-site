import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = { intensity?: number };

/**
 * Animated mesh gradient background.
 * Web: full canvas-based animated blobs (highly performant, GPU-friendly).
 * Native: layered LinearGradient fallback.
 */
export default function MeshBackground({ intensity = 1 }: Props) {
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth - 0.5;
      targetMouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', onMove);

    const blobs = [
      { x: 0.2, y: 0.25, r: 520, color: 'rgba(59, 130, 246, 0.55)', sx: 0.00018, sy: 0.00012, phase: 0 },
      { x: 0.75, y: 0.4, r: 600, color: 'rgba(168, 85, 247, 0.5)', sx: -0.00014, sy: 0.0002, phase: 1.2 },
      { x: 0.5, y: 0.85, r: 700, color: 'rgba(34, 211, 238, 0.4)', sx: 0.0001, sy: -0.00016, phase: 2.5 },
      { x: 0.9, y: 0.85, r: 420, color: 'rgba(236, 72, 153, 0.35)', sx: -0.00018, sy: -0.0001, phase: 3.7 },
      { x: 0.1, y: 0.9, r: 480, color: 'rgba(16, 185, 129, 0.28)', sx: 0.00016, sy: -0.00014, phase: 4.5 },
    ];

    let start = performance.now();
    const render = (now: number) => {
      const t = (now - start) / 1000;
      const w = window.innerWidth;
      const h = window.innerHeight;

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Clear the canvas \u2014 keep it transparent so DOM content shows through
      ctx.clearRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (const b of blobs) {
        const x = (b.x + Math.sin(t * 0.3 + b.phase) * 0.08 + mouseX * 0.05) * w;
        const y = (b.y + Math.cos(t * 0.25 + b.phase) * 0.08 + mouseY * 0.05) * h;
        const radial = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        radial.addColorStop(0, b.color);
        radial.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(x, y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [intensity]);

  if (Platform.OS === 'web') {
    return (
      <View pointerEvents="none" style={styles.container}>
        {React.createElement('canvas', {
          ref: canvasRef,
          style: { position: 'absolute', inset: 0, width: '100%', height: '100%' },
        })}
      </View>
    );
  }

  return (
    <View pointerEvents="none" style={styles.container}>
      <LinearGradient
        colors={['#05060F', '#0B0D1B', '#05060F']}
        style={StyleSheet.absoluteFill}
      />
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
