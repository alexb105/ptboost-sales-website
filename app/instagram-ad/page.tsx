"use client"

import { ArrowRight, Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InstagramAd() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      {/* Instagram Post Container - Square format 1080x1080 */}
      <div className="w-full max-w-[1080px] aspect-square bg-white rounded-lg overflow-hidden shadow-2xl relative">
        {/* Background Image from Unsplash */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1080&h=1080&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/85" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
          {/* Logo */}
          <div className="flex justify-start">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 shadow-xl border-2 border-white/40">
                <Zap className="h-7 w-7 text-white fill-white" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                PTBoost
              </span>
            </div>
          </div>

          {/* Main Content - Center */}
          <div className="text-center">
            {/* Main Headline with background */}
            <div className="mb-6 inline-block px-8 py-6 rounded-3xl bg-black/70 backdrop-blur-sm border-2 border-white/20">
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1]">
                <span className="block mb-3 text-white" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8)' }}>
                  Train Clients.
                </span>
                <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  We'll Handle
                </span>
                <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  Everything Else.
                </span>
              </h1>
            </div>

            {/* Caption with background */}
            <div className="space-y-3 mb-8 max-w-2xl mx-auto px-6 py-5 rounded-2xl bg-black/70 backdrop-blur-sm border-2 border-white/20">
              <p className="text-xl md:text-2xl font-bold text-white leading-relaxed" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.7)' }}>
                Get your <span className="text-orange-400 font-black">done-for-you</span> personal trainer website — <span className="text-orange-400 font-black">live in 7 days</span>.
              </p>
              <p className="text-lg md:text-xl font-bold text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.7)' }}>
                Built, hosted, and managed for just <span className="text-orange-400 font-black text-xl md:text-2xl">£7.99/month</span>.
              </p>
              <p className="text-lg md:text-xl font-bold text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.7)' }}>
                Spend more time doing what you love — <span className="text-orange-400 font-black">we'll take care of the rest</span>.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            {/* Price Highlight */}
            <div className="mb-4">
              <div className="inline-block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 shadow-2xl border-4 border-white/30">
                <p className="text-white text-lg md:text-xl font-black mb-2">
                  <span className="line-through opacity-75">£7.99/mo</span>
                </p>
                <p className="text-white text-4xl md:text-5xl font-black mb-2">
                  FREE
                </p>
                <p className="text-white text-base md:text-lg font-bold">
                  for 1 month
                </p>
              </div>
            </div>

            {/* CTA Button Mockup */}
            <div className="flex items-center justify-center gap-3 bg-white rounded-full px-8 py-4 shadow-2xl max-w-md mx-auto hover:scale-105 transition-transform">
              <Zap className="h-6 w-6 text-orange-600 fill-orange-600" />
              <span className="text-xl md:text-2xl font-black text-gray-900">
                Link in Bio
              </span>
              <ArrowRight className="h-6 w-6 text-orange-600" />
            </div>

            {/* Footer text */}
            <p className="mt-4 text-sm md:text-base font-bold text-white px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 inline-block" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
              🎯 PTBoost.co.uk • For UK Personal Trainers
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


