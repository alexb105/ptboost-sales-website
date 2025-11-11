"use client"

import { ArrowRight, Check, Zap, Sparkles, Star, Shield, TrendingUp, Award } from "lucide-react"
import Image from "next/image"

export default function InstagramAdsGalleryV3() {
  const ads = [
    // AD 1: 3D Isometric
    {
      id: 1,
      bg: "bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12 relative overflow-hidden">
            {/* 3D floating elements effect */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl opacity-20 blur-2xl transform rotate-12" />
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl opacity-20 blur-2xl transform -rotate-12" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-200 shadow-lg">
                <Check className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-black text-gray-900">All Features Included</span>
                <Check className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            
            <div className="relative z-10 text-center space-y-8">
              <h1 className="text-7xl font-black text-gray-900 leading-none mb-6">
                Ready to Get<br/>
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Started?
                </span>
              </h1>
              
              <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-orange-100 max-w-2xl mx-auto">
                <p className="text-xl font-bold text-gray-700 mb-6 leading-relaxed">
                  Free for the first month, then<br/>
                  <span className="text-orange-600 text-2xl">£7.99/month</span>
                </p>
                <p className="text-lg font-bold text-gray-600 mb-8">
                  Live in 30 days • Cancel anytime
                </p>
                
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all">
                  <div className="flex items-center justify-center gap-3">
                    <Sparkles className="h-6 w-6 text-white" />
                    <span className="text-2xl font-black text-white">Start free — then £7.99/mo</span>
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 flex items-center justify-center gap-3">
              <Image src="/ptboost_logo-nobg.png" alt="PTBoost" width={40} height={40} className="object-contain" />
              <p className="text-sm font-bold text-gray-500">PTBoost.co.uk • For UK Personal Trainers</p>
            </div>
          </div>
        </>
      )
    },

    // AD 2: Luxury Minimal
    {
      id: 2,
      bg: "bg-black",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-16 space-y-12">
            <div className="text-center space-y-10 max-w-2xl">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <p className="text-orange-500 text-xs font-bold tracking-[0.3em]">EXCLUSIVE OFFER</p>
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                </div>
                
                <h1 className="text-8xl font-light text-white tracking-tight leading-none">
                  First Month<br/>
                  <span className="font-black">Free</span>
                </h1>
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="space-y-6">
                <p className="text-2xl font-light text-white/80">
                  Professional website for personal trainers
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3 text-white">
                    <div className="w-1 h-1 bg-orange-500 rounded-full" />
                    <p className="text-lg font-light">Then £7.99 per month</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-white">
                    <div className="w-1 h-1 bg-orange-500 rounded-full" />
                    <p className="text-lg font-light">Live in 30 days</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-white">
                    <div className="w-1 h-1 bg-orange-500 rounded-full" />
                    <p className="text-lg font-light">Cancel anytime</p>
                  </div>
                </div>
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="border border-white/30 px-12 py-5 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group">
                <p className="text-xl font-light tracking-widest text-white group-hover:text-black">
                  BEGIN
                </p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 3: Abstract Art
    {
      id: 3,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full relative overflow-hidden">
            {/* Abstract shapes */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-300 to-pink-400 rounded-full opacity-60 blur-3xl transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-300 to-blue-400 rounded-full opacity-60 blur-3xl transform -translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-yellow-300 to-orange-400 opacity-40 blur-3xl transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
            
            <div className="relative z-10 h-full flex flex-col justify-center items-center p-12 text-center space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-gray-900 shadow-lg">
                  <Check className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-black text-gray-900">All Features Included</span>
                  <Check className="h-5 w-5 text-orange-600" />
                </div>
                
                <h1 className="text-8xl font-black text-gray-900 leading-none">
                  Ready?
                </h1>
              </div>
              
              <div className="bg-white/90 backdrop-blur-2xl p-12 rounded-[3rem] shadow-2xl border border-gray-900 max-w-2xl">
                <div className="space-y-6">
                  <p className="text-2xl font-black text-gray-900">
                    Free First Month
                  </p>
                  
                  <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto" />
                  
                  <p className="text-xl font-bold text-gray-700">
                    Then £7.99/month
                  </p>
                  
                  <div className="space-y-2 text-gray-600 font-bold">
                    <p>✓ Live in 30 days</p>
                    <p>✓ Cancel anytime</p>
                    <p>✓ All features included</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-10 py-5 rounded-full shadow-xl mt-8">
                    <p className="text-2xl font-black text-white">Start Free Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 4: Premium Card Design
    {
      id: 4,
      bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12">
            <div className="bg-gradient-to-br from-white via-gray-50 to-white p-12 rounded-3xl shadow-2xl max-w-2xl border-4 border-orange-500/20">
              <div className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 bg-orange-50 px-6 py-2 rounded-full border border-orange-200">
                    <Check className="h-4 w-4 text-orange-600" />
                    <span className="text-xs font-black text-orange-600 tracking-wider">ALL FEATURES INCLUDED</span>
                    <Check className="h-4 w-4 text-orange-600" />
                  </div>
                  
                  <h1 className="text-5xl font-black text-gray-900">
                    Ready to Get Started?
                  </h1>
                </div>
                
                {/* Pricing */}
                <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-8 rounded-2xl border border-orange-200">
                  <p className="text-xl font-bold text-gray-700 text-center mb-4">
                    Free for the first month, then
                  </p>
                  <p className="text-6xl font-black text-transparent bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-center mb-4">
                    £7.99/mo
                  </p>
                  <div className="flex items-center justify-center gap-6 text-sm font-bold text-gray-600">
                    <span>Live in 30 days</span>
                    <span>•</span>
                    <span>Cancel anytime</span>
                  </div>
                </div>
                
                {/* CTA */}
                <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-pink-600 p-1 rounded-full shadow-xl">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-10 py-5 rounded-full">
                    <div className="flex items-center justify-center gap-3">
                      <Sparkles className="h-6 w-6 text-white" />
                      <span className="text-2xl font-black text-white">Start free — then £7.99/mo</span>
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-center gap-2">
                  <Image src="/ptboost_logo-nobg.png" alt="PTBoost" width={32} height={32} className="object-contain" />
                  <p className="text-sm font-bold text-gray-500">
                    PTBoost.co.uk • For UK Personal Trainers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 5: Split Screen Elegant
    {
      id: 5,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full flex">
            {/* Left side - Dark */}
            <div className="w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 p-12 flex flex-col justify-center">
              <div className="space-y-8">
                <h2 className="text-6xl font-black text-white leading-tight">
                  First<br/>
                  Month<br/>
                  <span className="text-orange-400">Free</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white">
                    <Check className="h-6 w-6 text-orange-400" />
                    <p className="text-xl font-bold">All features</p>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <Check className="h-6 w-6 text-orange-400" />
                    <p className="text-xl font-bold">Live in 30 days</p>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <Check className="h-6 w-6 text-orange-400" />
                    <p className="text-xl font-bold">Cancel anytime</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Light */}
            <div className="w-1/2 bg-gradient-to-br from-orange-50 to-pink-50 p-12 flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                  <p className="text-lg font-bold text-gray-600 mb-3">Then just</p>
                  <p className="text-7xl font-black text-transparent bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text">
                    £7.99
                  </p>
                  <p className="text-2xl font-bold text-gray-600 mt-2">per month</p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 rounded-full shadow-xl">
                  <p className="text-xl font-black text-white text-center">
                    Start Free Today
                  </p>
                </div>
                
                <p className="text-sm font-bold text-gray-500 text-center">
                  PTBoost.co.uk
                </p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 6: Neumorphism Style
    {
      id: 6,
      bg: "bg-gray-200",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12">
            <div className="bg-gray-200 p-12 rounded-[3rem] max-w-2xl" 
              style={{ 
                boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff' 
              }}>
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-gray-200 px-6 py-3 rounded-full mb-6"
                    style={{ 
                      boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff' 
                    }}>
                    <Check className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-black text-gray-700">All Features Included</span>
                    <Check className="h-5 w-5 text-orange-600" />
                  </div>
                  
                  <h1 className="text-6xl font-black text-gray-800 mb-6">
                    Ready to Get Started?
                  </h1>
                </div>
                
                <div className="bg-gray-200 p-8 rounded-2xl"
                  style={{ 
                    boxShadow: 'inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff' 
                  }}>
                  <p className="text-xl font-bold text-gray-700 text-center mb-4">
                    Free for the first month
                  </p>
                  <p className="text-5xl font-black text-orange-600 text-center mb-4">
                    £7.99/month
                  </p>
                  <p className="text-sm font-bold text-gray-600 text-center">
                    Live in 30 days • Cancel anytime
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-10 py-5 rounded-full"
                  style={{ 
                    boxShadow: '10px 10px 20px #bebebe, -10px -10px 20px #ffffff' 
                  }}>
                  <p className="text-2xl font-black text-white text-center">
                    Start free — then £7.99/mo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 7: Magazine Premium
    {
      id: 7,
      bg: "bg-white",
      content: (
        <>
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1080&h=1080&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="relative z-10 h-full flex flex-col p-12">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-2">
                <Image src="/ptboost_logo-nobg.png" alt="PTBoost" width={28} height={28} className="object-contain" />
                <div>
                  <p className="text-xs font-black text-orange-600 tracking-[0.3em]">PTBOOST</p>
                  <p className="text-xs font-bold text-gray-500">DIGITAL EDITION • 2025</p>
                </div>
              </div>
              <div className="bg-orange-600 text-white px-4 py-2 text-xs font-black rotate-3">
                OFFER
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto text-center space-y-10">
              <div>
                <div className="inline-block bg-gray-50 border-2 border-gray-900 px-6 py-2 mb-6">
                  <p className="text-sm font-black text-gray-900">EXCLUSIVE LAUNCH OFFER</p>
                </div>
                
                <h1 className="text-7xl font-black text-gray-900 leading-[0.95] mb-6">
                  FIRST<br/>
                  MONTH<br/>
                  FREE
                </h1>
                
                <div className="w-32 h-1 bg-orange-600 mx-auto mb-8" />
                
                <p className="text-2xl font-bold text-gray-700 leading-tight">
                  Professional websites for UK personal trainers
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border-2 border-gray-900 p-6">
                  <p className="text-4xl font-black text-orange-600 mb-2">£0</p>
                  <p className="text-xs font-bold text-gray-600">MONTH 1</p>
                </div>
                <div className="bg-orange-600 border-2 border-gray-900 p-6">
                  <p className="text-4xl font-black text-white mb-2">£8</p>
                  <p className="text-xs font-bold text-white">AFTER</p>
                </div>
                <div className="bg-white border-2 border-gray-900 p-6">
                  <p className="text-4xl font-black text-orange-600 mb-2">30</p>
                  <p className="text-xs font-bold text-gray-600">DAYS</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 px-8 py-5 text-center">
              <p className="text-xl font-black text-white">START FREE TODAY</p>
            </div>
          </div>
        </>
      )
    },

    // AD 8: Gradient Overlay Modern
    {
      id: 8,
      bg: "bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500",
      content: (
        <>
          <div className="h-full flex flex-col justify-between p-12 relative">
            {/* Floating orbs */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-black/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-full border border-white/30">
                <Check className="h-5 w-5 text-white" />
                <span className="text-sm font-black text-white">All Features Included</span>
                <Check className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div className="relative z-10 text-center space-y-10">
              <h1 className="text-8xl font-black text-white leading-none drop-shadow-2xl">
                First Month<br/>
                On Us
              </h1>
              
              <div className="bg-white/20 backdrop-blur-2xl border border-white/30 p-10 rounded-3xl max-w-2xl mx-auto shadow-2xl">
                <div className="space-y-6">
                  <p className="text-2xl font-bold text-white">
                    Then just £7.99/month
                  </p>
                  
                  <div className="h-px bg-white/30" />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3 text-white font-bold text-lg">
                      <Check className="h-5 w-5" />
                      <span>Live in 30 days</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-white font-bold text-lg">
                      <Check className="h-5 w-5" />
                      <span>Cancel anytime</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-white font-bold text-lg">
                      <Check className="h-5 w-5" />
                      <span>All features included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="bg-white px-10 py-6 rounded-full shadow-2xl">
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="h-6 w-6 text-violet-600" />
                  <span className="text-2xl font-black text-gray-900">Start Free Today</span>
                  <ArrowRight className="h-6 w-6 text-violet-600" />
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 9: Clean Typographic
    {
      id: 9,
      bg: "bg-gray-50",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-16 text-center space-y-12">
            <div className="space-y-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full border-2 border-orange-500 shadow-lg">
                <Check className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-black text-gray-900">ALL FEATURES INCLUDED</span>
                <Check className="h-5 w-5 text-orange-600" />
              </div>
              
              <h1 className="text-9xl font-black text-gray-900 leading-none">
                £0
              </h1>
              
              <p className="text-3xl font-bold text-gray-700">
                for your first month
              </p>
              
              <div className="h-px bg-gray-300 max-w-md mx-auto" />
              
              <div className="space-y-4">
                <p className="text-2xl font-bold text-gray-600">
                  Then £7.99/month
                </p>
                <p className="text-lg font-bold text-gray-500">
                  Live in 30 days • Cancel anytime
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-12 py-6 rounded-full shadow-xl inline-block">
                <p className="text-3xl font-black text-white">
                  Start Free →
                </p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 10: Tech Startup Style
    {
      id: 10,
      bg: "bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12 relative overflow-hidden">
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
            
            <div className="relative z-10 text-center space-y-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-full border border-white/30">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-black text-white">LIVE OFFER</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-7xl font-black text-white leading-none">
                  START<br/>
                  FOR FREE
                </h1>
                
                <p className="text-2xl font-bold text-white/90">
                  Get your professional PT website
                </p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-2xl border border-white/30 p-10 rounded-3xl">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-6xl font-black text-white mb-2">£0</p>
                      <p className="text-sm font-bold text-white/80">First Month</p>
                    </div>
                    <div>
                      <p className="text-6xl font-black text-white mb-2">£8</p>
                      <p className="text-sm font-bold text-white/80">After</p>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/30" />
                  
                  <p className="text-lg font-bold text-white">
                    Live in 30 days • Cancel anytime
                  </p>
                </div>
              </div>
              
              <div className="bg-white px-10 py-6 rounded-full shadow-2xl">
                <p className="text-2xl font-black text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text">
                  Get Started Now
                </p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 11: Luxury Gold
    {
      id: 11,
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12 relative">
            {/* Gold accents */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-600/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center space-y-10 max-w-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-600" />
                  <Star className="h-6 w-6 text-yellow-600 fill-yellow-600" />
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-600" />
                </div>
                
                <div className="inline-flex items-center gap-2 border-2 border-yellow-600 px-6 py-3 rounded-full">
                  <span className="text-sm font-black text-yellow-600 tracking-widest">PREMIUM OFFER</span>
                </div>
              </div>
              
              <h1 className="text-7xl font-bold text-white leading-tight" style={{ fontFamily: 'serif' }}>
                First Month<br/>
                <span className="text-yellow-600">Complimentary</span>
              </h1>
              
              <div className="border-2 border-yellow-600/30 bg-white/5 backdrop-blur-xl p-10 rounded-2xl">
                <div className="space-y-6">
                  <p className="text-2xl font-bold text-white">
                    Subsequently £7.99 per month
                  </p>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent" />
                  
                  <div className="space-y-3 text-white/80 font-bold">
                    <p>✓ Deployed within 30 days</p>
                    <p>✓ Flexible cancellation</p>
                    <p>✓ Complete feature access</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 px-10 py-5 rounded-full border-2 border-yellow-400">
                <p className="text-2xl font-black text-gray-900">
                  Commence Trial
                </p>
              </div>
              
              <p className="text-xs text-yellow-600 font-bold tracking-widest">PTBOOST.CO.UK</p>
            </div>
          </div>
        </>
      )
    },

    // AD 12: Soft Pastel Modern
    {
      id: 12,
      bg: "bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12">
            <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl max-w-2xl border border-white">
              <div className="space-y-8 text-center">
                <div className="inline-flex items-center gap-2 bg-orange-100 px-6 py-3 rounded-full border border-orange-200">
                  <Check className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-black text-orange-900">All Features Included</span>
                  <Check className="h-5 w-5 text-orange-600" />
                </div>
                
                <h1 className="text-6xl font-black text-gray-900 leading-tight">
                  Ready to<br/>Get Started?
                </h1>
                
                <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-8 rounded-2xl border border-orange-200">
                  <p className="text-lg font-bold text-gray-700 mb-4">
                    Free for the first month, then
                  </p>
                  <div className="flex items-end justify-center gap-2 mb-4">
                    <span className="text-7xl font-black text-transparent bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text">£7.99</span>
                    <span className="text-2xl font-bold text-gray-600 pb-3">/mo</span>
                  </div>
                  <p className="text-base font-bold text-gray-600">
                    Live in 30 days • Cancel anytime
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-1 rounded-full">
                  <div className="bg-white px-10 py-5 rounded-full">
                    <div className="flex items-center justify-center gap-3">
                      <Sparkles className="h-6 w-6 text-orange-600" />
                      <span className="text-2xl font-black text-transparent bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text">
                        Start free — then £7.99/mo
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <Image src="/ptboost_logo-nobg.png" alt="PTBoost" width={32} height={32} className="object-contain" />
                  <p className="text-sm font-bold text-gray-500">
                    PTBoost.co.uk • For UK Personal Trainers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 13: Bold Statement
    {
      id: 13,
      bg: "bg-orange-600",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12 text-center space-y-12">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-full border border-white/30">
                <Check className="h-5 w-5 text-white" />
                <span className="text-sm font-black text-white">ALL FEATURES INCLUDED</span>
                <Check className="h-5 w-5 text-white" />
              </div>
              
              <h1 className="text-9xl font-black text-white leading-none">
                £0
              </h1>
              
              <p className="text-4xl font-black text-white">
                FIRST MONTH
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-2xl border-2 border-white/30 p-10 rounded-3xl max-w-2xl">
              <div className="space-y-6">
                <p className="text-3xl font-black text-white">
                  Then £7.99/month
                </p>
                
                <div className="h-1 bg-white/30" />
                
                <div className="space-y-3 text-xl font-bold text-white">
                  <p>✓ Live in 30 days</p>
                  <p>✓ Cancel anytime</p>
                  <p>✓ Full access</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white px-12 py-6 rounded-full shadow-2xl">
              <p className="text-3xl font-black text-orange-600">
                START FREE NOW
              </p>
            </div>
          </div>
        </>
      )
    },

    // AD 14: Minimalist Grid
    {
      id: 14,
      bg: "bg-white",
      content: (
        <>
          <div className="h-full p-12">
            <div className="h-full grid grid-cols-12 grid-rows-12 gap-4">
              {/* Header */}
              <div className="col-span-12 row-span-2 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 border-2 border-gray-900 px-6 py-3 rounded-full">
                  <Check className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-black text-gray-900">ALL FEATURES</span>
                  <Check className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              
              {/* Main content */}
              <div className="col-span-12 row-span-6 flex items-center justify-center">
                <div className="text-center space-y-6">
                  <p className="text-2xl font-bold text-gray-600">First Month</p>
                  <h1 className="text-[150px] font-black text-gray-900 leading-none">FREE</h1>
                  <p className="text-3xl font-bold text-gray-700">Then £7.99/mo</p>
                </div>
              </div>
              
              {/* Features */}
              <div className="col-span-4 row-span-2 bg-orange-50 rounded-xl flex items-center justify-center">
                <p className="text-sm font-bold text-gray-900 text-center">Live in<br/>30 days</p>
              </div>
              <div className="col-span-4 row-span-2 bg-orange-50 rounded-xl flex items-center justify-center">
                <p className="text-sm font-bold text-gray-900 text-center">Cancel<br/>anytime</p>
              </div>
              <div className="col-span-4 row-span-2 bg-orange-50 rounded-xl flex items-center justify-center">
                <p className="text-sm font-bold text-gray-900 text-center">All<br/>features</p>
              </div>
              
              {/* CTA */}
              <div className="col-span-12 row-span-2 flex items-center justify-center">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-12 py-5 rounded-full">
                  <p className="text-2xl font-black text-white">START FREE</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 15: Dark Gradient Premium
    {
      id: 15,
      bg: "bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12 relative">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
            
            <div className="relative z-10 text-center space-y-10 max-w-2xl">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20">
                  <Check className="h-5 w-5 text-orange-400" />
                  <span className="text-sm font-black text-white">All Features Included</span>
                  <Check className="h-5 w-5 text-orange-400" />
                </div>
                
                <h1 className="text-8xl font-black text-white leading-none">
                  Try Free for<br/>30 Days
                </h1>
              </div>
              
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <p className="text-6xl font-black text-orange-400 mb-2">£0</p>
                      <p className="text-sm font-bold text-white/80">Month 1</p>
                    </div>
                    <div className="text-center">
                      <p className="text-6xl font-black text-white mb-2">£8</p>
                      <p className="text-sm font-bold text-white/80">After</p>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/20" />
                  
                  <div className="space-y-2 text-white font-bold">
                    <p>✓ Live in 30 days</p>
                    <p>✓ Cancel anytime</p>
                    <p>✓ Full feature access</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-10 py-6 rounded-full shadow-2xl">
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="h-6 w-6 text-white" />
                  <span className="text-2xl font-black text-white">Start Free Trial</span>
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 16: High Fashion Editorial
    {
      id: 16,
      bg: "bg-zinc-100",
      content: (
        <>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1080&h=1080&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%)',
            }}
          />
          
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <div className="space-y-2">
              <p className="text-xs font-black tracking-[0.5em] text-gray-900">PTBOOST</p>
              <p className="text-xs font-bold text-gray-500">2025 COLLECTION</p>
            </div>
            
            <div className="text-center space-y-8 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-300">
                <Check className="h-4 w-4 text-orange-600" />
                <span className="text-xs font-black text-gray-900 tracking-wider">ALL FEATURES INCLUDED</span>
                <Check className="h-4 w-4 text-orange-600" />
              </div>
              
              <h1 className="text-7xl font-light text-gray-900 leading-tight tracking-tight">
                First Month<br/>
                <span className="font-bold">Complimentary</span>
              </h1>
              
              <div className="bg-white/90 backdrop-blur-sm p-8 border border-gray-300">
                <p className="text-xl font-light text-gray-700 mb-4">
                  Subsequently
                </p>
                <p className="text-5xl font-bold text-gray-900 mb-4">
                  £7.99
                </p>
                <p className="text-sm font-medium text-gray-600">
                  per month • cancel anytime
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-block border-2 border-gray-900 px-12 py-4">
                <p className="text-xl font-medium tracking-wider text-gray-900">
                  BEGIN
                </p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 17: Vibrant Pop
    {
      id: 17,
      bg: "bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-10 text-center space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full border-4 border-white shadow-xl">
                <Check className="h-6 w-6 text-orange-600 stroke-[3]" />
                <span className="text-sm font-black text-gray-900">ALL FEATURES!</span>
                <Check className="h-6 w-6 text-orange-600 stroke-[3]" />
              </div>
              
              <h1 className="text-9xl font-black text-white leading-none drop-shadow-2xl">
                FREE!
              </h1>
              
              <p className="text-3xl font-black text-white drop-shadow-lg">
                FIRST MONTH
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-2xl border-8 border-white/50 max-w-2xl">
              <div className="space-y-6">
                <p className="text-2xl font-black text-gray-900">
                  Then just £7.99/month!
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-100 p-4 rounded-xl border-4 border-orange-300">
                    <p className="text-4xl font-black text-orange-600">30</p>
                    <p className="text-sm font-bold text-gray-700">DAYS</p>
                  </div>
                  <div className="bg-orange-100 p-4 rounded-xl border-4 border-orange-300">
                    <p className="text-4xl font-black text-orange-600">£8</p>
                    <p className="text-sm font-bold text-gray-700">AFTER</p>
                  </div>
                </div>
                
                <p className="text-lg font-black text-gray-700">
                  CANCEL ANYTIME!
                </p>
              </div>
            </div>
            
            <div className="bg-white px-12 py-6 rounded-full border-8 border-white/50 shadow-2xl">
              <p className="text-3xl font-black text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                START NOW! 🚀
              </p>
            </div>
          </div>
        </>
      )
    },

    // AD 18: Elegant Serif
    {
      id: 18,
      bg: "bg-gradient-to-br from-neutral-100 to-stone-200",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12">
            <div className="max-w-2xl text-center space-y-10">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-16 bg-orange-600" />
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <div className="h-px w-16 bg-orange-600" />
                </div>
                
                <div className="inline-flex items-center gap-2 border-2 border-gray-900 px-6 py-3">
                  <span className="text-xs font-bold text-gray-900 tracking-widest">EXCLUSIVE OFFER</span>
                </div>
              </div>
              
              <h1 className="text-7xl font-serif font-bold text-gray-900 leading-tight">
                First Month<br/>
                Complimentary
              </h1>
              
              <div className="bg-white p-10 border-4 border-gray-900 shadow-xl">
                <div className="space-y-6">
                  <p className="text-2xl font-serif text-gray-700">
                    Thereafter
                  </p>
                  <p className="text-7xl font-serif font-bold text-orange-600">
                    £7.99
                  </p>
                  <p className="text-lg font-sans font-bold text-gray-600">
                    per month
                  </p>
                  
                  <div className="h-px bg-gray-300 my-6" />
                  
                  <div className="space-y-2 text-gray-700 font-serif">
                    <p>✓ Deployed in 30 days</p>
                    <p>✓ Flexible cancellation</p>
                    <p>✓ Complete access</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 px-10 py-5 border-4 border-gray-900">
                <p className="text-2xl font-serif font-bold text-white">
                  Commence Trial
                </p>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 19: Modern Card Stack
    {
      id: 19,
      bg: "bg-gradient-to-br from-slate-800 to-slate-900",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12">
            <div className="relative">
              {/* Background cards */}
              <div className="absolute inset-0 bg-white/10 rounded-3xl transform rotate-3 scale-95" />
              <div className="absolute inset-0 bg-white/5 rounded-3xl transform -rotate-3 scale-90" />
              
              {/* Main card */}
              <div className="relative bg-white rounded-3xl p-12 shadow-2xl max-w-2xl">
                <div className="space-y-8 text-center">
                  <div className="inline-flex items-center gap-2 bg-orange-100 px-6 py-3 rounded-full border border-orange-200">
                    <Check className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-black text-orange-900">All Features Included</span>
                    <Check className="h-5 w-5 text-orange-600" />
                  </div>
                  
                  <h1 className="text-6xl font-black text-gray-900">
                    Ready to Get<br/>Started?
                  </h1>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-8 rounded-2xl border-2 border-orange-200">
                    <p className="text-xl font-bold text-gray-700 mb-4">
                      Free for the first month
                    </p>
                    <div className="flex items-end justify-center gap-2 mb-4">
                      <span className="text-7xl font-black text-transparent bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text">
                        £7.99
                      </span>
                      <span className="text-2xl font-bold text-gray-600 pb-3">/mo</span>
                    </div>
                    <p className="text-base font-bold text-gray-600">
                      Live in 30 days • Cancel anytime
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-10 py-5 rounded-full shadow-xl">
                    <div className="flex items-center justify-center gap-3">
                      <Sparkles className="h-6 w-6 text-white" />
                      <span className="text-2xl font-black text-white">Start free — then £7.99/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },

    // AD 20: Ultimate Premium
    {
      id: 20,
      bg: "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900",
      content: (
        <>
          <div className="h-full flex flex-col justify-center items-center p-12 relative overflow-hidden">
            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 blur-3xl" />
            
            <div className="relative z-10 text-center space-y-10 max-w-3xl">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-orange-400" />
                  <Sparkles className="h-8 w-8 text-orange-400" />
                  <Sparkles className="h-6 w-6 text-orange-400" />
                </div>
                
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-8 py-4 rounded-full border border-white/20">
                  <Check className="h-6 w-6 text-orange-400" />
                  <span className="text-base font-black text-white tracking-wider">ALL FEATURES INCLUDED</span>
                  <Check className="h-6 w-6 text-orange-400" />
                </div>
                
                <h1 className="text-8xl font-black text-white leading-none">
                  First Month<br/>
                  <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Absolutely Free
                  </span>
                </h1>
              </div>
              
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-12 rounded-3xl">
                <div className="space-y-8">
                  <p className="text-3xl font-bold text-white">
                    Then just £7.99/month
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                      <p className="text-5xl font-black text-orange-400 mb-2">30</p>
                      <p className="text-sm font-bold text-white/80">Days Live</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                      <p className="text-5xl font-black text-pink-400 mb-2">£8</p>
                      <p className="text-sm font-bold text-white/80">After</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                      <p className="text-5xl font-black text-purple-400 mb-2">∞</p>
                      <p className="text-sm font-bold text-white/80">Features</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-white font-bold text-lg">
                    <div className="flex items-center justify-center gap-3">
                      <Check className="h-6 w-6 text-green-400" />
                      <span>Professional design</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Check className="h-6 w-6 text-green-400" />
                      <span>Cancel anytime</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Check className="h-6 w-6 text-green-400" />
                      <span>Full support</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 p-1 rounded-full shadow-2xl">
                <div className="bg-gradient-to-r from-orange-500 to-purple-500 px-12 py-6 rounded-full">
                  <div className="flex items-center justify-center gap-4">
                    <Sparkles className="h-8 w-8 text-white" />
                    <span className="text-3xl font-black text-white">Start Free — Then £7.99/mo</span>
                    <ArrowRight className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <Image src="/ptboost_logo-nobg.png" alt="PTBoost" width={36} height={36} className="object-contain" />
                <p className="text-sm font-bold text-white/60 tracking-widest">
                  PTBOOST.CO.UK • FOR UK PERSONAL TRAINERS
                </p>
              </div>
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
          <div className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-8 py-3 rounded-full mb-4">
            <p className="text-sm font-black">VERSION 3.0 • ULTRA PREMIUM</p>
          </div>
          <h1 className="text-5xl font-black text-white mb-4">Instagram Ad Gallery V3</h1>
          <p className="text-xl text-gray-400 font-bold">20 Ultra-Premium Designs • Highest Quality Yet</p>
          <p className="text-lg text-orange-400 font-bold mt-2">Incorporating Your Pricing CTA Style! ✨</p>
        </div>

        {/* Full View Gallery */}
        <div className="space-y-16">
          {ads.map((ad) => (
            <div key={ad.id} className="flex flex-col items-center">
              {/* Ad Number Label */}
              <div className="mb-6 flex items-center gap-4">
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-8 py-4 rounded-full font-black text-2xl shadow-xl">
                  Ad #{ad.id}
                </div>
                <div className="bg-gray-800 text-gray-300 px-6 py-3 rounded-full font-bold text-sm">
                  1080x1080px • Premium Quality
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
                <div className="mt-12 h-px w-full max-w-[600px] bg-gradient-to-r from-transparent via-purple-600 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center space-y-4">
          <div className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 px-8 py-4 rounded-full">
            <p className="text-2xl font-black text-white">20 Ultra-Premium Ads Ready ✓</p>
          </div>
          <p className="text-gray-400 font-bold">
            Highest Quality • Your Pricing Style • Perfect for Instagram
          </p>
          <p className="text-orange-400 font-bold">
            Total Collection: 60 Ads Across All 3 Galleries! 🎨
          </p>
        </div>
      </div>
    </div>
  )
}

