export type User = {
  username: string
  role: "admin" | "operator"
}

const KEY = "sbl_user"

export function getUserClient(): User | null {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function setUserClient(user: User) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(KEY, JSON.stringify(user))
}

export function clearUserClient() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(KEY)
}
