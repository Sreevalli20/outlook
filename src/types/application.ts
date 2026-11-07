export type ApplicationStatus =
  | 'Interested'
  | 'Preparing'
  | 'Ready to apply'
  | 'Submitted'
  | 'Under review'
  | 'Approved'
  | 'Rejected'
  | 'Withdrawn';

export interface ApplicationChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  requiredDocCategory?: string;
}

export interface ApplicationReminder {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  completed: boolean;
}

export interface ApplicationHistoryEvent {
  id: string;
  date: string; // ISO
  action: string;
  note?: string;
}

export interface ApplicationRecord {
  id: string;
  scholarshipId: string;
  scholarshipName: string;
  provider: string;
  awardAmount: number;
  currency: 'USD' | 'INR' | 'EUR' | 'GBP';
  deadline: string;
  status: ApplicationStatus;
  priority: 'low' | 'medium' | 'high';
  submissionDate?: string;
  referenceNumber?: string;
  notes: string;
  checklist: ApplicationChecklistItem[];
  attachedDocIds: string[];
  reminders: ApplicationReminder[];
  history: ApplicationHistoryEvent[];
  createdAt: string;
  updatedAt: string;
}
