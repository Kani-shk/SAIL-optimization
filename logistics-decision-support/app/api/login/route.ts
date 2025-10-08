export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) {
      return new Response(JSON.stringify({ error: "Missing credentials" }), { status: 400 })
    }
    if (username === "kanishk" && password === "Kanishk") {
      return Response.json({ role: "admin" })
    }
    return new Response(JSON.stringify({ error: "Invalid credentials. Please try again." }), { status: 401 })
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 })
  }
}
