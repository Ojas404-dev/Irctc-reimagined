import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';
import { X, Printer, Share2, Copy, Check, ShieldCheck, Train as TrainIcon, Calendar, ArrowRight } from 'lucide-react';

interface TicketModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ booking, onClose }) => {
  const { showToast } = useApp();
  const [copied, setCopied] = React.useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  if (!booking) return null;

  const handleCopyPnr = () => {
    navigator.clipboard?.writeText(booking.pnr);
    setCopied(true);
    showToast(`PNR ${booking.pnr} copied to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl z-10 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Modal Top Actions */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Electronic Reservation Slip (ERS)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1.5 font-medium"
              title="Print E-Ticket"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                showToast('Ticket share link ready', 'info');
              }}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Share Ticket"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Ticket Content */}
        <div ref={printableRef} className="p-5 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Header Branding */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white shadow-md">
                <TrainIcon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                  INDIAN RAILWAYS & IRCTC
                </h3>
                <p className="text-xs text-slate-500 font-medium">IRCTC Reimagined Digital Pass</p>
              </div>
            </div>

            {/* Simulated QR Code */}
            <div className="border border-slate-200 p-1.5 rounded-xl bg-slate-50 text-center">
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg p-1 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-800">
                  <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M22,22 h6 v6 h-6 z M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M72,22 h6 v6 h-6 z M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M22,72 h6 v6 h-6 z M50,15 h5 v5 h-5 z M50,30 h8 v8 h-8 z M65,60 h10 v10 h-10 z M80,75 h10 v10 h-10 z M50,70 h10 v10 h-10 z M60,85 h15 v5 h-15 z" />
                </svg>
              </div>
              <span className="text-[9px] font-mono text-slate-400 mt-0.5 block">VERIFIED</span>
            </div>
          </div>

          {/* PNR Banner */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
                Passenger Name Record (PNR)
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 tracking-wider">
                  {booking.pnr}
                </span>
                <button
                  onClick={handleCopyPnr}
                  className="p-1 rounded-md text-blue-700 hover:bg-blue-100 transition-colors"
                  title="Copy PNR"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                  booking.status === 'CONFIRMED'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : booking.status === 'CANCELLED'
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {booking.status}
              </span>
              <span className="text-xs font-medium text-slate-500">
                Class: <strong className="text-slate-800">{booking.selectedClass.code}</strong> ({booking.selectedClass.name})
              </span>
            </div>
          </div>

          {/* Train & Journey Route */}
          <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase">
                  {booking.train.number} · {booking.train.type}
                </span>
                <h4 className="text-base font-bold text-slate-900">{booking.train.name}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Journey Date</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1 justify-end">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {booking.journeyDate}
                </span>
              </div>
            </div>

            {/* Stations Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-1">
              <div>
                <span className="text-xs text-slate-400 font-medium">Boarding Station</span>
                <div className="text-base font-extrabold text-slate-900 mt-0.5">
                  {booking.train.departureTime}
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  {booking.train.fromStation.name} ({booking.train.fromStation.code})
                </div>
              </div>

              <div className="flex flex-col items-center justify-center text-center py-2 sm:py-0">
                <span className="text-[11px] font-semibold text-slate-400">
                  {booking.train.durationHours}h {booking.train.durationMinutes}m
                </span>
                <div className="w-full flex items-center justify-center gap-2 my-1">
                  <div className="h-0.5 bg-slate-200 flex-1"></div>
                  <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="h-0.5 bg-slate-200 flex-1"></div>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Confirmed Schedule
                </span>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-slate-400 font-medium">Destination Station</span>
                <div className="text-base font-extrabold text-slate-900 mt-0.5">
                  {booking.train.arrivalTime}
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  {booking.train.toStation.name} ({booking.train.toStation.code})
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Information Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Passenger Details ({booking.passengers.length})
              </span>
              <span className="text-xs text-slate-500 font-medium">Quota: {booking.quota}</span>
            </div>

            <div className="divide-y divide-slate-100">
              {booking.passengers.map((p, idx) => (
                <div key={p.id || idx} className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500">
                        {p.age} Yrs · {p.gender.toUpperCase()} · Berth Pref: {p.berthPreference.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pl-9 sm:pl-0">
                    <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-center">
                      <span className="text-[10px] text-emerald-700 font-medium block">Coach & Berth</span>
                      <span className="text-xs sm:text-sm font-extrabold text-emerald-900">
                        {p.allottedCoach ? `${p.allottedCoach} / ${p.allottedBerth}` : 'CNF'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                      {p.bookingStatus || 'CNF'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fare Summary & Payment */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-600 space-y-2">
            <div className="flex justify-between font-medium">
              <span>Base Ticket Fare</span>
              <span className="font-semibold text-slate-900">₹{booking.fareBreakdown.baseFare.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Reservation & Superfast Charges</span>
              <span>₹{(booking.fareBreakdown.reservationCharge + booking.fareBreakdown.superfastCharge).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%) & Travel Insurance</span>
              <span>₹{(booking.fareBreakdown.gst + booking.fareBreakdown.insurance).toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
              <span>Total Paid Amount</span>
              <span className="text-base text-blue-700">₹{booking.fareBreakdown.total.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Paid via: <strong className="text-slate-700">{booking.paymentMethod}</strong> · Transaction Verified
            </p>
          </div>

          {/* Guidelines & Safety */}
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/70 text-[11px] text-amber-900 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Carry a valid original government photo ID (Aadhaar / Voter ID / Passport / Driving License) during journey. Charts prepare 4 hours prior to departure.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-sm"
          >
            Download E-Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
