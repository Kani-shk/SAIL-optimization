"use client"

import { useMemo, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import Table, { type Column } from "@/components/Table"
import { orders, type Order } from "@/lib/mockData"
import { Button } from "@/components/ui/button"

const PAGE_SIZE = 10

export default function OrdersPage() {
  const [q, setQ] = useState("")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const lower = q.toLowerCase()
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(lower) ||
        o.customer.toLowerCase().includes(lower) ||
        o.material.toLowerCase().includes(lower) ||
        o.destination.toLowerCase().includes(lower),
    )
  }, [q])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const cols: Column<Order>[] = [
    { key: "id", header: "Order ID" },
    { key: "customer", header: "Customer" },
    { key: "material", header: "Material" },
    { key: "quantityTons", header: "Tons" },
    { key: "origin", header: "Origin" },
    { key: "destination", header: "Destination" },
    { key: "dueDate", header: "Due" },
    { key: "priority", header: "Priority" },
  ]

  return (
    <ProtectedRoute allowedRoles={["admin", "operator"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <div className="flex items-center gap-3">
          <input
            className="rounded-md border px-3 py-2 text-sm"
            placeholder="Filter by ID, customer, material…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setPage(1)
            }}
            aria-label="Filter orders"
          />
        </div>
        <Table columns={cols} data={pageData} />
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            Prev
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {page} / {totalPages}
          </div>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  )
}
