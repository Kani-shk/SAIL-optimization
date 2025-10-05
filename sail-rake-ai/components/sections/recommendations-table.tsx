"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Recommendation } from "@/lib/mock-data"
import { initialRecommendations } from "@/lib/mock-data"

export function RecommendationsTable() {
  const [data, setData] = useState<Recommendation[]>(initialRecommendations)
  const [loading, setLoading] = useState(false)

  const refresh = async () => {
    setLoading(true)
    // Simulate network request
    await new Promise((r) => setTimeout(r, 1200))
    // shuffle efficiencies slightly
    setData((prev) =>
      prev.map((r) => ({
        ...r,
        efficiency: Math.min(100, Math.max(60, r.efficiency + (Math.random() * 8 - 4))),
      })),
    )
    setLoading(false)
  }

  const badgeVariant = (status?: Recommendation["status"]) => {
    switch (status) {
      case "Optimized":
        return "default"
      case "Delayed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-pretty">Recommended Rake Formations</h2>
        <Button onClick={refresh} disabled={loading}>
          {loading ? (
            <>
              <Spinner className="mr-2" />
              Refreshing...
            </>
          ) : (
            "Refresh Recommendations"
          )}
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rake ID</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Material Type</TableHead>
              <TableHead className="text-right">No. of Wagons</TableHead>
              <TableHead className="text-right">Predicted Efficiency (%)</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((r) => (
              <TableRow key={r.rakeId}>
                <TableCell className="font-medium">{r.rakeId}</TableCell>
                <TableCell>{r.source}</TableCell>
                <TableCell>{r.destination}</TableCell>
                <TableCell>{r.material}</TableCell>
                <TableCell className="text-right">{r.wagons}</TableCell>
                <TableCell className="text-right">{Math.round(r.efficiency)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={badgeVariant(r.status)}>{r.status || "AI Predicted"}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
