import { useState } from 'react';
import type { CleaningQuoteItem } from '../../data/pricing';
import { getDefaultVisibleItems, getExpandableItems } from '../../data/pricing';
import { CleaningItemRow } from './CleaningItemRow';
import { Icon } from '../ui/Icon';
import styles from './CleaningDetails.module.css';

interface CleaningDetailsProps {
  items: Record<string, number>;
  onItemChange: (itemId: string, qty: number) => void;
}

export function CleaningDetails({ items, onItemChange }: CleaningDetailsProps) {
  const [expanded, setExpanded] = useState(false);
  const defaultItems = getDefaultVisibleItems();
  const expandableItems = getExpandableItems();

  const renderRow = (item: CleaningQuoteItem) => (
    <CleaningItemRow
      key={item.id}
      item={item}
      quantity={items[item.id] ?? 0}
      onQuantityChange={(qty) => onItemChange(item.id, qty)}
    />
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Cleaning details</h3>
        <p className={styles.subtitle}>Choose exactly what you would like us to clean.</p>
      </div>

      <div className={styles.table} role="table" aria-label="Cleaning items and quantities">
        <div className={styles.tableHead} role="row">
          <span role="columnheader">Item</span>
          <span role="columnheader">Unit price</span>
          <span role="columnheader">Qty</span>
          <span role="columnheader">Subtotal</span>
        </div>
        {defaultItems.map(renderRow)}
        {expanded && expandableItems.map(renderRow)}
      </div>

      <button
        type="button"
        className={styles.expandBtn}
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`} aria-hidden="true">
          <Icon name="chevronDown" size={18} />
        </span>
        {expanded ? 'Show fewer cleaning options' : 'Show more cleaning options'}
      </button>
    </div>
  );
}
