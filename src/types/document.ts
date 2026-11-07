export type DocumentCategory =
  | 'Identity proof'
  | 'Income certificate'
  | 'Caste/category certificate'
  | 'Academic marksheets'
  | 'Bonafide certificate'
  | 'Bank details'
  | 'Recommendation letter'
  | 'Statement of Purpose'
  | 'Other';

export interface StoredDocumentMeta {
  id: string;
  name: string;
  category: DocumentCategory;
  size: number; // in bytes
  mimeType: string;
  uploadedAt: string; // ISO
  linkedApplicationIds: string[];
  notes?: string;
}

export interface StoredDocumentPayload extends StoredDocumentMeta {
  data: Blob | ArrayBuffer;
}
