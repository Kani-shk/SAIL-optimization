"use client"

import type React from "react"

import { useMemo } from "react"

export type Column<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
}

export default function Table<T extends Record<string, any>>({
  columns,
  data,
  emptyText = "No data",
}: {
  columns: Column<T>[]
  data: T[]
  emptyText?: string
}) {
  const hasData = useMemo(() => data && data.length > 0, [data])
  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)} className="px-3 py-2 text-left font-medium">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!hasData ? (
            <tr>
              <td className="px-3 py-3 text-muted-foreground" colSpan={columns.length}>
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="border-t">
                {columns.map((c) => (
                  <td key={String(c.key)} className="px-3 py-2">
                    {c.render ? c.render(row) : String(row[c.key as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
