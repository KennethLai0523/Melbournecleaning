import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { type CleanerGender, useAuth } from '../../src/auth/AuthContext';
import { cleaningItems, formatCurrency, type QuoteState } from '../../src/data/quote';
import { colors } from '../../src/theme';

function QuoteDetails({ quote }: { quote: QuoteState }) {
  const details = cleaningItems.filter((item) => (quote.items[item.id] ?? 0) > 0);
  return (
    <View style={styles.details}>
      <Text style={styles.value}>Frequency: {quote.frequency}</Text>
      <Text style={styles.value}>Schedule: {quote.preferredDate || 'Not selected'} {quote.preferredTime || ''}</Text>
      <Text style={styles.detailHeading}>Cleaning details</Text>
      {details.length ? details.map((item) => {
        const quantity = quote.items[item.id] ?? 0;
        return <Text key={item.id} style={styles.detailLine}>• {item.label}{quantity > 1 ? ` × ${quantity}` : ''}</Text>;
      }) : <Text style={styles.helper}>No cleaning details selected.</Text>}
    </View>
  );
}

export default function AccountScreen() {
  const router = useRouter();
  const { profile, loading, openAuth, deleteAccount, draft, jobs, cancelJob, submitJob, updatePropertyAddress, updateAvatar, updateCleanerProfile } = useAuth();
  const [confirmation, setConfirmation] = useState('');
  const [editingAddress, setEditingAddress] = useState(false);
  const [address, setAddress] = useState('');
  const [editingCleaner, setEditingCleaner] = useState(false);
  const [serviceArea, setServiceArea] = useState('');
  const [gender, setGender] = useState<CleanerGender>('Prefer not to say');

  if (loading) return <View style={styles.center}><Text style={styles.subtitle}>Loading account…</Text></View>;
  if (!profile) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Your account</Text>
        <Text style={styles.subtitle}>Log in or register as a customer or cleaner.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={openAuth}><Text style={styles.primaryText}>Log in or register</Text></TouchableOpacity>
      </View>
    );
  }

  const confirmDeletion = () => {
    if (confirmation !== 'DELETE') return Alert.alert('Confirmation required', 'Type DELETE exactly to permanently delete the account.');
    Alert.alert('Delete account permanently?', 'This removes your profile, property, drafts and jobs from this device. This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete account', style: 'destructive', onPress: () => void deleteAccount() },
    ]);
  };

  const sendDraft = async () => {
    if (!draft) return;
    if (draft.total <= 0) return Alert.alert('Quote incomplete', 'Edit the draft and add at least one cleaning detail.');
    if (!draft.quote.preferredDate || !draft.quote.preferredTime) return Alert.alert('Schedule required', 'Edit the draft and choose a date and start time first.');
    await submitJob(draft.quote, draft.total);
    Alert.alert('Job sent', 'Your draft has been sent as a pending job.');
  };

  const joinedDate = new Date(profile.joinedAt || Number(profile.id));
  const chooseProfilePicture = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access required', 'Allow photo access to choose a profile picture.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]?.uri) await updateAvatar(result.assets[0].uri);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headingRow}>
        <TouchableOpacity
          accessibilityLabel="Choose profile picture"
          style={styles.largeAvatar}
          onPress={() => void chooseProfilePicture()}
        >
          {profile.avatarUri
            ? <Image source={{ uri: profile.avatarUri }} style={styles.largeAvatarImage} />
            : <Text style={styles.largeAvatarText}>{profile.name.slice(0, 1).toUpperCase()}</Text>}
        </TouchableOpacity>
        <View style={styles.headingCopy}>
          <Text style={styles.title}>{profile.name}</Text>
          <Text style={styles.role}>{profile.role === 'customer' ? 'Customer account' : 'Cleaner account'}</Text>
          <Text style={styles.photoHint}>Tap photo to change</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.recordHeading}>
          <Text style={styles.cardTitle}>Profile</Text>
          {profile.role === 'cleaner' && !editingCleaner && (
            <TouchableOpacity onPress={() => {
              setServiceArea(profile.serviceArea ?? '');
              setGender(profile.gender ?? 'Prefer not to say');
              setEditingCleaner(true);
            }}>
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.label}>Email</Text><Text style={styles.value}>{profile.email}</Text>
        <Text style={styles.label}>Phone</Text><Text style={styles.value}>{profile.phone}</Text>
        <Text style={styles.label}>Joined since</Text>
        <Text style={styles.value}>{joinedDate.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
        {profile.role === 'cleaner' && (
          editingCleaner ? (
            <>
              <Text style={styles.label}>Area based</Text>
              <TextInput style={styles.input} placeholder="Area based, e.g. Burwood" placeholderTextColor="#6b6f76" value={serviceArea} onChangeText={setServiceArea} />
              <Text style={styles.label}>Gender</Text>
              <View style={styles.optionWrap}>
                {(['Female', 'Male', 'Prefer not to say'] as CleanerGender[]).map((option) => (
                  <TouchableOpacity key={option} style={[styles.optionChip, gender === option && styles.optionChipActive]} onPress={() => setGender(option)}>
                    <Text style={[styles.optionText, gender === option && styles.optionTextActive]}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.inlineActions}>
                <TouchableOpacity style={styles.smallPrimaryButton} onPress={() => {
                  if (!serviceArea.trim()) return Alert.alert('Area required', 'Enter the Melbourne area where you are based.');
                  void updateCleanerProfile(serviceArea.trim(), gender).then(() => setEditingCleaner(false));
                }}><Text style={styles.smallPrimaryText}>Save profile</Text></TouchableOpacity>
                <TouchableOpacity style={styles.smallOutlineButton} onPress={() => setEditingCleaner(false)}><Text style={styles.editLink}>Cancel</Text></TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.label}>Area based</Text>
              <Text style={styles.value}>{profile.serviceArea || 'Not added yet'}</Text>
              <Text style={styles.label}>Gender</Text>
              <Text style={styles.value}>{profile.gender || 'Not added yet'}</Text>
              <Text style={styles.helper}>Area and gender appear publicly in the Services tab.</Text>
            </>
          )
        )}
      </View>

      {profile.role === 'customer' && profile.property ? (
        <View style={styles.card}>
          <View style={styles.recordHeading}>
            <Text style={styles.cardTitle}>Property address</Text>
            {!editingAddress && <TouchableOpacity onPress={() => { setAddress(profile.property?.address ?? ''); setEditingAddress(true); }}><Text style={styles.editLink}>Edit</Text></TouchableOpacity>}
          </View>
          {editingAddress ? (
            <>
              <TextInput style={styles.input} placeholder="Property address" placeholderTextColor="#6b6f76" value={address} onChangeText={setAddress} />
              <View style={styles.inlineActions}>
                <TouchableOpacity style={styles.smallPrimaryButton} onPress={() => {
                  if (!address.trim()) return Alert.alert('Address required', 'Enter your property address.');
                  void updatePropertyAddress(address.trim()).then(() => setEditingAddress(false));
                }}><Text style={styles.smallPrimaryText}>Save address</Text></TouchableOpacity>
                <TouchableOpacity style={styles.smallOutlineButton} onPress={() => setEditingAddress(false)}><Text style={styles.editLink}>Cancel</Text></TouchableOpacity>
              </View>
            </>
          ) : <Text style={styles.value}>{profile.property.address}</Text>}
          <Text style={styles.helper}>This address is automatically used with your quotes and jobs.</Text>
        </View>
      ) : (
        <>
          <View style={styles.card}>
            <View style={styles.recordHeading}>
              <Text style={styles.cardTitle}>Job assigned</Text>
              <TouchableOpacity onPress={() => router.push('/job-market')}><Text style={styles.editLink}>Browse jobs</Text></TouchableOpacity>
            </View>
            <Text style={styles.helper}>Jobs assigned to you stay here while you complete the cleaning and upload the required photos.</Text>
            <Text style={styles.value}>{jobs.filter((job) => job.status === 'accepted' && job.acceptedBy === profile.id).length} currently assigned</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.recordHeading}>
              <Text style={styles.cardTitle}>Job done</Text>
              <TouchableOpacity onPress={() => router.push('/job-market')}><Text style={styles.editLink}>View completed</Text></TouchableOpacity>
            </View>
            <Text style={styles.helper}>Cleaning jobs you have completed are saved here.</Text>
            <Text style={styles.value}>{jobs.filter((job) => job.status === 'completed' && job.acceptedBy === profile.id).length} completed</Text>
          </View>
        </>
      )}

      {profile.role === 'customer' && draft && (
        <View style={styles.card}>
          <View style={styles.recordHeading}><Text style={styles.cardTitle}>Saved quote draft</Text><Text style={styles.draftBadge}>Draft</Text></View>
          <Text style={styles.recordTotal}>{formatCurrency(draft.total)}</Text>
          <QuoteDetails quote={draft.quote} />
          <Text style={styles.helper}>Saved {new Date(draft.updatedAt).toLocaleString('en-AU')}</Text>
          <View style={styles.inlineActions}>
            <TouchableOpacity style={styles.smallOutlineButton} onPress={() => router.push('/quote?draft=true')}><Text style={styles.editLink}>Edit draft</Text></TouchableOpacity>
            <TouchableOpacity style={styles.smallPrimaryButton} onPress={() => void sendDraft()}><Text style={styles.smallPrimaryText}>Send job</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {profile.role === 'customer' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Jobs</Text>
          {!jobs.length ? <Text style={styles.helper}>No jobs sent yet.</Text> : jobs.map((job) => (
            <View key={job.id} style={styles.jobRow}>
              <View style={styles.recordHeading}>
                <Text style={styles.jobTitle}>{job.quote.preferredDate || 'Date not selected'} {job.quote.preferredTime ? `at ${job.quote.preferredTime}` : ''}</Text>
                <Text style={[styles.statusBadge, job.status === 'cancelled' && styles.cancelledBadge]}>{job.status}</Text>
              </View>
              <Text style={styles.recordTotal}>{formatCurrency(job.total)}</Text>
              <QuoteDetails quote={job.quote} />
              {job.status === 'pending' && (
                <View style={styles.inlineActions}>
                  <TouchableOpacity style={styles.smallOutlineButton} onPress={() => router.push(`/quote?jobId=${job.id}`)}><Text style={styles.editLink}>Edit job</Text></TouchableOpacity>
                  <TouchableOpacity style={[styles.cancelButton, styles.flexButton]} onPress={() => Alert.alert('Cancel this job?', 'A pending job can be cancelled before a cleaner accepts it.', [
                    { text: 'Keep job', style: 'cancel' },
                    { text: 'Cancel job', style: 'destructive', onPress: () => void cancelJob(job.id) },
                  ])}><Text style={styles.cancelButtonText}>Cancel job</Text></TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      <View style={styles.dangerCard}>
        <Text style={styles.dangerTitle}>Delete account</Text>
        <Text style={styles.helper}>Permanently delete your profile and all locally saved account information. Type DELETE to confirm.</Text>
        <TextInput autoCapitalize="characters" placeholder="Type DELETE" placeholderTextColor="#6b6f76" style={styles.input} value={confirmation} onChangeText={setConfirmation} />
        <TouchableOpacity style={[styles.deleteButton, confirmation !== 'DELETE' && styles.disabled]} disabled={confirmation !== 'DELETE'} onPress={confirmDeletion}><Text style={styles.deleteText}>Delete my account</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { gap: 16, padding: 20, paddingBottom: 40 },
  center: { alignItems: 'center', backgroundColor: colors.background, flex: 1, gap: 14, justifyContent: 'center', padding: 24 },
  headingRow: { alignItems: 'center', flexDirection: 'row', gap: 14 },
  headingCopy: { flex: 1 },
  largeAvatar: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 30, height: 60, justifyContent: 'center', position: 'relative', width: 60 },
  largeAvatarText: { color: '#fff', fontSize: 24, fontWeight: '800' },
  largeAvatarImage: { borderRadius: 30, height: 60, width: 60 },
  title: { color: colors.text, fontSize: 27, fontWeight: '800' },
  role: { color: colors.primary, fontSize: 14, fontWeight: '700', marginTop: 3 },
  photoHint: { color: colors.textMuted, fontSize: 12, marginTop: 3 },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 22, textAlign: 'center' },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 18, borderWidth: 1, gap: 7, padding: 18 },
  cardTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 5 },
  label: { color: colors.textMuted, fontSize: 12, marginTop: 5, textTransform: 'uppercase' },
  value: { color: colors.text, fontSize: 15, lineHeight: 22 },
  helper: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  recordHeading: { alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  recordTotal: { color: colors.primary, fontSize: 22, fontWeight: '800' },
  draftBadge: { backgroundColor: '#fff0d8', borderRadius: 999, color: '#8a5700', fontSize: 11, fontWeight: '800', overflow: 'hidden', paddingHorizontal: 9, paddingVertical: 5 },
  details: { gap: 3 },
  detailHeading: { color: colors.text, fontSize: 13, fontWeight: '800', marginTop: 5 },
  detailLine: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  jobRow: { borderTopColor: colors.border, borderTopWidth: 1, gap: 7, paddingTop: 14 },
  jobTitle: { color: colors.text, flex: 1, fontSize: 14, fontWeight: '800' },
  statusBadge: { backgroundColor: '#fff0d8', borderRadius: 999, color: '#8a5700', fontSize: 11, fontWeight: '800', overflow: 'hidden', paddingHorizontal: 9, paddingVertical: 5, textTransform: 'capitalize' },
  cancelledBadge: { backgroundColor: '#eee', color: colors.textMuted },
  inlineActions: { flexDirection: 'row', gap: 10, marginTop: 7 },
  flexButton: { flex: 1 },
  smallPrimaryButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 10, flex: 1, paddingVertical: 11 },
  smallPrimaryText: { color: '#fff', fontWeight: '800' },
  smallOutlineButton: { alignItems: 'center', borderColor: colors.primary, borderRadius: 10, borderWidth: 1, flex: 1, paddingVertical: 10 },
  editLink: { color: colors.primary, fontWeight: '800' },
  cancelButton: { alignItems: 'center', borderColor: '#b4232d', borderRadius: 10, borderWidth: 1, paddingVertical: 10 },
  cancelButtonText: { color: '#b4232d', fontWeight: '800' },
  primaryButton: { backgroundColor: colors.primary, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 15 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  dangerCard: { backgroundColor: '#fff6f6', borderColor: '#f0b8b8', borderRadius: 18, borderWidth: 1, gap: 12, padding: 18 },
  dangerTitle: { color: '#9f1420', fontSize: 18, fontWeight: '800' },
  input: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.text, fontSize: 16, paddingHorizontal: 14, paddingVertical: 13 },
  optionWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: { backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderRadius: 999, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8 },
  optionChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  optionText: { color: colors.text, fontSize: 13 },
  optionTextActive: { color: '#fff', fontWeight: '800' },
  deleteButton: { alignItems: 'center', backgroundColor: '#b4232d', borderRadius: 12, paddingVertical: 14 },
  deleteText: { color: '#fff', fontWeight: '800' },
  disabled: { opacity: 0.45 },
});
