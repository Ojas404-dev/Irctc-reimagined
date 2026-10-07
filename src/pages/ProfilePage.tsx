import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Passenger } from '../types';
import {
  User,
  Phone,
  Mail,
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Award,
  ChevronRight,
  X
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, loginUser, savedPassengers, addSavedPassenger, removeSavedPassenger, showToast, setCurrentPage } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [isEditing, setIsEditing] = useState(false);

  // Add Passenger Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newPassName, setNewPassName] = useState('');
  const [newPassAge, setNewPassAge] = useState(28);
  const [newPassGender, setNewPassGender] = useState<'male' | 'female' | 'transgender'>('male');
  const [newPassBerth, setNewPassBerth] = useState<any>('lower');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(name, email, phone);
    setIsEditing(false);
    showToast('Profile information saved', 'success');
  };

  const handleAddPassengerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassName.trim()) {
      showToast('Name is required', 'error');
      return;
    }
    addSavedPassenger({
      name: newPassName.trim(),
      age: newPassAge,
      gender: newPassGender,
      berthPreference: newPassBerth,
    });
    setNewPassName('');
    setAddModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* HEADER */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          User Account & Travel Preferences
        </h1>
        <p className="text-xs text-slate-500">
          Manage saved passengers for 1-click Tatkal checkout and view loyalty reward balances.
        </p>
      </div>

      {/* USER CARD & LOYALTY CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">{user.name}</h3>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Aadhaar KYC Verified
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-bold text-blue-700 hover:text-blue-800"
            >
              {isEditing ? 'Cancel' : 'Edit Info'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mobile</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-700 text-white font-bold rounded-xl mt-2"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-900">{user.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-900">{user.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>IRCTC Single Sign-On Active</span>
              </div>
            </div>
          )}
        </div>

        {/* IRCTC SBI Rail Card Simulator */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-300">
                IRCTC SBI PLATINUM PASS
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            <div className="mt-4">
              <span className="text-[10px] text-slate-300 uppercase block">Reward Points Balance</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
                {user.sbiPoints.toLocaleString('en-IN')} <span className="text-xs text-white">Points</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Redeemable for free AC train tickets or lounge access.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span>•••• •••• •••• 4921</span>
            <span className="text-emerald-400 font-bold">10% Valueback Active</span>
          </div>
        </div>
      </div>

      {/* SAVED PASSENGERS MANAGER */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Saved Passenger Master List</h3>
            <p className="text-xs text-slate-500">
              Add family & friends in advance to book Tatkal tickets in seconds.
            </p>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Passenger</span>
          </button>
        </div>

        {/* Passengers List */}
        <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
          {savedPassengers.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No saved passengers yet. Add your details for 1-click booking!
            </div>
          ) : (
            savedPassengers.map(p => (
              <div key={p.id} className="p-4 bg-white flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-sm text-slate-900">{p.name}</div>
                  <div className="text-slate-500 mt-0.5">
                    {p.age} Yrs · {p.gender.toUpperCase()} · Berth Pref: <strong className="text-slate-700">{p.berthPreference.toUpperCase()}</strong>
                  </div>
                </div>

                <button
                  onClick={() => removeSavedPassenger(p.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Passenger"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ADD PASSENGER MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setAddModalOpen(false)} />
          <div className="relative bg-white rounded-3xl p-6 max-w-md w-full z-10 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Add New Saved Passenger</h3>
              <button onClick={() => setAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPassengerSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  value={newPassName}
                  onChange={e => setNewPassName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={newPassAge}
                    onChange={e => setNewPassAge(parseInt(e.target.value) || 25)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gender</label>
                  <select
                    value={newPassGender}
                    onChange={e => setNewPassGender(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="transgender">Transgender</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Berth Preference</label>
                <select
                  value={newPassBerth}
                  onChange={e => setNewPassBerth(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
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

              <button
                type="submit"
                className="w-full py-3 bg-blue-700 text-white font-bold rounded-xl mt-2"
              >
                Save Passenger
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
