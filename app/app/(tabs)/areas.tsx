import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { CONTACT_DETAILS } from '../../src/config/contact';
import { colors } from '../../src/theme';
import { openExternal } from '../../src/utils/links';

const serviceAreas = [
  { name: 'Melbourne CBD and Inner City', suburbs: ['Melbourne CBD', 'Southbank', 'Docklands', 'Carlton', 'Fitzroy', 'Collingwood', 'Richmond', 'South Yarra', 'Prahran', 'St Kilda'] },
  { name: 'Northern Suburbs', suburbs: ['Brunswick', 'Coburg', 'Preston', 'Thornbury', 'Northcote', 'Reservoir', 'Bundoora', 'Epping', 'Craigieburn', 'Broadmeadows'] },
  { name: 'Eastern Suburbs', suburbs: ['Hawthorn', 'Camberwell', 'Box Hill', 'Doncaster', 'Ringwood', 'Blackburn', 'Mitcham', 'Vermont', 'Balwyn', 'Kew'] },
  { name: 'South-Eastern Suburbs', suburbs: ['Caulfield', 'Oakleigh', 'Clayton', 'Glen Waverley', 'Mount Waverley', 'Dandenong', 'Springvale', 'Noble Park', 'Bentleigh', 'Carnegie'] },
  { name: 'Western Suburbs', suburbs: ['Footscray', 'Sunshine', 'Williamstown', 'Altona', 'Werribee', 'Point Cook', 'Hoppers Crossing', 'Deer Park', 'St Albans', 'Keilor'] },
  { name: 'Bayside Areas', suburbs: ['Brighton', 'Sandringham', 'Hampton', 'Beaumaris', 'Black Rock', 'Mordialloc', 'Cheltenham', 'Mentone', 'Parkdale', 'Elwood'] },
];

function MapPin() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" stroke={colors.primary} strokeWidth={1.8} />
      <Circle cx={12} cy={10} r={2.5} stroke={colors.primary} strokeWidth={1.8} />
    </Svg>
  );
}

export default function AreasScreen() {
  const [suburb, setSuburb] = useState('');
  const checkSuburb = () => {
    const message = `Hi Melbourne Cleaning Group, do you service ${suburb.trim()}?`;
    void openExternal(`${CONTACT_DETAILS.whatsappUrl}?text=${encodeURIComponent(message)}`);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Area We Clean</Text>
      <Text style={styles.subtitle}>Melbourne Cleaning Group services Melbourne CBD, inner city and surrounding suburbs.</Text>
      <View style={styles.checkCard}>
        <Text style={styles.cardTitle}>Check Your Suburb</Text>
        <Text style={styles.body}>Enter your suburb to enquire about service availability via WhatsApp.</Text>
        <TextInput style={styles.input} placeholder="e.g. South Yarra" placeholderTextColor={colors.textMuted} value={suburb} onChangeText={setSuburb} />
        <TouchableOpacity style={[styles.button, !suburb.trim() && styles.disabled]} disabled={!suburb.trim()} onPress={checkSuburb}>
          <Text style={styles.buttonText}>Check via WhatsApp</Text>
        </TouchableOpacity>
      </View>
      {serviceAreas.map((group) => (
        <View key={group.name} style={styles.card}>
          <View style={styles.cardHeading}><MapPin /><Text style={styles.cardTitle}>{group.name}</Text></View>
          <View style={styles.suburbGrid}>
            {group.suburbs.map((suburbName) => <Text key={suburbName} style={styles.suburb}>{suburbName}</Text>)}
          </View>
        </View>
      ))}
      <Text style={styles.disclaimer}>Service availability may vary depending on the location, cleaning type and requested appointment time. Contact our team to confirm availability.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
  content: { gap: 14, padding: 20, paddingBottom: 40 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
  checkCard: { backgroundColor: '#fff6f8', borderColor: '#f3c5cf', borderRadius: 18, borderWidth: 1, gap: 12, padding: 18 },
  card: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 18, borderWidth: 1, padding: 18 },
  cardHeading: { alignItems: 'center', flexDirection: 'row', gap: 8, marginBottom: 12 },
  cardTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  body: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  input: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.text, fontSize: 16, paddingHorizontal: 14, paddingVertical: 13 },
  button: { alignItems: 'center', backgroundColor: colors.whatsapp, borderRadius: 12, paddingVertical: 14 },
  buttonText: { color: '#fff', fontWeight: '800' },
  disabled: { opacity: 0.45 },
  suburbGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  suburb: { color: colors.textMuted, fontSize: 14, lineHeight: 24, width: '50%' },
  disclaimer: { color: colors.textMuted, fontSize: 13, lineHeight: 19, textAlign: 'center' },
});
