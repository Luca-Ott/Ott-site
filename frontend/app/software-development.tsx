import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SoftwareDevelopmentScreen() {
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
              <Text style={styles.title}>Software Development</Text>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
              {/* Main Card */}
              <View style={styles.mainCard}>
                <View style={styles.iconHeader}>
                  <Ionicons name="code-slash" size={64} color="#0066CC" />
                </View>

                <Text style={styles.mainTitle}>Software Development Excellence</Text>
                
                <Text style={styles.introText}>
                  Our Software Development team transforms innovative ideas into robust, scalable, and 
                  high-performance applications. We leverage cutting-edge technologies and industry 
                best practices to deliver solutions that drive business growth and exceed user expectations.
              </Text>

              <View style={styles.divider} />

              <Text style={styles.sectionHeading}>Development Excellence</Text>
              <Text style={styles.bodyText}>
                With expertise spanning multiple programming languages, frameworks, and platforms, our 
                development team is equipped to handle projects of any complexity. We follow agile 
                methodologies, implement comprehensive testing strategies, and maintain the highest 
                standards of code quality to ensure reliable, maintainable, and secure applications.
              </Text>

              <Text style={styles.sectionHeading}>Technology Stack & Services</Text>
              
              <View style={styles.serviceCard}>
                <Ionicons name="phone-portrait" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Mobile Application Development</Text>
                <Text style={styles.serviceDescription}>
                  Native iOS and Android development using Swift, Kotlin, and cross-platform solutions 
                  with React Native, Flutter, and Expo. We create high-performance mobile apps that leverage 
                  device capabilities including GPS, camera, sensors, and notifications while maintaining 
                  excellent user experience across all screen sizes and device types.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="globe" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Web Application Development</Text>
                <Text style={styles.serviceDescription}>
                  Full-stack web development using modern JavaScript frameworks like React, Vue.js, Angular 
                  for frontend, and Node.js, Python (Django/Flask/FastAPI), Ruby on Rails, and .NET for backend. 
                  We build scalable, responsive web applications with real-time features, progressive web app 
                  capabilities, and optimal performance across all browsers.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="server" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Backend & API Development</Text>
                <Text style={styles.serviceDescription}>
                  Robust backend systems with RESTful and GraphQL APIs, microservices architecture, 
                  and cloud-native solutions. We design scalable database schemas (SQL and NoSQL), implement 
                  caching strategies, message queues, and ensure security, performance, and reliability while 
                  maintaining clean, well-documented code.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="cloud" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Cloud Solutions & DevOps</Text>
                <Text style={styles.serviceDescription}>
                  Cloud infrastructure setup and management on AWS, Google Cloud Platform, Microsoft Azure, 
                  and Digital Ocean. Implementing CI/CD pipelines with GitHub Actions, Jenkins, or GitLab CI, 
                  containerization with Docker and Kubernetes, infrastructure as code with Terraform, and 
                  automated deployment strategies for reliable and efficient software delivery.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="analytics" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>AI & Machine Learning Integration</Text>
                <Text style={styles.serviceDescription}>
                  Integration of machine learning models, natural language processing, computer vision, and 
                  AI-powered features into applications. We work with TensorFlow, PyTorch, scikit-learn, and 
                  cloud ML services to help businesses leverage their data for predictive analytics, automation, 
                  and intelligent decision-making.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <Ionicons name="git-branch" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Legacy System Modernization</Text>
                <Text style={styles.serviceDescription}>
                  Updating and migrating legacy applications to modern architectures without disrupting business 
                  operations. We assess existing systems, create migration strategies, refactor code, upgrade 
                  technologies, and ensure seamless transitions to cloud-native, scalable solutions.
                </Text>
              </View>

              <Text style={styles.sectionHeading}>Development Methodology</Text>
              <View style={styles.methodologyCard}>
                <Text style={styles.methodologyTitle}>Agile Development Process</Text>
                <Text style={styles.methodologyText}>
                  We embrace agile methodologies including Scrum and Kanban, delivering working software in 
                  iterative sprints with continuous stakeholder involvement. This approach ensures flexibility, 
                  transparency, and rapid response to changing requirements.
                </Text>
              </View>

              <View style={styles.methodologyCard}>
                <Text style={styles.methodologyTitle}>Quality Assurance</Text>
                <Text style={styles.methodologyText}>
                  Comprehensive testing strategy including unit tests, integration tests, end-to-end tests, 
                  and performance testing. We maintain high code coverage, conduct regular code reviews, and 
                  use automated testing tools to ensure software reliability.
                </Text>
              </View>

              <View style={styles.methodologyCard}>
                <Text style={styles.methodologyTitle}>Security First</Text>
                <Text style={styles.methodologyText}>
                  Security is integrated throughout the development lifecycle. We follow OWASP guidelines, 
                  implement secure coding practices, conduct vulnerability assessments, and ensure data 
                  protection compliance (GDPR, HIPAA, PCI-DSS).
                </Text>
              </View>

              <Text style={styles.sectionHeading}>Why Choose Our Development Services</Text>
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    100+ successful projects delivered across various industries and platforms
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    Expert team with certifications in AWS, Google Cloud, Azure, and modern technologies
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    Agile methodology ensuring flexibility and regular delivery of working software
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    Comprehensive documentation and knowledge transfer for long-term sustainability
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#00AA00" />
                  <Text style={styles.benefitText}>
                    Post-launch support and maintenance ensuring continuous improvement and reliability
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