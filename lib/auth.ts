// This is a mock authentication service
// In a real application, this would connect to your authentication backend

interface SignInCredentials {
  email: string
  password: string
}

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "local" | "user"
}
export const authOptions = {
  // ... other configurations
  secret: process.env.NEXTAUTH_SECRET,
  // ... rest of your auth configuration
}
// Demo accounts
const demoAccounts = {
  local: {
    id: "demo-local-123",
    email: "demo.local@example.com",
    name: "Demo Local",
    role: "local" as const,
    password: "demolocal123", // In a real app, never store passwords in plain text
  },
  admin: {
    id: "demo-admin-456",
    email: "demo.admin@example.com",
    name: "Demo Admin",
    role: "admin" as const,
    password: "demoadmin123",
  },
}

export async function signIn(credentials: SignInCredentials): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check for demo accounts
  if (credentials.email === demoAccounts.local.email && credentials.password === demoAccounts.local.password) {
    return {
      id: demoAccounts.local.id,
      email: demoAccounts.local.email,
      name: demoAccounts.local.name,
      role: demoAccounts.local.role,
    }
  }

  if (credentials.email === demoAccounts.admin.email && credentials.password === demoAccounts.admin.password) {
    return {
      id: demoAccounts.admin.id,
      email: demoAccounts.admin.email,
      name: demoAccounts.admin.name,
      role: demoAccounts.admin.role,
    }
  }

  // If credentials don't match demo accounts, throw an error
  throw new Error("Invalid login credentials")
}

export async function signOut(): Promise<void> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would clear session cookies, tokens, etc.
  return
}

export async function getCurrentUser(): Promise<User | null> {
  // In a real app, this would check for an active session
  // and return the current user data if authenticated
  return null
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

export async function hasRole(role: string): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false
  return user.role === role
}

