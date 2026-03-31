import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function FreetyScreen() {
  const router = useRouter();
  const [width, setWidth] = React.useState(1024);
  React.useEffect(() => {
    const { width: w } = Dimensions.get('window');
    if (w > 0) setWidth(w);
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      if (window.width > 0) setWidth(window.width);
    });
    return () => sub?.remove();
  }, []);
  const isDesktop = width >= 768;

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
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} color="#0066CC" />
                </TouchableOpacity>
                <Image
                  source={{ uri: 'https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68' }}
                  style={styles.companyLogo}
                  resizeMode="contain"
                />
              </View>
              <Image
                source={require('../assets/freety-logo.jpg')}
                style={styles.freetyHeaderLogo}
                resizeMode="contain"
              />
              <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
              {/* Hero Card */}
              <View style={styles.heroCard}>
                <Image
                  source={require('../assets/freety-logo.jpg')}
                  style={styles.heroLogo}
                  resizeMode="contain"
                />
                <Text style={styles.heroTagline}>Fueling the Future</Text>
                <Text style={styles.heroSubtitle}>Digital Infrastructure for Global Commodity & Energy Trading</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>In Development</Text>
                </View>
              </View>

              {/* Executive Summary */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Executive Summary</Text>
                <Text style={styles.bodyText}>
                  Freety is a digital B2B platform designed to modernize global trading of commodities and energy products. 
                  The platform integrates marketplace technology, financial settlement, escrow, document management, 
                  logistics tracking, and AI-driven trading tools into a unified infrastructure.
                </Text>
                <Text style={styles.bodyText}>
                  The commodity trading industry exceeds 20 trillion USD in annual value. Despite its scale, 
                  transactions are still largely handled through emails, phone calls, brokers, and manual documentation.
                </Text>
                <Text style={styles.bodyText}>
                  Freety introduces a unified digital platform where producers, traders, distributors, and industrial 
                  buyers can transact securely using structured asset management, cargo tokenization, and secondary trading markets.
                </Text>
              </View>

              {/* Market Opportunity */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Market Opportunity</Text>
                <View style={isDesktop ? styles.statsRowDesktop : styles.statsRow}>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>$20T+</Text>
                    <Text style={styles.statLabel}>Annual Commodity Market</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>$3T+</Text>
                    <Text style={styles.statLabel}>Energy Commodities</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>$2T</Text>
                    <Text style={styles.statLabel}>Agricultural Commodities</Text>
                  </View>
                </View>
                <Text style={styles.bodyText}>
                  Despite the enormous size of this market, digital trading infrastructure remains fragmented and 
                  inefficient. Freety aims to provide a unified digital marketplace capable of modernizing the trading process.
                </Text>
              </View>

              {/* Platform Vision */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Platform Vision</Text>
                <Text style={styles.bodyText}>
                  Freety aims to become the digital infrastructure layer for global commodity trading. Rather than 
                  operating as a traditional trading house, the platform provides the technology infrastructure 
                  connecting producers, traders and buyers.
                </Text>
                <Text style={styles.bodyText}>
                  The long-term objective is to create a global digital ecosystem where commodity trading, financial 
                  settlement, documentation and logistics operate seamlessly through one platform.
                </Text>
              </View>

              {/* Trading Mechanisms */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Trading Mechanisms</Text>
                <View style={isDesktop ? styles.featuresGridDesktop : styles.featuresGrid}>
                  <View style={styles.featureCard}>
                    <Ionicons name="flash" size={32} color="#E67E22" />
                    <Text style={styles.featureTitle}>Spot Trading</Text>
                    <Text style={styles.featureDesc}>Immediate purchase of cargo with real-time settlement.</Text>
                  </View>
                  <View style={styles.featureCard}>
                    <Ionicons name="trending-up" size={32} color="#E67E22" />
                    <Text style={styles.featureTitle}>Auction</Text>
                    <Text style={styles.featureDesc}>Competitive bidding for shipments to achieve optimal pricing.</Text>
                  </View>
                  <View style={styles.featureCard}>
                    <Ionicons name="people" size={32} color="#E67E22" />
                    <Text style={styles.featureTitle}>Group Purchase</Text>
                    <Text style={styles.featureDesc}>Multiple buyers aggregate demand to purchase large shipments together.</Text>
                  </View>
                </View>
              </View>

              {/* Cargo Tokenization */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Cargo Tokenization</Text>
                <Text style={styles.bodyText}>
                  Large cargo shipments can be tokenized into smaller digital units, increasing market 
                  liquidity and allowing smaller buyers to participate in large commodity transactions.
                </Text>
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleTitle}>Example</Text>
                  <View style={styles.exampleRow}>
                    <Ionicons name="boat" size={20} color="#E67E22" />
                    <Text style={styles.exampleText}>Cargo: 500,000 barrels of diesel</Text>
                  </View>
                  <View style={styles.exampleRow}>
                    <Ionicons name="cube" size={20} color="#E67E22" />
                    <Text style={styles.exampleText}>Tokenization: 5,000 tokens</Text>
                  </View>
                  <View style={styles.exampleRow}>
                    <Ionicons name="swap-horizontal" size={20} color="#E67E22" />
                    <Text style={styles.exampleText}>Each token = 100 barrels</Text>
                  </View>
                </View>
                <Text style={styles.bodyText}>
                  Participants can also trade their cargo allocations on a secondary market before final delivery, 
                  improving price discovery across the marketplace.
                </Text>
              </View>

              {/* Smart Contracts & Escrow */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Smart Contracts & Escrow</Text>
                <Text style={styles.bodyText}>
                  Every trade executed on the platform generates a digital contract defining quantity, pricing, 
                  delivery conditions and inspection requirements. Funds are held in escrow until contractual 
                  obligations are fulfilled, significantly reducing counterparty risk.
                </Text>
              </View>

              {/* Financial Infrastructure */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Financial Infrastructure</Text>
                <View style={isDesktop ? styles.featuresGridDesktop : styles.featuresGrid}>
                  <View style={styles.featureCard}>
                    <Ionicons name="wallet" size={32} color="#0066CC" />
                    <Text style={styles.featureTitle}>Multi-Currency Wallets</Text>
                    <Text style={styles.featureDesc}>
                      Each participant receives a multi-currency digital wallet for fiat currencies and digital assets.
                    </Text>
                  </View>
                  <View style={styles.featureCard}>
                    <Ionicons name="logo-bitcoin" size={32} color="#0066CC" />
                    <Text style={styles.featureTitle}>Stablecoin Settlement</Text>
                    <Text style={styles.featureDesc}>
                      Settlement through USDT and USDC for near-instant transfers and lower international costs.
                    </Text>
                  </View>
                  <View style={styles.featureCard}>
                    <Ionicons name="card" size={32} color="#0066CC" />
                    <Text style={styles.featureTitle}>Dedicated IBAN</Text>
                    <Text style={styles.featureDesc}>
                      Each company receives a dedicated IBAN account for international bank transfers linked to their wallet.
                    </Text>
                  </View>
                </View>

                <View style={styles.paymentFlow}>
                  <Text style={styles.paymentFlowTitle}>Payment Flow</Text>
                  <View style={styles.flowStep}>
                    <View style={styles.flowNumber}><Text style={styles.flowNumberText}>1</Text></View>
                    <Text style={styles.flowStepText}>Buyer deposits funds through bank transfer or stablecoin</Text>
                  </View>
                  <View style={styles.flowStep}>
                    <View style={styles.flowNumber}><Text style={styles.flowNumberText}>2</Text></View>
                    <Text style={styles.flowStepText}>Funds enter the Freety wallet</Text>
                  </View>
                  <View style={styles.flowStep}>
                    <View style={styles.flowNumber}><Text style={styles.flowNumberText}>3</Text></View>
                    <Text style={styles.flowStepText}>Funds are locked in escrow when a contract is created</Text>
                  </View>
                  <View style={styles.flowStep}>
                    <View style={styles.flowNumber}><Text style={styles.flowNumberText}>4</Text></View>
                    <Text style={styles.flowStepText}>After delivery confirmation, payment is released to the seller</Text>
                  </View>
                </View>
              </View>

              {/* AI & Document Management */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>AI Trading Intelligence</Text>
                <Text style={styles.bodyText}>
                  AI tools support market participants by analyzing market conditions, identifying opportunities, 
                  and suggesting optimal trading strategies. The AI engine matches buyers with sellers and provides 
                  market insights for pricing and demand trends.
                </Text>

                <View style={styles.divider} />

                <Text style={styles.cardTitle}>Document Management</Text>
                <Text style={styles.bodyText}>
                  Freety provides a secure digital vault for all trading documentation:
                </Text>
                <View style={styles.docList}>
                  <View style={styles.docItem}>
                    <Ionicons name="document-text" size={18} color="#E67E22" />
                    <Text style={styles.docText}>Bill of Lading</Text>
                  </View>
                  <View style={styles.docItem}>
                    <Ionicons name="document-text" size={18} color="#E67E22" />
                    <Text style={styles.docText}>Certificate of Origin</Text>
                  </View>
                  <View style={styles.docItem}>
                    <Ionicons name="document-text" size={18} color="#E67E22" />
                    <Text style={styles.docText}>Inspection Reports</Text>
                  </View>
                  <View style={styles.docItem}>
                    <Ionicons name="document-text" size={18} color="#E67E22" />
                    <Text style={styles.docText}>Quality Certificates</Text>
                  </View>
                </View>
              </View>

              {/* Revenue Model */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Revenue Model</Text>
                <Text style={styles.bodyText}>
                  Primary revenue is generated through trading fees at a standard rate of 0.25% per transaction. 
                  Additional revenue streams include escrow fees, payment processing fees, premium subscriptions 
                  and document certification services.
                </Text>

                <View style={isDesktop ? styles.scenariosGridDesktop : styles.scenariosGrid}>
                  <View style={styles.scenarioCard}>
                    <Text style={styles.scenarioLabel}>Early Stage</Text>
                    <Text style={styles.scenarioVolume}>$100M volume</Text>
                    <Text style={styles.scenarioRevenue}>$250K revenue</Text>
                  </View>
                  <View style={styles.scenarioCard}>
                    <Text style={styles.scenarioLabel}>Growth</Text>
                    <Text style={styles.scenarioVolume}>$500M volume</Text>
                    <Text style={styles.scenarioRevenue}>$1.25M revenue</Text>
                  </View>
                  <View style={[styles.scenarioCard, { borderColor: '#E67E22' }]}>
                    <Text style={styles.scenarioLabel}>Target Scale</Text>
                    <Text style={styles.scenarioVolume}>$1B volume</Text>
                    <Text style={styles.scenarioRevenue}>$2.5M revenue</Text>
                  </View>
                  <View style={[styles.scenarioCard, { borderColor: '#2ECC71' }]}>
                    <Text style={styles.scenarioLabel}>Large Scale</Text>
                    <Text style={styles.scenarioVolume}>$10B volume</Text>
                    <Text style={styles.scenarioRevenue}>$25M revenue</Text>
                  </View>
                </View>
              </View>

              {/* Competitive Landscape */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Competitive Landscape</Text>
                <Text style={styles.bodyText}>
                  Global commodity trading is dominated by large trading houses such as Trafigura, Mercuria, 
                  Glencore and Vitol. These firms operate primarily through private trading networks and proprietary deals.
                </Text>
                <Text style={styles.bodyText}>
                  Freety differentiates itself by combining marketplace technology, financial infrastructure, 
                  escrow services, cargo tokenization and secondary trading within a single open ecosystem — 
                  improving accessibility, transparency and efficiency.
                </Text>
              </View>

              {/* Long-Term Vision */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Long-Term Vision</Text>
                <Text style={styles.bodyText}>
                  Future expansion includes carbon credit trading, renewable energy certificates, hydrogen markets 
                  and tokenized commodity financing. Freety aims to become the foundational infrastructure platform 
                  for global commodity commerce.
                </Text>
              </View>

              {/* Investment CTA */}
              <View style={styles.investorCard}>
                <Ionicons name="briefcase" size={40} color="#FFF" />
                <Text style={styles.investorTitle}>Investment Opportunity</Text>
                <Text style={styles.investorDescription}>
                  We're seeking strategic partners and investors who share our vision of building 
                  the digital infrastructure for global commodity trading. Join us in transforming 
                  a $20 trillion industry.
                </Text>
                <TouchableOpacity
                  style={styles.investorButton}
                  onPress={() => router.push('/investor-inquiry')}
                >
                  <Text style={styles.investorButtonText}>Investor Inquiry</Text>
                  <Ionicons name="arrow-forward" size={20} color="#E67E22" />
                </TouchableOpacity>
              </View>

              {/* Website */}
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
  gradient: { flex: 1 },
  container: { flex: 1, alignItems: 'center' },
  mainContainer: { flex: 1, width: '100%', maxWidth: 1400 },
  scrollContent: { paddingBottom: 40 },
  // Header
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
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  companyLogo: { width: 40, height: 40 },
  backButton: { padding: 4 },
  freetyHeaderLogo: { width: 120, height: 36 },
  placeholder: { width: 52 },
  content: { paddingHorizontal: 16 },
  // Hero
  heroCard: {
    backgroundColor: '#FFF',
    padding: 32,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroLogo: { width: 220, height: 66, marginBottom: 16 },
  heroTagline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E67E22',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: { fontSize: 12, color: '#2E7D32', fontWeight: '600' },
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
    marginBottom: 14,
  },
  bodyText: { fontSize: 15, color: '#555', lineHeight: 24, marginBottom: 12 },
  divider: { height: 1, backgroundColor: '#C0D8E8', marginVertical: 20 },
  // Stats
  statsRow: { gap: 12, marginBottom: 16 },
  statsRowDesktop: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#E67E22',
  },
  statValue: { fontSize: 28, fontWeight: 'bold', color: '#E67E22' },
  statLabel: { fontSize: 13, color: '#666', marginTop: 4, textAlign: 'center' },
  // Features Grid
  featuresGrid: { gap: 12 },
  featuresGridDesktop: { flexDirection: 'row', gap: 16 },
  featureCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    minWidth: 180,
  },
  featureTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginTop: 10, marginBottom: 6 },
  featureDesc: { fontSize: 14, color: '#666', lineHeight: 20 },
  // Example Box
  exampleBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E67E22',
  },
  exampleTitle: { fontSize: 16, fontWeight: '700', color: '#E67E22', marginBottom: 10 },
  exampleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  exampleText: { fontSize: 14, color: '#555' },
  // Payment Flow
  paymentFlow: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginTop: 16 },
  paymentFlowTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginBottom: 12 },
  flowStep: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  flowNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E67E22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowNumberText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  flowStepText: { flex: 1, fontSize: 14, color: '#555' },
  // Document list
  docList: { gap: 8 },
  docItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  docText: { fontSize: 14, color: '#555' },
  // Scenarios
  scenariosGrid: { gap: 12, marginTop: 8 },
  scenariosGridDesktop: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  scenarioCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0066CC',
  },
  scenarioLabel: { fontSize: 13, fontWeight: '700', color: '#666', marginBottom: 4 },
  scenarioVolume: { fontSize: 14, color: '#555' },
  scenarioRevenue: { fontSize: 18, fontWeight: 'bold', color: '#E67E22', marginTop: 4 },
  // Investor CTA
  investorCard: {
    backgroundColor: '#E67E22',
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
  investorTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginTop: 12, marginBottom: 10, textAlign: 'center' },
  investorDescription: { fontSize: 15, color: '#FFF3E0', lineHeight: 22, textAlign: 'center', marginBottom: 20 },
  investorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 8,
  },
  investorButtonText: { fontSize: 16, fontWeight: '600', color: '#E67E22' },
  // Website
  websiteCard: { alignItems: 'center', marginTop: 20, paddingVertical: 12 },
  websiteText: { fontSize: 14, color: '#FFF', fontWeight: '500', opacity: 0.9 },
});
