"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { setUserClient } from "@/lib/auth"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Invalid credentials. Please try again.")
      }
      const data: { role: "admin" | "operator" } = await res.json()
      setUserClient({ username, role: data.role })
      router.replace("/admin/dashboard")
    } catch (err: any) {
      setError(err.message ?? "Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-3">
            {error ? (
              <Alert variant="destructive">
                <AlertDescription>Invalid credentials. Please try again.</AlertDescription>
              </Alert>
            ) : null}
            <div>
              <label className="mb-1 block text-sm">Username</label>
              <input
                className="w-full rounded-md border px-3 py-2 text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="kanishk"
                aria-label="Username"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">Password</label>
              <input
                type="password"
                className="w-full rounded-md border px-3 py-2 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Kanishk"
                aria-label="Password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end">
            <Button disabled={loading} type="submit" className="bg-primary text-primary-foreground">
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
