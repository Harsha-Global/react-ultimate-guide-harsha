type AttendanceValues = Readonly<{
  attendance: "in-person" | "online";
  city: string;
}>;

function isAttendanceValid(values: AttendanceValues): boolean {
  return values.attendance !== "in-person" || values.city.length >= 2;
}
