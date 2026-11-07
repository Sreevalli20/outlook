import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Calendar,
  Building2,
  GraduationCap,
  ExternalLink,
  PlusCircle,
  Columns3,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  FileText,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { useScholarshipStore } from '../store/useScholarshipStore';
import { useApplicationStore } from '../store/useApplicationStore';
import { useStudentStore } from '../store/useStudentStore';
import { evaluateScholarshipEligibility } from '../utils/eligibilityEngine';
import { formatCurrency, formatDate, formatRelativeDeadline } from '../utils/formatters';
import { Badge } from '../components/common/Badge';

export const ScholarshipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const { scholarships, isSaved, toggleSaved, isCompared, toggleCompare } = useScholarshipStore();
  const { applications, addApplicationFromScholarship } = useApplicationStore();
  const { profile } = useStudentStore();

  const scholarship = scholarships.find((s) => s.id === id);

  if (!scholarship) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Scholarship Not Found</h2>
        <p className="text-sm text-slate-500">The requested opportunity record does not exist in the local dataset.</p>
        <Link
          to="/scholarships"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Discovery
        </Link>
      </div>
    );
  }

  const saved = isSaved(scholarship.id);
  const compared = isCompared(scholarship.id);
  const existingApp = applications.find((a) => a.scholarshipId === scholarship.id);
  const deadlineInfo = formatRelativeDeadline(scholarship.applicationDeadline);

  // Evaluate single scholarship eligibility against current profile
  const eligibilityEval = evaluateScholarshipEligibility(scholarship, profile);

  const handleCopyDetails = () => {
    const text = `${scholarship.name}\nProvider: ${scholarship.provider}\nAward: ${formatCurrency(
      scholarship.awardAmount,
      scholarship.currency
    )} (${scholarship.awardType})\nDeadline: ${scholarship.applicationDeadline}\nOfficial Source: ${
      scholarship.officialWebsiteUrl
    }`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrack = () => {
    if (existingApp) {
      navigate(`/applications/${existingApp.id}`);
    } else {
      const app = addApplicationFromScholarship(scholarship, 'Preparing');
      navigate(`/applications/${app.id}`);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back button & Meta badge */}
      <div className="flex items-center justify-between">
        <Link
          to="/scholarships"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Scholarships</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-mono">
            Verified: {formatDate(scholarship.verificationDate)}
          </span>
          <Badge variant="emerald" size="sm">
            Local Verified Record
          </Badge>
        </div>
      </div>

      {/* Main Hero Header Card */}
      <div className="bg-white dark:bg-[#101828] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="sm">
                {scholarship.fundingType.toUpperCase()}
              </Badge>
              <Badge variant="default" size="sm">
                {scholarship.category}
              </Badge>
              {scholarship.isFeatured && (
                <Badge variant="amber" size="sm">
                  Featured Award
                </Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {scholarship.name}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{scholarship.provider}</span>
            </p>
          </div>

          {/* Award Amount Display */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 shrink-0 text-left md:text-right">
            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
              Funding Amount
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-0.5">
              {formatCurrency(scholarship.awardAmount, scholarship.currency)}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium capitalize">
              {scholarship.awardType} award
            </span>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleTrack}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs ${
                existingApp
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {existingApp ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Viewing Tracker ({existingApp.status})</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Add to Application Tracker</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => toggleCompare(scholarship.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                compared
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Columns3 className="w-4 h-4" />
              <span>{compared ? 'In Comparison' : 'Add to Compare'}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleSaved(scholarship.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                saved
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
              <span>{saved ? 'Bookmarked' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyDetails}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy Info'}</span>
            </button>
          </div>

          <a
            href={scholarship.officialWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Dynamic Eligibility Match Status Box */}
      <div
        className={`p-5 rounded-2xl border ${
          eligibilityEval.status === 'eligible'
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            : eligibilityEval.status === 'potentially_eligible'
            ? 'bg-amber-50/70 border-amber-200 text-amber-950'
            : eligibilityEval.status === 'not_eligible'
            ? 'bg-rose-50/70 border-rose-200 text-rose-950'
            : 'bg-slate-100/70 border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Eligibility Check: {eligibilityEval.status.replace('_', ' ').toUpperCase()}</span>
          </div>
          <Link
            to="/eligibility"
            className="text-xs font-bold underline hover:opacity-80"
          >
            Review Rule Breakdown in Matcher →
          </Link>
        </div>
        <p className="text-xs leading-relaxed opacity-90">{eligibilityEval.recommendationReason}</p>
      </div>

      {/* Grid: 2 Columns for Detailed Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Description, Instructions, Required Documents */}
        <div className="md:col-span-2 space-y-6">
          {/* Detailed Overview */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Program Overview</h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {scholarship.fullDescription}
            </p>
            <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Award Structure & Benefits
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {scholarship.awardDetails}
              </p>
            </div>
          </div>

          {/* Application Steps */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Application Instructions</h2>
            <div className="space-y-3">
              {scholarship.applicationInstructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 dark:bg-emerald-950 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono border border-emerald-800/40">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents List */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Required Documents</h2>
              <Link
                to="/documents"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Upload to Vault</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {scholarship.requiredDocuments.map((doc, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                >
                  <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Key Dates & Eligibility Matrix */}
        <div className="space-y-6">
          {/* Critical Deadlines */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
              Timeline & Deadlines
            </h3>

            <div>
              <span className="text-[11px] text-slate-400 block">Application Deadline</span>
              <div className="flex items-center gap-2 mt-0.5">
                <Calendar className="w-4 h-4 text-rose-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {formatDate(scholarship.applicationDeadline)}
                </span>
              </div>
              <span
                className={`text-xs font-bold mt-1 inline-block ${
                  deadlineInfo.urgent ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {deadlineInfo.text}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block">Applications Opened</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {formatDate(scholarship.applicationStartDate)}
              </span>
            </div>
          </div>

          {/* Eligibility Requirements Matrix */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
              Eligibility Matrix
            </h3>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block">Academic Level:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {scholarship.academicLevel.join(', ')}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">Minimum Marks:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {scholarship.minPercentageOrGpa}% Aggregate
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">Eligible Courses:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {scholarship.eligibleCourses.join(', ')}
                </span>
              </div>

              {scholarship.maxAnnualIncome && (
                <div>
                  <span className="text-slate-400 block">Maximum Family Income:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatCurrency(scholarship.maxAnnualIncome, scholarship.currency)}
                  </span>
                </div>
              )}

              {scholarship.genderRequirement && scholarship.genderRequirement !== 'All' && (
                <div>
                  <span className="text-slate-400 block">Gender Requirement:</span>
                  <span className="font-semibold text-purple-700 dark:text-purple-400">
                    {scholarship.genderRequirement} only
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Official Verification Notice */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Official Source Verified</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              This record was compiled from official public scholarship notices. Final eligibility is determined solely by the granting organization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
