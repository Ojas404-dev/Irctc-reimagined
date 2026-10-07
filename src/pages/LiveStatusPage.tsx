import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_TRAINS } from '../data/mockData';
import { Radio, Search, CheckCircle2, Clock, MapPin, AlertCircle, RefreshCw, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export const LiveStatusPage: React.FC = () => {
  const { searchedTrainNo, selectedLiveTrain, trackTrain, showToast } = useApp();
  const [query, setQuery] = useState(searchedTrainNo || '12951');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const quickTrains = [
    { no: '12951', name: 'Mumbai Tejas Rajdhani' },
    { no: '22436', name: 'Vande Bharat (Varanasi)' },
    { no: '12051', name: 'Jan Shatabdi (Goa)' },
    { no: '20607', name: 'Mysuru Vande Bharat' },
  ];

  const handleTrack = (trainQuery?: string) => {
    const target = (trainQuery || query).trim();
    if (!target) return;
    setQuery(target);
    setIsRefreshing(true);
    setTimeout(() => {
      const found = trackTrain(target);
      setIsRefreshing(false);
      if (found) {
        showToast(`Tracking ${target}`, 'success');
      } else {
        showToast(`Showing nearest match for ${target}`, 'info');
      }
    }, 350);
  };

  const train = selectedLiveTrain || MOCK_TRAINS[0];

  // Identify current station in route
  const currentStop =
    train.intermediateStations.find(s => s.status === 'current') ||
    train.intermediateStations[1] ||
    train.intermediateStations[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      {/* HEADER & SEARCH BAR */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-5 text-center">
        <div className="max-w-lg mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-400/10 px-3 py-1 rounded-full flex items-center justify-center gap-1.5 w-fit mx-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            GPS & Rail Signal Tracking
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Live Train Running Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time train positioning, station halts, speed, and expected arrival delays.
          </p>
        </div>

        {/* INPUT FORM */}
        <div className="max-w-xl mx-auto">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleTrack();
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <Radio className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Enter Train No. or Name (e.g. 12951, Rajdhani)"
                className="w-full pl-11 pr-4 py-3.5 bg-white text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base font-semibold shadow-md placeholder:font-normal placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              disabled={isRefreshing}
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isRefreshing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>Track Live</span>
            </button>
          </form>

          {/* Quick Trains */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs">
            <span className="text-slate-400 text-[11px]">Popular Trains:</span>
            {quickTrains.map(qt => (
              <button
                key={qt.no}
                type="button"
                onClick={() => {
                  setQuery(qt.no);
                  handleTrack(qt.no);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-semibold border border-white/10 transition-colors"
              >
                {qt.no} ({qt.name.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LIVE TRAIN STATUS CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
        {/* Top Train Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {train.number}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase">
                {train.type}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Speed: 114 km/h
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
              {train.name}
            </h2>
            <div className="text-xs text-slate-500 mt-0.5">
              {train.fromStation.name} ({train.fromStation.code}) → {train.toStation.name} ({train.toStation.code})
            </div>
          </div>

          <button
            onClick={() => handleTrack()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Updated Just Now</span>
          </button>
        </div>

        {/* CURRENT LOCATION HERO BANNER */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-2xl p-5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Current Train Position
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-300" />
              <span>{currentStop.station.name} ({currentStop.station.code})</span>
            </div>
            <p className="text-xs text-blue-100">
              Departed on schedule · Platform #{currentStop.platform || '1'}
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-xl p-3 sm:text-right shrink-0">
            <span className="text-[10px] text-blue-200 block uppercase font-bold">Running Delay</span>
            <span className="text-base font-extrabold text-emerald-300">
              {currentStop.delayMinutes ? `+${currentStop.delayMinutes} min delay` : 'Right Time (0 min)'}
            </span>
            <span className="text-[10px] text-blue-200 block mt-0.5">Estimated on schedule</span>
          </div>
        </div>

        {/* STATION-BY-STATION ROUTE PROGRESS TIMELINE */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Route Stations & Running Progress
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {train.intermediateStations.map((stop, idx) => {
              const isPast = stop.status === 'departed';
              const isCurrent = stop.status === 'current';
              const isUpcoming = stop.status === 'upcoming' || !stop.status;

              return (
                <div key={stop.station.code} className="relative flex items-start justify-between text-xs">
                  {/* Timeline Node */}
                  <span
                    className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                      isCurrent
                        ? 'border-blue-700 ring-4 ring-blue-100'
                        : isPast
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-slate-300'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-700 animate-ping"></span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    )}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${isCurrent ? 'text-blue-700 font-extrabold' : 'text-slate-900'}`}>
                        {stop.station.name}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {stop.station.code}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full animate-pulse">
                          LIVE HERE
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-3">
                      <span>Platform #{stop.platform || '1'}</span>
                      {stop.haltMinutes > 0 && <span>Halt: {stop.haltMinutes}m</span>}
                      <span>{stop.distanceKm} km</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-xs text-slate-900">
                      {stop.arrival === stop.departure ? stop.arrival : `${stop.arrival} - ${stop.departure}`}
                    </div>
                    <span
                      className={`text-[10px] font-semibold ${
                        isPast
                          ? 'text-emerald-700'
                          : isCurrent
                          ? 'text-blue-700 font-bold'
                          : 'text-slate-400'
                      }`}
                    >
                      {isPast ? 'Departed' : isCurrent ? 'Arrived' : 'Expected'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
