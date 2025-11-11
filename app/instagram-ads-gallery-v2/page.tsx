"use client"

import { ArrowRight, X, Check, Zap, Target, Sparkles, Star, Shield, TrendingUp, Award, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function InstagramAdsGalleryV2() {
  const ads = [
    // AD 1: Brutalist Typography
    {
      id: 1,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12">
            <div className="space-y-2">
              <div className="text-[10px] font-black tracking-widest text-gray-400">PTBOOST.CO.UK</div>
              <div className="inline-block bg-orange-600 text-white px-3 py-1 text-xs font-black">UK PTs</div>
            </div>
            
            <div className="space-y-4">
              <div className="border-8 border-black p-8">
                <h1 className="text-[120px] font-black leading-none text-black mb-4">
                  NO<br/>
                  DMs
                </h1>
              </div>
              <div className="bg-orange-600 p-8 border-4 border-black">
                <p className="text-4xl font-black text-white leading-tight">
                  GET A REAL WEBSITE INSTEAD
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-black text-black">£7.99/MONTH</p>
                <p className="text-sm font-bold text-gray-600">LIVE IN 7 DAYS</p>
              </div>
              <div className="bg-black text-white px-8 py-4 font-black text-lg">
                TAP BIO
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 2: Neon Glow Effect
    {
      id: 2,
      bg: "bg-black",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12 relative">
            {/* Neon glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[150px] opacity-50" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full blur-[150px] opacity-40" />
            
            <div className="relative z-10 text-center space-y-12">
              <div className="space-y-4">
                <h1 
                  className="text-8xl font-black text-white leading-none"
                  style={{ 
                    textShadow: '0 0 30px rgba(251, 146, 60, 0.8), 0 0 60px rgba(251, 146, 60, 0.5), 0 0 90px rgba(251, 146, 60, 0.3)'
                  }}
                >
                  LOOK<br/>
                  <span className="text-orange-400">PRO</span>
                </h1>
                <p 
                  className="text-3xl font-bold text-white/90"
                  style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
                >
                  Book Clients 24/7
                </p>
              </div>
              
              <div className="space-y-4">
                <div 
                  className="bg-white/10 backdrop-blur-xl border border-orange-400/50 p-8 rounded-2xl"
                  style={{ boxShadow: '0 0 40px rgba(251, 146, 60, 0.3)' }}
                >
                  <p className="text-6xl font-black text-orange-400 mb-2">£7.99</p>
                  <p className="text-xl font-bold text-white">per month</p>
                </div>
                
                <div 
                  className="bg-orange-600 px-10 py-5 rounded-full border-2 border-orange-400"
                  style={{ boxShadow: '0 0 40px rgba(251, 146, 60, 0.6)' }}
                >
                  <p className="text-2xl font-black text-white">LINK IN BIO</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 3: Magazine Style
    {
      id: 3,
      bg: "bg-gradient-to-br from-red-50 to-orange-50",
      content: (
        <>
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1080&h=1080&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="relative z-10 h-full flex flex-col p-12">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-sm font-black text-orange-600 tracking-widest">PTBOOST MAGAZINE</p>
                <p className="text-xs font-bold text-gray-600">ISSUE #01 • 2025</p>
              </div>
              <div className="bg-orange-600 text-white px-4 py-2 rotate-12 font-black text-xs">
                NEW!
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-6">
                <div className="inline-block bg-black text-white px-4 py-1 text-sm font-black mb-4">
                  FEATURE STORY
                </div>
                <h1 className="text-7xl font-black text-gray-900 leading-[0.9] mb-6">
                  THE END<br/>
                  OF DM<br/>
                  CHASING
                </h1>
                <div className="w-32 h-1 bg-orange-600 mb-6" />
                <p className="text-2xl font-bold text-gray-700 max-w-xl leading-tight">
                  How UK personal trainers are automating client bookings with professional websites
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border-2 border-gray-900">
                <p className="text-3xl font-black text-orange-600">£8</p>
                <p className="text-xs font-bold text-gray-600">/MONTH</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-gray-900">
                <p className="text-3xl font-black text-orange-600">7</p>
                <p className="text-xs font-bold text-gray-600">DAYS</p>
              </div>
              <div className="bg-orange-600 p-4 rounded-xl flex items-center justify-center border-2 border-gray-900">
                <ArrowRight className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 4: Glassmorphism
    {
      id: 4,
      bg: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12 relative">
            {/* Floating shapes */}
            <div className="absolute top-20 right-20 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
            <div className="absolute bottom-32 left-20 w-60 h-60 bg-white/20 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-xl border border-white/30 px-6 py-3 rounded-full inline-block">
                <p className="text-white font-black text-sm">PTBoost for UK Trainers</p>
              </div>
            </div>
            
            <div className="relative z-10 text-center space-y-8">
              <h1 className="text-8xl font-black text-white leading-none drop-shadow-2xl">
                YOUR<br/>
                WEBSITE.<br/>
                SORTED.
              </h1>
              
              <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-10 rounded-3xl max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Check className="h-7 w-7 text-white stroke-[3]" />
                    </div>
                    <p className="text-2xl font-bold">Built in 7 days</p>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Check className="h-7 w-7 text-white stroke-[3]" />
                    </div>
                    <p className="text-2xl font-bold">£7.99 per month</p>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Check className="h-7 w-7 text-white stroke-[3]" />
                    </div>
                    <p className="text-2xl font-bold">Zero tech stress</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="bg-white px-10 py-6 rounded-full text-center">
                <p className="text-3xl font-black text-gray-900">TAP TO START</p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 5: Retro/Vintage
    {
      id: 5,
      bg: "bg-amber-50",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12 relative">
            {/* Vintage texture overlay */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 4px)' }} />
            
            <div className="relative z-10 text-center space-y-8">
              <div className="border-8 border-double border-orange-900 p-6 inline-block">
                <p className="text-2xl font-black text-orange-900 tracking-widest">EST. 2025</p>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-7xl font-black text-orange-900 leading-none" style={{ fontFamily: 'serif' }}>
                  PERSONAL<br/>
                  TRAINING<br/>
                  <span className="text-orange-600">EXCELLENCE</span>
                </h1>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-20 bg-orange-900" />
                  <Star className="h-8 w-8 text-orange-600 fill-orange-600" />
                  <div className="h-px w-20 bg-orange-900" />
                </div>
                
                <p className="text-2xl font-bold text-orange-900 max-w-xl mx-auto leading-tight">
                  Professional Websites for<br/>Distinguished Trainers
                </p>
              </div>
              
              <div className="border-4 border-orange-900 p-8 inline-block bg-white">
                <p className="text-6xl font-black text-orange-900 mb-2" style={{ fontFamily: 'serif' }}>£7.99</p>
                <p className="text-xl font-bold text-orange-900">Monthly Service</p>
                <div className="mt-4 pt-4 border-t-2 border-orange-900">
                  <p className="text-lg font-bold text-orange-900">Ready in Seven Days</p>
                </div>
              </div>
              
              <div className="inline-block bg-orange-900 text-amber-50 px-12 py-4 font-black text-2xl border-4 border-double border-orange-900">
                ENQUIRE NOW
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 6: Bold Duotone
    {
      id: 6,
      bg: "bg-black",
      content: (
        <>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1080&h=1080&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%) contrast(150%)',
              mixBlendMode: 'multiply',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-pink-600 mix-blend-screen opacity-80" />
          
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <div className="flex justify-between items-start">
              <div className="bg-white text-black px-6 py-3 font-black text-lg">
                PTBOOST
              </div>
              <div className="bg-white text-black px-6 py-3 font-black text-sm rotate-3">
                2025
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-8xl font-black text-white leading-none">
                TRAIN<br/>
                MORE.<br/>
                <span className="text-black">STRESS</span><br/>
                <span className="text-black">LESS.</span>
              </h1>
              
              <div className="bg-black/80 backdrop-blur-sm p-8 inline-block">
                <p className="text-3xl font-black text-white mb-4">
                  Done-For-You Websites
                </p>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-5xl font-black text-orange-400">7</p>
                    <p className="text-sm font-bold text-white">DAYS</p>
                  </div>
                  <div className="h-16 w-px bg-white/50" />
                  <div>
                    <p className="text-5xl font-black text-orange-400">£8</p>
                    <p className="text-sm font-bold text-white">/MO</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white px-10 py-6 flex items-center justify-between">
              <span className="text-3xl font-black text-black">LINK IN BIO</span>
              <ChevronRight className="h-10 w-10 text-black" />
            </div>
          </div>
        </>
      )
    },

    // AD 7: Minimalist Japanese Style
    {
      id: 7,
      bg: "bg-gray-50",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-20 space-y-16">
            <div className="text-center space-y-8">
              <div className="w-2 h-2 bg-orange-600 rounded-full mx-auto" />
              
              <h1 className="text-8xl font-light text-gray-900 tracking-tight">
                Focus
              </h1>
              
              <div className="w-16 h-px bg-gray-900 mx-auto" />
              
              <p className="text-2xl font-light text-gray-600 max-w-md leading-relaxed">
                You train clients.<br/>
                We build your website.
              </p>
              
              <div className="w-16 h-px bg-gray-900 mx-auto" />
              
              <div className="space-y-2">
                <p className="text-6xl font-light text-orange-600">7.99</p>
                <p className="text-sm font-medium text-gray-500 tracking-wider">PER MONTH</p>
              </div>
            </div>
            
            <div className="border border-gray-900 px-16 py-5 hover:bg-gray-900 hover:text-white transition-colors cursor-pointer">
              <p className="text-xl font-medium tracking-wide">Begin</p>
            </div>
            
            <div className="text-center">
              <p className="text-xs font-medium text-gray-400 tracking-widest">PTBOOST.CO.UK</p>
            </div>
          </div>
        </>
      )
    },

    // AD 8: Neo-Brutalism
    {
      id: 8,
      bg: "bg-yellow-300",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-10">
            <div className="flex justify-between items-start">
              <div className="bg-black text-yellow-300 px-5 py-2 border-4 border-black font-black rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                PT
              </div>
              <div className="bg-white px-4 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-2 flex items-center gap-2">
                <Image src="/ptboost_logo-nobg.png" alt="PTBoost" width={32} height={32} className="object-contain" />
                <span className="font-black text-black text-sm">2025</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-10 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1">
                <h1 className="text-7xl font-black text-black leading-none mb-4">
                  STOP<br/>
                  WASTING<br/>
                  TIME
                </h1>
              </div>
              
              <div className="bg-orange-600 p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                <p className="text-3xl font-black text-white mb-3">
                  Get a PT Website Instead
                </p>
                <p className="text-lg font-bold text-white/90 mb-6">
                  Professional website for personal trainers
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white text-black px-6 py-3 border-4 border-black font-black text-center">
                    <p className="text-2xl">7</p>
                    <p className="text-xs">DAYS</p>
                  </div>
                  <div className="bg-black text-white px-6 py-3 border-4 border-black font-black text-center">
                    <p className="text-2xl">£7.99</p>
                    <p className="text-xs">/MO</p>
                  </div>
                </div>
                <div className="bg-yellow-300 text-black px-6 py-3 border-4 border-black font-black text-center">
                  FREE TRIAL 1ST MONTH
                </div>
              </div>
            </div>
            
            <div className="bg-black text-yellow-300 px-10 py-5 border-4 border-black font-black text-3xl text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1 hover:rotate-0 transition-transform cursor-pointer">
              TAP BIO →
            </div>
          </div>
        </>
      )
    },

    // AD 9: Swiss Design
    {
      id: 9,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full p-12">
            <div className="h-full grid grid-cols-12 grid-rows-12 gap-4">
              {/* Header */}
              <div className="col-span-6 row-span-1 flex items-center">
                <p className="text-xs font-bold tracking-widest">PTBOOST</p>
              </div>
              <div className="col-span-6 row-span-1 flex items-center justify-end">
                <p className="text-xs font-bold">2025</p>
              </div>
              
              {/* Main content */}
              <div className="col-span-12 row-span-8 flex items-center">
                <div className="space-y-8 w-full">
                  <h1 className="text-9xl font-bold text-black leading-none tracking-tighter">
                    Your<br/>
                    Website
                  </h1>
                  
                  <div className="w-full h-2 bg-orange-600" />
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm font-bold text-gray-500 mb-2">PRICE</p>
                      <p className="text-4xl font-bold text-black">£7.99/mo</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 mb-2">DELIVERY</p>
                      <p className="text-4xl font-bold text-black">7 Days</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="col-span-8 row-span-3 flex items-end">
                <p className="text-sm font-bold text-gray-700">
                  Professional websites for UK personal trainers. Built, hosted, managed.
                </p>
              </div>
              <div className="col-span-4 row-span-3 flex items-end justify-end">
                <div className="bg-black text-white px-8 py-4 font-bold">
                  START →
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 10: Gradient Mesh
    {
      id: 10,
      bg: "bg-gray-900",
      content: (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 opacity-90" />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 30% 40%, rgba(251, 146, 60, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)',
          }} />
          
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <p className="text-white font-black text-lg">LIVE</p>
            </div>
            
            <div className="text-center space-y-10">
              <div className="space-y-6">
                <h1 className="text-8xl font-black text-white leading-none">
                  BUILD<br/>
                  YOUR<br/>
                  EMPIRE
                </h1>
                
                <p className="text-3xl font-bold text-white/90">
                  One Website at a Time
                </p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-2xl border border-white/30 p-10 rounded-3xl inline-block">
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-7xl font-black text-white">£7.99</p>
                  <p className="text-2xl font-bold text-white/80 pb-2">/mo</p>
                </div>
                <div className="h-px bg-white/30 mb-4" />
                <p className="text-xl font-bold text-white">Live in 7 days • Cancel anytime</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 bg-white px-10 py-6 rounded-full">
              <span className="text-3xl font-black text-gray-900">Link in Bio</span>
              <ArrowRight className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </>
      )
    },

    // AD 11: Newspaper Style
    {
      id: 11,
      bg: "bg-gray-100",
      content: (
        <>
          <div className="h-full p-10" style={{ fontFamily: 'Georgia, serif' }}>
            <div className="border-8 border-double border-black p-8 h-full flex flex-col">
              <div className="text-center border-b-4 border-black pb-4 mb-6">
                <p className="text-4xl font-bold">THE PTBOOST TIMES</p>
                <p className="text-sm mt-2">VOL. 1 • NO. 1 • 2025</p>
              </div>
              
              <div className="flex-1 flex flex-col justify-center space-y-6">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-black leading-tight mb-4">
                    PERSONAL TRAINERS<br/>
                    QUIT INSTAGRAM DMs
                  </h1>
                  <p className="text-xl italic text-gray-700">
                    Revolutionary New Service Automates Client Bookings
                  </p>
                </div>
                
                <div className="border-t-2 border-b-2 border-black py-4">
                  <p className="text-lg leading-relaxed text-gray-800">
                    LONDON – Hundreds of UK personal trainers are abandoning time-consuming DM chases in favor of professional websites that capture leads automatically.
                  </p>
                </div>
                
                <div className="bg-black text-white p-6">
                  <p className="text-3xl font-bold text-center mb-3">SPECIAL OFFER</p>
                  <div className="flex justify-center items-center gap-8">
                    <div className="text-center">
                      <p className="text-5xl font-bold">£7.99</p>
                      <p className="text-sm">per month</p>
                    </div>
                    <div className="h-16 w-px bg-white/30" />
                    <div className="text-center">
                      <p className="text-5xl font-bold">7</p>
                      <p className="text-sm">days live</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-6 border-t-4 border-black">
                <p className="text-2xl font-bold">READ MORE: LINK IN BIO →</p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 12: Cyberpunk
    {
      id: 12,
      bg: "bg-black",
      content: (
        <>
          <div className="h-full relative overflow-hidden">
            {/* Scanlines effect */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)'
            }} />
            
            {/* Cyan glow */}
            <div className="absolute top-20 right-20 w-80 h-80 bg-cyan-500 rounded-full blur-[120px] opacity-30" />
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-500 rounded-full blur-[120px] opacity-30" />
            
            <div className="relative z-10 h-full flex flex-col justify-between p-12">
              <div className="flex items-center gap-3">
                <div className="text-cyan-400 font-mono text-sm">
                  &gt; PTBOOST_SYS_2025
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="border-2 border-cyan-400 p-8 bg-black/50 backdrop-blur-sm"
                  style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)' }}>
                  <h1 className="text-7xl font-black text-cyan-400 leading-none mb-4"
                    style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.8)' }}>
                    UPGRADE<br/>
                    YOUR<br/>
                    <span className="text-pink-400" style={{ textShadow: '0 0 20px rgba(236, 72, 153, 0.8)' }}>
                      STATUS
                    </span>
                  </h1>
                </div>
                
                <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-1">
                  <div className="bg-black p-6">
                    <p className="text-2xl font-bold text-white mb-4">
                      &gt; PROFESSIONAL WEBSITE PROTOCOL
                    </p>
                    <div className="font-mono text-cyan-400 space-y-2">
                      <p>&gt; PRICE: £7.99/MONTH</p>
                      <p>&gt; DEPLOY: 7_DAYS</p>
                      <p>&gt; STATUS: READY</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-2 border-pink-500 bg-pink-500 px-10 py-5 text-center"
                style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}>
                <p className="text-2xl font-black text-black">&gt; INITIALIZE_NOW</p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 13: Art Deco
    {
      id: 13,
      bg: "bg-gradient-to-b from-amber-900 via-yellow-800 to-amber-900",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12">
            <div className="text-center">
              <div className="inline-block border-4 border-yellow-400 p-4">
                <p className="text-yellow-400 font-bold text-sm tracking-widest">ESTABLISHED 2025</p>
              </div>
            </div>
            
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-20 bg-yellow-400" />
                  <div className="w-3 h-3 bg-yellow-400 rotate-45" />
                  <div className="h-px w-20 bg-yellow-400" />
                </div>
                
                <h1 className="text-7xl font-bold text-yellow-400 leading-none tracking-wider"
                  style={{ fontFamily: 'serif' }}>
                  ELEGANCE<br/>
                  &<br/>
                  EXCELLENCE
                </h1>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-20 bg-yellow-400" />
                  <div className="w-3 h-3 bg-yellow-400 rotate-45" />
                  <div className="h-px w-20 bg-yellow-400" />
                </div>
              </div>
              
              <p className="text-2xl font-bold text-yellow-200 max-w-xl mx-auto">
                Bespoke Websites for<br/>Distinguished Personal Trainers
              </p>
              
              <div className="border-4 border-yellow-400 inline-block p-8 bg-black/30">
                <p className="text-6xl font-bold text-yellow-400 mb-2">£7.99</p>
                <div className="h-px bg-yellow-400 my-4" />
                <p className="text-xl font-bold text-yellow-200">Monthly</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-block bg-yellow-400 text-amber-900 px-12 py-4 font-bold text-2xl border-4 border-yellow-400">
                COMMENCE
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 14: Comic Book Style
    {
      id: 14,
      bg: "bg-yellow-400",
      content: (
        <>
          <div className="h-full flex flex-col p-8 space-y-6">
            {/* Comic panels */}
            <div className="flex-1 bg-white border-4 border-black p-6 relative">
              <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-2 border-2 border-black font-black text-sm rotate-2 shadow-lg">
                BEFORE
              </div>
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <p className="text-6xl">😰</p>
                  <div className="bg-white border-4 border-black p-4 relative">
                    <div className="absolute -left-6 top-6 w-0 h-0 border-t-[15px] border-t-transparent border-r-[20px] border-r-black border-b-[15px] border-b-transparent" />
                    <p className="text-3xl font-black text-black leading-tight">
                      "CHASING DMs<br/>ALL DAY!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-white border-4 border-black p-6 relative">
              <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 border-2 border-black font-black text-sm rotate-2 shadow-lg">
                AFTER
              </div>
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <p className="text-6xl">🎉</p>
                  <div className="bg-white border-4 border-black p-4 relative">
                    <div className="absolute -left-6 top-6 w-0 h-0 border-t-[15px] border-t-transparent border-r-[20px] border-r-black border-b-[15px] border-b-transparent" />
                    <p className="text-3xl font-black text-black leading-tight">
                      "BOOKING<br/>CLIENTS 24/7!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-600 border-4 border-black p-6 text-center relative">
              <div className="absolute -top-4 -right-4 bg-yellow-300 border-4 border-black rounded-full w-24 h-24 flex items-center justify-center rotate-12">
                <div className="text-center">
                  <p className="text-2xl font-black text-black">£7.99</p>
                  <p className="text-xs font-black text-black">/MO</p>
                </div>
              </div>
              <p className="text-4xl font-black text-white">
                GET YOUR WEBSITE!
              </p>
            </div>
          </div>
        </>
      )
    },

    // AD 15: Bauhaus
    {
      id: 15,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full p-12 relative">
            {/* Geometric shapes */}
            <div className="absolute top-20 right-20 w-40 h-40 bg-orange-600 rounded-full opacity-80" />
            <div className="absolute bottom-32 left-32 w-32 h-32 bg-blue-600 opacity-80" />
            <div className="absolute top-40 left-20 w-24 h-24 bg-yellow-400" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-sm font-bold tracking-widest">PTBOOST</p>
                  <div className="w-16 h-1 bg-orange-600" />
                </div>
                
                <h1 className="text-8xl font-bold text-black leading-none">
                  Form<br/>
                  Follows<br/>
                  Function
                </h1>
              </div>
              
              <div className="space-y-6 max-w-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-600 p-6 text-white">
                    <p className="text-sm font-bold mb-2">PRICE</p>
                    <p className="text-4xl font-bold">£7.99</p>
                  </div>
                  <div className="bg-black p-6 text-white">
                    <p className="text-sm font-bold mb-2">TIME</p>
                    <p className="text-4xl font-bold">7 Days</p>
                  </div>
                </div>
                
                <div className="bg-blue-600 text-white p-8">
                  <p className="text-2xl font-bold leading-tight">
                    Professional websites for personal trainers
                  </p>
                </div>
                
                <div className="flex items-center justify-between bg-yellow-400 p-6">
                  <span className="text-2xl font-bold text-black">START NOW</span>
                  <ArrowRight className="h-8 w-8 text-black" />
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 16: Maximalist
    {
      id: 16,
      bg: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600",
      content: (
        <>
          <div className="h-full p-10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 text-9xl opacity-20">⚡</div>
            <div className="absolute bottom-10 left-10 text-9xl opacity-20">✨</div>
            <div className="absolute top-1/2 left-1/4 text-6xl opacity-10">🔥</div>
            
            <div className="relative z-10 h-full flex flex-col justify-center items-center space-y-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <Star className="h-12 w-12 text-yellow-300 fill-yellow-300" />
                  <Star className="h-16 w-16 text-yellow-300 fill-yellow-300" />
                  <Star className="h-12 w-12 text-yellow-300 fill-yellow-300" />
                </div>
                
                <h1 className="text-8xl font-black text-white leading-none">
                  THE<br/>
                  ULTIMATE<br/>
                  PT WEBSITE
                </h1>
                
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {['FAST', 'EASY', 'PRO', 'CHEAP'].map((word) => (
                    <div key={word} className="bg-white text-purple-600 px-6 py-3 font-black text-xl border-4 border-yellow-300 shadow-lg rotate-2">
                      {word}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white border-8 border-yellow-300 p-10 shadow-2xl -rotate-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Check className="h-10 w-10 text-green-500 stroke-[4]" />
                    <p className="text-2xl font-black text-gray-900">Built in 7 days!</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Check className="h-10 w-10 text-green-500 stroke-[4]" />
                    <p className="text-2xl font-black text-gray-900">Only £7.99/month!</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Check className="h-10 w-10 text-green-500 stroke-[4]" />
                    <p className="text-2xl font-black text-gray-900">Book clients 24/7!</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-300 text-purple-900 px-16 py-6 font-black text-4xl border-8 border-white shadow-2xl rotate-2 animate-pulse">
                TAP NOW! 🚀
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 17: Monochrome Editorial
    {
      id: 17,
      bg: "bg-black",
      content: (
        <>
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1080&h=1080&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%) contrast(120%)',
            }}
          />
          
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white" />
              <p className="text-white text-sm font-bold tracking-widest">PTBOOST</p>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-white/60 text-lg font-bold tracking-wider">ISSUE 01</p>
                <h1 className="text-8xl font-black text-white leading-[0.9]">
                  THE<br/>
                  NEW<br/>
                  STANDARD
                </h1>
                <div className="w-32 h-1 bg-white" />
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 max-w-2xl">
                <p className="text-white text-2xl font-bold leading-relaxed mb-6">
                  Professional websites for personal trainers who demand excellence.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-white/60 text-sm font-bold mb-2">PRICE</p>
                    <p className="text-white text-3xl font-bold">£7.99</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-bold mb-2">DELIVERY</p>
                    <p className="text-white text-3xl font-bold">7 Days</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border border-white px-8 py-5">
              <span className="text-white font-bold text-xl tracking-wide">LEARN MORE</span>
              <ArrowRight className="h-6 w-6 text-white" />
            </div>
          </div>
        </>
      )
    },

    // AD 18: Y2K Aesthetic
    {
      id: 18,
      bg: "bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400",
      content: (
        <>
          <div className="h-full p-10 relative overflow-hidden">
            {/* Chrome text effects */}
            <div className="absolute inset-0 opacity-20">
              <div className="text-9xl font-black text-white/30 absolute top-20 left-20">PT</div>
              <div className="text-9xl font-black text-white/30 absolute bottom-20 right-20">WEB</div>
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-center items-center space-y-8">
              <div className="text-center space-y-6">
                <div className="inline-block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 p-1 rounded-full">
                  <div className="bg-white px-8 py-3 rounded-full">
                    <p className="text-purple-600 font-black text-lg">✨ NEW IN 2025 ✨</p>
                  </div>
                </div>
                
                <h1 className="text-8xl font-black leading-none">
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                    style={{ 
                      WebkitTextStroke: '2px white',
                      paintOrder: 'stroke fill',
                    }}>
                    YOUR
                  </span>
                  <br/>
                  <span className="text-white"
                    style={{ 
                      textShadow: '4px 4px 0px rgba(0,0,0,0.3)',
                    }}>
                    WEBSITE
                  </span>
                  <br/>
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    style={{ 
                      WebkitTextStroke: '2px white',
                      paintOrder: 'stroke fill',
                    }}>
                    ONLINE
                  </span>
                </h1>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border-4 border-white shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <p className="text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        7
                      </p>
                      <p className="text-sm font-bold text-gray-600">DAYS</p>
                    </div>
                    <div className="text-5xl">💫</div>
                    <div className="text-center">
                      <p className="text-6xl font-black bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                        £8
                      </p>
                      <p className="text-sm font-bold text-gray-600">/MONTH</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-12 py-5 rounded-full text-white font-black text-3xl border-4 border-white shadow-2xl">
                CLICK HERE 👆
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 19: Grunge/Texture
    {
      id: 19,
      bg: "bg-stone-800",
      content: (
        <>
          <div className="h-full relative overflow-hidden">
            {/* Grunge texture */}
            <div className="absolute inset-0 opacity-20 mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
              }}
            />
            
            <div className="relative z-10 h-full flex flex-col justify-between p-12">
              <div>
                <div className="inline-block border-4 border-orange-500 bg-stone-900 px-6 py-3 -rotate-2">
                  <p className="text-orange-500 font-black text-lg">PTBOOST</p>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-stone-900/80 border-4 border-orange-500 p-10 -rotate-1">
                  <h1 className="text-7xl font-black text-orange-500 leading-none mb-4"
                    style={{
                      textShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                    }}>
                    BREAK<br/>
                    THE<br/>
                    MOULD
                  </h1>
                  <div className="w-full h-2 bg-orange-500" />
                </div>
                
                <div className="bg-orange-500 border-4 border-stone-900 p-8 rotate-1">
                  <p className="text-3xl font-black text-stone-900 mb-6">
                    Professional PT Websites
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="bg-stone-900 text-orange-500 px-6 py-4 font-black text-2xl border-4 border-stone-900">
                      7 DAYS
                    </div>
                    <div className="bg-stone-900 text-orange-500 px-6 py-4 font-black text-2xl border-4 border-stone-900">
                      £7.99
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-stone-900 border-4 border-orange-500 px-10 py-5 text-center rotate-2">
                <p className="text-3xl font-black text-orange-500">LINK IN BIO</p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 20: Ultra Modern Minimal
    {
      id: 20,
      bg: "bg-zinc-950",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-16 space-y-16">
            <div className="text-center space-y-12">
              <div className="inline-block w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-500" />
              
              <h1 className="text-9xl font-light text-white tracking-tight">
                Begin
              </h1>
              
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              
              <p className="text-2xl font-light text-zinc-400 max-w-md leading-relaxed">
                Professional websites<br/>
                for personal trainers
              </p>
              
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-12">
                  <div className="text-center">
                    <p className="text-6xl font-light text-white">7</p>
                    <p className="text-sm font-light text-zinc-500 tracking-widest mt-2">DAYS</p>
                  </div>
                  
                  <div className="w-px h-16 bg-zinc-700" />
                  
                  <div className="text-center">
                    <p className="text-6xl font-light text-white">7.99</p>
                    <p className="text-sm font-light text-zinc-500 tracking-widest mt-2">GBP/MO</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="border border-zinc-700 px-16 py-5 hover:bg-white hover:border-white transition-all duration-300">
                <p className="text-lg font-light tracking-widest text-white group-hover:text-black transition-colors">
                  START
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs font-light text-zinc-600 tracking-[0.3em]">PTBOOST</p>
            </div>
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
          <div className="inline-block bg-gradient-to-r from-orange-600 to-pink-600 text-white px-8 py-3 rounded-full mb-4">
            <p className="text-sm font-black">VERSION 2.0 • ELEVATED DESIGNS</p>
          </div>
          <h1 className="text-5xl font-black text-white mb-4">Instagram Ad Gallery V2</h1>
          <p className="text-xl text-gray-400 font-bold">20 Master-Level Artistic Designs • Premium Quality</p>
          <p className="text-lg text-orange-400 font-bold mt-2">Scroll & Screenshot! ✨</p>
        </div>

        {/* Full View Gallery */}
        <div className="space-y-16">
          {ads.map((ad) => (
            <div key={ad.id} className="flex flex-col items-center">
              {/* Ad Number Label */}
              <div className="mb-6 flex items-center gap-4">
                <div className="bg-gradient-to-r from-orange-600 to-pink-600 text-white px-8 py-4 rounded-full font-black text-2xl shadow-xl">
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
                <div className="mt-12 h-px w-full max-w-[600px] bg-gradient-to-r from-transparent via-orange-600 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center space-y-4">
          <div className="inline-block bg-gradient-to-r from-orange-600 to-pink-600 px-8 py-4 rounded-full">
            <p className="text-2xl font-black text-white">20 Premium Ads Ready ✓</p>
          </div>
          <p className="text-gray-400 font-bold">
            Elevated Artistic Styles • 1080x1080px • Perfect for Instagram
          </p>
        </div>
      </div>
    </div>
  )
}

