export type Order = {
  id: string
  customer: string
  material: string
  quantityTons: number
  origin: string
  destination: string
  dueDate: string
  priority: "High" | "Medium" | "Low"
}

export type InventoryItem = {
  id: string
  yard: string
  material: string
  availableTons: number
}

export type RakeAvailability = {
  date: string
  totalRakes: number
  wagonsAvailable: number
}

export type OptimizationResult = {
  rakeId: string
  material: string
  assignedOrders: string[]
  totalTons: number
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  estimatedCost: number
}

export const kpis = {
  totalRakes: 28,
  utilizationPct: 86.4,
  costSaved: 1250000, // INR
  pendingOrders: 42,
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    customer: "AutoCo East",
    material: "Hot Rolled Coil",
    quantityTons: 2200,
    origin: "Bokaro Yard A",
    destination: "Kolkata Depot",
    dueDate: "2025-10-08",
    priority: "High",
  },
  {
    id: "ORD-002",
    customer: "InfraBuild",
    material: "Pig Iron",
    quantityTons: 1500,
    origin: "Bokaro Yard B",
    destination: "Patna Yard",
    dueDate: "2025-10-09",
    priority: "Medium",
  },
  {
    id: "ORD-003",
    customer: "RailFab",
    material: "Plates",
    quantityTons: 1800,
    origin: "Bokaro Yard C",
    destination: "Ranchi Hub",
    dueDate: "2025-10-10",
    priority: "Low",
  },
  // ... add more as needed for table pagination
]

export const inventory: InventoryItem[] = [
  { id: "INV-001", yard: "Bokaro Yard A", material: "HRC", availableTons: 5400 },
  { id: "INV-002", yard: "Bokaro Yard B", material: "Pig Iron", availableTons: 3200 },
  { id: "INV-003", yard: "Bokaro Yard C", material: "Plates", availableTons: 4100 },
  { id: "INV-004", yard: "Bokaro Yard D", material: "Wire Rods", availableTons: 2800 },
]

export const rakeAvailability: RakeAvailability = {
  date: "2025-10-06",
  totalRakes: 30,
  wagonsAvailable: 1320,
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateOptimizationResult(): OptimizationResult[] {
  const mats = ["HRC", "Pig Iron", "Plates", "Wire Rods"]
  const dests = ["Kolkata Depot", "Patna Yard", "Ranchi Hub", "Jamshedpur"]
  const origins = ["Bokaro Yard A", "Bokaro Yard B", "Bokaro Yard C", "Bokaro Yard D"]

  const rows: OptimizationResult[] = Array.from({ length: 8 }).map((_, i) => {
    const tons = randomInt(1200, 2500)
    const departure = new Date(Date.now() + i * 3.6e6)
    const arrival = new Date(departure.getTime() + randomInt(6, 16) * 3.6e6)
    const assigned = orders.slice(0, randomInt(1, 3)).map((o) => o.id)
    return {
      rakeId: `RAKE-${100 + i}`,
      material: mats[randomInt(0, mats.length - 1)],
      assignedOrders: assigned,
      totalTons: tons,
      origin: origins[randomInt(0, origins.length - 1)],
      destination: dests[randomInt(0, dests.length - 1)],
      departureTime: departure.toISOString(),
      arrivalTime: arrival.toISOString(),
      estimatedCost: randomInt(500000, 1200000),
    }
  })
  return rows
}
