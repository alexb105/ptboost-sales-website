"use client"

import { useState, Suspense, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, CreditCard, User, XCircle, LogOut, ShoppingCart, Settings, CheckCircle, Info, Code, Shield, Zap, Globe } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

interface UserData {
  id: string
  name: string
  email: string
  businessName: string
  hasActiveSubscription: boolean
  websiteOwned: boolean
}

function AccountContent() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoadingPortal, setIsLoadingPortal] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [buyoutDialogOpen, setBuyoutDialogOpen] = useState(false)
  const [buyoutLink, setBuyoutLink] = useState("")

  // Check for success parameter from Stripe portal return
  useEffect(() => {
    const success = searchParams.get('success')
    if (success === 'true') {
      setShowSuccessMessage(true)
      toast.success("Your subscription settings have been updated!")
      // Clear the success parameter from URL
      window.history.replaceState({}, '', '/account')
    }
  }, [searchParams])

  // Fetch payment links on mount
  useEffect(() => {
    fetchPaymentLinks()
  }, [])

  const fetchPaymentLinks = async () => {
    try {
      const response = await fetch('/api/payment-links')
      const data = await response.json()
      if (data.buyoutLink) {
        setBuyoutLink(data.buyoutLink)
      } else {
        // Fallback to default if not set
        setBuyoutLink("https://buy.stripe.com/14AdRafsueO70xr3RR0co05")
      }
    } catch (error) {
      console.error('Error fetching payment links:', error)
      // Fallback to default on error
      setBuyoutLink("https://buy.stripe.com/14AdRafsueO70xr3RR0co05")
    }
  }

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
    if (buyoutLink) {
      window.open(buyoutLink, "_blank")
    } else {
      toast.error("Payment link not configured. Please contact support.")
    }
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
        {/* Success message after returning from Stripe portal */}
        {showSuccessMessage && (
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your subscription settings have been updated successfully!
            </AlertDescription>
          </Alert>
        )}

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
          <Card className={`relative overflow-hidden ${userData?.websiteOwned ? 'border-2 border-green-500/30 bg-green-50/50' : 'border-2 border-accent/20'}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${userData?.websiteOwned ? 'from-green-500/30 to-emerald-500/30' : 'from-green-500/20 to-emerald-500/20'} rounded-full -mr-16 -mt-16`} />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg ${userData?.websiteOwned ? 'bg-green-500/20' : 'bg-green-500/10'} flex items-center justify-center`}>
                  {userData?.websiteOwned ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <ShoppingCart className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <CardTitle className="text-lg">
                  {userData?.websiteOwned ? 'Website Owned ✓' : 'Own Your Website'}
                </CardTitle>
              </div>
              <CardDescription>
                {userData?.websiteOwned ? (
                  <span className="text-green-700 font-medium">
                    Congratulations! You own your website completely. No more monthly payments required.
                  </span>
                ) : (
                  <>
                    Buy out your website for a special one-time price of <span className="font-bold text-green-600">£299</span> and own it completely!
                  </>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData?.websiteOwned ? (
                <>
                  <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <p className="font-semibold text-green-900">You're all set!</p>
                        <p className="text-sm text-green-800">
                          Your website is fully owned. You'll receive a download link with all source code and files within 24-48 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="space-y-2">
                      <p className="font-semibold text-blue-900 text-sm">📋 Important Information</p>
                      <p className="text-sm text-blue-800">
                        You can cancel your subscription at any time, and your website will remain live on our servers. 
                        If you'd like your website removed from PTBoost servers, please email me at{" "}
                        <a href="mailto:alexander.ptboost@gmail.com" className="text-blue-600 hover:underline font-medium">
                          alexander.ptboost@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="line-through opacity-50">Full ownership of your website</span>
                      <span className="text-green-600 font-medium ml-2">✓ Owned</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="line-through opacity-50">No more monthly payments</span>
                      <span className="text-green-600 font-medium ml-2">✓ Complete</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="line-through opacity-50">Complete control and customization</span>
                      <span className="text-green-600 font-medium ml-2">✓ Yours</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="line-through opacity-50">All source code included</span>
                      <span className="text-green-600 font-medium ml-2">✓ Included</span>
                    </div>
                  </div>
                  <Button 
                    disabled
                    className="w-full h-12 bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Already Purchased
                  </Button>
                </>
              ) : (
                <>
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
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleBuyout}
                      className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buy Out for £299
                    </Button>
                    
                    <Dialog open={buyoutDialogOpen} onOpenChange={setBuyoutDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline"
                          className="h-12 border-green-200 hover:bg-green-50"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                              <ShoppingCart className="h-5 w-5 text-green-600" />
                            </div>
                            Own Your Website - Complete Guide
                          </DialogTitle>
                          <DialogDescription className="text-base pt-2">
                            Everything you need to know about buying out your website for £299
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6 pt-4">
                          {/* Price Section */}
                          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">£299</span>
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-green-900">One-Time Payment</h3>
                                <p className="text-sm text-green-700">No recurring charges, no hidden fees</p>
                              </div>
                            </div>
                          </div>

                          {/* Benefits Section */}
                          <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              What You Get
                            </h3>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                    <Shield className="h-5 w-5 text-green-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">Full Ownership</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Complete legal ownership of your website. It's yours forever, no strings attached.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                    <Zap className="h-5 w-5 text-green-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">No Monthly Fees</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Stop paying £7.99/month forever. One payment of £299 and you're done.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                    <Code className="h-5 w-5 text-green-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">Complete Source Code</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Receive all HTML, CSS, JavaScript, and assets. Full access to customize everything.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                    <Globe className="h-5 w-5 text-green-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">Host Anywhere</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Deploy to any hosting provider. Move to your own server, Vercel, Netlify, or anywhere.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* What's Included */}
                          <div>
                            <h3 className="font-semibold text-lg mb-3">What's Included in Your Download</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Complete website source code (HTML, CSS, JavaScript)</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>All images, fonts, and assets</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Documentation and setup instructions</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Responsive design files</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>All customizations and features</span>
                              </div>
                            </div>
                          </div>

                          {/* Process */}
                          <div>
                            <h3 className="font-semibold text-lg mb-3">How It Works</h3>
                            <div className="space-y-3">
                              <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                                  1
                                </div>
                                <div>
                                  <p className="font-medium">Make Payment</p>
                                  <p className="text-sm text-muted-foreground">Complete your £299 payment securely via Stripe</p>
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                                  2
                                </div>
                                <div>
                                  <p className="font-medium">Receive Download Link</p>
                                  <p className="text-sm text-muted-foreground">We'll email you a download link within 24-48 hours</p>
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                                  3
                                </div>
                                <div>
                                  <p className="font-medium">Download & Deploy</p>
                                  <p className="text-sm text-muted-foreground">Download your files and deploy to any hosting provider</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Important Notes */}
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                              <Info className="h-4 w-4" />
                              Important Information
                            </h3>
                            <div className="space-y-2 text-sm text-blue-800">
                              <p>
                                • You can cancel your subscription at any time, and your website will remain live on our servers
                              </p>
                              <p>
                                • If you'd like your website removed from PTBoost servers after purchase, email{" "}
                                <a href="mailto:alexander.ptboost@gmail.com" className="text-blue-600 hover:underline font-medium">
                                  alexander.ptboost@gmail.com
                                </a>
                              </p>
                              <p>
                                • The download link will be sent to your registered email address
                              </p>
                              <p>
                                • All files are provided as-is and ready to deploy
                              </p>
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="pt-4 border-t">
                            <Button 
                              onClick={() => {
                                setBuyoutDialogOpen(false)
                                handleBuyout()
                              }}
                              className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Buy Out for £299 Now
                            </Button>
                            <p className="text-xs text-center text-muted-foreground mt-2">
                              Secure payment via Stripe
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    You'll be redirected to our secure payment page
                  </p>
                </>
              )}
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

