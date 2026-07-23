import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
// Firebase's React Native runtime exports this helper, but its default web type entry omits it.
// @ts-expect-error React Native-specific Firebase Auth export
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCpSIzsX9YBRmaVhO_kIyKOsvNY-WCjADs',
  appId: '1:903664649042:web:7c006f9682e251c300f08b',
  authDomain: 'melbournecleaning-52d44.firebaseapp.com',
  messagingSenderId: '903664649042',
  projectId: 'melbournecleaning-52d44',
  storageBucket: 'melbournecleaning-52d44.firebasestorage.app',
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = (() => {
  try {
    return initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return getAuth(firebaseApp);
  }
})();

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
