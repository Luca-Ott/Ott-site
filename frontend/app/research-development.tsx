import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ResearchDevelopmentScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#2ECC71', '#3498DB', '#1E88E5']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Ionicons name="arrow-back" size={24} color="#0066CC" />
                </TouchableOpacity>
                <Image
                  source={{ uri: 'https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68' }}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.title}>Research & Development</Text>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
              {/* Main Card */}
              <View style={styles.mainCard}>
                <View style={styles.iconHeader}>
                  <Ionicons name="flask" size={64} color="#0066CC" />
                </View>

                <Text style={styles.mainTitle}>Research & Development Innovation</Text>
                
                <Text style={styles.introText}>
                  Our Research & Development division is at the forefront of technological innovation, 
                  exploring emerging technologies and developing breakthrough solutions that shape the future 
                  of software and digital experiences. We invest in tomorrow's technologies today.
                </Text>

                <View style={styles.divider} />

              <Text style={styles.sectionHeading}>Our R&D Mission</Text>
              <Text style={styles.bodyText}>
                We are committed to pushing the boundaries of what's possible in technology. Our R&D team 
                continuously explores emerging trends, evaluates new technologies, and develops proof-of-concepts 
                that transform innovative ideas into practical, market-ready solutions. We bridge the gap between 
                academic research and commercial application.
              </Text>

              <Text style={styles.sectionHeading}>Research Focus Areas</Text>
              
              <View style={styles.serviceCard}>
                <Ionicons name="bulb" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Artificial Intelligence & Machine Learning</Text>
                <Text style={styles.serviceDescription}>
                  Advanced research in deep learning, neural networks, natural language processing, computer 
                  vision, and reinforcement learning. We develop custom AI models for specific business applications, 
                  explore generative AI capabilities, and create intelligent systems that learn and adapt. Our work 
                  includes predictive analytics, automated decision-making systems, and AI-powered automation.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="cube" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Blockchain & Distributed Systems</Text>
                <Text style={styles.serviceDescription}>
                  Investigating blockchain technologies, smart contracts, decentralized applications (DApps), 
                  and distributed ledger systems. We research consensus mechanisms, scalability solutions, 
                  interoperability protocols, and practical applications beyond cryptocurrency including supply 
                  chain management, digital identity, and secure data sharing.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="eye" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Extended Reality (AR/VR/MR)</Text>
                <Text style={styles.serviceDescription}>
                  Developing immersive experiences using augmented reality, virtual reality, and mixed reality 
                  technologies. We explore applications in training and education, virtual collaboration, 
                  product visualization, and entertainment. Our research includes spatial computing, hand tracking, 
                  haptic feedback, and creating seamless transitions between physical and digital worlds.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="wifi" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Internet of Things (IoT) & Edge Computing</Text>
                <Text style={styles.serviceDescription}>
                  Researching connected devices, sensor networks, edge processing, and IoT ecosystems. We develop 
                  solutions for smart cities, industrial IoT, home automation, and wearable technology. Our work 
                  includes device communication protocols, data aggregation, real-time processing at the edge, and 
                  energy-efficient computing for resource-constrained devices.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="infinite" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Quantum Computing Readiness</Text>
                <Text style={styles.serviceDescription}>
                  Preparing for the quantum computing era by researching quantum algorithms, quantum-safe 
                  cryptography, and potential applications in optimization, simulation, and cryptanalysis. 
                  We develop strategies for organizations to transition to quantum-resistant security measures 
                  and explore early quantum computing platforms for specific problem domains.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="leaf" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Sustainable Technology</Text>
                <Text style={styles.serviceDescription}>
                  Researching green computing, energy-efficient algorithms, and sustainable software development 
                  practices. We focus on reducing carbon footprints of digital infrastructure, optimizing resource 
                  utilization, and developing technologies that support environmental sustainability goals including 
                  smart grid solutions, carbon tracking systems, and circular economy platforms.
                </Text>
              </View>

              <Text style={styles.sectionHeading}>R&D Methodology</Text>
              <View style={styles.methodologyCard}>
                <Text style={styles.methodologyTitle}>Exploratory Research</Text>
                <Text style={styles.methodologyText}>
                  We conduct fundamental research to understand emerging technologies and their potential 
                  applications. This includes literature review, technology evaluation, feasibility studies, 
                  and collaboration with academic institutions and research organizations.
                </Text>
              </View>

              <View style={styles.methodologyCard}>
                <Text style={styles.methodologyTitle}>Proof of Concept Development</Text>
                <Text style={styles.methodologyText}>
                  Rapid prototyping of innovative concepts to validate technical feasibility and business value. 
                  We build working prototypes that demonstrate key capabilities and provide hands-on experience 
                  with new technologies.
                </Text>
              </View>

              <View style={styles.methodologyCard}>
                <Text style={styles.methodologyTitle}>Applied Research</Text>
                <Text style={styles.methodologyText}>
                  Translating research findings into practical solutions. We bridge the gap between theoretical 
                  possibilities and real-world applications, ensuring our innovations solve actual business problems 
                  and create tangible value.
                </Text>
              </View>

              <View style={styles.methodologyCard}>
                <Text style={styles.methodologyTitle}>Knowledge Sharing</Text>
                <Text style={styles.methodologyText}>
                  Publishing research papers, presenting at conferences, contributing to open-source projects, 
                  and sharing insights through workshops and training programs. We believe in advancing the entire 
                  technology ecosystem.
                </Text>
              </View>

              <Text style={styles.sectionHeading}>Innovation Outcomes</Text>
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    10+ patents filed in AI, blockchain, and distributed systems technologies
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    Partnerships with leading universities and research institutions worldwide
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    Published research in peer-reviewed journals and international conferences
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    Active contributions to open-source projects and technology standards
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    Successful commercialization of research innovations into market-ready products
                  </Text>
                </View>
              </View>

              <Text style={styles.sectionHeading}>Collaboration Opportunities</Text>
              <Text style={styles.bodyText}>
                We welcome partnerships with organizations interested in exploring cutting-edge technologies. 
                Whether you're looking to investigate specific innovations, need custom research for your industry, 
                or want to co-develop breakthrough solutions, our R&D team is ready to collaborate. We offer 
                flexible engagement models including joint research projects, technology licensing, and innovation 
                consulting.
              </Text>
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
  methodologyCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  methodologyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
    marginBottom: 8,
  },
  methodologyText: {
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