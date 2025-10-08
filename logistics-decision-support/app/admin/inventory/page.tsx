"use client"

import { useMemo, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import Table, { type Column } from "@/components/Table"
import { inventory, type InventoryItem } from "@/lib/mockData"

export default function InventoryPage() {
  const [q, setQ] = useState("")

  const filtered = useMemo(() => {
    const lower = q.toLowerCase()
    return inventory.filter(
      (i) =>
        i.yard.toLowerCase().includes(lower) ||
        i.material.toLowerCase().includes(lower) ||
        String(i.availableTons).includes(lower),
    )
  }, [q])

  const cols: Column<InventoryItem>[] = [
    { key: "yard", header: "Yard" },
    { key: "material", header: "Material" },
    { key: "availableTons", header: "Available (t)" },
  ]

  return (
    <ProtectedRoute allowedRoles={["admin", "operator"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <input
          className="rounded-md border px-3 py-2 text-sm"
          placeholder="Filter by yard or material…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Filter inventory"
        />
        <Table columns={cols} data={filtered} />
      </div>
    </ProtectedRoute>
  )
}
