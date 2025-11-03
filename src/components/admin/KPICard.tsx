import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  label: string
  value: number
  icon: LucideIcon
  trend?: number
  color?: 'blue' | 'green' | 'purple' | 'emerald' | 'red'
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  red: 'bg-red-50 text-red-600',
}

export default function KPICard({ label, value, icon: Icon, trend, color = 'blue' }: KPICardProps) {
  const hasTrend = trend !== undefined && trend !== 0
  const trendPositive = trend && trend > 0

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
          
          {hasTrend && (
            <div className="mt-2 flex items-center space-x-1">
              <span
                className={cn(
                  'text-sm font-medium',
                  trendPositive ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trendPositive ? '+' : ''}{trend}%
              </span>
              <span className="text-xs text-gray-500">vs période précédente</span>
            </div>
          )}
        </div>
        
        <div className={cn('p-3 rounded-lg', colorClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
