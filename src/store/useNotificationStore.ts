import { create } from 'zustand';
import { AppNotification, NotificationType } from '../types/notification';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';
import { ApplicationRecord } from '../types/application';
import { Scholarship } from '../types/scholarship';

const STORAGE_KEY = 'grantly_notifications_list';

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Upcoming Deadline Alert',
    message: 'National Merit Scholarship Program deadline is on November 15, 2026 (~8 days remaining).',
    type: 'deadline',
    read: false,
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    linkUrl: '/scholarships/sch-001',
    scholarshipId: 'sch-001',
  },
  {
    id: 'notif-2',
    title: 'Missing Application Documents',
    message: 'Google Generation Scholarship is missing: Letter of Recommendation & Official transcript.',
    type: 'document',
    read: false,
    createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    linkUrl: '/applications/app-001',
    applicationId: 'app-001',
  },
  {
    id: 'notif-3',
    title: 'Application Marked Submitted',
    message: 'California Middle Class Scholarship status updated to "Submitted" with confirmation reference #CSAC-MCS-489021.',
    type: 'status',
    read: true,
    createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
    linkUrl: '/applications/app-003',
    applicationId: 'app-003',
  },
];

interface NotificationStore {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => void;
  syncNotificationsFromAppData: (applications: ApplicationRecord[], scholarships: Scholarship[]) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: loadFromLocalStorage<AppNotification[]>(STORAGE_KEY, INITIAL_NOTIFICATIONS),
  unreadCount: loadFromLocalStorage<AppNotification[]>(STORAGE_KEY, INITIAL_NOTIFICATIONS).filter((n) => !n.read).length,

  markAsRead: (id) => {
    const updated = get().notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ notifications: updated, unreadCount: updated.filter((n) => !n.read).length });
  },

  markAllAsRead: () => {
    const updated = get().notifications.map((n) => ({ ...n, read: true }));
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ notifications: updated, unreadCount: 0 });
  },

  deleteNotification: (id) => {
    const updated = get().notifications.filter((n) => n.id !== id);
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ notifications: updated, unreadCount: updated.filter((n) => !n.read).length });
  },

  clearAll: () => {
    saveToLocalStorage(STORAGE_KEY, []);
    set({ notifications: [], unreadCount: 0 });
  },

  addNotification: (notif) => {
    const newEntry: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [newEntry, ...get().notifications];
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ notifications: updated, unreadCount: updated.filter((n) => !n.read).length });
  },

  syncNotificationsFromAppData: (applications, scholarships) => {
    // Check if any application deadline is within 14 days and unalerted
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentNotifs = get().notifications;
    const newAlerts: AppNotification[] = [];

    applications.forEach((app) => {
      const deadlineDate = new Date(app.deadline);
      deadlineDate.setHours(0, 0, 0, 0);
      const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

      if (diffDays >= 0 && diffDays <= 7 && app.status !== 'Approved' && app.status !== 'Rejected' && app.status !== 'Withdrawn') {
        const alreadyNotified = currentNotifs.some(
          (n) => n.type === 'deadline' && n.applicationId === app.id
        );
        if (!alreadyNotified) {
          newAlerts.push({
            id: `notif-dl-${app.id}-${diffDays}`,
            title: `Deadline Approaching: ${app.scholarshipName}`,
            message: `Only ${diffDays} day${diffDays === 1 ? '' : 's'} remaining until the application deadline (${app.deadline}).`,
            type: 'deadline',
            read: false,
            createdAt: new Date().toISOString(),
            linkUrl: `/applications/${app.id}`,
            applicationId: app.id,
            scholarshipId: app.scholarshipId,
          });
        }
      }
    });

    if (newAlerts.length > 0) {
      const merged = [...newAlerts, ...currentNotifs];
      saveToLocalStorage(STORAGE_KEY, merged);
      set({ notifications: merged, unreadCount: merged.filter((n) => !n.read).length });
    }
  },
}));
