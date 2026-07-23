import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth, type CleaningJob } from '../src/auth/AuthContext';
import { cleaningItems, formatCurrency } from '../src/data/quote';
import { colors } from '../src/theme';

export default function JobMarketScreen() {
  const router = useRouter();
  const { profile, jobs, acceptJob } = useAuth();
  const [selectedJob, setSelectedJob] = useState<CleaningJob | null>(null);
  const [confirmation, setConfirmation] = useState('');
  const availableJobs = jobs.filter((job) => job.status === 'pending');

  if (profile?.role !== 'cleaner') {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Cleaner account required</Text>
        <Text style={styles.subtitle}>The Job Market is available only to registered cleaner accounts.</Text>
        <TouchableOpacity style={styles.outlineButton} onPress={() => router.back()}><Text style={styles.outlineText}>Go back</Text></TouchableOpacity>
      </View>
    );
  }

  const confirmAcceptance = async () => {
    if (!selectedJob || confirmation !== 'Accept') return;
    await acceptJob(selectedJob.id);
    setSelectedJob(null);
    setConfirmation('');
    Alert.alert('Job accepted', 'The job is now marked as accepted.');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Available jobs</Text>
      <Text style={styles.subtitle}>Review the full cleaning request before accepting a job.</Text>

      {!availableJobs.length ? (
        <View style={styles.card}><Text style={styles.emptyTitle}>No jobs available</Text><Text style={styles.subtitle}>New customer jobs will appear here.</Text></View>
      ) : availableJobs.map((job) => {
        const details = cleaningItems.filter((item) => (job.quote.items[item.id] ?? 0) > 0);
        return (
          <View key={job.id} style={styles.card}>
            <View style={styles.headingRow}>
              <Text style={styles.jobDate}>{job.quote.preferredDate} at {job.quote.preferredTime}</Text>
              <Text style={styles.total}>{formatCurrency(job.total)}</Text>
            </View>
            <Text style={styles.value}>Frequency: {job.quote.frequency}</Text>
            <Text style={styles.detailHeading}>Cleaning details</Text>
            {details.map((item) => {
              const quantity = job.quote.items[item.id] ?? 0;
              return <Text key={item.id} style={styles.detailLine}>• {item.label}{quantity > 1 ? ` × ${quantity}` : ''}</Text>;
            })}
            <TouchableOpacity style={styles.acceptButton} onPress={() => { setSelectedJob(job); setConfirmation(''); }}>
              <Text style={styles.acceptText}>Accept job</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {selectedJob && (
        <View style={styles.confirmCard}>
          <Text style={styles.confirmTitle}>Confirm job acceptance</Text>
          <Text style={styles.subtitle}>Type Accept exactly to accept this job.</Text>
          <TextInput
            autoCapitalize="words"
            placeholder="Type Accept"
            placeholderTextColor="#6b6f76"
            style={styles.input}
            value={confirmation}
            onChangeText={setConfirmation}
          />
          <View style={styles.actions}>
            <TouchableOpacity style={styles.outlineButton} onPress={() => { setSelectedJob(null); setConfirmation(''); }}><Text style={styles.outlineText}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.acceptButton, styles.flexButton, confirmation !== 'Accept' && styles.disabled]} disabled={confirmation !== 'Accept'} onPress={() => void confirmAcceptance()}><Text style={styles.acceptText}>Accept job</Text></TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { gap: 16, padding: 20, paddingBottom: 48 },
  center: { alignItems: 'center', backgroundColor: colors.background, flex: 1, gap: 14, justifyContent: 'center', padding: 24 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 18, borderWidth: 1, gap: 7, padding: 18 },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  headingRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  jobDate: { color: colors.text, flex: 1, fontSize: 16, fontWeight: '800' },
  total: { color: colors.primary, fontSize: 20, fontWeight: '800' },
  value: { color: colors.text, fontSize: 14, lineHeight: 21 },
  detailHeading: { color: colors.text, fontSize: 13, fontWeight: '800', marginTop: 5 },
  detailLine: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  acceptButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 12, marginTop: 10, paddingVertical: 12 },
  acceptText: { color: '#fff', fontWeight: '800' },
  confirmCard: { backgroundColor: '#fff6f8', borderColor: '#f3c5cf', borderRadius: 18, borderWidth: 1, gap: 10, padding: 18 },
  confirmTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  input: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.text, fontSize: 16, paddingHorizontal: 14, paddingVertical: 13 },
  actions: { flexDirection: 'row', gap: 10 },
  outlineButton: { alignItems: 'center', borderColor: colors.primary, borderRadius: 12, borderWidth: 1, flex: 1, paddingHorizontal: 18, paddingVertical: 12 },
  outlineText: { color: colors.primary, fontWeight: '800' },
  flexButton: { flex: 1, marginTop: 0 },
  disabled: { opacity: 0.45 },
});
