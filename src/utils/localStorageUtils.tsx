export function getItem(key: string) {
  const item = localStorage.getItem(key)
  return item ? item : null;
}

export function setItem(data: any, key: string) {
  localStorage.setItem(key, data);
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}