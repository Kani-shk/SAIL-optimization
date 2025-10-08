"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-sidebar"
import { AppNavbar } from "@/components/app-navbar"
import { AppFooter } from "@/components/app-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"

export default function Page() {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  const simulateUpload = async () => {
    setLoading(true)
    setProgress(0)
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 120))
      setProgress(i)
    }
    setLoading(false)
  }

  return (
    <>
      <AppNavbar />
      <AppShell>
        <main className="mx-auto w-full max-w-screen-2xl px-4 py-6">
          <h1 className="text-balance text-2xl font-semibold mb-4">Upload Data</h1>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Upload CSV/Excel Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Upload Rake Schedule</Label>
                  <Input type="file" accept=".csv,.xlsx" />
                </div>
                <div className="space-y-2">
                  <Label>Upload Demand Data</Label>
                  <Input type="file" accept=".csv,.xlsx" />
                </div>
                <div className="space-y-2">
                  <Label>Upload Wagon Availability</Label>
                  <Input type="file" accept=".csv,.xlsx" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={simulateUpload} disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner className="mr-2" />
                      Uploading...
                    </>
                  ) : (
                    "Start Upload"
                  )}
                </Button>
                <div className="flex-1">
                  <Progress value={progress} className="h-2" />
                </div>
                <span className="text-xs text-muted-foreground w-10 text-right">{progress}%</span>
              </div>
            </CardContent>
          </Card>
        </main>
        <AppFooter />
      </AppShell>
    </>
  )
}
