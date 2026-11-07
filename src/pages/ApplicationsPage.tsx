import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  KanbanSquare,
  Table as TableIcon,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  ScrollText,
} from 'lucide-react';
import { useApplicationStore } from '../store/useApplicationStore';
import { useScholarshipStore } from '../store/useScholarshipStore';
import { ApplicationKanban } from '../components/applications/ApplicationKanban';
import { ApplicationTable } from '../components/applications/ApplicationTable';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { ApplicationRecord, ApplicationStatus } from '../types/application';

export const ApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { applications, updateApplicationStatus, deleteApplication, addApplicationFromScholarship } = useApplicationStore();
  const { scholarships } = useScholarshipStore();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deletingApp, setDeletingApp] = useState<ApplicationRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = app.scholarshipName.toLowerCase().includes(query);
        const matchesProvider = app.provider.toLowerCase().includes(query);
        const matchesRef = (app.referenceNumber || '').toLowerCase().includes(query);
        if (!matchesName && !matchesProvider && !matchesRef) return false;
      }
      if (statusFilter !== 'all' && app.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [applications, searchQuery, statusFilter]);

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    updateApplicationStatus(id, newStatus);
  };

  const handleConfirmDelete = () => {
    if (deletingApp) {
      deleteApplication(deletingApp.id);
      setDeletingApp(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation tabs: Tracker vs Essay Templates */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <span className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-900 dark:bg-emerald-600 text-white shadow-2xs flex items-center gap-1.5">
          <KanbanSquare className="w-3.5 h-3.5" />
          <span>Application Tracker</span>
        </span>
        <Link
          to="/templates"
          className="px-3.5 py-1.5 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <ScrollText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Application Essay Templates</span>
        </Link>
      </div>

      {/* Top Header & Toolbar */}
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 transition-colors">
        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search active applications..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-[#0B1120] focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 text-xs font-medium bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Stages ({applications.length})</option>
            <option value="Interested">Interested</option>
            <option value="Preparing">Preparing Docs</option>
            <option value="Ready to apply">Ready to apply</option>
            <option value="Submitted">Submitted</option>
            <option value="Under review">Under review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* View Mode Toggle & Add Application Button */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl p-0.5 bg-slate-50 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              aria-label="Kanban board view"
              className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-800 shadow-2xs text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <KanbanSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              aria-label="Table list view"
              className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-800 shadow-2xs text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Track Scholarship</span>
          </button>
        </div>
      </div>

      {/* Main Content: Kanban vs Table */}
      {filteredApplications.length === 0 ? (
        <EmptyState
          icon={KanbanSquare}
          title="No applications found"
          description={
            applications.length === 0
              ? 'You are not tracking any scholarship applications yet. Pick an opportunity to start your application timeline.'
              : 'No tracked applications match your current query or stage filter.'
          }
          action={{
            label: 'Discover Scholarships',
            onClick: () => navigate('/scholarships'),
            icon: <Plus className="w-4 h-4" />,
          }}
        />
      ) : viewMode === 'kanban' ? (
        <ApplicationKanban
          applications={filteredApplications}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <ApplicationTable
          applications={filteredApplications}
          onStatusChange={handleStatusChange}
          onDeleteRequest={(app) => setDeletingApp(app)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingApp && (
        <ConfirmDialog
          isOpen={Boolean(deletingApp)}
          onClose={() => setDeletingApp(null)}
          onConfirm={handleConfirmDelete}
          title="Delete Application Tracker"
          message={`Are you sure you want to remove your application tracker for "${deletingApp.scholarshipName}"? Your saved checklist and notes will be deleted.`}
          confirmLabel="Delete Tracker"
          isDestructive={true}
        />
      )}

      {/* Add New Application Tracker Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Track a Scholarship Opportunity"
          subtitle="Choose an opportunity from the dataset to initialize an application tracker."
          maxWidth="lg"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {scholarships.map((sch) => {
              const alreadyTracked = applications.some((a) => a.scholarshipId === sch.id);
              return (
                <div
                  key={sch.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{sch.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{sch.provider}</p>
                  </div>
                  {alreadyTracked ? (
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                      Already Tracked
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const newApp = addApplicationFromScholarship(sch, 'Preparing');
                        setShowAddModal(false);
                        navigate(`/applications/${newApp.id}`);
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                    >
                      Track Now
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Modal>
      )}
    </div>
  );
};
