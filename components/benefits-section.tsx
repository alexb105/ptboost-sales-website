import { Rocket, Brain, Smartphone, Users, Zap, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: Brain,
    title: "Psychology-Driven Design",
    description:
      "Every element is strategically placed using proven psychology techniques. Your site doesn't just look good—it's engineered to convert visitors into paying clients.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Perfection",
    description:
      "Your clients are on their phones 24/7. Your website will look stunning and perform flawlessly on phones, tablets, and desktop. Zero compromises.",
  },
  {
    icon: Users,
    title: "Build Your Customer Base",
    description:
      "Collect customer details with ease using smart lead capture systems. Never miss a potential client again—every visitor is an opportunity.",
  },
  {
    icon: Zap,
    title: "Lightning-Fast & Secure",
    description:
      "Built with cutting-edge web technologies that load instantly on any device or browser. Fast sites = better rankings = more clients.",
  },
  {
    icon: Shield,
    title: "Free Hosting Forever",
    description:
      "No monthly fees, no surprise bills. Your website is hosted on enterprise-grade servers with bulletproof security. Set it and forget it.",
  },
  {
    icon: Rocket,
    title: "7-Day Turnaround",
    description:
      "Time is money in the fitness game. We get you live in 7 days or less so you can start attracting clients immediately. No delays, no excuses.",
  },
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto mb-16 max-w-6xl">
          <h2 className="mb-4 text-balance font-sans text-3xl font-black tracking-tight text-foreground md:text-5xl">
            Why Trainers Choose Us
          </h2>
          <p className="text-pretty text-lg text-muted-foreground md:text-xl">
            Everything you need to dominate your local market and scale fast
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card key={index} className="border-2 border-accent/20 bg-card shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] hover:border-accent/40 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent via-orange-500 to-red-500 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-lg font-black text-card-foreground">{benefit.title}</h3>
                  <p className="leading-relaxed text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
