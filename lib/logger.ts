export function logAuthEvent(event: string, userId: string) {
  // In a real application, you would send this data to your logging/analytics service
  console.log(`Auth event: ${event}, User ID: ${userId}, Timestamp: ${new Date().toISOString()}`)
}

