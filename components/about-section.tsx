export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Trust badges row */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-medium">Professional Developer</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">Trusted by PTs Nationwide</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-medium">7-Day Money-Back Guarantee</span>
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-balance text-center font-sans text-3xl font-black tracking-tight text-foreground md:text-5xl">
            Built for Personal Trainers
          </h2>
          <p className="text-center text-accent font-semibold text-lg mb-12">
            By a developer who understands your business
          </p>

          {/* Main content grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left column - Story */}
            <div className="space-y-6 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">The Problem I Noticed</h3>
                    <p>
                      I'm a web developer who specializes in high-converting websites. After working with businesses across different industries, 
                      I noticed personal trainers face a unique challenge:
                    </p>
                  </div>
                </div>
                <div className="pl-16">
                  <p className="font-bold text-foreground text-lg">
                    ❌ You need a professional online presence, but agencies charge £2,000-5,000
                  </p>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">My Solution</h3>
                    <p className="mb-3">
                      Most PTs can't justify spending thousands when you're just starting to scale. But without one, 
                      you're stuck competing on Instagram where the algorithm controls your business.
                    </p>
                    <p className="font-bold text-foreground text-lg">
                      ✅ That's why I'm offering professional websites for just <span className="text-accent">£7.99/month</span> — limited time launch pricing
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Stats and proof */}
            <div className="space-y-6">
              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-accent/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-accent/30 text-center">
                  <div className="text-4xl font-black text-accent mb-2">£7.99</div>
                  <div className="text-sm font-semibold text-foreground">Launch Price</div>
                  <div className="text-xs text-muted-foreground mt-1">(Per Month)</div>
                </div>
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/30 text-center">
                  <div className="text-4xl font-black text-red-500 mb-2">£14.99</div>
                  <div className="text-sm font-semibold text-foreground">Regular Price</div>
                  <div className="text-xs text-muted-foreground mt-1">(Per Month)</div>
                </div>
              </div>

              {/* Value comparison */}
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
                <h4 className="text-lg font-bold text-foreground mb-4 text-center">Affordable & Flexible</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-border/50">
                    <span className="text-muted-foreground line-through">Agency Upfront:</span>
                    <span className="font-bold text-muted-foreground line-through">£2,000-5,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-semibold">Your Monthly:</span>
                    <span className="font-black text-2xl text-accent">£7.99</span>
                  </div>
                </div>
              </div>

              {/* Why this price */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Why So Affordable?
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>Building portfolio in fitness niche</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>Streamlined process = lower costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>Want to help PTs succeed online</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Urgency banner */}
          <div className="mb-8 text-center px-4">
            <p className="text-lg md:text-2xl font-bold text-foreground bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent inline-block animate-pulse">
              ⚡ Lock in £7.99/month before rates increase. This introductory pricing won't last forever.
            </p>
          </div>

          {/* Money-back guarantee - prominent */}
          <div className="bg-gradient-to-br from-accent/10 via-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-accent/40 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black text-foreground mb-2">
                  🤝 My 7-Day Money-Back Guarantee
                </h3>
                <p className="text-base text-foreground font-semibold leading-relaxed">
                  I build every site to turn your visitors into paying clients. When I hand over your finished website, 
                  you get <span className="text-accent font-black">7 days</span> to live with it, test it, show it to people. 
                  If you're not thrilled? I'll refund every penny. Simple as that.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  (Full details in{" "}
                  <a href="/terms" className="text-accent hover:underline font-semibold">Terms & Conditions</a>)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
