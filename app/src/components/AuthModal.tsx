import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { type AccountRole, type PropertyProfile, useAuth } from '../auth/AuthContext';
import { colors } from '../theme';

const defaultProperty: PropertyProfile = {
  address: '',
  propertyType: 'apartment',
  bedrooms: 2,
  bathrooms: 1,
  toilets: 1,
  livingRooms: 1,
  kitchens: 1,
};

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <View style={styles.numberRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.stepper}>
        <TouchableOpacity style={styles.stepButton} onPress={() => onChange(Math.max(0, value - 1))}>
          <Text style={styles.stepText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.stepValue}>{value}</Text>
        <TouchableOpacity style={styles.stepButton} onPress={() => onChange(value + 1)}>
          <Text style={styles.stepText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function AuthModal() {
  const { authVisible, closeAuth, login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<AccountRole>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [property, setProperty] = useState(defaultProperty);

  const submit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing details', 'Enter your email and password.');
      return;
    }

    if (mode === 'login') {
      if (!(await login(email, password))) {
        Alert.alert('Unable to log in', 'Check your email and password, then try again.');
      }
      return;
    }

    if (!name.trim() || !phone.trim()) {
      Alert.alert('Missing details', 'Enter your name, phone number, email and password.');
      return;
    }
    if (role === 'customer' && !property.address.trim()) {
      Alert.alert('Property required', 'Enter the property address used for quotes.');
      return;
    }

    try {
      await register({
        role,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        property: role === 'customer' ? property : undefined,
      }, password);
    } catch {
      Alert.alert('Unable to create account', 'Check the details or use a different email address.');
    }
  };

  return (
    <Modal visible={authVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={closeAuth}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.modalHeader}>
          <Text style={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create account'}</Text>
          <TouchableOpacity onPress={closeAuth}><Text style={styles.close}>Close</Text></TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.segment}>
            {(['login', 'register'] as const).map((item) => (
              <TouchableOpacity key={item} style={[styles.segmentButton, mode === item && styles.segmentActive]} onPress={() => setMode(item)}>
                <Text style={[styles.segmentText, mode === item && styles.segmentTextActive]}>
                  {item === 'login' ? 'Log in' : 'Register'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {mode === 'register' && (
            <>
              <Text style={styles.sectionTitle}>I am registering as</Text>
              <View style={styles.segment}>
                {(['customer', 'cleaner'] as AccountRole[]).map((item) => (
                  <TouchableOpacity key={item} style={[styles.segmentButton, role === item && styles.segmentActive]} onPress={() => setRole(item)}>
                    <Text style={[styles.segmentText, role === item && styles.segmentTextActive]}>
                      {item === 'customer' ? 'Customer' : 'Cleaner'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput style={styles.input} placeholder="Full name" placeholderTextColor={colors.textMuted} value={name} onChangeText={setName} />
              <TextInput style={styles.input} placeholder="Phone number" placeholderTextColor={colors.textMuted} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
            </>
          )}

          <TextInput style={styles.input} placeholder="Email address" placeholderTextColor={colors.textMuted} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor={colors.textMuted} secureTextEntry value={password} onChangeText={setPassword} />

          {mode === 'register' && role === 'customer' && (
            <View style={styles.propertyCard}>
              <Text style={styles.sectionTitle}>Property details</Text>
              <Text style={styles.propertyHint}>Saved to your profile and prefilled in every quote.</Text>
              <TextInput style={styles.input} placeholder="Property address" placeholderTextColor={colors.textMuted} value={property.address} onChangeText={(address) => setProperty((current) => ({ ...current, address }))} />
              <View style={styles.chips}>
                {(['apartment', 'unit', 'townhouse', 'house', 'studio'] as const).map((type) => (
                  <TouchableOpacity key={type} style={[styles.chip, property.propertyType === type && styles.chipActive]} onPress={() => setProperty((current) => ({ ...current, propertyType: type }))}>
                    <Text style={[styles.chipText, property.propertyType === type && styles.chipTextActive]}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {(['bedrooms', 'bathrooms', 'toilets', 'livingRooms', 'kitchens'] as const).map((key) => (
                <NumberField key={key} label={key === 'livingRooms' ? 'Living rooms' : key[0].toUpperCase() + key.slice(1)} value={property[key]} onChange={(value) => setProperty((current) => ({ ...current, [key]: value }))} />
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={() => void submit()}>
            <Text style={styles.primaryText}>{mode === 'login' ? 'Log in' : `Create ${role} account`}</Text>
          </TouchableOpacity>
          <Text style={styles.disclaimer}>Your account and job information is securely synced with Firebase.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#fff' },
  modalHeader: { alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  title: { color: colors.text, fontSize: 24, fontWeight: '800' },
  close: { color: colors.primary, fontSize: 16, fontWeight: '700' },
  content: { gap: 14, padding: 20, paddingBottom: 48 },
  segment: { backgroundColor: colors.surfaceMuted, borderRadius: 14, flexDirection: 'row', padding: 4 },
  segmentButton: { alignItems: 'center', borderRadius: 11, flex: 1, paddingVertical: 11 },
  segmentActive: { backgroundColor: colors.primary },
  segmentText: { color: colors.textMuted, fontWeight: '700', textTransform: 'capitalize' },
  segmentTextActive: { color: '#fff' },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  helper: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  propertyHint: { color: '#3f4247', fontSize: 14, fontWeight: '600', lineHeight: 20 },
  input: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.text, fontSize: 16, paddingHorizontal: 14, paddingVertical: 13 },
  propertyCard: { backgroundColor: colors.surfaceMuted, borderRadius: 16, gap: 12, padding: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 999, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8 },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, textTransform: 'capitalize' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  numberRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: colors.text, fontWeight: '600' },
  stepper: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  stepButton: { alignItems: 'center', backgroundColor: '#fff', borderColor: colors.border, borderRadius: 9, borderWidth: 1, height: 34, justifyContent: 'center', width: 34 },
  stepText: { color: colors.text, fontSize: 19, fontWeight: '700' },
  stepValue: { color: colors.text, minWidth: 18, textAlign: 'center' },
  primaryButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 15 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  disclaimer: { color: colors.textMuted, fontSize: 12, lineHeight: 18, textAlign: 'center' },
});
