"use client"

import { Check, Plus, Minus, ArrowRight } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "Why is it only £7.99/month? What's the catch?",
    answer: "There's no catch. This is a launch special to help trainers who can't afford expensive agency prices (£2,000+ upfront) but need a professional online presence. At £7.99/month, you get everything - website, hosting, maintenance, and updates. This introductory rate locks in your price forever, even when it increases for new subscribers. Cancel anytime, no contracts."
  },
  {
    question: "What if I don't like the design?",
    answer: "You won't pay a penny until you're happy. I'll work with you through revisions until you love it. If after reasonable revisions you're still not satisfied, you get a full refund. I only succeed when you're thrilled with your site."
  },
  {
    question: "Can I edit the website myself later?",
    answer: "Absolutely! You'll get access to our AI-powered editor that lets you update text, images, prices, and content in seconds — no coding required. Just tell the AI what you want to change in plain English, and it happens instantly. For major redesigns, I'm happy to help (small fee may apply). But for day-to-day updates, you have total control with zero developer fees."
  },
  {
    question: "Is hosting really included?",
    answer: "Yes. Your site will be hosted on enterprise-grade servers (Vercel/Netlify) with excellent uptime and security. Hosting, maintenance, and ongoing updates are all included in your £7.99/month subscription. If your site grows massively and needs more resources, I'll let you know, but for 99% of PTs, the base subscription covers everything."
  },
  {
    question: "How long does it actually take?",
    answer: "Usually 5-7 days from when I receive your content (photos, bio, pricing, etc). If you're ready with everything, I can often have you live even faster. If you need help creating content, I'll guide you through it - might add a day or two."
  },
  {
    question: "Do I need to provide all the content and photos?",
    answer: "Ideally yes - your own photos and story make the best websites. But if you're stuck, I'll help you with copywriting guidance and can suggest stock photos. The more 'you' we can make it, the better it will perform."
  },
  {
    question: "What if I don't have a domain name?",
    answer: "No problem! I can help you choose and set up a domain (you'll need to purchase it - usually £10-15/year). Or if you prefer, I can launch your site on a free subdomain to start (like yourname.vercel.app) and we can add a custom domain later."
  },
  {
    question: "Will this actually help me get more clients?",
    answer: "A website alone won't magically bring clients - you still need to drive people to it (Instagram, local SEO, word of mouth, etc). BUT, once people find you, a professional website dramatically increases trust and conversions compared to just a Linktree or Instagram profile. It's a tool, not a magic bullet."
  },
  {
    question: "What makes this different from a template?",
    answer: "Templates are generic - same layout as thousands of other sites. I build each site custom for your brand, your colors, your personality. No two sites look the same. It's the difference between buying a suit off the rack vs getting one tailored to fit you perfectly."
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes! You have 7 days after delivery to review your completed website. If you're not satisfied, you can request a full refund within that window. Additionally, if any serious technical issues arise that prevent basic website functionality and can't be fixed within 30 days, you're also covered. Full details in our Terms & Conditions."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-accent/5 to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      
      <div className="container mx-auto relative z-10 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/30 px-6 py-2 mb-6">
              <Check className="h-4 w-4 text-accent" />
              <span className="text-sm font-bold text-foreground">Got Questions?</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about the beta offer. Still have questions? 
              <a href="mailto:ptboost.info@gmail.com" className="text-accent font-semibold hover:underline ml-1">Just ask.</a>
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="group rounded-2xl bg-card border-2 border-border hover:border-accent/50 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-start justify-between gap-4 p-6 text-left transition-all"
                >
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {openIndex === index ? (
                      <Minus className="h-6 w-6 text-accent transition-transform" />
                    ) : (
                      <Plus className="h-6 w-6 text-muted-foreground group-hover:text-accent transition-colors" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 animate-in slide-in-from-top-2">
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-base text-muted-foreground leading-relaxed mt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600 stroke-[3]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground">
                Ready to Make This Happen?
              </h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Lock in your £7.99/month rate before the price increases for new subscribers.
            </p>
            <button 
              onClick={() => {
                const ctaSection = document.getElementById('cta');
                if (ctaSection) {
                  ctaSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-4 bg-gradient-to-r from-accent via-orange-500 to-red-500 text-white text-base md:text-lg font-bold rounded-full hover:scale-105 transition-all shadow-xl"
            >
              <span className="md:hidden">Get Started</span>
              <span className="hidden md:inline whitespace-nowrap">Start for £7.99/Month</span>
              <ArrowRight className="h-5 w-5 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

