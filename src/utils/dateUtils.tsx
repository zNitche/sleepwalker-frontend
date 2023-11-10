export function getLocaleDateString(date: string) {
  return date ? new Date(date).toLocaleString() : "---"
}
