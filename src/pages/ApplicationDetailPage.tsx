import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Trash2,
  Plus,
  Bookmark,
  Bell,
  Save,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useApplicationStore } from '../store/useApplicationStore';
import { useScholarshipStore } from '../store/useScholarshipStore';
import { useDocumentStore } from '../store/useDocumentStore';
import { formatCurrency, formatDate, formatRelativeDeadline } from '../utils/formatters';
import { ApplicationStatus } from '../types/application';
import { Badge } from '../components/common/Badge';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

const STATUS_LIST: ApplicationStatus[] = [
  'Interested',
  'Preparing',
  'Ready to apply',
  'Submitted',
  'Under review',
  'Approved',
  'Rejected',
  'Withdrawn',
];

export const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    applications,
    updateApplicationStatus,
    updateApplicationDetails,
    toggleChecklistItem,
    addChecklistItem,
    deleteChecklistItem,
    addReminder,
    toggleReminder,
    deleteReminder,
    deleteApplication,
  } = useApplicationStore();

  const { scholarships } = useScholarshipStore();
  const { documents } = useDocumentStore();

  const app = applications.find((a) => a.id === id);
  const scholarship = scholarships.find((s) => s.id === app?.scholarshipId);

  const [notesDraft, setNotesDraft] = useState(app?.notes || '');
  const [refDraft, setRefDraft] = useState(app?.referenceNumber || '');
  const [submissionDateDraft, setSubmissionDateDraft] = useState(app?.submissionDate || '');
  const [newChecklistText, setNewChecklistText] = useState('');
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderDate, setNewReminderDate] = useState('');
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Keep editable drafts in sync when navigating between application records
  useEffect(() => {
    setNotesDraft(app?.notes || '');
    setRefDraft(app?.referenceNumber || '');
    setSubmissionDateDraft(app?.submissionDate || '');
  }, [app?.id, app?.notes, app?.referenceNumber, app?.submissionDate]);

  if (!app) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Application Not Found</h2>
        <p className="text-sm text-slate-500">The requested application tracker does not exist.</p>
        <Link
          to="/applications"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>
      </div>
    );
  }

  const deadlineInfo = formatRelativeDeadline(app.deadline);
  const completedChecklist = app.checklist.filter((c) => c.completed).length;

  const handleSaveDetails = () => {
    updateApplicationDetails(app.id, {
      notes: notesDraft,
      referenceNumber: refDraft,
      submissionDate: submissionDateDraft || undefined,
    });
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2000);
  };

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChecklistText.trim()) {
      addChecklistItem(app.id, newChecklistText.trim());
      setNewChecklistText('');
    }
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReminderTitle.trim() && newReminderDate) {
      addReminder(app.id, {
        title: newReminderTitle.trim(),
        date: newReminderDate,
      });
      setNewReminderTitle('');
      setNewReminderDate('');
    }
  };

  const handleConfirmDelete = () => {
    deleteApplication(app.id);
    navigate('/applications');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back button & Action controls */}
      <div className="flex items-center justify-between">
        <Link
          to="/applications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tracker Board</span>
        </Link>

        <button
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 p-2 rounded-lg hover:bg-rose-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Tracker</span>
        </button>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white dark:bg-[#101828] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 font-mono">
                Tracker ID: {app.id}
              </span>
              {scholarship && (
                <Link
                  to={`/scholarships/${scholarship.id}`}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Opportunity Specs</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {app.scholarshipName}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{app.provider}</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-left md:text-right shrink-0">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Award Amount
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {formatCurrency(app.awardAmount, app.currency)}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Deadline: {formatDate(app.deadline)}
            </span>
          </div>
        </div>

        {/* Status Stage Switcher Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-1">Current Status:</span>
            {STATUS_LIST.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => updateApplicationStatus(app.id, st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  app.status === st
                    ? 'bg-emerald-600 text-white shadow-xs scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <span
            className={`text-xs font-bold ${
              deadlineInfo.urgent ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {deadlineInfo.text}
          </span>
        </div>
      </div>

      {/* Main Split: Checklist & Reminders / Notes & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Documents Checklist & Field Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document & Task Checklist */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Required Application Checklist
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {completedChecklist} of {app.checklist.length} items completed
                </p>
              </div>
              <Link
                to="/documents"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Document Vault</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2">
              {app.checklist.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                    item.completed
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-slate-600 dark:text-slate-400'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100'
                  }`}
                >
                  <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(app.id, item.id)}
                      className="w-4 h-4 rounded-md accent-emerald-600 cursor-pointer"
                    />
                    <span
                      className={`text-xs font-medium truncate ${
                        item.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
                      }`}
                    >
                      {item.title}
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => deleteChecklistItem(app.id, item.id)}
                    className="p-1 text-slate-300 dark:text-slate-600 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Custom Checklist Item */}
            <form onSubmit={handleAddChecklist} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newChecklistText}
                onChange={(e) => setNewChecklistText(e.target.value)}
                placeholder="Add customized checklist task..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 rounded-xl transition-colors shrink-0"
              >
                Add Item
              </button>
            </form>
          </div>

          {/* Submission Details & Notes */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Submission Records & Notes</h2>
              <button
                type="button"
                onClick={handleSaveDetails}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                {isSavedFeedback ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                <span>{isSavedFeedback ? 'Saved' : 'Save Changes'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Confirmation / Reference Number
                </label>
                <input
                  type="text"
                  value={refDraft}
                  onChange={(e) => setRefDraft(e.target.value)}
                  placeholder="e.g. APP-2026-98124"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl font-mono focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Submission Date
                </label>
                <input
                  type="date"
                  value={submissionDateDraft}
                  onChange={(e) => setSubmissionDateDraft(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl font-mono focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Personal Application Notes & Essay Ideas
              </label>
              <textarea
                rows={4}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Write reminders about recommendation letters, portal login credentials, or essay themes..."
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Personal Reminders & Status Timeline History */}
        <div className="space-y-6">
          {/* Reminders Widget */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Personal Reminders</span>
            </h3>

            <div className="space-y-2">
              {app.reminders.length === 0 ? (
                <p className="text-xs text-slate-400 py-2">No personal reminders scheduled.</p>
              ) : (
                app.reminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <label className="flex items-center gap-2 cursor-pointer min-w-0 flex-1">
                      <input
                        type="checkbox"
                        checked={rem.completed}
                        onChange={() => toggleReminder(app.id, rem.id)}
                        className="w-3.5 h-3.5 accent-emerald-600"
                      />
                      <span className={`truncate ${rem.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                        {rem.title}
                      </span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono ml-2 shrink-0">
                      {rem.date}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteReminder(app.id, rem.id)}
                      className="p-1 text-slate-300 dark:text-slate-600 hover:text-rose-600 dark:hover:text-rose-400 ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add Reminder Form */}
            <form onSubmit={handleAddReminder} className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <input
                type="text"
                value={newReminderTitle}
                onChange={(e) => setNewReminderTitle(e.target.value)}
                placeholder="Reminder text..."
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  value={newReminderDate}
                  onChange={(e) => setNewReminderDate(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-lg font-mono"
                />
                <button
                  type="submit"
                  disabled={!newReminderTitle || !newReminderDate}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors"
                >
                  Set
                </button>
              </div>
            </form>
          </div>

          {/* Activity Timeline Audit History */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Status History</span>
            </h3>

            <div className="space-y-3 relative pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {app.history.map((h) => (
                <div key={h.id} className="relative text-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -left-[17px] top-1 ring-4 ring-white dark:ring-[#101828]" />
                  <p className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">{h.action}</p>
                  {h.note && <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{h.note}</p>}
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {formatDate(h.date)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <ConfirmDialog
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Application Tracker"
          message={`Are you sure you want to delete this application tracker for "${app.scholarshipName}"? All notes, checklist items, and history records will be removed.`}
          confirmLabel="Delete Forever"
          isDestructive={true}
        />
      )}
    </div>
  );
};
