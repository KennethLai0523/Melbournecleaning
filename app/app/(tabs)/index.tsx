import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { CONTACT_DETAILS } from '../../src/config/contact';
import { colors } from '../../src/theme';
import { openExternal } from '../../src/utils/links';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const trustPoints = [
  { icon: 'home', title: 'Residential cleaning across Melbourne', description: 'Cleaning for apartments, units, townhouses and family homes.' },
  { icon: 'pricing', title: 'Item-by-item pricing', description: 'Choose the cleaning items you need and see a clear estimated total.' },
  { icon: 'booking', title: '$0 booking fee', description: 'Cleaning services available from as low as $80.' },
  { icon: 'calendar', title: 'Flexible scheduling', description: 'One-time, weekly, fortnightly and monthly cleaning options.' },
  { icon: 'coverage', title: 'Melbourne-wide service coverage', description: 'Serving Melbourne CBD, inner city and surrounding suburbs.' },
];

const quoteSteps = [
  { title: 'Choose property type', subtitle: 'Tell us what kind of home needs cleaning.' },
  { title: 'Build your summary', subtitle: 'Select the cleaning details you need.' },
  { title: 'Pick a date', subtitle: 'Choose your preferred day and start time.' },
  { title: 'Contact us', subtitle: 'Send your quote to our Melbourne team.' },
];

function BenefitIcon({ name }: { name: string }) {
  const line = { stroke: colors.primary, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  return (
    <Svg width={25} height={25} viewBox="0 0 24 24" fill="none">
      {name === 'home' ? (
        <><Path d="M3 10.5 12 3l9 7.5" {...line} /><Path d="M5 9.5V20h14V9.5M10 20v-6h4v6" {...line} /></>
      ) : name === 'pricing' ? (
        <Path d="M12 2v20M17 6.5c0-2-2-3.5-5-3.5S7 4.5 7 6.5 9 9 12 9s5 1 5 3-2 3.5-5 3.5-5-1.5-5-3.5" {...line} />
      ) : name === 'booking' ? (
        <><Rect x={5} y={3} width={14} height={18} rx={1.5} {...line} /><Path d="M9 8h6M9 12h4" {...line} /><Circle cx={15.5} cy={16.5} r={4.5} {...line} /><Path d="M13 14l5 5" {...line} /></>
      ) : name === 'calendar' ? (
        <><Rect x={3} y={5} width={18} height={16} rx={2} {...line} /><Path d="M3 10h18M8 3v4M16 3v4M8 14h2M12 14h2M16 14h.01M8 17h2M12 17h2" {...line} /></>
      ) : (
        <><Path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" {...line} /><Circle cx={12} cy={10} r={2.5} {...line} /></>
      )}
    </Svg>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [heroTop, setHeroTop] = useState(0);
  const [timelineOffset, setTimelineOffset] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(700);
  const timelineTop = heroTop + timelineOffset;
  const timelineProgress = scrollY.interpolate({
    inputRange: [
      Math.max(0, timelineTop - viewportHeight * 0.7),
      Math.max(1, timelineTop + quoteSteps.length * 104 - viewportHeight * 0.45),
    ],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      onLayout={(event) => setViewportHeight(event.nativeEvent.layout.height)}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
      )}
      scrollEventThrottle={16}
    >
      <View style={styles.heroCard} onLayout={(event) => setHeroTop(event.nativeEvent.layout.y)}>
        <Text style={styles.title}>Professional cleaning for Melbourne homes</Text>
        <Text style={styles.copy}>Serving Melbourne and surrounding suburbs.</Text>

        <View style={styles.heroImageRow}>
          <Image
            source={require('../../assets/images/hero/hero1.jpeg')}
            style={styles.heroImage}
            resizeMode="cover"
            accessibilityLabel="Melbourne Cleaning service"
          />
          <Image
            source={require('../../assets/images/hero/hero2.jpeg')}
            style={styles.heroImage}
            resizeMode="cover"
            accessibilityLabel="Melbourne Cleaning service"
          />
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => openExternal(CONTACT_DETAILS.whatsappUrl)}
          >
            <Text style={styles.primaryButtonText}>WhatsApp Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/quote')}
          >
            <Text style={styles.secondaryButtonText}>Build Your Quote</Text>
          </TouchableOpacity>
        </View>

        <View
          style={styles.quoteTimeline}
          onLayout={(event) => setTimelineOffset(event.nativeEvent.layout.y)}
        >
          <Text style={styles.timelineTitle}>How your quote works</Text>
          <View style={styles.timelineTrack} pointerEvents="none">
            <Animated.View
              style={[
                styles.timelineProgress,
                { transform: [{ scaleY: timelineProgress }] },
              ]}
            />
          </View>
          {quoteSteps.map((step, index) => (
            <Animated.View
              key={step.title}
              style={[
                styles.timelineStep,
                {
                  opacity: scrollY.interpolate({
                    inputRange: [
                      Math.max(0, timelineTop + index * 104 - viewportHeight * 0.8),
                      Math.max(1, timelineTop + index * 104 - viewportHeight * 0.58),
                    ],
                    outputRange: [0.35, 1],
                    extrapolate: 'clamp',
                  }),
                  transform: [{
                    translateY: scrollY.interpolate({
                      inputRange: [
                        Math.max(0, timelineTop + index * 104 - viewportHeight * 0.8),
                        Math.max(1, timelineTop + index * 104 - viewportHeight * 0.58),
                      ],
                      outputRange: [18, 0],
                      extrapolate: 'clamp',
                    }),
                  }],
                },
              ]}
            >
              <View style={styles.timelineMarkerColumn}>
                <View style={styles.timelineMarker}>
                  <Text style={styles.timelineNumber}>{index + 1}</Text>
                </View>
              </View>
              <View style={styles.timelineCopy}>
                <Text style={styles.timelineStepTitle}>{step.title}</Text>
                <Text style={styles.timelineSubtitle}>{step.subtitle}</Text>
              </View>
            </Animated.View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.rowLabel}>Phone</Text>
        <Text style={styles.rowValue}>{CONTACT_DETAILS.phoneDisplay}</Text>
        <Text style={styles.rowLabel}>Email</Text>
        <Text style={styles.rowValue}>{CONTACT_DETAILS.email}</Text>
        <Text style={styles.rowLabel}>Website</Text>
        <Text style={styles.rowValue}>{CONTACT_DETAILS.websiteUrl}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Why people choose us</Text>
        {trustPoints.map((point) => (
          <View key={point.title} style={styles.pointRow}>
            <View style={styles.pointIcon}><BenefitIcon name={point.icon} /></View>
            <View style={styles.pointCopy}>
              <Text style={styles.pointTitle}>{point.title}</Text>
              <Text style={styles.pointText}>{point.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Business hours</Text>
        <Text style={styles.rowValue}>{CONTACT_DETAILS.hours.weekdays}</Text>
        <Text style={styles.rowValue}>{CONTACT_DETAILS.hours.saturday}</Text>
        <Text style={styles.rowValue}>{CONTACT_DETAILS.hours.sunday}</Text>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 16 },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  title: { fontSize: 30, lineHeight: 36, fontWeight: '800', color: colors.text, marginBottom: 8 },
  copy: { color: colors.textMuted, fontSize: 16, lineHeight: 24, marginBottom: 16 },
  heroImageRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  heroImage: { aspectRatio: 3 / 4, borderRadius: 14, flex: 1 },
  actionRow: { gap: 12 },
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButton: { backgroundColor: colors.whatsapp },
  secondaryButton: { backgroundColor: colors.primary },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  secondaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  quoteTimeline: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    marginTop: 20,
    paddingTop: 18,
  },
  timelineTitle: { color: colors.text, fontSize: 17, fontWeight: '800', marginBottom: 14 },
  timelineTrack: {
    backgroundColor: colors.border,
    bottom: 52,
    left: 13,
    position: 'absolute',
    top: 62,
    width: 2,
  },
  timelineProgress: {
    backgroundColor: colors.primary,
    height: '100%',
    transformOrigin: 'top',
    width: 2,
  },
  timelineStep: { flexDirection: 'row', minHeight: 104 },
  timelineMarkerColumn: { alignItems: 'center', marginRight: 12, width: 28 },
  timelineMarker: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  timelineNumber: { color: '#fff', fontSize: 13, fontWeight: '800' },
  timelineCopy: { flex: 1, paddingBottom: 38 },
  timelineStepTitle: { color: colors.text, fontSize: 15, fontWeight: '800', lineHeight: 20 },
  timelineSubtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 18, marginTop: 2 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
  },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 12 },
  rowLabel: { color: colors.textMuted, fontSize: 13, marginTop: 8 },
  rowValue: { color: colors.text, fontSize: 15, lineHeight: 22 },
  pointRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 12, marginBottom: 16 },
  pointIcon: { alignItems: 'center', backgroundColor: '#fff6f8', borderRadius: 12, height: 44, justifyContent: 'center', width: 44 },
  pointCopy: { flex: 1 },
  pointTitle: { color: colors.text, fontSize: 15, fontWeight: '800', lineHeight: 20 },
  pointText: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: 3 },
});
