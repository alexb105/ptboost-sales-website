"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Star, TrendingUp, Users, Shield, Award, ChevronDown, Zap, Clock, Target, Smartphone, Search } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToProcess = () => {
    const painPointsSection = document.getElementById("pain-points")
    if (painPointsSection) {
      painPointsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-accent/5 to-orange-500/5 pt-16">
      {/* Enhanced Background Effects with Floating Animation */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-orange-500/10 to-transparent animate-gradient-shift" />
      <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-gradient-to-br from-accent/20 to-orange-500/20 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-accent/15 to-red-500/15 blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-accent/10 via-orange-500/10 to-red-500/10 blur-3xl animate-float-slow" />
      
      {/* Animated Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] opacity-50" />
      
      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-accent/40 animate-float-particle" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-orange-500/40 animate-float-particle" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-red-500/40 animate-float-particle" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 right-1/3 w-3 h-3 rounded-full bg-accent/30 animate-float-particle" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto relative z-10 px-4 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          {/* Main Content - Centered */}
          <div className="text-center">
            {/* Limited Offer Badge - Enhanced with Shimmer */}
            <div className={`mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent via-orange-500 to-red-500 px-6 md:px-8 py-3 text-xs md:text-sm font-extrabold text-white shadow-2xl border-2 border-white/30 hover:scale-110 transition-all duration-300 relative overflow-hidden group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 animate-bounce-slow relative z-10" />
              <span className="tracking-wide break-words relative z-10">LAUNCH SPECIAL: 1‑Month Free Trial</span>
            </div>

            {/* Core Hook */}
            <h1 className={`mb-8 text-balance font-sans text-5xl font-black leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl ${isVisible ? 'animate-fade-in-up-delayed' : 'opacity-0'}`}>
              <span className="block mb-4 bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-shift bg-[length:200%_auto]">
                You Train Clients.
              </span>
              <span className="block text-foreground animate-slide-in-left">
                We Handle Everything Else.
              </span>
            </h1>

            {/* Subheadline - Focused message for PTs */}
            <p className={`mb-10 text-pretty text-2xl text-foreground md:text-3xl lg:text-4xl leading-tight font-bold max-w-4xl mx-auto ${isVisible ? 'animate-fade-in-up-delayed-2' : 'opacity-0'}`}>
              Built for <span className="text-accent font-black">personal trainers</span>. Designed to <span className="font-black">grow your business</span> while you <span className="text-accent font-black">focus on clients</span>.
            </p>

            {/* Value Proposition - Customer Benefits Grid with Stagger Animation */}
            <div className={`mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto ${isVisible ? 'animate-fade-in-up-delayed-3' : 'opacity-0'}`}>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 via-orange-500/10 to-transparent border-2 border-accent/30 backdrop-blur-sm hover:scale-110 hover:rotate-1 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center justify-center mb-3 relative z-10">
                  <div className="p-3 rounded-full bg-gradient-to-br from-accent to-orange-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 shadow-lg group-hover:shadow-accent/50">
                    <Target className="h-6 w-6 text-white animate-pulse-slow" />
                  </div>
                </div>
                <p className="text-xl font-black text-foreground mb-2 relative z-10 group-hover:scale-105 transition-transform">Client Generation</p>
                <p className="text-sm font-semibold text-muted-foreground relative z-10">Lead Capture • 24/7 Leads</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 via-red-500/10 to-transparent border-2 border-orange-500/30 backdrop-blur-sm hover:scale-110 hover:-rotate-1 transition-all duration-300 group relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center justify-center mb-3 relative z-10">
                  <div className="p-3 rounded-full bg-gradient-to-br from-orange-500 to-red-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 shadow-lg group-hover:shadow-orange-500/50">
                    <Zap className="h-6 w-6 text-white animate-pulse-slow" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
                <p className="text-xl font-black text-foreground mb-2 relative z-10 group-hover:scale-105 transition-transform">7-Day Turnaround </p>
                <p className="text-sm font-semibold text-muted-foreground relative z-10">Live and attracting clients within 7 days</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 via-accent/10 to-transparent border-2 border-red-500/30 backdrop-blur-sm hover:scale-110 hover:rotate-1 transition-all duration-300 group relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center justify-center mb-3 relative z-10">
                  <div className="p-3 rounded-full bg-gradient-to-br from-red-500 to-accent group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 shadow-lg group-hover:shadow-red-500/50">
                    <Shield className="h-6 w-6 text-white animate-pulse-slow" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
                <p className="text-xl font-black text-foreground mb-2 relative z-10 group-hover:scale-105 transition-transform">Professionalism & Trust</p>
                <p className="text-sm font-semibold text-muted-foreground relative z-10">Mobile-Optimised Design</p>
              </div>
            </div>

            {/* CTA Button - More Prominent with Enhanced Animations */}
            <div className={`mb-10 ${isVisible ? 'animate-fade-in-up-delayed-4' : 'opacity-0'}`}>
              <div className="relative inline-block group">
                <div className="absolute -inset-3 bg-gradient-to-r from-accent via-orange-500 to-red-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-pulse-slow"></div>
                <div className="absolute -inset-6 bg-gradient-to-r from-accent/50 via-orange-500/50 to-red-500/50 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 group-hover:scale-125 transition-all duration-700"></div>
                <Button
                  size="lg"
                  className="relative h-20 px-16 bg-gradient-to-r from-accent via-orange-500 to-red-500 text-2xl md:text-3xl font-black text-white hover:scale-110 shadow-2xl transition-all duration-300 border-4 border-white/40 hover:border-white/60 overflow-hidden group/btn"
                  onClick={scrollToProcess}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  <Zap className="mr-3 h-8 w-8 fill-white relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Learn More</span>
                  <ArrowRight className="ml-3 h-8 w-8 relative z-10 transition-transform group-hover/btn:translate-x-2 group-hover/btn:scale-110" />
                </Button>
              </div>
              <p className="mt-4 text-xs md:text-sm font-bold text-muted-foreground break-words px-4 animate-fade-in">
                🎯 For UK personal trainers • Live in 7 days • Cancel anytime • No tech skills needed
              </p>
            </div>

            {/* Trust Indicators - Redesigned with Stagger */}
            <div className={`mb-16 md:mb-8 flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto ${isVisible ? 'animate-fade-in-up-delayed-5' : 'opacity-0'}`}>
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-accent/10 to-orange-500/10 border-2 border-accent/40 backdrop-blur-sm hover:scale-110 hover:rotate-1 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Check className="h-5 w-5 text-accent relative z-10 group-hover:scale-125 transition-transform" />
                <span className="font-bold text-sm relative z-10">7-Day Setup</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/40 backdrop-blur-sm hover:scale-110 hover:-rotate-1 transition-all duration-300 group relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Shield className="h-5 w-5 text-green-600 relative z-10 group-hover:scale-125 transition-transform" />
                <span className="font-bold text-sm relative z-10">7-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/40 backdrop-blur-sm hover:scale-110 hover:rotate-1 transition-all duration-300 group relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Award className="h-5 w-5 text-orange-600 relative z-10 group-hover:scale-125 transition-transform" />
                <span className="font-bold text-sm relative z-10">No Tech Skills Needed</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator - Enhanced with Pulse */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in-delayed">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-foreground transition-all cursor-pointer group" onClick={scrollToProcess}>
            <span className="text-sm font-bold px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 group-hover:border-accent/50 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
              See How It Works
            </span>
            <div className="flex flex-col items-center gap-0">
              <ChevronDown className="h-5 w-5 animate-bounce-slow group-hover:animate-none group-hover:translate-y-2 transition-transform" />
              <ChevronDown className="h-4 w-4 animate-bounce-slow group-hover:animate-none group-hover:translate-y-2 transition-transform" style={{ animationDelay: '0.15s' }} />
            </div>
            <div className="absolute -bottom-2 w-1 h-8 bg-gradient-to-b from-accent/50 to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  )
}
