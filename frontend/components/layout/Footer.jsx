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

const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-800 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and description */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold text-white">Redditor</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              AI-powered Reddit intelligence for modern businesses.
            </p>
          </div>
          
          {/* Product links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Features</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">API</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">About</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Careers</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Support links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Status</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 mb-4 md:mb-0">
            © 2025 Redditor. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">Privacy</a>
            <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">Terms</a>
            <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;