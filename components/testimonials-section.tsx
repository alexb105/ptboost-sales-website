import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Tom R.",
    role: "Personal Trainer, London",
    content:
      "I was skeptical at first because of the price, but the site he built me looks completely professional. Already got 2 enquiries in the first week. Worth every penny.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    role: "Online Coach, Manchester",
    content:
      "Really impressed with the turnaround time and the final product. It's exactly what I needed to look more professional and stop relying only on Instagram. Communication was great throughout.",
    rating: 5,
  },
  {
    name: "James K.",
    role: "Strength Coach, Birmingham",
    content:
      "Took a chance on the £39 offer and I'm glad I did. The website actually looks better than some trainers charging £200+ per session. Already recommended to 2 other trainers.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-gradient-to-b from-secondary to-background py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-16">
          <h2 className="mb-4 text-balance font-sans text-3xl font-black tracking-tight text-foreground md:text-5xl">
            What Clients Are Saying
          </h2>
          <p className="text-pretty text-lg text-muted-foreground md:text-xl">
            Real feedback from trainers who've already launched
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 border-accent/20 bg-card shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="mb-4 flex gap-1 justify-center">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>

                <p className="mb-6 leading-relaxed text-card-foreground text-base">"{testimonial.content}"</p>

                <div className="border-t border-accent/20 pt-4">
                  <p className="font-bold text-card-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground font-medium">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
