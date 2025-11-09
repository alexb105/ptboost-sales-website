"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

// Redirect to /account page
// This page is deprecated - all subscription management now happens through /account
export default function ManageSubscriptionPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/account')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/5 via-orange-500/5 to-red-500/5 p-4">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent mx-auto mb-4" />
        <p className="text-muted-foreground">Redirecting to account page...</p>
      </div>
    </div>
  )
}
