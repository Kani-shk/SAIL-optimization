import { AppShell } from "@/components/app-sidebar"
import { AppNavbar } from "@/components/app-navbar"
import { AppFooter } from "@/components/app-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { alerts } from "@/lib/mock-data"
import { AlertTriangle, Package, FileWarning } from "lucide-react"

const iconForType = (type: string) => {
  if (type === "Delayed Rake") return AlertTriangle
  if (type === "Underutilized Wagon") return Package
  return FileWarning
}

const variantForSeverity = (severity: "Low" | "Medium" | "High") => {
  switch (severity) {
    case "High":
      return "destructive" as const
    case "Medium":
      return "default" as const
    case "Low":
    default:
      return "secondary" as const
  }
}

export default function Page() {
  return (
    <>
      <AppNavbar />
      <AppShell>
        <main className="mx-auto w-full max-w-screen-2xl px-4 py-6">
          <h1 className="text-balance text-2xl font-semibold mb-4">Alerts</h1>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {alerts.map((a) => {
              const Icon = iconForType(a.type)
              return (
                <Card key={a.id} className="bg-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                      <Icon className="text-amber-500" />
                      <CardTitle className="text-sm">{a.type}</CardTitle>
                    </div>
                    <Badge variant={variantForSeverity(a.severity)}>{a.severity}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{a.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </main>
        <AppFooter />
      </AppShell>
    </>
  )
}
