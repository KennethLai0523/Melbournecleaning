import { businessConfig } from '../../config/businessConfig';
import { getPropertyTypeById } from '../../data/pricing';
import { formatStartTimeLabel, type QuoteBreakdown, type QuoteFormState } from '../../types/quote';
import {
  formatLineItemSummary,
  getFrequencyLabel,
  getLineItemLabel,
} from '../../utils/calculateQuote';
import { buildQuoteWhatsAppUrl, canSendWhatsAppQuote } from '../../utils/buildWhatsAppQuote';
import { formatCurrency } from '../../utils/formatCurrency';
import { Icon } from '../ui/Icon';
import styles from './QuoteSummary.module.css';

interface QuoteSummaryProps {
  state: QuoteFormState;
  breakdown: QuoteBreakdown;
  summaryId?: string;
}

function formatPreferredDate(dateKey: string): string {
  if (!dateKey) return '—';
  const date = new Date(`${dateKey}T12:00:00`);
  if (Number.isNaN(date.getTime())) return dateKey;
  return date.toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function QuoteSummary({ state, breakdown, summaryId = 'quote-summary' }: QuoteSummaryProps) {
  const propertyType = getPropertyTypeById(state.property.propertyType);
  const canSend = canSendWhatsAppQuote(breakdown);
  const whatsAppUrl = buildQuoteWhatsAppUrl(state, breakdown);

  return (
    <aside className={styles.summary} id={summaryId} aria-labelledby={`${summaryId}-heading`}>
      <h3 id={`${summaryId}-heading`} className={styles.heading}>
        Summary
      </h3>

      <div className={styles.recordSection}>
        <h4 className={styles.subheading}>Property information</h4>
        <p className={styles.recordLabel}>For our cleaning record</p>
        <div className={styles.propertyGrid}>
          <div className={styles.propertyCell}>
            <span className={styles.propertyKey}>Property type</span>
            <span className={styles.propertyVal}>{propertyType?.name ?? '—'}</span>
          </div>
          <div className={styles.propertyCell}>
            <span className={styles.propertyKey}>Bedrooms</span>
            <span className={styles.propertyVal}>{state.property.bedrooms}</span>
          </div>
          <div className={styles.propertyCell}>
            <span className={styles.propertyKey}>Bathrooms</span>
            <span className={styles.propertyVal}>{state.property.bathrooms}</span>
          </div>
          <div className={styles.propertyCell}>
            <span className={styles.propertyKey}>Toilets</span>
            <span className={styles.propertyVal}>{state.property.toilets}</span>
          </div>
          <div className={styles.propertyCell}>
            <span className={styles.propertyKey}>Living rooms</span>
            <span className={styles.propertyVal}>{state.property.livingRooms}</span>
          </div>
          <div className={styles.propertyCell}>
            <span className={styles.propertyKey}>Kitchens</span>
            <span className={styles.propertyVal}>{state.property.kitchens}</span>
          </div>
          <div className={`${styles.propertyCell} ${styles.propertyCellFull}`}>
            <span className={styles.propertyKey}>Frequency</span>
            <span className={styles.propertyVal}>{getFrequencyLabel(state.property.frequency)}</span>
          </div>
        </div>
      </div>

      <div className={styles.recordSection}>
        <h4 className={styles.subheading}>Preferred schedule</h4>
        <dl className={styles.scheduleRow}>
          <div className={styles.scheduleItem}>
            <dt>Date</dt>
            <dd>{formatPreferredDate(state.quote.preferredDate)}</dd>
          </div>
          <div className={styles.scheduleItem}>
            <dt>Start time</dt>
            <dd>
              {state.quote.preferredTime
                ? formatStartTimeLabel(state.quote.preferredTime)
                : '—'}
            </dd>
          </div>
        </dl>
      </div>

      <div className={styles.cleaningSection}>
        <h4 className={styles.subheading}>Cleaning summary</h4>
        {breakdown.isEmpty ? (
          <p className={styles.emptyState}>Add cleaning items to build your summary.</p>
        ) : (
          <dl className={styles.lines}>
            {breakdown.items.map((item) => (
              <div key={item.id} className={styles.linePair}>
                <dt>{getLineItemLabel(item)}</dt>
                <dd>{formatLineItemSummary(item, formatCurrency)}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className={styles.totalRow}>
          <span>Total</span>
          <strong className={styles.total}>
            {breakdown.isEmpty ? '—' : formatCurrency(breakdown.total)}
          </strong>
        </div>
      </div>

      <div className={styles.actions}>
        {canSend ? (
          <a
            href={whatsAppUrl}
            className="btn btn--whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: '100%' }}
          >
            <Icon name="whatsapp" size={18} />
            Send Summary on WhatsApp
          </a>
        ) : (
          <button
            type="button"
            className={`btn btn--whatsapp ${styles.waDisabled}`}
            disabled
            title="Add at least one cleaning item to send your summary"
            style={{ width: '100%' }}
          >
            <Icon name="whatsapp" size={18} />
            Send Summary on WhatsApp
          </button>
        )}
        <a href={businessConfig.phone.tel} className="btn btn--secondary" style={{ width: '100%' }}>
          <Icon name="phone" size={18} />
          Call {businessConfig.phone.display}
        </a>
      </div>
    </aside>
  );
}
