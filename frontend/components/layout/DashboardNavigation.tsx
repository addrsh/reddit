"use client";
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Zap, 
  Bell, 
  BarChart3, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const DashboardNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error);
    }
    router.push('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-zinc-800' : 'bg-black/80'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <BarChart3 className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold text-white">Redditor</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors duration-300 font-medium">Dashboard</Link>
            <Link href="/dashboard/analytics" className="text-zinc-400 hover:text-white transition-colors duration-300 font-medium">Analytics</Link>
            <Link href="/dashboard/settings" className="text-zinc-400 hover:text-white transition-colors duration-300 font-medium">Settings</Link>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors duration-300 font-medium"
            >
              <span>Logout</span>
              <LogOut className="w-4 h-4" />
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
              <Link href="/dashboard" className="block text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/dashboard/analytics" className="block text-zinc-400 hover:text-white transition-colors">Analytics</Link>
              <Link href="/dashboard/settings" className="block text-zinc-400 hover:text-white transition-colors">Settings</Link>
              <hr className="border-zinc-800" />
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 text-zinc-400 hover:text-white transition-colors py-2"
              >
                <span>Logout</span>
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavigation;
