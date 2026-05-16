import React from 'react';
import { StyleSheet } from 'react-native';
import ServicePageShell from '../src/components/ServicePageShell';

export default function SoftwareDevelopmentScreen() {
  return (
    <ServicePageShell
      seoTitle="Software Development — On Time Technology"
      seoDescription="Full-stack software development from On Time Technology Ltd — web, mobile and back-end engineering for ambitious products."
      canonical="https://www.ott4future.com/software-development"
      eyebrow="SOFTWARE DEVELOPMENT"
      titleStart="Engineering at the"
      titleEnd="speed of vision"
      titleColors={['#22D3EE', '#3B82F6']}
      subtitle="From web platforms to native mobile apps and resilient back-end systems — we build production-grade software with modern stacks, observability and a long-term maintenance horizon."
      features={[
        { icon: 'globe-outline', title: 'Web Platforms', body: 'Performant, SEO-friendly web apps built with React, Next.js, and a typed full-stack mindset.' },
        { icon: 'phone-portrait', title: 'Mobile Apps', body: 'Cross-platform iOS / Android apps with React Native & Expo, designed for App Store quality.' },
        { icon: 'server', title: 'Back-End & APIs', body: 'Python / Node back-ends, REST & GraphQL APIs, real-time systems and microservice architectures.' },
        { icon: 'lock-closed', title: 'Security & Auth', body: 'OAuth / SSO, RBAC, secrets management and zero-trust patterns baked in by default.' },
        { icon: 'git-branch', title: 'DevOps & CI/CD', body: 'Containerised deployments, observability, blue-green releases and automated rollback.' },
        { icon: 'flash', title: 'Performance', body: 'Profiling, caching strategies and edge delivery so your product feels instant at any scale.' },
      ]}
    />
  );
}
const _s = StyleSheet.create({});
