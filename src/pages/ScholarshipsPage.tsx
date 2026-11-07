import React, { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  LayoutGrid,
  List,
  ArrowUpDown,
  Filter,
  Search,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useScholarshipStore, SortOption } from '../store/useScholarshipStore';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { FilterSidebar } from '../components/scholarships/FilterSidebar';
import { EmptyState } from '../components/common/EmptyState';

export const ScholarshipsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const {
    scholarships,
    filters,
    setFilter,
    resetFilters,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
  } = useScholarshipStore();

  // Sync URL search params on mount
  useEffect(() => {
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    const course = searchParams.get('course');
    const level = searchParams.get('level');
    if (q) setFilter('searchQuery', q);
    if (category) setFilter('category', category as any);
    if (course) setFilter('course', course);
    if (level) setFilter('academicLevel', level as any);
  }, [searchParams]);

  // Apply all filters together deterministically
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((s) => {
      // 1. Text search
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = s.name.toLowerCase().includes(query);
        const matchesProvider = s.provider.toLowerCase().includes(query);
        const matchesDesc = s.shortDescription.toLowerCase().includes(query);
        const matchesCourse = s.eligibleCourses.some((c) => c.toLowerCase().includes(query));
        if (!matchesName && !matchesProvider && !matchesDesc && !matchesCourse) {
          return false;
        }
      }

      // 2. Funding Type
      if (filters.fundingType !== 'all' && s.fundingType !== filters.fundingType) {
        return false;
      }

      // 3. Category
      if (filters.category !== 'all' && s.category !== filters.category) {
        return false;
      }

      // 4. Academic Level
      if (
        filters.academicLevel !== 'all' &&
        !s.academicLevel.includes(filters.academicLevel as any)
      ) {
        return false;
      }

      // 5. Course / Discipline
      if (filters.course !== 'all') {
        const query = filters.course.toLowerCase();
        const matches = s.eligibleCourses.some(
          (c) =>
            c.toLowerCase() === 'any' ||
            c.toLowerCase().includes(query) ||
            query.includes(c.toLowerCase())
        );
        if (!matches) return false;
      }

      // 6. Min marks cutoff filter
      if (filters.minMarksThreshold > 0 && s.minPercentageOrGpa > filters.minMarksThreshold) {
        // Exclude scholarships whose requirement is higher than threshold
        return false;
      }

      // 6. Currently open only
      if (filters.openOnly) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadline = new Date(s.applicationDeadline);
        deadline.setHours(0, 0, 0, 0);
        if (deadline < today) return false;
      }

      return true;
    });
  }, [scholarships, filters]);

  // Sort results
  const sortedScholarships = useMemo(() => {
    const list = [...filteredScholarships];
    if (sortBy === 'deadline-asc') {
      list.sort(
        (a, b) => new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime()
      );
    } else if (sortBy === 'deadline-desc') {
      list.sort(
        (a, b) => new Date(b.applicationDeadline).getTime() - new Date(a.applicationDeadline).getTime()
      );
    } else if (sortBy === 'award-desc') {
      list.sort((a, b) => b.awardAmount - a.awardAmount);
    } else if (sortBy === 'award-asc') {
      list.sort((a, b) => a.awardAmount - b.awardAmount);
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [filteredScholarships, sortBy]);

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {sortedScholarships.length} Opportunities
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-400">
            (Filtered from {scholarships.length} total)
          </span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-xl px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="deadline-asc">Deadline: Earliest First</option>
              <option value="deadline-desc">Deadline: Furthest First</option>
              <option value="award-desc">Award Value: High to Low</option>
              <option value="award-asc">Award Value: Low to High</option>
              <option value="name-asc">Alphabetical (A - Z)</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl p-0.5 bg-slate-50 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-[#101828] shadow-2xs text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              aria-label="List view"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-[#101828] shadow-2xs text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Filter Sidebar (1 col on large screens) */}
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>

        {/* Scholarships Results (3 cols on large screens) */}
        <div className="lg:col-span-3">
          {sortedScholarships.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No scholarships match your filters"
              description="Try adjusting your keywords, widening the academic cutoff, or clearing active category filters."
              action={{
                label: 'Clear All Filters',
                onClick: resetFilters,
                icon: <RotateCcw className="w-4 h-4" />,
              }}
            />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedScholarships.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {sortedScholarships.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} viewMode="list" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
