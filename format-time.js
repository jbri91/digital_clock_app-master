// Pure function: given raw values, returns the display string.
// No DOM, no Date object — easy to test with made-up values.
function formatTime(rawHours, minutes, seconds, militaryTime) {
  const meridiem = rawHours >= 12 ? 'PM' : 'AM';

  const pad = (n) => (n < 10 ? "0" + n : String(n));
  const paddedMinutes = pad(minutes);
  const paddedSeconds = pad(seconds);

  if (militaryTime) {
    const hours = String(rawHours).padStart(2, '0');
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }

  let hours = rawHours % 12;
  if (hours === 0) {
    hours = 12;
  }
  return `${hours}:${paddedMinutes}:${paddedSeconds} ${meridiem}`;
}
