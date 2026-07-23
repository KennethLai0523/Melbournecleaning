import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import type { QuoteState } from '../data/quote';

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
  joinedAt: string;
  role: AccountRole;
  name: string;
  email: string;
  phone: string;
  property?: PropertyProfile;
}

export interface QuoteRecord {
  id: string;
  quote: QuoteState;
  total: number;
  updatedAt: string;
}

export interface CleaningJob extends QuoteRecord {
  status: 'pending' | 'accepted' | 'cancelled';
}

interface AuthContextValue {
  profile: AccountProfile | null;
  loading: boolean;
  authVisible: boolean;
  draft: QuoteRecord | null;
  jobs: CleaningJob[];
  openAuth: () => void;
  closeAuth: () => void;
  register: (profile: Omit<AccountProfile, 'id' | 'joinedAt'>) => Promise<void>;
  login: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  saveDraft: (quote: QuoteState, total: number) => Promise<void>;
  submitJob: (quote: QuoteState, total: number) => Promise<void>;
  cancelJob: (jobId: string) => Promise<void>;
  updatePropertyAddress: (address: string) => Promise<void>;
  updateJob: (jobId: string, quote: QuoteState, total: number) => Promise<void>;
}

const ACCOUNT_KEY = '@melbourne-cleaning/account';
const SESSION_KEY = '@melbourne-cleaning/session';
const DRAFT_KEY = '@melbourne-cleaning/quote-draft';
const JOBS_KEY = '@melbourne-cleaning/jobs';
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [savedAccount, setSavedAccount] = useState<AccountProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authVisible, setAuthVisible] = useState(false);
  const [draft, setDraft] = useState<QuoteRecord | null>(null);
  const [jobs, setJobs] = useState<CleaningJob[]>([]);

  useEffect(() => {
    void Promise.all([
      AsyncStorage.getItem(ACCOUNT_KEY),
      AsyncStorage.getItem(SESSION_KEY),
      AsyncStorage.getItem(DRAFT_KEY),
      AsyncStorage.getItem(JOBS_KEY),
    ])
      .then(([accountJson, session, draftJson, jobsJson]) => {
        const account = accountJson ? (JSON.parse(accountJson) as AccountProfile) : null;
        setSavedAccount(account);
        setProfile(session === 'active' ? account : null);
        setDraft(draftJson ? (JSON.parse(draftJson) as QuoteRecord) : null);
        setJobs(jobsJson ? (JSON.parse(jobsJson) as CleaningJob[]) : []);
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
      draft,
      jobs,
      openAuth: () => setAuthVisible(true),
      closeAuth: () => setAuthVisible(false),
      register: async (details) => {
        const account: AccountProfile = { ...details, id: `${Date.now()}`, joinedAt: new Date().toISOString() };
        await AsyncStorage.multiSet([
          [ACCOUNT_KEY, JSON.stringify(account)],
          [SESSION_KEY, 'active'],
          [JOBS_KEY, '[]'],
        ]);
        await AsyncStorage.removeItem(DRAFT_KEY);
        setSavedAccount(account);
        setProfile(account);
        setDraft(null);
        setJobs([]);
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
        await AsyncStorage.multiRemove([ACCOUNT_KEY, SESSION_KEY, DRAFT_KEY, JOBS_KEY]);
        setSavedAccount(null);
        setProfile(null);
        setDraft(null);
        setJobs([]);
      },
      saveDraft: async (quote, total) => {
        const record: QuoteRecord = {
          id: draft?.id ?? `${Date.now()}`,
          quote,
          total,
          updatedAt: new Date().toISOString(),
        };
        await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(record));
        setDraft(record);
      },
      submitJob: async (quote, total) => {
        const job: CleaningJob = {
          id: `${Date.now()}`,
          quote,
          total,
          updatedAt: new Date().toISOString(),
          status: 'pending',
        };
        const nextJobs = [job, ...jobs];
        await AsyncStorage.multiSet([
          [JOBS_KEY, JSON.stringify(nextJobs)],
          [DRAFT_KEY, ''],
        ]);
        await AsyncStorage.removeItem(DRAFT_KEY);
        setJobs(nextJobs);
        setDraft(null);
      },
      cancelJob: async (jobId) => {
        const nextJobs = jobs.map((job) =>
          job.id === jobId && job.status === 'pending' ? { ...job, status: 'cancelled' as const } : job,
        );
        await AsyncStorage.setItem(JOBS_KEY, JSON.stringify(nextJobs));
        setJobs(nextJobs);
      },
      updatePropertyAddress: async (address) => {
        if (!profile?.property) return;
        const nextProfile = { ...profile, property: { ...profile.property, address } };
        await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(nextProfile));
        setSavedAccount(nextProfile);
        setProfile(nextProfile);
      },
      updateJob: async (jobId, quote, total) => {
        const nextJobs = jobs.map((job) =>
          job.id === jobId && job.status === 'pending'
            ? { ...job, quote, total, updatedAt: new Date().toISOString() }
            : job,
        );
        await AsyncStorage.setItem(JOBS_KEY, JSON.stringify(nextJobs));
        setJobs(nextJobs);
      },
    }),
    [authVisible, draft, jobs, loading, profile, savedAccount],
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
