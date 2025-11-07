"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, ArrowRight, Mail, Calendar, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SuccessPage() {
  const [email, setEmail] = useState<string | null>(null)
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
                  "We've sent a confirmation email with your receipt and next steps"
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
              1 Year Free Hosting Included
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
        </p>
      </Card>
      )}
    </div>
  )
}

