import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../auth/AuthContext';
import { colors } from '../theme';

function LogoMark() {
  return (
    <View style={styles.logoMark}>
      <Image
        source={require('../../assets/images/icon.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
}

export function AppHeader() {
  const router = useRouter();
  const { profile, openAuth, logout } = useAuth();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);

  const openProfile = () => {
    if (!profile) {
      openAuth();
      return;
    }
    setMenuVisible((visible) => !visible);
  };

  return (
    <View style={[styles.header, { height: 64 + insets.top, paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.brand} onPress={() => router.push('/')}>
        <LogoMark />
        <Text style={styles.brandTitle}>Melbourne Cleaning</Text>
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
        {profile && menuVisible && (
          <View style={styles.profileMenu}>
            <View style={styles.menuArrow} />
            <TouchableOpacity
              style={[styles.menuItem, styles.logoutItem]}
              onPress={() => {
                setMenuVisible(false);
                void logout();
              }}
            >
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          </View>
        )}
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
    zIndex: 100,
  },
  brand: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  logoMark: {
    alignItems: 'center',
    borderRadius: 11,
    height: 42,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 42,
  },
  logoImage: { height: 42, width: 42 },
  brandTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  actions: { alignItems: 'center', flexDirection: 'row', gap: 8, position: 'relative' },
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
  profileMenu: {
    backgroundColor: '#fff',
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 10,
    padding: 8,
    position: 'absolute',
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    top: 50,
    width: 120,
    zIndex: 200,
  },
  menuArrow: {
    backgroundColor: '#fff',
    borderColor: colors.border,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    height: 12,
    position: 'absolute',
    right: 15,
    top: -7,
    transform: [{ rotate: '45deg' }],
    width: 12,
  },
  menuItem: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 },
  logoutItem: { backgroundColor: '#fff2f3' },
  logoutText: { color: '#b4232d', fontSize: 14, fontWeight: '800' },
});
