"use client"

import { ArrowRight, X, Check, Zap, Target, Clock, Users, Shield, Sparkles, Star } from "lucide-react"
import Image from "next/image"

export default function InstagramAdsGallery() {
  const ads = [
    // AD 1: Bold Statement - Dark Background
    {
      id: 1,
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
      content: (
        <>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Zap className="h-7 w-7 text-white fill-white" />
              </div>
              <span className="text-3xl font-black text-orange-400">PTBoost</span>
            </div>
            
            <div className="text-center">
              <h1 className="text-7xl font-black text-white mb-6 leading-tight">
                Your Competition<br/>
                <span className="text-orange-400">Has a Website.</span>
              </h1>
              <p className="text-3xl font-bold text-white/90 mb-8">You don't. Fix that in 7 days.</p>
              <div className="inline-block bg-orange-500 px-12 py-5 rounded-full">
                <p className="text-2xl font-black text-white">£7.99/month • Link in Bio</p>
              </div>
            </div>
            
            <p className="text-center text-lg font-bold text-white/80">PTBoost.co.uk • For UK PTs</p>
          </div>
        </>
      )
    },

    // AD 2: Photo Background - Gym Aesthetic
    {
      id: 2,
      bg: "bg-black",
      content: (
        <>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1080&h=1080&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <div className="inline-flex items-center gap-2 bg-red-600 px-6 py-3 rounded-full self-start">
              <X className="h-6 w-6 text-white stroke-[3]" />
              <span className="text-xl font-black text-white">STOP</span>
            </div>
            
            <div>
              <div className="bg-black/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-orange-400 mb-6">
                <h1 className="text-6xl font-black text-white mb-4">
                  Stop Chasing<br/>
                  <span className="text-orange-400">DMs For Clients</span>
                </h1>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl">
                <p className="text-2xl font-black text-gray-900 mb-3">Get a Professional Website</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="text-5xl font-black text-orange-600">7</p>
                    <p className="text-sm font-bold text-gray-600">DAYS</p>
                  </div>
                  <div className="h-12 w-1 bg-gray-300" />
                  <div className="text-center">
                    <p className="text-5xl font-black text-orange-600">£7.99</p>
                    <p className="text-sm font-bold text-gray-600">/MO</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 bg-white rounded-full px-8 py-4 shadow-2xl">
              <span className="text-2xl font-black text-gray-900">Link in Bio</span>
              <ArrowRight className="h-7 w-7 text-orange-600" />
            </div>
          </div>
        </>
      )
    },

    // AD 3: Minimal Typography
    {
      id: 3,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12">
            <div className="flex justify-between items-start">
              <div className="text-sm font-black text-orange-600">PTBOOST</div>
              <div className="text-sm font-black text-gray-400">01/20</div>
            </div>
            
            <div className="space-y-8">
              <h1 className="text-8xl font-black text-gray-900 leading-none">
                YOU<br/>
                TRAIN.<br/>
                <span className="text-orange-600">WE</span><br/>
                <span className="text-orange-600">BUILD.</span>
              </h1>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <p className="text-xl font-bold text-gray-700">Done-for-you website</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <p className="text-xl font-bold text-gray-700">Live in 7 days</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <p className="text-xl font-bold text-gray-700">£7.99/month</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 px-8 py-5 rounded-full text-center">
              <p className="text-2xl font-black text-white">START TODAY →</p>
            </div>
          </div>
        </>
      )
    },

    // AD 4: Split Screen Design
    {
      id: 4,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full flex">
            {/* Left Side - Orange */}
            <div className="w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 p-10 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <X className="h-10 w-10 text-orange-600 stroke-[3]" />
                </div>
                <h2 className="text-5xl font-black text-white leading-tight">
                  LOOKS<br/>AMATEUR
                </h2>
                <p className="text-xl font-bold text-white/90">Chasing DMs</p>
                <p className="text-xl font-bold text-white/90">No credibility</p>
                <p className="text-xl font-bold text-white/90">Lost clients</p>
              </div>
            </div>
            
            {/* Right Side - Dark */}
            <div className="w-1/2 bg-gray-900 p-10 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Check className="h-10 w-10 text-white stroke-[3]" />
                </div>
                <h2 className="text-5xl font-black text-white leading-tight">
                  LOOKS<br/>
                  <span className="text-orange-400">PRO</span>
                </h2>
                <p className="text-xl font-bold text-white">Auto lead capture</p>
                <p className="text-xl font-bold text-white">Professional site</p>
                <p className="text-xl font-bold text-white">Book clients 24/7</p>
              </div>
            </div>
          </div>
          
          {/* Bottom CTA Strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-white px-10 py-6 flex items-center justify-between">
            <p className="text-2xl font-black text-gray-900">£7.99/mo • 7 days</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-orange-600">LINK IN BIO</span>
              <ArrowRight className="h-7 w-7 text-orange-600" />
            </div>
          </div>
        </>
      )
    },

    // AD 5: Bold Numbers Focus
    {
      id: 5,
      bg: "bg-gradient-to-br from-orange-600 via-orange-500 to-red-500",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12">
            <div className="text-white text-lg font-black">PTBOOST</div>
            
            <div className="text-center space-y-6">
              <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl">
                <p className="text-9xl font-black text-gray-900 mb-2">7</p>
                <p className="text-3xl font-black text-gray-900">DAYS TO LIVE</p>
              </div>
              
              <div className="bg-gray-900/95 backdrop-blur-sm p-10 rounded-3xl">
                <p className="text-9xl font-black text-orange-400 mb-2">£8</p>
                <p className="text-3xl font-black text-white">PER MONTH</p>
              </div>
              
              <p className="text-2xl font-black text-white">Done-For-You PT Website</p>
            </div>
            
            <div className="bg-white px-8 py-5 rounded-full text-center">
              <p className="text-2xl font-black text-gray-900">TAP TO START →</p>
            </div>
          </div>
        </>
      )
    },

    // AD 6: Photo Grid Style
    {
      id: 6,
      bg: "bg-gray-900",
      content: (
        <>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1080&h=1080&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
          
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <div className="flex items-center gap-3">
              <Zap className="h-10 w-10 text-orange-400 fill-orange-400" />
              <span className="text-3xl font-black text-white">PTBoost</span>
            </div>
            
            <div className="space-y-6">
              <div className="bg-orange-500 px-6 py-3 rounded-full inline-block">
                <p className="text-lg font-black text-white">FOR UK PERSONAL TRAINERS</p>
              </div>
              
              <h1 className="text-7xl font-black text-white leading-tight">
                Look Professional.<br/>
                Book More Clients.
              </h1>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/95 p-4 rounded-xl text-center">
                  <p className="text-3xl font-black text-orange-600">7</p>
                  <p className="text-xs font-bold text-gray-600">DAYS</p>
                </div>
                <div className="bg-white/95 p-4 rounded-xl text-center">
                  <p className="text-3xl font-black text-orange-600">£8</p>
                  <p className="text-xs font-bold text-gray-600">/MONTH</p>
                </div>
                <div className="bg-white/95 p-4 rounded-xl text-center">
                  <p className="text-3xl font-black text-orange-600">24/7</p>
                  <p className="text-xs font-bold text-gray-600">LEADS</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-white px-8 py-5 rounded-full">
                <span className="text-2xl font-black text-gray-900">Link in Bio</span>
                <ArrowRight className="h-7 w-7 text-orange-600" />
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 7: Question Hook
    {
      id: 7,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full flex flex-col justify-center p-12 space-y-10">
            <div className="space-y-6">
              <div className="text-6xl font-black text-gray-900 leading-tight">
                Still Using<br/>
                <span className="text-orange-600">Instagram DMs</span><br/>
                To Book Clients?
              </div>
              
              <div className="h-2 w-32 bg-orange-600" />
            </div>
            
            <div className="space-y-4">
              <p className="text-2xl font-bold text-gray-700">There's a better way.</p>
              
              <div className="bg-gray-900 p-8 rounded-2xl space-y-3">
                <p className="text-3xl font-black text-white">Done-For-You Website</p>
                <p className="text-xl font-bold text-orange-400">✓ Automatic lead capture</p>
                <p className="text-xl font-bold text-orange-400">✓ Live in 7 days</p>
                <p className="text-xl font-bold text-orange-400">✓ £7.99/month</p>
              </div>
            </div>
            
            <div className="bg-orange-600 px-8 py-5 rounded-full text-center">
              <p className="text-2xl font-black text-white">START TODAY</p>
            </div>
          </div>
        </>
      )
    },

    // AD 8: Testimonial Style
    {
      id: 8,
      bg: "bg-gradient-to-br from-gray-50 to-gray-100",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-orange-500 fill-orange-500" />
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="text-7xl font-black text-gray-900 leading-none">"</div>
              <p className="text-4xl font-bold text-gray-900 leading-tight">
                I went from chasing DMs to booking clients automatically.
              </p>
              <div className="space-y-2">
                <p className="text-xl font-black text-gray-900">— Sarah, London PT</p>
                <p className="text-lg font-bold text-gray-600">Live in 7 days • £7.99/month</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-orange-600 px-8 py-5 rounded-full text-center">
                <p className="text-2xl font-black text-white">GET YOUR WEBSITE</p>
              </div>
              <p className="text-center text-sm font-bold text-gray-600">PTBoost.co.uk</p>
            </div>
          </div>
        </>
      )
    },

    // AD 9: Stats Focus
    {
      id: 9,
      bg: "bg-gray-900",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-lg font-black text-white">LIVE NOW</span>
            </div>
            
            <div className="space-y-8">
              <h1 className="text-6xl font-black text-white leading-tight">
                The Average PT<br/>
                <span className="text-orange-400">Wastes 15hrs/week</span><br/>
                On Admin
              </h1>
              
              <div className="bg-white/95 p-8 rounded-2xl space-y-4">
                <p className="text-3xl font-black text-gray-900">We Fix That.</p>
                <div className="h-1 w-full bg-orange-500" />
                <p className="text-xl font-bold text-gray-700">Done-for-you website</p>
                <p className="text-xl font-bold text-gray-700">Automatic lead capture</p>
                <p className="text-xl font-bold text-gray-700">£7.99/month</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-orange-500 px-8 py-5 rounded-full">
              <span className="text-2xl font-black text-white">Link in Bio</span>
              <ArrowRight className="h-7 w-7 text-white" />
            </div>
          </div>
        </>
      )
    },

    // AD 10: Before/After Concept
    {
      id: 10,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full flex flex-col p-12 space-y-6">
            <div className="text-center">
              <p className="text-2xl font-black text-orange-600">BEFORE VS AFTER</p>
            </div>
            
            <div className="flex-1 space-y-4">
              {/* Before */}
              <div className="bg-gray-100 border-4 border-gray-300 p-6 rounded-2xl">
                <p className="text-lg font-black text-gray-400 mb-3">BEFORE</p>
                <p className="text-2xl font-bold text-gray-600">😰 Chasing DMs all day</p>
                <p className="text-2xl font-bold text-gray-600">📱 Look unprofessional</p>
                <p className="text-2xl font-bold text-gray-600">💸 Losing clients</p>
              </div>
              
              {/* Arrow */}
              <div className="text-center">
                <div className="inline-block bg-orange-500 p-3 rounded-full">
                  <ArrowRight className="h-8 w-8 text-white rotate-90" />
                </div>
              </div>
              
              {/* After */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 border-4 border-orange-700 p-6 rounded-2xl">
                <p className="text-lg font-black text-white mb-3">AFTER</p>
                <p className="text-2xl font-bold text-white">✓ Clients book automatically</p>
                <p className="text-2xl font-bold text-white">✓ Look established</p>
                <p className="text-2xl font-bold text-white">✓ More time training</p>
              </div>
            </div>
            
            <div className="bg-gray-900 px-8 py-5 rounded-full text-center">
              <p className="text-2xl font-black text-white">£7.99/MO • TAP TO START</p>
            </div>
          </div>
        </>
      )
    },

    // AD 11: Luxury Minimal
    {
      id: 11,
      bg: "bg-black",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12 space-y-12">
            <div className="w-20 h-20 border-4 border-orange-500 rounded-full flex items-center justify-center">
              <Zap className="h-10 w-10 text-orange-500" />
            </div>
            
            <div className="text-center space-y-6">
              <p className="text-xl font-bold text-orange-500 tracking-widest">PREMIUM</p>
              <h1 className="text-7xl font-black text-white leading-none">
                YOUR<br/>
                WEBSITE
              </h1>
              <p className="text-2xl font-bold text-gray-400">
                Built. Hosted. Managed.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-6xl font-black text-orange-500">7</p>
                <p className="text-sm font-bold text-gray-400">DAYS</p>
              </div>
              <div className="h-16 w-px bg-gray-700" />
              <div className="text-center">
                <p className="text-6xl font-black text-orange-500">£8</p>
                <p className="text-sm font-bold text-gray-400">MONTH</p>
              </div>
            </div>
            
            <div className="border-2 border-white px-12 py-4 text-center">
              <p className="text-xl font-black text-white">START NOW</p>
            </div>
          </div>
        </>
      )
    },

    // AD 12: Urgency Focus
    {
      id: 12,
      bg: "bg-red-600",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12">
            <div className="bg-white px-6 py-3 rounded-full inline-flex items-center gap-2 self-start">
              <Clock className="h-5 w-5 text-red-600" />
              <span className="text-lg font-black text-red-600">LIMITED OFFER</span>
            </div>
            
            <div className="text-center space-y-8">
              <h1 className="text-8xl font-black text-white leading-none">
                FIRST<br/>
                MONTH<br/>
                <span className="text-yellow-300">FREE</span>
              </h1>
              
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl">
                <p className="text-3xl font-black text-gray-900 mb-4">Then £7.99/month</p>
                <p className="text-xl font-bold text-gray-700">Professional PT website</p>
                <p className="text-xl font-bold text-gray-700">Live in 7 days</p>
              </div>
            </div>
            
            <div className="bg-white px-8 py-6 rounded-full text-center">
              <p className="text-3xl font-black text-red-600">CLAIM OFFER NOW</p>
            </div>
          </div>
        </>
      )
    },

    // AD 13: Social Proof
    {
      id: 13,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-orange-600" />
              <span className="text-xl font-black text-gray-900">200+ UK PTs Trust Us</span>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <p className="text-xl font-bold text-gray-900">"Game changer for my business"</p>
                <p className="text-sm font-bold text-gray-600 mt-2">— James, Manchester</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <p className="text-xl font-bold text-gray-900">"Bookings doubled in 2 weeks"</p>
                <p className="text-sm font-bold text-gray-600 mt-2">— Emma, London</p>
              </div>
              
              <div className="bg-orange-600 p-8 rounded-2xl text-center">
                <p className="text-3xl font-black text-white mb-2">£7.99/month</p>
                <p className="text-lg font-bold text-white/90">Live in 7 days</p>
              </div>
            </div>
            
            <div className="bg-gray-900 px-8 py-5 rounded-full text-center">
              <p className="text-2xl font-black text-white">JOIN THEM TODAY</p>
            </div>
          </div>
        </>
      )
    },

    // AD 14: Problem Agitation
    {
      id: 14,
      bg: "bg-gradient-to-br from-gray-900 to-gray-800",
      content: (
        <>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1080&h=1080&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <div className="space-y-4">
              <div className="inline-block bg-red-600 px-6 py-3 rounded-full">
                <p className="text-xl font-black text-white">THE PROBLEM</p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border-l-4 border-red-500">
                  <p className="text-2xl font-bold text-white">No website = No credibility</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border-l-4 border-red-500">
                  <p className="text-2xl font-bold text-white">Chasing DMs = Wasted time</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border-l-4 border-red-500">
                  <p className="text-2xl font-bold text-white">Amateur look = Lost clients</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="inline-block bg-green-500 px-6 py-3 rounded-full">
                <p className="text-xl font-black text-white">THE SOLUTION</p>
              </div>
              
              <div className="bg-orange-600 p-8 rounded-2xl">
                <p className="text-4xl font-black text-white mb-4">Done-For-You Website</p>
                <p className="text-2xl font-bold text-white">7 days • £7.99/month</p>
              </div>
              
              <div className="bg-white px-8 py-5 rounded-full text-center">
                <p className="text-2xl font-black text-gray-900">FIX IT NOW →</p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 15: Feature Grid
    {
      id: 15,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12">
            <div className="text-center">
              <h1 className="text-6xl font-black text-gray-900 mb-2">Everything</h1>
              <h1 className="text-6xl font-black text-orange-600">Included</h1>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-200">
                <Target className="h-10 w-10 text-orange-600 mb-3" />
                <p className="text-xl font-black text-gray-900">Lead Capture</p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-200">
                <Zap className="h-10 w-10 text-orange-600 mb-3" />
                <p className="text-xl font-black text-gray-900">7-Day Build</p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-200">
                <Shield className="h-10 w-10 text-orange-600 mb-3" />
                <p className="text-xl font-black text-gray-900">Hosting</p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-200">
                <Sparkles className="h-10 w-10 text-orange-600 mb-3" />
                <p className="text-xl font-black text-gray-900">AI Editor</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-900 p-6 rounded-2xl text-center">
                <p className="text-5xl font-black text-orange-400 mb-2">£7.99</p>
                <p className="text-xl font-bold text-white">per month</p>
              </div>
              
              <div className="bg-orange-600 px-8 py-5 rounded-full text-center">
                <p className="text-2xl font-black text-white">GET STARTED</p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 16: Comparison Table
    {
      id: 16,
      bg: "bg-gradient-to-br from-gray-50 to-gray-100",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-black text-gray-900">DIY vs PTBoost</h2>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border-2 border-gray-300">
                  <p className="text-lg font-black text-gray-400 mb-3">DIY WEBSITE</p>
                  <div className="space-y-2">
                    <p className="text-base font-bold text-red-600">❌ 40+ hours</p>
                    <p className="text-base font-bold text-red-600">❌ Tech stress</p>
                    <p className="text-base font-bold text-red-600">❌ £100s+ cost</p>
                    <p className="text-base font-bold text-red-600">❌ Looks basic</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl border-2 border-orange-700">
                  <p className="text-lg font-black text-white mb-3">PTBOOST</p>
                  <div className="space-y-2">
                    <p className="text-base font-bold text-white">✓ 7 days</p>
                    <p className="text-base font-bold text-white">✓ Zero effort</p>
                    <p className="text-base font-bold text-white">✓ £7.99/mo</p>
                    <p className="text-base font-bold text-white">✓ Pro design</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-900 p-6 rounded-2xl text-center">
                <p className="text-3xl font-black text-white">The Choice Is Obvious</p>
              </div>
              
              <div className="bg-orange-600 px-8 py-5 rounded-full text-center">
                <p className="text-2xl font-black text-white">START NOW</p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 17: Time Focus
    {
      id: 17,
      bg: "bg-black",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12 space-y-10">
            <div className="text-center space-y-6">
              <Clock className="h-20 w-20 text-orange-500 mx-auto" />
              
              <h1 className="text-7xl font-black text-white leading-none">
                SAVE<br/>
                <span className="text-orange-500">15 HRS</span><br/>
                PER WEEK
              </h1>
              
              <p className="text-2xl font-bold text-gray-400">
                Stop doing admin.<br/>Start training clients.
              </p>
            </div>
            
            <div className="w-full space-y-4">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-orange-500">
                <p className="text-2xl font-bold text-white">✓ Automatic lead capture</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-orange-500">
                <p className="text-2xl font-bold text-white">✓ Done-for-you website</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-orange-500">
                <p className="text-2xl font-bold text-white">✓ £7.99/month</p>
              </div>
            </div>
            
            <div className="w-full bg-orange-600 px-8 py-5 rounded-full text-center">
              <p className="text-2xl font-black text-white">GET YOUR TIME BACK</p>
            </div>
          </div>
        </>
      )
    },

    // AD 18: Price Breakdown
    {
      id: 18,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12">
            <div className="text-center">
              <p className="text-2xl font-black text-orange-600 mb-4">FULL TRANSPARENCY</p>
              <h1 className="text-6xl font-black text-gray-900">What You Get</h1>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 p-5 rounded-xl">
                <p className="text-xl font-bold text-gray-900">Professional Design</p>
                <p className="text-xl font-black text-gray-400">£500+</p>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-5 rounded-xl">
                <p className="text-xl font-bold text-gray-900">Hosting & Security</p>
                <p className="text-xl font-black text-gray-400">£15/mo</p>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-5 rounded-xl">
                <p className="text-xl font-bold text-gray-900">Lead Capture System</p>
                <p className="text-xl font-black text-gray-400">£30/mo</p>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-5 rounded-xl">
                <p className="text-xl font-bold text-gray-900">AI Website Editor</p>
                <p className="text-xl font-black text-gray-400">£25/mo</p>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-5 rounded-xl">
                <p className="text-xl font-bold text-gray-900">Ongoing Updates</p>
                <p className="text-xl font-black text-gray-400">£20/mo</p>
              </div>
              
              <div className="h-1 bg-gray-200 my-4" />
              
              <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-2xl">
                <p className="text-2xl font-black text-white">YOU PAY</p>
                <p className="text-5xl font-black text-white">£7.99</p>
              </div>
            </div>
            
            <div className="bg-gray-900 px-8 py-5 rounded-full text-center">
              <p className="text-2xl font-black text-white">START TODAY</p>
            </div>
          </div>
        </>
      )
    },

    // AD 19: Aspirational
    {
      id: 19,
      bg: "bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900",
      content: (
        <>
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1080&h=1080&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <div className="flex items-center gap-3">
              <Sparkles className="h-10 w-10 text-orange-400" />
              <span className="text-2xl font-black text-white">PTBoost</span>
            </div>
            
            <div className="text-center space-y-8">
              <h1 className="text-7xl font-black text-white leading-tight">
                Build The<br/>
                PT Business<br/>
                <span className="text-orange-400">You Deserve</span>
              </h1>
              
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl">
                <p className="text-2xl font-black text-gray-900 mb-4">Start Today</p>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-gray-700">✓ Professional website in 7 days</p>
                  <p className="text-xl font-bold text-gray-700">✓ Automatic client bookings</p>
                  <p className="text-xl font-bold text-gray-700">✓ Just £7.99/month</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 bg-orange-600 px-8 py-6 rounded-full">
              <span className="text-3xl font-black text-white">Link in Bio</span>
              <ArrowRight className="h-8 w-8 text-white" />
            </div>
          </div>
        </>
      )
    },

    // AD 20: Direct CTA
    {
      id: 20,
      bg: "bg-orange-600",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12 text-center space-y-12">
            <div className="space-y-6">
              <div className="inline-block bg-white px-6 py-3 rounded-full">
                <p className="text-xl font-black text-orange-600">FOR UK PERSONAL TRAINERS</p>
              </div>
              
              <h1 className="text-8xl font-black text-white leading-none">
                GET YOUR<br/>
                WEBSITE<br/>
                TODAY
              </h1>
            </div>
            
            <div className="space-y-6 w-full">
              <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl">
                <p className="text-6xl font-black text-orange-600 mb-3">£7.99</p>
                <p className="text-2xl font-bold text-gray-700">per month</p>
                <div className="h-1 w-20 bg-orange-600 mx-auto my-6" />
                <p className="text-3xl font-black text-gray-900 mb-4">Live in 7 Days</p>
                <p className="text-xl font-bold text-gray-700">Built • Hosted • Managed</p>
              </div>
              
              <div className="bg-gray-900 px-12 py-6 rounded-full">
                <p className="text-3xl font-black text-white">TAP TO START →</p>
              </div>
            </div>
            
            <p className="text-xl font-black text-white">PTBoost.co.uk</p>
          </div>
        </>
      )
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">Instagram Ad Gallery</h1>
          <p className="text-xl text-gray-400 font-bold">20 Master-Designed Ads • Scroll & Screenshot</p>
          <p className="text-lg text-orange-400 font-bold mt-2">All ads ready to use! ✨</p>
        </div>

        {/* Full View Gallery */}
        <div className="space-y-16">
          {ads.map((ad) => (
            <div key={ad.id} className="flex flex-col items-center">
              {/* Ad Number Label */}
              <div className="mb-6 flex items-center gap-4">
                <div className="bg-orange-600 text-white px-8 py-4 rounded-full font-black text-2xl shadow-xl">
                  Ad #{ad.id}
                </div>
                <div className="bg-gray-800 text-gray-300 px-6 py-3 rounded-full font-bold text-sm">
                  1080x1080px • Instagram Square
                </div>
              </div>
              
              {/* Ad Container - Full Size */}
              <div className="w-full max-w-[1080px] aspect-square rounded-lg overflow-hidden shadow-2xl">
                <div className={`w-full h-full relative ${ad.bg}`}>
                  {ad.content}
                </div>
              </div>

              {/* Divider */}
              {ad.id < ads.length && (
                <div className="mt-12 h-px w-full max-w-[600px] bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center space-y-4">
          <div className="inline-block bg-orange-600 px-8 py-4 rounded-full">
            <p className="text-2xl font-black text-white">20 Ads Ready To Use ✓</p>
          </div>
          <p className="text-gray-400 font-bold">
            Each ad is 1080x1080px • Perfect for Instagram Feed • Screenshot & Post
          </p>
        </div>
      </div>
    </div>
  )
}

