import { Suspense } from 'react'
import { Users, TrendingUp, Calendar, CheckCircle } from 'lucide-react'
import KPICard from '@/components/admin/KPICard'
import TopDestinationsChart from '@/components/admin/TopDestinationsChart'
import { getOverviewStats } from '@/lib/sanity/queries/admin'

export const revalidate = 60 // Revalidate every 60 seconds

function KPICardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
          <div className="h-8 bg-gray-200 rounded w-16" />
        </div>
      ))}
    </div>
  )
}

function ChartSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-48 mb-6" />
      <div className="h-64 bg-gray-100 rounded" />
    </div>
  )
}

async function OverviewContent() {
  const stats = await getOverviewStats()

  return (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          label="Total Leads"
          value={stats.totalLeads}
          icon={Users}
          trend={stats.totalLeadsTrend}
          color="blue"
        />
        <KPICard
          label="Nouveaux (7j)"
          value={stats.newLeads7d}
          icon={TrendingUp}
          trend={stats.newLeads7dTrend}
          color="green"
        />
        <KPICard
          label="Rendez-vous (7j)"
          value={stats.meetings7d}
          icon={Calendar}
          trend={stats.meetings7dTrend}
          color="purple"
        />
        <KPICard
          label="Convertis (30j)"
          value={stats.converted30d}
          icon={CheckCircle}
          trend={stats.converted30dTrend}
          color="emerald"
        />
      </div>

      {/* Chart */}
      <TopDestinationsChart data={stats.topDestinations} />
    </>
  )
}

export default function AdminPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Vue d&apos;ensemble</h2>
        <p className="mt-1 text-sm text-gray-500">
          Statistiques et tendances de vos leads
        </p>
      </div>

      {/* Content */}
      <Suspense fallback={<KPICardsSkeleton />}>
        <OverviewContent />
      </Suspense>
    </div>
  )
}
