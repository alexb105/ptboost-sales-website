"use client"

import { Check, ArrowRight, Sparkles, X, TrendingUp, Users, Calendar, MessageCircle, Zap } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

// Case study data for each demo
const caseStudies = {
  style1: {
    title: "Premium & Professional",
    style: "STYLE #1",
    clientName: "Liam Hogan",
    clientType: "Certified Personal Trainer",
    location: "London, UK",
    results: [
      { metric: "3-5", label: "New Leads Daily", icon: TrendingUp },
      { metric: "24/7", label: "Working For You", icon: Users },
      { metric: "7 Days", label: "From Start to Live", icon: Calendar },
    ],
    testimonial: "This website completely transformed my business. The psychology-driven design converts visitors automatically, and the mobile-first approach means clients can book me from anywhere. The smart lead capture system collects all their details — I wake up to new enquiries every morning.",
    beforeAfter: {
      before: "Relying only on Instagram and word-of-mouth. Had to DM people constantly and chase leads. No professional way to capture client details.",
      after: "A conversion-optimized website with smart lead capture that works 24/7. Clients find me through Google, fill out the form, and I follow up. Simple.",
    },
    features: [
      "Psychology-driven design automatically qualifies leads",
      "Mobile-first perfection — looks amazing on every device",
      "Smart lead capture collects names, emails & goals automatically",
      "Lightning-fast load times keep visitors engaged",
    ],
  },
  style2: {
    title: "Vibrant & Empowering",
    style: "STYLE #2",
    clientName: "Sophie Martinez",
    clientType: "Female Wellness Coach",
    location: "Manchester, UK",
    results: [
      { metric: "99%", label: "Mobile Ready", icon: TrendingUp },
      { metric: "5★", label: "Professional", icon: Users },
      { metric: "<1s", label: "Load Time", icon: Zap },
    ],
    testimonial: "I was skeptical at first — how much could a website really change? But the vibrant design perfectly matches my brand, and the mobile-first approach is crucial since all my clients find me on their phones. The lead capture system makes it so easy to collect client info and the free hosting means no surprise bills.",
    beforeAfter: {
      before: "Only had Instagram. When people asked 'do you have a website?', I had to say no. Looked unprofessional and lost clients to trainers with proper sites.",
      after: "A beautiful, mobile-optimized website with my link in bio. Lead capture forms collect every enquiry. Free hosting forever means no monthly costs eating into profits.",
    },
    features: [
      "Free hosting forever — zero monthly fees or hidden costs",
      "Mobile-first design — 90% of my clients visit on phones",
      "Lead capture system collects client details automatically",
      "Psychology-driven layout turns browsers into bookers",
    ],
  },
  style3: {
    title: "Bold & Impactful",
    style: "STYLE #3",
    clientName: "Zarnder Fitness",
    clientType: "Transformation & Results Coach",
    location: "Birmingham, UK",
    results: [
      { metric: "Live", label: "In Just 7 Days", icon: TrendingUp },
      { metric: "100%", label: "Custom Design", icon: Users },
      { metric: "£59", label: "One-Time Cost", icon: Calendar },
    ],
    testimonial: "This website doesn't just look good — it SELLS. The bold design matches my brand perfectly, and the psychology-driven layout pre-qualifies leads before they contact me. The 7-day turnaround was insane — I went from no site to fully live in a week. Best £59 I've ever spent.",
    beforeAfter: {
      before: "No website at all. Just Instagram. When serious clients asked for more info, I had nowhere professional to send them. Lost deals to competitors with proper sites.",
      after: "A bold, mobile-optimized website that's on-brand. Smart lead capture qualifies prospects. Lightning-fast load times. Free hosting means it costs nothing to run.",
    },
    features: [
      "7-day turnaround — live and booking clients in a week",
      "Psychology-driven design pre-qualifies serious clients",
      "Lightning-fast & secure — built with modern tech",
      "Free enterprise-grade hosting — no monthly fees ever",
    ],
  },
}

export function WebsiteShowcaseSection() {
  const [selectedDemo, setSelectedDemo] = useState<'style1' | 'style2' | 'style3' | null>(null)
  return (
    <section id="showcase" className="relative -mt-24 pt-32 pb-20 md:pb-32 overflow-hidden bg-gradient-to-b from-transparent via-background to-accent/5">
      <div className="container mx-auto relative z-10 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Demo Websites Section */}
          <div className="relative">
            {/* Decorative Background Elements */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent/5 via-orange-500/5 to-red-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Section Header with Enhanced Design */}
            <div className="relative text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-accent/20 via-orange-500/20 to-red-500/20 border border-accent/40 mb-6 shadow-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse delay-75" />
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse delay-150" />
                </div>
                <span className="text-xs font-bold tracking-wide uppercase">3 Stunning Design Styles</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
                Here's What You'll Get
                <span className="block mt-2 bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Real Websites. Real Results.
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Professional websites like these — <span className="font-bold text-foreground">fully customized</span> for your brand, 
                style, and personality. No templates, no cookie-cutter designs.
              </p>
            </div>

            {/* Website Previews with Enhanced Cards */}
            <div className="grid md:grid-cols-3 gap-8 lg:gap-10 relative">
              {/* Demo Website 1 - Premium & Professional */}
              <div className="group cursor-pointer" onClick={() => setSelectedDemo('style1')}>
                <div className="relative">
                  {/* Glow Effect on Hover */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Style Badge */}
                  <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-black shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    STYLE #1
                  </div>
                  
                  <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-[1.03] bg-white dark:bg-card border-2 border-transparent group-hover:border-accent/30">
                    {/* Browser Chrome */}
                    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
                      </div>
                      <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg px-3 py-1 text-[10px] text-muted-foreground text-center font-medium shadow-inner">
                      </div>
                    </div>
                    
                    {/* Website Preview */}
                    <div className="relative h-[400px] overflow-hidden bg-white dark:bg-gray-900">
                      <img 
                        src="/website_demos/personal-trainer-website-2.png" 
                        alt="Personal Trainer Website Demo 2"
                        className="w-full h-auto animate-slow-scroll"
                      />
                      
                      {/* Hover Overlay with Features */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center px-4">
                          <p className="text-lg font-bold mb-2">📊 View Case Study</p>
                          <p className="text-sm text-white/80">See real results & client testimonial</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Info */}
                  <div className="mt-6 text-center">
                    <p className="font-black text-foreground text-lg mb-2 whitespace-nowrap">
                      Premium & Professional
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 min-h-[2.5rem] flex items-center justify-center">
                      Perfect for elite trainers & strength coaches
                    </p>
                    
                    {/* Feature Pills */}
                    <div className="flex flex-nowrap gap-2 justify-center min-h-[2rem]">
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full border border-accent/20 whitespace-nowrap">Sleek</span>
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-600 text-xs font-bold rounded-full border border-blue-500/20 whitespace-nowrap">Modern</span>
                      <span className="px-3 py-1 bg-purple-500/10 text-purple-600 text-xs font-bold rounded-full border border-purple-500/20 whitespace-nowrap">Elite</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Website 2 - Vibrant & Empowering */}
              <div className="group cursor-pointer" onClick={() => setSelectedDemo('style2')}>
                <div className="relative">
                  {/* Glow Effect on Hover */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Style Badge */}
                  <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white px-4 py-2 rounded-full text-xs font-black shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    STYLE #2
                  </div>
                  
                  <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-[1.03] bg-white dark:bg-card border-2 border-transparent group-hover:border-pink-500/30">
                    {/* Browser Chrome */}
                    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
                      </div>
                      <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg px-3 py-1 text-[10px] text-muted-foreground text-center font-medium shadow-inner">
                      </div>
                    </div>
                    
                    {/* Website Preview */}
                    <div className="relative h-[400px] overflow-hidden bg-white dark:bg-gray-900">
                      <img 
                        src="/website_demos/personal-trainer-website-1_.png" 
                        alt="Personal Trainer Website Demo 1"
                        className="w-full h-auto animate-slow-scroll"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center px-4">
                          <p className="text-lg font-bold mb-2">📊 View Case Study</p>
                          <p className="text-sm text-white/80">See real results & client testimonial</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Info */}
                  <div className="mt-6 text-center">
                    <p className="font-black text-foreground text-lg mb-2 whitespace-nowrap">
                      Vibrant & Empowering
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 min-h-[2.5rem] flex items-center justify-center">
                      Perfect for female trainers & wellness coaches
                    </p>
                    
                    {/* Feature Pills */}
                    <div className="flex flex-nowrap gap-2 justify-center min-h-[2rem]">
                      <span className="px-3 py-1 bg-pink-500/10 text-pink-600 text-xs font-bold rounded-full border border-pink-500/20 whitespace-nowrap">Bright</span>
                      <span className="px-3 py-1 bg-rose-500/10 text-rose-600 text-xs font-bold rounded-full border border-rose-500/20 whitespace-nowrap">Engaging</span>
                      <span className="px-3 py-1 bg-fuchsia-500/10 text-fuchsia-600 text-xs font-bold rounded-full border border-fuchsia-500/20 whitespace-nowrap">Friendly</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Website 3 - Bold & Impactful */}
              <div className="group cursor-pointer" onClick={() => setSelectedDemo('style3')}>
                <div className="relative">
                  {/* Glow Effect on Hover */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Style Badge */}
                  <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-black shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    STYLE #3
                  </div>
                  
                  <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-[1.03] bg-white dark:bg-card border-2 border-transparent group-hover:border-orange-500/30">
                    {/* Browser Chrome */}
                    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
                      </div>
                      <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg px-3 py-1 text-[10px] text-muted-foreground text-center font-medium shadow-inner">
                      </div>
                    </div>
                    
                    {/* Website Preview */}
                    <div className="relative h-[400px] overflow-hidden bg-white dark:bg-gray-900">
                      <img 
                        src="/website_demos/personal-trainer-website-3.png" 
                        alt="Personal Trainer Website Demo 3"
                        className="w-full h-auto animate-slow-scroll"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center px-4">
                          <p className="text-lg font-bold mb-2">📊 View Case Study</p>
                          <p className="text-sm text-white/80">See real results & client testimonial</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Info */}
                  <div className="mt-6 text-center">
                    <p className="font-black text-foreground text-lg mb-2 whitespace-nowrap">
                      Bold & Impactful
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 min-h-[2.5rem] flex items-center justify-center">
                      Perfect for transformation specialists & bootcamps
                    </p>
                    
                    {/* Feature Pills */}
                    <div className="flex flex-nowrap gap-2 justify-center min-h-[2rem]">
                      <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full border border-yellow-500/20 whitespace-nowrap">Powerful</span>
                      <span className="px-3 py-1 bg-orange-500/10 text-orange-600 text-xs font-bold rounded-full border border-orange-500/20 whitespace-nowrap">Dynamic</span>
                      <span className="px-3 py-1 bg-red-500/10 text-red-600 text-xs font-bold rounded-full border border-red-500/20 whitespace-nowrap">Bold</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Powerful CTA Section */}
            <div className="mt-20 relative">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-orange-500/10 to-red-500/10 blur-3xl" />
              
              <div className="relative bg-gradient-to-br from-accent/10 via-orange-500/10 to-red-500/10 border-2 border-accent/30 rounded-3xl p-10 md:p-12 text-center shadow-2xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10">
                  {/* Icon Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-orange-500 text-white mb-6 shadow-lg">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-bold">One-of-a-Kind Websites</span>
                  </div>

                  {/* Headline */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center shadow-xl">
                      <Check className="h-7 w-7 text-white stroke-[3]" />
                    </div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                      100% Custom. 100% Yours.
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-3">
                    Each website is <span className="font-bold text-foreground">fully customized</span> to match your brand colors, personality, and unique style.
                  </p>
                  <p className="text-base text-muted-foreground mb-8 italic">
                    No two websites are ever the same — yours will be one-of-a-kind.
                  </p>

                  {/* CTA Button */}
                  <a 
                    href="#cta" 
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent via-orange-500 to-red-500 text-white text-lg font-black rounded-full shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-300 animate-gradient-shift"
                  >
                    <span>Claim Yours Now</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>

                  {/* Value Props */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      <span>Only £59 one-time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      <span>Live in 7 days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      <span>No monthly fees</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <Dialog open={selectedDemo !== null} onOpenChange={() => setSelectedDemo(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedDemo && (
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center border-b pb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent/20 via-orange-500/20 to-red-500/20 border border-accent/40 mb-4">
                  <span className="text-xs font-bold tracking-wide uppercase">{caseStudies[selectedDemo].style}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2">
                  {caseStudies[selectedDemo].title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {caseStudies[selectedDemo].clientName} • {caseStudies[selectedDemo].clientType}
                </p>
                <p className="text-sm text-muted-foreground">{caseStudies[selectedDemo].location}</p>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {caseStudies[selectedDemo].results.map((result, idx) => {
                  const Icon = result.icon
                  return (
                    <div key={idx} className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-accent via-orange-500 to-red-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
                      <div className="relative bg-gradient-to-br from-accent/10 via-orange-500/10 to-red-500/10 border border-accent/30 rounded-xl p-6 text-center">
                        <Icon className="h-8 w-8 mx-auto mb-3 text-accent" />
                        <p className="text-4xl font-black bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent mb-1">
                          {result.metric}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground">{result.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Testimonial */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur" />
                <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center flex-shrink-0 text-white font-black text-xl">
                      {caseStudies[selectedDemo].clientName[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-500 text-lg">★</span>
                        ))}
                      </div>
                      <p className="text-foreground italic leading-relaxed mb-3">
                        "{caseStudies[selectedDemo].testimonial}"
                      </p>
                      <p className="text-sm font-bold text-muted-foreground">
                        — {caseStudies[selectedDemo].clientName}, {caseStudies[selectedDemo].clientType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Before & After */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <h3 className="text-lg font-black text-foreground">Before</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {caseStudies[selectedDemo].beforeAfter.before}
                  </p>
                </div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-600 stroke-[3]" />
                    </div>
                    <h3 className="text-lg font-black text-foreground">After</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {caseStudies[selectedDemo].beforeAfter.after}
                  </p>
                </div>
              </div>

              {/* Additional Features */}
              <div className="bg-gradient-to-br from-accent/5 via-orange-500/5 to-red-500/5 border border-accent/20 rounded-xl p-6">
                <h3 className="text-xl font-black text-foreground mb-4 text-center">Additional Results</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {caseStudies[selectedDemo].features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="rounded-full bg-gradient-to-br from-accent to-orange-500 p-1 mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-white stroke-[3]" />
                      </div>
                      <p className="text-sm text-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center pt-4 border-t">
                <p className="text-lg font-bold text-foreground mb-4">
                  Ready to Get Similar Results?
                </p>
                <a 
                  href="#cta" 
                  onClick={() => setSelectedDemo(null)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent via-orange-500 to-red-500 text-white font-black rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <span>Claim Your £59 Website Now</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
                <p className="text-xs text-muted-foreground mt-3">Only £59 one-time • Live in 7 days • No monthly fees</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

