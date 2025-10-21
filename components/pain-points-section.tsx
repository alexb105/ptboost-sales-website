"use client"

import { X, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const painPoints = [
  {
    problem: "You're stuck in DM prison",
    reality: "Hours spent cold messaging local leads, chasing replies, getting ghosted. Zero automation.",
    solution: "Your website works 24/7 — capturing interested local clients with a contact form while you train or sleep."
  },
  {
    problem: "You look amateur without a professional site",
    reality: "Linktree + Google Forms + scattered socials = unprofessional. Local clients can't figure out your offer or how to train with you.",
    solution: "One clean, professional site showcasing your packages, results, and an easy contact form. Instant credibility."
  },
  {
    problem: "You're relying 100% on social media",
    reality: "Algorithm tanks your reach? Your leads disappear. One shadowban = zero new clients walking through your door.",
    solution: "Own your presence. A professional website means people can find and contact you even if Instagram dies tomorrow."
  },
  {
    problem: "You're invisible on Google",
    reality: "People in your area search 'personal trainer near me' and find everyone but you. No website = no local discovery.",
    solution: "A professional website gets you found locally on Google, bringing in clients who are actively looking for a trainer in your area."
  },
  {
    problem: "Interested clients slip away",
    reality: "People find you on Instagram but messaging feels awkward. They hesitate, scroll past, and book with someone else.",
    solution: "A simple contact form makes it easy for them to reach out. Collect their details, follow up, and get them training."
  },
  {
    problem: "You can't charge what you're worth",
    reality: "Without a professional site showing your expertise and client results, people assume you're just starting out and lowball you.",
    solution: "A polished website showcasing testimonials, transformations, and clear packages positions you as the premium choice."
  }
]

export function PainPointsSection() {
  const scrollToProcess = () => {
    const processSection = document.getElementById("process")
    if (processSection) {
      processSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="pain-points" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-red-500/5 to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent" />
      <div className="absolute top-20 right-10 h-96 w-96 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 blur-3xl animate-pulse" />
      
      <div className="container mx-auto relative z-10 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/30 px-6 py-2 mb-6">
              <X className="h-4 w-4 text-red-500" />
              <span className="text-sm font-bold text-foreground">The Real Problem</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
              Why You're Not Getting
              <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-accent bg-clip-text text-transparent">
                Consistent Clients
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              It's not your training skills. It's not your content. 
              <span className="font-bold text-foreground"> You just need a professional online presence.</span>
            </p>
          </div>

          {/* Pain Points Grid */}
          <div className="space-y-6 mb-16">
            {painPoints.map((item, index) => (
              <div key={index} className="group">
                <div className="relative p-8 rounded-2xl bg-card border-2 border-border hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  {/* Problem Badge */}
                  <div className="flex items-start gap-6 mb-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border-2 border-red-500/30 group-hover:bg-red-500/20 transition-colors">
                      <X className="h-6 w-6 text-red-500 stroke-[3]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-foreground mb-2 group-hover:text-red-500 transition-colors">
                        {item.problem}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed mb-4">
                        {item.reality}
                      </p>
                    </div>
                  </div>
                  
                  {/* Solution */}
                  <div className="pl-[72px]">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/5 border border-green-500/30">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-foreground leading-relaxed">
                        <span className="text-green-600 dark:text-green-400">The Fix: </span>
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA - Story Driven */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-6 p-8 rounded-2xl bg-gradient-to-br from-accent/10 via-orange-500/10 to-red-500/10 border-2 border-accent/30 backdrop-blur-sm max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                  Here's the Good News...
                </h3>
                <p className="text-xl md:text-2xl text-foreground font-bold mb-4">
                  The fix is as simple as <span className="bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent">1, 2, 3.</span>
                </p>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  You don't need to hire an expensive agency (£2,000+). You don't need to learn web design. 
                  You don't need to spend weeks figuring this out. 
                  <span className="block mt-3 text-foreground font-semibold">
                    Get a professional website for just £59 (launch special pricing), and you'll be live in 7 days.
                  </span>
                </p>
              </div>
              
              <div className="relative inline-block group">
                <div className="absolute -inset-3 bg-gradient-to-r from-accent via-orange-500 to-red-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 animate-pulse"></div>
                <Button
                  size="lg"
                  className="relative h-16 px-12 bg-gradient-to-r from-accent via-orange-500 to-red-500 text-xl md:text-2xl font-black text-white hover:scale-105 shadow-2xl transition-all border-4 border-white/40"
                  onClick={scrollToProcess}
                >
                  See How It Works
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                ⚡ £59 launch pricing • 🚀 Live in 7 days • ✅ Money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

