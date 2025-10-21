"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Zap } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsMenuOpen(false)
    }
  }

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-accent via-orange-500 to-red-500 shadow-lg">
              <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent">
              PTBoost
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("cta")}
              className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors"
            >
              Testimonials
            </button>
            <Button
              onClick={scrollToForm}
              className="bg-gradient-to-r from-accent via-orange-500 to-red-500 text-white font-bold hover:scale-105 transition-transform shadow-lg"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40 animate-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-left px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection("process")}
                className="text-left px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection("cta")}
                className="text-left px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-left px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
              >
                Testimonials
              </button>
              <Button
                onClick={scrollToForm}
                className="bg-gradient-to-r from-accent via-orange-500 to-red-500 text-white font-bold shadow-lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

