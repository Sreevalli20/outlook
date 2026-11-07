import { StudentProfile } from '../types/student';

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  personal: {
    fullName: 'Alex Vance',
    email: 'alex.vance@student.edu',
    phone: '+1 (555) 234-8976',
    dateOfBirth: '2004-05-18',
    state: 'California',
    city: 'San Francisco',
    country: 'United States'
  },
  academic: {
    institution: 'State Polytechnic University',
    course: 'Computer Science',
    degree: 'Bachelor of Science (B.S.)',
    academicLevel: 'Undergraduate',
    academicYear: 'Sophomore (Year 2)',
    graduationYear: 2028,
    marksPercentage: 86, // ~3.6 GPA
    gpa: 3.65
  },
  eligibility: {
    annualFamilyIncome: 48000,
    incomeCurrency: 'USD',
    category: 'General',
    gender: 'Female',
    institutionType: 'Public/Government',
    firstGenerationStudent: true,
    hasDisability: false,
    isVeteranOrDependent: false
  },
  updatedAt: '2026-10-28T14:30:00Z'
};
