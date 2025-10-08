// Mock data used across pages

export const utilizationTrend = [
  { date: "Week 1", utilization: 72 },
  { date: "Week 2", utilization: 78 },
  { date: "Week 3", utilization: 74 },
  { date: "Week 4", utilization: 81 },
  { date: "Week 5", utilization: 79 },
]

export const rakesPerRoute = [
  { route: "Bokaro → Kolkata", rakes: 42 },
  { route: "Bokaro → Durgapur", rakes: 28 },
  { route: "Bokaro → Rourkela", rakes: 31 },
  { route: "Bokaro → Burnpur", rakes: 24 },
]

export type Recommendation = {
  rakeId: string
  source: string
  destination: string
  material: string
  wagons: number
  efficiency: number
  status?: "Optimized" | "Delayed" | "AI Predicted"
}

export const initialRecommendations: Recommendation[] = [
  {
    rakeId: "RK-101",
    source: "Bokaro",
    destination: "Kolkata",
    material: "Steel Coils",
    wagons: 58,
    efficiency: 88,
    status: "Optimized",
  },
  {
    rakeId: "RK-102",
    source: "Bokaro",
    destination: "Rourkela",
    material: "Billets",
    wagons: 50,
    efficiency: 84,
    status: "AI Predicted",
  },
  {
    rakeId: "RK-103",
    source: "Bokaro",
    destination: "Durgapur",
    material: "Slabs",
    wagons: 60,
    efficiency: 91,
    status: "Optimized",
  },
  {
    rakeId: "RK-104",
    source: "Bokaro",
    destination: "Burnpur",
    material: "Pig Iron",
    wagons: 45,
    efficiency: 77,
    status: "Delayed",
  },
]

export const demandVsSupply = [
  { destination: "Kolkata", demand: 120, supply: 110 },
  { destination: "Rourkela", demand: 90, supply: 95 },
  { destination: "Durgapur", demand: 100, supply: 85 },
  { destination: "Burnpur", demand: 80, supply: 75 },
]

export const utilizationOverTime = [
  { month: "Jan", utilization: 72 },
  { month: "Feb", utilization: 75 },
  { month: "Mar", utilization: 78 },
  { month: "Apr", utilization: 81 },
  { month: "May", utilization: 79 },
  { month: "Jun", utilization: 83 },
]

export type Alert = {
  id: string
  type: "Delayed Rake" | "Underutilized Wagon" | "Missing Data"
  description: string
  severity: "Low" | "Medium" | "High"
}

export const alerts: Alert[] = [
  { id: "A-01", type: "Delayed Rake", description: "RK-104 delayed by 2.5 hours at Asansol Jn.", severity: "Medium" },
  { id: "A-02", type: "Underutilized Wagon", description: "Wagon set W-220 running at 62% capacity.", severity: "Low" },
  {
    id: "A-03",
    type: "Missing Data",
    description: "Demand data for Durgapur (week 3) not uploaded.",
    severity: "High",
  },
]
