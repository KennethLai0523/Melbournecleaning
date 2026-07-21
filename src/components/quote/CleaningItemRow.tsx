import type { CleaningQuoteItem } from '../../data/pricing';
import { formatCurrency } from '../../utils/formatCurrency';
import { CleaningIcon } from '../icons/CleaningIcon';
import { QuantitySelector } from './QuantitySelector';
import styles from './CleaningItemRow.module.css';

interface CleaningItemRowProps {
  item: CleaningQuoteItem;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export function CleaningItemRow({ item, quantity, onQuantityChange }: CleaningItemRowProps) {
  const isQuantity = item.pricingMode === 'quantity';
  const isSelected = isQuantity ? quantity > 0 : quantity > 0;
  const subtotal = isQuantity
    ? quantity * item.unitPrice
    : isSelected
      ? item.unitPrice
      : 0;
  const maxQty = item.maxQuantity ?? 50;
  const unitLabel = item.unitLabel ?? 'per job';

  return (
    <div
      className={`${styles.row} ${isSelected ? styles.selected : ''}`}
      role="row"
    >
      <div className={styles.itemCol} role="cell">
        <span className={styles.iconWrap} aria-hidden="true">
          <CleaningIcon name={item.icon} size={22} />
        </span>
        <div className={styles.itemText}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.description}>{item.description}</span>
          <span className={styles.unitLabelMobile}>
            {isQuantity ? unitLabel : formatCurrency(item.unitPrice)}
          </span>
        </div>
      </div>

      <div className={styles.priceCol} role="cell">
        <span className={styles.colLabel}>Unit price</span>
        <span className={styles.price}>{formatCurrency(item.unitPrice)}</span>
        <span className={styles.unitHint}>{isQuantity ? unitLabel : 'fixed'}</span>
      </div>

      <div className={styles.controlCol} role="cell">
        <span className={styles.colLabel}>{isQuantity ? 'Quantity' : 'Include'}</span>
        {isQuantity ? (
          <QuantitySelector
            id={`qty-${item.id}`}
            value={quantity}
            min={0}
            max={maxQty}
            onChange={onQuantityChange}
            label={item.name}
          />
        ) : (
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onQuantityChange(e.target.checked ? 1 : 0)}
              aria-label={`Include ${item.name}`}
            />
            <span className={styles.toggleTrack} aria-hidden="true">
              <span className={styles.toggleThumb} />
            </span>
            <span className={styles.toggleText}>{isSelected ? 'Yes' : 'No'}</span>
          </label>
        )}
      </div>

      <div className={styles.subtotalCol} role="cell">
        <span className={styles.colLabel}>Subtotal</span>
        <span className={`${styles.subtotal} ${isSelected ? styles.subtotalActive : ''}`}>
          {isSelected ? formatCurrency(subtotal) : '—'}
        </span>
      </div>
    </div>
  );
}
