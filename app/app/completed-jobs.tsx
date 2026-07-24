import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth, type CleaningJob } from '../src/auth/AuthContext';
import { cleaningItems, formatCurrency } from '../src/data/quote';
import { colors } from '../src/theme';

function formatTime(time: string) {
  const [hoursText, minutes = '00'] = time.split(':');
  const hours = Number(hoursText);
  if (!Number.isFinite(hours)) return time;
  return `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
}

function CompletedJob({ job }: { job: CleaningJob }) {
  const details = cleaningItems.filter((item) => (job.quote.items[item.id] ?? 0) > 0);
  return (
    <View style={styles.card}>
      <View style={styles.headingRow}>
        <Text style={styles.jobDate}>{job.quote.preferredDate} at {formatTime(job.quote.preferredTime)}</Text>
        <Text style={styles.total}>{formatCurrency(job.total)}</Text>
      </View>
      <Text style={styles.address}>Customer address: {job.customerAddress || 'Address unavailable for this older job'}</Text>
      <Text style={styles.value}>Frequency: {job.quote.frequency}</Text>
      <Text style={styles.detailHeading}>Cleaning details</Text>
      {details.map((item) => {
        const quantity = job.quote.items[item.id] ?? 0;
        return <Text key={item.id} style={styles.detailLine}>• {item.label}{quantity > 1 ? ` × ${quantity}` : ''}</Text>;
      })}
      <Text style={styles.doneBadge}>Completed</Text>
    </View>
  );
}

export default function CompletedJobsScreen() {
  const router = useRouter();
  const { profile, jobs } = useAuth();

  if (profile?.role !== 'cleaner') {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Cleaner account required</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}><Text style={styles.backText}>Go back</Text></TouchableOpacity>
      </View>
    );
  }

  const completedJobs = jobs.filter((job) => job.status === 'completed' && job.acceptedBy === profile.id);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Job done</Text>
      <Text style={styles.subtitle}>Your completed cleaning jobs are kept here.</Text>
      {!completedJobs.length
        ? <View style={styles.card}><Text style={styles.subtitle}>No completed jobs yet.</Text></View>
        : completedJobs.map((job) => <CompletedJob key={job.id} job={job} />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { gap: 14, padding: 20, paddingBottom: 48 },
  center: { alignItems: 'center', backgroundColor: colors.background, flex: 1, gap: 16, justifyContent: 'center', padding: 24 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 18, borderWidth: 1, gap: 7, padding: 18 },
  headingRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  jobDate: { color: colors.text, flex: 1, fontSize: 16, fontWeight: '800' },
  total: { color: colors.primary, fontSize: 20, fontWeight: '800' },
  address: { color: colors.text, fontSize: 14, fontWeight: '700', lineHeight: 21 },
  value: { color: colors.text, fontSize: 14, lineHeight: 21 },
  detailHeading: { color: colors.text, fontSize: 13, fontWeight: '800', marginTop: 5 },
  detailLine: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  doneBadge: { alignSelf: 'flex-start', backgroundColor: '#dff7e9', borderRadius: 999, color: '#18794e', fontSize: 12, fontWeight: '800', marginTop: 7, overflow: 'hidden', paddingHorizontal: 10, paddingVertical: 6 },
  backButton: { borderColor: colors.primary, borderRadius: 12, borderWidth: 1, paddingHorizontal: 18, paddingVertical: 12 },
  backText: { color: colors.primary, fontWeight: '800' },
});
