import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Calendar,
  ExternalLink,
  PlusCircle,
  Check,
  CheckCircle,
  Building2,
  GraduationCap,
  ArrowRight,
  Columns3,
} from 'lucide-react';
import { Scholarship } from '../../types/scholarship';
import { Badge } from '../common/Badge';
import { formatCurrency, formatRelativeDeadline } from '../../utils/formatters';
import { useScholarshipStore } from '../../store/useScholarshipStore';
import { useApplicationStore } from '../../store/useApplicationStore';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  viewMode?: 'grid' | 'list';
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  scholarship,
  viewMode = 'grid',
}) => {
  const navigate = useNavigate();
  const { isSaved, toggleSaved, isCompared, toggleCompare } = useScholarshipStore();
  const { applications, addApplicationFromScholarship } = useApplicationStore();

  const saved = isSaved(scholarship.id);
  const compared = isCompared(scholarship.id);
  const deadlineInfo = formatRelativeDeadline(scholarship.applicationDeadline);

  const existingApp = applications.find((a) => a.scholarshipId === scholarship.id);

  const handleApplyTracker = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (existingApp) {
      navigate(`/applications/${existingApp.id}`);
    } else {
      const newApp = addApplicationFromScholarship(scholarship, 'Preparing');
      navigate(`/applications/${newApp.id}`);
    }
  };

  const fundingBadgeVariant = {
    government: 'emerald',
    corporate: 'blue',
    private: 'purple',
    ngo: 'amber',
    institutional: 'default',
  }[scholarship.fundingType] as any;

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant={fundingBadgeVariant} size="sm">
              {scholarship.fundingType.toUpperCase()}
            </Badge>
            <Badge variant="default" size="sm">
              {scholarship.category}
            </Badge>
            {scholarship.isFeatured && (
              <Badge variant="amber" size="sm">
                Featured
              </Badge>
            )}
          </div>

          <Link
            to={`/scholarships/${scholarship.id}`}
            className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors inline-block line-clamp-1"
          >
            {scholarship.name}
          </Link>

          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
            <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-400 dark:text-slate-500" />
            <span className="truncate">{scholarship.provider}</span>
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
            {scholarship.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
              {formatCurrency(scholarship.awardAmount, scholarship.currency)}
              <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                ({scholarship.awardType})
              </span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              Min {scholarship.minPercentageOrGpa}% marks
            </span>
            <span>•</span>
            <span
              className={`flex items-center gap-1 font-medium ${
                deadlineInfo.urgent ? 'text-amber-600 dark:text-amber-400 font-semibold' : deadlineInfo.isPast ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              {deadlineInfo.text} ({scholarship.applicationDeadline})
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            type="button"
            onClick={() => toggleCompare(scholarship.id)}
            title={compared ? 'Remove from compare' : 'Add to comparison'}
            className={`p-2 rounded-xl text-xs font-medium border transition-colors ${
              compared
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Columns3 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => toggleSaved(scholarship.id)}
            title={saved ? 'Remove bookmark' : 'Bookmark scholarship'}
            className={`p-2 rounded-xl text-xs font-medium border transition-colors ${
              saved
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleApplyTracker}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs ${
              existingApp
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {existingApp ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Tracking ({existingApp.status})</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Track Application</span>
              </>
            )}
          </button>

          <Link
            to={`/scholarships/${scholarship.id}`}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title="View Details"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Grid view mode
  return (
    <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Header Tags & Actions */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={fundingBadgeVariant} size="sm">
              {scholarship.fundingType.toUpperCase()}
            </Badge>
            <Badge variant="default" size="sm">
              {scholarship.category}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => toggleCompare(scholarship.id)}
              title={compared ? 'Remove from compare' : 'Compare'}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                compared
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Columns3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleSaved(scholarship.id)}
              title={saved ? 'Remove bookmark' : 'Bookmark'}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                saved
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Provider */}
        <Link
          to={`/scholarships/${scholarship.id}`}
          className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 block leading-snug"
        >
          {scholarship.name}
        </Link>
        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1 truncate">
          <Building2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
          <span className="truncate">{scholarship.provider}</span>
        </p>

        {/* Award Highlight */}
        <div className="my-3.5 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Award Value
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            {formatCurrency(scholarship.awardAmount, scholarship.currency)}
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-1.5">
              /{scholarship.awardType}
            </span>
          </div>
        </div>

        {/* Requirements Snippet */}
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 dark:text-slate-500">Academic Level:</span>
            <span className="font-medium text-slate-700 dark:text-slate-200 truncate max-w-[150px]">
              {scholarship.academicLevel.join(', ')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 dark:text-slate-500">Min Aggregate:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              {scholarship.minPercentageOrGpa}%
            </span>
          </div>
          {scholarship.maxAnnualIncome && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400 dark:text-slate-500">Max Income:</span>
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {formatCurrency(scholarship.maxAnnualIncome, scholarship.currency)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer: Deadline & Action */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-auto">
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            deadlineInfo.urgent
              ? 'text-amber-600 dark:text-amber-400 font-semibold'
              : deadlineInfo.isPast
              ? 'text-slate-400 dark:text-slate-500'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>{deadlineInfo.text}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleApplyTracker}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
              existingApp
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {existingApp ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Tracked</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Track</span>
              </>
            )}
          </button>
          <Link
            to={`/scholarships/${scholarship.id}`}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
