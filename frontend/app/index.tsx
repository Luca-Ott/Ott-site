import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [menuVisible, setMenuVisible] = React.useState(false);
  const menuWidth = 280;
  const menuAnimation = useRef(new Animated.Value(0)).current; // 0 = closed, 1 = open
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const newsText = '🚀 NoMoreFakeNews project launches investment opportunity • 💼 Custodiy platform now live with OTC and Escrow services • 🎉 ON TIME TECHNOLOGY expands R&D division • ✨ New software development solutions available • 📈 Special projects reaching new milestones • ';
  const repeatedNews = newsText + newsText;

  useEffect(() => {
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [menuVisible]);

  useEffect(() => {
    scrollX.setValue(0);
    const textWidth = 1500; // Lunghezza approssimativa del testo singolo
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scrollX, {
          toValue: -textWidth,
          duration: 60000,
          useNativeDriver: true,
          easing: (t) => t, // Linear
        }),
        Animated.timing(scrollX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const handleCall = () => {
    Linking.openURL('tel:+447775682831');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:Info@ott4future.com');
  };

  const handleWebsite = (url: string) => {
    Linking.openURL(url);
  };

  // Calcola la larghezza del contenuto principale animata
  const mainContentWidth = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', `${100 - 280 * 100 / 1920}%`], // fallback, ma usiamo flex
  });
  
  const menuWidthAnimated = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, menuWidth],
  });

  return (
    <LinearGradient
      colors={['#2ECC71', '#3498DB', '#1E88E5']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          {/* Main Content */}
          <View style={styles.mainContent}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <LinearGradient
          colors={['#E8F4F8', '#D4E9F7', '#C0E0F5']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={{ uri: 'https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68' }}
                style={[styles.logo, isDesktop && styles.logoDesktop]}
                resizeMode="contain"
              />
              <View style={styles.headerTextContainer}>
                <Text style={[styles.companyName, isDesktop && styles.companyNameDesktop]}>
                  ON TIME TECHNOLOGY LTD
                </Text>
                <Text style={[styles.tagline, isDesktop && styles.taglineDesktop]}>Innovating Tomorrow's Solutions Today</Text>
                <Text style={[styles.subTagline, isDesktop && styles.subTaglineDesktop]}>Empowering businesses with cutting-edge software solutions in design, development, and research.</Text>
              </View>
            </View>
            
            {/* Hamburger Menu Icon on Right */}
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => setMenuVisible(!menuVisible)}
            >
              <Ionicons name="menu" size={32} color="#0066CC" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Breaking News Section */}
        <View style={styles.breakingNewsContainer}>
          <View style={styles.breakingNewsLabel}>
            <Ionicons name="newspaper" size={16} color="#FFF" />
            <Text style={styles.breakingNewsLabelText}>BREAKING NEWS</Text>
          </View>
          <View style={styles.breakingNewsScroll}>
            <Animated.View style={[styles.breakingNewsContent, { transform: [{ translateX: scrollX }] }]}>
              <Text style={styles.breakingNewsText} numberOfLines={1}>
                {repeatedNews}
              </Text>
            </Animated.View>
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.servicesGrid}>
            <View style={styles.servicesRow}>
              <TouchableOpacity 
                style={styles.serviceCardHalf}
                onPress={() => router.push('/software-design')}
              >
                <Ionicons name="code-slash" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Software Design</Text>
                <Text style={styles.serviceDescription}>
                  Innovative software design solutions tailored to your business needs
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.serviceCardHalf}
                onPress={() => router.push('/software-development')}
              >
                <Ionicons name="build" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Software Development</Text>
                <Text style={styles.serviceDescription}>
                  Custom software development with cutting-edge technologies
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.servicesRow}>
              <TouchableOpacity 
                style={styles.serviceCardHalf}
                onPress={() => router.push('/research-development')}
              >
                <Ionicons name="flask" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>R&D</Text>
                <Text style={styles.serviceDescription}>
                  Research and development for next-generation solutions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.serviceCardHalf}
                onPress={() => router.push('/special-projects')}
              >
                <Ionicons name="rocket" size={40} color="#0066CC" />
                <Text style={styles.serviceTitle}>Special Projects</Text>
                <Text style={styles.serviceDescription}>
                  Unique and innovative projects tackling real-world challenges
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Special Projects Highlight */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Projects</Text>
          
          <View style={styles.projectsRow}>
            <TouchableOpacity 
              style={styles.projectCardHalf}
              onPress={() => router.push('/special-projects')}
            >
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>NoMoreFakeNews</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>In Development</Text>
                </View>
              </View>
              <Text style={styles.projectDescription}>
                An innovative project designed to combat fake news and misinformation. 
                Our solution aims to identify, flag, and eventually eliminate fake news through advanced AI.
              </Text>
              <View style={styles.investorButton}>
                <Ionicons name="briefcase" size={20} color="#0066CC" />
                <Text style={styles.investorButtonText}>Investor Inquiries Welcome</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.projectCardHalf}
              onPress={() => handleWebsite('https://custodiy.com')}
            >
              <View style={styles.projectHeader}>
                <View style={styles.projectTitleWithLogo}>
                  <Image
                    source={require('../assets/custodiy-logo.png')}
                    style={styles.custodiyLogo}
                    resizeMode="contain"
                  />
                  <Text style={styles.projectName}>Custodiy</Text>
                </View>
                <Ionicons name="open-outline" size={20} color="#666" />
              </View>
              <Text style={styles.projectDescription}>
                A modular platform empowering individuals and businesses with marketplace, 
                OTC services, and secure document management solutions.
              </Text>
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#00AA00" />
                  <Text style={styles.featureText}>Custodial Wallets</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#00AA00" />
                  <Text style={styles.featureText}>OTC Service</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#00AA00" />
                  <Text style={styles.featureText}>Escrow via Smart Contracts</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#00AA00" />
                  <Text style={styles.featureText}>Marketplace Platform</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactCard}>
            <TouchableOpacity style={styles.contactRow} onPress={handleCall}>
              <Ionicons name="call" size={24} color="#0066CC" />
              <Text style={styles.contactText}>+44 777 568 2831</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactRow} onPress={handleEmail}>
              <Ionicons name="mail" size={24} color="#0066CC" />
              <Text style={styles.contactText}>Info@ott4future.com</Text>
            </TouchableOpacity>

            <View style={styles.contactRow}>
              <Ionicons name="location" size={24} color="#0066CC" />
              <Text style={styles.contactText}>
                The Black Church - St Mary's Place{' \n'}Dublin, D07 P4AX, Ireland
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => router.push('/contact')}
            >
              <Text style={styles.contactButtonText}>Send Us a Message</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            {/* Left Side - Logo and Company Info */}
            <View style={styles.footerLeft}>
              <View style={styles.footerLogoRow}>
                <Image
                  source={{ uri: 'https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68' }}
                  style={styles.footerLogo}
                  resizeMode="contain"
                />
                <Text style={styles.footerCompanyName}>On Time Technology Ltd</Text>
              </View>
              <Text style={styles.footerTagline}>
                Delivering innovative software solutions that empower{'\n'}businesses to succeed in the digital age.
              </Text>
            </View>

            {/* Right Side - Quick Links and Services */}
            <View style={styles.footerRight}>
              <View style={styles.footerLinksColumn}>
                <Text style={styles.footerLinksTitle}>Quick Links</Text>
                <TouchableOpacity onPress={() => router.push('/about')}>
                  <Text style={styles.footerLink}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/contact')}>
                  <Text style={styles.footerLink}>Contact</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.footerLinksColumn}>
                <Text style={styles.footerLinksTitle}>Services</Text>
                <TouchableOpacity onPress={() => router.push('/software-design')}>
                  <Text style={styles.footerLink}>Software Design</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/software-development')}>
                  <Text style={styles.footerLink}>Software Development</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/research-development')}>
                  <Text style={styles.footerLink}>R&D</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bottom Line and Copyright */}
          <View style={styles.footerDivider} />
          <Text style={styles.footerCopyright}>
            © 2025 On Time Technology. All rights reserved.
          </Text>
        </View>
      </ScrollView>
          </View>

          {/* Menu Column - Push style from right */}
          <Animated.View style={[styles.menuColumn, { width: menuWidthAnimated }]}>
            {menuVisible && (
              <>
                <View style={styles.menuHeader}>
                  <Text style={styles.menuTitle}>Menu</Text>
                  <TouchableOpacity onPress={() => setMenuVisible(false)}>
                    <Ionicons name="close" size={28} color="#FFF" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    router.push('/about');
                  }}
                >
                  <Ionicons name="information-circle-outline" size={24} color="#FFF" />
                  <Text style={styles.menuItemText}>About Us</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    router.push('/software-design');
                  }}
                >
                  <Ionicons name="briefcase-outline" size={24} color="#FFF" />
                  <Text style={styles.menuItemText}>Our Services</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    router.push('/contact');
                  }}
                >
                  <Ionicons name="mail-outline" size={24} color="#FFF" />
                  <Text style={styles.menuItemText}>Contact</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
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
    flexDirection: 'row',
    width: '100%',
    maxWidth: 1400,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  headerGradient: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  menuButton: {
    padding: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 2,
    flexShrink: 1,
  },
  tagline: {
    fontSize: 12,
    color: '#0066CC',
    marginBottom: 2,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  subTagline: {
    fontSize: 10,
    color: '#4A9FD8',
  },
  // Desktop styles
  logoDesktop: {
    width: 70,
    height: 70,
  },
  companyNameDesktop: {
    fontSize: 22,
  },
  taglineDesktop: {
    fontSize: 16,
  },
  subTaglineDesktop: {
    fontSize: 14,
  },
  breakingNewsContainer: {
    backgroundColor: '#0066CC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    overflow: 'hidden',
  },
  breakingNewsLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  breakingNewsLabelText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  breakingNewsScroll: {
    flex: 1,
    overflow: 'hidden',
  },
  breakingNewsContent: {
    paddingLeft: 16,
  },
  breakingNewsText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  projectsRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  projectCardHalf: {
    backgroundColor: '#E8F4F8',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    minWidth: 280,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  servicesGrid: {
    gap: 16,
  },
  servicesRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  serviceCardHalf: {
    backgroundColor: '#E8F4F8',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    minWidth: 140,
  },
  serviceCard: {
    backgroundColor: '#E8F4F8',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  projectCard: {
    backgroundColor: '#E8F4F8',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectTitleWithLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  custodiyLogo: {
    width: 32,
    height: 32,
  },
  projectName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  statusBadge: {
    backgroundColor: '#FFF4E5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FF8C00',
    fontWeight: '600',
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  investorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F2FF',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  investorButtonText: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '600',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
  },
  contactCard: {
    backgroundColor: '#E8F4F8',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  contactButton: {
    backgroundColor: '#0066CC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  footer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginTop: 32,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 48,
    paddingHorizontal: 24,
  },
  footerLeft: {
    flex: 1,
    minWidth: 200,
    alignItems: 'flex-start',
  },
  footerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  footerLogo: {
    width: 45,
    height: 45,
  },
  footerCompanyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footerTagline: {
    fontSize: 14,
    color: '#E0E0E0',
    lineHeight: 20,
    textAlign: 'left',
  },
  footerRight: {
    flexDirection: 'row',
    gap: 48,
    alignItems: 'flex-start',
    minWidth: 120,
  },
  footerLinksColumn: {
    minWidth: 150,
  },
  footerLinksTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  footerLink: {
    fontSize: 14,
    color: '#B0D4F1',
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
  footerDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 16,
  },
  footerCopyright: {
    fontSize: 12,
    color: '#E0E0E0',
    textAlign: 'center',
  },
  menuColumn: {
    backgroundColor: 'rgba(0, 102, 204, 0.95)',
    paddingTop: 50,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 12,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
});