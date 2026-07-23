import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../src/theme';

export default function AccountScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Account</Text>
      <Text style={styles.subtitle}>
        Customer and Cleaner accounts are planned, but not live yet.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Customer account</Text>
        <Text style={styles.cardBody}>
          Manage quotes, bookings, addresses and cleaning history.
        </Text>
        <TouchableOpacity style={styles.disabledButton} disabled>
          <Text style={styles.disabledButtonText}>Coming soon</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cleaner account</Text>
        <Text style={styles.cardBody}>
          Manage availability, assigned jobs and work history.
        </Text>
        <TouchableOpacity style={styles.disabledButton} disabled>
          <Text style={styles.disabledButtonText}>Coming soon</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 16 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 12,
  },
  cardTitle: { fontSize: 19, fontWeight: '800', color: colors.text },
  cardBody: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
  disabledButton: {
    marginTop: 6,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButtonText: { color: colors.textMuted, fontWeight: '700' },
});
