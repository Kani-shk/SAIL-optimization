import Image from "next/image"
import { AppShell } from "@/components/app-sidebar"
import { AppNavbar } from "@/components/app-navbar"
import { AppFooter } from "@/components/app-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UtilizationOverTime, DemandVsSupply } from "@/components/sections/visualization-charts"

export default function Page() {
  return (
    <>
      <AppNavbar />
      <AppShell>
        <main className="mx-auto w-full max-w-screen-2xl px-4 py-6">
          <h1 className="text-balance text-2xl font-semibold mb-4">Visualization</h1>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Rake Utilization Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <UtilizationOverTime />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Demand vs Supply by Destination</CardTitle>
              </CardHeader>
              <CardContent>
                <DemandVsSupply />
              </CardContent>
            </Card>
          </section>

          <section className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Route Map (Placeholder)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[3/1] w-full overflow-hidden rounded-md border">
                  <Image
                    src="/map-of-routes-from-bokaro-to-cmo-stockyards-to-cus.jpg"
                    alt="Map placeholder showing train routes from Bokaro to CMO stockyards to customers"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
        <AppFooter />
      </AppShell>
    </>
  )
}
