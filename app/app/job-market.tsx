import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAuth, type CleaningJob } from '../src/auth/AuthContext';
import { cleaningItems, formatCurrency } from '../src/data/quote';
import { colors } from '../src/theme';

function formatTime(time: string) {
  const [hoursText, minutes = '00'] = time.split(':');
  const hours = Number(hoursText);
  if (!Number.isFinite(hours)) return time;
  const suffix = hours >= 12 ? 'PM' : 'AM';
  return `${hours % 12 || 12}:${minutes} ${suffix}`;
}

function getPhotoSlots(job: CleaningJob) {
  return cleaningItems.flatMap((item) => {
    const quantity = job.quote.items[item.id] ?? 0;
    return Array.from({ length: quantity }, (_, index) => ({
      id: `${item.id}-${index + 1}`,
      label: `${item.label.replace(/ cleaning$/i, '')} ${index + 1}`,
    }));
  });
}

function JobSummary({ job }: { job: CleaningJob }) {
  const details = cleaningItems.filter((item) => (job.quote.items[item.id] ?? 0) > 0);
  return (
    <>
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
    </>
  );
}

export default function JobMarketScreen() {
  const router = useRouter();
  const { profile, jobs, acceptJob, uploadJobPhoto, completeJob } = useAuth();
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const availableJobs = jobs.filter((job) => job.status === 'pending');
  const assignedJobs = jobs.filter((job) => job.status === 'accepted' && job.acceptedBy === profile?.id);

  if (profile?.role !== 'cleaner') {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Cleaner account required</Text>
        <Text style={styles.subtitle}>Cleaner jobs are available only to registered cleaner accounts.</Text>
        <TouchableOpacity style={styles.outlineButton} onPress={() => router.back()}><Text style={styles.outlineText}>Go back</Text></TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async (jobId: string, slotId: string) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Camera access required', 'Allow camera access to take cleaning photos.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    });
    if (result.canceled || !result.assets[0]?.uri) return;
    try {
      setUploadingSlot(`${jobId}-${slotId}`);
      await uploadJobPhoto(jobId, slotId, result.assets[0].uri);
    } catch {
      Alert.alert('Photo upload failed', 'Please check your connection and try again.');
    } finally {
      setUploadingSlot(null);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Job assigned</Text>
      <Text style={styles.subtitle}>Accept a customer job. Once accepted, its cleaning-photo checklist expands below the job details.</Text>

      {!availableJobs.length && !assignedJobs.length ? (
        <View style={styles.card}><Text style={styles.emptyTitle}>No jobs available</Text><Text style={styles.subtitle}>New customer jobs will appear here.</Text></View>
      ) : (
        <>
          {availableJobs.map((job) => (
            <View key={job.id} style={styles.card}>
              <JobSummary job={job} />
              <TouchableOpacity style={styles.acceptButton} onPress={() => void acceptJob(job.id)}>
                <Text style={styles.acceptText}>Accept job</Text>
              </TouchableOpacity>
            </View>
          ))}
          {assignedJobs.map((job) => {
        const slots = getPhotoSlots(job);
        const completedSlots = slots.filter((slot) => job.cleaningPhotos?.[slot.id]).length;
        return (
          <View key={job.id} style={styles.card}>
            <JobSummary job={job} />
            <Text style={styles.photoHeading}>Cleaning photos</Text>
            <Text style={styles.subtitle}>Take one photo for each selected cleaning area.</Text>
            <View style={styles.photoGrid}>
              {slots.map((slot) => {
                const uri = job.cleaningPhotos?.[slot.id];
                const isUploading = uploadingSlot === `${job.id}-${slot.id}`;
                return (
                  <TouchableOpacity key={slot.id} style={styles.photoSlot} disabled={isUploading} onPress={() => void takePhoto(job.id, slot.id)}>
                    {uri ? <Image source={{ uri }} style={styles.photo} resizeMode="cover" /> : <Text style={styles.cameraIcon}>＋</Text>}
                    <Text style={styles.photoLabel}>{isUploading ? 'Uploading…' : uri ? `${slot.label} ✓` : slot.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity
              style={[styles.completeButton, completedSlots !== slots.length && styles.disabled]}
              disabled={!slots.length || completedSlots !== slots.length}
              onPress={() => void completeJob(job.id)}
            >
              <Text style={styles.acceptText}>Mark job done ({completedSlots}/{slots.length} photos)</Text>
            </TouchableOpacity>
          </View>
        );
          })}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { gap: 14, padding: 20, paddingBottom: 48 },
  center: { alignItems: 'center', backgroundColor: colors.background, flex: 1, gap: 14, justifyContent: 'center', padding: 24 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 18, borderWidth: 1, gap: 7, padding: 18 },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  headingRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  jobDate: { color: colors.text, flex: 1, fontSize: 16, fontWeight: '800' },
  total: { color: colors.primary, fontSize: 20, fontWeight: '800' },
  address: { color: colors.text, fontSize: 14, fontWeight: '700', lineHeight: 21 },
  value: { color: colors.text, fontSize: 14, lineHeight: 21 },
  detailHeading: { color: colors.text, fontSize: 13, fontWeight: '800', marginTop: 5 },
  detailLine: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  acceptButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 12, marginTop: 10, paddingVertical: 12 },
  completeButton: { alignItems: 'center', backgroundColor: '#18794e', borderRadius: 12, marginTop: 10, paddingVertical: 12 },
  acceptText: { color: '#fff', fontWeight: '800' },
  outlineButton: { alignItems: 'center', borderColor: colors.primary, borderRadius: 12, borderWidth: 1, paddingHorizontal: 18, paddingVertical: 12 },
  outlineText: { color: colors.primary, fontWeight: '800' },
  photoHeading: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 10 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 5 },
  photoSlot: { alignItems: 'center', backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderRadius: 12, borderStyle: 'dashed', borderWidth: 1, justifyContent: 'center', minHeight: 112, overflow: 'hidden', padding: 7, width: '48%' },
  photo: { borderRadius: 8, height: 76, width: '100%' },
  cameraIcon: { color: colors.primary, fontSize: 30, fontWeight: '500' },
  photoLabel: { color: colors.text, fontSize: 12, fontWeight: '700', marginTop: 5, textAlign: 'center' },
  disabled: { opacity: 0.45 },
});
