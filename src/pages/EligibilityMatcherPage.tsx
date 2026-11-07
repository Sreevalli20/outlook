import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  User,
  GraduationCap,
  DollarSign,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useStudentStore } from '../store/useStudentStore';
import { useScholarshipStore } from '../store/useScholarshipStore';
import { useApplicationStore } from '../store/useApplicationStore';
import { evaluateScholarshipEligibility } from '../utils/eligibilityEngine';
import { formatCurrency, formatRelativeDeadline } from '../utils/formatters';
import { Badge } from '../components/common/Badge';
import { EligibilityStatus } from '../types/scholarship';

export const EligibilityMatcherPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateAcademic, updateEligibility, updatePersonal } = useStudentStore();
  const { scholarships } = useScholarshipStore();
  const { applications, addApplicationFromScholarship } = useApplicationStore();

  const [activeTab, setActiveTab] = useState<EligibilityStatus | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Quick interactive parameter states that sync with profile
  const [interactiveMarks, setInteractiveMarks] = useState(profile.academic.marksPercentage || 85);
  const [interactiveIncome, setInteractiveIncome] = useState(profile.eligibility.annualFamilyIncome || 50000);
  const [interactiveCourse, setInteractiveCourse] = useState(profile.academic.course || 'Computer Science');
  const [interactiveLevel, setInteractiveLevel] = useState(profile.academic.academicLevel || 'Undergraduate');

  // Sync edits back to profile when requested
  const handleApplyParameters = () => {
    updateAcademic({
      marksPercentage: interactiveMarks,
      course: interactiveCourse,
      academicLevel: interactiveLevel,
    });
    updateEligibility({
      annualFamilyIncome: interactiveIncome,
    });
  };

  // Run the rule-based engine on all scholarships
  const evaluations = useMemo(() => {
    // Generate evaluations using current interactive parameters
    const evaluatedProfile = {
      ...profile,
      academic: {
        ...profile.academic,
        marksPercentage: interactiveMarks,
        course: interactiveCourse,
        academicLevel: interactiveLevel,
      },
      eligibility: {
        ...profile.eligibility,
        annualFamilyIncome: interactiveIncome,
      },
    };

    return scholarships.map((sch) => evaluateScholarshipEligibility(sch, evaluatedProfile));
  }, [scholarships, profile, interactiveMarks, interactiveIncome, interactiveCourse, interactiveLevel]);

  // Counts by status
  const counts = useMemo(() => {
    return {
      all: evaluations.length,
      eligible: evaluations.filter((e) => e.status === 'eligible').length,
      potentially_eligible: evaluations.filter((e) => e.status === 'potentially_eligible').length,
      not_eligible: evaluations.filter((e) => e.status === 'not_eligible').length,
      insufficient_info: evaluations.filter((e) => e.status === 'insufficient_info').length,
    };
  }, [evaluations]);

  // Filtered list
  const filteredEvaluations = useMemo(() => {
    if (activeTab === 'all') return evaluations;
    return evaluations.filter((e) => e.status === activeTab);
  }, [evaluations, activeTab]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title & Rule Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DETERMINISTIC EVALUATION ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Smart Scholarship Eligibility Matcher
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Unlike superficial matchers, GRANTLY uses formal deterministic boolean logic to evaluate your academic discipline, grade aggregate, household income brackets, institution types, and reservation categories against strict program criteria.
          </p>
        </div>
      </div>

      {/* Interactive Parameter Control Bar */}
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Live Eligibility Parameters</h2>
          </div>
          <button
            type="button"
            onClick={handleApplyParameters}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
          >
            Save to Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Marks Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <span>Academic Marks / Aggregate</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{interactiveMarks}%</span>
            </div>
            <input
              type="range"
              min={40}
              max={100}
              step={1}
              value={interactiveMarks}
              onChange={(e) => setInteractiveMarks(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Family Income */}
          <div>
            <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <span>Annual Household Income</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                ${interactiveIncome.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={250000}
              step={5000}
              value={interactiveIncome}
              onChange={(e) => setInteractiveIncome(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Academic Level */}
          <div>
            <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300">
              Current Academic Level
            </label>
            <select
              value={interactiveLevel}
              onChange={(e) => setInteractiveLevel(e.target.value as any)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Doctoral">Doctoral</option>
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>

          {/* Course Discipline */}
          <div>
            <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300">
              Field of Study
            </label>
            <select
              value={interactiveCourse}
              onChange={(e) => setInteractiveCourse(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Computer Science">Computer Science & IT</option>
              <option value="Engineering">General Engineering</option>
              <option value="Medicine">Medicine & Healthcare</option>
              <option value="Business">Business / Finance</option>
              <option value="Environmental Science">Environmental Science</option>
              <option value="Arts and Culture Management">Arts & Humanities</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4 Category Status Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Opportunities ({counts.all})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('eligible')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'eligible'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Eligible ({counts.eligible})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('potentially_eligible')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'potentially_eligible'
              ? 'bg-amber-600 text-white shadow-2xs'
              : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Potentially Eligible ({counts.potentially_eligible})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('not_eligible')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'not_eligible'
              ? 'bg-rose-600 text-white shadow-2xs'
              : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>Not Eligible ({counts.not_eligible})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('insufficient_info')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'insufficient_info'
              ? 'bg-purple-600 text-white shadow-2xs'
              : 'text-purple-700 bg-purple-50 hover:bg-purple-100'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Insufficient Info ({counts.insufficient_info})</span>
        </button>
      </div>

      {/* Evaluations List with Criteria Breakdown Accordions */}
      <div className="space-y-4">
        {filteredEvaluations.map((ev) => {
          const { scholarship, status, matchScore, passedCriteria, failedCriteria, missingCriteria, recommendationReason } = ev;
          const isExpanded = expandedId === scholarship.id;
          const existingApp = applications.find((a) => a.scholarshipId === scholarship.id);

          const statusBadgeConfig = {
            eligible: {
              badge: 'emerald',
              label: 'Eligible',
              icon: CheckCircle2,
              border: 'border-emerald-200',
              bg: 'bg-emerald-50/20',
            },
            potentially_eligible: {
              badge: 'amber',
              label: 'Potentially Eligible',
              icon: AlertTriangle,
              border: 'border-amber-200',
              bg: 'bg-amber-50/20',
            },
            not_eligible: {
              badge: 'rose',
              label: 'Not Eligible',
              icon: XCircle,
              border: 'border-rose-200',
              bg: 'bg-rose-50/10',
            },
            insufficient_info: {
              badge: 'purple',
              label: 'Insufficient Profile Info',
              icon: HelpCircle,
              border: 'border-purple-200',
              bg: 'bg-purple-50/20',
            },
          }[status] as any;

          const StatusIcon = statusBadgeConfig.icon;

          return (
            <div
              key={scholarship.id}
              className={`bg-white dark:bg-[#101828] rounded-2xl border ${statusBadgeConfig.border} dark:border-slate-800 shadow-2xs overflow-hidden transition-all`}
            >
              {/* Card Summary Header */}
              <div className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <Badge variant={statusBadgeConfig.badge} size="sm" icon={<StatusIcon className="w-3 h-3" />}>
                      {statusBadgeConfig.label}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
                      {matchScore}% criteria satisfied
                    </span>
                    <Badge variant="default" size="sm">
                      {scholarship.fundingType.toUpperCase()}
                    </Badge>
                  </div>

                  <Link
                    to={`/scholarships/${scholarship.id}`}
                    className="text-base font-bold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors inline-block leading-snug"
                  >
                    {scholarship.name}
                  </Link>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{scholarship.provider}</p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">
                    {recommendationReason}
                  </p>
                </div>

                {/* Right Summary: Award + CTAs */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white block font-mono">
                      {formatCurrency(scholarship.awardAmount, scholarship.currency)}
                    </span>
                    <span className="text-[11px] text-slate-400 capitalize">
                      {scholarship.awardType}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!existingApp) {
                        addApplicationFromScholarship(scholarship, 'Preparing');
                      }
                      navigate(`/applications`);
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-2xs"
                  >
                    {existingApp ? 'Tracked' : 'Track Application'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : scholarship.id)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="View criteria breakdown"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Detailed Breakdown Accordion */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Criterion-by-Criterion Evaluation Log
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Passed Criteria */}
                    {passedCriteria.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          Passed Requirements ({passedCriteria.length})
                        </span>
                        {passedCriteria.map((crit, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1"
                          >
                            <p className="font-bold text-slate-900 dark:text-white">{crit.criterion}</p>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                              {crit.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Failed Criteria */}
                    {failedCriteria.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-rose-800 dark:text-rose-400 flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                          Unmet Requirements ({failedCriteria.length})
                        </span>
                        {failedCriteria.map((crit, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-rose-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1"
                          >
                            <p className="font-bold text-slate-900 dark:text-white">{crit.criterion}</p>
                            <p className="text-[11px] text-rose-700 dark:text-rose-400 leading-relaxed">
                              {crit.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Missing Criteria */}
                    {missingCriteria.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          Information Needed From Profile ({missingCriteria.length})
                        </span>
                        {missingCriteria.map((crit, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1"
                          >
                            <p className="font-bold text-slate-900 dark:text-white">{crit.criterion}</p>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                              {crit.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="italic">
                      * Evaluation does not guarantee an award. Final decisions rest with {scholarship.provider}.
                    </span>
                    <Link
                      to={`/scholarships/${scholarship.id}`}
                      className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>Full Opportunity Specifications</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
