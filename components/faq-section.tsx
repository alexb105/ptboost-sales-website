"use client"

import { Check, Plus, Minus, ArrowRight } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "Why is it only £7.99/month? What's the catch?",
    answer: "No catch. It's launch pricing. You get everything for £7.99/month — website, hosting, maintenance, and updates. Your price is locked for as long as you stay subscribed. Cancel anytime."
  },
  {
    question: "What if I don't like the design?",
    answer: "We'll revise it together. If you're not happy after reasonable revisions, you can request a full refund within 30 days of delivery."
  },
  {
    question: "Can I edit the website myself later?",
    answer: "Yes. The built-in AI editor lets you update text, images, and prices in seconds. No coding. For bigger changes, I can help for a small fee."
  },
  {
    question: "Is hosting really included?",
    answer: "Yes. Hosting, maintenance, and updates are included in £7.99/month. Fast, secure, and reliable."
  },
  {
    question: "How long does it actually take?",
    answer: "7 days from when I get your content. Often sooner. I’ll guide you if you need help."
  },
  {
    question: "Do I need to provide all the content and photos?",
    answer: "Your photos and story work best. If you're stuck, I’ll help with copy and can suggest stock images."
  },
  {
    question: "What if I don't have a domain name?",
    answer: "No problem. I’ll help you choose and set it up (domains are usually £10–15/year). We can launch on a subdomain first."
  },
  {
    question: "Will this actually help me get more clients?",
    answer: "A website won’t replace marketing. But when people find you, a professional site increases trust and conversions."
  },
  {
    question: "What makes this different from a template?",
    answer: "No templates. Your site is custom to your brand, colours, and style."
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes. You have 30 days after delivery to request a full refund if you're not satisfied. See Terms & Conditions for details."
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

