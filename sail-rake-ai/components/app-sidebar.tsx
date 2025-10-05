"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Home, BrainCircuit, Upload, BarChart3, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

const links = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/ai-recommendations", label: "AI Recommendations", icon: BrainCircuit },
  { href: "/upload-data", label: "Upload Data", icon: Upload },
  { href: "/visualization", label: "Visualization", icon: BarChart3 },
  { href: "/alerts", label: "Alerts", icon: AlertTriangle },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="px-2 py-1">
              <span className="text-sm font-medium text-muted-foreground">Navigation</span>
            </div>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs">Sections</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {links.map((l) => {
                    const Icon = l.icon
                    const active = pathname === l.href
                    return (
                      <SidebarMenuItem key={l.href}>
                        <SidebarMenuButton asChild isActive={active}>
                          <Link href={l.href} className="flex items-center gap-2">
                            <Icon className="text-muted-foreground" />
                            <span>{l.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="px-2">
            <Button asChild size="sm" className="w-full">
              <a href="https://vercel.com" target="_blank" rel="noreferrer">
                Help & Docs
              </a>
            </Button>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="bg-background">{children}</SidebarInset>
      </div>
    </SidebarProvider>
  )
}
