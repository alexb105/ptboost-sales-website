"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Home, Mail } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import confetti from "canvas-confetti"

export default function WebsitePurchasedPage() {
  useEffect(() => {
    // Celebrate with confetti!
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 p-4">
      <div className="w-full max-w-2xl space-y-6">
        <Card className="border-green-500/20 shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center animate-pulse">
                <CheckCircle className="h-10 w-10 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Congratulations! 🎉
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Your website purchase was successful!
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Success Message */}
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">
                    Payment Confirmed
                  </h3>
                  <p className="text-green-800 text-sm leading-relaxed">
                    Thank you for purchasing your website! Your payment of <span className="font-bold">£299</span> has been processed successfully.
                  </p>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Download className="h-5 w-5 text-accent" />
                What happens next?
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Wait 24 - 48 Hours</p>
                    <p className="text-sm text-muted-foreground">
                      I'll send you a download link to access all your website files within the next 24-48 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Download className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Download Your Files</p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive complete access to all source code, assets, and documentation for your website.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Full Ownership</p>
                    <p className="text-sm text-muted-foreground">
                      The website is now yours! No more monthly payments - you own it completely.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">
                    Important
                  </h4>
                  <p className="text-sm text-blue-800">
                    Please check your spam folder if you don't receive the download link within 48 hours. 
                  </p>
                </div>
              </div>
            </div>

            {/* Subscription Information */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">
                    About Your Subscription
                  </h4>
                  <p className="text-sm text-green-800">
                    You can cancel your subscription at any time, and your website will remain live on our servers. 
                    If you'd like your website removed from PTBoost servers, please email me at{" "}
                    <a href="mailto:alexander.ptboost@gmail.com" className="text-green-700 hover:underline font-medium">
                      alexander.ptboost@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/" className="flex-1">
                <Button className="w-full h-12 bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/account" className="flex-1">
                <Button variant="outline" className="w-full h-12">
                  View My Account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Receipt Notice */}
        <Card className="border-muted">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              A receipt has been sent to your email address. Keep it for your records.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

