import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

type Props = { size?: number };

const LOGO_URL =
  'https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68';

/**
 * Cinematic AI/space orbit visual with the OTT logo rendered as a floating
 * puzzle of small tiles at the centre of perfectly concentric rings.
 *  - 4 tilted rings, all sharing the SAME rotation axis (perfectly centred)
 *  - Glowing satellites travelling along each ring at different speeds
 *  - Twinkling stars
 *  - Pulsing aura behind the logo
 *  - 7\u00d77 = 49 puzzle tiles forming the OTT logo, each wobbling independently
 *
 * Web-only \u2014 returns null on native.
 */
export default function OrbitVisual({ size = 520 }: Props) {
  if (Platform.OS !== 'web') return null;

  const center = size / 2;

  // Shared tilt for ALL rings so they remain perfectly concentric
  // around the centre point where the puzzle logo sits.
  const SHARED_TILT = 'rotateX(68deg) rotateZ(-8deg)';

  // Rings: diameter, duration (s), direction, colours
  const rings = [
    { d: size * 0.96, dur: 90, reverse: false, color: 'rgba(96,165,250,0.7)',  satColor: '#60A5FA', satSize: 8,  stroke: 'rgba(96,165,250,0.18)' },
    { d: size * 0.78, dur: 60, reverse: true,  color: 'rgba(168,85,247,0.75)', satColor: '#A855F7', satSize: 10, stroke: 'rgba(168,85,247,0.22)' },
    { d: size * 0.6,  dur: 38, reverse: false, color: 'rgba(34,211,238,0.85)', satColor: '#22D3EE', satSize: 7,  stroke: 'rgba(34,211,238,0.26)' },
    { d: size * 0.42, dur: 24, reverse: true,  color: 'rgba(236,72,153,0.85)', satColor: '#EC4899', satSize: 6,  stroke: 'rgba(236,72,153,0.28)' },
  ];

  // Puzzle config — small 3D globe of OTT logo tiles
  const LOGO_BOX = Math.round(size * 0.22); // ~114px for size=520 — smaller & more elegant
  const GRID = 6;
  const PIECE = LOGO_BOX / GRID;
  const LOGO_LEFT = center - LOGO_BOX / 2;
  const LOGO_TOP = center - LOGO_BOX / 2;

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

  // Deterministic pseudo-random so pieces don't reshuffle on every render
  const prand = (seed: number) => {
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };

  return (
    <View pointerEvents="none" style={styles.outer}>
      {React.createElement('div', { style: wrapperStyle }, [
        // Atmospheric background glow
        React.createElement('div', {
          key: 'aura-bg',
          style: {
            ...abs(center, center),
            width: size * 1.05,
            height: size * 1.05,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(59,130,246,0.20) 0%, rgba(168,85,247,0.12) 40%, rgba(0,0,0,0) 70%)',
            filter: 'blur(20px)',
            animation: 'ott-pulse-aura 6s ease-in-out infinite',
          } as React.CSSProperties,
        }),

        // Twinkling stars sprinkled around the orbits
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

        // Orbital rings (all share SHARED_TILT \u2192 perfectly concentric)
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

        // Halo behind the 3D logo globe
        React.createElement('div', {
          key: 'logo-halo',
          style: {
            ...abs(center, center),
            width: LOGO_BOX * 2.4,
            height: LOGO_BOX * 2.4,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(96,165,250,0.55) 0%, rgba(168,85,247,0.30) 35%, rgba(0,0,0,0) 70%)',
            filter: 'blur(14px)',
            animation: 'ott-pulse-aura 5s ease-in-out infinite',
          } as React.CSSProperties,
        }),

        // 3D LOGO GLOBE — rotating sphere of puzzle tiles with sphere shading
        React.createElement('div', {
          key: 'globe',
          style: {
            ...abs(center, center),
            width: LOGO_BOX,
            height: LOGO_BOX,
            perspective: '600px',
            transformStyle: 'preserve-3d',
          } as React.CSSProperties,
        },
          React.createElement('div', {
            key: 'globe-spin',
            style: {
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              transformStyle: 'preserve-3d',
              animation: 'ott-globe-tilt 9s ease-in-out infinite',
            } as React.CSSProperties,
          }, [
            // PUZZLE TILES forming the OTT brand mark
            ...Array.from({ length: GRID * GRID }).map((_, i) => {
              const row = Math.floor(i / GRID);
              const col = i % GRID;
              const wobbleDur = 2.4 + prand(i) * 2.2;
              const delay = prand(i + 100) * 4;
              return React.createElement('div', {
                key: `tile-${i}`,
                style: {
                  position: 'absolute',
                  left: col * PIECE,
                  top: row * PIECE,
                  width: PIECE,
                  height: PIECE,
                  backgroundImage: `url(${LOGO_URL})`,
                  backgroundSize: `${LOGO_BOX}px ${LOGO_BOX}px`,
                  backgroundPosition: `-${col * PIECE}px -${row * PIECE}px`,
                  backgroundRepeat: 'no-repeat',
                  animation: `ott-puzzle-wobble ${wobbleDur.toFixed(2)}s ease-in-out ${delay.toFixed(2)}s infinite`,
                  transformOrigin: 'center center',
                  boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.06), 0 0 0 0.5px rgba(0,0,0,0.5)',
                  borderRadius: 1,
                } as React.CSSProperties,
              });
            }),
            // Sphere shading (darkens edges + lit top-left → 3D depth)
            React.createElement('div', {
              key: 'sphere-shade',
              style: {
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)',
                pointerEvents: 'none',
                mixBlendMode: 'overlay',
              } as React.CSSProperties,
            }),
            // Specular highlight (glass sphere feel)
            React.createElement('div', {
              key: 'sphere-spec',
              style: {
                position: 'absolute',
                top: '6%',
                left: '14%',
                width: '36%',
                height: '22%',
                borderRadius: '50%',
                background:
                  'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
                filter: 'blur(3px)',
                pointerEvents: 'none',
                mixBlendMode: 'screen',
              } as React.CSSProperties,
            }),
            // Rim glow (atmospheric edge)
            React.createElement('div', {
              key: 'sphere-rim',
              style: {
                position: 'absolute',
                inset: -2,
                borderRadius: '50%',
                boxShadow:
                  '0 0 24px rgba(96,165,250,0.65), 0 0 48px rgba(168,85,247,0.4), inset 0 0 14px rgba(34,211,238,0.3)',
                pointerEvents: 'none',
              } as React.CSSProperties,
            }),
          ])
        ),
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
    opacity: 0.95,
  },
});
