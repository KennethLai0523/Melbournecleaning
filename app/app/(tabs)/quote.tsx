import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { openExternal } from '../../src/utils/links';
import { CONTACT_DETAILS } from '../../src/config/contact';
import {
  calculateQuoteTotal,
  cleaningItems,
  defaultQuoteState,
  formatCurrency,
  frequencyOptions,
  propertyTypes,
  type QuoteState,
} from '../../src/data/quote';
import { buildQuoteMessage } from '../../src/utils/buildQuoteMessage';
import { colors } from '../../src/theme';
import { useAuth } from '../../src/auth/AuthContext';
import { CleaningItemIcon } from '../../src/components/CleaningItemIcon';

function Counter({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <View style={styles.counterCard}>
      <Text style={styles.counterLabel}>{label}</Text>
      <View style={styles.counterRow}>
        <TouchableOpacity style={styles.counterButton} onPress={() => onChange(Math.max(0, value - 1))}>
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{value}</Text>
        <TouchableOpacity style={styles.counterButton} onPress={() => onChange(value + 1)}>
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function QuoteScreen() {
  const [state, setState] = useState<QuoteState>(defaultQuoteState);
  const [showAll, setShowAll] = useState(false);
  const { profile } = useAuth();
  const total = useMemo(() => calculateQuoteTotal(state.items), [state.items]);
  const hasSavedProperty = profile?.role === 'customer' && Boolean(profile.property);
  const visibleItems = useMemo(
    () => cleaningItems.filter((item) => showAll || item.defaultVisible || (state.items[item.id] ?? 0) > 0),
    [showAll, state.items],
  );

  useEffect(() => {
    if (profile?.role !== 'customer' || !profile.property) return;
    const saved = profile.property;
    setState((current) => ({
      ...current,
      propertyType: saved.propertyType,
      bedrooms: saved.bedrooms,
      bathrooms: saved.bathrooms,
      toilets: saved.toilets,
      livingRooms: saved.livingRooms,
      kitchens: saved.kitchens,
    }));
  }, [profile]);

  const updateItems = (id: string, value: number) => {
    setState((prev) => ({
      ...prev,
      items: {
        ...prev.items,
        [id]: Math.max(0, value),
      },
    }));
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Quote</Text>
      <Text style={styles.subtitle}>
        Property details are informational only. Total is based only on the cleaning items you select.
      </Text>

      {hasSavedProperty ? (
        <View style={styles.savedCard}>
          <Text style={styles.sectionTitle}>Saved property</Text>
          <Text style={styles.savedAddress}>{profile?.property?.address}</Text>
          <Text style={styles.summaryLine}>
            {state.propertyType} · {state.bedrooms} bed · {state.bathrooms} bath · {state.toilets} toilet
          </Text>
          <Text style={styles.savedHint}>Loaded from your customer profile.</Text>
        </View>
      ) : (
      <>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Property type</Text>
        <View style={styles.chipWrap}>
          {propertyTypes.map((type) => {
            const active = state.propertyType === type.value;
            return (
              <TouchableOpacity
                key={type.value}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setState((prev) => ({ ...prev, propertyType: type.value }))}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{type.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Property details</Text>
        <View style={styles.counterGrid}>
          <Counter label="Bedrooms" value={state.bedrooms} onChange={(value) => setState((prev) => ({ ...prev, bedrooms: value }))} />
          <Counter label="Bathrooms" value={state.bathrooms} onChange={(value) => setState((prev) => ({ ...prev, bathrooms: value }))} />
          <Counter label="Toilets" value={state.toilets} onChange={(value) => setState((prev) => ({ ...prev, toilets: value }))} />
          <Counter label="Living rooms" value={state.livingRooms} onChange={(value) => setState((prev) => ({ ...prev, livingRooms: value }))} />
          <Counter label="Kitchens" value={state.kitchens} onChange={(value) => setState((prev) => ({ ...prev, kitchens: value }))} />
        </View>
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Frequency</Text>
        <View style={styles.chipWrap}>
          {frequencyOptions.map((option) => {
            const active = state.frequency === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setState((prev) => ({ ...prev, frequency: option.value }))}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{option.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      </>
      )}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Cleaning details</Text>
        {visibleItems.map((item) => {
          const qty = state.items[item.id] ?? 0;
          const active = qty > 0;
          return (
            <View key={item.id} style={styles.itemRow}>
              <View style={[styles.itemIcon, active && styles.itemIconActive]}>
                <CleaningItemIcon name={item.icon} active={active} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{item.label}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
              </View>
              {item.type === 'toggle' ? (
                <TouchableOpacity
                  style={[styles.toggleButton, active && styles.toggleButtonActive]}
                  onPress={() => updateItems(item.id, active ? 0 : 1)}
                >
                  <Text style={[styles.toggleButtonText, active && styles.toggleButtonTextActive]}>
                    {active ? 'Added' : 'Add'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.counterInline}>
                  <TouchableOpacity style={styles.counterButton} onPress={() => updateItems(item.id, qty - 1)}>
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{qty}</Text>
                  <TouchableOpacity style={styles.counterButton} onPress={() => updateItems(item.id, Math.min(item.maxQuantity ?? 99, qty + 1))}>
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
        <TouchableOpacity style={styles.moreButton} onPress={() => setShowAll((current) => !current)}>
          <Text style={styles.moreButtonText}>{showAll ? 'Show essentials only' : 'Show all cleaning options'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summaryLine}>Property type: {state.propertyType}</Text>
        <Text style={styles.summaryLine}>Frequency: {state.frequency}</Text>
        <Text style={styles.totalLabel}>Estimated total</Text>
        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton, total <= 0 && styles.buttonDisabled]}
          disabled={total <= 0}
          onPress={() =>
            openExternal(
              `${CONTACT_DETAILS.whatsappUrl}?text=${encodeURIComponent(buildQuoteMessage(state))}`,
            )
          }
        >
          <Text style={styles.primaryButtonText}>Send Quote on WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 16 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 18,
  },
  savedCard: {
    backgroundColor: '#fff6f8',
    borderColor: '#f3c5cf',
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  savedAddress: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 5 },
  savedHint: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 7 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 12 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.surfaceMuted,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  counterGrid: { gap: 12 },
  counterCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    backgroundColor: colors.surfaceMuted,
  },
  counterLabel: { color: colors.textMuted, fontSize: 13, marginBottom: 10 },
  counterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  counterInline: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  counterButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: { color: colors.text, fontSize: 18, fontWeight: '700' },
  counterValue: { minWidth: 18, textAlign: 'center', color: colors.text, fontWeight: '700', fontSize: 16 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  itemDescription: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: 3 },
  itemPrice: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  itemIcon: {
    alignItems: 'center',
    backgroundColor: '#fff6f8',
    borderRadius: 12,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  itemIconActive: { backgroundColor: colors.primary },
  toggleButton: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  toggleButtonActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  toggleButtonText: { color: colors.text, fontWeight: '700' },
  toggleButtonTextActive: { color: '#fff' },
  summaryCard: {
    backgroundColor: '#fff6f8',
    borderWidth: 1,
    borderColor: '#f3c5cf',
    borderRadius: 18,
    padding: 18,
  },
  summaryLine: { color: colors.textMuted, fontSize: 14, lineHeight: 21, marginBottom: 4 },
  totalLabel: { marginTop: 12, color: colors.textMuted, fontSize: 13 },
  totalValue: { color: colors.primary, fontSize: 30, fontWeight: '800', marginTop: 4, marginBottom: 14 },
  button: { borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  primaryButton: { backgroundColor: colors.whatsapp },
  primaryButtonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  buttonDisabled: { opacity: 0.55 },
  moreButton: { alignItems: 'center', borderColor: colors.primary, borderRadius: 12, borderWidth: 1, marginTop: 16, paddingVertical: 12 },
  moreButtonText: { color: colors.primary, fontWeight: '800' },
});
