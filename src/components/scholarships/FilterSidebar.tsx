import React from 'react';
import { Filter, RotateCcw, Search, Sparkles } from 'lucide-react';
import { useScholarshipStore } from '../../store/useScholarshipStore';
import { FundingType, ScholarshipCategory, AcademicLevel } from '../../types/scholarship';

const FUNDING_TYPES: { label: string; value: FundingType | 'all' }[] = [
  { label: 'All Funding', value: 'all' },
  { label: 'Government', value: 'government' },
  { label: 'Corporate', value: 'corporate' },
  { label: 'Private Trust', value: 'private' },
  { label: 'NGO / Non-profit', value: 'ngo' },
];

const CATEGORIES: { label: string; value: ScholarshipCategory | 'all' }[] = [
  { label: 'All Categories', value: 'all' },
  { label: 'Merit-Based', value: 'Merit' },
  { label: 'Need-Based', value: 'Need-Based' },
  { label: 'STEM & Engineering', value: 'STEM' },
  { label: 'Women in Tech', value: 'Women in Tech' },
  { label: 'Social Category / Reserved', value: 'Minority/Category' },
  { label: 'Research & Graduate', value: 'Research' },
  { label: 'First-Generation', value: 'First-Generation' },
  { label: 'Special Talent', value: 'Special Talent' },
];

const ACADEMIC_LEVELS: { label: string; value: AcademicLevel | 'all' }[] = [
  { label: 'All Levels', value: 'all' },
  { label: 'Undergraduate', value: 'Undergraduate' },
  { label: 'Postgraduate (Master)', value: 'Postgraduate' },
  { label: 'Doctoral / PhD', value: 'Doctoral' },
  { label: 'High School', value: 'High School' },
  { label: 'Diploma', value: 'Diploma' },
];

export const FilterSidebar: React.FC = () => {
  const { filters, setFilter, resetFilters } = useScholarshipStore();

  return (
    <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 space-y-6 shadow-2xs transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Filters & Criteria</h3>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Keyword Search */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Search Keywords
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilter('searchQuery', e.target.value)}
            placeholder="Name, course, provider..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-[#0B1120] focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Currently Open Opportunities Toggle */}
      <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-800/60 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-emerald-950 dark:text-emerald-200">Active Deadlines Only</p>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400">Hide closed/expired awards</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.openOnly}
            onChange={(e) => setFilter('openOnly', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
        </label>
      </div>

      {/* Funding Provider Type */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Funding Source
        </label>
        <select
          value={filters.fundingType}
          onChange={(e) => setFilter('fundingType', e.target.value as any)}
          className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
        >
          {FUNDING_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category / Discipline */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Category Focus
        </label>
        <select
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value as any)}
          className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Academic Level */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Academic Level
        </label>
        <select
          value={filters.academicLevel}
          onChange={(e) => setFilter('academicLevel', e.target.value as any)}
          className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
        >
          {ACADEMIC_LEVELS.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      {/* Course / Discipline */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Course / Discipline
        </label>
        <select
          value={filters.course}
          onChange={(e) => setFilter('course', e.target.value)}
          className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
        >
          <option value="all">All Disciplines</option>
          <option value="Computer Science">Computer Science / Tech</option>
          <option value="Engineering">Engineering</option>
          <option value="Medicine">Medicine & Health</option>
          <option value="Business">Business & Management</option>
          <option value="Humanities">Humanities & Social Sciences</option>
        </select>
      </div>

      {/* Minimum Academic Marks Cutoff */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Min Marks Cutoff
          </label>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
            {filters.minMarksThreshold}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={90}
          step={5}
          value={filters.minMarksThreshold}
          onChange={(e) => setFilter('minMarksThreshold', Number(e.target.value))}
          className="w-full accent-emerald-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
          <span>0% (All)</span>
          <span>50%</span>
          <span>75%</span>
          <span>90%</span>
        </div>
      </div>
    </div>
  );
};
