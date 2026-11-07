import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ChevronRight } from 'lucide-react';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useApplicationStore } from '../../store/useApplicationStore';
import { useScholarshipStore } from '../../store/useScholarshipStore';
import { useDocumentStore } from '../../store/useDocumentStore';

const ROUTE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'Student Dashboard',
    subtitle: 'Overview of matched opportunities, active trackers, and key deadlines',
  },
  '/scholarships': {
    title: 'Scholarship Discovery',
    subtitle: 'Explore verified national, private, and institutional funding opportunities',
  },
  '/eligibility': {
    title: 'Smart Eligibility Matcher',
    subtitle: 'Rule-based evaluation comparing your student profile with scholarship criteria',
  },
  '/compare': {
    title: 'Scholarship Comparison',
    subtitle: 'Side-by-side breakdown of funding amounts, requirements, and deadlines',
  },
  '/applications': {
    title: 'Application Tracker',
    subtitle: 'Manage your submissions, documents checklist, and timelines in one place',
  },
  '/templates': {
    title: 'Application Essay Templates',
    subtitle: 'Proven narrative frameworks, structure breakdowns, and live essay adapter',
  },
  '/documents': {
    title: 'Document Vault',
    subtitle: 'Encrypted local browser storage for marksheets, IDs, and income certificates',
  },
  '/calendar': {
    title: 'Deadline Calendar',
    subtitle: 'Stay on track with application deadlines and milestone reminders',
  },
  '/notifications': {
    title: 'Notification Center',
    subtitle: 'Locally generated alerts for impending deadlines and checklist reminders',
  },
  '/insights': {
    title: 'Insights & Analytics',
    subtitle: 'Data-driven overview of your potential scholarship pipeline and progress',
  },
  '/profile': {
    title: 'Student Profile',
    subtitle: 'Manage your personal, academic, and financial eligibility parameters',
  },
  '/settings': {
    title: 'Platform Settings',
    subtitle: 'Theme customization, data export, privacy controls, and offline management',
  },
};

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const { syncNotificationsFromAppData } = useNotificationStore();
  const { applications } = useApplicationStore();
  const { scholarships } = useScholarshipStore();
  const { loadDocuments } = useDocumentStore();

  // Initialize and sync data on mount
  useEffect(() => {
    syncNotificationsFromAppData(applications, scholarships);
    loadDocuments();
  }, []);

  const currentRouteMeta = ROUTE_TITLES[location.pathname] || {
    title: 'GRANTLY Workspace',
    subtitle: 'Unified scholarship discovery & management',
  };

  // Generate breadcrumb items
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] flex text-slate-800 dark:text-slate-100 transition-colors">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title={currentRouteMeta.title}
          subtitle={currentRouteMeta.subtitle}
        />

        {/* Sub-header breadcrumb navigation */}
        <div className="bg-white/50 dark:bg-[#101828]/60 border-b border-slate-200/60 dark:border-slate-800 px-4 sm:px-8 py-2.5 flex items-center text-xs text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap transition-colors">
          <Link to="/dashboard" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Workspace
          </Link>
          {pathSegments.map((segment, index) => {
            const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            const displayName =
              segment.startsWith('sch-') || segment.startsWith('app-')
                ? 'Details'
                : segment === 'templates'
                ? 'Essay Templates'
                : segment.charAt(0).toUpperCase() + segment.slice(1);

            return (
              <React.Fragment key={url}>
                <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 dark:text-slate-500 shrink-0" />
                {isLast ? (
                  <span className="font-semibold text-slate-900 dark:text-white">{displayName}</span>
                ) : (
                  <Link to={url} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    {displayName}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Page body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
