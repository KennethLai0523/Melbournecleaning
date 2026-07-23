import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useAuth } from '../auth/AuthContext';
import { colors } from '../theme';

function LogoMark() {
  return (
    <View style={styles.logoMark}>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path d="M4 11 12 4l8 7v9H4v-9Z" stroke="#fff" strokeWidth={2} strokeLinejoin="round" />
        <Path d="M9 20v-6h6v6" stroke="#fff" strokeWidth={2} />
      </Svg>
    </View>
  );
}

export function AppHeader() {
  const router = useRouter();
  const { profile, openAuth } = useAuth();

  const openProfile = () => {
    if (!profile) {
      openAuth();
      return;
    }
    router.push('/account');
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.brand} onPress={() => router.push('/')}>
        <LogoMark />
        <View>
          <Text style={styles.brandTitle}>Melbourne Cleaning</Text>
          <Text style={styles.brandSubtitle}>Group</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity
          accessibilityLabel="Notifications"
          style={styles.iconButton}
          onPress={() =>
            profile
              ? Alert.alert('Notifications', 'You have no new notifications.')
              : openAuth()
          }
        >
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path d="M6 9a6 6 0 0 1 12 0v5l2 3H4l2-3V9Z" stroke={colors.text} strokeWidth={1.8} strokeLinejoin="round" />
            <Path d="M10 20h4" stroke={colors.text} strokeWidth={1.8} strokeLinecap="round" />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity accessibilityLabel="Profile" style={styles.avatar} onPress={openProfile}>
          {profile ? (
            <Text style={styles.avatarText}>{profile.name.slice(0, 1).toUpperCase()}</Text>
          ) : (
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
              <Circle cx={12} cy={8} r={3.5} stroke={colors.text} strokeWidth={1.8} />
              <Path d="M5 20c1-3.2 3.4-4.8 7-4.8s6 1.6 7 4.8" stroke={colors.text} strokeWidth={1.8} strokeLinecap="round" />
            </Svg>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  brand: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  logoMark: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 11,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  brandTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
  brandSubtitle: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  actions: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  iconButton: { alignItems: 'center', height: 42, justifyContent: 'center', width: 42 },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: 21,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  avatarText: { color: colors.primary, fontSize: 17, fontWeight: '800' },
});
