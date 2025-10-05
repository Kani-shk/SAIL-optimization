import { AppShell } from "@/components/app-sidebar"
import { AppNavbar } from "@/components/app-navbar"
import { AppFooter } from "@/components/app-footer"
import { StatCard } from "@/components/sections/stat-card"
import { UtilizationLine, RakesPerRouteBar } from "@/components/sections/dashboard-charts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  return (
    <>
      <AppNavbar />
      <AppShell>
        <main className="mx-auto w-full max-w-screen-2xl px-4 py-6">
          <h1 className="text-balance text-2xl font-semibold mb-4">Dashboard</h1>
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard title="Total Rakes Formed" value="165" hint="Last 30 days" />
            <StatCard title="Average Utilization (%)" value="79%" hint="Last 5 weeks" />
            <StatCard title="Average Delay (hrs)" value="1.4h" hint="Across network" />
          </section>

          <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Utilization Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <UtilizationLine />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Rakes per Route</CardTitle>
              </CardHeader>
              <CardContent>
                <RakesPerRouteBar />
              </CardContent>
            </Card>
          </section>
        </main>
        <AppFooter />
      </AppShell>
    </>
  )
}
