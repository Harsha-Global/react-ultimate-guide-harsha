function expected(major, currency, locale) { return new Intl.NumberFormat(locale, {style:"currency",currency:currency}).format(major); }
describe("Format Minor-Unit Prices", function () {
  it("USD uses hundredths", function () { expect(formatMinorPrice(12345,"USD","en-US")).toEqual(expected(123.45,"USD","en-US")); });
  it("INR uses hundredths", function () { expect(formatMinorPrice(12345,"INR","en-IN")).toEqual(expected(123.45,"INR","en-IN")); });
  it("JPY uses whole units", function () { expect(formatMinorPrice(12345,"JPY","ja-JP")).toEqual(expected(12345,"JPY","ja-JP")); });
  it("zero USD is a visible price", function () { expect(formatMinorPrice(0,"USD","en-US")).toEqual(expected(0,"USD","en-US")); });
  it("zero JPY is a visible price", function () { expect(formatMinorPrice(0,"JPY","ja-JP")).toEqual(expected(0,"JPY","ja-JP")); });
  it("locale changes formatting without conversion", function () { expect(formatMinorPrice(8900,"USD","de-DE")).toEqual(expected(89,"USD","de-DE")); });
  it("unknown locale falls back safely", function () { expect(formatMinorPrice(8900,"USD","invalid-locale-!")).toEqual(expected(89,"USD","en-US")); });
  it("negative amount is unavailable", function () { expect(formatMinorPrice(-1,"USD","en-US")).toEqual("Unavailable"); });
  it("fractional minor units are unavailable", function () { expect(formatMinorPrice(12.5,"USD","en-US")).toEqual("Unavailable"); });
  it("NaN is unavailable", function () { expect(formatMinorPrice(NaN,"USD","en-US")).toEqual("Unavailable"); });
  it("infinity is unavailable", function () { expect(formatMinorPrice(Infinity,"USD","en-US")).toEqual("Unavailable"); });
  it("unsafe integer is unavailable", function () { expect(formatMinorPrice(Number.MAX_SAFE_INTEGER + 1,"USD","en-US")).toEqual("Unavailable"); });
  it("numeric strings are not coerced", function () { expect(formatMinorPrice("100","USD","en-US")).toEqual("Unavailable"); });
  it("null is not zero", function () { expect(formatMinorPrice(null,"USD","en-US")).toEqual("Unavailable"); });
  it("unsupported currency is unavailable", function () { expect(formatMinorPrice(100,"EUR","en-US")).toEqual("Unavailable"); });
  it("currency case is validated", function () { expect(formatMinorPrice(100,"usd","en-US")).toEqual("Unavailable"); });
});
