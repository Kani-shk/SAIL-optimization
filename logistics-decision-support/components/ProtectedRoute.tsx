"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getUserClient, type User } from "@/lib/auth"

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles?: Array<User["role"]>
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [status, setStatus] = useState<"checking" | "ok" | "denied">("checking")

  useEffect(() => {
    const user = getUserClient()
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`)
      return
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      setStatus("denied")
      return
    }
    setStatus("ok")
  }, [router, pathname, allowedRoles])

  if (status === "checking") {
    return <div className="p-6 text-sm text-muted-foreground">Checking access…</div>
  }
  if (status === "denied") {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Access denied</h2>
        <p className="text-sm text-muted-foreground">You do not have permission to view this page.</p>
      </div>
    )
  }
  return <>{children}</>
}
