import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STATIONS, POPULAR_ROUTES } from '../data/mockData';
import { Station, QuotaType, ClassCode } from '../types';
import {
  ArrowLeftRight,
  Calendar,
  Search,
  ShieldCheck,
  Zap,
  Clock,
  Radio,
  FileText,
  Utensils,
  CreditCard,
  BedDouble,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Building,
  Compass
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    fromStation,
    toStation,
    setFromStation,
    setToStation,
    swapStations,
    journeyDate,
    setJourneyDate,
    quota,
    setQuota,
    travelClass,
    setTravelClass,
    startSearch,
    setCurrentPage,
  } = useApp();

  const [fromSearchQuery, setFromSearchQuery] = useState('');
  const [toSearchQuery, setToSearchQuery] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [concessionChecked, setConcessionChecked] = useState(false);
  const [flexibleDateChecked, setFlexibleDateChecked] = useState(false);

  // Quick date helpers
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const dayAfterStr = dayAfter.toISOString().split('T')[0];

  const filteredFromStations = STATIONS.filter(
    s =>
      s.name.toLowerCase().includes(fromSearchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(fromSearchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(fromSearchQuery.toLowerCase())
  );

  const filteredToStations = STATIONS.filter(
    s =>
      s.name.toLowerCase().includes(toSearchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(toSearchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(toSearchQuery.toLowerCase())
  );

  const handleSelectFrom = (station: Station) => {
    setFromStation(station);
    setShowFromDropdown(false);
    setFromSearchQuery('');
  };

  const handleSelectTo = (station: Station) => {
    setToStation(station);
    setShowToDropdown(false);
    setToSearchQuery('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startSearch();
  };

  const quotas: { code: QuotaType; label: string; desc: string }[] = [
    { code: 'GN', label: 'General', desc: 'Standard reservation' },
    { code: 'TQ', label: 'Tatkal', desc: 'Emergency quota' },
    { code: 'LD', label: 'Ladies', desc: 'Reserved for solo women' },
    { code: 'SS', label: 'Senior Citizen', desc: 'Lower berth quota' },
  ];

  const classes: { code: ClassCode | 'ALL'; label: string }[] = [
    { code: 'ALL', label: 'All Classes' },
    { code: '1A', label: '1A (AC First)' },
    { code: '2A', label: '2A (AC 2 Tier)' },
    { code: '3A', label: '3A (AC 3 Tier)' },
    { code: '3E', label: '3E (AC 3 Economy)' },
    { code: 'CC', label: 'CC (Chair Car)' },
    { code: 'SL', label: 'SL (Sleeper)' },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-900 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-3xl sm:rounded-b-[2.5rem] shadow-xl">
        {/* Subtle decorative railway tracks grid pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="max-w-5xl mx-auto relative z-10 space-y-6">
          {/* Hero Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-800/60 border border-blue-400/30 text-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Ultra-fast train ticketing & real-time seat availability
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Where are you traveling today?
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-lg mx-auto">
              Clean booking experience with instant Tatkal access, confirmation forecast, and 0% delay UI.
            </p>
          </div>

          {/* MAIN SEARCH CARD */}
          <div className="bg-white text-slate-900 rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200/80">
            <form onSubmit={handleSearchSubmit} className="space-y-5">
              {/* STATIONS: From, Swap, To */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
                {/* FROM STATION */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    From Station
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowFromDropdown(true);
                      setShowToDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 bg-slate-50 border border-slate-300 hover:border-blue-600 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base sm:text-lg text-slate-900">
                          {fromStation?.city || 'Select Station'}
                        </span>
                        <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-1.5 py-0.5 rounded">
                          {fromStation?.code}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate max-w-[220px]">
                        {fromStation?.name}
                      </p>
                    </div>
                  </button>

                  {/* Dropdown */}
                  {showFromDropdown && (
                    <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95">
                      <div className="relative mb-2">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          autoFocus
                          placeholder="Search station or city (e.g. Mumbai, MMCT)"
                          value={fromSearchQuery}
                          onChange={e => setFromSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {filteredFromStations.map(station => (
                          <div
                            key={station.code}
                            onClick={() => handleSelectFrom(station)}
                            className="p-2 rounded-xl hover:bg-slate-100 cursor-pointer flex items-center justify-between text-xs"
                          >
                            <div>
                              <div className="font-bold text-slate-900">{station.name}</div>
                              <div className="text-[10px] text-slate-500">{station.state}</div>
                            </div>
                            <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                              {station.code}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* SWAP BUTTON */}
                <div className="flex justify-center -my-1 md:my-0 md:pt-5">
                  <button
                    type="button"
                    onClick={swapStations}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 border border-slate-200 flex items-center justify-center transition-transform hover:rotate-180 duration-300 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    title="Swap From and To stations"
                    aria-label="Swap Stations"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                </div>

                {/* TO STATION */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    To Station
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowToDropdown(true);
                      setShowFromDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 bg-slate-50 border border-slate-300 hover:border-blue-600 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base sm:text-lg text-slate-900">
                          {toStation?.city || 'Select Destination'}
                        </span>
                        <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-1.5 py-0.5 rounded">
                          {toStation?.code}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate max-w-[220px]">
                        {toStation?.name}
                      </p>
                    </div>
                  </button>

                  {/* Dropdown */}
                  {showToDropdown && (
                    <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95">
                      <div className="relative mb-2">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          autoFocus
                          placeholder="Search destination station (e.g. Delhi, NDLS)"
                          value={toSearchQuery}
                          onChange={e => setToSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {filteredToStations.map(station => (
                          <div
                            key={station.code}
                            onClick={() => handleSelectTo(station)}
                            className="p-2 rounded-xl hover:bg-slate-100 cursor-pointer flex items-center justify-between text-xs"
                          >
                            <div>
                              <div className="font-bold text-slate-900">{station.name}</div>
                              <div className="text-[10px] text-slate-500">{station.state}</div>
                            </div>
                            <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                              {station.code}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* DATE, CLASS, QUOTA GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                {/* DATE SELECTOR */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    Journey Date
                  </label>
                  <div className="space-y-2">
                    <input
                      type="date"
                      value={journeyDate}
                      min={todayStr}
                      onChange={e => setJourneyDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                    {/* Quick Date Pills */}
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setJourneyDate(todayStr)}
                        className={`text-[10px] px-2 py-1 rounded-lg font-semibold transition-colors ${
                          journeyDate === todayStr
                            ? 'bg-blue-700 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => setJourneyDate(tomorrowStr)}
                        className={`text-[10px] px-2 py-1 rounded-lg font-semibold transition-colors ${
                          journeyDate === tomorrowStr
                            ? 'bg-blue-700 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Tomorrow
                      </button>
                      <button
                        type="button"
                        onClick={() => setJourneyDate(dayAfterStr)}
                        className={`text-[10px] px-2 py-1 rounded-lg font-semibold transition-colors ${
                          journeyDate === dayAfterStr
                            ? 'bg-blue-700 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Day After
                      </button>
                    </div>
                  </div>
                </div>

                {/* CLASS SELECTOR */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Travel Class
                  </label>
                  <select
                    value={travelClass}
                    onChange={e => setTravelClass(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    {classes.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-400 mt-1">AC, Sleeper & Chair Car</p>
                </div>

                {/* QUOTA SELECTOR */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Reservation Quota
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {quotas.map(q => {
                      const isSelected = quota === q.code;
                      return (
                        <button
                          key={q.code}
                          type="button"
                          onClick={() => setQuota(q.code)}
                          className={`p-2 rounded-xl text-left border transition-all ${
                            isSelected
                              ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <div className="text-xs">{q.label}</div>
                          <div className="text-[9px] text-slate-400 font-normal truncate">{q.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CONCESSION & OPTIONS */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={flexibleDateChecked}
                      onChange={e => setFlexibleDateChecked(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-600"
                    />
                    <span>Flexible with date</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={concessionChecked}
                      onChange={e => setConcessionChecked(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-600"
                    />
                    <span>Senior citizen / concession berth</span>
                  </label>
                </div>

                {/* SEARCH CTA */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-700/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Search Trains</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Quick Railway Services
            </h2>
            <span className="text-xs text-blue-700 font-medium">1-Tap Actions</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-4">
            {[
              { id: 'pnr', label: 'PNR Status', icon: FileText, color: 'text-blue-700 bg-blue-50' },
              { id: 'live-status', label: 'Live Train', icon: Radio, color: 'text-emerald-700 bg-emerald-50' },
              { id: 'bookings', label: 'My Bookings', icon: CreditCard, color: 'text-indigo-700 bg-indigo-50' },
              { id: 'food', label: 'Food on Train', icon: Utensils, color: 'text-amber-700 bg-amber-50' },
              { id: 'retiring-rooms', label: 'Retiring Rooms', icon: BedDouble, color: 'text-purple-700 bg-purple-50' },
              { id: 'tourism', label: 'Bharat Gaurav', icon: Compass, color: 'text-rose-700 bg-rose-50' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as any)}
                  className="flex flex-col items-center p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-center group cursor-pointer"
                >
                  <div className={`w-11 h-11 rounded-2xl ${item.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-2xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES WITH 1-CLICK SEARCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Popular Railway Corridors
            </h2>
            <p className="text-xs text-slate-500">Tap any route to view instant trains & live fares</p>
          </div>
          <button
            onClick={() => setCurrentPage('search')}
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Explore All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {POPULAR_ROUTES.map(route => (
            <div
              key={`${route.fromCode}-${route.toCode}`}
              onClick={() => {
                const fromS = STATIONS.find(s => s.code === route.fromCode);
                const toS = STATIONS.find(s => s.code === route.toCode);
                startSearch(fromS, toS);
              }}
              className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  <span>{route.fromCity}</span>
                  <span className="text-slate-400">→</span>
                  <span>{route.toCity}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                  <span>{route.trainCount} Daily Expresses</span>
                  <span>·</span>
                  <span>Fastest {route.duration}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Fares From</span>
                <span className="text-sm font-extrabold text-emerald-700">₹{route.minFare}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRAVEL SERVICES CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Integrated Travel Services
          </h2>
          <p className="text-xs text-slate-500">Complete end-to-end railway ecosystem under one roof</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'e-Catering Meals',
              desc: 'Hot restaurant food delivered to your coach berth from verified IRCTC vendor kitchens.',
              action: 'Order Meals',
              page: 'food',
              badge: 'Delivered at Seat',
              icon: Utensils,
            },
            {
              title: 'Rail Yatri Niwas',
              desc: 'Official IRCTC station hotels and executive lounges located inside or adjacent to railway stations.',
              action: 'Book Stays',
              page: 'hotels',
              badge: 'Near Platforms',
              icon: Building,
            },
            {
              title: 'Bharat Gaurav Tours',
              desc: 'Curated pilgrimage, scenic wildlife, and cultural train holiday packages across India.',
              action: 'Explore Packages',
              page: 'tourism',
              badge: 'All-Inclusive',
              icon: Compass,
            },
            {
              title: 'Station Retiring Rooms',
              desc: 'Affordable 12-hour and 24-hour AC rooms and clean dormitory beds for transit passengers.',
              action: 'Book Rooms',
              page: 'retiring-rooms',
              badge: 'From ₹220',
              icon: BedDouble,
            },
          ].map(service => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{service.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{service.desc}</p>
                </div>

                <button
                  onClick={() => setCurrentPage(service.page as any)}
                  className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center justify-between group cursor-pointer"
                >
                  <span>{service.action}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY IRCTC REIMAGINED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Product Design Philosophy
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Why IRCTC Reimagined?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Transforming India's largest travel booking gateway into an accessible, lightning-fast platform designed for everyday passengers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {[
              {
                title: 'Zero Latency Search',
                desc: 'Instant station filtering and route queries with zero lag or timeout errors.',
                icon: Zap,
              },
              {
                title: 'Mobile First Ergonomics',
                desc: 'Thumb-friendly touch targets, uncluttered layouts, and bottom navigation.',
                icon: ShieldCheck,
              },
              {
                title: 'Confirmation Forecast',
                desc: 'Clear RAC and Waitlist confirmation indicators with live charts update.',
                icon: TrendingUp,
              },
              {
                title: 'Instant Refund Engine',
                desc: 'Transparent cancellation calculation and immediate simulated refund processing.',
                icon: Clock,
              },
            ].map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <Icon className="w-5 h-5 text-blue-400" />
                  <h4 className="font-bold text-sm text-white">{f.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IMPORTANT RAILWAY NOTICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <h4 className="font-bold text-amber-900">Passenger Travel Advisory & Tatkal Hours</h4>
            <p className="text-amber-800 leading-relaxed">
              AC Tatkal booking opens at 10:00 AM IST and Non-AC at 11:00 AM IST daily. Please ensure photo identification is carried by all passengers during travel. Charts are prepared 4 hours prior to train departure.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
