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

const StatsSection = () => {
  const stats = [
    { number: "2M+", label: "Posts Analyzed" },
    { number: "10K+", label: "Communities" },
    { number: "99.9%", label: "Uptime" },
    { number: "500+", label: "Happy Customers" }
  ];

  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-zinc-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

  
export default StatsSection;
