import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle,
  Trash2,
  ExternalLink,
  Clock,
  ArrowUpDown,
} from 'lucide-react';
import { ApplicationRecord, ApplicationStatus } from '../../types/application';
import { formatCurrency, formatRelativeDeadline, formatDate } from '../../utils/formatters';
import { Badge } from '../common/Badge';

interface ApplicationTableProps {
  applications: ApplicationRecord[];
  onStatusChange: (id: string, newStatus: ApplicationStatus) => void;
  onDeleteRequest: (app: ApplicationRecord) => void;
}

const ALL_STATUSES: ApplicationStatus[] = [
  'Interested',
  'Preparing',
  'Ready to apply',
  'Submitted',
  'Under review',
  'Approved',
  'Rejected',
  'Withdrawn',
];

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  onStatusChange,
  onDeleteRequest,
}) => {
  return (
    <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4">Scholarship & Provider</th>
              <th className="py-3.5 px-4">Award Amount</th>
              <th className="py-3.5 px-4">Status Stage</th>
              <th className="py-3.5 px-4">Deadline</th>
              <th className="py-3.5 px-4">Checklist</th>
              <th className="py-3.5 px-4">Ref Number</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {applications.map((app) => {
              const deadlineInfo = formatRelativeDeadline(app.deadline);
              const completedCount = app.checklist.filter((c) => c.completed).length;

              return (
                <tr key={app.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <Link
                      to={`/applications/${app.id}`}
                      className="font-bold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors block text-sm"
                    >
                      {app.scholarshipName}
                    </Link>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">{app.provider}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {formatCurrency(app.awardAmount, app.currency)}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={app.status}
                      onChange={(e) => onStatusChange(app.id, e.target.value as ApplicationStatus)}
                      className="p-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      {ALL_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-medium ${
                        deadlineInfo.urgent ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {formatDate(app.deadline)}
                    </span>
                    <span className="block text-[11px] text-slate-400 dark:text-slate-500">
                      {deadlineInfo.text}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">
                      {completedCount}/{app.checklist.length}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-1">items</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {app.referenceNumber || '—'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/applications/${app.id}`}
                        className="px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-lg transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => onDeleteRequest(app)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete application"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
