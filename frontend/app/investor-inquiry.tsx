import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Linking,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function InvestorInquiryScreen() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, message: string) => {
    if (typeof window !== 'undefined') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSubmit = async () => {
    if (!companyName.trim() || !name.trim() || !surname.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      showAlert('Error', 'Please fill in all required fields');
      return;
    }

    if (!email.includes('@')) {
      showAlert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/mvzgazqk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          company_name: companyName,
          name: `${name} ${surname}`,
          email,
          phone,
          message,
          _subject: 'New Investor Inquiry - NoMoreFakeNews - On Time Technology',
        }),
      });

      console.log('Form response status:', response.status);

      if (response.ok) {
        // Navigate to success page
        router.replace('/contact-success');
      } else {
        const data = await response.json();
        console.log('Form error data:', data);
        showAlert('Error', data.error || data.errors?.[0]?.message || 'Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Investor inquiry error:', error);
      showAlert('Error', 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} color="#0066CC" />
                </TouchableOpacity>
                <Image
                  source={{ uri: 'https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68' }}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.title}>Investment Inquiry</Text>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
              <View style={styles.projectBanner}>
                <Ionicons name="shield-checkmark" size={48} color="#0066CC" />
                <Text style={styles.bannerTitle}>NoMoreFakeNews</Text>
                <Text style={styles.bannerSubtitle}>Investment Opportunity</Text>
              </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                Thank you for your interest in investing in NoMoreFakeNews. Please provide your 
                details below and our team will reach out to discuss this exciting opportunity.
              </Text>
            </View>

            <View style={styles.formCard}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Company Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your company or organization"
                  value={companyName}
                  onChangeText={setCompanyName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>First Name *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="John"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>

                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Last Name *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Doe"
                    value={surname}
                    onChangeText={setSurname}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your.email@company.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Message / Investment Interest *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Tell us about your investment interests, goals, and any questions you may have..."
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.privacyNote}>
                <Ionicons name="shield-checkmark" size={16} color="#0066CC" />
                <Text style={styles.privacyText}>
                  Your information is secure and will only be used to contact you regarding investment opportunities.
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Text style={styles.submitButtonText}>Submit Inquiry</Text>
                    <Ionicons name="briefcase" size={20} color="#FFF" />
                  </>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.contactCard}>
              <Text style={styles.contactCardTitle}>Direct Contact</Text>
              <Text style={styles.contactCardText}>
                For immediate inquiries, you can also reach us directly:
              </Text>
              <TouchableOpacity 
                style={styles.contactRow}
                onPress={() => Linking.openURL('mailto:luca@ott4future.com')}
              >
                <Ionicons name="mail" size={20} color="#0066CC" />
                <Text style={styles.contactEmailLink}>luca@ott4future.com</Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 1400,
  },
  keyboardView: {
    flex: 1,
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
  projectBanner: {
    backgroundColor: '#E6F2FF',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066CC',
    marginTop: 12,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A1A',
    backgroundColor: '#FFF',
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  privacyText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: '#0066CC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  contactCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  contactCardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactEmail: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '500',
  },
  contactEmailLink: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});