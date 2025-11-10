"use client"

import { Rocket, Brain, Smartphone, Users, Zap, Shield, Search, Wand2, Check, ArrowRight, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"

const benefits = [
  {
    icon: Brain,
    title: "Psychology-Driven Design",
    description:
      "Every element is strategically placed using proven psychology techniques. Your site doesn't just look good—it's engineered to convert visitors into paying clients.",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/30",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Perfection",
    description:
      "Your clients are on their phones 24/7. Your website will look stunning and perform flawlessly on phones, tablets, and desktop. Zero compromises.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    icon: Users,
    title: "Smart Lead Capture System",
    description:
      "Collect customer details automatically with intelligent lead capture systems. Never miss a potential client again—every visitor is an opportunity.",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-500/30",
  },
  {
    icon: Zap,
    title: "Lightning-Fast & Secure",
    description:
      "Built with cutting-edge modern web technologies that load instantly on any device or browser. Fast sites = better rankings = more clients.",
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-500/10 to-orange-500/10",
    borderColor: "border-yellow-500/30",
  },
  {
    icon: Shield,
    title: "Hosting & Maintenance Included",
    description:
      "Everything included in one simple monthly price. Your website is hosted on enterprise-grade servers with bulletproof security, plus ongoing updates and maintenance.",
    gradient: "from-indigo-500 to-purple-500",
    bgGradient: "from-indigo-500/10 to-purple-500/10",
    borderColor: "border-indigo-500/30",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description:
      "Built for local discovery. Get found when people search 'personal trainer near me' in your area. Professional SEO optimization helps you rank and attract local clients.",
    gradient: "from-teal-500 to-blue-500",
    bgGradient: "from-teal-500/10 to-blue-500/10",
    borderColor: "border-teal-500/30",
  },
  {
    icon: Wand2,
    title: "AI Website Editor",
    description:
      "Update your website anytime with our built-in AI editor. Make content changes without any technical knowledge—just tell the AI what you want, and it happens instantly.",
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/10 to-rose-500/10",
    borderColor: "border-pink-500/30",
  },
  {
    icon: Rocket,
    title: "7-Day Turnaround",
    description:
      "Time is money in the fitness game. We get you live in 7 days or less so you can start attracting clients immediately. No delays, no excuses.",
    gradient: "from-red-500 to-orange-500",
    bgGradient: "from-red-500/10 to-orange-500/10",
    borderColor: "border-red-500/30",
  },
]

export function BenefitsSection() {
  // Duplicate benefits multiple times for seamless infinite scroll (3 sets)
  const duplicatedBenefits = [...benefits, ...benefits, ...benefits]
  
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const isDraggingRef = useRef(false)
  const isPausedRef = useRef(false)

  // Handle mouse/touch start
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setIsPaused(true)
    isDraggingRef.current = true
    isPausedRef.current = true
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const rect = carouselRef.current.getBoundingClientRect()
    setStartX(clientX - rect.left)
    setScrollLeft(carouselRef.current.scrollLeft)
    carouselRef.current.style.cursor = 'grabbing'
  }

  // Handle mouse/touch move
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const rect = carouselRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const walk = (x - startX) * 2 // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  // Handle mouse/touch end
  const handleEnd = () => {
    setIsDragging(false)
    isDraggingRef.current = false
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab'
    }
    // Resume auto-scroll after a delay
    setTimeout(() => {
      setIsPaused(false)
      isPausedRef.current = false
    }, 2000)
  }

  // Auto-scroll and infinite loop handling
  useEffect(() => {
    if (!carouselRef.current) return

    const carousel = carouselRef.current
    
    // Calculate single set width dynamically
    const getSingleSetWidth = () => {
      if (!carousel) return 0
      const firstCard = carousel.querySelector('[data-card-index="0"]') as HTMLElement
      if (!firstCard) return 0
      const cardWidth = firstCard.offsetWidth
      const gap = 24 // gap-6 = 24px
      return benefits.length * (cardWidth + gap)
    }
    
    // Wait for cards to render, then calculate width
    const initializeScroll = () => {
      const singleSetWidth = getSingleSetWidth()
      if (singleSetWidth > 0) {
        // Initialize scroll position to the middle set (second set of benefits)
        if (carousel.scrollLeft === 0 || carousel.scrollLeft < singleSetWidth) {
          carousel.scrollLeft = singleSetWidth
        }
      }
    }
    
    // Small delay to ensure cards are rendered
    const initTimeout = setTimeout(initializeScroll, 100)

    // Auto-scroll interval
    let autoScrollInterval: NodeJS.Timeout | null = null

    if (!isPaused && !isDragging) {
      autoScrollInterval = setInterval(() => {
        if (carousel && !isDraggingRef.current && !isPausedRef.current) {
          const singleSetWidth = getSingleSetWidth()
          if (singleSetWidth > 0) {
            carousel.scrollLeft += 1
            
            // Reset to middle set when reaching the end of second set
            // This creates seamless infinite scroll
            if (carousel.scrollLeft >= singleSetWidth * 2 - 50) {
              carousel.scrollLeft = singleSetWidth
            }
          }
        }
      }, 30) // Smooth scroll speed
    }

    // Handle infinite loop on manual scroll - reset when reaching boundaries
    const handleScroll = () => {
      const singleSetWidth = getSingleSetWidth()
      if (singleSetWidth > 0) {
        // If scrolled past the second set, reset to middle (second set)
        if (carousel.scrollLeft >= singleSetWidth * 2 - 50) {
          carousel.scrollLeft = singleSetWidth
        }
        // If scrolled before the first set, reset to middle (second set)
        else if (carousel.scrollLeft <= 50) {
          carousel.scrollLeft = singleSetWidth
        }
      }
    }

    carousel.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      clearTimeout(initTimeout)
      if (autoScrollInterval) clearInterval(autoScrollInterval)
      carousel.removeEventListener('scroll', handleScroll)
    }
  }, [isDragging, isPaused])

  return (
    <section id="benefits" className="relative py-16 md:py-24 overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_var(--tw-gradient-stops))] from-accent/5 via-orange-500/3 to-red-500/5" />
      
      {/* Subtle animated gradient orbs */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent/20 via-orange-500/20 to-red-500/20 border border-accent/30 px-5 py-2 mb-6">
            <Sparkles className="h-3 w-3 text-accent animate-pulse" />
            <span className="text-xs font-black text-foreground uppercase tracking-wider">8 Powerful Features</span>
          </div>
          
          <h2 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
            <span className="block mb-2 bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <span className="block text-foreground text-2xl md:text-4xl lg:text-5xl">
              To Dominate Your Market
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground">
            Professional tools that work 24/7 to attract, convert, and grow your client base. Optimized for UK personal trainers in London, Manchester, Birmingham, Leeds, Liverpool, Bristol, Edinburgh, Glasgow, and across the United Kingdom.
          </p>
        </div>

        {/* Auto-Scrolling Carousel Container */}
        <div className="relative mb-12 overflow-hidden">
          {/* Gradient fade on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-background via-background/40 md:via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-background via-background/40 md:via-background/80 to-transparent z-10 pointer-events-none" />
          
          {/* Draggable Infinite Scrolling Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab select-none"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'auto',
            }}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          >
            {duplicatedBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              
              return (
                <Card
                  key={`${index}-${benefit.title}`}
                  data-card-index={index % benefits.length}
                  className={`relative flex-shrink-0 w-[320px] md:w-[380px] border-2 ${benefit.borderColor} bg-card/90 backdrop-blur-sm shadow-lg overflow-hidden`}
                >
                  <CardContent className="relative p-6 flex flex-col items-center text-center h-full">
                    {/* Icon */}
                    <div className={`mb-4 inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.gradient} shadow-lg`}>
                      <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="mb-3 text-lg md:text-xl font-black text-card-foreground">
                      {benefit.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-grow">
                      {benefit.description}
                    </p>
                    
                    {/* Feature number badge */}
                    <div className={`mt-4 w-10 h-10 rounded-full bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white text-sm font-black shadow-md`}>
                      {((index % benefits.length) + 1)}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Compact Bottom CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="relative inline-block w-full">
            {/* Glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-accent via-orange-500 to-red-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
            
            <div className="relative bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border-2 border-accent/30 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-base font-black text-foreground">All Features Included</span>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              
              <p className="text-xl md:text-2xl font-black text-foreground mb-2">
                Ready to Get Started?
              </p>
              <p className="text-sm md:text-base text-muted-foreground mb-6">
                Get all 8 features for just £7.99/month. Live in 7 days. Cancel anytime.
              </p>
              
              <Button
                size="lg"
                className="h-12 px-6 bg-gradient-to-r from-accent via-orange-500 to-red-500 text-base font-black text-white hover:scale-105 shadow-lg transition-all"
                onClick={() => {
                  const ctaSection = document.getElementById("cta")
                  if (ctaSection) {
                    ctaSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Start for £7.99/Month
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
