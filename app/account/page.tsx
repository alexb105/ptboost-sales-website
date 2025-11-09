"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, User, XCircle, LogOut, ShoppingCart, Settings } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface UserData {
  id: string
  name: string
  email: string
  businessName: string
  hasActiveSubscription: boolean
}

function AccountContent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoadingPortal, setIsLoadingPortal] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/verify-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Login failed")
      }

      const { user } = await response.json()
      setUserData(user)
      setIsAuthenticated(true)
      toast.success("Welcome back!")
    } catch (err) {
      console.error("Error:", err)
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
      toast.error(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    setIsLoadingPortal(true)
    try {
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to load subscription portal")
      }

      const { url } = await response.json()
      
      // Open Stripe Customer Portal in a new tab
      window.open(url, "_blank")
      toast.success("Subscription portal opened in new tab")
    } catch (err) {
      console.error("Error:", err)
      toast.error(err instanceof Error ? err.message : "Failed to load portal")
    } finally {
      setIsLoadingPortal(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserData(null)
    setEmail("")
    setPassword("")
    toast.info("Logged out successfully")
  }

  const handleBuyout = () => {
    // Open the Stripe payment link in a new tab
    window.open("https://buy.stripe.com/28EfZi2FIgWf93Xdsr0co06", "_blank")
  }

  // Login Form View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/5 via-orange-500/5 to-red-500/5 p-4">
        <div className="w-full max-w-md space-y-4">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">
                Account Login
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email and subscription password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
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
                      Logging in...
                    </>
                  ) : (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      Login to Account
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                Back to Website
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard View (after login)
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-orange-500/5 to-red-500/5 p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Welcome back, {userData?.name}!</CardTitle>
                  <CardDescription>{userData?.email}</CardDescription>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Account Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Manage Subscription Card */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-orange-500/20 rounded-full -mr-16 -mt-16" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-lg">Manage Subscription</CardTitle>
              </div>
              <CardDescription>
                Access your Stripe customer portal to manage your subscription, update payment methods, view invoices, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleManageSubscription}
                disabled={isLoadingPortal}
                className="w-full h-12 bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90"
              >
                {isLoadingPortal ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading Portal...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Open Subscription Portal
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Website Buyout Card */}
          <Card className="relative overflow-hidden border-2 border-accent/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full -mr-16 -mt-16" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-lg">Own Your Website</CardTitle>
              </div>
              <CardDescription>
                Buy out your website for a special one-time price of <span className="font-bold text-green-600">£299</span> and own it completely!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5" />
                  <span>Full ownership of your website</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5" />
                  <span>No more monthly payments</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5" />
                  <span>Complete control and customization</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5" />
                  <span>All source code included</span>
                </div>
              </div>
              
              <Button 
                onClick={handleBuyout}
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Buy Out for £299
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                You'll be redirected to our secure payment page
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Business Info Card */}
        {userData?.businessName && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Business Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Business Name</p>
                  <p className="font-medium">{userData.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Back to Home */}
        <div className="flex justify-center pt-4">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              Back to Website
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/5 via-orange-500/5 to-red-500/5 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <AccountContent />
    </Suspense>
  )
}

