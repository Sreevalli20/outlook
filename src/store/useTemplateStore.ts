import { create } from 'zustand';
import { EssayTemplate, UserAdaptedDraft } from '../types/template';
import { ESSAY_TEMPLATES_DATA } from '../data/essayTemplatesData';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

const STORAGE_KEY = 'grantly_user_essay_drafts';

const INITIAL_DRAFTS: UserAdaptedDraft[] = [
  {
    id: 'draft-001',
    templateId: 'tmpl-personal-statement',
    templateTitle: 'Comprehensive Personal Statement (The Journey & Purpose Framework)',
    title: 'Personal Statement Draft (Google Generation CS)',
    content: `Growing up in San Francisco, my interest in Computer Science was shaped by a simple yet persistent observation: how software tools could democratize educational opportunities for students who could not afford private tutoring. While many perceived coding merely as software products, I saw an opportunity to explore how distributed systems and web accessibility could create practical, measurable solutions.

During my studies at State Polytechnic University, I transitioned this theoretical curiosity into disciplined action. In my coursework and independent projects, particularly my automated scholarship match algorithm, I investigated heuristic data parsing. When faced with inconsistent input document schemas, I engineered a robust local validation pipeline. This endeavor not only deepened my technical command of TypeScript and React, but also cemented my commitment to high-reliability software.

However, my trajectory has not been devoid of friction. As a first-generation college student, balancing academic demands with working part-time required exceptional prioritization. Rather than viewing these constraints as liabilities, they refined my capacity for perseverance and purposeful time management.

Receiving this educational scholarship will significantly alleviate the financial obligations that currently constrain my academic focus. It will allow me to dedicate my full energy to advanced research and open-source contributions. With this investment, I aspire to lead inclusive computing initiatives, creating a compounding return for the community that supported my education.`,
    targetApplicationId: 'app-001',
    updatedAt: '2026-11-01T12:00:00Z',
  }
];

interface TemplateStore {
  templates: EssayTemplate[];
  drafts: UserAdaptedDraft[];
  selectedTemplateId: string;
  setSelectedTemplateId: (id: string) => void;
  saveDraft: (draft: Omit<UserAdaptedDraft, 'id' | 'updatedAt'> & { id?: string }) => UserAdaptedDraft;
  deleteDraft: (id: string) => void;
  getDraftsForApplication: (appId: string) => UserAdaptedDraft[];
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: ESSAY_TEMPLATES_DATA,
  drafts: loadFromLocalStorage<UserAdaptedDraft[]>(STORAGE_KEY, INITIAL_DRAFTS),
  selectedTemplateId: 'tmpl-personal-statement',

  setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),

  saveDraft: (draftData) => {
    const drafts = get().drafts;
    const now = new Date().toISOString();
    let updatedDraft: UserAdaptedDraft;

    if (draftData.id) {
      // Update existing
      updatedDraft = {
        ...draftData,
        id: draftData.id,
        updatedAt: now,
      } as UserAdaptedDraft;
      const updatedList = drafts.map((d) => (d.id === draftData.id ? updatedDraft : d));
      saveToLocalStorage(STORAGE_KEY, updatedList);
      set({ drafts: updatedList });
    } else {
      // Create new
      updatedDraft = {
        ...draftData,
        id: `draft-${Date.now()}`,
        updatedAt: now,
      } as UserAdaptedDraft;
      const updatedList = [updatedDraft, ...drafts];
      saveToLocalStorage(STORAGE_KEY, updatedList);
      set({ drafts: updatedList });
    }

    return updatedDraft;
  },

  deleteDraft: (id) => {
    const updated = get().drafts.filter((d) => d.id !== id);
    saveToLocalStorage(STORAGE_KEY, updated);
    set({ drafts: updated });
  },

  getDraftsForApplication: (appId) => {
    return get().drafts.filter((d) => d.targetApplicationId === appId);
  },
}));
