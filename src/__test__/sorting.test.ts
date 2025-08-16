import { sortClaims, SortKey } from "../utils/sorting";
import type { Claim } from "../types/claim";

const claims: Claim[] = [
  { id: "1", amount: "100", processingFee: "10", createdAt: "2025-01-01" } as Claim,
  { id: "2", amount: "200", processingFee: "20", createdAt: "2025-02-01" } as Claim,
  { id: "3", amount: "50",  processingFee: "5",  createdAt: "2024-12-15" } as Claim,
];

describe("sortClaims", () => {
  it("sorts by newly-created (desc date)", () => {
    const sorted = sortClaims(claims, "newly-created");
    expect(sorted.map(c => c.id)).toEqual(["2", "1", "3"]);
  });

  it("sorts by latest-created (asc date)", () => {
    const sorted = sortClaims(claims, "latest-created");
    expect(sorted.map(c => c.id)).toEqual(["3", "1", "2"]);
  });

  it("sorts by smallest-amount", () => {
    const sorted = sortClaims(claims, "smallest-amount");
    expect(sorted.map(c => c.id)).toEqual(["3", "1", "2"]);
  });

  it("sorts by largest-amount", () => {
    const sorted = sortClaims(claims, "largest-amount");
    expect(sorted.map(c => c.id)).toEqual(["2", "1", "3"]);
  });

  it("sorts by smallest-fee", () => {
    const sorted = sortClaims(claims, "smallest-fee");
    expect(sorted.map(c => c.id)).toEqual(["3", "1", "2"]);
  });

  it("sorts by largest-fee", () => {
    const sorted = sortClaims(claims, "largest-fee");
    expect(sorted.map(c => c.id)).toEqual(["2", "1", "3"]);
  });

  it("sorts by smallest-total (amount + fee)", () => {
    const sorted = sortClaims(claims, "smallest-total");
    expect(sorted.map(c => c.id)).toEqual(["3", "1", "2"]);
  });

  it("sorts by largest-total (amount + fee)", () => {
    const sorted = sortClaims(claims, "largest-total");
    expect(sorted.map(c => c.id)).toEqual(["2", "1", "3"]);
  });

  it("returns same array when key is unknown", () => {
    const sorted = sortClaims(claims, "unknown-key" as SortKey);
    expect(sorted).toEqual(claims);
  });
});
