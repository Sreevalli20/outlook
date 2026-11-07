import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Bell,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useScholarshipStore } from '../store/useScholarshipStore';
import { useApplicationStore } from '../store/useApplicationStore';
import { formatDate, formatCurrency, toLocalDateString } from '../utils/formatters';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';

interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  type: 'deadline' | 'reminder';
  provider?: string;
  awardAmount?: number;
  currency?: string;
  targetUrl: string;
  isPast: boolean;
}

export const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const { scholarships } = useScholarshipStore();
  const { applications, addReminder, deleteReminder } = useApplicationStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState<{ dayStr: string; events: CalendarEvent[] } | null>(null);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [selectedAppId, setSelectedAppId] = useState(applications[0]?.id || '');

  // Year and Month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Compile calendar events from actual records
  const allEvents = useMemo(() => {
    const list: CalendarEvent[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Deadlines from Tracked Applications
    applications.forEach((app) => {
      const d = new Date(app.deadline);
      list.push({
        id: `app-dl-${app.id}`,
        date: app.deadline,
        title: `Deadline: ${app.scholarshipName}`,
        type: 'deadline',
        provider: app.provider,
        awardAmount: app.awardAmount,
        currency: app.currency,
        targetUrl: `/applications/${app.id}`,
        isPast: d < today,
      });

      // Reminders inside application
      app.reminders.forEach((r) => {
        const rd = new Date(r.date);
        list.push({
          id: `app-rem-${r.id}`,
          date: r.date,
          title: `Reminder: ${r.title} (${app.scholarshipName})`,
          type: 'reminder',
          targetUrl: `/applications/${app.id}`,
          isPast: rd < today,
        });
      });
    });

    // 2. Deadlines from dataset scholarships not yet tracked
    const trackedIds = applications.map((a) => a.scholarshipId);
    scholarships.forEach((s) => {
      if (!trackedIds.includes(s.id)) {
        const d = new Date(s.applicationDeadline);
        list.push({
          id: `sch-dl-${s.id}`,
          date: s.applicationDeadline,
          title: `Deadline: ${s.name}`,
          type: 'deadline',
          provider: s.provider,
          awardAmount: s.awardAmount,
          currency: s.currency,
          targetUrl: `/scholarships/${s.id}`,
          isPast: d < today,
        });
      }
    });

    return list;
  }, [applications, scholarships]);

  // Calendar matrix calculation
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month filler days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, daysInPrevMonth - i);
      const dateStr = toLocalDateString(prevDate);
      days.push({
        dayNumber: daysInPrevMonth - i,
        dateStr,
        isCurrentMonth: false,
        events: allEvents.filter((e) => e.date === dateStr),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const curDate = new Date(year, month, day);
      const dateStr = toLocalDateString(curDate);
      days.push({
        dayNumber: day,
        dateStr,
        isCurrentMonth: true,
        events: allEvents.filter((e) => e.date === dateStr),
      });
    }

    // Remaining days to complete 35 or 42 grid cells
    const remaining = (7 - (days.length % 7)) % 7;
    for (let day = 1; day <= remaining; day++) {
      const nextDate = new Date(year, month + 1, day);
      const dateStr = toLocalDateString(nextDate);
      days.push({
        dayNumber: day,
        dateStr,
        isCurrentMonth: false,
        events: allEvents.filter((e) => e.date === dateStr),
      });
    }

    return days;
  }, [year, month, allEvents]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAppId && reminderTitle.trim() && reminderDate) {
      addReminder(selectedAppId, {
        title: reminderTitle.trim(),
        date: reminderDate,
      });
      setReminderTitle('');
      setReminderDate('');
      setShowAddReminderModal(false);
    }
  };

  const todayStr = toLocalDateString(new Date());

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation */}
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base font-bold text-slate-900 dark:text-white w-44 text-center">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleToday}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Today
          </button>
        </div>

        {/* Legend & Add Reminder */}
        <div className="flex items-center gap-4 self-end sm:self-center">
          <div className="hidden md:flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Deadlines
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Reminders
            </span>
          </div>

          {applications.length > 0 && (
            <button
              type="button"
              onClick={() => setShowAddReminderModal(true)}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Reminder</span>
            </button>
          )}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden">
        {/* Day of Week Headers */}
        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Calendar Day Cells */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 dark:divide-slate-800">
          {calendarDays.map((cell, idx) => {
            const isToday = cell.dateStr === todayStr;

            return (
              <div
                key={idx}
                onClick={() => {
                  if (cell.events.length > 0) {
                    setSelectedDayEvents({ dayStr: cell.dateStr, events: cell.events });
                  }
                }}
                className={`min-h-[110px] p-2 flex flex-col justify-between transition-colors ${
                  !cell.isCurrentMonth
                    ? 'bg-slate-50/50 dark:bg-slate-900/30 text-slate-300 dark:text-slate-600'
                    : isToday
                    ? 'bg-emerald-50/30 dark:bg-emerald-950/20 font-semibold'
                    : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/50'
                } ${cell.events.length > 0 ? 'cursor-pointer' : ''}`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      isToday
                        ? 'bg-emerald-600 text-white font-mono'
                        : cell.isCurrentMonth
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}
                  >
                    {cell.dayNumber}
                  </span>
                  {cell.events.length > 0 && (
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded-full">
                      {cell.events.length}
                    </span>
                  )}
                </div>

                {/* Event Pills */}
                <div className="space-y-1 mt-1 overflow-hidden">
                  {cell.events.slice(0, 2).map((ev) => (
                    <div
                      key={ev.id}
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium truncate ${
                        ev.type === 'deadline'
                          ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                          : 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      }`}
                      title={ev.title}
                    >
                      {ev.title}
                    </div>
                  ))}
                  {cell.events.length > 2 && (
                    <span className="text-[9px] text-slate-400 font-bold block pl-1">
                      +{cell.events.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Events Modal */}
      {selectedDayEvents && (
        <Modal
          isOpen={Boolean(selectedDayEvents)}
          onClose={() => setSelectedDayEvents(null)}
          title={`Deadlines & Milestones: ${formatDate(selectedDayEvents.dayStr)}`}
          maxWidth="md"
        >
          <div className="space-y-3">
            {selectedDayEvents.events.map((ev) => (
              <div
                key={ev.id}
                onClick={() => {
                  setSelectedDayEvents(null);
                  navigate(ev.targetUrl);
                }}
                className={`p-3.5 rounded-xl border cursor-pointer hover:shadow-xs transition-all flex items-start justify-between gap-3 ${
                  ev.type === 'deadline'
                    ? 'bg-rose-50/40 border-rose-200 hover:bg-rose-50'
                    : 'bg-blue-50/40 border-blue-200 hover:bg-blue-50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        ev.type === 'deadline'
                          ? 'bg-rose-200 text-rose-800'
                          : 'bg-blue-200 text-blue-800'
                      }`}
                    >
                      {ev.type.toUpperCase()}
                    </span>
                    {ev.isPast && (
                      <span className="text-[10px] text-slate-400 font-bold">Past date</span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{ev.title}</h4>
                  {ev.provider && <p className="text-[11px] text-slate-500 mt-0.5">{ev.provider}</p>}
                </div>
                {ev.awardAmount && ev.currency && (
                  <span className="text-xs font-bold text-slate-900 shrink-0 font-mono">
                    {formatCurrency(ev.awardAmount, ev.currency)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Add Reminder Modal */}
      {showAddReminderModal && (
        <Modal
          isOpen={showAddReminderModal}
          onClose={() => setShowAddReminderModal(false)}
          title="Add Calendar Reminder"
          subtitle="Schedule personal milestones, faculty follow-ups, or portal submission alerts."
          maxWidth="sm"
        >
          <form onSubmit={handleAddReminderSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Related Application Tracker
              </label>
              <select
                value={selectedAppId}
                onChange={(e) => setSelectedAppId(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              >
                {applications.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.scholarshipName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Reminder Title
              </label>
              <input
                type="text"
                value={reminderTitle}
                onChange={(e) => setReminderTitle(e.target.value)}
                placeholder="e.g. Email Counselor for Transcript"
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Reminder Date
              </label>
              <input
                type="date"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddReminderModal(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700"
              >
                Schedule Reminder
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
