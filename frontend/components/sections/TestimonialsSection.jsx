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


const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Growth Lead",
      company: "TechFlow",
      content: "Redditor increased our qualified leads by 400%. We now know exactly where our customers are discussing our industry.",
      rating: 5
    },
    {
      name: "Marcus Kim",
      role: "Founder",
      company: "DevTools",
      content: "The AI insights are incredible. We participate in conversations at the perfect moment and see real business results.",
      rating: 5
    },
    {
      name: "Emily Chen",
      role: "Marketing Director",
      company: "StartupAI",
      content: "Game-changer for community marketing. We went from guessing to knowing exactly where to focus our efforts.",
      rating: 5
    }
  ];

  return (
    <section className="bg-black py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-zinc-300 text-sm font-medium">Customer Stories</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Loved by 
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"> growth teams</span>
          </h2>
        </div>
        
        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group p-8 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2">
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-orange-500 fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-zinc-300 text-lg leading-relaxed mb-8 italic">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div>
                <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                <div className="text-zinc-400">{testimonial.role} at {testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
  
export default TestimonialsSection;