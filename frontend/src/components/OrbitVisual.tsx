import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

type Props = { size?: number };

/**
 * Cinematic AI/space orbit visual.
 * - Tilted 3D rings rotating at different speeds and directions
 * - Glowing satellites traveling along each ring
 * - Pulsing core sphere with multi-layer aura
 * - Subtle floating motion on the whole rig
 *
 * Web-only (CSS-driven). On native it returns null \u2014 mobile uses the
 * gradient hero already.
 */
export default function OrbitVisual({ size = 520 }: Props) {
  if (Platform.OS !== 'web') return null;

  const center = size / 2;

  // Ring spec: diameter, rotation duration (s), direction, satellite color, satellite size
  const rings = [
    { d: size * 0.96, dur: 90, reverse: false, color: 'rgba(96,165,250,0.7)', satColor: '#60A5FA', satSize: 8, stroke: 'rgba(96,165,250,0.18)' },
    { d: size * 0.78, dur: 60, reverse: true,  color: 'rgba(168,85,247,0.75)', satColor: '#A855F7', satSize: 10, stroke: 'rgba(168,85,247,0.22)' },
    { d: size * 0.6,  dur: 38, reverse: false, color: 'rgba(34,211,238,0.85)', satColor: '#22D3EE', satSize: 7, stroke: 'rgba(34,211,238,0.26)' },
    { d: size * 0.42, dur: 24, reverse: true,  color: 'rgba(236,72,153,0.85)', satColor: '#EC4899', satSize: 6, stroke: 'rgba(236,72,153,0.28)' },
  ];

  // Position helper for inline web styles
  const abs = (left: number | string, top: number | string): React.CSSProperties => ({
    position: 'absolute',
    left,
    top,
    transform: 'translate(-50%, -50%)',
  });

  const wrapperStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
    animation: 'ott-float 7s ease-in-out infinite',
    transformStyle: 'preserve-3d',
  };

  return (
    <View pointerEvents="none" style={styles.outer}>
      {React.createElement('div', { style: wrapperStyle }, [
        // Background atmospheric glow (large soft blob behind everything)
        React.createElement('div', {
          key: 'aura-bg',
          style: {
            ...abs(center, center),
            width: size * 1.05,
            height: size * 1.05,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(168,85,247,0.12) 40%, rgba(0,0,0,0) 70%)',
            filter: 'blur(20px)',
            animation: 'ott-pulse-aura 6s ease-in-out infinite',
          } as React.CSSProperties,
        }),

        // Twinkling stars around the rig (sparse)
        ...Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2 + (i % 3) * 0.2;
          const radius = size * (0.46 + (i % 3) * 0.04);
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius * 0.6; // squashed for tilt
          return React.createElement('div', {
            key: `star-${i}`,
            style: {
              ...abs(x, y),
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              borderRadius: '50%',
              background: '#E0F2FE',
              boxShadow: '0 0 6px #93C5FD, 0 0 12px rgba(147,197,253,0.55)',
              animation: `ott-twinkle ${2.4 + (i % 5) * 0.6}s ease-in-out ${i * 0.15}s infinite`,
            } as React.CSSProperties,
          });
        }),

        // The four orbital rings (tilted via parent perspective)
        ...rings.flatMap((r, i) => {
          // Ring container: tilted ellipse
          const ringStyle: React.CSSProperties = {
            ...abs(center, center),
            width: r.d,
            height: r.d,
            borderRadius: '50%',
            transform: `translate(-50%, -50%) rotateX(68deg) rotateZ(${i * 8 - 12}deg)`,
            transformStyle: 'preserve-3d',
            pointerEvents: 'none',
          };

          // Spinning inner that holds the satellite
          const spinStyle: React.CSSProperties = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: `1.5px solid ${r.stroke}`,
            boxShadow: `inset 0 0 32px ${r.stroke}, 0 0 12px ${r.stroke}`,
            animation: `${r.reverse ? 'ott-spin-reverse' : 'ott-spin'} ${r.dur}s linear infinite`,
          };

          // Satellite: a glowing dot at the right edge of the ring
          const satStyle: React.CSSProperties = {
            position: 'absolute',
            top: '50%',
            right: -r.satSize / 2,
            width: r.satSize,
            height: r.satSize,
            borderRadius: '50%',
            background: r.satColor,
            boxShadow: `0 0 12px ${r.satColor}, 0 0 24px ${r.satColor}88, 0 0 40px ${r.satColor}55`,
            transform: 'translateY(-50%)',
          };

          // Trailing arc (gradient highlight on the ring, on the satellite side)
          const trailStyle: React.CSSProperties = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `conic-gradient(from 0deg, ${r.color} 0deg, ${r.color}00 90deg, ${r.color}00 360deg)`,
            mask: 'radial-gradient(circle, transparent 49%, #000 49.5%, #000 50.5%, transparent 51%)',
            WebkitMask: 'radial-gradient(circle, transparent 49%, #000 49.5%, #000 50.5%, transparent 51%)',
            opacity: 0.55,
          };

          return [
            React.createElement('div', { key: `ring-${i}`, style: ringStyle },
              React.createElement('div', { key: `spin-${i}`, style: spinStyle }, [
                React.createElement('div', { key: `trail-${i}`, style: trailStyle }),
                React.createElement('div', { key: `sat-${i}`, style: satStyle }),
              ])
            ),
          ];
        }),

        // Core aura (large soft halo)
        React.createElement('div', {
          key: 'core-aura',
          style: {
            ...abs(center, center),
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(96,165,250,0.55) 0%, rgba(168,85,247,0.25) 40%, rgba(0,0,0,0) 70%)',
            filter: 'blur(8px)',
            animation: 'ott-pulse-aura 4s ease-in-out infinite',
          } as React.CSSProperties,
        }),

        // Core sphere
        React.createElement('div', {
          key: 'core-sphere',
          style: {
            ...abs(center, center),
            width: 78,
            height: 78,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #93C5FD 18%, #3B82F6 45%, #1E3A8A 90%)',
            boxShadow:
              '0 0 30px #3B82F6, 0 0 60px rgba(59,130,246,0.7), 0 0 90px rgba(168,85,247,0.45), inset -10px -14px 22px rgba(0,0,0,0.45)',
            animation: 'ott-pulse-glow 3.4s ease-in-out infinite',
          } as React.CSSProperties,
        }),

        // Specular highlight on the core
        React.createElement('div', {
          key: 'core-highlight',
          style: {
            ...abs(center - 18, center - 18),
            width: 22,
            height: 22,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(2px)',
          } as React.CSSProperties,
        }),
      ])}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    right: -90,
    top: 40,
    width: 520,
    height: 520,
    opacity: 0.85,
  },
});
