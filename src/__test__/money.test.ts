import { toNumberCurrencyString, addMoneyStrings } from "../utils/money";

describe("toNumberCurrencyString", () => {
  it("formats numbers to two decimal places", () => {
    expect(toNumberCurrencyString(123)).toBe("123.00");
    expect(toNumberCurrencyString(123.456)).toBe("123.46");
    expect(toNumberCurrencyString("50")).toBe("50.00");
  });

  it("returns '0.00' for null, undefined, or NaN", () => {
    expect(toNumberCurrencyString(null)).toBe("0.00");
    expect(toNumberCurrencyString(undefined)).toBe("0.00");
    expect(toNumberCurrencyString("abc")).toBe("0.00");
  });
});

describe("addMoneyStrings", () => {
  it("adds two valid numeric strings", () => {
    expect(addMoneyStrings("100", "50")).toBe("150.00");
    expect(addMoneyStrings("10.25", "5.35")).toBe("15.60");
  });

  it("handles non-numeric strings gracefully", () => {
    expect(addMoneyStrings("abc", "10")).toBe("0.00");
    expect(addMoneyStrings("5", "xyz")).toBe("0.00");
  });

  it("returns '0.00' when both values are invalid", () => {
    expect(addMoneyStrings("foo", "bar")).toBe("0.00");
  });
});
