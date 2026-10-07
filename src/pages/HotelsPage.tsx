import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_HOTELS } from '../data/mockData';
import { Hotel } from '../types';
import {
  Hotel as HotelIcon,
  Search,
  MapPin,
  Star,
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  Building,
  Sparkles,
  X
} from 'lucide-react';

export const HotelsPage: React.FC = () => {
  const { showToast } = useApp();
  const [cityFilter, setCityFilter] = useState('All');
  const [bookedHotel, setBookedHotel] = useState<Hotel | null>(null);

  const cities = ['All', 'New Delhi', 'Mumbai', 'Varanasi', 'Bengaluru'];

  const filteredHotels = MOCK_HOTELS.filter(h => {
    if (cityFilter !== 'All' && h.city !== cityFilter) return false;
    return true;
  });

  const handleBook = (hotel: Hotel) => {
    setBookedHotel(hotel);
    showToast(`Reservation created for ${hotel.name}!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            IRCTC Rail Yatri Niwas & Stays
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Comfortable Railway Station Stays
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Verified hotels, executive transit lodges, and Rail Yatri Niwas with direct walkway access to railway platforms.
          </p>
        </div>

        {/* City Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-slate-400 font-semibold mr-1">Filter City:</span>
          {cities.map(c => (
            <button
              key={c}
              onClick={() => setCityFilter(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                cityFilter === c
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* HOTELS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHotels.map(hotel => (
          <div
            key={hotel.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  {hotel.tag && (
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      {hotel.tag}
                    </span>
                  )}
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    {hotel.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-xl shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="text-xs font-extrabold text-amber-900">{hotel.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-700">{hotel.distanceToStation}</span>
                <span>·</span>
                <span className="truncate">{hotel.city}</span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {hotel.address}
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {hotel.amenities.map((am, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-lg"
                  >
                    {am}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Booking Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                    ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{hotel.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">per night + taxes included</span>
              </div>

              <button
                onClick={() => handleBook(hotel)}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-2xs"
              >
                Book Stay
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CONFIRMED STAY MODAL */}
      {bookedHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setBookedHotel(null)} />
          <div className="relative bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full z-10 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Hotel Booking Confirmed
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">{bookedHotel.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{bookedHotel.distanceToStation}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-mono font-bold text-slate-900">RYN-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Check-in:</span>
                <span className="font-semibold text-slate-900">Tomorrow, 12:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Rate:</span>
                <span className="font-bold text-emerald-700">₹{bookedHotel.pricePerNight} (Paid Online)</span>
              </div>
            </div>

            <button
              onClick={() => setBookedHotel(null)}
              className="w-full py-2.5 bg-blue-700 text-white font-bold text-xs rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
