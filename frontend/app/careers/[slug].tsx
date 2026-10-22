import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import PageShell from '../../src/components/PageShell';
import PageSEO, { breadcrumbsSchema } from '../../src/components/PageSEO';
import Breadcrumbs from '../../src/components/Breadcrumbs';
import GlassCard from '../../src/components/GlassCard';
import NavigationLink from '../../src/components/NavigationLink';
import {
  CAREERS_EMAIL,
  POSITIONS,
  applicationEmailHref,
  applicationHref,
  getPosition,
  jobPostingSchema,
  positionUrl,
  positionContractTerms,
  positionRemotePolicy,
} from '../../src/data/careers';
import { SITE_NAME, SITE_URL } from '../../src/data/siteIdentity';
import { colors, radii, space } from '../../src/theme/tokens';

export function generateStaticParams() {
  return POSITIONS.map(({ id }) => ({ slug: id }));
}

export default function PositionScreen() {
  const { slug } = useLocalSearchParams<{ slug: string | string[] }>();
  const id = (Array.isArray(slug) ? slug[0] : slug) || '';
  const position = getPosition(id);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  if (!position) {
    return (
      <PageShell>
        <PageSEO
          title={`Position not found — ${SITE_NAME}`}
          description="This position is not available. Browse current opportunities at On Time Technology."
          canonical={`${SITE_URL}careers/${id}`}
          noindex
        />
        <View style={styles.content}>
          <Text accessibilityRole="header" style={styles.title}>Position not found</Text>
          <NavigationLink href="/careers" style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>View open positions</Text>
          </NavigationLink>
        </View>
      </PageShell>
    );
  }

  const canonical = positionUrl(position);
  const postedDate = new Date(`${position.datePosted}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });

  return (
    <PageShell>
      <PageSEO
        title={`${position.title} — ${position.location} — ${SITE_NAME}`}
        description={position.summary}
        canonical={canonical}
        keywords={`${position.title}, remote freelance jobs, ${position.stack.join(', ')}, ${SITE_NAME}`}
        schema={[
          breadcrumbsSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Careers', url: `${SITE_URL}careers` },
            { name: position.title, url: canonical },
          ]),
          jobPostingSchema(position),
        ]}
      />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Careers', href: '/careers' },
        { label: position.title },
      ]} />
      <View style={styles.content}>
        <NavigationLink href="/careers" style={styles.backLink}>
          <Ionicons name="arrow-back" size={16} color={colors.textMuted} />
          <Text style={styles.backText}>All open positions</Text>
        </NavigationLink>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>FREELANCE · REMOTE</Text>
          <Text
            accessibilityRole="header"
            style={[styles.title, { fontSize: isDesktop ? 54 : 34, lineHeight: isDesktop ? 62 : 41 }]}
          >
            {position.title}
          </Text>
          <Text style={styles.company}>{SITE_NAME} · Dublin, Ireland</Text>
          <View style={styles.chips}>
            <View style={styles.chip}><Text style={styles.chipText}>{position.location}</Text></View>
            <View style={styles.chip}><Text style={styles.chipText}>{position.type}</Text></View>
          </View>
          <Text style={styles.posted}>Posted {postedDate}</Text>
          <Text style={styles.summary}>{position.summary}</Text>
          <View style={styles.actions}>
            <NavigationLink href={applicationHref(position) as Href} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Apply for this role</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </NavigationLink>
            <NavigationLink href={applicationEmailHref(position) as Href} style={styles.secondaryButton}>
              <Ionicons name="mail-outline" size={16} color={colors.text} />
              <Text style={styles.secondaryButtonText}>Apply by email</Text>
            </NavigationLink>
          </View>
        </View>

        <GlassCard glow={position.glow} style={styles.card}>
          <Text role="heading" aria-level={2} style={styles.sectionTitle}>About the role</Text>
          <Text style={styles.body}>{position.description}</Text>

          <Text role="heading" aria-level={2} style={styles.sectionTitle}>What you bring</Text>
          <View style={styles.requirements}>
            {position.requirements.map((requirement) => (
              <View key={requirement} style={styles.requirement}>
                <View style={styles.bullet} />
                <Text style={[styles.body, styles.requirementText]}>{requirement}</Text>
              </View>
            ))}
          </View>

          <Text role="heading" aria-level={2} style={styles.sectionTitle}>{position.skillsLabel || 'Tech stack'}</Text>
          <View style={styles.chips}>
            {position.stack.map((skill) => (
              <View key={skill} style={styles.chip}><Text style={styles.chipText}>{skill}</Text></View>
            ))}
          </View>

          <Text role="heading" aria-level={2} style={styles.sectionTitle}>Working arrangements</Text>
          <Text style={styles.body}>{position.type}. {positionRemotePolicy(position)}</Text>
          <Text style={styles.body}>{positionContractTerms(position)}</Text>

          <Text role="heading" aria-level={2} style={styles.sectionTitle}>How to apply</Text>
          <Text style={styles.body}>
            Use our application form with this role selected, or email your introduction,
            LinkedIn profile and portfolio to {CAREERS_EMAIL}.
          </Text>
          <View style={styles.actions}>
            <NavigationLink href={applicationHref(position) as Href} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Open application form</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </NavigationLink>
            <NavigationLink href={applicationEmailHref(position) as Href} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>{CAREERS_EMAIL}</Text>
            </NavigationLink>
          </View>
        </GlassCard>
      </View>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  content: { maxWidth: 1000, width: '100%', marginHorizontal: 'auto', paddingHorizontal: space.lg, paddingTop: space.lg, paddingBottom: space.xxxl },
  backLink: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingVertical: 8 },
  backText: { color: colors.textMuted, fontSize: 14, fontWeight: '600' },
  hero: { paddingVertical: space.xl, gap: 18 },
  eyebrow: { color: colors.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 34, fontWeight: '900', letterSpacing: -0.8 },
  company: { color: colors.textMuted, fontSize: 16, lineHeight: 24 },
  posted: { color: colors.textDim, fontSize: 13 },
  summary: { color: colors.text, fontSize: 18, lineHeight: 29, maxWidth: 800 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard },
  chipText: { color: colors.textMuted, fontSize: 12, lineHeight: 18, fontWeight: '600' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginTop: 8 },
  primaryButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.accent, borderRadius: radii.pill, paddingHorizontal: 20, paddingVertical: 13 },
  primaryButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  secondaryButton: { flexDirection: 'row', alignItems: 'center', gap: 8, borderColor: colors.borderStrong, borderWidth: 1, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: 12 },
  secondaryButtonText: { color: colors.text, fontSize: 14, fontWeight: '600' },
  card: { padding: space.lg, gap: 16 },
  sectionTitle: { color: colors.text, fontSize: 22, lineHeight: 29, fontWeight: '800', marginTop: 10 },
  body: { color: colors.textMuted, fontSize: 15.5, lineHeight: 25 },
  requirements: { gap: 10 },
  requirement: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  requirementText: { flex: 1 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.cyan, marginTop: 10 },
});
