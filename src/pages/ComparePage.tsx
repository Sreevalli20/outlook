import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Columns3,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Calendar,
  CheckCircle2,
  FileText,
  DollarSign,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { useScholarshipStore } from '../store/useScholarshipStore';
import { useApplicationStore } from '../store/useApplicationStore';
import { formatCurrency, formatDate, formatRelativeDeadline } from '../utils/formatters';
import { EmptyState } from '../components/common/EmptyState';
import { Badge } from '../components/common/Badge';

export const ComparePage: React.FC = () => {
  const navigate = useNavigate();
  const { scholarships, comparedIds, removeFromCompare, clearCompare, toggleCompare } = useScholarshipStore();
  const { applications, addApplicationFromScholarship } = useApplicationStore();
  const [showPicker, setShowPicker] = useState(false);

  const comparedScholarships = scholarships.filter((s) => comparedIds.includes(s.id));
  const availableToAdd = scholarships.filter((s) => !comparedIds.includes(s.id));

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Compare Opportunities Matrix
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare up to 4 funding programs side by side across award amounts, criteria, and deadlines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {comparedScholarships.length < 4 && (
            <button
              type="button"
              onClick={() => setShowPicker(!showPicker)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Scholarship ({comparedScholarships.length}/4)</span>
            </button>
          )}

          {comparedScholarships.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Add Opportunity Quick Selector Drawer / Menu */}
      {showPicker && (
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Select a scholarship to add to comparison:
            </span>
            <button
              onClick={() => setShowPicker(false)}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-56 overflow-y-auto">
            {availableToAdd.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  toggleCompare(s.id);
                  if (comparedScholarships.length >= 3) {
                    setShowPicker(false);
                  }
                }}
                className="p-2.5 bg-white dark:bg-[#101828] border border-slate-200 dark:border-slate-750 hover:border-emerald-500 rounded-xl text-left hover:bg-emerald-50/20 dark:hover:bg-emerald-950/30 transition-all flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{s.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{s.provider}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 shrink-0 font-mono">
                  {formatCurrency(s.awardAmount, s.currency)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comparison Content */}
      {comparedScholarships.length === 0 ? (
        <EmptyState
          icon={Columns3}
          title="No scholarships selected for comparison"
          description="Select scholarships from the discovery catalog or click 'Add Scholarship' above to view differences side-by-side."
          action={{
            label: 'Browse Scholarships',
            onClick: () => navigate('/scholarships'),
            icon: <Columns3 className="w-4 h-4" />,
          }}
        />
      ) : (
        <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-slate-700 dark:text-slate-300 min-w-[700px]">
            <tbody>
              {/* Row: Scholarship Headers & Quick Actions */}
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60">
                <td className="p-4 w-48 font-bold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider align-top">
                  Scholarship
                </td>
                {comparedScholarships.map((s) => {
                  const existingApp = applications.find((a) => a.scholarshipId === s.id);
                  return (
                    <td key={s.id} className="p-4 align-top min-w-[220px]">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="emerald" size="sm">
                          {s.category}
                        </Badge>
                        <button
                          type="button"
                          onClick={() => removeFromCompare(s.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <Link
                        to={`/scholarships/${s.id}`}
                        className="font-bold text-sm text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 block leading-snug line-clamp-2"
                      >
                        {s.name}
                      </Link>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{s.provider}</p>

                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (!existingApp) {
                              addApplicationFromScholarship(s, 'Preparing');
                            }
                            navigate('/applications');
                          }}
                          className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-colors ${
                            existingApp
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {existingApp ? `Tracking (${existingApp.status})` : 'Track Application'}
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row: Award Value & Type */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider bg-slate-50/40 dark:bg-slate-900/40">
                  Award Value
                </td>
                {comparedScholarships.map((s) => (
                  <td key={s.id} className="p-4">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                      {formatCurrency(s.awardAmount, s.currency)}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block capitalize">
                      {s.awardType} payout
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row: Funding Source */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider bg-slate-50/40 dark:bg-slate-900/40">
                  Funding Type
                </td>
                {comparedScholarships.map((s) => (
                  <td key={s.id} className="p-4 font-medium capitalize text-slate-800 dark:text-slate-200">
                    {s.fundingType}
                  </td>
                ))}
              </tr>

              {/* Row: Academic Level */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider bg-slate-50/40 dark:bg-slate-900/40">
                  Eligible Levels
                </td>
                {comparedScholarships.map((s) => (
                  <td key={s.id} className="p-4 text-slate-700 dark:text-slate-300">
                    {s.academicLevel.join(', ')}
                  </td>
                ))}
              </tr>

              {/* Row: Minimum Marks Cutoff */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider bg-slate-50/40 dark:bg-slate-900/40">
                  Minimum Marks
                </td>
                {comparedScholarships.map((s) => (
                  <td key={s.id} className="p-4 font-bold text-slate-900 dark:text-white font-mono">
                    {s.minPercentageOrGpa}% Aggregate
                  </td>
                ))}
              </tr>

              {/* Row: Family Income Limits */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider bg-slate-50/40 dark:bg-slate-900/40">
                  Income Ceilings
                </td>
                {comparedScholarships.map((s) => (
                  <td key={s.id} className="p-4">
                    {s.maxAnnualIncome ? (
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        Max {formatCurrency(s.maxAnnualIncome, s.currency)} / year
                      </span>
                    ) : (
                      <span className="text-slate-400">No income restriction</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Eligible Courses */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider bg-slate-50/40 dark:bg-slate-900/40">
                  Eligible Courses
                </td>
                {comparedScholarships.map((s) => (
                  <td key={s.id} className="p-4">
                    <p className="line-clamp-2 text-slate-700 dark:text-slate-300">{s.eligibleCourses.join(', ')}</p>
                  </td>
                ))}
              </tr>

              {/* Row: Application Deadline */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider bg-slate-50/40 dark:bg-slate-900/40">
                  Deadline
                </td>
                {comparedScholarships.map((s) => {
                  const deadlineInfo = formatRelativeDeadline(s.applicationDeadline);
                  return (
                    <td key={s.id} className="p-4">
                      <span className="font-bold text-slate-900 dark:text-white block font-mono">
                        {formatDate(s.applicationDeadline)}
                      </span>
                      <span
                        className={`text-[11px] font-semibold ${
                          deadlineInfo.urgent ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {deadlineInfo.text}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Row: Required Documents */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider bg-slate-50/40 dark:bg-slate-900/40">
                  Required Documents
                </td>
                {comparedScholarships.map((s) => (
                  <td key={s.id} className="p-4">
                    <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-600 dark:text-slate-400">
                      {s.requiredDocuments.map((doc, idx) => (
                        <li key={idx} className="truncate">
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Row: Official Website */}
              <tr>
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider bg-slate-50/40 dark:bg-slate-900/40">
                  Official Website
                </td>
                {comparedScholarships.map((s) => (
                  <td key={s.id} className="p-4">
                    <a
                      href={s.officialWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1"
                    >
                      <span>Visit Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
