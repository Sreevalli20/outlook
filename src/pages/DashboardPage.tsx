import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Bookmark,
  KanbanSquare,
  Send,
  Calendar,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  FolderArchive,
  Columns3,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { useScholarshipStore } from '../store/useScholarshipStore';
import { useApplicationStore } from '../store/useApplicationStore';
import { useStudentStore } from '../store/useStudentStore';
import { evaluateScholarshipEligibility } from '../utils/eligibilityEngine';
import { formatCurrency, formatRelativeDeadline, formatDate } from '../utils/formatters';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';

const STATUS_COLORS: Record<string, string> = {
  Interested: '#94A3B8',
  Preparing: '#F59E0B',
  'Ready to apply': '#3B82F6',
  Submitted: '#10B981',
  'Under review': '#8B5CF6',
  Approved: '#059669',
  Rejected: '#EF4444',
  Withdrawn: '#64748B',
};

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { scholarships, savedIds } = useScholarshipStore();
  const { applications } = useApplicationStore();
  const { profile, completionScore } = useStudentStore();

  // 1. Calculate matching scholarships from actual local profile
  const matchingEvaluations = useMemo(() => {
    return scholarships.map((s) => evaluateScholarshipEligibility(s, profile));
  }, [scholarships, profile]);

  const eligibleCount = matchingEvaluations.filter(
    (e) => e.status === 'eligible' || e.status === 'potentially_eligible'
  ).length;

  const topRecommended = useMemo(() => {
    return matchingEvaluations
      .filter((e) => e.status === 'eligible' || e.status === 'potentially_eligible')
      .slice(0, 3)
      .map((e) => e.scholarship);
  }, [matchingEvaluations]);

  // 2. Active & Submitted applications counts
  const activeApplications = applications.filter(
    (a) => a.status !== 'Approved' && a.status !== 'Rejected' && a.status !== 'Withdrawn'
  );

  const submittedApplications = applications.filter(
    (a) => a.status === 'Submitted' || a.status === 'Under review' || a.status === 'Approved'
  );

  // 3. Upcoming deadlines from active applications and saved scholarships
  const upcomingDeadlines = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineList: {
      id: string;
      title: string;
      provider: string;
      deadline: string;
      award: string;
      type: 'application' | 'scholarship';
      targetId: string;
    }[] = [];

    // Add tracked applications
    applications.forEach((a) => {
      deadlineList.push({
        id: `app-dl-${a.id}`,
        title: a.scholarshipName,
        provider: a.provider,
        deadline: a.deadline,
        award: formatCurrency(a.awardAmount, a.currency),
        type: 'application',
        targetId: a.id,
      });
    });

    // Add saved scholarships not tracked yet
    const trackedScholarshipIds = applications.map((a) => a.scholarshipId);
    savedIds.forEach((sid) => {
      if (!trackedScholarshipIds.includes(sid)) {
        const sch = scholarships.find((s) => s.id === sid);
        if (sch) {
          deadlineList.push({
            id: `sch-dl-${sch.id}`,
            title: sch.name,
            provider: sch.provider,
            deadline: sch.applicationDeadline,
            award: formatCurrency(sch.awardAmount, sch.currency),
            type: 'scholarship',
            targetId: sch.id,
          });
        }
      }
    });

    // Sort by earliest deadline
    deadlineList.sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );

    return deadlineList.slice(0, 5);
  }, [applications, savedIds, scholarships]);

  // 4. Saved scholarships preview
  const savedScholarships = useMemo(() => {
    return scholarships.filter((s) => savedIds.includes(s.id)).slice(0, 4);
  }, [scholarships, savedIds]);

  // 5. Status distribution for chart
  const statusData = useMemo(() => {
    const counts: Record<string, number> = {};
    applications.forEach((a) => {
      counts[a.status] = (counts[a.status] || 0) + 1;
    });
    return Object.keys(counts).map((status) => ({
      name: status,
      value: counts[status],
      color: STATUS_COLORS[status] || '#64748B',
    }));
  }, [applications]);

  // 6. Recent activities combined from applications
  const recentActivities = useMemo(() => {
    const list: { id: string; date: string; action: string; title: string }[] = [];
    applications.forEach((app) => {
      app.history.forEach((h) => {
        list.push({
          id: h.id,
          date: h.date,
          action: h.action,
          title: app.scholarshipName,
        });
      });
    });
    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return list.slice(0, 5);
  }, [applications]);

  return (
    <div className="space-y-6">
      {/* Profile completion banner if under 100 */}
      {completionScore < 100 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500 text-white shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Your Student Eligibility Profile is {completionScore}% complete
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Complete your marks, family income, and degree fields to unlock 100% deterministic scholarship matching.
              </p>
            </div>
          </div>
          <Link
            to="/profile"
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shrink-0 shadow-2xs"
          >
            Complete Profile
          </Link>
        </div>
      )}

      {/* Primary Metrics Grid (Calculated from real local state) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Available"
          value={scholarships.length}
          subtitle="Dataset records"
          icon={Search}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          onClick={() => navigate('/scholarships')}
        />
        <StatCard
          title="Eligible"
          value={eligibleCount}
          subtitle="Matches profile"
          icon={Sparkles}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          onClick={() => navigate('/eligibility')}
        />
        <StatCard
          title="Bookmarks"
          value={savedIds.length}
          subtitle="Saved for later"
          icon={Bookmark}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          onClick={() => navigate('/scholarships')}
        />
        <StatCard
          title="In Progress"
          value={activeApplications.length}
          subtitle="Active trackers"
          icon={KanbanSquare}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          onClick={() => navigate('/applications')}
        />
        <StatCard
          title="Submitted"
          value={submittedApplications.length}
          subtitle="Applications sent"
          icon={Send}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
          onClick={() => navigate('/applications')}
        />
        <StatCard
          title="Deadlines"
          value={upcomingDeadlines.length}
          subtitle="Within 60 days"
          icon={Calendar}
          iconColor="text-rose-600"
          iconBg="bg-rose-50"
          onClick={() => navigate('/calendar')}
        />
      </div>

      {/* Main Dashboard Split: Visuals & Recommended */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide on desktop): Pipeline chart + Upcoming Deadlines */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Breakdown & Quick Shortcuts */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Application Pipeline</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Distribution of {applications.length} tracked applications across workflow stages
                </p>
              </div>
              <Link
                to="/applications"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Manage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {applications.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No tracked applications yet. Browse scholarships to start tracking.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <div className="md:col-span-5 h-48 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#101828', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                        formatter={(val: any, name: any) => [`${val} application(s)`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="md:col-span-7 grid grid-cols-2 gap-2 text-xs">
                  {statusData.map((item) => (
                    <div
                      key={item.name}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-slate-700 dark:text-slate-300 font-medium truncate">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white ml-2 font-mono">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Upcoming Deadlines Widget */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Upcoming Deadlines</h3>
              </div>
              <Link
                to="/calendar"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Full Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {upcomingDeadlines.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No upcoming deadlines detected.
                </div>
              ) : (
                upcomingDeadlines.map((dl) => {
                  const deadlineInfo = formatRelativeDeadline(dl.deadline);
                  return (
                    <div
                      key={dl.id}
                      onClick={() =>
                        navigate(
                          dl.type === 'application'
                            ? `/applications/${dl.targetId}`
                            : `/scholarships/${dl.targetId}`
                        )
                      }
                      className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 px-2 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {dl.title}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded-sm ${
                              dl.type === 'application'
                                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {dl.type === 'application' ? 'Tracking' : 'Bookmarked'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{dl.provider}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`text-xs font-bold block ${
                            deadlineInfo.urgent ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {deadlineInfo.text}
                        </span>
                        <span className="text-[11px] text-slate-400">{formatDate(dl.deadline)}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Top Recommendations & Recent Activity */}
        <div className="space-y-6">
          {/* Smart Match Recommendations */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recommended For You</h3>
              </div>
              <Link
                to="/eligibility"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Run Matcher</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {topRecommended.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  Update your student profile to view matched scholarships.
                </div>
              ) : (
                topRecommended.map((sch) => (
                  <div
                    key={sch.id}
                    onClick={() => navigate(`/scholarships/${sch.id}`)}
                    className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <Badge variant="emerald" size="sm">
                        {sch.category}
                      </Badge>
                      <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                        {formatCurrency(sch.awardAmount, sch.currency)}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{sch.name}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{sch.provider}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recently Saved Bookmarks */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Saved Opportunities</h3>
              </div>
              <Link
                to="/scholarships"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="space-y-2">
              {savedScholarships.length === 0 ? (
                <div className="py-4 text-center text-xs text-slate-400">
                  No scholarships saved yet. Click the bookmark icon on any card.
                </div>
              ) : (
                savedScholarships.map((s) => (
                  <Link
                    key={s.id}
                    to={`/scholarships/${s.id}`}
                    className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors group"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                        {s.name}
                      </p>
                      <p className="text-[11px] text-slate-400">{s.fundingType}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0 font-mono">
                      {formatCurrency(s.awardAmount, s.currency)}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Recent Action Activity Stream */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 mb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Activity History</span>
            </h3>

            <div className="space-y-3">
              {recentActivities.map((act) => (
                <div key={act.id} className="text-xs">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 leading-snug">{act.action}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{act.title}</p>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {formatDate(act.date)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
