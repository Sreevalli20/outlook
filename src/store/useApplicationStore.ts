import { create } from 'zustand';
import {
  ApplicationRecord,
  ApplicationStatus,
  ApplicationChecklistItem,
  ApplicationReminder,
} from '../types/application';
import { Scholarship } from '../types/scholarship';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';
import { toLocalDateString } from '../utils/formatters';

const STORAGE_KEY = 'grantly_applications_records';

const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app-001',
    scholarshipId: 'sch-002',
    scholarshipName: 'Google Generation Scholarship (Women in Computer Science)',
    provider: 'Google Inc.',
    awardAmount: 10000,
    currency: 'USD',
    deadline: '2026-12-05',
    status: 'Preparing',
    priority: 'high',
    notes: 'Drafted Essay 1 on technical problem-solving. Need to request recommendation letter from Prof. Williams.',
    checklist: [
      { id: 'chk-1', title: 'Submit online form', completed: false },
      { id: 'chk-2', title: 'Upload Resume/CV with GitHub projects', completed: true },
      { id: 'chk-3', title: 'Two 400-word diversity in tech essays', completed: true },
      { id: 'chk-4', title: 'Letter of Recommendation from faculty', completed: false, requiredDocCategory: 'Recommendation letter' },
      { id: 'chk-5', title: 'Official university transcript', completed: false, requiredDocCategory: 'Academic marksheets' },
    ],
    attachedDocIds: [],
    reminders: [
      { id: 'rem-1', title: 'Follow up with Prof. Williams for reference', date: '2026-11-14', completed: false },
      { id: 'rem-2', title: 'Final proofread of technical essay', date: '2026-11-25', completed: false }
    ],
    history: [
      { id: 'h-1', date: '2026-10-15T09:00:00Z', action: 'Created application tracker from scholarship listing' },
      { id: 'h-2', date: '2026-10-22T14:15:00Z', action: 'Uploaded resume draft and marked checklist item complete' },
    ],
    createdAt: '2026-10-15T09:00:00Z',
    updatedAt: '2026-10-22T14:15:00Z',
  },
  {
    id: 'app-002',
    scholarshipId: 'sch-001',
    scholarshipName: 'National Merit Scholarship Program',
    provider: 'National Merit Scholarship Corporation (NMSC)',
    awardAmount: 2500,
    currency: 'USD',
    deadline: '2026-11-15',
    status: 'Ready to apply',
    priority: 'high',
    submissionDate: undefined,
    referenceNumber: 'NMSC-2026-CA-892',
    notes: 'High school counselor has already transmitted the certified school endorsement.',
    checklist: [
      { id: 'chk-201', title: 'Counselor report & endorsement', completed: true },
      { id: 'chk-202', title: 'SAT confirming score verification', completed: true },
      { id: 'chk-203', title: 'Self-authored personal statement', completed: true, requiredDocCategory: 'Statement of Purpose' },
      { id: 'chk-204', title: 'Final review before submission portal lock', completed: false },
    ],
    attachedDocIds: [],
    reminders: [
      { id: 'rem-201', title: 'Submit final packet on official portal', date: '2026-11-13', completed: false }
    ],
    history: [
      { id: 'h-201', date: '2026-09-20T10:00:00Z', action: 'Tracker initiated' },
      { id: 'h-202', date: '2026-10-28T11:00:00Z', action: 'Status moved to Ready to apply' },
    ],
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-10-28T11:00:00Z',
  },
  {
    id: 'app-003',
    scholarshipId: 'sch-010',
    scholarshipName: 'California Middle Class Scholarship (MCS)',
    provider: 'California Student Aid Commission (CSAC)',
    awardAmount: 4800,
    currency: 'USD',
    deadline: '2026-12-15',
    status: 'Submitted',
    priority: 'medium',
    submissionDate: '2026-10-18',
    referenceNumber: 'CSAC-MCS-489021',
    notes: 'FAFSA completed and Cal Grant / MCS roster updated by financial aid office.',
    checklist: [
      { id: 'chk-301', title: 'Submit 2026-2027 FAFSA', completed: true },
      { id: 'chk-302', title: 'Verify WebGrants4Students profile', completed: true },
      { id: 'chk-303', title: 'Confirm full-time enrollment status', completed: true },
    ],
    attachedDocIds: [],
    reminders: [
      { id: 'rem-301', title: 'Check WebGrants portal for award determination', date: '2026-12-01', completed: false }
    ],
    history: [
      { id: 'h-301', date: '2026-10-05T08:30:00Z', action: 'Created application tracker' },
      { id: 'h-302', date: '2026-10-18T16:45:00Z', action: 'Marked as Submitted via FAFSA portal', note: 'Reference: CSAC-MCS-489021' },
    ],
    createdAt: '2026-10-05T08:30:00Z',
    updatedAt: '2026-10-18T16:45:00Z',
  },
  {
    id: 'app-004',
    scholarshipId: 'sch-009',
    scholarshipName: 'Adobe Research Women-in-Technology Scholarship',
    provider: 'Adobe Systems',
    awardAmount: 10000,
    currency: 'USD',
    deadline: '2026-11-28',
    status: 'Interested',
    priority: 'medium',
    notes: 'Requires strong technical portfolio showcasing innovative computing work.',
    checklist: [
      { id: 'chk-401', title: 'Select best 2 GitHub repositories', completed: false },
      { id: 'chk-402', title: 'Write statement on computing vision', completed: false, requiredDocCategory: 'Statement of Purpose' },
      { id: 'chk-403', title: 'Obtain university transcript', completed: false, requiredDocCategory: 'Academic marksheets' },
    ],
    attachedDocIds: [],
    reminders: [],
    history: [
      { id: 'h-401', date: '2026-10-25T11:00:00Z', action: 'Saved to Interested applications' }
    ],
    createdAt: '2026-10-25T11:00:00Z',
    updatedAt: '2026-10-25T11:00:00Z',
  }
];

interface ApplicationStore {
  applications: ApplicationRecord[];
  addApplicationFromScholarship: (scholarship: Scholarship, initialStatus?: ApplicationStatus) => ApplicationRecord;
  updateApplicationStatus: (id: string, newStatus: ApplicationStatus, note?: string) => void;
  updateApplicationDetails: (id: string, updates: Partial<ApplicationRecord>) => void;
  deleteApplication: (id: string) => void;
  toggleChecklistItem: (appId: string, checklistId: string) => void;
  addChecklistItem: (appId: string, title: string, requiredDocCategory?: string) => void;
  deleteChecklistItem: (appId: string, checklistId: string) => void;
  addReminder: (appId: string, reminder: Omit<ApplicationReminder, 'id' | 'completed'>) => void;
  toggleReminder: (appId: string, reminderId: string) => void;
  deleteReminder: (appId: string, reminderId: string) => void;
  linkDocumentToApplication: (appId: string, docId: string) => void;
  unlinkDocumentFromApplication: (appId: string, docId: string) => void;
  setAllApplications: (apps: ApplicationRecord[]) => void;
}

export const useApplicationStore = create<ApplicationStore>((set, get) => ({
  applications: loadFromLocalStorage<ApplicationRecord[]>(STORAGE_KEY, INITIAL_APPLICATIONS),

  addApplicationFromScholarship: (scholarship, initialStatus = 'Interested') => {
    const existing = get().applications.find((a) => a.scholarshipId === scholarship.id);
    if (existing) {
      return existing;
    }

    const newApp: ApplicationRecord = {
      id: `app-${Date.now()}`,
      scholarshipId: scholarship.id,
      scholarshipName: scholarship.name,
      provider: scholarship.provider,
      awardAmount: scholarship.awardAmount,
      currency: scholarship.currency,
      deadline: scholarship.applicationDeadline,
      status: initialStatus,
      priority: 'medium',
      notes: '',
      checklist: scholarship.requiredDocuments.map((doc, idx) => ({
        id: `chk-${Date.now()}-${idx}`,
        title: `Prepare: ${doc}`,
        completed: false,
        requiredDocCategory: doc,
      })),
      attachedDocIds: [],
      reminders: [],
      history: [
        {
          id: `h-${Date.now()}`,
          date: new Date().toISOString(),
          action: `Started application tracker in status "${initialStatus}"`,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newApp, ...get().applications];
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ applications: updated });
    return newApp;
  },

  updateApplicationStatus: (id, newStatus, note) => {
    const updated = get().applications.map((app) => {
      if (app.id !== id) return app;
      const historyEntry = {
        id: `h-${Date.now()}`,
        date: new Date().toISOString(),
        action: `Status updated from "${app.status}" to "${newStatus}"`,
        note,
      };
      return {
        ...app,
        status: newStatus,
        submissionDate: newStatus === 'Submitted' && !app.submissionDate ? toLocalDateString(new Date()) : app.submissionDate,
        updatedAt: new Date().toISOString(),
        history: [historyEntry, ...app.history],
      };
    });

    saveToLocalStorage(STORAGE_KEY, updated);
    set({ applications: updated });
  },

  updateApplicationDetails: (id, updates) => {
    const updated = get().applications.map((app) => {
      if (app.id !== id) return app;
      return {
        ...app,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
    });
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ applications: updated });
  },

  deleteApplication: (id) => {
    const updated = get().applications.filter((a) => a.id !== id);
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ applications: updated });
  },

  toggleChecklistItem: (appId, checklistId) => {
    const updated = get().applications.map((app) => {
      if (app.id !== appId) return app;
      const newChecklist = app.checklist.map((item) => {
        if (item.id === checklistId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      return {
        ...app,
        checklist: newChecklist,
        updatedAt: new Date().toISOString(),
      };
    });
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ applications: updated });
  },

  addChecklistItem: (appId, title, requiredDocCategory) => {
    const updated = get().applications.map((app) => {
      if (app.id !== appId) return app;
      const newItem: ApplicationChecklistItem = {
        id: `chk-${Date.now()}`,
        title,
        completed: false,
        requiredDocCategory,
      };
      return {
        ...app,
        checklist: [...app.checklist, newItem],
        updatedAt: new Date().toISOString(),
      };
    });
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ applications: updated });
  },

  deleteChecklistItem: (appId, checklistId) => {
    const updated = get().applications.map((app) => {
      if (app.id !== appId) return app;
      return {
        ...app,
        checklist: app.checklist.filter((item) => item.id !== checklistId),
        updatedAt: new Date().toISOString(),
      };
    });
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ applications: updated });
  },

  addReminder: (appId, reminder) => {
    const updated = get().applications.map((app) => {
      if (app.id !== appId) return app;
      const newReminder: ApplicationReminder = {
        ...reminder,
        id: `rem-${Date.now()}`,
        completed: false,
      };
      return {
        ...app,
        reminders: [...app.reminders, newReminder],
        updatedAt: new Date().toISOString(),
      };
    });
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ applications: updated });
  },

  toggleReminder: (appId, reminderId) => {
    const updated = get().applications.map((app) => {
      if (app.id !== appId) return app;
      return {
        ...app,
        reminders: app.reminders.map((rem) =>
          rem.id === reminderId ? { ...rem, completed: !rem.completed } : rem
        ),
        updatedAt: new Date().toISOString(),
      };
    });
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ applications: updated });
  },

  deleteReminder: (appId, reminderId) => {
    const updated = get().applications.map((app) => {
      if (app.id !== appId) return app;
      return {
        ...app,
        reminders: app.reminders.filter((rem) => rem.id !== reminderId),
        updatedAt: new Date().toISOString(),
      };
    });
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ applications: updated });
  },

  linkDocumentToApplication: (appId, docId) => {
    const updated = get().applications.map((app) => {
      if (app.id !== appId) return app;
      if (app.attachedDocIds.includes(docId)) return app;
      return {
        ...app,
        attachedDocIds: [...app.attachedDocIds, docId],
        updatedAt: new Date().toISOString(),
      };
    });
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ applications: updated });
  },

  unlinkDocumentFromApplication: (appId, docId) => {
    const updated = get().applications.map((app) => {
      if (app.id !== appId) return app;
      return {
        ...app,
        attachedDocIds: app.attachedDocIds.filter((id) => id !== docId),
        updatedAt: new Date().toISOString(),
      };
    });
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ applications: updated });
  },

  setAllApplications: (apps) => {
    saveToLocalStorage(STORAGE_KEY, apps);
    set({ applications: apps });
  },
}));
