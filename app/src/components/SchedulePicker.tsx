import { useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { colors } from '../theme';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const startTimes = Array.from({ length: 25 }, (_, index) => {
  const totalMinutes = 8 * 60 + index * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
});

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatTime(time: string) {
  if (!time) return 'Select a start time';
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date(2020, 0, 1, hours, minutes);
  return date.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' });
}

export function SchedulePicker({
  preferredDate,
  preferredTime,
  onChange,
}: {
  preferredDate: string;
  preferredTime: string;
  onChange: (date: string, time: string) => void;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [timeModalVisible, setTimeModalVisible] = useState(false);

  const monthLabel = viewMonth.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
  const canGoPrevious =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() && viewMonth.getMonth() > today.getMonth());

  const calendarCells = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startPadding = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: Array<Date | null> = Array.from({ length: startPadding }, () => null);
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(year, month, day));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewMonth]);

  const selectedDateLabel = preferredDate
    ? new Date(`${preferredDate}T12:00:00`).toLocaleDateString('en-AU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'No date selected yet';
  const selectedDate = preferredDate ? new Date(`${preferredDate}T12:00:00`) : null;
  const isWeekend = selectedDate ? selectedDate.getDay() === 0 || selectedDate.getDay() === 6 : false;
  const availableStartTimes = isWeekend
    ? startTimes.filter((time) => time <= '18:00')
    : startTimes;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Pick a date</Text>
        <Text style={styles.subtitle}>Choose your preferred cleaning date and an exact start time.</Text>
      </View>

      <View style={styles.calendar}>
        <View style={styles.monthHeader}>
          <TouchableOpacity
            accessibilityLabel="Previous month"
            disabled={!canGoPrevious}
            style={[styles.monthButton, !canGoPrevious && styles.disabled]}
            onPress={() => setViewMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
          >
            <Text style={styles.monthArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthLabel}>{monthLabel}</Text>
          <TouchableOpacity
            accessibilityLabel="Next month"
            style={styles.monthButton}
            onPress={() => setViewMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
          >
            <Text style={styles.monthArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekRow}>
          {weekdays.map((weekday) => <Text key={weekday} style={styles.weekday}>{weekday}</Text>)}
        </View>
        <View style={styles.dayGrid}>
          {calendarCells.map((date, index) => {
            if (!date) return <View key={`empty-${index}`} style={styles.dayCell} />;
            const key = toDateKey(date);
            const isDisabled = date < today;
            const isSelected = preferredDate === key;
            const isToday = key === toDateKey(today);
            return (
              <View key={key} style={styles.dayCell}>
                <TouchableOpacity
                  disabled={isDisabled}
                  style={[
                    styles.dayButton,
                    isToday && styles.today,
                    isSelected && styles.selectedDay,
                    isDisabled && styles.disabledDay,
                  ]}
                  onPress={() => {
                    const weekend = date.getDay() === 0 || date.getDay() === 6;
                    const existingTimeIsValid =
                      preferredTime && (!weekend || preferredTime <= '18:00');
                    onChange(key, existingTimeIsValid ? preferredTime : '09:00');
                  }}
                >
                  <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{date.getDate()}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.selectedCard}>
        <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
          <Rect x={3} y={5} width={18} height={16} rx={2} stroke={colors.primary} strokeWidth={1.8} />
          <Path d="M3 10h18M8 3v4M16 3v4" stroke={colors.primary} strokeWidth={1.8} strokeLinecap="round" />
        </Svg>
        <View style={styles.selectedCopy}>
          <Text style={styles.selectedLabel}>Selected date & start time</Text>
          <Text style={styles.selectedValue}>
            {preferredDate ? `${selectedDateLabel} · ${formatTime(preferredTime)}` : selectedDateLabel}
          </Text>
        </View>
      </View>

      <View style={styles.timeCard}>
        <Text style={styles.timeTitle}>Preferred start time</Text>
        <TouchableOpacity
          disabled={!preferredDate}
          style={[styles.timeSelect, !preferredDate && styles.disabled]}
          onPress={() => setTimeModalVisible(true)}
        >
          <Text style={[styles.timeSelectText, !preferredTime && styles.placeholder]}>
            {formatTime(preferredTime)}
          </Text>
          <Text style={styles.chevron}>⌄</Text>
        </TouchableOpacity>
        <Text style={styles.hint}>
          {preferredDate
            ? isWeekend
              ? 'Weekend times are available from 8:00 AM to 6:00 PM, every 30 minutes.'
              : 'Weekday times are available from 8:00 AM to 8:00 PM, every 30 minutes.'
            : 'Select a date first to choose a start time.'}
        </Text>
      </View>

      <Text style={styles.note}>Selecting a date and time does not confirm a booking. Our team will confirm the final appointment.</Text>

      <Modal visible={timeModalVisible} transparent animationType="slide" onRequestClose={() => setTimeModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select start time</Text>
              <TouchableOpacity onPress={() => setTimeModalVisible(false)}><Text style={styles.close}>Close</Text></TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.timeOptions}>
              {availableStartTimes.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[styles.timeOption, preferredTime === time && styles.timeOptionSelected]}
                  onPress={() => {
                    onChange(preferredDate, time);
                    setTimeModalVisible(false);
                  }}
                >
                  <Text style={[styles.timeOptionText, preferredTime === time && styles.timeOptionTextSelected]}>
                    {formatTime(time)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 14 },
  header: { alignItems: 'center' },
  title: { color: colors.text, fontSize: 21, fontWeight: '800' },
  subtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: 4, textAlign: 'center' },
  calendar: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 16, borderWidth: 1, padding: 12 },
  monthHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  monthButton: { alignItems: 'center', borderColor: colors.border, borderRadius: 10, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 },
  monthArrow: { color: colors.text, fontSize: 29, lineHeight: 31 },
  monthLabel: { color: colors.text, fontSize: 17, fontWeight: '800' },
  weekRow: { flexDirection: 'row', marginBottom: 5 },
  weekday: { color: colors.textMuted, fontSize: 10, fontWeight: '800', textAlign: 'center', textTransform: 'uppercase', width: '14.2857%' },
  dayGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { aspectRatio: 1, padding: 2, width: '14.2857%' },
  dayButton: { alignItems: 'center', backgroundColor: colors.surfaceMuted, borderColor: 'transparent', borderRadius: 9, borderWidth: 1, flex: 1, justifyContent: 'center' },
  today: { borderColor: colors.border },
  selectedDay: { backgroundColor: colors.primary, borderColor: colors.primary },
  disabledDay: { backgroundColor: 'transparent', opacity: 0.28 },
  dayText: { color: colors.text, fontSize: 13, fontWeight: '700' },
  selectedDayText: { color: '#fff' },
  selectedCard: { alignItems: 'flex-start', backgroundColor: '#fff', borderColor: colors.border, borderRadius: 14, borderWidth: 1, flexDirection: 'row', gap: 10, padding: 14 },
  selectedCopy: { flex: 1 },
  selectedLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 0.5, textTransform: 'uppercase' },
  selectedValue: { color: colors.text, fontSize: 14, fontWeight: '700', lineHeight: 20, marginTop: 3 },
  timeCard: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 14, borderWidth: 1, padding: 14 },
  timeTitle: { color: colors.text, fontSize: 14, fontWeight: '800', marginBottom: 8 },
  timeSelect: { alignItems: 'center', backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderRadius: 11, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 13, paddingVertical: 13 },
  timeSelectText: { color: colors.text, fontSize: 15, fontWeight: '600' },
  placeholder: { color: colors.textMuted },
  chevron: { color: colors.textMuted, fontSize: 20 },
  hint: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: 7 },
  note: { color: colors.textMuted, fontSize: 12, lineHeight: 18, textAlign: 'center' },
  disabled: { opacity: 0.38 },
  modalOverlay: { backgroundColor: 'rgba(0,0,0,0.35)', flex: 1, justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22, maxHeight: '72%', paddingBottom: 24 },
  modalHeader: { alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 18 },
  modalTitle: { color: colors.text, fontSize: 19, fontWeight: '800' },
  close: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  timeOptions: { gap: 8, padding: 16 },
  timeOption: { alignItems: 'center', backgroundColor: colors.surfaceMuted, borderRadius: 11, paddingVertical: 13 },
  timeOptionSelected: { backgroundColor: colors.primary },
  timeOptionText: { color: colors.text, fontSize: 15, fontWeight: '700' },
  timeOptionTextSelected: { color: '#fff' },
});
