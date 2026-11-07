import React from 'react';
import { Download, X, FileText } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useDocumentStore } from '../../store/useDocumentStore';
import { formatFileSize } from '../../utils/formatters';

export const DocumentPreviewModal: React.FC = () => {
  const {
    selectedPreviewDocId,
    activePreviewBlobUrl,
    documents,
    closePreview,
    downloadDocument,
  } = useDocumentStore();

  const currentDoc = documents.find((d) => d.id === selectedPreviewDocId);

  if (!selectedPreviewDocId || !currentDoc) return null;

  const isImage = currentDoc.mimeType.startsWith('image/');
  const isPdf = currentDoc.mimeType === 'application/pdf';

  return (
    <Modal
      isOpen={Boolean(selectedPreviewDocId)}
      onClose={closePreview}
      title={currentDoc.name}
      subtitle={`${currentDoc.category} • ${formatFileSize(currentDoc.size)}`}
      maxWidth="4xl"
    >
      <div className="space-y-4">
        {/* Action Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs text-slate-500 font-mono">
            {currentDoc.mimeType}
          </span>
          <button
            type="button"
            onClick={() => downloadDocument(currentDoc.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Original</span>
          </button>
        </div>

        {/* Preview Frame */}
        <div className="bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center min-h-[420px] max-h-[600px] border border-slate-200">
          {activePreviewBlobUrl ? (
            isImage ? (
              <img
                src={activePreviewBlobUrl}
                alt={currentDoc.name}
                className="max-h-[560px] max-w-full object-contain p-2"
              />
            ) : isPdf ? (
              <iframe
                src={activePreviewBlobUrl}
                title={currentDoc.name}
                className="w-full h-[550px] border-none"
              />
            ) : (
              <div className="p-8 text-center">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-700">Preview not supported for this file type</p>
                <p className="text-xs text-slate-400 mt-1">Please use the Download button to view file contents.</p>
              </div>
            )
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              Loading document from browser IndexedDB...
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
