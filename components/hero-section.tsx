"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Star, TrendingUp, Users, Shield, Award, ChevronDown, Zap, Clock, Target } from "lucide-react"

export function HeroSection() {
  const scrollToProcess = () => {
    const painPointsSection = document.getElementById("pain-points")
    if (painPointsSection) {
      painPointsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-accent/5 to-orange-500/5 pt-16">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-orange-500/10 to-transparent" />
      <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-gradient-to-br from-accent/20 to-orange-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-accent/15 to-red-500/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto relative z-10 px-4 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          {/* Main Content - Centered */}
          <div className="text-center">
            {/* Limited Offer Badge - Enhanced */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent via-orange-500 to-red-500 px-8 py-3 text-sm font-extrabold text-white shadow-2xl animate-pulse border-2 border-white/30 hover:scale-105 transition-transform">
              <TrendingUp className="h-5 w-5" />
              <span className="tracking-wide">LAUNCH SPECIAL: First 50 Sites Only £59</span>
            </div>

            {/* Pain Point Headline - Younger Audience Hook */}
            <h1 className="mb-8 text-balance font-sans text-5xl font-black leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl">
              <span className="block mb-4 bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                Stop Chasing The Algorithm.
              </span>
              <span className="block text-foreground">
                Start Booking Clients While You Sleep.
              </span>
            </h1>

            {/* Subheadline - Younger Audience */}
            <p className="mb-10 text-pretty text-2xl text-foreground md:text-3xl lg:text-4xl leading-tight font-bold max-w-4xl mx-auto">
              Get a professional website that attracts <span className="bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent">local clients 24/7.</span>
              Launch in 7 days. £59 one-time. No tech. No monthly fees.
            </p>

            {/* Value Proposition - Stats Grid */}
            <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 via-orange-500/10 to-transparent border-2 border-accent/30 backdrop-blur-sm hover:scale-105 transition-transform">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-gradient-to-br from-accent to-orange-500">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-black text-foreground mb-2">24/7</p>
                <p className="text-sm font-semibold text-muted-foreground">Client Generation</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 via-red-500/10 to-transparent border-2 border-orange-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-gradient-to-br from-orange-500 to-red-500">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-black text-foreground mb-2">7 Days</p>
                <p className="text-sm font-semibold text-muted-foreground">Launch Ready</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 via-accent/10 to-transparent border-2 border-red-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-gradient-to-br from-red-500 to-accent">
                    <Zap className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
                <p className="text-3xl font-black text-foreground mb-2">£59</p>
                <p className="text-sm font-semibold text-muted-foreground">One-Time Payment</p>
              </div>
            </div>

            {/* CTA Button - More Prominent */}
            <div className="mb-10">
              <div className="relative inline-block group">
                <div className="absolute -inset-3 bg-gradient-to-r from-accent via-orange-500 to-red-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 animate-pulse"></div>
                <Button
                  size="lg"
                  className="relative h-20 px-16 bg-gradient-to-r from-accent via-orange-500 to-red-500 text-2xl md:text-3xl font-black text-white hover:scale-105 shadow-2xl transition-all border-4 border-white/40"
                  onClick={scrollToProcess}
                >
                  <Zap className="mr-3 h-8 w-8 fill-white" />
                  Learn More
                  <ArrowRight className="ml-3 h-8 w-8 transition-transform group-hover:translate-x-2" />
                </Button>
              </div>
              <p className="mt-4 text-sm font-bold text-muted-foreground">
                🎯 Live in 7 days • No monthly fees • No tech skills needed
              </p>
            </div>

            {/* Trust Indicators - Redesigned */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-accent/10 to-orange-500/10 border-2 border-accent/40 backdrop-blur-sm hover:scale-105 transition-transform">
                <Check className="h-5 w-5 text-accent" />
                <span className="font-bold text-sm">7-Day Setup</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/40 backdrop-blur-sm hover:scale-105 transition-transform">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-bold text-sm">Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/40 backdrop-blur-sm hover:scale-105 transition-transform">
                <Award className="h-5 w-5 text-orange-600" />
                <span className="font-bold text-sm">No Tech Skills Needed</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator - Enhanced */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-foreground transition-all cursor-pointer group">
            <span className="text-sm font-bold px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 group-hover:border-accent/50 transition-colors">
              See How It Works
            </span>
            <div className="flex flex-col items-center gap-0">
              <ChevronDown className="h-5 w-5 animate-bounce group-hover:animate-none group-hover:translate-y-1 transition-transform" />
              <ChevronDown className="h-4 w-4 animate-bounce group-hover:animate-none group-hover:translate-y-1 transition-transform" style={{ animationDelay: '0.15s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
