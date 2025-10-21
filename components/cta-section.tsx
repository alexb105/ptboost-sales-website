"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Star, Check, Sparkles, ChevronDown, AlertCircle, Bell } from "lucide-react"
import { useState, useEffect } from "react"

export function CTASection() {
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const [isCapacityInfoOpen, setIsCapacityInfoOpen] = useState(false)
  const [isAtCapacity, setIsAtCapacity] = useState(false)
  const [showNotifyForm, setShowNotifyForm] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  
  // Fetch capacity status from Google Sheets
  useEffect(() => {
    const SHEET_ID = '108ri3HUzYoPBNbj7TlCmV_tUQiC8zZP-h_8SXebeEo4'
    const RANGE = 'Sheet1!B3' // Cell B3 contains the isAtCapacity value
    
    // Public sheet URL (no API key needed)
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&range=${RANGE}`
    
    fetch(url)
      .then(res => res.text())
      .then(text => {
        // Google Sheets returns JSONP, need to parse it
        const json = JSON.parse(text.substr(47).slice(0, -2))
        const value = json.table.rows[0]?.c[0]?.v
        setIsAtCapacity(value === true || value === 'TRUE' || value === 'true')
      })
      .catch((err) => {
        console.error('Error fetching capacity:', err)
        setIsAtCapacity(false) // Default to available if fetch fails
      })
  }, [])

  const handleCheckout = () => {
    if (isAtCapacity) {
      // Show the notify form instead of going to checkout
      setShowNotifyForm(true)
      return
    }
    // TODO: Replace with your actual checkout/payment link
    window.location.href = "https://your-payment-link.com"
  }

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNotifyStatus('loading')

    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: notifyEmail })
      })

      if (response.ok) {
        setNotifyStatus('success')
        setNotifyEmail('')
      } else {
        setNotifyStatus('error')
      }
    } catch (error) {
      setNotifyStatus('error')
    }
  }

  return (
    <section id="cta" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-accent/5 via-orange-500/5 to-red-500/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-orange-500/5 to-transparent" />
      <div className="absolute top-20 right-10 h-96 w-96 rounded-full bg-gradient-to-br from-accent/20 to-orange-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-orange-500/15 to-red-500/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto relative z-10 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="mb-4 text-balance font-sans text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Ready to Get Your Professional Website?
            </h2>
            <p className="text-pretty text-xl text-muted-foreground md:text-2xl leading-relaxed max-w-3xl mx-auto">
              Lock in <span className="font-black text-accent">launch pricing</span> before I hit 50 sites and raise the price to £299
            </p>
          </div>

          {/* Pricing Card */}
          <div className="flex flex-col items-center perspective-1000">
            <div className="w-full max-w-6xl">
              {/* Two-Column Pricing Card */}
              <div className="relative group">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-accent/40 via-orange-500/30 to-red-500/40 blur-2xl animate-pulse" />

                {/* 3D Box Container */}
                <div className="relative preserve-3d transition-transform duration-500">
                  {/* Box Shadow/Depth Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/30 via-orange-500/30 to-red-500/30 translate-x-2 translate-y-2 blur-sm" />
                  
                  {/* Main Box Face */}
                  <div className="relative rounded-3xl bg-gradient-to-br from-accent via-orange-500 to-red-500 p-1 shadow-2xl transform transition-all duration-300 group-hover:shadow-3xl">
                    {/* Package Ribbon */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="relative">
                        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-6 py-2 rounded-full shadow-lg border-2 border-yellow-500/50">
                          <span className="text-xs font-black text-yellow-900 uppercase tracking-wider">Best Value</span>
                        </div>
                        {/* Ribbon tails */}
                        <div className="absolute -bottom-2 left-0 w-3 h-4 bg-yellow-500 clip-ribbon-left" />
                        <div className="absolute -bottom-2 right-0 w-3 h-4 bg-yellow-500 clip-ribbon-right" />
                      </div>
                    </div>

                    {/* Inner Content */}
                    <div className="relative rounded-3xl bg-gradient-to-br from-white/95 to-white/90 dark:from-card/95 dark:to-card/90 px-8 py-10 backdrop-blur overflow-hidden">
                      {/* Decorative corner accents */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-3xl" />
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-tr-3xl" />
                      
                      <div className="relative z-10">
                        {/* Header - Full Width */}
                        <div className="flex items-center justify-center gap-3 mb-8">
                          <Star className="h-6 w-6 fill-accent text-accent animate-pulse" />
                          <span className="text-base font-extrabold bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent uppercase tracking-wider">
                            Complete Website Package
                          </span>
                          <Star className="h-6 w-6 fill-accent text-accent animate-pulse" />
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Left Column - Features */}
                          <div className="space-y-6 h-full flex flex-col">
                            {/* What's Included */}
                            <h3 className="text-lg font-black text-foreground text-center lg:text-left">Everything You Need to Win:</h3>
                            
                            <div className="space-y-3">
                              <div className="flex items-start gap-3 group">
                                <div className="rounded-full bg-gradient-to-br from-accent to-orange-500 p-1.5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                                  <Check className="h-4 w-4 text-white stroke-[3]" />
                                </div>
                                <div>
                                  <p className="font-bold text-foreground text-sm">Premium Single-Page Website</p>
                                  <p className="text-xs text-muted-foreground leading-relaxed">Psychology-driven design that converts visitors into clients</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3 group">
                                <div className="rounded-full bg-gradient-to-br from-accent to-orange-500 p-1.5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                                  <Check className="h-4 w-4 text-white stroke-[3]" />
                                </div>
                                <div>
                                  <p className="font-bold text-foreground text-sm">Mobile-First Design</p>
                                  <p className="text-xs text-muted-foreground leading-relaxed">Flawless on phones, tablets & desktop — your clients are mobile</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3 group">
                                <div className="rounded-full bg-gradient-to-br from-accent to-orange-500 p-1.5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                                  <Check className="h-4 w-4 text-white stroke-[3]" />
                                </div>
                                <div>
                                  <p className="font-bold text-foreground text-sm">Free Hosting Forever</p>
                                  <p className="text-xs text-muted-foreground leading-relaxed">Lightning-fast servers, bulletproof security, zero monthly fees</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3 group">
                                <div className="rounded-full bg-gradient-to-br from-accent to-orange-500 p-1.5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                                  <Check className="h-4 w-4 text-white stroke-[3]" />
                                </div>
                                <div>
                                  <p className="font-bold text-foreground text-sm">Smart Lead Capture System</p>
                                  <p className="text-xs text-muted-foreground leading-relaxed">Collect client details effortlessly — never miss an opportunity</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3 group">
                                <div className="rounded-full bg-gradient-to-br from-accent to-orange-500 p-1.5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                                  <Check className="h-4 w-4 text-white stroke-[3]" />
                                </div>
                                <div>
                                  <p className="font-bold text-foreground text-sm">Modern Web Technologies</p>
                                  <p className="text-xs text-muted-foreground leading-relaxed">Blazing fast load times on any device or browser</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3 group">
                                <div className="rounded-full bg-gradient-to-br from-accent to-orange-500 p-1.5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                                  <Check className="h-4 w-4 text-white stroke-[3]" />
                                </div>
                                <div>
                                  <p className="font-bold text-foreground text-sm">7-Day Turnaround</p>
                                  <p className="text-xs text-muted-foreground leading-relaxed">Live and attracting clients in a week or less — guaranteed</p>
                                </div>
                              </div>
                            </div>

                            {/* Real Guarantee */}
                            <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                  <Check className="h-5 w-5 text-green-600 stroke-[3]" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-foreground mb-1">100% Money-Back Guarantee</p>
                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                    Not happy with your site? Full refund, no questions asked. 
                                    You have nothing to lose and a professional website to gain.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Column - Pricing & CTA */}
                          <div className="space-y-6 h-full flex flex-col">
                            {/* Pricing with Enhanced Visual Hierarchy */}
                            <div className="flex items-center justify-center gap-4">
                              <div className="text-center relative">
                                <div className="absolute -inset-2 bg-red-500/20 rounded-lg transform rotate-12"></div>
                                <span className="relative text-4xl font-black text-muted-foreground line-through decoration-4 decoration-red-500 block">£299</span>
                                <span className="text-xs font-bold text-muted-foreground uppercase">After 50 Sites</span>
                              </div>
                              <ArrowRight className="h-8 w-8 text-accent animate-pulse" />
                              <div className="flex items-baseline">
                                <span className="text-4xl font-bold text-foreground">£</span>
                                <span className="text-8xl font-black bg-gradient-to-br from-accent via-orange-500 to-red-500 bg-clip-text text-transparent leading-none drop-shadow-2xl animate-pulse" style={{ animationDuration: '2s' }}>
                                  39
                                </span>
                              </div>
                            </div>

                            <p className="text-center text-sm font-bold text-muted-foreground">
                              LAUNCH SPECIAL - LIMITED SPOTS
                            </p>

                            {/* Launch Offer Badge */}
                            <div className="flex justify-center">
                              <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur animate-pulse"></div>
                                <div className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white/50 px-6 py-3 shadow-xl">
                                  <Sparkles className="h-5 w-5 text-white animate-spin" style={{ animationDuration: '3s' }} />
                                  <span className="text-lg font-black text-white">Save £260 - Launch Offer</span>
                                </div>
                              </div>
                            </div>

                            {/* Transparency Box - Collapsible */}
                            <button
                              onClick={() => setIsPricingOpen(!isPricingOpen)}
                              className="w-full p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all cursor-pointer"
                            >
                              <div className="flex items-center justify-center gap-2">
                                <p className="text-center text-sm font-bold text-foreground">
                                  <span className="text-blue-600 dark:text-blue-400">Why only £39?</span>
                                </p>
                                <ChevronDown 
                                  className={`h-4 w-4 text-blue-600 transition-transform duration-300 ${isPricingOpen ? 'rotate-180' : ''}`}
                                />
                              </div>
                              {isPricingOpen && (
                                <p className="text-center text-xs text-muted-foreground leading-relaxed mt-3 animate-in slide-in-from-top-2">
                                  Limited introductory offer for the first 50 PT websites. This is a one-time 
                                  pricing opportunity. Once I hit 50 sites, the price increases to £299.
                                </p>
                              )}
                            </button>

                            {/* Payment Info */}
                            <div className="border-t border-b border-accent/20 py-4">
                              <p className="text-center text-sm font-bold text-foreground mb-1">
                                ✅ One-Time Payment • No Hidden Fees
                              </p>
                              <p className="text-center text-xs text-muted-foreground">
                                Hosting included • Pay once, own forever • Secure payment via Stripe
                              </p>
                            </div>

                            {/* Enhanced CTA Button */}
                            {!showNotifyForm && (
                              <div className="pt-2">
                                <div className="relative group/btn">
                                  <div className="absolute -inset-1 bg-gradient-to-r from-accent via-orange-500 to-red-500 rounded-xl blur opacity-75 group-hover/btn:opacity-100 animate-pulse"></div>
                                  <Button
                                    size="lg"
                                    className="relative w-full h-16 bg-gradient-to-r from-accent via-orange-500 to-red-500 text-xl font-black text-white hover:scale-105 shadow-xl transition-all border-2 border-white/30"
                                    onClick={handleCheckout}
                                  >
                                    <Sparkles className="mr-2 h-6 w-6 animate-pulse" />
                                    Secure My £39 Website Now!
                                    <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover/btn:translate-x-1" />
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* Get Notified Form - Shows When Button Clicked at Capacity */}
                            {showNotifyForm && (
                              <div className="pt-2">
                                <div className="mt-2">
                                  <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25"></div>
                                    <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
                                      {notifyStatus === 'success' ? (
                                        <div className="text-center">
                                          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="h-8 w-8 text-green-600" />
                                          </div>
                                          <h3 className="text-lg font-bold text-foreground mb-2">You're on the List! 🎉</h3>
                                          <p className="text-sm text-muted-foreground mb-4">
                                            I'll email you as soon as spots open up. Keep an eye on your inbox!
                                          </p>
                                          <button
                                            onClick={() => {
                                              setShowNotifyForm(false)
                                              setNotifyStatus('idle')
                                            }}
                                            className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                                          >
                                            ← Go Back
                                          </button>
                                        </div>
                                      ) : (
                                        <>
                                          <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                              <Bell className="h-5 w-5 text-blue-600" />
                                              <h3 className="text-lg font-bold text-foreground">Get Notified When Spots Open</h3>
                                            </div>
                                            <button
                                              onClick={() => setShowNotifyForm(false)}
                                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                              ✕
                                            </button>
                                          </div>
                                          <p className="text-sm text-muted-foreground mb-4">
                                            Leave your email and I'll let you know the moment I have availability. No spam, just a heads up!
                                          </p>
                                          <form onSubmit={handleNotifySubmit} className="space-y-3">
                                            <Input
                                              type="email"
                                              placeholder="your@email.com"
                                              value={notifyEmail}
                                              onChange={(e) => setNotifyEmail(e.target.value)}
                                              required
                                              className="h-12 text-base"
                                              disabled={notifyStatus === 'loading'}
                                            />
                                            <Button
                                              type="submit"
                                              disabled={notifyStatus === 'loading'}
                                              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold"
                                            >
                                              {notifyStatus === 'loading' ? (
                                                <>
                                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                                                  Sending...
                                                </>
                                              ) : (
                                                <>
                                                  <Bell className="mr-2 h-5 w-5" />
                                                  Notify Me When Available
                                                </>
                                              )}
                                            </Button>
                                            {notifyStatus === 'error' && (
                                              <p className="text-sm text-red-600 text-center">
                                                Something went wrong. Please try again.
                                              </p>
                                            )}
                                          </form>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                              
                            {/* Capacity Info Explanation - Always Visible for Urgency (except when notify form is shown) */}
                            {!showNotifyForm && (
                              <div className="mt-4">
                              <button
                                onClick={() => setIsCapacityInfoOpen(!isCapacityInfoOpen)}
                                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <AlertCircle className="h-4 w-4" />
                                {isAtCapacity ? "Can't press this button? Learn why" : "Why limited spots? Learn more"}
                                <ChevronDown 
                                  className={`h-4 w-4 transition-transform duration-300 ${isCapacityInfoOpen ? 'rotate-180' : ''}`}
                                />
                              </button>
                              
                              {isCapacityInfoOpen && (
                                <div className="mt-3 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl animate-in slide-in-from-top-2">
                                  <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                      <AlertCircle className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                      {isAtCapacity ? (
                                        <>
                                          <p className="text-sm font-bold text-foreground mb-2">
                                            Why is the button disabled?
                                          </p>
                                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                            To ensure every client receives top-quality work and lightning-fast turnaround times, 
                                            I can only take on a limited number of projects at a time. Currently, I'm at full capacity 
                                            delivering websites to existing clients.
                                          </p>
                                          <p className="text-sm font-bold text-foreground mb-2">
                                            When will spots open up?
                                          </p>
                                          <p className="text-sm text-muted-foreground leading-relaxed">
                                            New spots typically open within 1-2 weeks as projects are completed. Check back soon, 
                                            or follow me on social media for announcements when bookings reopen.
                                          </p>
                                        </>
                                      ) : (
                                        <>
                                          <p className="text-sm font-bold text-foreground mb-2">
                                            Why are spots limited?
                                          </p>
                                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                            To ensure every client receives top-quality work and the guaranteed 7-day turnaround, 
                                            I can only take on a limited number of projects at a time. This isn't a faceless agency — 
                                            it's me personally delivering each website.
                                          </p>
                                          <p className="text-sm font-bold text-foreground mb-2">
                                            What happens when capacity is reached?
                                          </p>
                                          <p className="text-sm text-muted-foreground leading-relaxed">
                                            Once I hit my project limit, this button will be disabled and you'll need to wait 1-2 weeks 
                                            for the next available spot. If you're ready now, secure your spot today at the £39 launch price.
                                          </p>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

