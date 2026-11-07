import { create } from 'zustand';
import { UserSettings } from '../types/settings';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

const STORAGE_KEY = 'grantly_user_settings';

const DEFAULT_SETTINGS: UserSettings = {
  currency: 'USD',
  dateFormat: 'YYYY-MM-DD',
  theme: 'light',
  simulateDeadlineAlerts: true,
  reminderDaysBefore: 7,
};

function applyThemeToDOM(theme: 'light' | 'dark') {
  if (typeof document !== 'undefined') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

const initialSettings = loadFromLocalStorage<UserSettings>(STORAGE_KEY, DEFAULT_SETTINGS);
applyThemeToDOM(initialSettings.theme);

interface SettingsStore {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  toggleTheme: () => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: initialSettings,

  updateSettings: (newSettings) => {
    const updated = { ...get().settings, ...newSettings };
    saveToLocalStorage(STORAGE_KEY, updated);
    if (newSettings.theme) {
      applyThemeToDOM(newSettings.theme);
    }
    set({ settings: updated });
  },

  toggleTheme: () => {
    const current = get().settings.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    get().updateSettings({ theme: next });
  },

  resetSettings: () => {
    saveToLocalStorage(STORAGE_KEY, DEFAULT_SETTINGS);
    applyThemeToDOM(DEFAULT_SETTINGS.theme);
    set({ settings: DEFAULT_SETTINGS });
  },
}));
