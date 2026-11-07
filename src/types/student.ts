import { AcademicLevel } from './scholarship';

export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string; // YYYY-MM-DD
  state: string;
  city: string;
  country: string;
}

export interface AcademicDetails {
  institution: string;
  course: string;
  degree: string;
  academicLevel: AcademicLevel;
  academicYear: string; // e.g. "Year 2" or "Sophomore"
  graduationYear: number;
  marksPercentage: number; // 0 to 100
  gpa?: number;
}

export interface EligibilityDetails {
  annualFamilyIncome: number;
  incomeCurrency: 'USD' | 'INR' | 'EUR' | 'GBP';
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority' | 'Other';
  gender: 'Female' | 'Male' | 'Non-binary' | 'Prefer not to say';
  institutionType: 'Public/Government' | 'Private Accredited' | 'Community College' | 'Other';
  firstGenerationStudent: boolean;
  hasDisability: boolean;
  isVeteranOrDependent?: boolean;
}

export interface StudentProfile {
  personal: PersonalDetails;
  academic: AcademicDetails;
  eligibility: EligibilityDetails;
  updatedAt: string;
}
