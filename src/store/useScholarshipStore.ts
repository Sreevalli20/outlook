import { create } from 'zustand';
import { Scholarship, FundingType, ScholarshipCategory, AcademicLevel } from '../types/scholarship';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

const SAVED_KEY = 'grantly_saved_scholarships';
const COMPARE_KEY = 'grantly_compare_scholarships';

export interface ScholarshipFilters {
  searchQuery: string;
  fundingType: FundingType | 'all';
  category: ScholarshipCategory | 'all';
  academicLevel: AcademicLevel | 'all';
  course: string;
  minMarksThreshold: number;
  maxIncomeThreshold: number | null;
  state: string;
  openOnly: boolean;
  genderOnly: string;
}

export type SortOption =
  | 'deadline-asc'
  | 'deadline-desc'
  | 'award-desc'
  | 'award-asc'
  | 'name-asc';

interface ScholarshipStore {
  scholarships: Scholarship[];
  savedIds: string[];
  comparedIds: string[];
  viewMode: 'grid' | 'list';
  sortBy: SortOption;
  filters: ScholarshipFilters;

  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;

  toggleCompare: (id: string) => { added: boolean; message?: string };
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isCompared: (id: string) => boolean;

  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (sort: SortOption) => void;
  setFilter: <K extends keyof ScholarshipFilters>(key: K, value: ScholarshipFilters[K]) => void;
  resetFilters: () => void;
}

const defaultFilters: ScholarshipFilters = {
  searchQuery: '',
  fundingType: 'all',
  category: 'all',
  academicLevel: 'all',
  course: 'all',
  minMarksThreshold: 0,
  maxIncomeThreshold: null,
  state: 'all',
  openOnly: false,
  genderOnly: 'all',
};

export const useScholarshipStore = create<ScholarshipStore>((set, get) => ({
  scholarships: SCHOLARSHIPS_DATA,
  savedIds: loadFromLocalStorage<string[]>(SAVED_KEY, ['sch-001', 'sch-002']),
  comparedIds: loadFromLocalStorage<string[]>(COMPARE_KEY, ['sch-001', 'sch-002']),
  viewMode: 'grid',
  sortBy: 'deadline-asc',
  filters: defaultFilters,

  toggleSaved: (id) => {
    const current = get().savedIds;
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    saveToLocalStorage(SAVED_KEY, updated);
    set({ savedIds: updated });
  },

  isSaved: (id) => get().savedIds.includes(id),

  toggleCompare: (id) => {
    const current = get().comparedIds;
    if (current.includes(id)) {
      const updated = current.filter((item) => item !== id);
      saveToLocalStorage(COMPARE_KEY, updated);
      set({ comparedIds: updated });
      return { added: false };
    }

    if (current.length >= 4) {
      return { added: false, message: 'You can compare a maximum of 4 scholarships at once.' };
    }

    const updated = [...current, id];
    saveToLocalStorage(COMPARE_KEY, updated);
    set({ comparedIds: updated });
    return { added: true };
  },

  removeFromCompare: (id) => {
    const updated = get().comparedIds.filter((item) => item !== id);
    saveToLocalStorage(COMPARE_KEY, updated);
    set({ comparedIds: updated });
  },

  clearCompare: () => {
    saveToLocalStorage(COMPARE_KEY, []);
    set({ comparedIds: [] });
  },

  isCompared: (id) => get().comparedIds.includes(id),

  setViewMode: (viewMode) => set({ viewMode }),
  setSortBy: (sortBy) => set({ sortBy }),

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },

  resetFilters: () => set({ filters: defaultFilters }),
}));
