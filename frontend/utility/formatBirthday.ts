export default function formatBirthday(date: string) {
  if (date.length === 0) return;
  return `${date}T00:00:00`;
}
