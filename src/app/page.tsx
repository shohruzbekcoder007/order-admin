import { BarChart2, Clock, Shield, Users } from 'lucide-react'
import { MetricCard } from "@/components/metric-card"

export default function DashboardPage() {
  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <select className="px-3 py-2 border rounded-lg">
            <option>English</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 text-sm">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <span>Account</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total records"
          value="834,761"
          icon={BarChart2}
          color="bg-green-100 text-green-600"
        />
        <MetricCard
          title="New records this month"
          value="834,761"
          icon={Clock}
          color="bg-orange-100 text-orange-600"
        />
        <MetricCard
          title="Approved records this month"
          value="0"
          icon={Shield}
          color="bg-yellow-100 text-yellow-600"
        />
        <MetricCard
          title="Online users"
          value="834,761"
          icon={Users}
          color="bg-purple-100 text-purple-600"
        />
      </div>
    </main>
  )
}

