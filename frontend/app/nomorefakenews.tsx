import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Head from 'expo-router/head';

export default function NoMoreFakeNewsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <LinearGradient
      colors={['#2ECC71', '#3498DB', '#1E88E5']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Head>
        <title>NoMoreFakeNews - On Time Technology Ltd</title>
        <meta name="description" content="NoMoreFakeNews is an innovative AI-powered project by On Time Technology Ltd designed to combat fake news and misinformation through advanced detection technology." />
        <link rel="canonical" href="https://www.ott4future.com/nomorefakenews" />
        <meta property="og:url" content="https://www.ott4future.com/nomorefakenews" />
      </Head>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => router.canGoBack() ? router.back() : router.replace('/')}
                >
                  <Ionicons name="arrow-back" size={24} color="#0066CC" />
                </TouchableOpacity>
                <Image
                  source={{ uri: 'https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68' }}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.title}>NoMoreFakeNews</Text>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
              {/* Hero Image */}
              <View style={styles.heroContainer}>
                <Image
                  source={require('../assets/nomorefakenews-hero.jpg')}
                  style={[styles.heroImage, isDesktop && styles.heroImageDesktop]}
                  resizeMode="cover"
                />
              </View>

              {/* Main Info Card */}
              <View style={styles.mainCard}>
                <View style={styles.logoRow}>
                  <Image 
                    source={require('../assets/nomorefakenews-logo.png')}
                    style={styles.projectLogo}
                    resizeMode="contain"
                  />
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>In Development</Text>
                  </View>
                </View>

                <Text style={styles.mainTitle}>
                  Completely Eliminating Fake News with AI
                </Text>

                <Text style={styles.tagline}>
                  Building a healthy & trustworthy information ecosystem
                </Text>

                <View style={styles.divider} />

                <Text style={styles.sectionHeading}>The Project</Text>
                <Text style={styles.bodyText}>
                  NoMoreFakeNews is a groundbreaking project in active development, designed to combat 
                  the growing challenge of fake news and misinformation in today's digital landscape. 
                  Through advanced artificial intelligence, machine learning algorithms, and comprehensive 
                  verification technologies, we aim to identify, flag, and eventually eliminate fake news 
                  from digital platforms.
                </Text>

                <Text style={styles.sectionHeading}>Our Mission</Text>
                <Text style={styles.bodyText}>
                  Our mission is to restore trust in information and protect users from misleading content. 
                  In an era where misinformation spreads faster than ever, we are building tools that empower 
                  individuals and organizations to verify the authenticity of the information they consume 
                  and share.
                </Text>
              </View>

              {/* Key Objectives */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Key Objectives</Text>
                
                <View style={styles.objectivesList}>
                  <View style={styles.objectiveItem}>
                    <View style={styles.objectiveIconContainer}>
                      <Ionicons name="search" size={24} color="#FFF" />
                    </View>
                    <View style={styles.objectiveContent}>
                      <Text style={styles.objectiveTitle}>Real-time Detection</Text>
                      <Text style={styles.objectiveText}>
                        Real-time detection of misinformation across digital platforms using advanced AI algorithms.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.objectiveItem}>
                    <View style={[styles.objectiveIconContainer, { backgroundColor: '#3498DB' }]}>
                      <Ionicons name="shield-checkmark" size={24} color="#FFF" />
                    </View>
                    <View style={styles.objectiveContent}>
                      <Text style={styles.objectiveTitle}>AI-Powered Verification</Text>
                      <Text style={styles.objectiveText}>
                        Advanced AI-powered content verification to distinguish between authentic and fabricated information.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.objectiveItem}>
                    <View style={[styles.objectiveIconContainer, { backgroundColor: '#E67E22' }]}>
                      <Ionicons name="people" size={24} color="#FFF" />
                    </View>
                    <View style={styles.objectiveContent}>
                      <Text style={styles.objectiveTitle}>Collaborative Fact-Checking</Text>
                      <Text style={styles.objectiveText}>
                        A collaborative fact-checking network connecting experts, journalists, and citizens in the fight against misinformation.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.objectiveItem}>
                    <View style={[styles.objectiveIconContainer, { backgroundColor: '#9B59B6' }]}>
                      <Ionicons name="school" size={24} color="#FFF" />
                    </View>
                    <View style={styles.objectiveContent}>
                      <Text style={styles.objectiveTitle}>Education & Awareness</Text>
                      <Text style={styles.objectiveText}>
                        User education and awareness programs to help people develop critical thinking skills for evaluating information.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Technology Stack */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Technology & Approach</Text>

                <View style={isDesktop ? styles.techGridDesktop : styles.techGrid}>
                  <View style={styles.techItem}>
                    <Ionicons name="hardware-chip" size={36} color="#0066CC" />
                    <Text style={styles.techTitle}>Machine Learning</Text>
                    <Text style={styles.techDescription}>
                      Advanced ML models trained on massive datasets to identify patterns of misinformation.
                    </Text>
                  </View>

                  <View style={styles.techItem}>
                    <Ionicons name="language" size={36} color="#0066CC" />
                    <Text style={styles.techTitle}>Natural Language Processing</Text>
                    <Text style={styles.techDescription}>
                      NLP algorithms that analyze text for sentiment, bias, and factual inconsistencies.
                    </Text>
                  </View>

                  <View style={styles.techItem}>
                    <Ionicons name="git-network" size={36} color="#0066CC" />
                    <Text style={styles.techTitle}>Graph Analysis</Text>
                    <Text style={styles.techDescription}>
                      Network analysis to track the spread of misinformation and identify its sources.
                    </Text>
                  </View>

                  <View style={styles.techItem}>
                    <Ionicons name="analytics" size={36} color="#0066CC" />
                    <Text style={styles.techTitle}>Data Analytics</Text>
                    <Text style={styles.techDescription}>
                      Real-time data analytics dashboard for monitoring information integrity across platforms.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Impact Section */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Expected Impact</Text>
                <Text style={styles.bodyText}>
                  NoMoreFakeNews aims to create a measurable impact on the quality of information 
                  available in the digital space. Our comprehensive approach combines cutting-edge technology 
                  with human expertise to build a more reliable and trustworthy information ecosystem for everyone.
                </Text>

                <View style={styles.impactGrid}>
                  <View style={styles.impactItem}>
                    <Ionicons name="globe" size={32} color="#2ECC71" />
                    <Text style={styles.impactTitle}>Global Reach</Text>
                    <Text style={styles.impactText}>Multi-language support for worldwide impact</Text>
                  </View>
                  <View style={styles.impactItem}>
                    <Ionicons name="flash" size={32} color="#E67E22" />
                    <Text style={styles.impactTitle}>Real-time</Text>
                    <Text style={styles.impactText}>Instant detection and verification</Text>
                  </View>
                  <View style={styles.impactItem}>
                    <Ionicons name="trending-up" size={32} color="#3498DB" />
                    <Text style={styles.impactTitle}>Scalable</Text>
                    <Text style={styles.impactText}>Designed to grow with the digital ecosystem</Text>
                  </View>
                </View>
              </View>

              {/* Investment CTA */}
              <View style={styles.investorCard}>
                <Ionicons name="briefcase" size={40} color="#FFF" />
                <Text style={styles.investorTitle}>Investment Opportunity</Text>
                <Text style={styles.investorDescription}>
                  We're seeking strategic partners and investors who share our vision of creating 
                  a more trustworthy digital information ecosystem. Join us in making a meaningful 
                  impact on global information integrity.
                </Text>
                <TouchableOpacity 
                  style={styles.investorButton}
                  onPress={() => router.push('/investor-inquiry')}
                >
                  <Text style={styles.investorButtonText}>Investment Inquiry</Text>
                  <Ionicons name="arrow-forward" size={20} color="#0066CC" />
                </TouchableOpacity>
              </View>

              {/* Website Reference */}
              <View style={styles.websiteCard}>
                <Text style={styles.websiteText}>www.ott4future.com</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 1400,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D0EBFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  placeholder: {
    width: 32,
  },
  content: {
    paddingHorizontal: 16,
  },
  // Hero Image
  heroContainer: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },
  heroImageDesktop: {
    height: 400,
  },
  // Main Card
  mainCard: {
    backgroundColor: '#D0EBFF',
    padding: 24,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  projectLogo: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  statusBadge: {
    backgroundColor: '#FFF4E5',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    color: '#FF8C00',
    fontWeight: '600',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 17,
    color: '#0066CC',
    fontWeight: '500',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 10,
    marginTop: 4,
  },
  bodyText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
    marginBottom: 16,
  },
  // Cards
  card: {
    backgroundColor: '#D0EBFF',
    padding: 24,
    borderRadius: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  // Objectives
  objectivesList: {
    gap: 16,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  objectiveIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#2ECC71',
    alignItems: 'center',
    justifyContent: 'center',
  },
  objectiveContent: {
    flex: 1,
  },
  objectiveTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  objectiveText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
  },
  // Technology Grid
  techGrid: {
    gap: 16,
  },
  techGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  techItem: {
    backgroundColor: '#F5F9FF',
    padding: 20,
    borderRadius: 12,
    flex: 1,
    minWidth: 200,
  },
  techTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 10,
    marginBottom: 6,
  },
  techDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  // Impact Grid
  impactGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  impactItem: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  impactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 8,
    textAlign: 'center',
  },
  impactText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  // Investor Card
  investorCard: {
    backgroundColor: '#0066CC',
    padding: 28,
    borderRadius: 16,
    marginTop: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  investorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  investorDescription: {
    fontSize: 15,
    color: '#D4E6F9',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  investorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 8,
  },
  investorButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
  },
  // Website Card
  websiteCard: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 12,
  },
  websiteText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
    opacity: 0.9,
  },
});
