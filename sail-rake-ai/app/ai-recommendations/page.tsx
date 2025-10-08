import { AppShell } from "@/components/app-sidebar"
import { AppNavbar } from "@/components/app-navbar"
import { AppFooter } from "@/components/app-footer"
import { RecommendationsTable } from "@/components/sections/recommendations-table"

export default function Page() {
  return (
    <>
      <AppNavbar />
      <AppShell>
        <main className="mx-auto w-full max-w-screen-2xl px-4 py-6">
          <h1 className="text-balance text-2xl font-semibold mb-4">AI Recommendations</h1>
          <RecommendationsTable />
        </main>
        <AppFooter />
      </AppShell>
    </>
  )
}
