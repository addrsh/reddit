"use client";
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

const PricingSection = () => {
    return (
      <section id="pricing" className="bg-black py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-full px-4 py-2 mb-6">
              <TrendingUp className="w-4 h-4 text-orange-500 mr-2" />
              <span className="text-zinc-300 text-sm font-medium">Simple Pricing</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Start for 
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"> free</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Try Redditor for 14 days. No credit card required. Cancel anytime.
            </p>
          </div>
  
          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="p-8 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <p className="text-zinc-400 mb-6">Perfect for individuals</p>
              <div className="text-4xl font-bold text-white mb-6">
                Free
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  5 subreddits
                </li>
                <li className="flex items-center text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  100 mentions/month
                </li>
                <li className="flex items-center text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  Basic analytics
                </li>
              </ul>
              <button className="w-full border border-zinc-700 text-white py-3 rounded-full hover:bg-zinc-900 transition-all duration-300">
                Get Started
              </button>
            </div>
  
            {/* Pro */}
            <div className="p-8 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-2 border-orange-500 rounded-3xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-zinc-400 mb-6">For growing businesses</p>
              <div className="text-4xl font-bold text-white mb-6">
                $49<span className="text-lg text-zinc-400 font-normal">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  50 subreddits
                </li>
                <li className="flex items-center text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  5,000 mentions/month
                </li>
                <li className="flex items-center text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  Advanced analytics
                </li>
                <li className="flex items-center text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  Real-time alerts
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-black py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300">
                Start Free Trial
              </button>
            </div>
  
            {/* Enterprise */}
            <div className="p-8 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-zinc-400 mb-6">For large organizations</p>
              <div className="text-4xl font-bold text-white mb-6">
                Custom
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  Unlimited subreddits
                </li>
                <li className="flex items-center text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  Unlimited mentions
                </li>
                <li className="flex items-center text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  Custom integrations
                </li>
                <li className="flex items-center text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  Dedicated support
                </li>
              </ul>
              <button className="w-full border border-zinc-700 text-white py-3 rounded-full hover:bg-zinc-900 transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default PricingSection;