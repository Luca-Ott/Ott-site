import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, space } from '../theme/tokens';

export type BreadcrumbItem = { label: string; href?: string };

type Props = { items: BreadcrumbItem[] };

/**
 * Visible breadcrumb bar. Combine with breadcrumbsSchema() inside PageSEO
 * for full SEO benefit.
 */
export default function Breadcrumbs({ items }: Props) {
  const router = useRouter();
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.wrap} accessibilityRole="navigation" accessibilityLabel="Breadcrumb">
      {items.map((it, idx) => {
        const isLast = idx === items.length - 1;
        const isLink = !isLast && it.href;
        const TextWrap: any = isLink ? TouchableOpacity : View;
        return (
          <React.Fragment key={`${it.label}-${idx}`}>
            <TextWrap
              onPress={isLink ? () => router.push(it.href as any) : undefined}
              accessibilityRole={isLink ? 'link' : undefined}
              style={styles.item}
            >
              <Text style={[styles.label, isLast && styles.labelCurrent]} numberOfLines={1}>
                {it.label}
              </Text>
            </TextWrap>
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
