'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DestinationData {
  name: string
  count: number
  flag?: string
}

interface TopDestinationsChartProps {
  data: DestinationData[]
}

export default function TopDestinationsChart({ data }: TopDestinationsChartProps) {
  // Transform data for chart
  const chartData = data.map((item) => ({
    name: `${item.flag || ''} ${item.name}`.trim(),
    value: item.count,
  }))

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Destinations</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              label={{ value: 'Nombre de leads', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              labelStyle={{ color: '#111827', fontWeight: 600 }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
