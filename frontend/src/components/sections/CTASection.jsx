
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

const CTASection = () => {
  return (
    <section className="bg-black py-32">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to grow with 
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent block">
              Reddit intelligence?
            </span>
          </h2>
          
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Join hundreds of companies using Redditor to find their audience and grow their business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            <button className="border border-zinc-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-900 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


export default CTASection;