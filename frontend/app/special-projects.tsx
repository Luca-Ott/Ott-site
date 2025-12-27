import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SpecialProjectsScreen() {
  const router = useRouter();

  const handleWebsite = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <LinearGradient
      colors={['#2ECC71', '#3498DB', '#1E88E5']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#0066CC" />
          </TouchableOpacity>
          <Text style={styles.title}>Special Projects</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <Text style={styles.introText}>
            We're committed to developing innovative solutions that tackle real-world challenges. 
            Our special projects represent our vision for a better future.
          </Text>

          {/* NoMoreFakeNews Project */}
          <View style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <Ionicons name="shield-checkmark" size={48} color="#0066CC" />
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>In Development</Text>
              </View>
            </View>

            <Text style={styles.projectName}>NoMoreFakeNews</Text>
            
            <Text style={styles.projectDescription}>
              NoMoreFakeNews is an groundbreaking project in active development, designed to combat 
              the growing challenge of fake news and misinformation in today's digital landscape.
            </Text>

            <View style={styles.divider} />

            <Text style={styles.subheading}>Our Mission</Text>
            <Text style={styles.bodyText}>
              Through advanced artificial intelligence, machine learning algorithms, and comprehensive 
              verification technologies, we aim to identify, flag, and eventually eliminate fake news 
              from digital platforms. Our solution will help restore trust in information and protect 
              users from misleading content.
            </Text>

            <Text style={styles.subheading}>Key Objectives</Text>
            <View style={styles.objectivesList}>
              <View style={styles.objectiveItem}>
                <Ionicons name="checkmark-circle" size={20} color="#00AA00" />
                <Text style={styles.objectiveText}>
                  Real-time detection of misinformation across platforms
                </Text>
              </View>
              <View style={styles.objectiveItem}>
                <Ionicons name="checkmark-circle" size={20} color="#00AA00" />
                <Text style={styles.objectiveText}>
                  Advanced AI-powered content verification
                </Text>
              </View>
              <View style={styles.objectiveItem}>
                <Ionicons name="checkmark-circle" size={20} color="#00AA00" />
                <Text style={styles.objectiveText}>
                  Collaborative fact-checking network
                </Text>
              </View>
              <View style={styles.objectiveItem}>
                <Ionicons name="checkmark-circle" size={20} color="#00AA00" />
                <Text style={styles.objectiveText}>
                  User education and awareness programs
                </Text>
              </View>
            </View>

            <View style={styles.investorSection}>
              <Text style={styles.investorHeading}>Investment Opportunity</Text>
              <Text style={styles.investorText}>
                We're seeking strategic partners and investors who share our vision of creating 
                a more trustworthy digital information ecosystem. Join us in making a meaningful 
                impact on global information integrity.
              </Text>
              <TouchableOpacity 
                style={styles.investorButton}
                onPress={() => router.push('/investor-inquiry')}
              >
                <Ionicons name="briefcase" size={24} color="#FFF" />
                <Text style={styles.investorButtonText}>Investment Inquiry</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Custodiy Project */}
          <View style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <Ionicons name="cube" size={48} color="#0066CC" />
              <TouchableOpacity 
                onPress={() => handleWebsite('https://www.custodiy.com')}
              >
                <Ionicons name="open-outline" size={24} color="#0066CC" />
              </TouchableOpacity>
            </View>

            <Text style={styles.projectName}>Custodiy</Text>
            
            <Text style={styles.projectDescription}>
              Custodiy is a comprehensive modular platform designed to empower individuals and 
              businesses in the digital economy. Whether you're an entrepreneur looking to establish 
              your own marketplace, a seller seeking to expand your reach, or an organization aiming 
              to facilitate OTC transactions and fundraising, Custodiy provides the tools and support you need.
            </Text>

            <View style={styles.divider} />

            <Text style={styles.subheading}>Platform Features</Text>
            
            <View style={styles.featureCard}>
              <Ionicons name="swap-horizontal" size={32} color="#0066CC" />
              <Text style={styles.featureTitle}>OTC Service</Text>
              <Text style={styles.featureDescription}>
                Facilitate over-the-counter token trading with secure, transparent transactions. 
                Perfect for projects looking to sell tokens directly.
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Ionicons name="lock-closed" size={32} color="#0066CC" />
              <Text style={styles.featureTitle}>Escrow Service</Text>
              <Text style={styles.featureDescription}>
                Secure transactions via smart contracts. Buyers send stablecoins to locked contracts, 
                ensuring trust and security for all parties involved.
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Ionicons name="storefront" size={32} color="#0066CC" />
              <Text style={styles.featureTitle}>Marketplace</Text>
              <Text style={styles.featureDescription}>
                Comprehensive marketplace solution for merchants, producers, and sellers. Accept 
                stablecoin payments and manage your online store with ease.
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Ionicons name="folder" size={32} color="#0066CC" />
              <Text style={styles.featureTitle}>Document Management</Text>
              <Text style={styles.featureDescription}>
                Secure storage and management for important documents, ensuring accessibility, 
                security, and compliance.
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.visitButton}
              onPress={() => handleWebsite('https://www.custodiy.com')}
            >
              <Text style={styles.visitButtonText}>Visit Custodiy</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  introText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginVertical: 24,
    textAlign: 'center',
  },
  projectCard: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  projectName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  projectDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  objectivesList: {
    gap: 12,
    marginBottom: 24,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  objectiveText: {
    flex: 1,
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  investorSection: {
    backgroundColor: '#E6F2FF',
    padding: 20,
    borderRadius: 12,
    marginTop: 8,
  },
  investorHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 12,
  },
  investorText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  investorButton: {
    backgroundColor: '#0066CC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderRadius: 8,
  },
  investorButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  featureCard: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 8,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  visitButton: {
    backgroundColor: '#0066CC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  visitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});