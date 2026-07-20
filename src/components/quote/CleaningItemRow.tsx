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
  const isSelected = quantity > 0;
  const subtotal = quantity * item.unitPrice;
  const maxQty = item.maxQuantity ?? 50;

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
          <span className={styles.unitLabelMobile}>{item.unitLabel}</span>
        </div>
      </div>
      <div className={styles.priceCol} role="cell">
        <span className={styles.priceLabel}>Unit price</span>
        <span className={styles.price}>{formatCurrency(item.unitPrice)}</span>
        <span className={styles.unitHint}>{item.unitLabel}</span>
      </div>
      <div className={styles.qtyCol} role="cell">
        <span className={styles.priceLabel}>Quantity</span>
        <QuantitySelector
          id={`qty-${item.id}`}
          value={quantity}
          min={0}
          max={maxQty}
          onChange={onQuantityChange}
          label={item.name}
        />
      </div>
      <div className={styles.subtotalCol} role="cell">
        <span className={styles.priceLabel}>Subtotal</span>
        <span className={`${styles.subtotal} ${isSelected ? styles.subtotalActive : ''}`}>
          {isSelected ? formatCurrency(subtotal) : '—'}
        </span>
      </div>
    </div>
  );
}
