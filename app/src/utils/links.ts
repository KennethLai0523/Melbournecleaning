import { Alert, Linking } from 'react-native';

export async function openExternal(url: string) {
  const supported = await Linking.canOpenURL(url);
  if (!supported) {
    Alert.alert('Unable to open link', url);
    return;
  }
  await Linking.openURL(url);
}
