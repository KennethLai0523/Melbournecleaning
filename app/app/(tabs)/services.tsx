import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../src/theme';

const cleaningEquipment = [
  'Mops and buckets',
  'Microfibre cloths and wipes',
  'Vacuum cleaners',
  'Brooms and dustpans',
  'Scrubbing brushes',
  'Sponges and scourers',
  'Glass and surface cleaners',
  'Disinfectants and detergents',
  'Gloves and protective gear',
  'Extension dusters',
];

const services = [
  {
    title: 'Regular House Cleaning',
    description: 'Scheduled home cleaning to maintain a clean, comfortable living space.',
  },
  {
    title: 'Deep Cleaning',
    description: 'Detailed, thorough cleaning for homes that need extra attention.',
  },
  {
    title: 'End of Lease Cleaning',
    description: 'Comprehensive cleaning to help prepare your property for final inspection.',
  },
  {
    title: 'Airbnb and Short-Stay Cleaning',
    description: 'Turnover cleaning for Airbnb and short-stay properties.',
  },
  {
    title: 'Move-In and Move-Out Cleaning',
    description: 'Cleaning services for moving in or moving out of a property.',
  },
];

const comparisons = [
  { title: 'Kitchen cooktop', source: require('../../assets/images/comparisons/comparison1.jpeg') },
  { title: 'Bathroom vanity', source: require('../../assets/images/comparisons/comparison2.jpeg') },
  { title: 'Shower', source: require('../../assets/images/comparisons/comparison3.jpeg') },
  { title: 'Toilet', source: require('../../assets/images/comparisons/comparison4.jpeg') },
];

export default function ServicesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Our Cleaning Services</Text>
      <Text style={styles.subtitle}>
        Explore our residential cleaning services across Melbourne—from regular home cleaning to
        deep cleans, end of lease and specialist add-ons.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cleaning equipment we have</Text>
        <Text style={styles.sectionCopy}>We bring the tools needed for a thorough residential clean.</Text>
        <View style={styles.equipmentGrid}>
          {cleaningEquipment.map((item) => (
            <View key={item} style={styles.equipmentItem}>
              <View style={styles.dot} />
              <Text style={styles.equipmentText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.serviceList}>
        {services.map((service) => (
          <View key={service.title} style={styles.card}>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.cardBody}>{service.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.comparisonHeader}>
        <Text style={styles.eyebrow}>Real cleaning results</Text>
        <Text style={styles.comparisonTitle}>Cleaning Comparison</Text>
        <Text style={styles.comparisonCopy}>
          See the difference a detailed clean can make across kitchens and bathrooms.
        </Text>
      </View>
      <View style={styles.comparisonGrid}>
        {comparisons.map((comparison) => (
          <View key={comparison.title} style={styles.comparisonCard}>
            <View>
              <Image source={comparison.source} style={styles.comparisonImage} resizeMode="cover" />
              <View style={styles.badge}><Text style={styles.badgeText}>Before &amp; after</Text></View>
            </View>
            <Text style={styles.comparisonLabel}>{comparison.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 18, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
  section: { backgroundColor: colors.surfaceMuted, borderRadius: 18, padding: 18 },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: '800' },
  sectionCopy: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginTop: 6 },
  equipmentGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 14 },
  equipmentItem: { alignItems: 'center', flexDirection: 'row', gap: 8, paddingVertical: 6, width: '50%' },
  equipmentText: { color: colors.text, flex: 1, fontSize: 13, fontWeight: '600', lineHeight: 18 },
  dot: { backgroundColor: colors.primary, borderRadius: 4, height: 7, width: 7 },
  serviceList: { gap: 14 },
  card: { backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 18 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 8 },
  cardBody: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
  comparisonHeader: { alignItems: 'center', marginTop: 4 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1.1, textTransform: 'uppercase' },
  comparisonTitle: { color: colors.text, fontSize: 24, fontWeight: '800', marginTop: 5 },
  comparisonCopy: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginTop: 7, textAlign: 'center' },
  comparisonGrid: { gap: 14 },
  comparisonCard: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  comparisonImage: { aspectRatio: 1, width: '100%' },
  badge: { backgroundColor: 'rgba(22,24,29,0.82)', borderRadius: 999, left: 12, paddingHorizontal: 10, paddingVertical: 6, position: 'absolute', top: 12 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  comparisonLabel: { color: colors.text, fontSize: 17, fontWeight: '800', padding: 16 },
});
