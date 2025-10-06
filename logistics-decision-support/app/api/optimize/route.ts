import { generateOptimizationResult } from "@/lib/mockData"

export async function POST() {
  const data = generateOptimizationResult()
  return Response.json(data)
}

export async function GET() {
  // Allow GET for quick testing
  const data = generateOptimizationResult()
  return Response.json(data)
}
