describe("Resolve the Theme Preference", function () {
  it("explicit light overrides dark system", function () { expect(resolveThemePreference("light", true)).toEqual({preference:"light",resolved:"light"}); });
  it("explicit dark overrides light system", function () { expect(resolveThemePreference("dark", false)).toEqual({preference:"dark",resolved:"dark"}); });
  it("light with light system", function () { expect(resolveThemePreference("light", false)).toEqual({preference:"light",resolved:"light"}); });
  it("dark with dark system", function () { expect(resolveThemePreference("dark", true)).toEqual({preference:"dark",resolved:"dark"}); });
  it("system remains system when dark is resolved", function () { expect(resolveThemePreference("system", true)).toEqual({preference:"system",resolved:"dark"}); });
  it("system remains system when light is resolved", function () { expect(resolveThemePreference("system", false)).toEqual({preference:"system",resolved:"light"}); });
  it("missing value falls back to system", function () { expect(resolveThemePreference(null, true)).toEqual({preference:"system",resolved:"dark"}); });
  it("undefined value falls back to system", function () { expect(resolveThemePreference(undefined, false)).toEqual({preference:"system",resolved:"light"}); });
  it("unknown string is not a theme", function () { expect(resolveThemePreference("blue", true)).toEqual({preference:"system",resolved:"dark"}); });
  it("case is validated rather than cast", function () { expect(resolveThemePreference("Dark", false)).toEqual({preference:"system",resolved:"light"}); });
  it("non-string input is rejected", function () { expect(resolveThemePreference({theme:"dark"}, false)).toEqual({preference:"system",resolved:"light"}); });
  it("boolean input does not become a saved choice", function () { expect(resolveThemePreference(true, true)).toEqual({preference:"system",resolved:"dark"}); });
  it("re-resolves a saved system choice on the next call", function () {
    const first = resolveThemePreference("system", false);
    const second = resolveThemePreference(first.preference, true);
    expect(first).toEqual({preference:"system",resolved:"light"});
    expect(second).toEqual({preference:"system",resolved:"dark"});
  });
});
