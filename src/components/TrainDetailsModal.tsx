import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Train, TrainClass } from '../types';
import { X, Clock, MapPin, Shield, CheckCircle2, Utensils, Award } from 'lucide-react';

interface TrainDetailsModalProps {
  train: Train | null;
  onClose: () => void;
}

export const TrainDetailsModal: React.FC<TrainDetailsModalProps> = ({ train, onClose }) => {
  const { startBooking } = useApp();
  const [activeTab, setActiveTab] = useState<'route' | 'coaches' | 'amenities' | 'rules'>('route');

  if (!train) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl z-10 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded">
                {train.type}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                {train.punctualityScore}% On-Time Record
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1 leading-snug">
              {train.number} · {train.name}
            </h3>

            <div className="flex items-center gap-2 text-xs text-slate-300 mt-2">
              <span>{train.fromStation.name} ({train.fromStation.code})</span>
              <span>→</span>
              <span>{train.toStation.name} ({train.toStation.code})</span>
              <span className="text-slate-500">|</span>
              <span className="font-semibold text-white">{train.durationHours}h {train.durationMinutes}m</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-4 sm:px-6 overflow-x-auto gap-2">
          {[
            { id: 'route', label: 'Route & Schedule' },
            { id: 'coaches', label: 'Coach Composition' },
            { id: 'amenities', label: 'Amenities & Food' },
            { id: 'rules', label: 'Cancellation Rules' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto">
          {/* TAB 1: ROUTE & TIMELINE */}
          {activeTab === 'route' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span>Intermediate Stops ({train.intermediateStations.length})</span>
                <span>Distance: {train.intermediateStations[train.intermediateStations.length - 1]?.distanceKm || 1380} KM</span>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {train.intermediateStations.map((stop, idx) => {
                  const isFirst = idx === 0;
                  const isLast = idx === train.intermediateStations.length - 1;

                  return (
                    <div key={stop.station.code} className="relative flex items-start justify-between text-xs">
                      {/* Node Bullet */}
                      <span
                        className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                          isFirst || isLast
                            ? 'border-blue-700 ring-2 ring-blue-100'
                            : 'border-slate-400'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isFirst || isLast ? 'bg-blue-700' : 'bg-slate-400'
                          }`}
                        />
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            {stop.station.name}
                          </span>
                          <span className="font-mono text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {stop.station.code}
                          </span>
                          {stop.platform && (
                            <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                              PF #{stop.platform}
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-3">
                          <span>Day {stop.day}</span>
                          {stop.haltMinutes > 0 && <span>Halt: {stop.haltMinutes} mins</span>}
                          <span>{stop.distanceKm} km</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-bold text-xs text-slate-900">
                          {isFirst ? stop.departure : `${stop.arrival} - ${stop.departure}`}
                        </div>
                        <span className="text-[10px] text-emerald-600 font-medium">
                          {isFirst ? 'Origin' : isLast ? 'Destination' : 'Scheduled'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: COACH COMPOSITION */}
          {activeTab === 'coaches' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Standard rake composition for <strong>{train.number}</strong>. Platform rake positioning may vary at station.
              </p>

              <div className="flex items-center gap-2 overflow-x-auto py-4 px-2 border border-slate-200 rounded-2xl bg-slate-50">
                {(train.coachLayout || ['ENG', 'EOG', 'B1', 'B2', 'B3', 'B4', 'PC', 'A1', 'A2', 'H1', 'EOG']).map(
                  (coach, i) => {
                    const isEngine = coach === 'ENG';
                    const isPantry = coach === 'PC';
                    const isFirstAc = coach.startsWith('H');
                    const isTwoAc = coach.startsWith('A');
                    const isThreeAc = coach.startsWith('B');

                    return (
                      <div
                        key={i}
                        className={`flex flex-col items-center justify-center min-w-[54px] h-16 rounded-xl border text-center font-bold text-xs shadow-xs shrink-0 ${
                          isEngine
                            ? 'bg-rose-700 text-white border-rose-800'
                            : isPantry
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : isFirstAc
                            ? 'bg-purple-100 text-purple-900 border-purple-300'
                            : isTwoAc
                            ? 'bg-blue-100 text-blue-900 border-blue-300'
                            : isThreeAc
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        <span className="text-[9px] uppercase font-normal opacity-70">
                          {isEngine ? 'Loco' : isPantry ? 'Pantry' : 'Coach'}
                        </span>
                        <span className="text-xs">{coach}</span>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600 pt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-purple-200 border border-purple-300 inline-block"></span>
                  1A First Class AC
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-200 border border-blue-300 inline-block"></span>
                  2A 2-Tier AC
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-200 border border-emerald-300 inline-block"></span>
                  3A 3-Tier AC
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-200 border border-amber-300 inline-block"></span>
                  Pantry Car (PC)
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: AMENITIES & FOOD */}
          {activeTab === 'amenities' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {train.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-center gap-3 text-xs font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 flex items-start gap-3">
                <Utensils className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold">Onboard Catering & e-Catering Available</h5>
                  <p className="mt-0.5 text-blue-800">
                    Pre-order fresh hygiene-certified regional meals from IRCTC e-Catering directly delivered to your seat at intermediate stops.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CANCELLATION RULES */}
          {activeTab === 'rules' && (
            <div className="space-y-3 text-xs text-slate-700">
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Time Before Departure</th>
                      <th className="p-3">Cancellation Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-medium">&gt; 48 hours prior</td>
                      <td className="p-3 font-semibold text-slate-900">
                        Flat fee: 1A: ₹240, 2A: ₹200, 3A: ₹180, SL: ₹120
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Between 48h and 12h prior</td>
                      <td className="p-3 font-semibold text-slate-900">25% of total ticket fare</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Between 12h and 4h prior</td>
                      <td className="p-3 font-semibold text-slate-900">50% of total ticket fare</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">&lt; 4 hours (Chart Prepared)</td>
                      <td className="p-3 font-semibold text-rose-600">No refund admissible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500">
                *Tatkal confirmed tickets are non-refundable according to Indian Railways guidelines.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer / Select Class to Book */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            <span>Available Classes: </span>
            <span className="font-bold text-slate-900">
              {train.classes.map(c => c.code).join(' · ')}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {train.classes.map(cls => (
              <button
                key={cls.code}
                onClick={() => {
                  onClose();
                  startBooking(train, cls);
                }}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-xs"
              >
                Book {cls.code} (₹{cls.fare})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
