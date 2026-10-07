import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, FileText, CheckCircle2, Clock, AlertTriangle, ArrowRight, RefreshCw, Download, Utensils, Info } from 'lucide-react';

export const PNRStatusPage: React.FC = () => {
  const { lookupPnr, pnrResult, searchedPnr, setViewingTicket, setCurrentPage, setFoodPnr, bookings } = useApp();
  const [inputPnr, setInputPnr] = useState(searchedPnr || '4827163950');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const samplePnrs = [
    { pnr: '4827163950', desc: '12951 Mumbai Rajdhani (CNF)' },
    { pnr: '6294018274', desc: '22436 Vande Bharat (CNF)' },
  ];

  const handleSearch = (pnrToSearch?: string) => {
    const target = (pnrToSearch || inputPnr).trim();
    if (!target) return;
    setInputPnr(target);
    setIsSearching(true);
    setHasSearched(true);

    setTimeout(() => {
      lookupPnr(target);
      setIsSearching(false);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      {/* PNR LOOKUP HERO */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-5 text-center">
        <div className="max-w-lg mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full">
            Indian Railways PNR Enquiry
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Check Real-Time PNR Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Verify reservation status, coach & berth allocations, and charting status instantly.
          </p>
        </div>

        {/* SEARCH BOX */}
        <div className="max-w-xl mx-auto">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <FileText className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                maxLength={10}
                value={inputPnr}
                onChange={e => setInputPnr(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 10-digit PNR Number"
                className="w-full pl-11 pr-4 py-3.5 bg-white text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-base font-bold tracking-wider placeholder:font-sans placeholder:tracking-normal placeholder:font-normal placeholder:text-slate-400 shadow-md"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>Get PNR Status</span>
            </button>
          </form>

          {/* Quick PNR Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs">
            <span className="text-slate-400 text-[11px]">Quick Samples:</span>
            {samplePnrs.map(sp => (
              <button
                key={sp.pnr}
                type="button"
                onClick={() => {
                  setInputPnr(sp.pnr);
                  handleSearch(sp.pnr);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 font-mono text-[11px] font-semibold border border-white/10 transition-colors"
              >
                {sp.pnr} ({sp.desc.split(' ')[1]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SKELETON LOADER */}
      {isSearching && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-1/3"></div>
          <div className="h-24 bg-slate-100 rounded-2xl"></div>
          <div className="h-32 bg-slate-100 rounded-2xl"></div>
        </div>
      )}

      {/* PNR RESULT FOUND */}
      {!isSearching && pnrResult && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Main Status Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  PNR {pnrResult.pnr}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                  {pnrResult.train.number} · {pnrResult.train.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Journey Date: <strong className="text-slate-800">{pnrResult.journeyDate}</strong> · Quota: {pnrResult.quota} · Class: {pnrResult.selectedClass.code}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    pnrResult.status === 'CONFIRMED'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {pnrResult.status}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  ✓ Chart Prepared
                </span>
              </div>
            </div>

            {/* Origin to Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-xs text-slate-400 font-medium">Boarding Station</span>
                <div className="text-base font-extrabold text-slate-900">
                  {pnrResult.train.departureTime}
                </div>
                <div className="text-xs font-bold text-slate-700">
                  {pnrResult.train.fromStation.name} ({pnrResult.train.fromStation.code})
                </div>
                <span className="text-[10px] text-blue-700 font-bold">Platform #1</span>
              </div>

              <div className="flex flex-col items-center justify-center text-center py-2 sm:py-0">
                <span className="text-[11px] text-slate-500 font-semibold">
                  {pnrResult.train.durationHours}h {pnrResult.train.durationMinutes}m
                </span>
                <div className="w-full flex items-center justify-center gap-2 my-1">
                  <div className="h-0.5 bg-slate-300 flex-1"></div>
                  <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="h-0.5 bg-slate-300 flex-1"></div>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-slate-400 font-medium">Destination Station</span>
                <div className="text-base font-extrabold text-slate-900">
                  {pnrResult.train.arrivalTime}
                </div>
                <div className="text-xs font-bold text-slate-700">
                  {pnrResult.train.toStation.name} ({pnrResult.train.toStation.code})
                </div>
              </div>
            </div>

            {/* Passenger Status Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Passenger Berth Allotments ({pnrResult.passengers.length})
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Live update from PRS server
                </span>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                {pnrResult.passengers.map((p, idx) => (
                  <div
                    key={p.id || idx}
                    className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900">
                        {idx + 1}. {p.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {p.age} Yrs · {p.gender.toUpperCase()} · Pref: {p.berthPreference.toUpperCase()}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-center">
                        <span className="text-[10px] text-emerald-700 font-bold block">Current Status</span>
                        <span className="text-xs sm:text-sm font-extrabold text-emerald-900">
                          {p.allottedCoach ? `${p.allottedCoach} / ${p.allottedBerth} (${p.berthPreference.toUpperCase()})` : 'CNF'}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">
                        {p.bookingStatus || 'CNF'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions for this PNR */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setFoodPnr(pnrResult.pnr);
                  setCurrentPage('food');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center justify-center gap-2"
              >
                <Utensils className="w-4 h-4" />
                <span>Order Food for this Berth</span>
              </button>

              <button
                onClick={() => setViewingTicket(pnrResult)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>View / Print E-Ticket</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOT FOUND STATE */}
      {!isSearching && hasSearched && !pnrResult && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">PNR Not Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No reservation record was found for PNR <span className="font-mono font-bold">{inputPnr}</span>. Please verify the 10-digit number or try one of the quick samples above.
            </p>
          </div>
          <button
            onClick={() => handleSearch('4827163950')}
            className="px-5 py-2.5 bg-blue-700 text-white text-xs font-bold rounded-xl"
          >
            Load Sample PNR (4827163950)
          </button>
        </div>
      )}
    </div>
  );
};
