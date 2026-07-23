import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../src/theme';

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

export default function ServicesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Services</Text>
      <Text style={styles.subtitle}>
        Residential cleaning services available across Melbourne.
      </Text>
      {services.map((service) => (
        <View key={service.title} style={styles.card}>
          <Text style={styles.cardTitle}>{service.title}</Text>
          <Text style={styles.cardBody}>{service.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 14 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginBottom: 4 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
  },
  cardTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 8 },
  cardBody: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
});
