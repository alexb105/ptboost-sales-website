import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PainPointsSection } from "@/components/pain-points-section"
import { ProcessSection } from "@/components/process-section"
import { WebsiteShowcaseSection } from "@/components/website-showcase-section"
import { AIEditorSection } from "@/components/ai-editor-section"
import { AboutSection } from "@/components/about-section"
import { BenefitsSection } from "@/components/benefits-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { SEOContent } from "@/components/seo-content"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SEOContent />
      <PainPointsSection />
      <ProcessSection />
      <WebsiteShowcaseSection />
      <AIEditorSection />
      <AboutSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  )
}
