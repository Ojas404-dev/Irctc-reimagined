import React from 'react';
import { Booking } from '../types';
import { AlertTriangle, X, CheckCircle2 } from 'lucide-react';

interface CancelConfirmModalProps {
  booking: Booking | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const CancelConfirmModal: React.FC<CancelConfirmModalProps> = ({
  booking,
  onClose,
  onConfirm,
}) => {
  if (!booking) return null;

  const totalFare = booking.fareBreakdown.total;
  const cancellationFee =
    booking.selectedClass.code === '1A'
      ? 240
      : booking.selectedClass.code === '2A'
      ? 200
      : booking.selectedClass.code === '3A'
      ? 180
      : 120;
  const refundAmount = Math.max(0, totalFare - cancellationFee);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md z-10 p-6 space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900">Cancel Ticket Booking?</h3>
          <p className="text-xs text-slate-500 mt-1">
            PNR <span className="font-mono font-bold text-slate-800">{booking.pnr}</span> · {booking.train.number} {booking.train.name}
          </p>
        </div>

        {/* Refund Calculation breakdown */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Original Paid Fare</span>
            <span className="font-semibold text-slate-900">₹{totalFare.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-rose-600 font-medium">
            <span>IRCTC Cancellation Deduction</span>
            <span>- ₹{cancellationFee}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-emerald-700">
            <span>Estimated Refund</span>
            <span>₹{refundAmount.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-[10px] text-slate-400 pt-1">
            Refund will be credited back to original payment source ({booking.paymentMethod}) in 2-3 banking days.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Keep Ticket
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm"
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
