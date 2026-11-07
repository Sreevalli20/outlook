import { create } from 'zustand';
import { StoredDocumentMeta, DocumentCategory } from '../types/document';
import {
  getAllDocumentMetas,
  saveDocumentFile,
  deleteDocumentFile,
  renameDocumentFile,
  getDocumentFile,
  clearAllDocuments,
} from '../utils/indexedDB';

interface DocumentStore {
  documents: StoredDocumentMeta[];
  isLoading: boolean;
  selectedPreviewDocId: string | null;
  activePreviewBlobUrl: string | null;

  loadDocuments: () => Promise<void>;
  uploadDocument: (file: File, category: DocumentCategory, notes?: string) => Promise<{ success: boolean; error?: string }>;
  removeDocument: (id: string) => Promise<void>;
  renameDocument: (id: string, newName: string) => Promise<void>;
  downloadDocument: (id: string) => Promise<void>;
  openPreview: (id: string) => Promise<void>;
  closePreview: () => void;
  clearAll: () => Promise<void>;
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  isLoading: false,
  selectedPreviewDocId: null,
  activePreviewBlobUrl: null,

  loadDocuments: async () => {
    set({ isLoading: true });
    try {
      const metas = await getAllDocumentMetas();
      // Sort newest first
      metas.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
      set({ documents: metas });
    } catch (err) {
      console.error('[DocumentStore] Failed to load documents from IndexedDB', err);
    } finally {
      set({ isLoading: false });
    }
  },

  uploadDocument: async (file, category, notes) => {
    // Validation
    const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: 'File size exceeds maximum allowable limit of 15MB.' };
    }

    const ALLOWED_TYPES = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'text/plain',
    ];

    if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(pdf|jpe?g|png|webp|svg|txt)$/i)) {
      return {
        success: false,
        error: 'Unsupported file format. Please upload PDF documents or images (JPEG, PNG, WebP).',
      };
    }

    try {
      const id = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const payload = {
        id,
        name: file.name,
        category,
        size: file.size,
        mimeType: file.type || 'application/octet-stream',
        uploadedAt: new Date().toISOString(),
        linkedApplicationIds: [],
        notes: notes || '',
        data: file,
      };

      await saveDocumentFile(payload);
      await get().loadDocuments();
      return { success: true };
    } catch (err) {
      console.error('[DocumentStore] Upload failed', err);
      return { success: false, error: 'Failed to write document to local browser database.' };
    }
  },

  removeDocument: async (id) => {
    try {
      await deleteDocumentFile(id);
      if (get().selectedPreviewDocId === id) {
        get().closePreview();
      }
      await get().loadDocuments();
    } catch (err) {
      console.error('[DocumentStore] Delete failed', err);
    }
  },

  renameDocument: async (id, newName) => {
    try {
      await renameDocumentFile(id, newName);
      await get().loadDocuments();
    } catch (err) {
      console.error('[DocumentStore] Rename failed', err);
    }
  },

  downloadDocument: async (id) => {
    try {
      const doc = await getDocumentFile(id);
      if (!doc) return;
      const blob = doc.data instanceof Blob ? doc.data : new Blob([doc.data], { type: doc.mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error('[DocumentStore] Download failed', err);
    }
  },

  openPreview: async (id) => {
    try {
      // Revoke any previous URL
      const previousUrl = get().activePreviewBlobUrl;
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }

      const doc = await getDocumentFile(id);
      if (!doc) return;

      const blob = doc.data instanceof Blob ? doc.data : new Blob([doc.data], { type: doc.mimeType });
      const objectUrl = URL.createObjectURL(blob);
      set({ selectedPreviewDocId: id, activePreviewBlobUrl: objectUrl });
    } catch (err) {
      console.error('[DocumentStore] Preview failed', err);
    }
  },

  closePreview: () => {
    const currentUrl = get().activePreviewBlobUrl;
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }
    set({ selectedPreviewDocId: null, activePreviewBlobUrl: null });
  },

  clearAll: async () => {
    await clearAllDocuments();
    get().closePreview();
    set({ documents: [] });
  },
}));
