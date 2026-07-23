import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../src/auth/AuthContext';
import { colors } from '../../src/theme';

export default function AccountScreen() {
  const { profile, loading, openAuth, logout, deleteAccount } = useAuth();
  const [confirmation, setConfirmation] = useState('');

  if (loading) {
    return <View style={styles.center}><Text style={styles.subtitle}>Loading account…</Text></View>;
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Your account</Text>
        <Text style={styles.subtitle}>Log in or register as a customer or cleaner.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={openAuth}>
          <Text style={styles.primaryText}>Log in or register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const confirmDeletion = () => {
    if (confirmation !== 'DELETE') {
      Alert.alert('Confirmation required', 'Type DELETE exactly to permanently delete the account.');
      return;
    }
    Alert.alert(
      'Delete account permanently?',
      'This removes the account profile and saved property details from this device. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete account',
          style: 'destructive',
          onPress: () => void deleteAccount(),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headingRow}>
        <View style={styles.largeAvatar}><Text style={styles.largeAvatarText}>{profile.name.slice(0, 1).toUpperCase()}</Text></View>
        <View style={styles.headingCopy}>
          <Text style={styles.title}>{profile.name}</Text>
          <Text style={styles.role}>{profile.role === 'customer' ? 'Customer account' : 'Cleaner account'}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile</Text>
        <Text style={styles.label}>Email</Text><Text style={styles.value}>{profile.email}</Text>
        <Text style={styles.label}>Phone</Text><Text style={styles.value}>{profile.phone}</Text>
      </View>

      {profile.role === 'customer' && profile.property ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Saved property</Text>
          <Text style={styles.value}>{profile.property.address}</Text>
          <Text style={styles.value}>{profile.property.propertyType} · {profile.property.bedrooms} bed · {profile.property.bathrooms} bath</Text>
          <Text style={styles.helper}>These details are automatically loaded into your quote.</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cleaner workspace</Text>
          <Text style={styles.value}>Availability, assigned jobs and work history will appear here.</Text>
        </View>
      )}

      <TouchableOpacity style={styles.secondaryButton} onPress={() => void logout()}>
        <Text style={styles.secondaryText}>Log out</Text>
      </TouchableOpacity>

      <View style={styles.dangerCard}>
        <Text style={styles.dangerTitle}>Delete account</Text>
        <Text style={styles.helper}>Permanently delete your profile and all locally saved account information. Type DELETE to confirm.</Text>
        <TextInput
          autoCapitalize="characters"
          placeholder="Type DELETE"
          style={styles.input}
          value={confirmation}
          onChangeText={setConfirmation}
        />
        <TouchableOpacity style={[styles.deleteButton, confirmation !== 'DELETE' && styles.disabled]} disabled={confirmation !== 'DELETE'} onPress={confirmDeletion}>
          <Text style={styles.deleteText}>Delete my account</Text>
        </TouchableOpacity>
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
  largeAvatar: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 30, height: 60, justifyContent: 'center', width: 60 },
  largeAvatarText: { color: '#fff', fontSize: 24, fontWeight: '800' },
  title: { color: colors.text, fontSize: 27, fontWeight: '800' },
  role: { color: colors.primary, fontSize: 14, fontWeight: '700', marginTop: 3, textTransform: 'capitalize' },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 22, textAlign: 'center' },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 18, borderWidth: 1, gap: 7, padding: 18 },
  cardTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 5 },
  label: { color: colors.textMuted, fontSize: 12, marginTop: 5, textTransform: 'uppercase' },
  value: { color: colors.text, fontSize: 15, lineHeight: 22 },
  helper: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  primaryButton: { backgroundColor: colors.primary, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 15 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  secondaryButton: { alignItems: 'center', borderColor: colors.primary, borderRadius: 14, borderWidth: 1, paddingVertical: 14 },
  secondaryText: { color: colors.primary, fontWeight: '800' },
  dangerCard: { backgroundColor: '#fff6f6', borderColor: '#f0b8b8', borderRadius: 18, borderWidth: 1, gap: 12, padding: 18 },
  dangerTitle: { color: '#9f1420', fontSize: 18, fontWeight: '800' },
  input: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.text, fontSize: 16, paddingHorizontal: 14, paddingVertical: 13 },
  deleteButton: { alignItems: 'center', backgroundColor: '#b4232d', borderRadius: 12, paddingVertical: 14 },
  deleteText: { color: '#fff', fontWeight: '800' },
  disabled: { opacity: 0.45 },
});
