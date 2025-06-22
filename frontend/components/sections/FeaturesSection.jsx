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

const FeaturesSection = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Discovery",
      description: "AI finds the most relevant subreddits for your business automatically."
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Real-time Alerts",
      description: "Get notified instantly when your keywords are mentioned."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Deep Analytics",
      description: "Understand sentiment, engagement, and opportunity scoring."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Process millions of comments in seconds, not hours."
    }
  ];

  return (
    <section id="features" className="bg-black py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-zinc-300 text-sm font-medium">Powerful Features</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Everything you need to
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent block">
              dominate discussions
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Our AI-powered platform gives you the tools to find, monitor, and engage with your audience on Reddit.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;