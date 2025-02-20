"use client"

import { ReactNode, useEffect, useState } from "react"

/**
 * Renders a component only on the client, and returns null on the server.
 * This makes sure that dynamic content in the client doesn't cause hydration errors.
 * It is also useful for preventing enter-animations from running twice.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return children
}
