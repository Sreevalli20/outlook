import React, { useState, useEffect } from 'react';
import {
  UserCircle,
  GraduationCap,
  ShieldCheck,
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  Building2,
  Calendar,
  Sparkles,
  Info,
} from 'lucide-react';
import { useStudentStore } from '../store/useStudentStore';
import { AcademicLevel } from '../types/scholarship';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const ProfilePage: React.FC = () => {
  const { profile, completionScore, updatePersonal, updateAcademic, updateEligibility, resetToDefault } = useStudentStore();

  const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'eligibility'>('personal');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Form local state initialized with store
  const [personalForm, setPersonalForm] = useState(profile.personal);
  const [academicForm, setAcademicForm] = useState(profile.academic);
  const [eligibilityForm, setEligibilityForm] = useState(profile.eligibility);

  // Keep form state in sync when the stored profile changes (e.g. reset or matcher save)
  useEffect(() => {
    setPersonalForm(profile.personal);
    setAcademicForm(profile.academic);
    setEligibilityForm(profile.eligibility);
  }, [profile]);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonal(personalForm);
    updateAcademic(academicForm);
    updateEligibility(eligibilityForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleConfirmReset = () => {
    resetToDefault();
    // Re-sync local form
    const current = useStudentStore.getState().profile;
    setPersonalForm(current.personal);
    setAcademicForm(current.academic);
    setEligibilityForm(current.eligibility);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-[#101828] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-emerald-500/20">
            {personalForm.fullName ? personalForm.fullName.charAt(0) : 'S'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {personalForm.fullName || 'Student Profile'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>{academicForm.course || 'Undergraduate'}</span>
              <span>•</span>
              <span>{academicForm.institution || 'Enrolled University'}</span>
            </p>
          </div>
        </div>

        {/* Profile Completion Dial */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 flex items-center gap-3 shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
              Eligibility Readiness
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{completionScore}%</div>
          </div>
          <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeTab === 'personal'
                ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <UserCircle className="w-4 h-4" />
            <span>Personal Details</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('academic')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeTab === 'academic'
                ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Academic Details</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('eligibility')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeTab === 'eligibility'
                ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Eligibility Parameters</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Success banner */}
      {saveSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Profile changes saved and synchronized with the Smart Eligibility Matcher!</span>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSaveAll} className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-6">
        {/* Tab 1: Personal Details */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Personal & Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={personalForm.fullName}
                  onChange={(e) => setPersonalForm({ ...personalForm, fullName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={personalForm.email}
                  onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={personalForm.phone}
                  onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={personalForm.dateOfBirth}
                  onChange={(e) => setPersonalForm({ ...personalForm, dateOfBirth: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl font-mono focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  State / Province of Residence
                </label>
                <input
                  type="text"
                  value={personalForm.state}
                  onChange={(e) => setPersonalForm({ ...personalForm, state: e.target.value })}
                  placeholder="e.g. California, Texas, Karnataka"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={personalForm.city}
                  onChange={(e) => setPersonalForm({ ...personalForm, city: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Academic Details */}
        {activeTab === 'academic' && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Academic Background & Current Enrollment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Current Institution / University
                </label>
                <input
                  type="text"
                  value={academicForm.institution}
                  onChange={(e) => setAcademicForm({ ...academicForm, institution: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Course / Discipline
                </label>
                <input
                  type="text"
                  value={academicForm.course}
                  onChange={(e) => setAcademicForm({ ...academicForm, course: e.target.value })}
                  placeholder="e.g. Computer Science, Mechanical Engineering"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Degree Name
                </label>
                <input
                  type="text"
                  value={academicForm.degree}
                  onChange={(e) => setAcademicForm({ ...academicForm, degree: e.target.value })}
                  placeholder="e.g. Bachelor of Technology (B.Tech), B.S."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Academic Level
                </label>
                <select
                  value={academicForm.academicLevel}
                  onChange={(e) =>
                    setAcademicForm({ ...academicForm, academicLevel: e.target.value as AcademicLevel })
                  }
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Doctoral">Doctoral</option>
                  <option value="High School">High School</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Academic Aggregate / Percentage (0-100)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={academicForm.marksPercentage}
                  onChange={(e) =>
                    setAcademicForm({ ...academicForm, marksPercentage: Number(e.target.value) })
                  }
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl font-mono focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Expected Graduation Year
                </label>
                <input
                  type="number"
                  min={2024}
                  max={2035}
                  value={academicForm.graduationYear}
                  onChange={(e) =>
                    setAcademicForm({ ...academicForm, graduationYear: Number(e.target.value) })
                  }
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl font-mono focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Eligibility Details */}
        {activeTab === 'eligibility' && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Need-Based & Quota Criteria
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Annual Household Family Income
                </label>
                <div className="flex gap-2">
                  <select
                    value={eligibilityForm.incomeCurrency}
                    onChange={(e) =>
                      setEligibilityForm({
                        ...eligibilityForm,
                        incomeCurrency: e.target.value as any,
                      })
                    }
                    className="w-24 p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl font-bold"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                  <input
                    type="number"
                    min={0}
                    value={eligibilityForm.annualFamilyIncome}
                    onChange={(e) =>
                      setEligibilityForm({
                        ...eligibilityForm,
                        annualFamilyIncome: Number(e.target.value),
                      })
                    }
                    className="flex-1 p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl font-mono focus:bg-white dark:focus:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Social / Affirmative Category
                </label>
                <select
                  value={eligibilityForm.category}
                  onChange={(e) =>
                    setEligibilityForm({ ...eligibilityForm, category: e.target.value as any })
                  }
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl"
                >
                  <option value="General">General / Open</option>
                  <option value="OBC">OBC (Other Backward Classes)</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="EWS">EWS (Economically Weaker Section)</option>
                  <option value="Minority">Minority Community</option>
                  <option value="Other">Other Category</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Gender Identification
                </label>
                <select
                  value={eligibilityForm.gender}
                  onChange={(e) =>
                    setEligibilityForm({ ...eligibilityForm, gender: e.target.value as any })
                  }
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Institution Accreditation Type
                </label>
                <select
                  value={eligibilityForm.institutionType}
                  onChange={(e) =>
                    setEligibilityForm({
                      ...eligibilityForm,
                      institutionType: e.target.value as any,
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl"
                >
                  <option value="Public/Government">Public / Government Institution</option>
                  <option value="Private Accredited">Private Accredited University</option>
                  <option value="Community College">Community College / 2-Year</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2 space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eligibilityForm.firstGenerationStudent}
                    onChange={(e) =>
                      setEligibilityForm({
                        ...eligibilityForm,
                        firstGenerationStudent: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded-md accent-emerald-600 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    First-Generation College Student (neither parent completed a 4-year degree)
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eligibilityForm.hasDisability}
                    onChange={(e) =>
                      setEligibilityForm({ ...eligibilityForm, hasDisability: e.target.checked })
                    }
                    className="w-4 h-4 rounded-md accent-emerald-600 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Person with Benchmark Disability (PwD / 40%+ Disability Certification)
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Submit Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-2xs flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Information</span>
          </button>
        </div>
      </form>

      {/* Reset Confirmation */}
      {showResetConfirm && (
        <ConfirmDialog
          isOpen={showResetConfirm}
          onClose={() => setShowResetConfirm(false)}
          onConfirm={handleConfirmReset}
          title="Reset Profile to Default Demo"
          message="Are you sure you want to revert your student profile back to standard demonstration values? Any customized parameters will be overwritten."
          confirmLabel="Reset Profile"
          isDestructive={false}
        />
      )}
    </div>
  );
};
