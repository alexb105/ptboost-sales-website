"use client"

import { ArrowRight, X, Check } from "lucide-react"

export default function InstagramAd2() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      {/* Instagram Post Container - Square format 1080x1080 */}
      <div className="w-full max-w-[1080px] aspect-square bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 rounded-lg overflow-hidden shadow-2xl relative">
        
        {/* Diagonal Split Design */}
        <div className="absolute inset-0">
          {/* Top Half - Dark */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
          
          {/* Bottom Half - Orange gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-br from-orange-500 to-orange-600" />
          
          {/* Diagonal divider with glow */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-orange-500 to-orange-600" 
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 55%)'
            }}
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
          
          {/* Top Section - Problem/Hook */}
          <div className="text-left">
            {/* X Icon for "Stop" concept */}
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500 border-4 border-white shadow-2xl">
              <X className="h-10 w-10 text-white stroke-[3]" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Stop Chasing DMs.
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-orange-300">
              Start Booking Clients.
            </p>
          </div>

          {/* Middle Section - Value Prop */}
          <div className="text-center space-y-4">
            <div className="inline-block bg-white/95 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-2xl border-4 border-gray-900">
              <p className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                Done-For-You PT Website
              </p>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-black text-orange-600">7</p>
                  <p className="text-sm font-bold text-gray-600">DAYS</p>
                </div>
                <div className="h-12 w-1 bg-gray-300" />
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-black text-orange-600">£7.99</p>
                  <p className="text-sm font-bold text-gray-600">/MONTH</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Benefits + CTA */}
          <div className="space-y-6">
            {/* Benefits List */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 flex-shrink-0">
                  <Check className="h-5 w-5 text-white stroke-[3]" />
                </div>
                <span className="text-lg md:text-xl font-black text-gray-900">Automatic Lead Capture</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 flex-shrink-0">
                  <Check className="h-5 w-5 text-white stroke-[3]" />
                </div>
                <span className="text-lg md:text-xl font-black text-gray-900">Professional Design</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 flex-shrink-0">
                  <Check className="h-5 w-5 text-white stroke-[3]" />
                </div>
                <span className="text-lg md:text-xl font-black text-gray-900">No Tech Skills Needed</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-center gap-4 bg-gray-900 rounded-full px-8 py-5 shadow-2xl border-4 border-white">
              <span className="text-2xl md:text-3xl font-black text-white">
                Link in Bio
              </span>
              <ArrowRight className="h-8 w-8 text-orange-400" />
            </div>

            {/* Footer */}
            <p className="text-center text-base md:text-lg font-black text-white">
              PTBoost.co.uk • For UK Personal Trainers
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

