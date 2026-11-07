import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Search,
  Sparkles,
  ShieldCheck,
  FolderArchive,
  CalendarDays,
  ArrowRight,
  CheckCircle,
  Building2,
  TrendingUp,
  Award,
  Layers,
  Compass,
} from 'lucide-react';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import { formatCurrency, formatRelativeDeadline } from '../utils/formatters';
import { Badge } from '../components/common/Badge';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const featuredScholarships = SCHOLARSHIPS_DATA.filter((s) => s.isFeatured).slice(0, 3);
  const recentScholarships = SCHOLARSHIPS_DATA.slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedCourse !== 'All') params.set('course', selectedCourse);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    navigate(`/scholarships?${params.toString()}`);
  };

  const categories = [
    { title: 'STEM & Engineering', count: 6, icon: Award, slug: 'STEM' },
    { title: 'Merit-Based Awards', count: 5, icon: TrendingUp, slug: 'Merit' },
    { title: 'Need-Based Grants', count: 5, icon: ShieldCheck, slug: 'Need-Based' },
    { title: 'Women in Technology', count: 3, icon: Sparkles, slug: 'Women in Tech' },
    { title: 'Research & Postgrad', count: 4, icon: Layers, slug: 'Research' },
    { title: 'Undergraduate Programs', count: 8, icon: GraduationCap, slug: 'level=Undergraduate' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col transition-colors">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#101828]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-black text-xl text-slate-900 dark:text-white tracking-tight">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span>
              GRANT<span className="text-emerald-600 dark:text-emerald-400">LY</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Link to="/scholarships" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Find Scholarships
            </Link>
            <Link to="/eligibility" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              Smart Matcher
            </Link>
            <Link to="/compare" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Compare
            </Link>
            <Link to="/dashboard" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Student Workspace
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 rounded-xl transition-all shadow-xs hover:shadow-md flex items-center gap-2"
            >
              <span>Open Workspace</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 dark:text-white" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white dark:from-[#101828] via-slate-50 dark:via-[#0B1120] to-[#F8FAFC] dark:to-[#0B1120] border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-6 tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>UNIFIED SCHOLARSHIP DISCOVERY & MANAGEMENT PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
            Find Opportunities.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-400 dark:to-teal-300">
              Unlock Your Future.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            GRANTLY helps students discover verified educational funding, verify real eligibility with smart criteria matching, securely manage documents offline, and monitor every deadline from one unified cockpit.
          </p>

          {/* Prominent Multi-Filter Search Bar */}
          <div className="mt-10 max-w-4xl mx-auto bg-white dark:bg-[#101828] p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 text-left">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Keyword Search */}
              <div className="sm:col-span-5 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Scholarship name, keyword, or organization..."
                  className="w-full pl-10 pr-3 py-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium text-slate-900 dark:text-white"
                />
              </div>

              {/* Course Stream */}
              <div className="sm:col-span-3">
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full py-3 px-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800 dark:text-slate-200"
                >
                  <option value="All">All Disciplines</option>
                  <option value="Computer Science">Computer Science / Tech</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medicine">Medicine & Health</option>
                  <option value="Business">Business & Management</option>
                  <option value="Humanities">Humanities & Social Sciences</option>
                </select>
              </div>

              {/* Category */}
              <div className="sm:col-span-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-3 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                >
                  <option value="All">All Types</option>
                  <option value="Merit">Merit</option>
                  <option value="Need-Based">Need-Based</option>
                  <option value="STEM">STEM</option>
                  <option value="Women in Tech">Women in Tech</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            <div className="mt-3 px-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Trending searches:</span>
              <button
                type="button"
                onClick={() => navigate('/scholarships?q=Google')}
                className="hover:text-emerald-600 underline"
              >
                Google CS
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => navigate('/scholarships?category=Need-Based')}
                className="hover:text-emerald-600 underline"
              >
                Need-Based Grants
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => navigate('/scholarships?q=National+Merit')}
                className="hover:text-emerald-600 underline"
              >
                National Merit
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => navigate('/scholarships?q=Tata')}
                className="hover:text-emerald-600 underline"
              >
                Tata Trusts
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">{SCHOLARSHIPS_DATA.length}+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Verified Opportunities</p>
            </div>
            <div className="p-4 bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">$1.2M+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Total Local Funding Pool</p>
            </div>
            <div className="p-4 bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">100%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Offline Privacy First</p>
            </div>
            <div className="p-4 bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">0</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">External Trackers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Handpicked For Excellence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Featured Scholarship Programs
            </h2>
          </div>
          <Link
            to="/scholarships"
            className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1.5"
          >
            <span>View all 18 scholarships</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredScholarships.map((scholarship) => {
            const deadline = formatRelativeDeadline(scholarship.applicationDeadline);
            return (
              <div
                key={scholarship.id}
                className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="emerald" size="sm">
                      {scholarship.fundingType.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {scholarship.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
                    {scholarship.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {scholarship.provider}
                  </p>

                  <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">
                      Award Value
                    </span>
                    <p className="text-xl font-black text-slate-900 dark:text-white font-mono">
                      {formatCurrency(scholarship.awardAmount, scholarship.currency)}
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-1.5">
                        /{scholarship.awardType}
                      </span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2">
                    {scholarship.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {deadline.text}
                  </span>
                  <Link
                    to={`/scholarships/${scholarship.id}`}
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How GRANTLY Works */}
      <section className="py-16 bg-white dark:bg-[#101828] border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              How GRANTLY Powers Your Funding Journey
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Four structured pillars that take you from initial search to successful scholarship award.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Discover Opportunities</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Filter by academic discipline, merit cutoff, family income ceilings, and funding organization.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Smart Matcher</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Run deterministic rule-based checks against your student profile to know why you qualify or what is missing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Document Vault</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Store transcripts, income statements, and bonafides safely in IndexedDB on your device without server uploads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Track & Submit</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Move applications across Kanban columns, manage document checklists, and receive deadline calendar alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-8 text-center sm:text-left">
          Explore by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.slug}
                onClick={() =>
                  navigate(
                    `/scholarships?${
                      cat.slug.includes('=')
                        ? cat.slug
                        : `category=${encodeURIComponent(cat.slug)}`
                    }`
                  )
                }
                className="p-5 bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md cursor-pointer transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/60 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400">{cat.count} listings in dataset</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[#101828] text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500 text-slate-900 font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="text-white font-extrabold text-base tracking-tight">
              GRANT<span className="text-emerald-400">LY</span>
            </span>
            <span className="text-xs text-slate-400 ml-2">
              — Unified Scholarship Discovery & Management Platform
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold">
            <Link to="/dashboard" className="hover:text-emerald-400 transition-colors">
              Workspace
            </Link>
            <Link to="/scholarships" className="hover:text-emerald-400 transition-colors">
              Scholarships
            </Link>
            <Link to="/eligibility" className="hover:text-emerald-400 transition-colors">
              Eligibility Engine
            </Link>
            <Link to="/settings" className="hover:text-emerald-400 transition-colors">
              Settings & Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
