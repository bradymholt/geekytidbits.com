export function getCurrentDateInISOFormat(currentDate = new Date()) {
  let isoLocalDateString = getCurrentDateInLocalTimezone(
    currentDate
  ).toISOString();
  return isoLocalDateString.substring(0, 10);
}
export function getCurrentDateInLocalTimezone(currentDate: Date) {
  return new Date(
    currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
  );
}
