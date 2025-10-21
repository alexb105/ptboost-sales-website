"use client"

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'process', label: 'Process' },
    { id: 'showcase', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
    { id: 'cta', label: 'Get Started' },
  ]

  return (
    <footer className="relative border-t border-accent/20 bg-gradient-to-b from-zinc-950 to-black py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl w-full">
          {/* Main Content */}
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            {/* Brand */}
            <div className="flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent mb-3">
                PTBoost
              </h3>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                High-converting websites for trainers who are ready to scale.
              </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 w-full">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="group relative text-sm md:text-base font-semibold text-gray-400 transition-all duration-300 hover:text-white hover:scale-105"
                >
                  {section.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-orange-500 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Contact Information */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-orange-500/10 border border-accent/30 max-w-md w-full">
              <p className="text-sm font-bold text-white mb-3">Questions Before You Buy?</p>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  📧 Email: <a href="mailto:your@email.com" className="text-accent hover:underline font-semibold">your@email.com</a>
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  I typically respond within 24 hours. Happy to answer anything!
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full border-t border-accent/20" />
            </div>
            <div className="relative flex justify-center items-center">
              <div className="h-1 w-20 rounded-full bg-gradient-to-r from-accent via-orange-500 to-red-500" />
            </div>
          </div>

          {/* Copyright & Trust */}
          <div className="flex flex-col items-center text-center w-full gap-3">
            <p className="text-xs md:text-sm text-gray-500">
              © {new Date().getFullYear()} PTBoost. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              🔒 Secure payments via Stripe • 💯 100% Money-Back Guarantee • 🚀 38 spots left at £39
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
