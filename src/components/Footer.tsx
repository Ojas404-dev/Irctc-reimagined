import React from 'react';
import { useApp } from '../context/AppContext';
import { Train, PhoneCall, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-12 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Helpline Banner */}
        <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                <span>Rail Madad 24x7 Helpline: Dial 139</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                  Toll Free
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Security, Medical Emergency, Train Delay Enquiry & PNR Status via SMS
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('help')}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-semibold transition-colors shrink-0 self-start sm:self-auto"
          >
            Visit Help Center
          </button>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Train className="w-4 h-4 text-blue-400" />
              <span>IRCTC Reimagined</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              A modernized railway portal concept designed to make Indian train travel frictionless, fast, accessible, and delightful.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Dark Patterns · Simulated Prototype</span>
            </div>
          </div>

          {/* Col 2: Railway Services */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Bookings & Services</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">
                  Train Ticket Reservation
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('pnr')} className="hover:text-white transition-colors">
                  PNR Status & Charting
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('live-status')} className="hover:text-white transition-colors">
                  Live Train Running Tracking
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('food')} className="hover:text-white transition-colors">
                  e-Catering Food Delivery
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('retiring-rooms')} className="hover:text-white transition-colors">
                  Station Retiring Rooms & Dorms
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Stays & Tourism */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Tourism & Stays</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setCurrentPage('tourism')} className="hover:text-white transition-colors">
                  Bharat Gaurav Tourist Trains
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('hotels')} className="hover:text-white transition-colors">
                  Rail Yatri Niwas Hotels
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('tourism')} className="hover:text-white transition-colors">
                  Pilgrimage & Heritage Circuits
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('bookings')} className="hover:text-white transition-colors">
                  Ticket Cancellation & Refunds
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Help */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Support & Policies</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setCurrentPage('help')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('help')} className="hover:text-white transition-colors">
                  Tatkal Booking Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('help')} className="hover:text-white transition-colors">
                  Refund & Cancellation Matrix
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('help')} className="hover:text-white transition-colors">
                  Senior Citizen & Ladies Quota Rules
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            IRCTC Reimagined is an independent student redesign concept and is not an official IRCTC website. All railway booking flows are simulated for demonstration.
          </p>
          <div className="flex items-center gap-1 text-slate-400 shrink-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Indian Railway Travelers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
