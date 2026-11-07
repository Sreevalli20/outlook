import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useApplicationStore } from '../store/useApplicationStore';
import { useScholarshipStore } from '../store/useScholarshipStore';
import { useDocumentStore } from '../store/useDocumentStore';
import { formatCurrency } from '../utils/formatters';
import { normalizeCurrencyToUSD } from '../utils/currency';
import { StatCard } from '../components/common/StatCard';
import { EmptyState } from '../components/common/EmptyState';

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

const FUNDING_COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#64748B'];

export const InsightsPage: React.FC = () => {
  const { applications } = useApplicationStore();
  const { scholarships, savedIds } = useScholarshipStore();
  const { documents } = useDocumentStore();

  // 1. Total Potential Funding (Sum of tracked applications)
  const totalPotentialFunding = useMemo(() => {
    return applications.reduce((acc, a) => acc + normalizeCurrencyToUSD(a.awardAmount, a.currency), 0);
  }, [applications]);

  // 2. Applications by Status Data
  const statusChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    applications.forEach((a) => {
      counts[a.status] = (counts[a.status] || 0) + 1;
    });
    return Object.keys(counts).map((key) => ({
      status: key,
      count: counts[key],
      color: STATUS_COLORS[key] || '#10B981',
    }));
  }, [applications]);

  // 3. Award Distribution by Scholarship
  const awardDistributionData = useMemo(() => {
    return applications.slice(0, 6).map((app) => ({
      name: app.scholarshipName.length > 18 ? app.scholarshipName.slice(0, 16) + '...' : app.scholarshipName,
      fullName: app.scholarshipName,
      amount: app.awardAmount,
      currency: app.currency,
    }));
  }, [applications]);

  // 4. Funding Breakdown by Provider Type
  const fundingTypeData = useMemo(() => {
    const typeCount: Record<string, number> = {};
    applications.forEach((app) => {
      const sch = scholarships.find((s) => s.id === app.scholarshipId);
      const type = sch?.fundingType || 'other';
      typeCount[type] = (typeCount[type] || 0) + 1;
    });

    return Object.keys(typeCount).map((type, idx) => ({
      name: type.toUpperCase(),
      value: typeCount[type],
      color: FUNDING_COLORS[idx % FUNDING_COLORS.length],
    }));
  }, [applications, scholarships]);

  // 5. Checklist task completion rate
  const totalChecklistItems = applications.reduce((acc, a) => acc + a.checklist.length, 0);
  const completedChecklistItems = applications.reduce(
    (acc, a) => acc + a.checklist.filter((c) => c.completed).length,
    0
  );
  const overallTaskProgress = totalChecklistItems > 0 ? Math.round((completedChecklistItems / totalChecklistItems) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Disclaimer on Potential Funding */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 text-amber-900 text-xs">
        <Info className="w-5 h-5 shrink-0 text-amber-600" />
        <p>
          <strong>Notice on Financial Projections:</strong> All displayed award totals represent{' '}
          <em>potential scholarship funding opportunities</em> that you are tracking or preparing for, not awarded funds received.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Potential Pipeline"
          value={`$${Math.round(totalPotentialFunding).toLocaleString()}`}
          subtitle="Estimated potential value"
          icon={DollarSign}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Tracked Opportunities"
          value={applications.length}
          subtitle="In your application manager"
          icon={BarChart3}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Checklist Completion"
          value={`${overallTaskProgress}%`}
          subtitle={`${completedChecklistItems}/${totalChecklistItems} tasks completed`}
          icon={CheckCircle2}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Saved Opportunities"
          value={savedIds.length}
          subtitle="Opportunities bookmarked"
          icon={TrendingUp}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
      </div>

      {/* Charts Grid */}
      {applications.length === 0 ? (
        <EmptyState
          icon={BarChart3}
          title="No analytics available yet"
          description="Track one or more scholarship applications to generate personalized stage distributions and funding projections."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications by Status Stage */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Applications by Stage</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Number of applications categorized across workflow milestones
              </p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <XAxis dataKey="status" tick={{ fontSize: 11, fill: '#94A3B8' }} interval={0} angle={-25} textAnchor="end" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#101828', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" name="Applications" radius={[6, 6, 0, 0]}>
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Funding Sources Breakdown */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Funding Sources Breakdown</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Proportion of tracked opportunities by sponsor type
              </p>
            </div>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fundingTypeData}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {fundingTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#101828', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs pt-1">
              {fundingTypeData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{d.name} ({d.value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Opportunity Value Comparison */}
          <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs space-y-4 lg:col-span-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Potential Award Value Comparison
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Nominal amounts for your tracked opportunities
              </p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={awardDistributionData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#334155' }} width={110} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#fff' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                    formatter={(val: any, name: any, item: any) => [
                      formatCurrency(val, item.payload.currency),
                      'Potential Award',
                    ]}
                  />
                  <Bar dataKey="amount" fill="#10B981" radius={[0, 6, 6, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
