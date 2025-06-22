
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Zap, 
  Bell, 
  BarChart3, 
  ArrowRight, 
  Menu, 
  X,
  Play,
  CheckCircle2,
  Star,
  Sparkles,
  Target,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
const HeroSection = () => {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-black to-amber-500/10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-orange-500 mr-2" />
          <span className="text-zinc-300 text-sm font-medium">AI-Powered Reddit Intelligence</span>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
          Turn Reddit into your
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent block">
            growth engine
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Discover where your audience talks. Monitor conversations. 
          Engage at the perfect moment. All powered by AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105">
            Start Free Trial
          </button>
          <button className="flex items-center justify-center border border-zinc-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-900 transition-all duration-300">
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center space-x-8 text-zinc-500 text-sm">
          <div className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
            No credit card required
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
            2-minute setup
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
            14-day free trial
          </div>
        </div>
      </div>
    </section>
  );
};


export default HeroSection;