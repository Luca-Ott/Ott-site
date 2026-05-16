import React from 'react';
import { StyleSheet } from 'react-native';
import ServicePageShell from '../src/components/ServicePageShell';

export default function ResearchDevelopmentScreen() {
  return (
    <ServicePageShell
      seoTitle="Research & Development — On Time Technology"
      seoDescription="R&D services from On Time Technology Ltd — exploring AI, Web3, trust infrastructure and emerging technologies for the next decade."
      canonical="https://www.ott4future.com/research-development"
      eyebrow="RESEARCH & DEVELOPMENT"
      titleStart="From idea to"
      titleEnd="breakthrough"
      titleColors={['#A855F7', '#EC4899']}
      subtitle="We run a quietly ambitious R&D programme exploring the technologies that will define the next decade — from frontier AI and verifiable trust to programmable commerce and cyber resilience."
      features={[
        { icon: 'sparkles-outline', title: 'Applied AI', body: 'LLM agents, retrieval, evaluation pipelines and bespoke models trained on your domain.' },
        { icon: 'cube-outline', title: 'Web3 & Tokenisation', body: 'Smart contracts, on-chain identity, tokenised commodities and programmable settlement.' },
        { icon: 'shield-checkmark-outline', title: 'Cyber Security', body: 'Threat modelling, secure architectures and offensive research for next-gen attackers.' },
        { icon: 'eye-outline', title: 'Verifiable AI', body: 'Provenance, watermarking and cryptographic signatures for trustworthy content.' },
        { icon: 'planet-outline', title: 'Frontier Prototypes', body: 'Rapid build-measure-learn loops to de-risk strategic bets before investing at scale.' },
        { icon: 'school-outline', title: 'Capability Transfer', body: 'We embed our research into your team via workshops, documentation and joint projects.' },
      ]}
    />
  );
}
const _s = StyleSheet.create({});
