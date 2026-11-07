import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { ApplicationRecord, ApplicationStatus } from '../../types/application';
import { formatCurrency, formatRelativeDeadline } from '../../utils/formatters';
import { Badge } from '../common/Badge';

interface ApplicationKanbanProps {
  applications: ApplicationRecord[];
  onStatusChange: (id: string, newStatus: ApplicationStatus) => void;
}

const KANBAN_COLUMNS: { status: ApplicationStatus; label: string; color: string }[] = [
  { status: 'Interested', label: 'Interested', color: 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' },
  { status: 'Preparing', label: 'Preparing Docs', color: 'border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300' },
  { status: 'Ready to apply', label: 'Ready to Apply', color: 'border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300' },
  { status: 'Submitted', label: 'Submitted', color: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300' },
  { status: 'Under review', label: 'Under Review', color: 'border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300' },
  { status: 'Approved', label: 'Approved & Awarded', color: 'border-green-400 dark:border-green-800 bg-green-50 dark:bg-green-950/40 text-green-900 dark:text-green-300' },
  { status: 'Rejected', label: 'Rejected', color: 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300' },
  { status: 'Withdrawn', label: 'Withdrawn', color: 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' },
];

export const ApplicationKanban: React.FC<ApplicationKanbanProps> = ({
  applications,
  onStatusChange,
}) => {
  const getNextStatus = (current: ApplicationStatus): ApplicationStatus | null => {
    const sequence: ApplicationStatus[] = [
      'Interested',
      'Preparing',
      'Ready to apply',
      'Submitted',
      'Under review',
      'Approved',
    ];
    const idx = sequence.indexOf(current);
    if (idx !== -1 && idx < sequence.length - 1) return sequence[idx + 1];
    return null;
  };

  const getPrevStatus = (current: ApplicationStatus): ApplicationStatus | null => {
    const sequence: ApplicationStatus[] = [
      'Interested',
      'Preparing',
      'Ready to apply',
      'Submitted',
      'Under review',
      'Approved',
    ];
    const idx = sequence.indexOf(current);
    if (idx > 0) return sequence[idx - 1];
    return null;
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
      {KANBAN_COLUMNS.map((col) => {
        const colApps = applications.filter((a) => a.status === col.status);

        return (
          <div
            key={col.status}
            className="w-80 shrink-0 bg-slate-50/70 dark:bg-[#101828]/80 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 flex flex-col max-h-[calc(100vh-280px)] transition-colors"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${col.color}`}>
                  {col.label}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {colApps.length}
                </span>
              </div>
            </div>

            {/* Column Cards Container */}
            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
              {colApps.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-white/40 dark:bg-slate-900/40">
                  No applications in this stage
                </div>
              ) : (
                colApps.map((app) => {
                  const deadlineInfo = formatRelativeDeadline(app.deadline);
                  const completedChecklist = app.checklist.filter((c) => c.completed).length;
                  const totalChecklist = app.checklist.length;
                  const next = getNextStatus(app.status);
                  const prev = getPrevStatus(app.status);

                  return (
                    <div
                      key={app.id}
                      className="bg-white dark:bg-[#101828] rounded-xl border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 p-4 shadow-2xs hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                          {app.provider}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white shrink-0">
                          {formatCurrency(app.awardAmount, app.currency)}
                        </span>
                      </div>

                      <Link
                        to={`/applications/${app.id}`}
                        className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 block leading-snug mb-3"
                      >
                        {app.scholarshipName}
                      </Link>

                      {/* Checklist Progress Bar */}
                      {totalChecklist > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              Checklist
                            </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                              {completedChecklist}/{totalChecklist}
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-emerald-500 h-1.5 rounded-full transition-all"
                              style={{
                                width: `${Math.round((completedChecklist / totalChecklist) * 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Deadline info */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span
                          className={`flex items-center gap-1 font-medium ${
                            deadlineInfo.urgent ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''
                          }`}
                        >
                          <Calendar className="w-3 h-3" />
                          {deadlineInfo.text}
                        </span>

                        {/* Move Status Controls */}
                        <div className="flex items-center gap-1">
                          {prev && (
                            <button
                              type="button"
                              onClick={() => onStatusChange(app.id, prev)}
                              title={`Move back to ${prev}`}
                              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {next && (
                            <button
                              type="button"
                              onClick={() => onStatusChange(app.id, next)}
                              title={`Advance to ${next}`}
                              className="p-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 rounded hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
