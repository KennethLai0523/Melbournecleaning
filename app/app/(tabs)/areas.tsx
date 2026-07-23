import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { WebView } from 'react-native-webview';
import { CONTACT_DETAILS } from '../../src/config/contact';
import { getServiceAreaPins, serviceAreas } from '../../src/data/serviceAreas';
import { colors } from '../../src/theme';
import { openExternal } from '../../src/utils/links';

const mapPins = getServiceAreaPins();
const leafletHtml = `<!doctype html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  <style>
    html,body,#map{height:100%;width:100%;margin:0;background:#f3f3f3}
    .leaflet-popup-content{font:600 14px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    .leaflet-control-attribution{font-size:9px}
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const pins = ${JSON.stringify(mapPins)};
    const map = L.map('map', { zoomControl: true }).setView([-37.84, 144.97], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);
    const markerIcon = L.divIcon({
      className: '',
      html: '<div style="width:18px;height:18px;border-radius:50% 50% 50% 0;background:#C8102E;border:2px solid white;box-shadow:0 2px 5px rgba(0,0,0,.3);transform:rotate(-45deg)"></div>',
      iconSize: [18,18],
      iconAnchor: [9,18]
    });
    const bounds = [];
    pins.forEach(pin => {
      L.marker([pin.lat, pin.lng], { icon: markerIcon }).addTo(map).bindPopup(pin.name);
      bounds.push([pin.lat, pin.lng]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [18,18] });
  </script>
</body>
</html>`;

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
      <View style={styles.mapCard}>
        <Text style={styles.cardTitle}>Areas on the map</Text>
        <Text style={styles.mapHint}>Pinch to zoom and tap a marker to view the suburb.</Text>
        <View style={styles.mapFrame}>
          <WebView
            source={{ html: leafletHtml }}
            originWhitelist={['*']}
            javaScriptEnabled
            domStorageEnabled
            nestedScrollEnabled
            style={styles.map}
          />
        </View>
        <Text style={styles.mapNetworkHint}>Map tiles require an internet connection.</Text>
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
  mapCard: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 18, borderWidth: 1, gap: 8, padding: 14 },
  mapFrame: { borderRadius: 13, height: 340, overflow: 'hidden' },
  map: { backgroundColor: '#f1f1f1', flex: 1 },
  mapHint: { color: colors.textMuted, fontSize: 13, lineHeight: 18 },
  mapNetworkHint: { color: colors.textMuted, fontSize: 11, textAlign: 'center' },
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
