import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutScreen() {
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
            <Text style={styles.title}>About Us</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.content}>
            {/* Main Card */}
            <View style={styles.mainCard}>
              <View style={styles.iconHeader}>
                <Ionicons name="business" size={64} color="#0066CC" />
              </View>

              <Text style={styles.mainTitle}>Building the Future of Technology</Text>
              
              <Text style={styles.introText}>
                At On Time Technology, we are passionate about crafting exceptional software solutions 
                that drive business growth. With expertise in software design, development, and research 
                & development, we transform ideas into powerful digital experiences.
              </Text>

              <View style={styles.divider} />

              <Text style={styles.sectionHeading}>Our Mission</Text>
              <Text style={styles.bodyText}>
                Our mission is to deliver cutting-edge technology solutions that empower businesses to 
                thrive in the digital age. We combine technical excellence with creative innovation to 
                build products that make a real difference.
              </Text>

              <Text style={styles.sectionHeading}>What We Do</Text>
              
              <View style={styles.serviceCard}>
                <Ionicons name="color-palette" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Software Design</Text>
                <Text style={styles.serviceDescription}>
                  Creating intuitive, user-centered digital experiences that seamlessly blend functionality 
                  with aesthetic appeal. We design solutions that users love.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="code-slash" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Software Development</Text>
                <Text style={styles.serviceDescription}>
                  Transforming innovative ideas into robust, scalable, and high-performance applications 
                  using cutting-edge technologies and industry best practices.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="flask" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Research & Development</Text>
                <Text style={styles.serviceDescription}>
                  Exploring emerging technologies and developing breakthrough solutions that shape the 
                  future of software and digital experiences.
                </Text>
              </View>

              <Text style={styles.sectionHeading}>Our Values</Text>
              <View style={styles.valuesList}>
                <View style={styles.valueItem}>
                  <Ionicons name="star" size={24} color="#FFD700" />
                  <View style={styles.valueContent}>
                    <Text style={styles.valueTitle}>Excellence</Text>
                    <Text style={styles.valueText}>
                      We strive for excellence in everything we do, maintaining the highest standards 
                      of quality and professionalism.
                    </Text>
                  </View>
                </View>

                <View style={styles.valueItem}>
                  <Ionicons name="bulb" size={24} color="#FFD700" />
                  <View style={styles.valueContent}>
                    <Text style={styles.valueTitle}>Innovation</Text>
                    <Text style={styles.valueText}>
                      We embrace innovation and continuously explore new technologies and approaches 
                      to deliver cutting-edge solutions.
                    </Text>
                  </View>
                </View>

                <View style={styles.valueItem}>
                  <Ionicons name="people" size={24} color="#FFD700" />
                  <View style={styles.valueContent}>
                    <Text style={styles.valueTitle}>Collaboration</Text>
                    <Text style={styles.valueText}>
                      We believe in the power of collaboration, working closely with our clients to 
                      understand their needs and deliver tailored solutions.
                    </Text>
                  </View>
                </View>

                <View style={styles.valueItem}>
                  <Ionicons name="shield-checkmark" size={24} color="#FFD700" />
                  <View style={styles.valueContent}>
                    <Text style={styles.valueTitle}>Integrity</Text>
                    <Text style={styles.valueText}>
                      We operate with honesty, transparency, and integrity in all our business 
                      relationships and interactions.
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.ctaSection}>
                <Text style={styles.ctaTitle}>Ready to Build Something Amazing?</Text>
                <Text style={styles.ctaText}>
                  Let's discuss how we can help transform your ideas into reality.
                </Text>
                <TouchableOpacity 
                  style={styles.ctaButton}
                  onPress={() => router.push('/contact')}
                >
                  <Text style={styles.ctaButtonText}>Get in Touch</Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFF" />
                </TouchableOpacity>
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
    fontSize: 32,
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
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#D0D0D0',
    marginVertical: 20,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 12,
    marginTop: 8,
  },
  bodyText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0066CC',
    marginTop: 12,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  valuesList: {
    marginTop: 8,
    marginBottom: 20,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  valueContent: {
    flex: 1,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  valueText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  ctaSection: {
    backgroundColor: '#0066CC',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 15,
    color: '#E0E0E0',
    marginBottom: 20,
    textAlign: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
  },
});
