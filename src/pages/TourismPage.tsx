import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_TOURISM_PACKAGES } from '../data/mockData';
import { TourismPackage } from '../types';
import {
  Compass,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  X,
  Clock,
  ArrowRight
} from 'lucide-react';

export const TourismPage: React.FC = () => {
  const { showToast } = useApp();
  const [selectedTour, setSelectedTour] = useState<TourismPackage | null>(null);
  const [bookedTour, setBookedTour] = useState<TourismPackage | null>(null);

  const handleBookPackage = (pkg: TourismPackage) => {
    setSelectedTour(null);
    setBookedTour(pkg);
    showToast(`Tour reservation initiated for ${pkg.title}!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            Dekho Apna Desh · Bharat Gaurav Tourist Trains
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Curated Indian Railway Holiday Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            All-inclusive rail tour packages covering scenic landscapes, royal heritage forts, and divine pilgrimage shrines across Incredible India.
          </p>
        </div>
      </div>

      {/* TOUR PACKAGES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_TOURISM_PACKAGES.map(pkg => (
          <div
            key={pkg.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                    {pkg.tourType}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {pkg.title}
                  </h3>
                </div>

                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl shrink-0">
                  {pkg.duration}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                {pkg.subtitle}
              </p>

              {/* Inclusions */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Package Inclusions
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {pkg.inclusions.slice(0, 4).map((inc, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & View Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block">Starting From</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                    ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{pkg.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedTour(pkg)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  Itinerary
                </button>
                <button
                  onClick={() => handleBookPackage(pkg)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-2xs"
                >
                  Book Tour
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ITINERARY MODAL */}
      {selectedTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setSelectedTour(null)} />
          <div className="relative bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full z-10 max-h-[85vh] overflow-y-auto space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase">{selectedTour.tourType}</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedTour.title}</h3>
                <p className="text-xs text-slate-500">{selectedTour.duration} · Departs from {selectedTour.departureCity}</p>
              </div>
              <button onClick={() => setSelectedTour(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Day-by-Day Itinerary</h4>
              <div className="space-y-3">
                {selectedTour.itinerary.map(item => (
                  <div key={item.day} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-1">
                    <span className="font-bold text-emerald-700">Day {item.day}: {item.title}</span>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Package Fare</span>
                <span className="text-lg font-extrabold text-slate-900">₹{selectedTour.pricePerPerson.toLocaleString('en-IN')} / Person</span>
              </div>
              <button
                onClick={() => handleBookPackage(selectedTour)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl"
              >
                Book Package Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMED TOUR MODAL */}
      {bookedTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setBookedTour(null)} />
          <div className="relative bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full z-10 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Tour Booking Registered
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">{bookedTour.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{bookedTour.duration}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-mono font-bold text-slate-900">BG-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Train Accommodation:</span>
                <span className="font-semibold text-slate-900">3-Tier AC Tourist Coach</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount:</span>
                <span className="font-bold text-emerald-700">₹{bookedTour.pricePerPerson}</span>
              </div>
            </div>

            <button
              onClick={() => setBookedTour(null)}
              className="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
