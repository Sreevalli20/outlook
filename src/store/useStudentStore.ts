import { create } from 'zustand';
import { StudentProfile, PersonalDetails, AcademicDetails, EligibilityDetails } from '../types/student';
import { DEFAULT_STUDENT_PROFILE } from '../data/defaultStudent';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

const STORAGE_KEY = 'grantly_student_profile';

interface StudentStore {
  profile: StudentProfile;
  completionScore: number;
  updatePersonal: (data: Partial<PersonalDetails>) => void;
  updateAcademic: (data: Partial<AcademicDetails>) => void;
  updateEligibility: (data: Partial<EligibilityDetails>) => void;
  setFullProfile: (profile: StudentProfile) => void;
  resetToDefault: () => void;
  clearProfile: () => void;
}

function calculateScore(profile: StudentProfile): number {
  let points = 0;
  const total = 12;

  if (profile.personal.fullName?.trim()) points++;
  if (profile.personal.email?.trim()) points++;
  if (profile.personal.phone?.trim()) points++;
  if (profile.personal.state?.trim()) points++;
  if (profile.personal.dateOfBirth?.trim()) points++;

  if (profile.academic.institution?.trim()) points++;
  if (profile.academic.course?.trim()) points++;
  if (profile.academic.academicLevel) points++;
  if (profile.academic.marksPercentage > 0) points++;

  if (profile.eligibility.annualFamilyIncome !== undefined && profile.eligibility.annualFamilyIncome >= 0) points++;
  if (profile.eligibility.category) points++;
  if (profile.eligibility.institutionType) points++;

  return Math.round((points / total) * 100);
}

const initialProfile: StudentProfile = loadFromLocalStorage<StudentProfile>(STORAGE_KEY, DEFAULT_STUDENT_PROFILE);

export const useStudentStore = create<StudentStore>((set, get) => ({
  profile: initialProfile,
  completionScore: calculateScore(initialProfile),

  updatePersonal: (data) => {
    const updated: StudentProfile = {
      ...get().profile,
      personal: { ...get().profile.personal, ...data },
      updatedAt: new Date().toISOString(),
    };
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ profile: updated, completionScore: calculateScore(updated) });
  },

  updateAcademic: (data) => {
    const updated: StudentProfile = {
      ...get().profile,
      academic: { ...get().profile.academic, ...data },
      updatedAt: new Date().toISOString(),
    };
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ profile: updated, completionScore: calculateScore(updated) });
  },

  updateEligibility: (data) => {
    const updated: StudentProfile = {
      ...get().profile,
      eligibility: { ...get().profile.eligibility, ...data },
      updatedAt: new Date().toISOString(),
    };
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ profile: updated, completionScore: calculateScore(updated) });
  },

  setFullProfile: (profile) => {
    saveToLocalStorage(STORAGE_KEY, profile);
    set({ profile, completionScore: calculateScore(profile) });
  },

  resetToDefault: () => {
    saveToLocalStorage(STORAGE_KEY, DEFAULT_STUDENT_PROFILE);
    set({
      profile: DEFAULT_STUDENT_PROFILE,
      completionScore: calculateScore(DEFAULT_STUDENT_PROFILE),
    });
  },

  clearProfile: () => {
    const emptyProfile: StudentProfile = {
      personal: {
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        state: '',
        city: '',
        country: '',
      },
      academic: {
        institution: '',
        course: '',
        degree: '',
        academicLevel: 'Undergraduate',
        academicYear: '',
        graduationYear: new Date().getFullYear() + 2,
        marksPercentage: 0,
      },
      eligibility: {
        annualFamilyIncome: 0,
        incomeCurrency: 'USD',
        category: 'General',
        gender: 'Prefer not to say',
        institutionType: 'Public/Government',
        firstGenerationStudent: false,
        hasDisability: false,
      },
      updatedAt: new Date().toISOString(),
    };
    saveToLocalStorage(STORAGE_KEY, emptyProfile);
    set({ profile: emptyProfile, completionScore: calculateScore(emptyProfile) });
  },
}));
