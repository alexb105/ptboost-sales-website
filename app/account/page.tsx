"use client"

import { useState, Suspense, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Loader2, CreditCard, User, XCircle, LogOut, ShoppingCart, Settings, CheckCircle, Info, Code, Shield, Zap, Globe, Trash2, AlertTriangle, Calendar, Wrench, ExternalLink, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useIsMobile } from "@/hooks/use-mobile"

interface UserData {
  id: string
  name: string
  email: string
  businessName: string
  hasActiveSubscription: boolean
  websiteOwned: boolean
  subscribed: boolean
  subscriptionEndDate: string | null // When canceled subscription expires
  adminDashboardUrl: string | null
  visitWebsiteUrl: string | null
}

function AccountContent() {
  const searchParams = useSearchParams()
  const isMobile = useIsMobile()
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
  const [subscriptionLink, setSubscriptionLink] = useState("")
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false)
  const [deleteReason, setDeleteReason] = useState("")
  const [deleteNotes, setDeleteNotes] = useState("")
  const [isSubmittingDeletion, setIsSubmittingDeletion] = useState(false)
  const [deletionSuccess, setDeletionSuccess] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [cancelNotes, setCancelNotes] = useState("")
  const [isSubmittingCancellation, setIsSubmittingCancellation] = useState(false)
  const [cancellationSuccess, setCancellationSuccess] = useState(false)
  const [customRequestDialogOpen, setCustomRequestDialogOpen] = useState(false)
  const [customRequestDetails, setCustomRequestDetails] = useState("")
  const [isSubmittingCustomRequest, setIsSubmittingCustomRequest] = useState(false)
  const [customRequestSuccess, setCustomRequestSuccess] = useState(false)
  const [urlEditDialogOpen, setUrlEditDialogOpen] = useState(false)
  const [editingUrlType, setEditingUrlType] = useState<'admin' | 'website' | null>(null)
  const [tempAdminUrl, setTempAdminUrl] = useState("")
  const [tempWebsiteUrl, setTempWebsiteUrl] = useState("")
  const [isUpdatingUrls, setIsUpdatingUrls] = useState(false)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)
  const [notLiveDialogOpen, setNotLiveDialogOpen] = useState(false)

  // Fetch latest user data from server (keeps ownership panel in sync)
  const refreshUserData = async (loginEmail: string, loginPassword: string) => {
    try {
      const response = await fetch("/api/verify-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })
      if (!response.ok) return
      const { user } = await response.json()
      setUserData(user)
      // Persist the freshest user snapshot
      localStorage.setItem('ptboost_account_userData', JSON.stringify(user))
    } catch {
      // Silently ignore – we'll keep showing the last known state
    }
  }

  // Check for saved authentication state on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('ptboost_account_auth')
    const savedUserData = localStorage.getItem('ptboost_account_userData')
    const savedEmail = localStorage.getItem('ptboost_account_email')
    const savedPassword = localStorage.getItem('ptboost_account_password')
    
    if (savedAuth === 'true' && savedUserData && savedEmail && savedPassword) {
      try {
        const userData = JSON.parse(savedUserData)
        setUserData(userData)
        setEmail(savedEmail)
        setPassword(savedPassword)
        setIsAuthenticated(true)
        // Always re-validate from server so the panel reflects latest ownership
        refreshUserData(savedEmail, savedPassword)
      } catch (error) {
        console.error('Error restoring session:', error)
        // Clear invalid data
        localStorage.removeItem('ptboost_account_auth')
        localStorage.removeItem('ptboost_account_userData')
        localStorage.removeItem('ptboost_account_email')
        localStorage.removeItem('ptboost_account_password')
      }
    }
  }, [])

  // Also refresh when the tab regains focus (covers returning after completing payment)
  useEffect(() => {
    const handleFocus = () => {
      const savedAuth = localStorage.getItem('ptboost_account_auth')
      const savedEmail = localStorage.getItem('ptboost_account_email')
      const savedPassword = localStorage.getItem('ptboost_account_password')
      if (savedAuth === 'true' && savedEmail && savedPassword) {
        refreshUserData(savedEmail, savedPassword)
      }
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  // Check for success parameter from Stripe portal/checkout return
  useEffect(() => {
    const success = searchParams.get('success')
    const sessionId = searchParams.get('session_id')
    
    if (success === 'true') {
      setShowSuccessMessage(true)
      toast.success("Your subscription settings have been updated!")
      
      // Refresh user data to reflect updated subscription status
      const savedEmail = localStorage.getItem('ptboost_account_email')
      const savedPassword = localStorage.getItem('ptboost_account_password')
      if (savedEmail && savedPassword) {
        refreshUserData(savedEmail, savedPassword)
      }
      
      // Clear the success parameter from URL
      window.history.replaceState({}, '', '/account')
    } else if (sessionId) {
      // Returning from Stripe checkout - refresh user data
      toast.success("Payment completed! Updating your subscription status...")
      const savedEmail = localStorage.getItem('ptboost_account_email')
      const savedPassword = localStorage.getItem('ptboost_account_password')
      if (savedEmail && savedPassword) {
        refreshUserData(savedEmail, savedPassword)
      }
      // Clear the session_id parameter from URL
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
        setBuyoutLink("https://buy.stripe.com/4gMfZidkm49t2Fzcon0co08")
      }
      if (data.subscriptionLink) {
        setSubscriptionLink(data.subscriptionLink)
      }
    } catch (error) {
      console.error('Error fetching payment links:', error)
      // Fallback to default on error
      setBuyoutLink("https://buy.stripe.com/4gMfZidkm49t2Fzcon0co08")
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
      
      // Save authentication state to localStorage
      localStorage.setItem('ptboost_account_auth', 'true')
      localStorage.setItem('ptboost_account_userData', JSON.stringify(user))
      localStorage.setItem('ptboost_account_email', email)
      localStorage.setItem('ptboost_account_password', password)
      
      toast.success("Welcome back!")
    } catch (err) {
      console.error("Error:", err)
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
      toast.error(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitCancellation = async () => {
    if (!email || !password) {
      toast.error("Please log in again and try submitting your request.")
      return
    }
    if (!cancelReason.trim()) {
      toast.error("Please select a reason.")
      return
    }
    setIsSubmittingCancellation(true)
    try {
      const response = await fetch("/api/cancellation-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: userData?.name || "",
          businessName: userData?.businessName || "",
          reason: cancelReason,
          notes: cancelNotes,
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error((data as any).error || "Failed to submit cancellation request")
      }
      toast.success("Cancellation request sent. We'll email you shortly.")
      setCancellationSuccess(true)
      setCancelDialogOpen(false)
      setCancelReason("")
      setCancelNotes("")
    } catch (err) {
      console.error("Error:", err)
      toast.error(err instanceof Error ? err.message : "Failed to send request")
    } finally {
      setIsSubmittingCancellation(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserData(null)
    setEmail("")
    setPassword("")
    
    // Clear authentication state from localStorage
    localStorage.removeItem('ptboost_account_auth')
    localStorage.removeItem('ptboost_account_userData')
    localStorage.removeItem('ptboost_account_email')
    localStorage.removeItem('ptboost_account_password')
    
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

  const handleSubscribe = async () => {
    // Determine subscription type:
    // - If user has stripe_customer_id (hasActiveSubscription), they've been subscribed before 
    //   -> create checkout session with existing customer ID (no free trial)
    // - Otherwise use regular subscription link (with free trial for new customers)
    const hasBeenSubscribedBefore = userData?.hasActiveSubscription // This checks if stripe_customer_id exists
    
    if (hasBeenSubscribedBefore) {
      // For returning customers, create a checkout session that reuses their Stripe customer ID
      try {
        setIsLoading(true)
        const response = await fetch('/api/create-resubscribe-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Failed to create checkout session')
        }

        const { sessionUrl } = await response.json()
        console.log('Redirecting to resubscription checkout (existing customer):', sessionUrl)
        window.location.href = sessionUrl
      } catch (err) {
        console.error('Error creating resubscribe session:', err)
        toast.error(err instanceof Error ? err.message : 'Failed to start checkout. Please try again.')
        setIsLoading(false)
      }
    } else {
      // For new customers, use regular subscription link with free trial
      if (subscriptionLink) {
        console.log('Using subscription link (new customer with trial):', subscriptionLink)
        window.location.href = subscriptionLink
      } else {
        toast.error("Subscription link not configured. Please contact support.")
      }
    }
  }

  const handleSubmitDeletion = async () => {
    if (!email || !password) {
      toast.error("Please log in again and try submitting your request.")
      return
    }
    if (!deleteReason.trim()) {
      toast.error("Please select a reason.")
      return
    }
    setIsSubmittingDeletion(true)
    try {
      const response = await fetch("/api/account-deletion-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: userData?.name || "",
          businessName: userData?.businessName || "",
          reason: deleteReason,
          notes: deleteNotes,
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error((data as any).error || "Failed to submit deletion request")
      }
      toast.success("Deletion request sent. We'll process it within 2 business days.")
      setDeletionSuccess(true)
      setDeleteAccountDialogOpen(false)
      setDeleteReason("")
      setDeleteNotes("")
    } catch (err) {
      console.error("Error:", err)
      toast.error(err instanceof Error ? err.message : "Failed to send request")
    } finally {
      setIsSubmittingDeletion(false)
    }
  }

  const handleSubmitCustomRequest = async () => {
    if (!email || !password) {
      toast.error("Please log in again and try submitting your request.")
      return
    }
    if (!customRequestDetails.trim()) {
      toast.error("Please provide details about the changes you'd like.")
      return
    }
    setIsSubmittingCustomRequest(true)
    try {
      const response = await fetch("/api/custom-website-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: userData?.name || "",
          businessName: userData?.businessName || "",
          requestDetails: customRequestDetails,
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error((data as any).error || "Failed to submit request")
      }
      toast.success("Request submitted! We'll review it and respond within 24 hours (Mon-Fri).")
      setCustomRequestSuccess(true)
      setCustomRequestDialogOpen(false)
      setCustomRequestDetails("")
    } catch (err) {
      console.error("Error:", err)
      toast.error(err instanceof Error ? err.message : "Failed to send request")
    } finally {
      setIsSubmittingCustomRequest(false)
    }
  }

  const handleUrlButtonClick = (type: 'admin' | 'website', e?: React.MouseEvent | React.TouchEvent) => {
    // If there's an active long press timer, don't trigger the click
    if (longPressTimer) {
      return
    }
    const url = type === 'admin' ? userData?.adminDashboardUrl : userData?.visitWebsiteUrl
    if (url) {
      window.open(url, '_blank')
    } else {
      // Show dialog if URL is not set
      setNotLiveDialogOpen(true)
    }
  }

  const handleUrlButtonStart = (type: 'admin' | 'website', e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const timer = setTimeout(() => {
      setEditingUrlType(type)
      setTempAdminUrl(userData?.adminDashboardUrl || "")
      setTempWebsiteUrl(userData?.visitWebsiteUrl || "")
      setUrlEditDialogOpen(true)
      setLongPressTimer(null)
    }, 500) // 500ms hold time
    setLongPressTimer(timer)
  }

  const handleUrlButtonEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
  }

  const handleUpdateUrls = async () => {
    if (!email || !password) {
      toast.error("Please log in again and try updating URLs.")
      return
    }
    setIsUpdatingUrls(true)
    try {
      const response = await fetch("/api/update-user-urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          adminDashboardUrl: tempAdminUrl.trim() || null,
          visitWebsiteUrl: tempWebsiteUrl.trim() || null,
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error((data as any).error || "Failed to update URLs")
      }
      toast.success("URLs updated successfully!")
      setUrlEditDialogOpen(false)
      // Refresh user data to get updated URLs
      await refreshUserData(email, password)
    } catch (err) {
      console.error("Error:", err)
      toast.error(err instanceof Error ? err.message : "Failed to update URLs")
    } finally {
      setIsUpdatingUrls(false)
    }
  }

  // Login Form View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/5 via-orange-500/5 to-red-500/5 p-3 sm:p-4">
        <div className="w-full max-w-md space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="space-y-1 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16'} rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center`}>
                  <User className={`${isMobile ? 'h-7 w-7' : 'h-8 w-8'} text-white`} />
                </div>
              </div>
              <CardTitle className={`${isMobile ? 'text-xl' : 'text-2xl'} text-center`}>
                Account Login
              </CardTitle>
              <CardDescription className="text-center text-xs sm:text-sm">
                Enter your email and subscription password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className={`${isMobile ? 'h-11 text-base' : 'h-12'}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm">Subscription Password</Label>
                  <Input
                    id="password"
                    type="text"
                    placeholder="XXX-XXX-XX"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.toUpperCase())}
                    required
                    disabled={isLoading}
                    className={`${isMobile ? 'h-11 text-base' : 'h-12'} font-mono tracking-wider`}
                    maxLength={10}
                  />
                  <p className="text-xs text-muted-foreground">
                    Find this in your confirmation email (format: XXX-XXX-XX)
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive" className="text-sm">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs sm:text-sm">{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className={`w-full ${isMobile ? 'h-11 text-base' : 'h-12'} bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90`}
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
              <Button variant="outline" className={`gap-2 ${isMobile ? 'h-10 text-sm' : ''}`}>
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
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-orange-500/5 to-red-500/5 p-3 sm:p-4 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Success message after returning from Stripe portal */}
        {showSuccessMessage && (
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4'} text-green-600 flex-shrink-0`} />
            <AlertDescription className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-800`}>
              Your subscription settings have been updated successfully!
            </AlertDescription>
          </Alert>
        )}
        {/* Success message after cancellation request */}
        {cancellationSuccess && (
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4'} text-green-600 flex-shrink-0`} />
            <AlertDescription className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-800`}>
              Cancellation request sent. Your subscription will be cancelled within 24 hours (Mon–Fri).
            </AlertDescription>
          </Alert>
        )}
        {/* Success message after deletion request */}
        {deletionSuccess && (
          <Alert className="border-orange-500 bg-orange-50">
            <Info className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4'} text-orange-600 flex-shrink-0`} />
            <AlertDescription className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-800`}>
              Account deletion request sent. Your account will be deleted within 2 business days (Mon–Fri).
            </AlertDescription>
          </Alert>
        )}
        {/* Success message after custom website request */}
        {customRequestSuccess && (
          <Alert className="border-blue-500 bg-blue-50">
            <CheckCircle className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4'} text-blue-600 flex-shrink-0`} />
            <AlertDescription className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-800`}>
              Custom website change request sent. We'll review it and respond within 24 hours (Monday–Friday).
            </AlertDescription>
          </Alert>
        )}

        {/* Subscription status warning */}
        {!userData?.subscribed && (
          <div className="space-y-2 sm:space-y-3">
            <Alert className="border-red-500 bg-red-50">
              <AlertTriangle className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4'} text-red-600 flex-shrink-0`} />
              <AlertDescription className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-800`}>
                <strong>Your subscription is not active.</strong> Subscribe now to continue accessing your website and services.
              </AlertDescription>
            </Alert>
            
            {/* Countdown notification for canceled subscriptions */}
            {userData?.subscriptionEndDate && (() => {
              const endDate = new Date(userData.subscriptionEndDate)
              const now = new Date()
              const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
              const isExpiringSoon = daysRemaining <= 7
              const hasExpired = daysRemaining <= 0
              
              return (
                <Alert className={`border-2 ${
                  hasExpired 
                    ? 'border-red-700 bg-red-900 text-white' 
                    : isExpiringSoon 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-yellow-500 bg-yellow-50'
                }`}>
                  <Calendar className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} ${
                    hasExpired ? 'text-white' : isExpiringSoon ? 'text-orange-700' : 'text-yellow-700'
                  } flex-shrink-0 animate-pulse`} />
                  <AlertDescription className={`${isMobile ? 'text-xs' : 'text-sm'} ${hasExpired ? 'text-white' : isExpiringSoon ? 'text-orange-900' : 'text-yellow-900'}`}>
                    <div className="space-y-1">
                      <div className={`font-bold ${isMobile ? 'text-sm' : 'text-base'}`}>
                        {hasExpired ? (
                          <>⚠️ Your subscription has expired</>
                        ) : (
                          <>
                            ⏰ <strong>{daysRemaining}</strong> {daysRemaining === 1 ? 'day' : 'days'} remaining
                          </>
                        )}
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} opacity-90`}>
                        {hasExpired ? (
                          'Your website access has ended. Please resubscribe to continue using your services.'
                        ) : (
                          <>
                            Your subscription will remain active until{' '}
                            <strong>{endDate.toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}</strong>.
                            {isExpiringSoon && ' Resubscribe now to avoid interruption!'}
                          </>
                        )}
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )
            })()}
          </div>
        )}

        {/* Header */}
        <Card>
          <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
            <div className={`flex ${isMobile ? 'flex-col gap-3' : 'items-center justify-between'}`}>
              <div className={`flex items-center ${isMobile ? 'gap-3' : 'gap-4'}`}>
                <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center flex-shrink-0`}>
                  <User className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-white`} />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} truncate`}>Welcome back, {userData?.name}!</CardTitle>
                  <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'} truncate`}>{userData?.email}</CardDescription>
                </div>
              </div>
              <div className={`flex ${isMobile ? 'flex-col gap-2 w-full' : 'items-center gap-2'}`}>
                <Button 
                  variant="outline" 
                  onClick={(e) => handleUrlButtonClick('admin', e)}
                  onMouseDown={(e) => handleUrlButtonStart('admin', e)}
                  onMouseUp={handleUrlButtonEnd}
                  onMouseLeave={handleUrlButtonEnd}
                  onTouchStart={(e) => handleUrlButtonStart('admin', e)}
                  onTouchEnd={handleUrlButtonEnd}
                  className={`${isMobile ? 'w-full h-10 text-sm' : 'gap-2'} shrink-0 ${!userData?.adminDashboardUrl ? 'opacity-60' : ''}`}
                  title={userData?.adminDashboardUrl ? "Click to visit admin dashboard. Click and hold to edit URL." : "Admin dashboard URL not set. Click and hold to set URL."}
                >
                  <LayoutDashboard className={`${isMobile ? 'mr-2' : ''} h-4 w-4`} />
                  Admin Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  onClick={(e) => handleUrlButtonClick('website', e)}
                  onMouseDown={(e) => handleUrlButtonStart('website', e)}
                  onMouseUp={handleUrlButtonEnd}
                  onMouseLeave={handleUrlButtonEnd}
                  onTouchStart={(e) => handleUrlButtonStart('website', e)}
                  onTouchEnd={handleUrlButtonEnd}
                  className={`${isMobile ? 'w-full h-10 text-sm' : 'gap-2'} shrink-0 ${!userData?.visitWebsiteUrl ? 'opacity-60' : ''}`}
                  title={userData?.visitWebsiteUrl ? "Click to visit website. Click and hold to edit URL." : "Website URL not set. Click and hold to set URL."}
                >
                  <ExternalLink className={`${isMobile ? 'mr-2' : ''} h-4 w-4`} />
                  Visit Website
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleLogout} 
                  className={`${isMobile ? 'w-full h-10 text-sm' : 'gap-2'} shrink-0`}
                >
                  <LogOut className={`${isMobile ? 'mr-2' : ''} h-4 w-4`} />
                  Logout
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* URL Edit Dialog */}
        <Dialog open={urlEditDialogOpen} onOpenChange={setUrlEditDialogOpen}>
          <DialogContent className={`${isMobile ? 'p-4' : 'sm:max-w-lg'}`}>
            <DialogHeader>
              <DialogTitle className={isMobile ? 'text-lg' : ''}>
                Edit {editingUrlType === 'admin' ? 'Admin Dashboard' : 'Visit Website'} URL
              </DialogTitle>
              <DialogDescription className={isMobile ? 'text-sm' : ''}>
                Update the URL for the {editingUrlType === 'admin' ? 'admin dashboard' : 'website'} button. Leave empty to disable the button.
              </DialogDescription>
            </DialogHeader>
            <div className={`${isMobile ? 'space-y-3' : 'space-y-4'} pt-2`}>
              {editingUrlType === 'admin' ? (
                <div className="space-y-2">
                  <Label htmlFor="admin-url" className={isMobile ? 'text-sm' : ''}>Admin Dashboard URL</Label>
                  <Input
                    id="admin-url"
                    type="text"
                    placeholder="https://example.com/admin"
                    value={tempAdminUrl}
                    onChange={(e) => setTempAdminUrl(e.target.value)}
                    className={`${isMobile ? 'h-11 text-base' : 'h-12'}`}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the full absolute URL (e.g., https://example.com/admin)
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="website-url" className={isMobile ? 'text-sm' : ''}>Visit Website URL</Label>
                  <Input
                    id="website-url"
                    type="text"
                    placeholder="https://example.com"
                    value={tempWebsiteUrl}
                    onChange={(e) => setTempWebsiteUrl(e.target.value)}
                    className={`${isMobile ? 'h-11 text-base' : 'h-12'}`}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the full absolute URL (e.g., https://example.com)
                  </p>
                </div>
              )}
              <div className={`flex ${isMobile ? 'flex-col-reverse gap-2' : 'gap-2 justify-end'} pt-2`}>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setUrlEditDialogOpen(false)
                    setEditingUrlType(null)
                  }}
                  disabled={isUpdatingUrls}
                  className={isMobile ? 'w-full h-11 text-base' : ''}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateUrls}
                  disabled={isUpdatingUrls}
                  className={`${isMobile ? 'w-full h-11 text-base' : ''} bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90`}
                >
                  {isUpdatingUrls ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>Save URL</>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Not Live Dialog */}
        <Dialog open={notLiveDialogOpen} onOpenChange={setNotLiveDialogOpen}>
          <DialogContent className={`${isMobile ? 'p-4' : 'sm:max-w-md'}`}>
            <DialogHeader>
              <DialogTitle className={isMobile ? 'text-lg' : ''}>
                Website Not Live Yet
              </DialogTitle>
              <DialogDescription className={isMobile ? 'text-sm' : ''}>
                Please stand by, your website is still in development.
              </DialogDescription>
            </DialogHeader>
            <div className={`${isMobile ? 'pt-2' : 'pt-4'}`}>
              <Button
                onClick={() => setNotLiveDialogOpen(false)}
                className={`w-full ${isMobile ? 'h-11 text-base' : 'h-12'} bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90`}
              >
                OK
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Account Actions */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Custom Website Changes Card */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full -mr-16 -mt-16" />
            <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className={`${isMobile ? 'w-9 h-9' : 'w-10 h-10'} rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0`}>
                  <Wrench className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-blue-600`} />
                </div>
                <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>Custom Website Changes</CardTitle>
              </div>
              <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                Request custom modifications to your website. Pricing varies based on complexity. Minor content changes can be done for free using your PT website dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <Dialog open={customRequestDialogOpen} onOpenChange={setCustomRequestDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className={`w-full ${isMobile ? 'h-11 text-base' : 'h-12'} bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700`}
                  >
                    <Wrench className="mr-2 h-4 w-4" />
                    Request Custom Changes
                  </Button>
                </DialogTrigger>
                <DialogContent className={`${isMobile ? 'p-4' : 'sm:max-w-lg'} max-h-[90vh] overflow-y-auto`}>
                  <DialogHeader>
                    <DialogTitle className={isMobile ? 'text-lg' : ''}>Request Custom Website Changes</DialogTitle>
                    <DialogDescription className={isMobile ? 'text-sm' : ''}>
                      Describe the changes you'd like to make to your website. We'll review your request and respond within 24 hours (Monday–Friday).
                    </DialogDescription>
                  </DialogHeader>
                  <div className={`${isMobile ? 'space-y-3' : 'space-y-4'} pt-2`}>
                    {/* Important Info Box */}
                    <div className={`bg-amber-50 border border-amber-200 rounded-lg ${isMobile ? 'p-3' : 'p-4'}`}>
                      <p className={`font-semibold text-amber-900 ${isMobile ? 'text-xs mb-1.5' : 'text-sm mb-2'}`}>💡 Before You Request:</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-800 mb-2`}>
                        <strong>Minor content changes</strong> (updating text, images, or basic information) can be done for <strong>free</strong> using your PT website dashboard. Only request custom changes here if you need modifications beyond what's available in your dashboard.
                      </p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-800`}>
                        <strong>Pricing:</strong> The cost for custom changes will vary depending on the complexity of the modifications you need. We'll provide a quote after reviewing your request.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custom-request-details" className={isMobile ? 'text-sm' : ''}>
                        What changes would you like? <span className="text-red-500">*</span>
                      </Label>
                      <textarea
                        id="custom-request-details"
                        value={customRequestDetails}
                        onChange={(e) => setCustomRequestDetails(e.target.value)}
                        rows={isMobile ? 5 : 6}
                        className={`w-full rounded-md border bg-background ${isMobile ? 'p-2.5 text-sm' : 'p-3 text-sm'}`}
                        placeholder="Please describe the custom changes you'd like to make to your website. Be as specific as possible..."
                        required
                      />
                    </div>
                    <div className={`bg-blue-50 border border-blue-200 rounded-lg ${isMobile ? 'p-3' : 'p-4'}`}>
                      <p className={`font-semibold text-blue-900 ${isMobile ? 'text-xs mb-1.5' : 'text-sm mb-2'}`}>📋 What happens next:</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-800`}>
                        We'll review your request and respond within <strong>24 hours (Monday–Friday)</strong> with a quote and timeline. You'll receive an email confirmation once your request has been submitted.
                      </p>
                    </div>
                    <div className={`flex ${isMobile ? 'flex-col-reverse gap-2' : 'gap-2 justify-end'} pt-2`}>
                      <Button 
                        variant="outline"
                        onClick={() => setCustomRequestDialogOpen(false)}
                        disabled={isSubmittingCustomRequest}
                        className={isMobile ? 'w-full h-11 text-base' : ''}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmitCustomRequest}
                        disabled={isSubmittingCustomRequest || !customRequestDetails.trim()}
                        className={`${isMobile ? 'w-full h-11 text-base' : ''} bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700`}
                      >
                        {isSubmittingCustomRequest ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>Submit Request</>
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          {/* Manage Subscription Card */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-orange-500/20 rounded-full -mr-16 -mt-16" />
            <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
              <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center justify-between'} mb-2`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`${isMobile ? 'w-9 h-9' : 'w-10 h-10'} rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0`}>
                    <Settings className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-accent`} />
                  </div>
                  <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>Manage Subscription</CardTitle>
                </div>
                {userData?.subscribed ? (
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 bg-green-100 border border-green-300 rounded-full ${isMobile ? 'self-start' : ''}`}>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-green-700">Active</span>
                  </div>
                ) : (
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 border border-gray-300 rounded-full ${isMobile ? 'self-start' : ''}`}>
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span className="text-xs font-semibold text-gray-600">Inactive</span>
                  </div>
                )}
              </div>
              <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                {userData?.subscribed 
                  ? "Submit a cancellation request. We'll process it and email you confirmation."
                  : "Reactivate your subscription to continue using our services."
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              {userData?.subscribed ? (
                <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className={`w-full ${isMobile ? 'h-11 text-base' : 'h-12'} bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90`}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Request Cancellation
                    </Button>
                  </DialogTrigger>
                <DialogContent className={`${isMobile ? 'p-4' : 'sm:max-w-lg'} max-h-[90vh] overflow-y-auto`}>
                  <DialogHeader>
                    <DialogTitle className={isMobile ? 'text-lg' : ''}>Request Subscription Cancellation</DialogTitle>
                    <DialogDescription className={isMobile ? 'text-sm' : ''}>
                      Fill in the details below and we'll process your cancellation promptly.
                    </DialogDescription>
                  </DialogHeader>
                  <div className={`${isMobile ? 'space-y-3' : 'space-y-4'} pt-2`}>
                    <div className="space-y-2">
                      <Label htmlFor="reason" className={isMobile ? 'text-sm' : ''}>Reason for cancelling</Label>
                      <select
                        id="reason"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        className={`${isMobile ? 'h-11 text-base' : 'h-11'} w-full rounded-md border bg-background px-3 text-sm`}
                      >
                        <option value="">Select a reason…</option>
                        <option value="no-longer-needed">No longer need the service</option>
                        <option value="too-expensive">Too expensive</option>
                        <option value="temporary-pause">Taking a break</option>
                        <option value="switching-providers">Switching providers</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes" className={isMobile ? 'text-sm' : ''}>Anything we should know? (optional)</Label>
                      <textarea
                        id="notes"
                        value={cancelNotes}
                        onChange={(e) => setCancelNotes(e.target.value)}
                        rows={isMobile ? 3 : 4}
                        className={`w-full rounded-md border bg-background ${isMobile ? 'p-2.5 text-sm' : 'p-3 text-sm'}`}
                        placeholder="Share any details that would help us process this smoothly."
                      />
                    </div>
                    <div className={`flex ${isMobile ? 'flex-col-reverse gap-2' : 'gap-2 justify-end'} pt-2`}>
                      <Button 
                        variant="outline"
                        onClick={() => setCancelDialogOpen(false)}
                        disabled={isSubmittingCancellation}
                        className={isMobile ? 'w-full h-11 text-base' : ''}
                      >
                        Close
                      </Button>
                      <Button
                        onClick={handleSubmitCancellation}
                        disabled={isSubmittingCancellation}
                        className={`${isMobile ? 'w-full h-11 text-base' : ''} bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90`}
                      >
                        {isSubmittingCancellation ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>Send Request</>
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              ) : (
                <Button 
                  onClick={handleSubscribe}
                  className={`w-full ${isMobile ? 'h-11 text-base' : 'h-12'} bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700`}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Subscribe Now
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Website Buyout Card */}
          <Card className={`relative overflow-hidden ${userData?.websiteOwned ? 'border-2 border-green-500/30 bg-green-50/50' : 'border-2 border-accent/20'}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${userData?.websiteOwned ? 'from-green-500/30 to-emerald-500/30' : 'from-green-500/20 to-emerald-500/20'} rounded-full -mr-16 -mt-16`} />
            <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className={`${isMobile ? 'w-9 h-9' : 'w-10 h-10'} rounded-lg ${userData?.websiteOwned ? 'bg-green-500/20' : 'bg-green-500/10'} flex items-center justify-center flex-shrink-0`}>
                  {userData?.websiteOwned ? (
                    <CheckCircle className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-600`} />
                  ) : (
                    <ShoppingCart className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-600`} />
                  )}
                </div>
                <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>
                  {userData?.websiteOwned ? 'Website Owned ✓' : 'Own Your Website'}
                </CardTitle>
              </div>
              <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                {userData?.websiteOwned ? (
                  <span className="text-green-700 font-medium">
                    Congratulations! You own your website completely. No more monthly payments required.
                  </span>
                ) : (
                  <>
                    Buy out your website for a special one-time price of <span className="font-bold text-green-600">£895</span> and own it completely!
                  </>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
              {userData?.websiteOwned ? (
                <>
                  <div className={`${isMobile ? 'p-3' : 'p-4'} bg-green-100 border border-green-300 rounded-lg`}>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-600 mt-0.5 flex-shrink-0`} />
                      <div className="space-y-1.5 sm:space-y-2">
                        <p className={`font-semibold text-green-900 ${isMobile ? 'text-sm' : 'text-base'}`}>You're all set!</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-800`}>
                          Your website is fully owned. You'll receive a download link with all source code and files within 24-48 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${isMobile ? 'p-3' : 'p-4'} bg-blue-50 border border-blue-200 rounded-lg`}>
                    <div className="space-y-1.5 sm:space-y-2">
                      <p className={`font-semibold text-blue-900 ${isMobile ? 'text-xs' : 'text-sm'}`}>📋 Important Information</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-800`}>
                        You can cancel your subscription at any time, and your website will remain live on our servers. 
                        If you'd like your website removed from PTBoost servers, please email me at{" "}
                        <a href="mailto:alexander.ptboost@gmail.com" className="text-blue-600 hover:underline font-medium break-all">
                          alexander.ptboost@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className={`space-y-1.5 sm:space-y-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-green-600 mt-0.5 flex-shrink-0`} />
                      <div className="flex-1 flex items-center gap-1.5 flex-wrap">
                        <span className="line-through opacity-50">Full ownership of your website</span>
                        <span className="text-green-600 font-medium">✓ Owned</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-green-600 mt-0.5 flex-shrink-0`} />
                      <div className="flex-1 flex items-center gap-1.5 flex-wrap">
                        <span className="line-through opacity-50">No more monthly payments</span>
                        <span className="text-green-600 font-medium">✓ Complete</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-green-600 mt-0.5 flex-shrink-0`} />
                      <div className="flex-1 flex items-center gap-1.5 flex-wrap">
                        <span className="line-through opacity-50">Complete control and customization</span>
                        <span className="text-green-600 font-medium">✓ Yours</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-green-600 mt-0.5 flex-shrink-0`} />
                      <div className="flex-1 flex items-center gap-1.5 flex-wrap">
                        <span className="line-through opacity-50">All source code included</span>
                        <span className="text-green-600 font-medium">✓ Included</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    disabled
                    className={`w-full ${isMobile ? 'h-11 text-base' : 'h-12'} bg-gray-300 text-gray-500 cursor-not-allowed`}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Already Purchased
                  </Button>
                </>
              ) : (
                <>
                  <div className={`space-y-1.5 sm:space-y-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                    <div className="flex items-start gap-2">
                      <div className={`${isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'} bg-green-500 rounded-full mt-1.5 flex-shrink-0`} />
                      <span>Full ownership of your website</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className={`${isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'} bg-green-500 rounded-full mt-1.5 flex-shrink-0`} />
                      <span>No more monthly payments</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className={`${isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'} bg-green-500 rounded-full mt-1.5 flex-shrink-0`} />
                      <span>Complete control and customization</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className={`${isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'} bg-green-500 rounded-full mt-1.5 flex-shrink-0`} />
                      <span>All source code included</span>
                    </div>
                  </div>
                  
                  <div className={`flex ${isMobile ? 'flex-col gap-2' : 'gap-2'}`}>
                    <Button 
                      onClick={handleBuyout}
                      className={`${isMobile ? 'w-full h-11 text-base' : 'flex-1 h-12'} bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700`}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {isMobile ? 'Buy Out £895' : 'Buy Out for £895'}
                    </Button>
                    
                    <Dialog open={buyoutDialogOpen} onOpenChange={setBuyoutDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline"
                          className={`${isMobile ? 'w-full h-11 text-base' : 'h-12'} border-green-200 hover:bg-green-50`}
                        >
                          <Info className={`${isMobile ? 'mr-2' : ''} h-4 w-4`} />
                          {isMobile && 'More Info'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className={`${isMobile ? 'p-4' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
                        <DialogHeader>
                          <DialogTitle className={`${isMobile ? 'text-lg' : 'text-2xl'} flex items-center gap-2`}>
                            <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0`}>
                              <ShoppingCart className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-600`} />
                            </div>
                            <span className={isMobile ? 'text-base' : ''}>Own Your Website - Complete Guide</span>
                          </DialogTitle>
                          <DialogDescription className={`${isMobile ? 'text-sm' : 'text-base'} pt-2`}>
                            Everything you need to know about buying out your website for £895
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className={`${isMobile ? 'space-y-4' : 'space-y-6'} pt-4`}>
                          {/* Price Section */}
                          <div className={`${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg`}>
                            <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center gap-3'} mb-2`}>
                              <div className={`${isMobile ? 'w-16 h-16 mx-auto' : 'w-12 h-12'} rounded-full bg-green-500 flex items-center justify-center flex-shrink-0`}>
                                <span className={`text-white font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>£895</span>
                              </div>
                              <div className={isMobile ? 'text-center' : ''}>
                                <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'} text-green-900`}>One-Time Payment</h3>
                                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-700`}>No recurring charges, no hidden fees</p>
                              </div>
                            </div>
                          </div>

                          {/* Benefits Section */}
                          <div>
                            <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} ${isMobile ? 'mb-3' : 'mb-4'} flex items-center gap-2`}>
                              <CheckCircle className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-600 flex-shrink-0`} />
                              What You Get
                            </h3>
                            <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'gap-4 md:grid-cols-2'}`}>
                              <div className={`${isMobile ? 'p-3' : 'p-4'} border rounded-lg hover:bg-accent/5 transition-colors`}>
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0`}>
                                    <Shield className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-600`} />
                                  </div>
                                  <div>
                                    <h4 className={`font-semibold ${isMobile ? 'text-sm mb-0.5' : 'mb-1'}`}>Full Ownership</h4>
                                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                                      Complete legal ownership of your website. It's yours forever, no strings attached.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className={`${isMobile ? 'p-3' : 'p-4'} border rounded-lg hover:bg-accent/5 transition-colors`}>
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0`}>
                                    <Zap className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-600`} />
                                  </div>
                                  <div>
                                    <h4 className={`font-semibold ${isMobile ? 'text-sm mb-0.5' : 'mb-1'}`}>No Monthly Fees</h4>
                                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                                      Stop paying £7.99/month forever. One payment of £895 and you're done.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className={`${isMobile ? 'p-3' : 'p-4'} border rounded-lg hover:bg-accent/5 transition-colors`}>
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0`}>
                                    <Code className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-600`} />
                                  </div>
                                  <div>
                                    <h4 className={`font-semibold ${isMobile ? 'text-sm mb-0.5' : 'mb-1'}`}>Complete Source Code</h4>
                                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                                      Receive all HTML, CSS, JavaScript, and assets. Full access to customize everything.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className={`${isMobile ? 'p-3' : 'p-4'} border rounded-lg hover:bg-accent/5 transition-colors`}>
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0`}>
                                    <Globe className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-600`} />
                                  </div>
                                  <div>
                                    <h4 className={`font-semibold ${isMobile ? 'text-sm mb-0.5' : 'mb-1'}`}>Host Anywhere</h4>
                                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                                      Deploy to any hosting provider. Move to your own server, Vercel, Netlify, or anywhere.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* What's Included */}
                          <div>
                            <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} ${isMobile ? 'mb-2' : 'mb-3'}`}>What's Included in Your Download</h3>
                            <div className={`space-y-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
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
                            <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} ${isMobile ? 'mb-2' : 'mb-3'}`}>How It Works</h3>
                            <div className={`${isMobile ? 'space-y-2' : 'space-y-3'}`}>
                              <div className="flex gap-2 sm:gap-3">
                                <div className={`${isMobile ? 'w-7 h-7 text-sm' : 'w-8 h-8'} rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0`}>
                                  1
                                </div>
                                <div>
                                  <p className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>Make Payment</p>
                                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Complete your £895 payment securely via Stripe</p>
                                </div>
                              </div>
                              <div className="flex gap-2 sm:gap-3">
                                <div className={`${isMobile ? 'w-7 h-7 text-sm' : 'w-8 h-8'} rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0`}>
                                  2
                                </div>
                                <div>
                                  <p className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>Receive Download Link</p>
                                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>We'll email you a download link within 24-48 hours</p>
                                </div>
                              </div>
                              <div className="flex gap-2 sm:gap-3">
                                <div className={`${isMobile ? 'w-7 h-7 text-sm' : 'w-8 h-8'} rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0`}>
                                  3
                                </div>
                                <div>
                                  <p className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>Download & Deploy</p>
                                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Download your files and deploy to any hosting provider</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Important Notes */}
                          <div className={`${isMobile ? 'p-3' : 'p-4'} bg-blue-50 border border-blue-200 rounded-lg`}>
                            <h3 className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'} text-blue-900 ${isMobile ? 'mb-2' : 'mb-2'} flex items-center gap-2`}>
                              <Info className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} flex-shrink-0`} />
                              Important Information
                            </h3>
                            <div className={`space-y-1.5 sm:space-y-2 ${isMobile ? 'text-xs' : 'text-sm'} text-blue-800`}>
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
                          <div className={`${isMobile ? 'pt-3' : 'pt-4'} border-t`}>
                            <Button 
                              onClick={() => {
                                setBuyoutDialogOpen(false)
                                handleBuyout()
                              }}
                              className={`w-full ${isMobile ? 'h-11 text-base' : 'h-12'} bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700`}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              {isMobile ? 'Buy Out £895 Now' : 'Buy Out for £895 Now'}
                            </Button>
                            <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-center text-muted-foreground mt-2`}>
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
            <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className={`grid gap-3 sm:gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
                <div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Business Name</p>
                  <p className={`${isMobile ? 'text-sm' : 'text-base'} font-medium break-words`}>{userData.businessName}</p>
                </div>
                <div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Contact Email</p>
                  <p className={`${isMobile ? 'text-sm' : 'text-base'} font-medium break-all`}>{userData.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delete Account Card */}
        <Card className="border-red-500/30 bg-red-50/50 dark:bg-red-950/10">
          <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className={`${isMobile ? 'w-9 h-9' : 'w-10 h-10'} rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0`}>
                <Trash2 className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-red-600`} />
              </div>
              <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} text-red-900 dark:text-red-400`}>Danger Zone</CardTitle>
            </div>
            <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-800 dark:text-red-300`}>
              Submit a request to permanently delete your account and all website files. We'll process your request within 2 business days (Monday to Friday).
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <Dialog open={deleteAccountDialogOpen} onOpenChange={setDeleteAccountDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="destructive"
                  className={`w-full ${isMobile ? 'h-11 text-base' : 'h-12'} bg-red-600 hover:bg-red-700`}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Request Account Deletion
                </Button>
              </DialogTrigger>
              <DialogContent className={`${isMobile ? 'p-4' : 'sm:max-w-lg'} max-h-[90vh] overflow-y-auto`}>
                <DialogHeader>
                  <DialogTitle className={isMobile ? 'text-lg' : ''}>Request Account Deletion</DialogTitle>
                  <DialogDescription className={isMobile ? 'text-sm' : ''}>
                    Fill in the details below and we'll process your account deletion within 2 business days (Monday to Friday).
                  </DialogDescription>
                </DialogHeader>
                <div className={`${isMobile ? 'space-y-3' : 'space-y-4'} pt-2`}>
                  {/* Warning Box */}
                  <div className={`bg-red-50 border-2 border-red-200 rounded-lg ${isMobile ? 'p-3' : 'p-4'}`}>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-red-600 mt-0.5 flex-shrink-0`} />
                      <div>
                        <p className={`font-bold text-red-900 ${isMobile ? 'text-xs mb-1.5' : 'text-sm mb-2'}`}>⚠️ Warning: This action is permanent</p>
                        <ul className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-800 ${isMobile ? 'space-y-0.5' : 'space-y-1'}`}>
                          <li>• Your website will be taken offline</li>
                          <li>• All files and data will be permanently deleted</li>
                          <li>• Your subscription will be cancelled</li>
                          <li>• This cannot be undone</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delete-reason" className={isMobile ? 'text-sm' : ''}>Reason for deleting your account</Label>
                    <select
                      id="delete-reason"
                      value={deleteReason}
                      onChange={(e) => setDeleteReason(e.target.value)}
                      className={`${isMobile ? 'h-11 text-base' : 'h-11'} w-full rounded-md border bg-background px-3 text-sm`}
                    >
                      <option value="">Select a reason…</option>
                      <option value="no-longer-needed">No longer need the service</option>
                      <option value="too-expensive">Too expensive</option>
                      <option value="switching-providers">Switching providers</option>
                      <option value="unhappy-with-service">Unhappy with service</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delete-notes" className={isMobile ? 'text-sm' : ''}>Additional information (optional)</Label>
                    <textarea
                      id="delete-notes"
                      value={deleteNotes}
                      onChange={(e) => setDeleteNotes(e.target.value)}
                      rows={isMobile ? 3 : 4}
                      className={`w-full rounded-md border bg-background ${isMobile ? 'p-2.5 text-sm' : 'p-3 text-sm'}`}
                      placeholder="Please let us know if there's anything specific we should be aware of."
                    />
                  </div>

                  {/* Important Info */}
                  <div className={`bg-blue-50 border border-blue-200 rounded-lg ${isMobile ? 'p-3' : 'p-4'}`}>
                    <p className={`font-semibold text-blue-900 ${isMobile ? 'text-xs mb-1.5' : 'text-sm mb-2'}`}>📋 What happens next:</p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-800`}>
                      We'll process your deletion request within <strong>2 business days (Monday to Friday)</strong>. You'll receive a confirmation email once your account has been deleted.
                    </p>
                  </div>

                  <div className={`flex ${isMobile ? 'flex-col-reverse gap-2' : 'gap-2 justify-end'} pt-2`}>
                    <Button 
                      variant="outline"
                      onClick={() => setDeleteAccountDialogOpen(false)}
                      disabled={isSubmittingDeletion}
                      className={isMobile ? 'w-full h-11 text-base' : ''}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitDeletion}
                      disabled={isSubmittingDeletion}
                      variant="destructive"
                      className={`${isMobile ? 'w-full h-11 text-base' : ''} bg-red-600 hover:bg-red-700`}
                    >
                      {isSubmittingDeletion ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Submit Deletion Request
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="flex justify-center pt-2 sm:pt-4">
          <Link href="/">
            <Button variant="outline" className={`gap-2 ${isMobile ? 'h-10 text-sm w-full' : ''}`}>
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

