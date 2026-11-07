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
