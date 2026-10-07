import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Passenger, BerthPreference } from '../types';
import {
  UserPlus,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  QrCode,
  Smartphone,
  Building2,
  Wallet,
  Calendar,
  Clock,
  Sparkles,
  Download,
  Share2,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const {
    draftTrain,
    draftClass,
    draftStep,
    setDraftStep,
    draftPassengers,
    setDraftPassengers,
    draftContactMobile,
    setDraftContactMobile,
    draftContactEmail,
    setDraftContactEmail,
    draftInsurance,
    setDraftInsurance,
    draftAutoUpgrade,
    setDraftAutoUpgrade,
    confirmCurrentBooking,
    confirmedBooking,
    savedPassengers,
    journeyDate,
    quota,
    setViewingTicket,
    setCurrentPage,
    showToast,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiId, setUpiId] = useState('user@oksbi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 9821');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('782');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [copiedPnr, setCopiedPnr] = useState(false);

  // If no draft train is selected, redirect to search
  if (!draftTrain || !draftClass) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">No train selected for booking</h2>
        <p className="text-xs text-slate-500">Please search and select a train to begin your reservation.</p>
        <button
          onClick={() => setCurrentPage('search')}
          className="px-5 py-2.5 bg-blue-700 text-white font-bold text-xs rounded-xl"
        >
          Search Trains
        </button>
      </div>
    );
  }

  // Fare calculations
  const passengerCount = draftPassengers.length;
  const baseFareTotal = draftClass.fare * passengerCount;
  const reservationFee = 40 * passengerCount;
  const superfastFee = 45 * passengerCount;
  const insuranceFee = draftInsurance ? 0.35 * passengerCount : 0;
  const gst = Math.round((baseFareTotal + reservationFee + superfastFee) * 0.05);
  const totalPayable = baseFareTotal + reservationFee + superfastFee + insuranceFee + gst;

  // Passenger management handlers
  const handleAddPassenger = () => {
    const newPassenger: Passenger = {
      id: `pass-${Date.now()}`,
      name: '',
      age: 25,
      gender: 'male',
      berthPreference: 'lower',
      foodPreference: 'veg',
    };
    setDraftPassengers(prev => [...prev, newPassenger]);
  };

  const handleRemovePassenger = (id: string) => {
    if (draftPassengers.length <= 1) {
      showToast('At least one passenger is required', 'error');
      return;
    }
    setDraftPassengers(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdatePassenger = (id: string, updates: Partial<Passenger>) => {
    setDraftPassengers(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const handleAddFromSaved = (saved: Passenger) => {
    if (draftPassengers.some(p => p.name === saved.name)) {
      showToast(`${saved.name} is already added`, 'info');
      return;
    }
    setDraftPassengers(prev => [
      ...prev,
      {
        ...saved,
        id: `pass-${Date.now()}`,
      },
    ]);
    showToast(`Added ${saved.name}`, 'success');
  };

  // Payment process simulation
  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const methodLabel =
        paymentMethod === 'upi'
          ? `UPI (${upiId})`
          : paymentMethod === 'card'
          ? `Credit Card (${cardNumber.slice(-4)})`
          : paymentMethod === 'netbanking'
          ? 'HDFC NetBanking'
          : 'IRCTC iMudra Wallet';

      confirmCurrentBooking(methodLabel);
    }, 1600);
  };

  const steps = [
    { num: 1, label: 'Passengers' },
    { num: 2, label: 'Review' },
    { num: 3, label: 'Payment' },
    { num: 4, label: 'Confirmation' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      {/* STEP INDICATOR */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between max-w-xl mx-auto relative">
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 -z-0"></div>
          {steps.map(step => {
            const isCompleted = draftStep > step.num;
            const isCurrent = draftStep === step.num;

            return (
              <div key={step.num} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-blue-700 text-white ring-4 ring-blue-100'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.num}
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-semibold mt-1 ${
                    isCurrent ? 'text-blue-700 font-bold' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* JOURNEY SUMMARY STRIP */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-mono font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded mr-2">
            {draftTrain.number}
          </span>
          <strong className="text-slate-900 text-sm">{draftTrain.name}</strong>
          <div className="text-slate-600 mt-0.5">
            {draftTrain.fromStation.name} → {draftTrain.toStation.name} · {journeyDate}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-bold text-blue-900 bg-white border border-blue-200 px-2.5 py-1 rounded-xl">
            Class: {draftClass.code}
          </span>
          <span className="font-bold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-xl">
            Quota: {quota}
          </span>
        </div>
      </div>

      {/* ==================== STEP 1: PASSENGERS ==================== */}
      {draftStep === 1 && (
        <div className="space-y-6">
          {/* Quick Add from Saved Passengers */}
          {savedPassengers.length > 0 && (
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quick Add From Saved Co-Passengers
              </span>
              <div className="flex flex-wrap gap-2">
                {savedPassengers.map(sp => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => handleAddFromSaved(sp)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <span>+ {sp.name}</span>
                    <span className="text-[10px] text-slate-400">({sp.age}y)</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Passenger Input Cards */}
          <div className="space-y-4">
            {draftPassengers.map((passenger, index) => (
              <div
                key={passenger.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-blue-700">
                    Passenger {index + 1}
                  </span>
                  {draftPassengers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePassenger(passenger.id)}
                      className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name (as per Govt ID)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={passenger.name}
                      onChange={e => handleUpdatePassenger(passenger.id, { name: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Age (Years)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={passenger.age}
                      onChange={e => handleUpdatePassenger(passenger.id, { age: parseInt(e.target.value) || 18 })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={passenger.gender}
                      onChange={e => handleUpdatePassenger(passenger.id, { gender: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="transgender">Transgender</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Berth Preference */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Berth Preference
                    </label>
                    <select
                      value={passenger.berthPreference}
                      onChange={e => handleUpdatePassenger(passenger.id, { berthPreference: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                    >
                      <option value="lower">Lower Berth</option>
                      <option value="middle">Middle Berth</option>
                      <option value="upper">Upper Berth</option>
                      <option value="side_lower">Side Lower</option>
                      <option value="side_upper">Side Upper</option>
                      <option value="window">Window Seat</option>
                      <option value="none">No Preference</option>
                    </select>
                  </div>

                  {/* Food Preference */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Meal Preference
                    </label>
                    <select
                      value={passenger.foodPreference}
                      onChange={e => handleUpdatePassenger(passenger.id, { foodPreference: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                    >
                      <option value="veg">Vegetarian</option>
                      <option value="non_veg">Non-Vegetarian</option>
                      <option value="jain">Jain Meal</option>
                      <option value="none">No Food</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Passenger CTA */}
            <button
              type="button"
              onClick={handleAddPassenger}
              className="w-full py-3.5 border-2 border-dashed border-blue-300 hover:border-blue-600 rounded-3xl text-xs sm:text-sm font-bold text-blue-700 bg-blue-50/50 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Another Passenger</span>
            </button>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Booking Contact Information (For SMS & PNR Updates)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={draftContactMobile}
                  onChange={e => setDraftContactMobile(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={draftContactEmail}
                  onChange={e => setDraftContactEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Checkboxes: Insurance & Auto-upgrade */}
            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draftAutoUpgrade}
                  onChange={e => setDraftAutoUpgrade(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-600"
                />
                <span className="text-slate-800 font-medium">
                  Consider for Free Auto-Upgradation to higher AC class if available
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draftInsurance}
                  onChange={e => setDraftInsurance(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-600"
                />
                <span className="text-slate-800 font-medium">
                  Opt for Travel Insurance (₹0.35 / passenger) covering accidental coverage up to ₹10 Lakh
                </span>
              </label>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentPage('search')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                const emptyName = draftPassengers.some(p => !p.name.trim());
                if (emptyName) {
                  showToast('Please enter passenger names', 'error');
                  return;
                }
                setDraftStep(2);
              }}
              className="px-7 py-3 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2"
            >
              <span>Review Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ==================== STEP 2: REVIEW ==================== */}
      {draftStep === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Review Ticket Booking
            </h3>

            {/* Passengers Summary */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Passengers ({draftPassengers.length})
              </span>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {draftPassengers.map((p, idx) => (
                  <div key={p.id} className="p-3.5 flex items-center justify-between text-xs bg-white">
                    <div>
                      <strong className="text-slate-900 text-sm">{idx + 1}. {p.name}</strong>
                      <div className="text-slate-500">
                        {p.age} Yrs · {p.gender.toUpperCase()} · Berth Pref: {p.berthPreference.toUpperCase()}
                      </div>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                      Confirmed Allocation
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itemized Fare Breakdown */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Itemized Fare Breakdown
              </span>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between text-slate-700">
                  <span>Base Ticket Fare ({passengerCount} x ₹{draftClass.fare})</span>
                  <span className="font-semibold text-slate-900">₹{baseFareTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Reservation Charges</span>
                  <span>₹{reservationFee}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Superfast Charge</span>
                  <span>₹{superfastFee}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>GST (5%)</span>
                  <span>₹{gst}</span>
                </div>
                {draftInsurance && (
                  <div className="flex justify-between text-slate-700">
                    <span>Travel Insurance</span>
                    <span>₹{insuranceFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
                  <span>Total Payable Amount</span>
                  <span className="text-blue-700">₹{totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setDraftStep(1)}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setDraftStep(3)}
              className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2"
            >
              <span>Proceed to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ==================== STEP 3: PAYMENT ==================== */}
      {draftStep === 3 && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Select Payment Method</h3>
                <p className="text-xs text-slate-500">Fast 100% simulated payment gateway</p>
              </div>
              <span className="text-sm font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl">
                Pay ₹{totalPayable.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                { id: 'card', label: 'Cards', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                { id: 'wallet', label: 'IRCTC iMudra', icon: Wallet },
              ].map(m => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1 text-blue-700" />
                    <span className="text-xs">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENTS */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              {paymentMethod === 'upi' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 block">Enter UPI ID / VPA</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="username@bank"
                      className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-medium"
                    />
                    <span className="px-3 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center">
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500">
                    <span>Popular Apps:</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-700">Google Pay</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-700">PhonePe</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-700">Paytm</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white rounded-xl border border-slate-300 font-mono font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white rounded-xl border border-slate-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white rounded-xl border border-slate-300 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">Select Primary Bank</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map((b, i) => (
                      <div
                        key={b}
                        className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer text-center ${
                          i === 0 ? 'bg-blue-100/70 border-blue-600 text-blue-900 font-bold' : 'bg-white border-slate-200'
                        }`}
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between font-semibold">
                    <span>IRCTC iMudra Prepaid Balance</span>
                    <span className="text-emerald-700 font-bold">₹3,450.00</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Instant 1-click debit with 0 payment gateway charges.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={isProcessingPayment}
              onClick={() => setDraftStep(2)}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              disabled={isProcessingPayment}
              onClick={handleProcessPayment}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-700/25 flex items-center gap-2 cursor-pointer transition-all"
            >
              {isProcessingPayment ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Payment & Generating PNR...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay ₹{totalPayable.toLocaleString('en-IN')} & Book</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ==================== STEP 4: CONFIRMATION ==================== */}
      {draftStep === 4 && confirmedBooking && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl text-center space-y-6">
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
                Reservation Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Have a Pleasant Journey!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your Indian Railways ticket has been confirmed and saved to your account.
              </p>
            </div>

            {/* PNR Box */}
            <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 max-w-sm mx-auto flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase text-blue-700 block">
                  10-Digit PNR Number
                </span>
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 tracking-wider">
                  {confirmedBooking.pnr}
                </span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(confirmedBooking.pnr);
                  setCopiedPnr(true);
                  setTimeout(() => setCopiedPnr(false), 2000);
                  showToast('PNR copied to clipboard', 'success');
                }}
                className="p-2 rounded-xl bg-white text-blue-700 hover:bg-blue-100 border border-blue-200"
                title="Copy PNR"
              >
                {copiedPnr ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Passenger Allocations */}
            <div className="border border-slate-200 rounded-2xl p-4 text-left space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Berth Allocations:</span>
              <div className="space-y-1.5">
                {confirmedBooking.passengers.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-800">{p.name}</span>
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Coach {p.allottedCoach} / Berth {p.allottedBerth}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setViewingTicket(confirmedBooking)}
                className="w-full sm:w-auto px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download / View E-Ticket</span>
              </button>
              <button
                onClick={() => setCurrentPage('food')}
                className="w-full sm:w-auto px-5 py-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2"
              >
                <span>Order Food on Train</span>
              </button>
              <button
                onClick={() => setCurrentPage('bookings')}
                className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl"
              >
                Go to My Bookings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
