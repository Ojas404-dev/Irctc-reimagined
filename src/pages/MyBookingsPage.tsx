import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';
import { CancelConfirmModal } from '../components/CancelConfirmModal';
import {
  CreditCard,
  Calendar,
  Clock,
  ArrowRight,
  Download,
  AlertTriangle,
  Utensils,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Train,
  Plus
} from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { bookings, cancelBooking, setViewingTicket, setFoodPnr, setCurrentPage, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);
  const [copiedPnr, setCopiedPnr] = useState<string | null>(null);

  const upcomingBookings = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'RAC' || b.status === 'WAITLIST');
  const completedBookings = bookings.filter(b => b.status === 'COMPLETED');
  const cancelledBookings = bookings.filter(b => b.status === 'CANCELLED');

  const displayedBookings =
    activeTab === 'upcoming'
      ? upcomingBookings
      : activeTab === 'completed'
      ? completedBookings
      : cancelledBookings;

  const handleCopyPnr = (pnr: string) => {
    navigator.clipboard?.writeText(pnr);
    setCopiedPnr(pnr);
    setTimeout(() => setCopiedPnr(null), 2000);
    showToast(`PNR ${pnr} copied`, 'success');
  };

  const handleConfirmCancel = () => {
    if (cancellingBooking) {
      cancelBooking(cancellingBooking.id);
      setCancellingBooking(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      {/* HEADER & TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            My Railway Bookings
          </h1>
          <p className="text-xs text-slate-500">
            Manage your past and upcoming train reservations, download tickets, or request refunds.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('home')}
          className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Ticket</span>
        </button>
      </div>

      {/* FILTER TABS */}
      <div className="flex border-b border-slate-200 gap-2">
        {[
          { id: 'upcoming', label: `Upcoming (${upcomingBookings.length})` },
          { id: 'completed', label: `Completed (${completedBookings.length})` },
          { id: 'cancelled', label: `Cancelled (${cancelledBookings.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* BOOKINGS LIST */}
      <div className="space-y-4">
        {displayedBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Train className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                No {activeTab} journeys found
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {activeTab === 'upcoming'
                  ? "You don't have any upcoming railway journeys scheduled."
                  : activeTab === 'cancelled'
                  ? 'No cancelled tickets in your account history.'
                  : 'You have not completed any train journeys yet.'}
              </p>
            </div>
            {activeTab === 'upcoming' && (
              <button
                onClick={() => setCurrentPage('home')}
                className="px-5 py-2.5 bg-blue-700 text-white text-xs font-bold rounded-xl hover:bg-blue-800 transition-colors"
              >
                Book a Train Now
              </button>
            )}
          </div>
        ) : (
          displayedBookings.map(booking => {
            const isCancelled = booking.status === 'CANCELLED';
            const isCompleted = booking.status === 'COMPLETED';

            return (
              <div
                key={booking.id}
                className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all space-y-5 ${
                  isCancelled
                    ? 'border-rose-200/80 bg-rose-50/20'
                    : 'border-slate-200/90 shadow-xs hover:border-blue-300'
                }`}
              >
                {/* Header: PNR & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-semibold">PNR:</span>
                    <span className="font-mono text-sm sm:text-base font-extrabold text-slate-900">
                      {booking.pnr}
                    </span>
                    <button
                      onClick={() => handleCopyPnr(booking.pnr)}
                      className="p-1 text-slate-400 hover:text-blue-700 rounded"
                      title="Copy PNR"
                    >
                      {copiedPnr === booking.pnr ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isCancelled
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : isCompleted
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {booking.status}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      Class: <strong>{booking.selectedClass.code}</strong>
                    </span>
                  </div>
                </div>

                {/* Train Info & Timing */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {booking.train.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                      {booking.train.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Journey Date: {booking.journeyDate}</span>
                    </p>
                  </div>

                  <div className="text-right sm:border-l sm:border-slate-100 sm:pl-6">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Total Fare
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">
                      ₹{booking.fareBreakdown.total.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {booking.passengers.length} Passenger(s)
                    </span>
                  </div>
                </div>

                {/* Route Strip */}
                <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/70 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-extrabold text-slate-900">{booking.train.departureTime}</div>
                    <div className="text-slate-600 font-semibold">{booking.train.fromStation.name}</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-400">
                      {booking.train.durationHours}h {booking.train.durationMinutes}m
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-slate-900">{booking.train.arrivalTime}</div>
                    <div className="text-slate-600 font-semibold">{booking.train.toStation.name}</div>
                  </div>
                </div>

                {/* Passenger Berths Allotted */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Berths:</span>
                  {booking.passengers.map((p, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold font-mono text-[11px]"
                    >
                      {p.name.split(' ')[0]}: Coach {p.allottedCoach || 'B1'} - Berth {p.allottedBerth || '32'}
                    </span>
                  ))}
                </div>

                {/* Cancellation Refund Details Notice */}
                {isCancelled && booking.cancellationDetails && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" />
                      Refund Initiated: ₹{booking.cancellationDetails.refundAmount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[11px] text-rose-700">
                      Cancellation charges: ₹{booking.cancellationDetails.cancellationCharges} deducted as per Indian Railways refund matrix.
                    </p>
                  </div>
                )}

                {/* Card Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewingTicket(booking)}
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>View E-Ticket</span>
                    </button>

                    {!isCancelled && (
                      <button
                        onClick={() => {
                          setFoodPnr(booking.pnr);
                          setCurrentPage('food');
                        }}
                        className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs rounded-xl flex items-center gap-1.5"
                      >
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Order Meals</span>
                      </button>
                    )}
                  </div>

                  {!isCancelled && !isCompleted && (
                    <button
                      onClick={() => setCancellingBooking(booking)}
                      className="px-3 py-2 text-rose-600 hover:bg-rose-50 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Cancel Ticket</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Cancellation Confirmation Modal */}
      <CancelConfirmModal
        booking={cancellingBooking}
        onClose={() => setCancellingBooking(null)}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};
