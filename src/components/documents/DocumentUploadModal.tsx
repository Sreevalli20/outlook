import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { DocumentCategory } from '../../types/document';
import { useDocumentStore } from '../../store/useDocumentStore';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: DocumentCategory;
}

const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  'Identity proof',
  'Income certificate',
  'Caste/category certificate',
  'Academic marksheets',
  'Bonafide certificate',
  'Bank details',
  'Recommendation letter',
  'Statement of Purpose',
  'Other',
];

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'Academic marksheets',
}) => {
  const { uploadDocument } = useDocumentStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<DocumentCategory>(defaultCategory);
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setErrorMessage(null);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    const result = await uploadDocument(selectedFile, category, notes);
    setIsUploading(false);

    if (result.success) {
      setSuccessMessage('Document securely stored in your local browser database!');
      setTimeout(() => {
        setSelectedFile(null);
        setNotes('');
        setSuccessMessage(null);
        onClose();
      }, 1000);
    } else {
      setErrorMessage(result.error || 'Failed to save document.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload to Document Vault"
      subtitle="Stored 100% locally in your browser's IndexedDB. No remote servers involved."
      maxWidth="md"
    >
      <form onSubmit={handleUploadSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* File Drop / Select Area */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Select Document
          </label>
          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl cursor-pointer bg-slate-50/70 hover:bg-emerald-50/20 transition-all text-center">
            <input
              type="file"
              accept=".pdf,image/png,image/jpeg,image/webp,.txt"
              onChange={handleFileChange}
              className="sr-only"
            />
            <div className="p-3 bg-white rounded-full shadow-2xs border border-slate-100 text-emerald-600 mb-2">
              <Upload className="w-5 h-5" />
            </div>
            {selectedFile ? (
              <div className="text-xs">
                <p className="font-bold text-slate-800">{selectedFile.name}</p>
                <p className="text-slate-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type || 'Document'}
                </p>
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                <p className="font-semibold text-slate-800 mb-1">Click to browse or drop file</p>
                <p className="text-[11px] text-slate-400">PDF, JPG, PNG, WebP up to 15MB</p>
              </div>
            )}
          </label>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Document Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as DocumentCategory)}
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            {DOCUMENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Notes / Tag (Optional)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Valid until 2027, Signed by Principal"
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedFile || isUploading}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {isUploading ? 'Saving...' : 'Save to Vault'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
