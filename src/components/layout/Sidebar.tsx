import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  Search,
  Sparkles,
  Columns3,
  KanbanSquare,
  FolderArchive,
  CalendarDays,
  Bell,
  BarChart3,
  UserCircle,
  Settings,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ScrollText,
} from 'lucide-react';
import { useStudentStore } from '../../store/useStudentStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useScholarshipStore } from '../../store/useScholarshipStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { profile, completionScore } = useStudentStore();
  const { unreadCount } = useNotificationStore();
  const { comparedIds } = useScholarshipStore();

  const navigationItems = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Discover Scholarships', to: '/scholarships', icon: Search },
    { name: 'Smart Matcher', to: '/eligibility', icon: Sparkles, highlight: true },
    {
      name: 'Comparison',
      to: '/compare',
      icon: Columns3,
      badge: comparedIds.length > 0 ? comparedIds.length : undefined,
    },
    { name: 'Application Tracker', to: '/applications', icon: KanbanSquare },
    { name: 'Essay Templates', to: '/templates', icon: ScrollText },
    { name: 'Document Vault', to: '/documents', icon: FolderArchive },
    { name: 'Deadline Calendar', to: '/calendar', icon: CalendarDays },
    {
      name: 'Notifications',
      to: '/notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
      badgeColor: 'bg-rose-500 text-white',
    },
    { name: 'Insights & Analytics', to: '/insights', icon: BarChart3 },
    { name: 'Student Profile', to: '/profile', icon: UserCircle },
    { name: 'Settings', to: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#101828] text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800/80 gap-3">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2.5 font-extrabold text-white text-lg tracking-tight group"
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-[#101828] shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span>
              GRANT<span className="text-emerald-400">LY</span>
            </span>
          </Link>
          <span className="ml-auto text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm bg-slate-800 text-emerald-400 border border-emerald-500/30">
            Student
          </span>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Workspace
            </p>
          </div>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-xs'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.highlight && !item.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Smart
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Profile Card & Completion progress in footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60">
          <Link
            to="/profile"
            onClick={onClose}
            className="block p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 transition-colors border border-slate-700/60 group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs">
                  {profile.personal.fullName ? profile.personal.fullName.charAt(0) : 'S'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-200 truncate group-hover:text-white">
                    {profile.personal.fullName || 'Student Demo'}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {profile.academic.course || 'Undergraduate'}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
            </div>

            {/* Profile Completion Bar */}
            <div className="mt-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Eligibility Profile
                </span>
                <span className="font-semibold text-emerald-400">{completionScore}%</span>
              </div>
              <div className="w-full bg-slate-700/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-400 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${completionScore}%` }}
                />
              </div>
            </div>
          </Link>

          <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              100% Offline Vault
            </span>
            <Link to="/" className="text-slate-400 hover:text-slate-200 underline">
              Home
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};
