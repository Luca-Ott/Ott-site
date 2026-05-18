import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

type Props = { size?: number };

/**
 * Cinematic AI/space orbit visual with a CSS-only REALISTIC 3D PLANET
 * at the centre of perfectly concentric orbital rings.
 *
 *  - Spherical planet (Earth-like) with rotating continents, drifting clouds,
 *    day/night terminator, specular highlight and atmospheric rim glow.
 *  - 4 tilted orbital rings (perfectly concentric), satellites orbiting at
 *    different speeds and directions, glowing trails.
 *  - Twinkling stars sprinkled around the system.
 *
 * Web-only \u2014 returns null on native.
 */
export default function OrbitVisual({ size = 520 }: Props) {
  if (Platform.OS !== 'web') return null;

  const center = size / 2;

  // ---- Orbital rings (all share the same tilt for true concentricity) ----
  const SHARED_TILT = 'rotateX(68deg) rotateZ(-8deg)';
  const rings = [
    { d: size * 0.96, dur: 90, reverse: false, color: 'rgba(96,165,250,0.7)',  satColor: '#60A5FA', satSize: 8,  stroke: 'rgba(96,165,250,0.18)' },
    { d: size * 0.78, dur: 60, reverse: true,  color: 'rgba(168,85,247,0.75)', satColor: '#A855F7', satSize: 10, stroke: 'rgba(168,85,247,0.22)' },
    { d: size * 0.6,  dur: 38, reverse: false, color: 'rgba(34,211,238,0.85)', satColor: '#22D3EE', satSize: 7,  stroke: 'rgba(34,211,238,0.26)' },
    { d: size * 0.42, dur: 24, reverse: true,  color: 'rgba(236,72,153,0.85)', satColor: '#EC4899', satSize: 6,  stroke: 'rgba(236,72,153,0.28)' },
  ];

  // ---- Planet config ----
  const PLANET_SIZE = Math.round(size * 0.26); // ~135px

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
    animation: 'ott-float 8s ease-in-out infinite',
    transformStyle: 'preserve-3d',
  };

  return (
    <View pointerEvents="none" style={styles.outer}>
      {React.createElement('div', { style: wrapperStyle }, [
        // Background atmospheric glow (very wide, soft)
        React.createElement('div', {
          key: 'aura-bg',
          style: {
            ...abs(center, center),
            width: size * 1.05,
            height: size * 1.05,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(168,85,247,0.10) 40%, rgba(0,0,0,0) 70%)',
            filter: 'blur(20px)',
            animation: 'ott-pulse-aura 6s ease-in-out infinite',
          } as React.CSSProperties,
        }),

        // Twinkling stars
        ...Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2 + (i % 3) * 0.2;
          const radius = size * (0.46 + (i % 3) * 0.04);
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius * 0.6;
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

        // Orbital rings (all concentric)
        ...rings.flatMap((r, i) => {
          const ringStyle: React.CSSProperties = {
            ...abs(center, center),
            width: r.d,
            height: r.d,
            borderRadius: '50%',
            transform: `translate(-50%, -50%) ${SHARED_TILT}`,
            transformStyle: 'preserve-3d',
            pointerEvents: 'none',
          };
          const spinStyle: React.CSSProperties = {
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `1.5px solid ${r.stroke}`,
            boxShadow: `inset 0 0 32px ${r.stroke}, 0 0 12px ${r.stroke}`,
            animation: `${r.reverse ? 'ott-spin-reverse' : 'ott-spin'} ${r.dur}s linear infinite`,
          };
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
          const trailStyle: React.CSSProperties = {
            position: 'absolute',
            inset: 0,
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

        // ============================================================
        // REALISTIC 3D PLANET (Earth-like) \u2014 centred on the orbits
        // ============================================================
        React.createElement('div', {
          key: 'planet-wrap',
          style: {
            ...abs(center, center),
            width: PLANET_SIZE,
            height: PLANET_SIZE,
            borderRadius: '50%',
            overflow: 'hidden',
            // Outer atmosphere glow + inner deep shadow for sphere depth
            boxShadow:
              '0 0 30px rgba(96,165,250,0.7), 0 0 70px rgba(34,211,238,0.5), 0 0 110px rgba(168,85,247,0.35), inset -16px -22px 38px rgba(0,0,0,0.6), inset 14px 10px 24px rgba(255,255,255,0.08)',
          } as React.CSSProperties,
        }, [
          // 1) Ocean base \u2014 deep blue with subtle radial shading
          React.createElement('div', {
            key: 'ocean',
            style: {
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 30% 28%, #60A5FA 0%, #1D4ED8 35%, #1E3A8A 70%, #0B1E5C 100%)',
            } as React.CSSProperties,
          }),

          // 2) Continents \u2014 wide texture strip that scrolls horizontally
          React.createElement('div', {
            key: 'continents',
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '200%',
              height: '100%',
              backgroundRepeat: 'repeat-x',
              backgroundSize: '50% 100%',
              backgroundImage: `
                radial-gradient(ellipse 9% 14% at 6% 32%, #15803D 0%, #14532D 55%, transparent 78%),
                radial-gradient(ellipse 12% 18% at 14% 58%, #16A34A 0%, #14532D 55%, transparent 80%),
                radial-gradient(ellipse 7% 11% at 22% 22%, #15803D 0%, #14532D 55%, transparent 80%),
                radial-gradient(ellipse 11% 16% at 30% 70%, #166534 0%, #14532D 55%, transparent 82%),
                radial-gradient(ellipse 8% 12% at 38% 40%, #15803D 0%, #14532D 55%, transparent 80%),
                radial-gradient(ellipse 6% 9% at 44% 18%, #166534 0%, #14532D 55%, transparent 80%)
              `,
              animation: 'planet-rotate 42s linear infinite',
            } as React.CSSProperties,
          }),

          // 3) Polar ice caps
          React.createElement('div', {
            key: 'ice',
            style: {
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 70% 10% at 50% 2%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%),' +
                'radial-gradient(ellipse 60% 8% at 50% 98%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 70%)',
              pointerEvents: 'none',
            } as React.CSSProperties,
          }),

          // 4) Clouds \u2014 also a scrolling strip, slower for parallax
          React.createElement('div', {
            key: 'clouds',
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '200%',
              height: '100%',
              backgroundRepeat: 'repeat-x',
              backgroundSize: '50% 100%',
              backgroundImage: `
                radial-gradient(ellipse 16% 4% at 8% 28%, rgba(255,255,255,0.55) 0%, transparent 65%),
                radial-gradient(ellipse 14% 5% at 18% 52%, rgba(255,255,255,0.45) 0%, transparent 70%),
                radial-gradient(ellipse 20% 4% at 30% 18%, rgba(255,255,255,0.55) 0%, transparent 70%),
                radial-gradient(ellipse 14% 5% at 40% 65%, rgba(255,255,255,0.5) 0%, transparent 70%),
                radial-gradient(ellipse 12% 3% at 46% 38%, rgba(255,255,255,0.42) 0%, transparent 70%)
              `,
              animation: 'planet-clouds 80s linear infinite',
              filter: 'blur(1px)',
              opacity: 0.85,
              mixBlendMode: 'screen',
            } as React.CSSProperties,
          }),

          // 5) Day / night terminator \u2014 darkens the right side
          React.createElement('div', {
            key: 'terminator',
            style: {
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 30% 30%, transparent 0%, transparent 40%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.78) 100%)',
              pointerEvents: 'none',
            } as React.CSSProperties,
          }),

          // 6) Specular highlight (sun reflection)
          React.createElement('div', {
            key: 'spec',
            style: {
              position: 'absolute',
              top: '10%',
              left: '18%',
              width: '34%',
              height: '22%',
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)',
              filter: 'blur(3px)',
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            } as React.CSSProperties,
          }),

          // 7) Atmospheric rim (inner glow on the edge)
          React.createElement('div', {
            key: 'rim',
            style: {
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              boxShadow:
                'inset 0 0 18px rgba(147,197,253,0.65), inset 0 0 38px rgba(96,165,250,0.35)',
              pointerEvents: 'none',
            } as React.CSSProperties,
          }),
        ]),

        // Outer atmospheric halo (rendered AFTER planet, around it)
        React.createElement('div', {
          key: 'planet-halo',
          style: {
            ...abs(center, center),
            width: PLANET_SIZE + 36,
            height: PLANET_SIZE + 36,
            borderRadius: '50%',
            pointerEvents: 'none',
            background:
              'radial-gradient(circle, rgba(96,165,250,0) 48%, rgba(96,165,250,0.35) 51%, rgba(96,165,250,0) 60%)',
            filter: 'blur(2px)',
            animation: 'ott-pulse-aura 5s ease-in-out infinite',
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
    opacity: 0.98,
  },
});
