describe("Conditional Validation", function () {
it("allows online attendance without a city", function () {
  expect(isAttendanceValid({attendance:"online",city:""})).toBe(true);
});
it("does not apply the in-person city rule to online attendance", function () {
  expect(isAttendanceValid({attendance:"online",city:"D"})).toBe(true);
  expect(isAttendanceValid({attendance:"online",city:"Denver"})).toBe(true);
});
it("rejects an empty or one-character in-person city", function () {
  expect(isAttendanceValid({attendance:"in-person",city:""})).toBe(false);
  expect(isAttendanceValid({attendance:"in-person",city:"D"})).toBe(false);
});
it("accepts the two-character boundary", function () {
  expect(isAttendanceValid({attendance:"in-person",city:"LA"})).toBe(true);
});
it("accepts other valid in-person cities", function () {
  ["Denver","Boston","Austin"].forEach(function(city) {
    expect(isAttendanceValid({attendance:"in-person",city:city})).toBe(true);
  });
});
it("preserves the parsed input", function () {
  var values=Object.freeze({attendance:"in-person",city:"Denver"});
  expect(isAttendanceValid(values)).toBe(true);
  expect(values).toEqual({attendance:"in-person",city:"Denver"});
});
});
