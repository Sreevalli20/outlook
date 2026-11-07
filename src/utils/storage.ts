/**
 * Safe local storage utility with JSON serialization and schema safety
 */

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[GRANTLY Storage] Failed to load key "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[GRANTLY Storage] Failed to save key "${key}" to localStorage:`, error);
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`[GRANTLY Storage] Failed to remove key "${key}":`, error);
  }
}
