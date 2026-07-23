import { useEffect } from 'react';
import { Stack, type ErrorBoundaryProps } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthProvider } from '../src/auth/AuthContext';

function logStartup(message: string, error?: unknown) {
  if (!__DEV__) {
    return;
  }

  if (error) {
    console.error(`[startup] ${message}`, error);
  } else {
    console.info(`[startup] ${message}`);
  }
}

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  useEffect(() => {
    logStartup('startup error', error);
    void SplashScreen.hideAsync().catch(() => undefined);
  }, [error]);

  return (
    <View style={styles.errorScreen}>
      <Text style={styles.errorTitle}>Unable to start Melbourne Cleaning</Text>
      <Text style={styles.errorMessage}>
        {__DEV__ ? error.message : 'Please try again.'}
      </Text>
      <TouchableOpacity accessibilityRole="button" style={styles.retryButton} onPress={retry}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function RootLayout() {
  useEffect(() => {
    logStartup('root layout mounted');
    logStartup('router mounted');
    logStartup('app ready');

    void SplashScreen.hideAsync()
      .then(() => logStartup('splash hidden'))
      .catch((error: unknown) => logStartup('splash hide skipped', error));
  }, []);

  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="job-market"
          options={{ title: 'Job Market', presentation: 'modal' }}
        />
      </Stack>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  errorScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  errorTitle: {
    color: '#222222',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  errorMessage: {
    color: '#5F6368',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#C8102E',
    borderRadius: 14,
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
