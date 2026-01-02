import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ContactSuccessScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#2ECC71', '#3498DB', '#1E88E5']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={100} color="#2ECC71" />
          </View>
          
          <Text style={styles.title}>Message Sent!</Text>
          
          <Text style={styles.subtitle}>
            Thank you for contacting On Time Technology Ltd.
          </Text>
          
          <Text style={styles.description}>
            We have received your message and will get back to you as soon as possible. 
            Our team typically responds within 24-48 business hours.
          </Text>

          <View style={styles.infoBox}>
            <Ionicons name="mail-outline" size={24} color="#0066CC" />
            <Text style={styles.infoText}>
              A confirmation has been sent to your email address.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.homeButton}
            onPress={() => router.replace('/')}
          >
            <Ionicons name="home" size={20} color="#FFF" />
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => router.replace('/contact')}
          >
            <Text style={styles.contactButtonText}>Send Another Message</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFF',
    margin: 20,
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    maxWidth: 400,
    width: '90%',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4F8',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 24,
    width: '100%',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#0066CC',
  },
  homeButton: {
    backgroundColor: '#0066CC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  contactButton: {
    paddingVertical: 12,
  },
  contactButtonText: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '500',
  },
});
