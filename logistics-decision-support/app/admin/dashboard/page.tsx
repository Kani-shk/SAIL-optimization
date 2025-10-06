"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import { KPIWidget } from "@/components/KPIWidget"
import { kpis } from "@/lib/mockData"

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <KPIWidget title="Total Rakes" value={String(kpis.totalRakes)} />
          <KPIWidget title="Utilization" value={`${kpis.utilizationPct}%`} />
          <KPIWidget title="Cost Saved" value={`₹${(kpis.costSaved / 100000).toFixed(1)}L`} />
          <KPIWidget title="Pending Orders" value={String(kpis.pendingOrders)} />
        </div>
      </div>
    </ProtectedRoute>
  )
}
