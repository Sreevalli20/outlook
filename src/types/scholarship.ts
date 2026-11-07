export type FundingType = 'government' | 'private' | 'institutional' | 'ngo' | 'corporate';

export type ScholarshipCategory =
  | 'STEM'
  | 'Merit'
  | 'Need-Based'
  | 'Minority/Category'
  | 'Research'
  | 'Women in Tech'
  | 'First-Generation'
  | 'Special Talent'
  | 'Government'
  | 'General';

export type AcademicLevel =
  | 'High School'
  | 'Undergraduate'
  | 'Postgraduate'
  | 'Doctoral'
  | 'Diploma';

export type AwardType = 'one-time' | 'annual' | 'tuition-fee' | 'monthly-stipend' | 'full-ride';

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  shortDescription: string;
  fullDescription: string;
  fundingType: FundingType;
  category: ScholarshipCategory;
  awardAmount: number;
  currency: 'USD' | 'INR' | 'EUR' | 'GBP';
  awardType: AwardType;
  awardDetails: string;
  academicLevel: AcademicLevel[];
  eligibleCourses: string[];
  eligibleStates?: string[]; // 'All' or specific states
  minPercentageOrGpa: number; // Stored as percentage 0-100 (e.g. 75 = 75% or 3.0/4.0 GPA equivalent)
  maxAnnualIncome?: number; // In scholarship currency, undefined if not need-based
  genderRequirement?: 'All' | 'Female' | 'Male' | 'Other';
  casteOrCategoryRequirement?: string[]; // e.g., ['General', 'OBC', 'SC', 'ST', 'EWS', 'Any']
  institutionTypeAllowed?: string[]; // e.g., ['Public/Government', 'Private Accredited', 'Any']
  requiredDocuments: string[];
  applicationStartDate: string; // ISO date 'YYYY-MM-DD'
  applicationDeadline: string; // ISO date 'YYYY-MM-DD'
  officialWebsiteUrl: string;
  verificationDate: string;
  applicationInstructions: string[];
  importantNotices?: string[];
  isFeatured?: boolean;
  renewableYears?: number;
  contactEmail?: string;
  disabilityEligibleOnly?: boolean;
}

export type EligibilityStatus = 'eligible' | 'potentially_eligible' | 'not_eligible' | 'insufficient_info';

export interface EligibilityCriterionResult {
  criterion: string;
  status: 'passed' | 'failed' | 'missing_data' | 'neutral';
  studentValue?: string | number | boolean;
  requiredValue?: string | number | boolean;
  explanation: string;
}

export interface ScholarshipEligibilityEvaluation {
  scholarship: Scholarship;
  status: EligibilityStatus;
  matchScore: number; // 0 to 100 percentage
  passedCriteria: EligibilityCriterionResult[];
  failedCriteria: EligibilityCriterionResult[];
  missingCriteria: EligibilityCriterionResult[];
  recommendationReason: string;
}
