import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Train,
  Search,
  FileText,
  Radio,
  ShoppingBag,
  Compass,
  HelpCircle,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  CreditCard,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC<{ onOpenLogin: () => void }> = ({ onOpenLogin }) => {
  const {
    currentPage,
    setCurrentPage,
    unreadNotificationsCount,
    user,
    logoutUser,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Trains', icon: Train },
    { id: 'pnr', label: 'PNR Status', icon: FileText },
    { id: 'live-status', label: 'Live Status', icon: Radio },
    { id: 'bookings', label: 'My Bookings', icon: CreditCard },
    { id: 'food', label: 'Food', icon: ShoppingBag },
    { id: 'tourism', label: 'Tourism', icon: Compass },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* IRCTC Branding Header Line */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 sm:px-8 flex justify-between items-center tracking-wide font-medium">
        <div className="flex items-center gap-3">
          <span className="text-amber-400 font-semibold flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Official Redesign Concept
          </span>
          <span className="hidden sm:inline text-slate-400">·</span>
          <span className="hidden sm:inline text-slate-400">Indian Railway Catering & Tourism Corporation</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="hover:text-white cursor-pointer transition-colors" onClick={() => setCurrentPage('help')}>
            24x7 Rail Madad 139
          </span>
          <span>·</span>
          <span className="text-emerald-400 font-medium">Safe & Fast Travel</span>
        </div>
      </div>

      {/* Main Top Bar (Follows Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Mark */}
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
          aria-label="IRCTC Reimagined Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform duration-200">
            {/* Indian Railways Ashok / Wheel inspired sleek vector */}
            <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" opacity="0.3"/>
              <path d="M4 15.5C4 16.3 4.7 17 5.5 17L6 17L5 19L7 19L8 17L16 17L17 19L19 19L18 17L18.5 17C19.3 17 20 16.3 20 15.5L20 6.5C20 4.5 18 3 12 3C6 3 4 4.5 4 6.5L4 15.5ZM7 6C7 5.4 7.4 5 8 5L16 5C16.6 5 17 5.4 17 6L17 10C17 10.6 16.6 11 16 11L8 11C7.4 11 7 10.6 7 10L7 6ZM7.5 14C6.7 14 6 13.3 6 12.5C6 11.7 6.7 11 7.5 11C8.3 11 9 11.7 9 12.5C9 13.3 8.3 14 7.5 14ZM16.5 14C15.7 14 15 13.3 15 12.5C15 11.7 15.7 11 16.5 11C17.3 11 18 11.7 18 12.5C18 13.3 17.3 14 16.5 14Z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                IRCTC
              </span>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-1.5 py-0.2 rounded tracking-wide">
                REIMAGINED
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Indian Railways Fast Portal</p>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-blue-700 bg-blue-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Button */}
          <button
            onClick={() => setCurrentPage('notifications')}
            className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* User Account / Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/80 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {user.name.charAt(0)}
              </div>
              <span className="text-xs font-semibold text-slate-800 max-w-[100px] truncate hidden sm:inline">
                {user.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs text-slate-500">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">
                    🪙 {user.sbiPoints} Rail Reward Points
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => setCurrentPage('profile')}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>User Profile & Passengers</span>
                  </button>
                  <button
                    onClick={() => setCurrentPage('bookings')}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                  >
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    <span>My Bookings & History</span>
                  </button>
                  <button
                    onClick={() => setCurrentPage('food')}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                  >
                    <ShoppingBag className="w-4 h-4 text-slate-400" />
                    <span>e-Catering Meals</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      logoutUser();
                      onOpenLogin();
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-medium"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Switch / Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                setCurrentPage('retiring-rooms');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-medium text-slate-600 bg-slate-50 rounded-lg border border-slate-200"
            >
              Retiring Rooms
            </button>
            <button
              onClick={() => {
                setCurrentPage('hotels');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-medium text-slate-600 bg-slate-50 rounded-lg border border-slate-200"
            >
              Station Hotels
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
