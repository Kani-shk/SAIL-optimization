"use client"

import type React from "react"
import { useMemo } from "react"

import Image from "next/image"
import HeroVideo from "@/components/HeroVideo"
import ServiceCard from "@/components/ServiceCard"
import Table from "@/components/Table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { RouteIcon, BoxesIcon, LayersIcon, BadgeIndianRupee, Activity } from "lucide-react"
import { rakeAvailability, generateOptimizationResult } from "@/lib/mockData"

export default function HomePage() {
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement | null>(null)
  const { toast } = useToast()

  const scrollToMain = () => {
    mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const onSubmitContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get("name")
    toast({
      title: "Request received",
      description: `Thanks${name ? `, ${name}` : ""}! We will get back to you shortly.`,
    })
    form.reset()
  }

  const rakes = useMemo(() => generateOptimizationResult().slice(0, 5), [])

  return (
    <main className="min-h-screen bg-background">
      {/* Sticky nav */}
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Image src="/sih-logo.jpg" alt="SIH" width={32} height={32} />
            <span className="text-sm font-medium">Steel Bokaro Logistics</span>
          </div>
          <nav className="flex items-center gap-4">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </a>
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground">
              Services
            </a>
            <a href="#rakes" className="text-sm text-muted-foreground hover:text-foreground">
              Rakes
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <HeroVideo onExplore={scrollToMain} />

      {/* Main content */}
      <div ref={mainRef} className="mx-auto max-w-6xl px-4 py-10">
        {/* About */}
        <section id="about" className="py-8">
          <h2 className="text-pretty text-2xl font-semibold">About the Challenge</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Manual rake formation at scale leads to suboptimal utilization, higher costs, and scheduling delays. Our
            solution provides an AI-assisted decision support system to automate planning under operational constraints.
          </p>
        </section>

        {/* Objectives */}
        <section className="py-8">
          <h2 className="text-pretty text-2xl font-semibold">Our Objective</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
            <li>Automate rake formation and assignment against demand and inventory</li>
            <li>Minimize total logistics cost while respecting yard, wagon, and route constraints</li>
            <li>Increase rake utilization and reduce turnaround time</li>
            <li>Provide transparent, auditable decisions with explainability</li>
          </ul>
        </section>

        {/* Services */}
        <section id="services" className="py-8">
          <h2 className="text-pretty text-2xl font-semibold">Services</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              title="Rake Planning"
              description="Compose rakes against live orders and inventory, respecting constraints."
              icon={LayersIcon}
            />
            <ServiceCard
              title="Route Optimization"
              description="Choose feasible routes accounting for timetables and yard capacities."
              icon={RouteIcon}
            />
            <ServiceCard
              title="Inventory Mapping"
              description="Map material availability and loading points across yards."
              icon={BoxesIcon}
            />
            <ServiceCard
              title="Cost Minimization"
              description="Optimize for total logistics cost with tunable parameters."
              icon={BadgeIndianRupee}
            />
            <ServiceCard
              title="Real-Time Monitoring"
              description="Track execution KPIs and respond to disruptions promptly."
              icon={Activity}
            />
          </div>
        </section>

        {/* Rakes */}
        <section id="rakes" className="py-8">
          <h2 className="text-pretty text-2xl font-semibold">Available Rakes</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Total available rakes today: <span className="font-medium">{rakeAvailability.totalRakes}</span> • Wagons
            available: <span className="font-medium">{rakeAvailability.wagonsAvailable}</span>
          </p>
          <div className="mt-4">
            <Table
              columns={[
                { key: "rakeId", header: "Rake" },
                { key: "material", header: "Material" },
                { key: "totalTons", header: "Tons" },
                { key: "origin", header: "Origin" },
                { key: "destination", header: "Destination" },
                {
                  key: "departureTime",
                  header: "Departure",
                  render: (r) => new Date(r.departureTime).toLocaleString(),
                },
                {
                  key: "arrivalTime",
                  header: "Arrival",
                  render: (r) => new Date(r.arrivalTime).toLocaleString(),
                },
              ]}
              data={rakes}
              emptyText="No rakes available"
            />
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-8">
          <h2 className="text-pretty text-2xl font-semibold">How It Works</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-md border p-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
              <div className="text-xs text-muted-foreground">Step 1</div>
              <div className="mt-1 text-sm font-semibold">Data Input</div>
              <p className="mt-2 text-xs text-muted-foreground">
                Orders, inventories, wagons, yard capacities, and constraints ingested.
              </p>
            </div>
            <div className="rounded-md border p-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
              <div className="text-xs text-muted-foreground">Step 2</div>
              <div className="mt-1 text-sm font-semibold">Optimization</div>
              <p className="mt-2 text-xs text-muted-foreground">
                AI-assisted engine generates feasible, cost-minimizing rake plans.
              </p>
            </div>
            <div className="rounded-md border p-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
              <div className="text-xs text-muted-foreground">Step 3</div>
              <div className="mt-1 text-sm font-semibold">Dispatch Plan</div>
              <p className="mt-2 text-xs text-muted-foreground">
                Assign rakes, routes, and timetables with explainable rationale.
              </p>
            </div>
            <div className="rounded-md border p-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
              <div className="text-xs text-muted-foreground">Step 4</div>
              <div className="mt-1 text-sm font-semibold">Cost Savings Visualization</div>
              <p className="mt-2 text-xs text-muted-foreground">
                Monitor utilization, costs saved, and operational KPIs in real time.
              </p>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section id="transparency" className="py-8">
          <h2 className="text-pretty text-2xl font-semibold">Transparency &amp; What We Do</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Every plan includes rationale and audit metadata. We surface the key constraints, trade-offs, and decision
            paths behind each recommendation—building operational trust and accountability.
          </p>
        </section>

        {/* KPIs (public highlight) */}
        <section className="py-8">
          <h2 className="text-pretty text-2xl font-semibold">Live KPIs</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-md border p-4">
              <div className="text-xs text-muted-foreground">Utilization</div>
              <div className="text-lg font-semibold">86%</div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-xs text-muted-foreground">Pending Orders</div>
              <div className="text-lg font-semibold">42</div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-xs text-muted-foreground">Cost Saved</div>
              <div className="text-lg font-semibold">₹12.5L</div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-xs text-muted-foreground">Rakes Today</div>
              <div className="text-lg font-semibold">28</div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-8">
          <h2 className="text-pretty text-2xl font-semibold">Contact / Request Access</h2>
          <form onSubmit={onSubmitContact} className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              name="name"
              required
              placeholder="Your name"
              className="rounded-md border px-3 py-2 text-sm"
              aria-label="Name"
            />
            <input
              name="email"
              required
              type="email"
              placeholder="Your email"
              className="rounded-md border px-3 py-2 text-sm"
              aria-label="Email"
            />
            <textarea
              name="message"
              required
              placeholder="Tell us about your use case"
              className="md:col-span-2 rounded-md border px-3 py-2 text-sm"
              rows={4}
              aria-label="Message"
            />
            <div>
              <Button type="submit" className="bg-primary text-primary-foreground">
                Submit
              </Button>
            </div>
          </form>
        </section>
      </div>

      <footer className="border-t bg-muted/40">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Image src="/sih-logo.jpg" alt="SIH" width={24} height={24} />
            <span className="text-xs text-muted-foreground">Smart India Hackathon — Steel Bokaro Logistics</span>
          </div>
          <div className="text-xs text-muted-foreground">Contact: support@steelbokaro.example • +91 00000 00000</div>
        </div>
      </footer>
    </main>
  )
}
