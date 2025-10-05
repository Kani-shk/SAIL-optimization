"use client"

import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltipContent } from "@/components/ui/chart"
import { utilizationTrend, rakesPerRoute } from "@/lib/mock-data"

export function UtilizationLine() {
  const config = {
    utilization: { label: "Utilization", color: "var(--chart-1)" },
  }
  return (
    <ChartContainer config={config} className="w-full h-72">
      <LineChart data={utilizationTrend} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis unit="%" />
        <Tooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="utilization" stroke="var(--color-utilization)" strokeWidth={2} dot={false} />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  )
}

export function RakesPerRouteBar() {
  const config = {
    rakes: { label: "Rakes", color: "var(--chart-3)" },
  }
  return (
    <ChartContainer config={config} className="w-full h-72">
      <BarChart data={rakesPerRoute} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="route" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="rakes" fill="var(--color-rakes)" radius={4} />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}
