export function toNumberCurrencyString(x: string | number | null | undefined): string {
  const n = Number(x);
  if (Number.isNaN(n)) return '0.00';
  return n.toFixed(2);
}

export function addMoneyStrings(a: string, b: string): string {
  const sum = Number(a) + Number(b);
  return toNumberCurrencyString(sum);
}
