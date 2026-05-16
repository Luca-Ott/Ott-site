import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { colors, radii } from '../theme/tokens';

type Props = PropsWithChildren<{ style?: ViewStyle | ViewStyle[]; glow?: 'blue' | 'purple' | 'cyan' | 'none' }>;

export default function GlassCard({ children, style, glow = 'none' }: Props) {
  const glowColor =
    glow === 'blue' ? 'rgba(59,130,246,0.25)'
    : glow === 'cyan' ? 'rgba(34,211,238,0.25)'
    : glow === 'purple' ? 'rgba(168,85,247,0.3)'
    : 'transparent';

  return (
    <View
      style={[
        styles.card,
        Platform.OS === 'web' && ({
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: glow !== 'none' ? `0 30px 80px ${glowColor}, 0 0 0 1px rgba(255,255,255,0.06) inset` : '0 20px 60px rgba(0,0,0,0.5)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        } as any),
        style as any,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    overflow: 'hidden',
  },
});
