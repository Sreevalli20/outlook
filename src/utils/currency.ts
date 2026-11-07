/**
 * Shared currency conversion helpers.
 * Baseline rates (approximate, for threshold/aggregation checks only):
 * 1 USD ~ 83 INR, 1 EUR ~ 1.08 USD, 1 GBP ~ 1.25 USD.
 */

export type SupportedCurrency = 'USD' | 'INR' | 'EUR' | 'GBP';

const USD_PER_UNIT: Record<SupportedCurrency, number> = {
  USD: 1,
  INR: 1 / 83,
  EUR: 1.08,
  GBP: 1.25,
};

export function normalizeCurrencyToUSD(amount: number, currency: SupportedCurrency | string): number {
  const rate = USD_PER_UNIT[currency as SupportedCurrency];
  if (rate === undefined) return amount;
  return amount * rate;
}

export function convertCurrency(
  amount: number,
  from: SupportedCurrency,
  to: SupportedCurrency
): number {
  if (from === to) return amount;
  return normalizeCurrencyToUSD(amount, from) / USD_PER_UNIT[to];
}
