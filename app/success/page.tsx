"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, ArrowRight, Mail, Calendar, Loader2, Eye, EyeOff, Copy, Check, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"

export default function SuccessPage() {
  const [email, setEmail] = useState<string | null>(null)
  const [subscriptionPassword, setSubscriptionPassword] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [copiedPassword, setCopiedPassword] = useState(false)
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const completeBooking = async () => {
      try {
        // Get booking ID from localStorage
        const bookingId = localStorage.getItem('pending_booking_id')
        
        console.log('Booking ID from localStorage:', bookingId)
        
        if (bookingId) {
          // Complete the booking and send email
          console.log('Calling complete-booking API...')
          const response = await fetch('/api/complete-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId })
          })

          console.log('API Response status:', response.status)
          
          if (response.ok) {
            const data = await response.json()
            console.log('API Response data:', data)
            setEmail(data.email)
            setSubscriptionPassword(data.subscriptionPassword)
            // Clear the booking ID from localStorage
            localStorage.removeItem('pending_booking_id')
          } else {
            const errorData = await response.json()
            console.error('API Error:', errorData)
          }
        } else {
          console.warn('No booking ID found in localStorage')
        }

        // Also try to get email from URL if Stripe passes it
        const params = new URLSearchParams(window.location.search)
        const customerEmail = params.get('email')
        if (customerEmail && customerEmail !== '{CUSTOMER_EMAIL}' && !customerEmail.includes('{')) {
          setEmail(customerEmail)
        }
      } catch (error) {
        console.error('Error completing booking:', error)
      } finally {
        setIsProcessing(false)
      }
    }

    completeBooking()
  }, [])

  const copyPassword = () => {
    if (subscriptionPassword) {
      navigator.clipboard.writeText(subscriptionPassword)
      setCopiedPassword(true)
      toast.success("Password copied to clipboard!")
      setTimeout(() => setCopiedPassword(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background flex items-center justify-center p-4">
      {isProcessing ? (
        <Card className="max-w-2xl w-full p-8 md:p-12 text-center space-y-6">
          <div className="flex justify-center">
            <Loader2 className="h-16 w-16 text-accent animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Processing your order...</h2>
          <p className="text-muted-foreground">Please wait while we confirm your payment</p>
        </Card>
      ) : (
      <Card className="max-w-2xl w-full p-8 md:p-12 text-center space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
            <CheckCircle2 className="relative h-20 w-20 text-green-500" strokeWidth={2} />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase
          </p>
        </div>

        {/* Subscription Portal Access */}
        {email && subscriptionPassword && (
          <div className="bg-gradient-to-br from-orange-500/10 to-accent/10 border-2 border-accent/30 rounded-lg p-6 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">🔐 Your Subscription Portal Access</h3>
              <p className="text-sm text-muted-foreground">
                Save these credentials to manage your subscription anytime
              </p>
            </div>

            <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Email Address
                </label>
                <div className="flex items-center gap-2 bg-background border border-accent/20 rounded-md px-3 py-2.5">
                  <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground flex-1 truncate">
                    {email}
                  </span>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Subscription Password
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 bg-background border border-accent/20 rounded-md px-3 py-2.5">
                    <span className="text-lg font-mono font-bold text-accent tracking-widest flex-1">
                      {showPassword ? subscriptionPassword : '•••-•••-••'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="h-8 w-8 p-0 hover:bg-accent/10"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyPassword}
                    className="h-9 px-3 border-accent/20 hover:bg-accent/10"
                  >
                    {copiedPassword ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  💡 You'll need this password along with your email to manage your subscription
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <Button
                onClick={() => window.location.href = '/account'}
                className="bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Account Now
              </Button>
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="bg-accent/10 rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-3 text-left">
            <Mail className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground">Check Your Email</p>
              <p className="text-sm text-muted-foreground">
                {email ? (
                  <>We've sent a confirmation to <span className="font-medium text-foreground">{email}</span></>
                ) : (
                  "We've sent a confirmation email with your receipt. I will contact you within 24 hours from monday - friday with the next steps!"
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <Calendar className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground">What Happens Next?</p>
              <p className="text-sm text-muted-foreground">
                We'll contact you within 24 hours to schedule your website consultation and gather your content preferences
              </p>
            </div>
          </div>
        </div>

        {/* What's Included Reminder */}
        <div className="border-t border-accent/20 pt-6 space-y-3">
          <p className="text-sm font-semibold text-foreground">Your Website Package Includes:</p>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Custom Professional Website Design
            </li>
            <li className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Mobile Responsive & SEO Optimized
            </li>
            <li className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Hosting Included
            </li>
            <li className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Contact Form & Social Media Integration
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            size="lg"
            variant="default"
            className="flex-1"
            onClick={() => window.location.href = '/'}
          >
            Return to Homepage
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Support Text */}
        <p className="text-xs text-muted-foreground pt-4">
          Questions? Contact us at{" "}
          <a href="mailto:ptboost.info@gmail.com" className="text-accent hover:underline">
            ptboost.info@gmail.com
          </a>
          {" "}• You can cancel or modify your subscription anytime from your{" "}
          <a href="/account" className="text-accent hover:underline">
            Account Page
          </a>
        </p>
      </Card>
      )}
    </div>
  )
}

