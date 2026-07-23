import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type AccountRole = 'customer' | 'cleaner';

export interface PropertyProfile {
  address: string;
  propertyType: 'apartment' | 'unit' | 'townhouse' | 'house' | 'studio';
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  livingRooms: number;
  kitchens: number;
}

export interface AccountProfile {
  id: string;
  role: AccountRole;
  name: string;
  email: string;
  phone: string;
  property?: PropertyProfile;
}

interface AuthContextValue {
  profile: AccountProfile | null;
  loading: boolean;
  authVisible: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  register: (profile: Omit<AccountProfile, 'id'>) => Promise<void>;
  login: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const ACCOUNT_KEY = '@melbourne-cleaning/account';
const SESSION_KEY = '@melbourne-cleaning/session';
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [savedAccount, setSavedAccount] = useState<AccountProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authVisible, setAuthVisible] = useState(false);

  useEffect(() => {
    void Promise.all([AsyncStorage.getItem(ACCOUNT_KEY), AsyncStorage.getItem(SESSION_KEY)])
      .then(([accountJson, session]) => {
        const account = accountJson ? (JSON.parse(accountJson) as AccountProfile) : null;
        setSavedAccount(account);
        setProfile(session === 'active' ? account : null);
      })
      .catch(() => {
        setSavedAccount(null);
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      profile,
      loading,
      authVisible,
      openAuth: () => setAuthVisible(true),
      closeAuth: () => setAuthVisible(false),
      register: async (details) => {
        const account: AccountProfile = { ...details, id: `${Date.now()}` };
        await AsyncStorage.multiSet([
          [ACCOUNT_KEY, JSON.stringify(account)],
          [SESSION_KEY, 'active'],
        ]);
        setSavedAccount(account);
        setProfile(account);
        setAuthVisible(false);
      },
      login: async (email) => {
        if (!savedAccount || savedAccount.email.toLowerCase() !== email.trim().toLowerCase()) {
          return false;
        }
        await AsyncStorage.setItem(SESSION_KEY, 'active');
        setProfile(savedAccount);
        setAuthVisible(false);
        return true;
      },
      logout: async () => {
        await AsyncStorage.removeItem(SESSION_KEY);
        setProfile(null);
      },
      deleteAccount: async () => {
        await AsyncStorage.multiRemove([ACCOUNT_KEY, SESSION_KEY]);
        setSavedAccount(null);
        setProfile(null);
      },
    }),
    [authVisible, loading, profile, savedAccount],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return value;
}
