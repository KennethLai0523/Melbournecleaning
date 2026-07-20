interface QuantitySelectorProps {
  id: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  label: string;
}

export function QuantitySelector({
  id,
  value,
  min = 0,
  max = 20,
  onChange,
  label,
}: QuantitySelectorProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className="qty-selector" role="group" aria-label={label}>
      <button
        type="button"
        className="qty-btn"
        onClick={decrease}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
      >
        −
      </button>
      <span className="qty-value" id={id} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="qty-btn"
        onClick={increase}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
      >
        +
      </button>
    </div>
  );
}
