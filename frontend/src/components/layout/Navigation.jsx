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

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-zinc-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <MessageSquare className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold text-white">Redditor</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-zinc-400 hover:text-white transition-colors duration-300 font-medium">Features</a>
            <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors duration-300 font-medium">Pricing</a>
            <a href="#about" className="text-zinc-400 hover:text-white transition-colors duration-300 font-medium">About</a>
            <button className="text-zinc-400 hover:text-white transition-colors duration-300 font-medium">Sign In</button>
            <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-black px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 font-semibold">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-zinc-800 rounded-b-2xl">
            <div className="px-6 py-6 space-y-4">
              <a href="#features" className="block text-zinc-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="block text-zinc-400 hover:text-white transition-colors">Pricing</a>
              <a href="#about" className="block text-zinc-400 hover:text-white transition-colors">About</a>
              <hr className="border-zinc-800" />
              <button className="block w-full text-left text-zinc-400 hover:text-white transition-colors">Sign In</button>
              <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-black px-6 py-3 rounded-full font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;