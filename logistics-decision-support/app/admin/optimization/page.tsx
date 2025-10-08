"use client"

import { useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import Table, { type Column } from "@/components/Table"
import { inventory, orders, rakeAvailability, type OptimizationResult } from "@/lib/mockData"
import { Button } from "@/components/ui/button"

export default function OptimizationPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<OptimizationResult[] | null>(null)

  const runOptimization = async () => {
    setLoading(true)
    try {
      const res = await fetch("/app/api/optimize", { method: "POST" })
      const data: OptimizationResult[] = await res.json()
      setResult(data)
    } finally {
      setLoading(false)
    }
  }

  const cols: Column<OptimizationResult>[] = [
    { key: "rakeId", header: "Rake" },
    { key: "material", header: "Material" },
    { key: "totalTons", header: "Tons" },
    { key: "origin", header: "Origin" },
    { key: "destination", header: "Destination" },
    {
      key: "assignedOrders",
      header: "Orders",
      render: (r) => (r.assignedOrders.length ? r.assignedOrders.join(", ") : "—"),
    },
    {
      key: "estimatedCost",
      header: "Est. Cost",
      render: (r) => `₹${r.estimatedCost.toLocaleString()}`,
    },
  ]

  return (
    <ProtectedRoute allowedRoles={["admin", "operator"]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Optimization Console</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-md border p-4">
            <div className="text-sm font-medium">Inventory Snapshot</div>
            <ul className="mt-2 text-sm text-muted-foreground">
              {inventory.map((i) => (
                <li key={i.id}>
                  {i.yard} — {i.material}: {i.availableTons} t
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border p-4">
            <div className="text-sm font-medium">Orders (sample)</div>
            <ul className="mt-2 text-sm text-muted-foreground">
              {orders.slice(0, 5).map((o) => (
                <li key={o.id}>
                  {o.id} · {o.material} · {o.quantityTons} t
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border p-4">
            <div className="text-sm font-medium">Rake Availability</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Date: {rakeAvailability.date}
              <br />
              Total Rakes: {rakeAvailability.totalRakes}
              <br />
              Wagons Available: {rakeAvailability.wagonsAvailable}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={runOptimization} disabled={loading} className="bg-primary text-primary-foreground">
            {loading ? "Running…" : "Run Optimization"}
          </Button>
          {result && <div className="text-sm text-muted-foreground">Generated {result.length} rakes</div>}
        </div>

        {result && (
          <div>
            <h2 className="mb-3 text-lg font-semibold">Optimized Rake Plan</h2>
            <Table columns={cols} data={result} />
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
