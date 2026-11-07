export type NotificationType = 'deadline' | 'document' | 'status' | 'reminder' | 'system';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  linkUrl?: string;
  scholarshipId?: string;
  applicationId?: string;
}

export interface UserSettings {
  currency: 'USD' | 'INR' | 'EUR' | 'GBP';
  dateFormat: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
  theme: 'light' | 'dark';
  simulateDeadlineAlerts: boolean;
  reminderDaysBefore: number;
}
