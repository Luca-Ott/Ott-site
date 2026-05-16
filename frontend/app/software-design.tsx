import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Head from 'expo-router/head';

import ServicePageShell from '../src/components/ServicePageShell';

export default function SoftwareDesignScreen() {
  return (
    <ServicePageShell
      seoTitle="Software Design — On Time Technology"
      seoDescription="Software design services from On Time Technology Ltd — user-centred, scalable architectures and elegant UX for ambitious products."
      canonical="https://www.ott4future.com/software-design"
      eyebrow="SOFTWARE DESIGN"
      titleStart="Designing software"
      titleEnd="users love"
      titleColors={['#60A5FA', '#A855F7']}
      subtitle="From discovery and product strategy to systems architecture and pixel-perfect UI — we design software that is intuitive to use, beautiful to look at and engineered to scale."
      features={[
        { icon: 'color-palette', title: 'UI / UX Design', body: 'Modern, accessible, mobile-first interfaces grounded in real user research and rapid prototyping.' },
        { icon: 'apps', title: 'Design Systems', body: 'Token-based design systems that keep teams shipping consistent, on-brand experiences at speed.' },
        { icon: 'cube-outline', title: 'Information Architecture', body: 'Clear, navigable structures that turn complex domains into effortless products.' },
        { icon: 'analytics', title: 'Strategy & Discovery', body: 'Lean discovery sprints to validate ideas, define KPIs and align stakeholders before a single line of code.' },
        { icon: 'phone-portrait', title: 'Prototyping', body: 'Interactive prototypes for stakeholder buy-in, usability testing and developer hand-off.' },
        { icon: 'eye', title: 'Brand & Visual Identity', body: 'Visual language, typography and motion that make your product feel unmistakably yours.' },
      ]}
    />
  );
}

// styles unused; kept for tree-shaking simplicity
const _s = StyleSheet.create({});
