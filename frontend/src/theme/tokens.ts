// Design tokens for ON TIME TECHNOLOGY — futuristic AI/space theme

export const colors = {
  // Deep space backgrounds
  bg: '#05060F',
  bgElevated: '#0B0D1B',
  bgCard: 'rgba(255, 255, 255, 0.035)',
  bgCardHover: 'rgba(255, 255, 255, 0.06)',

  // Borders
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.16)',

  // Neon accents
  accent: '#3B82F6',
  accentBright: '#60A5FA',
  cyan: '#22D3EE',
  purple: '#A855F7',
  pink: '#EC4899',
  green: '#10B981',
  amber: '#F59E0B',

  // Text
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  textDim: '#64748B',

  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

export const radii = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 80,
};

export const fontSizes = {
  micro: 11,
  caption: 13,
  body: 15,
  bodyLg: 17,
  h6: 18,
  h5: 22,
  h4: 28,
  h3: 34,
  h2: 44,
  h1: 56,
  display: 72,
};

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  black: '900' as const,
};

export const shadows = {
  glow: '0 0 40px rgba(59, 130, 246, 0.35)',
  glowCyan: '0 0 40px rgba(34, 211, 238, 0.35)',
  glowPurple: '0 0 40px rgba(168, 85, 247, 0.4)',
  card: '0 20px 60px rgba(0, 0, 0, 0.5)',
};
