"use client"

import { ShoppingCart, Upload, Wrench, Check, ArrowRight, ChevronDown } from "lucide-react"

export function ProcessSection() {
  return (
    <section id="process" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-accent/5">
      {/* Seamless Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-background/50 to-background z-20 pointer-events-none" />
      
      <div className="container mx-auto relative z-10 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent/10 to-orange-500/10 border border-accent/30 px-6 py-2 mb-6">
              <Check className="h-4 w-4 text-accent" />
              <span className="text-sm font-bold text-foreground">Simple 3-Step Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
              Here's How It Works:
              <span className="block bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent">
                1, 2, 3 — You're Live
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Seriously, it's this simple. Three steps, zero headaches, and your professional website is live in 7 days. 
              <span className="block mt-2 font-semibold text-foreground">Here's exactly what happens:</span>
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-8 relative items-stretch">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/20 via-orange-500/40 to-accent/20 z-0" style={{ top: '80px' }} />

            {/* Step 1 */}
            <div className="relative group h-full">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative h-full flex flex-col bg-white dark:bg-card rounded-2xl p-8 border-2 border-accent/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-accent to-orange-500 text-white font-black text-xl shadow-lg z-10">
                  1
                </div>

                {/* Icon */}
                <div className="mb-6 mt-4 flex justify-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/10 to-orange-500/10 border border-accent/30">
                    <ShoppingCart className="h-10 w-10 text-accent" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-foreground mb-4">
                  Purchase Your Website
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Secure your spot with a one-time payment of just £39. No hidden fees, no subscriptions — pay once, own forever.
                </p>

                {/* Features */}
                <ul className="space-y-2 flex flex-col items-center">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">Instant confirmation</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">Secure checkout</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">Money-back guarantee</span>
                  </li>
                </ul>
              </div>

              {/* Arrow (Desktop) */}
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight className="h-8 w-8 text-accent/50" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group h-full">
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative h-full flex flex-col bg-white dark:bg-card rounded-2xl p-8 border-2 border-orange-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white font-black text-xl shadow-lg z-10">
                  2
                </div>

                {/* Icon */}
                <div className="mb-6 mt-4 flex justify-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30">
                    <Upload className="h-10 w-10 text-orange-500" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-foreground mb-4">
                  Share Your Details
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Upload your content, photos, social links, and preferences. Don't have content yet? No problem — I'll help you!
                </p>

                {/* Features */}
                <ul className="space-y-2 flex flex-col items-center">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <span className="text-muted-foreground">Photos & bio (optional)</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <span className="text-muted-foreground">Social media links</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <span className="text-muted-foreground">Color schemes & fonts</span>
                  </li>
                </ul>
              </div>

              {/* Arrow (Desktop) */}
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight className="h-8 w-8 text-orange-500/50" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group h-full">
              <div className="absolute -inset-4 bg-gradient-to-br from-red-500/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative h-full flex flex-col bg-white dark:bg-card rounded-2xl p-8 border-2 border-red-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-accent text-white font-black text-xl shadow-lg z-10">
                  3
                </div>

                {/* Icon */}
                <div className="mb-6 mt-4 flex justify-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/10 to-accent/10 border border-red-500/30">
                    <Wrench className="h-10 w-10 text-red-500" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-foreground mb-4">
                  I Build & Launch
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Sit back and relax. I'll build your professional website, set up hosting, and have you live within 7 days — guaranteed.
                </p>

                {/* Features */}
                <ul className="space-y-2 flex flex-col items-center">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-muted-foreground">Custom design built</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-muted-foreground">Free hosting setup</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-muted-foreground">Live in 7 days max</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Seamless Transition to Next Section */}
          <div className="mt-20 text-center relative pb-8">
            {/* Success Badge */}
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-2xl shadow-green-500/30 mb-8 animate-bounce-slow">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
                <Check className="h-6 w-6 text-green-500 stroke-[3]" />
              </div>
              <div className="text-left">
                <p className="text-xl font-black text-white">Step 3 Complete — You're LIVE!</p>
              </div>
            </div>
            
            {/* Story Continuation */}
            <div className="mb-8">
              <p className="text-2xl md:text-3xl font-black text-foreground mb-3">
                That's It. Seriously.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Within 7 days, you'll have a professional website capturing local leads 24/7. 
                <span className="block mt-3 font-bold text-foreground">No maintenance. No monthly fees. No tech headaches.</span>
                <span className="block mt-2 text-foreground">Just a stunning website working for you while you focus on what you do best — transforming clients.</span>
              </p>
            </div>

            {/* See What You Get Below */}
            <div className="relative">
              <p className="text-lg text-muted-foreground mb-6 animate-pulse">
                See what you get below
              </p>
              
              {/* Mouse Scroll Icon */}
              <div className="inline-flex flex-col items-center gap-2 animate-bounce">
                <div className="w-8 h-12 rounded-full border-3 border-accent/40 flex items-start justify-center p-2">
                  <div className="w-1.5 h-3 bg-accent rounded-full animate-scroll-down" />
                </div>
                <ChevronDown className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

