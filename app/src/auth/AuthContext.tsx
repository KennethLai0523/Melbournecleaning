import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { auth, db, storage } from '../config/firebase';
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
  avatarUri?: string;
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
  customerId?: string;
  acceptedBy?: string;
}

interface AuthContextValue {
  profile: AccountProfile | null;
  loading: boolean;
  authVisible: boolean;
  draft: QuoteRecord | null;
  jobs: CleaningJob[];
  openAuth: () => void;
  closeAuth: () => void;
  register: (profile: Omit<AccountProfile, 'id' | 'joinedAt'>, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  saveDraft: (quote: QuoteState, total: number) => Promise<void>;
  submitJob: (quote: QuoteState, total: number) => Promise<void>;
  cancelJob: (jobId: string) => Promise<void>;
  updatePropertyAddress: (address: string) => Promise<void>;
  updateJob: (jobId: string, quote: QuoteState, total: number) => Promise<void>;
  updateAvatar: (avatarUri: string) => Promise<void>;
  acceptJob: (jobId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authVisible, setAuthVisible] = useState(false);
  const [draft, setDraft] = useState<QuoteRecord | null>(null);
  const [jobs, setJobs] = useState<CleaningJob[]>([]);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;
    let unsubscribeDraft: (() => void) | undefined;
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeProfile?.();
      unsubscribeDraft?.();
      if (!user) {
        setProfile(null);
        setDraft(null);
        setJobs([]);
        setLoading(false);
        return;
      }

      unsubscribeProfile = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
        setProfile(snapshot.exists() ? ({ id: user.uid, ...snapshot.data() } as AccountProfile) : null);
        setLoading(false);
      });
      unsubscribeDraft = onSnapshot(doc(db, 'drafts', user.uid), (snapshot) => {
        setDraft(snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as QuoteRecord) : null);
      });
    });
    return () => {
      unsubscribeAuth();
      unsubscribeProfile?.();
      unsubscribeDraft?.();
    };
  }, []);

  useEffect(() => {
    if (!profile) return;
    const jobsQuery = profile.role === 'customer'
      ? query(collection(db, 'jobs'), where('customerId', '==', profile.id))
      : query(collection(db, 'jobs'), where('status', '==', 'pending'));
    return onSnapshot(jobsQuery, (snapshot) => {
      setJobs(snapshot.docs
        .map((record) => ({ id: record.id, ...record.data() } as CleaningJob))
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
    });
  }, [profile]);

  const value = useMemo<AuthContextValue>(() => ({
    profile,
    loading,
    authVisible,
    draft,
    jobs,
    openAuth: () => setAuthVisible(true),
    closeAuth: () => setAuthVisible(false),
    register: async (details, password) => {
      const credential = await createUserWithEmailAndPassword(auth, details.email, password);
      const account = { ...details, joinedAt: new Date().toISOString() };
      await setDoc(doc(db, 'users', credential.user.uid), account);
      setAuthVisible(false);
    },
    login: async (email, password) => {
      try {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        setAuthVisible(false);
        return true;
      } catch {
        return false;
      }
    },
    logout: () => signOut(auth),
    deleteAccount: async () => {
      const user = auth.currentUser;
      if (!user) return;
      const ownedJobs = await getDocs(query(collection(db, 'jobs'), where('customerId', '==', user.uid)));
      await Promise.all(ownedJobs.docs.map((job) => deleteDoc(job.ref)));
      await Promise.all([
        deleteDoc(doc(db, 'drafts', user.uid)),
        deleteDoc(doc(db, 'users', user.uid)),
        deleteObject(ref(storage, `avatars/${user.uid}`)).catch(() => undefined),
      ]);
      await deleteUser(user);
    },
    saveDraft: async (quote, total) => {
      const user = auth.currentUser;
      if (!user) return;
      await setDoc(doc(db, 'drafts', user.uid), { quote, total, updatedAt: new Date().toISOString() });
    },
    submitJob: async (quote, total) => {
      const user = auth.currentUser;
      if (!user) return;
      const jobRef = doc(collection(db, 'jobs'));
      await setDoc(jobRef, {
        customerId: user.uid,
        quote,
        total,
        updatedAt: new Date().toISOString(),
        status: 'pending',
      });
      await deleteDoc(doc(db, 'drafts', user.uid));
    },
    cancelJob: async (jobId) => updateDoc(doc(db, 'jobs', jobId), { status: 'cancelled', updatedAt: new Date().toISOString() }),
    updatePropertyAddress: async (address) => {
      const user = auth.currentUser;
      if (!user) return;
      await updateDoc(doc(db, 'users', user.uid), { 'property.address': address });
    },
    updateJob: async (jobId, quote, total) => updateDoc(doc(db, 'jobs', jobId), { quote, total, updatedAt: new Date().toISOString() }),
    updateAvatar: async (avatarUri) => {
      const user = auth.currentUser;
      if (!user) return;
      const response = await fetch(avatarUri);
      const blob = await response.blob();
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(avatarRef, blob, { contentType: blob.type || 'image/jpeg' });
      const downloadUrl = await getDownloadURL(avatarRef);
      await updateDoc(doc(db, 'users', user.uid), { avatarUri: downloadUrl });
    },
    acceptJob: async (jobId) => {
      const user = auth.currentUser;
      if (!user) return;
      await updateDoc(doc(db, 'jobs', jobId), { status: 'accepted', acceptedBy: user.uid, updatedAt: new Date().toISOString() });
    },
  }), [authVisible, draft, jobs, loading, profile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
