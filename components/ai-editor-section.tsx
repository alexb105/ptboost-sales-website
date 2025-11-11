"use client"

import { Sparkles, Wand2, FileEdit, Zap, Check, Brain, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AIEditorSection() {
  return (
    <section id="ai-editor" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-purple-500/5 to-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto relative z-10 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 px-6 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-bold text-foreground">AI-Powered Technology</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
              Update Your Website Anytime
              <span className="block bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                With Our AI Editor
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              No developer needed. No coding required. Just tell our AI what you want to change, and it happens instantly.
              <span className="block mt-2 font-semibold text-foreground">Your website, your control — made easy.</span>
            </p>
          </div>

          {/* Main Feature Showcase */}
          <div className="mb-16">
            <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-card to-purple-500/5 shadow-2xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Side - Visual/Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
                    <div className="relative bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-8 md:p-12 flex items-center justify-center">
                      <div className="relative">
                        <Wand2 className="h-32 w-32 md:h-40 md:w-40 text-white animate-pulse" />
                        <Sparkles className="absolute -top-4 -right-4 h-12 w-12 text-yellow-300 animate-bounce" />
                        <Sparkles className="absolute -bottom-2 -left-2 h-8 w-8 text-yellow-300 animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div>
                    <h3 className="text-3xl font-black text-foreground mb-4">
                      Say Goodbye to Developer Fees
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      Want to update your pricing? Change a photo? Add a new testimonial? Do it yourself in seconds with our revolutionary AI-powered editor.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <span className="font-bold text-foreground">Simple natural language commands</span>
                          <p className="text-sm text-muted-foreground">Just type what you want: "Change my bio" or "Update my prices"</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <span className="font-bold text-foreground">Instant live preview</span>
                          <p className="text-sm text-muted-foreground">See changes before you publish — no guesswork</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <span className="font-bold text-foreground">Zero technical knowledge needed</span>
                          <p className="text-sm text-muted-foreground">If you can send a text message, you can update your site</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="border-2 border-purple-500/20 bg-card shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] hover:border-purple-500/40 group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 group-hover:scale-110 transition-transform">
                  <FileEdit className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-lg font-black text-card-foreground">Edit Anything</h3>
                <p className="leading-relaxed text-muted-foreground text-sm">
                  Text, images, prices, testimonials — everything is editable. Your website grows with your business.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 border-blue-500/20 bg-card shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] hover:border-blue-500/40 group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 group-hover:scale-110 transition-transform">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-lg font-black text-card-foreground">Lightning Fast</h3>
                <p className="leading-relaxed text-muted-foreground text-sm">
                  Changes go live in seconds, not days. No waiting around for developers to get back to you.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 border-indigo-500/20 bg-card shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] hover:border-indigo-500/40 group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 group-hover:scale-110 transition-transform">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-lg font-black text-card-foreground">AI-Powered</h3>
                <p className="leading-relaxed text-muted-foreground text-sm">
                  Our AI understands what you want and ensures your changes look professional every time.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-block rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-2 border-purple-500/30 p-8 max-w-3xl">
              <p className="text-2xl md:text-3xl font-black text-foreground mb-3">
                Total Control, Zero Hassle
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                This isn't just a website — it's a powerful tool you can control and customize whenever you need. 
                <span className="block mt-2 font-semibold text-foreground">No extra fees for updates. No begging developers for changes. Just pure freedom.</span>
              </p>

              {/* CTA Button */}
              <div className="relative inline-block group">
                <div className="absolute -inset-3 bg-gradient-to-r from-accent via-orange-500 to-red-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 animate-pulse"></div>
                <Button
                  size="lg"
                  className="relative h-14 md:h-16 px-6 md:px-12 bg-gradient-to-r from-accent via-orange-500 to-red-500 text-base md:text-xl font-black text-white hover:scale-105 shadow-2xl transition-all border-2 border-white/30"
                  onClick={() => {
                    const ctaSection = document.getElementById("cta")
                    if (ctaSection) {
                      ctaSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  <Sparkles className="mr-1 md:mr-2 h-5 w-5 md:h-6 md:w-6 animate-pulse flex-shrink-0" />
                  <span className="md:hidden">Get Started</span>
                  <span className="hidden md:inline whitespace-nowrap">Start free for 1 month</span>
                  <ArrowRight className="ml-1 md:ml-2 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </Button>
              </div>
              
              <p className="mt-4 text-xs md:text-sm font-bold text-muted-foreground px-4">
                ⚡ 1‑Month Free Trial • Includes AI Editor • Free Hosting • 7-Day Launch
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

