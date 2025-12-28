import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SoftwareDesignScreen() {
  const router = useRouter();

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
            <Text style={styles.title}>Software Design</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.content}>
            {/* Main Card */}
            <View style={styles.mainCard}>
              <View style={styles.iconHeader}>
                <Ionicons name="color-palette" size={64} color="#0066CC" />
              </View>

              <Text style={styles.mainTitle}>Software Design Excellence</Text>
              
              <Text style={styles.introText}>
                Our Software Design division specializes in creating intuitive, user-centered digital experiences 
                that seamlessly blend functionality with aesthetic appeal. We believe that exceptional design 
                is not just about how something looks, but how it works and feels for the end user.
              </Text>

              <View style={styles.divider} />

              <Text style={styles.sectionHeading}>Our Design Philosophy</Text>
              <Text style={styles.bodyText}>
                We approach every project with a human-centered design methodology, ensuring that user needs 
                and business objectives are perfectly aligned. Our team combines creative vision with technical 
                expertise to deliver solutions that are not only visually stunning but also highly functional 
                and accessible across all platforms and devices.
              </Text>

              <Text style={styles.sectionHeading}>Core Design Services</Text>
              
              <View style={styles.serviceCard}>
                <Ionicons name="phone-portrait" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Mobile App Design</Text>
                <Text style={styles.serviceDescription}>
                  Creating native and cross-platform mobile experiences that engage users and drive business 
                  results. From wireframing to final UI implementation, we ensure every interaction is 
                  purposeful and delightful across iOS and Android platforms. Our mobile designs prioritize 
                  touch-friendly interfaces, gesture controls, and platform-specific design patterns.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="desktop" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Web Application Design</Text>
                <Text style={styles.serviceDescription}>
                  Responsive web applications that work flawlessly across all devices and browsers. We focus 
                  on creating scalable design systems that maintain consistency while allowing for future 
                  growth and feature expansion. Our web designs emphasize performance, accessibility, and 
                  seamless user journeys.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="people" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>User Experience (UX) Research</Text>
                <Text style={styles.serviceDescription}>
                  In-depth user research, persona development, and journey mapping to understand your audience 
                  and create experiences that truly resonate. We use data-driven insights to inform every 
                  design decision through methods including user interviews, usability testing, A/B testing, 
                  and analytics review. Our research validates assumptions and guides strategic design choices.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="brush" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Brand Identity & Visual Design</Text>
                <Text style={styles.serviceDescription}>
                  Comprehensive brand identity development including logo design, color palettes, typography, 
                  iconography, and visual guidelines that create memorable and cohesive brand experiences across 
                  all digital touchpoints. We ensure your brand stands out while maintaining consistency across 
                  every customer interaction.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="layers" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Design Systems & Component Libraries</Text>
                <Text style={styles.serviceDescription}>
                  Building comprehensive design systems that streamline development and ensure consistency. 
                  We create reusable components, style guides, and documentation that enable teams to work 
                  efficiently while maintaining design quality across your entire product ecosystem.
                </Text>
              </View>

              <Text style={styles.sectionHeading}>Design Process Excellence</Text>
              <View style={styles.processList}>
                <View style={styles.processItem}>
                  <View style={styles.processNumber}>
                    <Text style={styles.processNumberText}>1</Text>
                  </View>
                  <View style={styles.processContent}>
                    <Text style={styles.processTitle}>Discovery & Research</Text>
                    <Text style={styles.processDescription}>
                      Understanding user needs, business goals, and market landscape through comprehensive research
                    </Text>
                  </View>
                </View>

                <View style={styles.processItem}>
                  <View style={styles.processNumber}>
                    <Text style={styles.processNumberText}>2</Text>
                  </View>
                  <View style={styles.processContent}>
                    <Text style={styles.processTitle}>Ideation & Wireframing</Text>
                    <Text style={styles.processDescription}>
                      Exploring concepts and creating low-fidelity prototypes to validate information architecture
                    </Text>
                  </View>
                </View>

                <View style={styles.processItem}>
                  <View style={styles.processNumber}>
                    <Text style={styles.processNumberText}>3</Text>
                  </View>
                  <View style={styles.processContent}>
                    <Text style={styles.processTitle}>Visual Design</Text>
                    <Text style={styles.processDescription}>
                      Creating high-fidelity designs with attention to aesthetics, branding, and user experience
                    </Text>
                  </View>
                </View>

                <View style={styles.processItem}>
                  <View style={styles.processNumber}>
                    <Text style={styles.processNumberText}>4</Text>
                  </View>
                  <View style={styles.processContent}>
                    <Text style={styles.processTitle}>Prototyping & Testing</Text>
                    <Text style={styles.processDescription}>
                      Building interactive prototypes and conducting user testing to refine the experience
                    </Text>
                  </View>
                </View>

                <View style={styles.processItem}>
                  <View style={styles.processNumber}>
                    <Text style={styles.processNumberText}>5</Text>
                  </View>
                  <View style={styles.processContent}>
                    <Text style={styles.processTitle}>Implementation Support</Text>
                    <Text style={styles.processDescription}>
                      Collaborating with development teams to ensure pixel-perfect implementation
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.sectionHeading}>Why Choose Our Design Services</Text>
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    User-centered approach with accessibility-first design (WCAG 2.1 AA compliance)
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    Award-winning design team with 15+ years combined experience
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    Comprehensive design systems and documentation for seamless handoff
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    Iterative process with regular stakeholder feedback and validation
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    Cross-platform expertise ensuring consistency across web, mobile, and emerging technologies
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8F4F8',
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
    marginTop: 16,
  },
  mainCard: {
    backgroundColor: '#E8F4F8',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  iconHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066CC',
    textAlign: 'center',
    marginBottom: 16,
  },
  introText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#D0D0D0',
    marginVertical: 20,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 12,
    marginTop: 8,
  },
  bodyText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066CC',
    marginTop: 12,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  processList: {
    marginBottom: 20,
  },
  processItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  processNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  processNumberText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  processContent: {
    flex: 1,
  },
  processTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  processDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
});