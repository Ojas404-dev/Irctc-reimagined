import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_RETIRING_ROOMS, STATIONS } from '../data/mockData';
import { RetiringRoom } from '../types';
import { BedDouble, Clock, CheckCircle2, MapPin, ShieldCheck, X } from 'lucide-react';

export const RetiringRoomsPage: React.FC = () => {
  const { showToast } = useApp();
  const [selectedStation, setSelectedStation] = useState('NDLS');
  const [selectedDuration, setSelectedDuration] = useState<12 | 24>(12);
  const [bookedRoom, setBookedRoom] = useState<RetiringRoom | null>(null);

  const filteredRooms = MOCK_RETIRING_ROOMS.filter(r => r.stationCode === selectedStation);

  const handleBookRoom = (room: RetiringRoom) => {
    setBookedRoom(room);
    showToast(`Retiring Room booked at ${room.stationName}!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-blue-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            Indian Railways Transit Lodging
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Station Retiring Rooms & Dormitories
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Book affordable rest rooms and single AC dormitory beds located directly inside railway station buildings for transit delays and layovers.
          </p>
        </div>

        {/* Station Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-slate-400 font-semibold mr-1">Select Station:</span>
          {[
            { code: 'NDLS', name: 'New Delhi' },
            { code: 'MMCT', name: 'Mumbai Central' },
            { code: 'BSB', name: 'Varanasi' },
          ].map(s => (
            <button
              key={s.code}
              onClick={() => setSelectedStation(s.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedStation === s.code
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {s.name} ({s.code})
            </button>
          ))}
        </div>
      </div>

      {/* DURATION TOGGLE */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200">
        <span className="text-xs font-bold text-slate-700">Duration Slot:</span>
        <div className="flex gap-1.5">
          <button
            onClick={() => setSelectedDuration(12)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedDuration === 12
                ? 'bg-blue-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            12 Hours Slot
          </button>
          <button
            onClick={() => setSelectedDuration(24)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedDuration === 24
                ? 'bg-blue-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            24 Hours Slot
          </button>
        </div>
      </div>

      {/* ROOMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRooms.map(room => {
          const price = selectedDuration === 12 ? room.price12h : room.price24h;

          return (
            <div
              key={room.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      {room.roomType}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-lg">
                      {room.stationName}
                    </h3>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
                    {room.availableUnits} Units Available
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {room.amenities.map((am, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-lg"
                    >
                      {am}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block">Tariff ({selectedDuration}h)</span>
                  <span className="text-xl font-extrabold text-slate-900">
                    ₹{price}
                  </span>
                </div>

                <button
                  onClick={() => handleBookRoom(room)}
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-2xs"
                >
                  Book Room
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONFIRMED ROOM MODAL */}
      {bookedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setBookedRoom(null)} />
          <div className="relative bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full z-10 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Room Allocated
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">{bookedRoom.roomType}</h3>
              <p className="text-xs text-slate-500 mt-1">{bookedRoom.stationName}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Room Slip No:</span>
                <span className="font-mono font-bold text-slate-900">RR-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-semibold text-slate-900">{selectedDuration} Hours from check-in</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-bold text-emerald-700">₹{selectedDuration === 12 ? bookedRoom.price12h : bookedRoom.price24h}</span>
              </div>
            </div>

            <button
              onClick={() => setBookedRoom(null)}
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
