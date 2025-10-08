"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { clearUserClient, getUserClient } from "@/lib/auth"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const nav = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/optimization", label: "Optimization" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/inventory", label: "Inventory" },
    { href: "/admin/reports", label: "Reports" },
  ]

  const logout = () => {
    clearUserClient()
    router.replace("/login")
  }

  const user = getUserClient()

  return (
    <ProtectedRoute allowedRoles={["admin", "operator"]}>
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className="border-b md:border-b-0 md:border-r">
          <div className="p-4 text-sm font-semibold">SBL Admin</div>
          <nav className="flex flex-row overflow-x-auto border-t md:flex-col md:border-t-0">
            {nav.map((n) => {
              const active = pathname?.startsWith(n.href)
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`px-4 py-3 text-sm md:px-4 md:py-2 ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              )
            })}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-col">
          <header className="flex items-center justify-between border-b px-4 py-2">
            <div className="text-sm text-muted-foreground">Role: {user?.role ?? "—"}</div>
            <div className="flex items-center gap-3">
              <div className="text-sm">{user?.username ?? "User"}</div>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </header>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
