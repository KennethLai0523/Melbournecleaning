import { useMemo, useState } from 'react';
import {
  formatStartTimeLabel,
  START_TIME_OPTIONS,
  type QuoteFormState,
} from '../../types/quote';
import { CleaningIcon } from '../icons/CleaningIcon';
import styles from './DatePickerSection.module.css';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface DatePickerSectionProps {
  preferredDate: string;
  preferredTime: string;
  onChange: (partial: Pick<QuoteFormState['quote'], 'preferredDate' | 'preferredTime'>) => void;
}

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function DatePickerSection({ preferredDate, preferredTime, onChange }: DatePickerSectionProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const monthLabel = viewMonth.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });

  const days = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startPad = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: { key: string; date: Date | null; disabled: boolean; isToday: boolean }[] = [];

    for (let i = 0; i < startPad; i += 1) {
      cells.push({ key: `pad-${i}`, date: null, disabled: true, isToday: false });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month, day);
      const key = toDateKey(date);
      cells.push({
        key,
        date,
        disabled: date < today,
        isToday: key === toDateKey(today),
      });
    }

    return cells;
  }, [viewMonth, today]);

  const selectedLabel = preferredDate
    ? new Date(`${preferredDate}T12:00:00`).toLocaleDateString('en-AU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const goPrev = () => {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goNext = () => {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const canGoPrev =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() && viewMonth.getMonth() > today.getMonth());

  return (
    <section
      id="pick-a-date"
      className={`section section--grey ${styles.section}`}
      aria-labelledby="pick-date-heading"
      data-journey-step="2"
    >
      <div className={styles.header}>
        <span className="section-label">Step 3 · Schedule</span>
        <h2 id="pick-date-heading">Pick a date</h2>
        <p>Choose your preferred cleaning date and an exact start time. We will confirm availability with you.</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.calendar}>
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="Previous month"
            >
              ‹
            </button>
            <h3 className={styles.monthLabel}>{monthLabel}</h3>
            <button type="button" className={styles.navBtn} onClick={goNext} aria-label="Next month">
              ›
            </button>
          </div>

          <div className={styles.weekdays} aria-hidden="true">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className={styles.grid} role="grid" aria-label={`Calendar for ${monthLabel}`}>
            {days.map((cell) => {
              if (!cell.date) {
                return <span key={cell.key} className={styles.emptyCell} />;
              }
              const key = toDateKey(cell.date);
              const selected = preferredDate === key;
              return (
                <button
                  key={cell.key}
                  type="button"
                  role="gridcell"
                  className={[
                    styles.day,
                    cell.disabled ? styles.dayDisabled : '',
                    selected ? styles.daySelected : '',
                    cell.isToday ? styles.dayToday : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  disabled={cell.disabled}
                  aria-pressed={selected}
                  aria-label={cell.date.toLocaleDateString('en-AU', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                  onClick={() =>
                    onChange({
                      preferredDate: key,
                      preferredTime: preferredTime || '09:00',
                    })
                  }
                >
                  {cell.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.side}>
          <div className={styles.selectedCard}>
            <CleaningIcon name="calendar" size={22} />
            <div>
              <p className={styles.selectedLabel}>Selected date & start time</p>
              <p className={styles.selectedValue}>
                {selectedLabel
                  ? `${selectedLabel}${preferredTime ? ` · ${formatStartTimeLabel(preferredTime)}` : ''}`
                  : 'No date selected yet'}
              </p>
            </div>
          </div>

          <div className={styles.timeFieldset}>
            <label htmlFor="start-time" className={styles.timeLegend}>
              Preferred start time
            </label>
            <select
              id="start-time"
              className={`form-select ${styles.timeSelect}`}
              value={preferredTime}
              disabled={!preferredDate}
              onChange={(e) =>
                onChange({
                  preferredDate,
                  preferredTime: e.target.value,
                })
              }
            >
              <option value="">Select a start time</option>
              {START_TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {formatStartTimeLabel(time)}
                </option>
              ))}
            </select>
            {!preferredDate ? (
              <p className={styles.timeHintText}>Select a date first to choose a start time.</p>
            ) : (
              <p className={styles.timeHintText}>Times available from 8:00 AM to 8:00 PM, every 30 minutes.</p>
            )}
          </div>

          <p className={styles.note}>
            Selecting a date and time does not confirm a booking. Our team will confirm the final appointment.
          </p>
        </div>
      </div>
    </section>
  );
}
