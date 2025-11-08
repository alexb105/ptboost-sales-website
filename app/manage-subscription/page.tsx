"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function ManageSubscriptionPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const success = searchParams.get('success')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to create portal session")
      }

      const { url } = await response.json()
      
      // Redirect to Stripe Customer Portal
      window.location.href = url
    } catch (err) {
      console.error("Error:", err)
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      toast.error(err instanceof Error ? err.message : "Failed to access portal")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/5 via-orange-500/5 to-red-500/5 p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Success message after returning from portal */}
        {success === 'true' && (
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your subscription settings have been updated successfully!
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">
              Manage Your Subscription
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and subscription password for secure access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">
                  Use the email address you used when you signed up
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Subscription Password</Label>
                <Input
                  id="password"
                  type="text"
                  placeholder="XXX-XXX-XX"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.toUpperCase())}
                  required
                  disabled={isLoading}
                  className="h-12 font-mono tracking-wider"
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground">
                  Find this in your confirmation email (format: XXX-XXX-XX)
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Access Portal
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t space-y-3">
              <p className="text-sm text-muted-foreground">
                In the Customer Portal, you can:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5" />
                  <span>Cancel or pause your subscription</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5" />
                  <span>Update your payment method</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5" />
                  <span>View billing history and invoices</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5" />
                  <span>Update billing information</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Website
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

