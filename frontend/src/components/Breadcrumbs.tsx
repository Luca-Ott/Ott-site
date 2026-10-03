import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import type { Href } from 'expo-router';
import NavigationLink from './NavigationLink';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, space } from '../theme/tokens';

export type BreadcrumbItem = { label: string; href?: string };

type Props = { items: BreadcrumbItem[] };

/**
 * Visible breadcrumb bar. Combine with breadcrumbsSchema() inside PageSEO
 * for full SEO benefit.
 */
export default function Breadcrumbs({ items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.wrap} role="navigation" accessibilityLabel="Breadcrumb">
      {items.map((it, idx) => {
        const isLast = idx === items.length - 1;
        const isLink = !isLast && it.href;
        const label = <Text style={[styles.label, isLast && styles.labelCurrent]} numberOfLines={1}>{it.label}</Text>;
        return (
          <React.Fragment key={`${it.label}-${idx}`}>
            {isLink ? (
              <NavigationLink href={it.href as Href} style={styles.item}>{label}</NavigationLink>
            ) : (
              <View style={styles.item}>{label}</View>
            )}
            {!isLast && (
              <Ionicons name="chevron-forward" size={12} color={colors.textDim} style={{ marginHorizontal: 6 }} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: 4,
    maxWidth: 1180,
    width: '100%',
    marginHorizontal: 'auto' as any,
  },
  item: { paddingVertical: 4 },
  label: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '600',
    letterSpacing: 0.2,
    ...(Platform.OS === 'web' ? ({ transition: 'color 0.2s ease' } as any) : {}),
  },
  labelCurrent: { color: colors.text },
});
