import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Train, Search, FileText, CalendarCheck, Grid, X, Utensils, Hotel, Compass, BedDouble, User, HelpCircle } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);

  const mainTabs = [
    { id: 'home', label: 'Trains', icon: Train },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'pnr', label: 'PNR', icon: FileText },
    { id: 'bookings', label: 'Trips', icon: CalendarCheck },
  ];

  const moreServices = [
    { id: 'food', label: 'Food on Train', desc: 'e-Catering to your berth', icon: Utensils, color: 'text-amber-600 bg-amber-50' },
    { id: 'hotels', label: 'Rail Stays', desc: 'Rail Yatri Niwas & Hotels', icon: Hotel, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'tourism', label: 'Bharat Gaurav', desc: 'Holiday packages & luxury rails', icon: Compass, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'retiring-rooms', label: 'Retiring Rooms', desc: 'Station rest rooms & dorms', icon: BedDouble, color: 'text-blue-600 bg-blue-50' },
    { id: 'profile', label: 'My Account', desc: 'Profile & saved passengers', icon: User, color: 'text-purple-600 bg-purple-50' },
    { id: 'help', label: 'Support & 139', desc: 'FAQs & Rail Madad assist', icon: HelpCircle, color: 'text-slate-700 bg-slate-100' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      >
        <div className="grid grid-cols-5 h-16 max-w-lg mx-auto">
          {mainTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = currentPage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setMoreSheetOpen(false);
                  setCurrentPage(tab.id as any);
                }}
                className="flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors relative"
              >
                <div className={`p-1 rounded-xl transition-all ${isActive ? 'text-blue-700 bg-blue-50 scale-105' : 'text-slate-500'}`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className={`text-[10px] font-semibold tracking-tight mt-0.5 ${isActive ? 'text-blue-700 font-bold' : 'text-slate-500'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-700"></span>
                )}
              </button>
            );
          })}

          {/* More Services Trigger */}
          <button
            onClick={() => setMoreSheetOpen(!moreSheetOpen)}
            className="flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors relative"
          >
            <div className={`p-1 rounded-xl transition-all ${moreSheetOpen ? 'text-blue-700 bg-blue-50 scale-105' : 'text-slate-500'}`}>
              <Grid className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className={`text-[10px] font-semibold tracking-tight mt-0.5 ${moreSheetOpen ? 'text-blue-700' : 'text-slate-500'}`}>
              Services
            </span>
          </button>
        </div>
      </nav>

      {/* Services Action Drawer / Sheet for Mobile */}
      {moreSheetOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMoreSheetOpen(false)}
          ></div>

          {/* Sheet */}
          <div className="relative bg-white rounded-t-3xl border-t border-slate-200 shadow-2xl p-5 pb-8 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            {/* Grab handle */}
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4"></div>

            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Railway Services</h3>
                <p className="text-xs text-slate-500">Explore e-catering, station stays, and support</p>
              </div>
              <button
                onClick={() => setMoreSheetOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {moreServices.map(service => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => {
                      setCurrentPage(service.id as any);
                      setMoreSheetOpen(false);
                    }}
                    className="flex flex-col items-start p-3 rounded-2xl border border-slate-200/80 hover:border-blue-300 bg-slate-50/50 hover:bg-white text-left transition-all active:scale-[0.98]"
                  >
                    <div className={`p-2 rounded-xl mb-2 ${service.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">{service.label}</span>
                    <span className="text-[10px] text-slate-500 line-clamp-1">{service.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
