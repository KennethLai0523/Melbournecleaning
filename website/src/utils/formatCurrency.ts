const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
});

export function formatCurrency(amount: number): string {
  return formatter.format(amount);
}
