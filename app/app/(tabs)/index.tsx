import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { CONTACT_DETAILS } from '../../src/config/contact';
import { colors } from '../../src/theme';
import { openExternal } from '../../src/utils/links';

const trustPoints = [
  'Residential cleaning across Melbourne',
  'Item-by-item pricing',
  'Flexible scheduling',
  'WhatsApp-friendly quoting',
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Melbourne Cleaning Group</Text>
        <Text style={styles.title}>Professional cleaning for Melbourne homes</Text>
        <Text style={styles.connected}>Mobile app connected successfully.</Text>
        <Text style={styles.copy}>Serving Melbourne and surrounding suburbs.</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => openExternal(CONTACT_DETAILS.whatsappUrl)}
          >
            <Text style={styles.primaryButtonText}>WhatsApp Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/quote')}
          >
            <Text style={styles.secondaryButtonText}>Build Your Quote</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.rowLabel}>Phone</Text>
        <Text style={styles.rowValue}>{CONTACT_DETAILS.phoneDisplay}</Text>
        <Text style={styles.rowLabel}>Email</Text>
        <Text style={styles.rowValue}>{CONTACT_DETAILS.email}</Text>
        <Text style={styles.rowLabel}>Website</Text>
        <Text style={styles.rowValue}>{CONTACT_DETAILS.websiteUrl}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Why people choose us</Text>
        {trustPoints.map((point) => (
          <View key={point} style={styles.pointRow}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>{point}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Business hours</Text>
        <Text style={styles.rowValue}>{CONTACT_DETAILS.hours.weekdays}</Text>
        <Text style={styles.rowValue}>{CONTACT_DETAILS.hours.saturday}</Text>
        <Text style={styles.rowValue}>{CONTACT_DETAILS.hours.sunday}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 16 },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  eyebrow: {
    color: colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  title: { fontSize: 30, lineHeight: 36, fontWeight: '800', color: colors.text, marginBottom: 8 },
  connected: { color: colors.primary, fontSize: 15, fontWeight: '700', marginBottom: 8 },
  copy: { color: colors.textMuted, fontSize: 16, lineHeight: 24, marginBottom: 16 },
  actionRow: { gap: 12 },
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButton: { backgroundColor: colors.whatsapp },
  secondaryButton: { backgroundColor: colors.primary },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  secondaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
  },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 12 },
  rowLabel: { color: colors.textMuted, fontSize: 13, marginTop: 8 },
  rowValue: { color: colors.text, fontSize: 15, lineHeight: 22 },
  pointRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  pointDot: { width: 8, height: 8, borderRadius: 999, backgroundColor: colors.primary },
  pointText: { color: colors.text, fontSize: 15, lineHeight: 22 },
});
