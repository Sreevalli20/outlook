import React, { useState, useRef } from 'react';
import {
  Settings,
  Download,
  Upload,
  Trash2,
  ShieldCheck,
  Info,
  Check,
  AlertTriangle,
  HardDrive,
  Moon,
  Sun,
  Globe,
  Bell,
  CheckCircle2,
  Palette,
} from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useStudentStore } from '../store/useStudentStore';
import { useScholarshipStore } from '../store/useScholarshipStore';
import { useApplicationStore } from '../store/useApplicationStore';
import { useDocumentStore } from '../store/useDocumentStore';
import { exportGrantlyDataAsJson, validateImportedData, GrantlyExportData } from '../utils/exportImport';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, toggleTheme } = useSettingsStore();
  const { profile, setFullProfile } = useStudentStore();
  const { savedIds, comparedIds } = useScholarshipStore();
  const { applications, setAllApplications } = useApplicationStore();
  const { documents, clearAll: clearAllDocs } = useDocumentStore();

  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDark = settings.theme === 'dark';

  const handleExportData = () => {
    exportGrantlyDataAsJson(
      profile,
      savedIds,
      comparedIds,
      applications,
      documents,
      settings
    );
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (validateImportedData(parsed)) {
          setFullProfile(parsed.profile);
          setAllApplications(parsed.applications);
          if (parsed.settings) {
            updateSettings(parsed.settings);
          }
          setImportStatus({
            success: true,
            message: 'Application state successfully imported from backup file!',
          });
        } else {
          setImportStatus({
            success: false,
            message: 'Invalid backup file structure. Ensure this is a valid GRANTLY JSON export.',
          });
        }
      } catch (err) {
        setImportStatus({
          success: false,
          message: 'Failed to parse JSON file.',
        });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmClearAll = async () => {
    localStorage.clear();
    await clearAllDocs();
    window.location.reload();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title Card */}
      <div className="bg-white dark:bg-[#101828] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Platform Settings & Visual Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize dark mode theme, regional currency, export local state backups, and manage offline data storage.
        </p>
      </div>

      {importStatus && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center gap-2.5 ${
            importStatus.success
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
          }`}
        >
          {importStatus.success ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
          )}
          <span>{importStatus.message}</span>
        </div>
      )}

      {/* Theme & Visual Appearance Section */}
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-5 transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Theme & Visual Appearance
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Current: {isDark ? 'Dark Theme' : 'Light Theme'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Light Theme Card */}
          <div
            onClick={() => updateSettings({ theme: 'light' })}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              !isDark
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sun className={`w-5 h-5 ${!isDark ? 'text-amber-500' : 'text-slate-400'}`} />
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Light Theme
                </span>
              </div>
              {!isDark && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-900" />
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Clean, high-clarity background with crisp typography and subtle slate card borders.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
              <span className="w-4 h-4 rounded-full bg-[#F8FAFC] border border-slate-300" title="Background #F8FAFC" />
              <span className="w-4 h-4 rounded-full bg-[#FFFFFF] border border-slate-300" title="Surface #FFFFFF" />
              <span className="w-4 h-4 rounded-full bg-[#10B981]" title="Emerald #10B981" />
              <span className="w-4 h-4 rounded-full bg-[#101828]" title="Primary Navy #101828" />
            </div>
          </div>

          {/* Dark Theme Card */}
          <div
            onClick={() => updateSettings({ theme: 'dark' })}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              isDark
                ? 'bg-emerald-950/30 border-emerald-500 shadow-xs ring-1 ring-emerald-500/50'
                : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Moon className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Dark Theme (High Contrast)
                </span>
              </div>
              {isDark && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-950" />
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Deep primary navy (`#101828`) surfaces and dark emerald (`#047857`) accents optimized for nocturnal study.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
              <span className="w-4 h-4 rounded-full bg-[#0B1120] border border-slate-700" title="Background #0B1120" />
              <span className="w-4 h-4 rounded-full bg-[#101828] border border-slate-700" title="Primary Navy #101828" />
              <span className="w-4 h-4 rounded-full bg-[#047857]" title="Dark Emerald #047857" />
              <span className="w-4 h-4 rounded-full bg-[#10B981]" title="Light Emerald #10B981" />
            </div>
          </div>
        </div>
      </div>

      {/* Regional & Display Preferences */}
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-5 transition-colors">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Regional & Display Preferences</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Default Display Currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) => updateSettings({ currency: e.target.value as any })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="USD">USD ($) - United States Dollar</option>
              <option value="INR">INR (₹) - Indian Rupee</option>
              <option value="EUR">EUR (€) - Euro</option>
              <option value="GBP">GBP (£) - British Pound</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Date Formatting Convention
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => updateSettings({ dateFormat: e.target.value as any })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
            >
              <option value="YYYY-MM-DD">YYYY-MM-DD (ISO International)</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY (UK / Commonwealth)</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY (US Format)</option>
            </select>
          </div>
        </div>

        {/* Notifications Checkbox */}
        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={settings.simulateDeadlineAlerts}
              onChange={(e) => updateSettings({ simulateDeadlineAlerts: e.target.checked })}
              className="w-4 h-4 rounded-md accent-emerald-600 cursor-pointer"
            />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Generate proactive notifications for deadlines approaching within 7 days
            </span>
          </label>
        </div>
      </div>

      {/* Data Backup & Restore */}
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-4 transition-colors">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Local Data Backup & Migration</span>
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Because GRANTLY stores your data entirely client-side, you can create a single JSON file backup to transfer your student profile, tracked applications, reminders, and checklists to another browser or device.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportData}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-2 shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Export Backup (JSON)</span>
          </button>

          <label className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Restore from Backup</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      {/* Privacy Architecture Notice */}
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-3 transition-colors">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Privacy & Security Commitments</span>
        </div>
        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed list-disc list-inside">
          <li>
            <strong>Zero Server Transmission:</strong> Profile parameters and uploaded files remain exclusively inside your browser's LocalStorage and IndexedDB database.
          </li>
          <li>
            <strong>No Third-Party Trackers:</strong> No marketing pixels, user profiling beacons, or telemetric recording tools are embedded.
          </li>
          <li>
            <strong>Deterministic Rules:</strong> Eligibility determinations are calculated through local rules without relying on opaque cloud models.
          </li>
        </ul>
      </div>

      {/* Danger Zone: Reset All Storage */}
      <div className="bg-rose-50/40 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/60 p-6 space-y-4">
        <h2 className="text-sm font-bold text-rose-900 dark:text-rose-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <span>Danger Zone: Clear Local Data</span>
        </h2>
        <p className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
          Clearing application data deletes all locally stored applications, uploaded documents, bookmarks, custom reminders, and profile edits. This action is irreversible.
        </p>

        <button
          type="button"
          onClick={() => setShowClearConfirm(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors inline-flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Erase All Local Data</span>
        </button>
      </div>

      {/* Confirmation Dialog */}
      {showClearConfirm && (
        <ConfirmDialog
          isOpen={showClearConfirm}
          onClose={() => setShowClearConfirm(false)}
          onConfirm={handleConfirmClearAll}
          title="Erase All Local Application Data"
          message="Are you certain you wish to purge all local storage and IndexedDB vaults? You will lose all tracked applications and uploaded documents unless you have exported a JSON backup."
          confirmLabel="Purge Everything"
          isDestructive={true}
        />
      )}
    </div>
  );
};
