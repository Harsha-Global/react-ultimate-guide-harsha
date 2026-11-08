type AttendanceValues = Readonly<{
  attendance: "in-person" | "online";
  city: string;
}>;

function isAttendanceValid(values: AttendanceValues): boolean {
  // TODO: combine the attendance choice with the city requirement.
  return false;
}
