import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STATIONS } from '../data/mockData';
import { Train, TrainClass, ClassCode } from '../types';
import {
  Filter,
  SlidersHorizontal,
  ArrowRight,
  Clock,
  Sparkles,
  Calendar,
  ChevronDown,
  RotateCcw,
  Check,
  AlertCircle,
  Award,
  Utensils,
  Zap,
  Info
} from 'lucide-react';

export const SearchPage: React.FC = () => {
  const {
    fromStation,
    toStation,
    journeyDate,
    quota,
    setJourneyDate,
    departureTimeFilter,
    setDepartureTimeFilter,
    trainTypeFilter,
    setTrainTypeFilter,
    classFilter,
    setClassFilter,
    availableOnly,
    setAvailableOnly,
    sortBy,
    setSortBy,
    filteredTrains,
    startBooking,
    setViewingTrain,
    setCurrentPage,
  } = useApp();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedClassMap, setSelectedClassMap] = useState<Record<string, TrainClass>>({});

  // Get selected class for a train (defaults to first available class)
  const getSelectedClass = (train: Train): TrainClass => {
    return selectedClassMap[train.id] || train.classes[0];
  };

  const handleSelectClass = (trainId: string, cls: TrainClass) => {
    setSelectedClassMap(prev => ({ ...prev, [trainId]: cls }));
  };

  const handleResetFilters = () => {
    setDepartureTimeFilter('all');
    setTrainTypeFilter('all');
    setClassFilter('all');
    setAvailableOnly(false);
    setSortBy('recommended');
  };

  const hasActiveFilters =
    departureTimeFilter !== 'all' ||
    trainTypeFilter !== 'all' ||
    classFilter !== 'all' ||
    availableOnly ||
    sortBy !== 'recommended';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20">
      {/* SEARCH HEADER & MODIFY BAR */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span>Quota: <strong className="text-blue-700">{quota === 'GN' ? 'General' : quota === 'TQ' ? 'Tatkal' : quota}</strong></span>
            <span>·</span>
            <span>Date: <strong className="text-slate-800">{journeyDate}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>{fromStation?.name || 'Mumbai'}</span>
              <span className="text-slate-400">→</span>
              <span>{toStation?.name || 'New Delhi'}</span>
            </h1>
            <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md hidden sm:inline">
              {fromStation?.code} - {toStation?.code}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentPage('home')}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Modify Route
          </button>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 flex items-center gap-2 shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* MAIN LAYOUT: SIDEBAR FILTERS (DESKTOP) + RESULTS */}
      <div className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-6 items-start">
        {/* DESKTOP FILTERS SIDEBAR */}
        <aside className="hidden md:block bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-6 sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <Filter className="w-4 h-4 text-blue-700" />
              <span>Filters</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Availability Toggle */}
          <div>
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
              <span className="text-xs font-bold text-slate-800">Available Seats Only</span>
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={e => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
              />
            </label>
          </div>

          {/* Departure Time */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Departure Time
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'all', label: 'Anytime' },
                { id: 'morning', label: 'Morning (06-12)' },
                { id: 'afternoon', label: 'Afternoon (12-18)' },
                { id: 'evening', label: 'Evening (18-24)' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setDepartureTimeFilter(t.id as any)}
                  className={`p-2 text-left text-xs rounded-xl border transition-all ${
                    departureTimeFilter === t.id
                      ? 'bg-blue-50 border-blue-600 font-bold text-blue-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Train Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Train Type
            </label>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Train Types' },
                { id: 'Vande Bharat', label: 'Vande Bharat Express' },
                { id: 'Rajdhani', label: 'Rajdhani Express' },
                { id: 'Shatabdi', label: 'Shatabdi Express' },
                { id: 'Superfast', label: 'Superfast & Mail' },
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setTrainTypeFilter(type.id as any)}
                  className={`w-full p-2 text-left text-xs rounded-xl flex items-center justify-between border transition-all ${
                    trainTypeFilter === type.id
                      ? 'bg-blue-50 border-blue-600 font-bold text-blue-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{type.label}</span>
                  {trainTypeFilter === type.id && <Check className="w-3.5 h-3.5 text-blue-700" />}
                </button>
              ))}
            </div>
          </div>

          {/* Class Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Travel Class
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { code: 'all', label: 'All' },
                { code: '1A', label: '1A' },
                { code: '2A', label: '2A' },
                { code: '3A', label: '3A' },
                { code: 'CC', label: 'CC' },
                { code: 'SL', label: 'SL' },
              ].map(c => (
                <button
                  key={c.code}
                  onClick={() => setClassFilter(c.code as any)}
                  className={`py-1.5 text-center text-xs rounded-xl border transition-all font-semibold ${
                    classFilter === c.code
                      ? 'bg-blue-50 border-blue-600 text-blue-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* RESULTS FEED */}
        <main className="space-y-4">
          {/* SORTING BAR */}
          <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-700 pl-1">
              {filteredTrains.length} Trains Found
            </span>

            <div className="flex items-center gap-1 overflow-x-auto">
              <span className="text-slate-400 font-medium hidden lg:inline mr-1">Sort by:</span>
              {[
                { id: 'recommended', label: 'Recommended' },
                { id: 'departure', label: 'Earliest' },
                { id: 'duration', label: 'Fastest' },
                { id: 'fare', label: 'Cheapest' },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                    sortBy === s.id
                      ? 'bg-blue-700 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* EMPTY STATE */}
          {filteredTrains.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">No trains found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  No trains matched your active filter combinations. Try resetting the filters or modifying departure times.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-blue-700 text-white text-xs font-bold rounded-xl hover:bg-blue-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* TRAIN RESULT CARDS */
            filteredTrains.map(train => {
              const selectedClass = getSelectedClass(train);

              return (
                <div
                  key={train.id}
                  className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all space-y-5"
                >
                  {/* CARD HEADER: TRAIN INFO & TIMING */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                          {train.number}
                        </span>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          {train.type}
                        </span>
                        {train.punctualityScore >= 95 && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {train.punctualityScore}% On-Time
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                        {train.name}
                      </h3>
                    </div>

                    {/* Running Days */}
                    <div className="flex items-center gap-1 text-[11px]">
                      <span className="text-slate-400 mr-1 text-[10px] uppercase font-semibold">Runs on:</span>
                      {train.runsOn.map((day, i) => (
                        <span
                          key={i}
                          className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] flex items-center justify-center border border-emerald-200/60"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* JOURNEY SCHEDULE / TIMELINE */}
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    {/* Departure */}
                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        {train.departureTime}
                      </div>
                      <div className="text-xs font-bold text-slate-700">
                        {train.fromStation.name}
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">
                        ({train.fromStation.code})
                      </span>
                    </div>

                    {/* Duration Graphic */}
                    <div className="flex flex-col items-center justify-center text-center py-2 sm:py-0">
                      <span className="text-xs font-semibold text-slate-500">
                        {train.durationHours}h {train.durationMinutes}m
                      </span>
                      <div className="w-28 sm:w-36 flex items-center justify-center gap-2 my-1">
                        <div className="h-0.5 bg-slate-200 flex-1"></div>
                        <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                        <div className="h-0.5 bg-slate-200 flex-1"></div>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {train.intermediateStations.length} intermediate stops
                      </span>
                    </div>

                    {/* Arrival */}
                    <div className="sm:text-right">
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        {train.arrivalTime}
                      </div>
                      <div className="text-xs font-bold text-slate-700">
                        {train.toStation.name}
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">
                        ({train.toStation.code})
                      </span>
                    </div>
                  </div>

                  {/* CLASS CHIPS & SEAT AVAILABILITY */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Select Class & Check Availability
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {train.classes.map(cls => {
                        const isSelected = selectedClass.code === cls.code;
                        const isAvailable = cls.status === 'AVAILABLE';
                        const isRac = cls.status === 'RAC';

                        return (
                          <button
                            key={cls.code}
                            type="button"
                            onClick={() => handleSelectClass(train.id, cls)}
                            className={`p-3 rounded-2xl border text-left transition-all ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600 shadow-xs'
                                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-xs text-slate-900">
                                {cls.code}
                              </span>
                              <span className="font-extrabold text-xs text-slate-900">
                                ₹{cls.fare}
                              </span>
                            </div>

                            <div className="mt-1 flex items-center justify-between">
                              <span
                                className={`text-[11px] font-bold ${
                                  isAvailable
                                    ? 'text-emerald-700'
                                    : isRac
                                    ? 'text-amber-700'
                                    : 'text-rose-600'
                                }`}
                              >
                                {cls.statusDetail}
                              </span>
                              <span className="text-[9px] text-slate-400 uppercase">
                                {cls.name.split(' ')[0]}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* CARD ACTIONS: DETAILS + BOOK */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setViewingTrain(train)}
                      className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1.5 py-1"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>View Route, Coaches & Food</span>
                    </button>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-slate-400 block">Total Fare ({selectedClass.code})</span>
                        <span className="text-sm font-extrabold text-slate-900">₹{selectedClass.fare}</span>
                      </div>

                      <button
                        onClick={() => startBooking(train, selectedClass)}
                        className="w-full sm:w-auto px-6 py-2.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <span>Book {selectedClass.code}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </main>
      </div>

      {/* MOBILE FILTERS SHEET */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          ></div>
          <div className="relative bg-white rounded-t-3xl p-5 pb-8 space-y-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Filter Trains</h3>
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-rose-600"
              >
                Reset
              </button>
            </div>

            {/* Available Toggle */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-800">Available Seats Only</span>
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={e => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            {/* Departure */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">Departure Time</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: 'Anytime' },
                  { id: 'morning', label: 'Morning' },
                  { id: 'afternoon', label: 'Afternoon' },
                  { id: 'evening', label: 'Evening' },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setDepartureTimeFilter(t.id as any)}
                    className={`p-2 text-center text-xs rounded-xl border ${
                      departureTimeFilter === t.id
                        ? 'bg-blue-50 border-blue-600 font-bold text-blue-900'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md"
            >
              Apply Filters ({filteredTrains.length} Trains)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
