import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderArchive,
  Upload,
  FileText,
  Eye,
  Download,
  Trash2,
  Edit2,
  Check,
  X,
  ShieldCheck,
  HardDrive,
  AlertCircle,
  ScrollText,
  ArrowRight,
} from 'lucide-react';
import { useDocumentStore } from '../store/useDocumentStore';
import { DocumentCategory, StoredDocumentMeta } from '../types/document';
import { formatFileSize, formatDate } from '../utils/formatters';
import { DocumentUploadModal } from '../components/documents/DocumentUploadModal';
import { DocumentPreviewModal } from '../components/documents/DocumentPreviewModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { Badge } from '../components/common/Badge';

const CATEGORIES: DocumentCategory[] = [
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

export const DocumentVaultPage: React.FC = () => {
  const {
    documents,
    isLoading,
    openPreview,
    downloadDocument,
    removeDocument,
    renameDocument,
    clearAll,
  } = useDocumentStore();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState('');
  const [deletingDoc, setDeletingDoc] = useState<StoredDocumentMeta | null>(null);

  const filteredDocs = documents.filter((doc) => {
    if (selectedCategory !== 'all' && doc.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const totalVaultSize = documents.reduce((acc, curr) => acc + curr.size, 0);

  const handleStartRename = (doc: StoredDocumentMeta) => {
    setEditingId(doc.id);
    setEditNameValue(doc.name);
  };

  const handleSaveRename = async (id: string) => {
    if (editNameValue.trim()) {
      await renameDocument(id, editNameValue.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Area Switcher Tabs: Vault vs Application Templates */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <span className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-900 dark:bg-emerald-600 text-white shadow-2xs flex items-center gap-1.5">
          <FolderArchive className="w-3.5 h-3.5" />
          <span>Uploaded Files Vault</span>
        </span>
        <Link
          to="/templates"
          className="px-3.5 py-1.5 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <ScrollText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Application Essay Templates</span>
        </Link>
      </div>

      {/* Cross-Link Banner for Application Templates */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent dark:from-emerald-950/40 dark:via-slate-900 dark:to-transparent border border-emerald-500/20 dark:border-emerald-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0">
            <ScrollText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Looking for Statement of Purpose & Essay Frameworks?
            </p>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
              Access the new **Application Templates** section to view, copy, and adapt structured essay models (personal statements, leadership, financial need).
            </p>
          </div>
        </div>
        <Link
          to="/templates"
          className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shrink-0 shadow-2xs flex items-center gap-1.5"
        >
          <span>Explore Essay Templates</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Informational Offline Banner */}
      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-emerald-950 dark:text-emerald-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              100% Client-Side Local Document Vault (IndexedDB)
            </p>
            <p className="text-[11px] sm:text-xs text-emerald-800 dark:text-emerald-300">
              Your sensitive transcripts, tax slips, and identity papers are never transmitted over the internet or saved to remote databases. They remain strictly on this browser.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-900 dark:text-emerald-300 bg-white/70 dark:bg-slate-900/80 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 shrink-0">
          <HardDrive className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{formatFileSize(totalVaultSize)} Used</span>
        </div>
      </div>

      {/* Toolbar: Category Filter & Upload CTA */}
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 transition-colors">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Vault ({documents.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = documents.filter((d) => d.category === cat).length;
            if (count === 0 && selectedCategory !== cat) return null;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <EmptyState
          icon={FolderArchive}
          title="No documents in this category"
          description="Upload your identity proof, marksheets, income slips, or recommendation letters for easy reuse across all applications."
          action={{
            label: 'Upload First Document',
            onClick: () => setShowUploadModal(true),
            icon: <Upload className="w-4 h-4" />,
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => {
            const isEditing = editingId === doc.id;
            return (
              <div
                key={doc.id}
                className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge variant="emerald" size="sm">
                      {doc.category}
                    </Badge>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                      {formatFileSize(doc.size)}
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="flex items-center gap-1 mb-2">
                      <input
                        type="text"
                        value={editNameValue}
                        onChange={(e) => setEditNameValue(e.target.value)}
                        className="flex-1 px-2 py-1 text-xs border border-emerald-500 rounded-lg focus:outline-hidden bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                      />
                      <button
                        onClick={() => handleSaveRename(doc.id)}
                        className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2 mb-1 group">
                      <h3
                        className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate flex-1"
                        title={doc.name}
                      >
                        {doc.name}
                      </h3>
                      <button
                        onClick={() => handleStartRename(doc)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-opacity"
                        title="Rename file"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {doc.notes && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 italic mb-2">
                      "{doc.notes}"
                    </p>
                  )}

                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    Uploaded: {formatDate(doc.uploadedAt)}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openPreview(doc.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => downloadDocument(doc.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDeletingDoc(doc)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Delete document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />

      {/* Preview Modal */}
      <DocumentPreviewModal />

      {/* Delete Confirmation */}
      {deletingDoc && (
        <ConfirmDialog
          isOpen={Boolean(deletingDoc)}
          onClose={() => setDeletingDoc(null)}
          onConfirm={async () => {
            if (deletingDoc) {
              await removeDocument(deletingDoc.id);
              setDeletingDoc(null);
            }
          }}
          title="Delete Document"
          message={`Are you sure you want to delete "${deletingDoc.name}"? It will be permanently removed from your browser's IndexedDB storage.`}
          confirmLabel="Delete Document"
          isDestructive={true}
        />
      )}
    </div>
  );
};
