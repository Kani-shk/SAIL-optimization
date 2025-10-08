"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import { Button } from "@/components/ui/button"
import { generateOptimizationResult } from "@/lib/mockData"

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function toCSV(rows: any[]) {
  if (!rows.length) return ""
  const headers = Object.keys(rows[0])
  const lines = [headers.join(",")]
  for (const r of rows) {
    lines.push(headers.map((h) => JSON.stringify(r[h] ?? "")).join(","))
  }
  return lines.join("\n")
}

export default function ReportsPage() {
  const downloadCSV = () => {
    const data = generateOptimizationResult()
    const csv = toCSV(data)
    downloadBlob("daily-dispatch-plan.csv", new Blob([csv], { type: "text/csv;charset=utf-8" }))
  }

  const downloadPDF = () => {
    // Mock PDF: simple text blob with .pdf extension
    const text = `Daily Dispatch Plan\n\n${new Date().toLocaleString()}\n\nRecords: ${
      generateOptimizationResult().length
    }\n\n(This is a mock file for demo purposes.)`
    downloadBlob("daily-dispatch-plan.pdf", new Blob([text], { type: "application/pdf" }))
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="text-sm text-muted-foreground">Export the Daily Dispatch Plan as CSV or PDF (mock).</p>
        <div className="flex gap-3">
          <Button onClick={downloadCSV} className="bg-primary text-primary-foreground">
            Download CSV
          </Button>
          <Button variant="outline" onClick={downloadPDF}>
            Download PDF
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  )
}
