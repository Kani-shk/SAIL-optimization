"use client"

import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltipContent } from "@/components/ui/chart"
import { demandVsSupply, utilizationOverTime } from "@/lib/mock-data"

export function UtilizationOverTime() {
  const config = {
    utilization: { label: "Utilization", color: "var(--chart-1)" },
  }
  return (
    <ChartContainer config={config} className="w-full h-72">
      <LineChart data={utilizationOverTime} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis unit="%" />
        <Tooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="utilization" stroke="var(--color-utilization)" strokeWidth={2} dot={false} />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  )
}

export function DemandVsSupply() {
  const config = {
    demand: { label: "Demand", color: "var(--chart-3)" },
    supply: { label: "Supply", color: "var(--chart-2)" },
  }
  return (
    <ChartContainer config={config} className="w-full h-72">
      <BarChart data={demandVsSupply} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="destination" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="demand" fill="var(--color-demand)" radius={4} />
        <Bar dataKey="supply" fill="var(--color-supply)" radius={4} />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}
