"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AppNavbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b bg-card text-card-foreground sticky top-0 z-20">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Image src="/placeholder-logo.svg" alt="AI Logo" width={24} height={24} className="opacity-80" />
          <Link href="/" className="font-semibold tracking-tight text-pretty">
            SAIL Rake AI
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle dark mode"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
          <Button variant="outline" size="icon" aria-label="User">
            <User className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
