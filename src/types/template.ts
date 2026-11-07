export type TemplateCategory =
  | 'Personal Statement'
  | 'Leadership'
  | 'Financial Need'
  | 'STEM & Innovation'
  | 'Community Service'
  | 'Career Vision';

export interface TemplateStructureSection {
  heading: string;
  recommendedLength: string;
  guidance: string;
}

export interface EssayTemplate {
  id: string;
  title: string;
  category: TemplateCategory;
  targetLength: string;
  description: string;
  structure: TemplateStructureSection[];
  content: string;
  tips: string[];
}

export interface UserAdaptedDraft {
  id: string;
  templateId: string;
  templateTitle: string;
  title: string;
  content: string;
  targetApplicationId?: string;
  updatedAt: string;
}
