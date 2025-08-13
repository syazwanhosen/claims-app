import type { Claim } from '../types/claim';

export type SortKey =
  | 'newly-created'
  | 'latest-created'
  | 'smallest-amount'
  | 'largest-amount'
  | 'smallest-fee'
  | 'largest-fee'
  | 'smallest-total'
  | 'largest-total';

export function sortClaims(claims: Claim[], key: SortKey): Claim[] {
  const byDateAsc = (a: Claim, b: Claim) => a.createdAt.localeCompare(b.createdAt);
  const byDateDesc = (a: Claim, b: Claim) => b.createdAt.localeCompare(a.createdAt);

  const toNum = (s: string) => Number(s);
  const total = (c: Claim) => toNum(c.amount) + toNum(c.processingFee);

  switch (key) {
    case 'newly-created':  return [...claims].sort(byDateDesc);
    case 'latest-created': return [...claims].sort(byDateAsc);
    case 'smallest-amount': return [...claims].sort((a,b)=>toNum(a.amount)-toNum(b.amount));
    case 'largest-amount':  return [...claims].sort((a,b)=>toNum(b.amount)-toNum(a.amount));
    case 'smallest-fee':    return [...claims].sort((a,b)=>toNum(a.processingFee)-toNum(b.processingFee));
    case 'largest-fee':     return [...claims].sort((a,b)=>toNum(b.processingFee)-toNum(a.processingFee));
    case 'smallest-total':  return [...claims].sort((a,b)=>total(a)-total(b));
    case 'largest-total':   return [...claims].sort((a,b)=>total(b)-total(a));
    default: return claims;
  }
}
