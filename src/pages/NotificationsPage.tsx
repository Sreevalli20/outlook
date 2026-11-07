import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Trash2,
  CheckCheck,
  Filter,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useNotificationStore } from '../store/useNotificationStore';
import { NotificationType } from '../types/notification';
import { formatDate } from '../utils/formatters';
import { EmptyState } from '../components/common/EmptyState';
import { Badge } from '../components/common/Badge';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotificationStore();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | NotificationType>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'unread') return !n.read;
    if (activeFilter !== 'all') return n.type === activeFilter;
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header & Controls */}
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Notification Center</h2>
            {unreadCount > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Locally synthesized alerts evaluating your application deadlines and checklist documents.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear history</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
            activeFilter === 'all'
              ? 'bg-slate-900 dark:bg-emerald-600 text-white'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setActiveFilter('unread')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
            activeFilter === 'unread'
              ? 'bg-rose-600 text-white'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setActiveFilter('deadline')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
            activeFilter === 'deadline'
              ? 'bg-amber-600 text-white'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Deadlines
        </button>
        <button
          onClick={() => setActiveFilter('document')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
            activeFilter === 'document'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveFilter('status')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
            activeFilter === 'status'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Status Changes
        </button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications in this filter"
          description="Everything is currently up to date. You will be alerted when application deadlines or missing documents need attention."
        />
      ) : (
        <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {filteredNotifications.map((notif) => {
            const iconMap: Record<NotificationType, React.ReactNode> = {
              deadline: <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
              document: <AlertCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
              status: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
              reminder: <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
              system: <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
            };

            return (
              <div
                key={notif.id}
                className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                  !notif.read ? 'bg-emerald-50/20 dark:bg-emerald-950/20' : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                    {iconMap[notif.type] || <Bell className="w-4 h-4 text-slate-500" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      )}
                      <span className="text-[10px] text-slate-400 font-mono">
                        {formatDate(notif.createdAt)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{notif.message}</p>

                    {notif.linkUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          markAsRead(notif.id);
                          navigate(notif.linkUrl!);
                        }}
                        className="mt-2 text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Open item</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {!notif.read && (
                    <button
                      type="button"
                      onClick={() => markAsRead(notif.id)}
                      className="p-1.5 text-xs text-slate-400 hover:text-emerald-700 rounded-lg hover:bg-slate-100"
                      title="Mark as read"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteNotification(notif.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
