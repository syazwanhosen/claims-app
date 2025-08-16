import { fmt, isIncidentDateValid } from "../utils/dates";

describe("fmt", () => {
  it("formats a Date object correctly", () => {
    const date = new Date("2025-01-15");
    expect(fmt(date)).toBe("2025-01-15");
  });

  it("formats a string date correctly", () => {
    expect(fmt("2025-03-10")).toBe("2025-03-10");
  });

  it("applies a custom format", () => {
    const date = new Date("2025-01-15");
    expect(fmt(date, "DD/MM/YYYY")).toBe("15/01/2025");
  });
});

describe("isIncidentDateValid", () => {
  it("returns true for a recent valid date", () => {
    const recentDate = new Date();
    expect(isIncidentDateValid(recentDate)).toBe(true);
  });

  it("returns false for a date older than 6 months", () => {
    const oldDate = new Date();
    oldDate.setMonth(oldDate.getMonth() - 7);
    expect(isIncidentDateValid(oldDate)).toBe(false);
  });

  it("returns false for a date in the far future", () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    expect(isIncidentDateValid(futureDate)).toBe(false);
  });
});
