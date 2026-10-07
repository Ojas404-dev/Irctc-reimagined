import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_FOOD_ITEMS } from '../data/mockData';
import { FoodItem } from '../types';
import {
  Utensils,
  Search,
  Plus,
  Minus,
  ShoppingBag,
  Star,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';

export const FoodPage: React.FC = () => {
  const { foodCart, addToCart, removeFromCart, clearFoodCart, foodPnr, setFoodPnr, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [deliveryStation, setDeliveryStation] = useState('Vadodara Junction (BRC) · Platform 2');
  const [coachSeat, setCoachSeat] = useState('Coach B2 / Berth 32');

  const categories = [
    { id: 'all', label: 'All Menu' },
    { id: 'meals', label: 'Thalis & Meals' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'beverages', label: 'Beverages & Chai' },
  ];

  const filteredItems = MOCK_FOOD_ITEMS.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  const cartTotal = foodCart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const totalItemsCount = foodCart.reduce((sum, item) => sum + item.quantity, 0);

  const getItemQuantity = (itemId: string) => {
    return foodCart.find(i => i.item.id === itemId)?.quantity || 0;
  };

  const handlePlaceOrder = () => {
    if (foodCart.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }
    clearFoodCart();
    setCartDrawerOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-orange-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold text-amber-200 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            IRCTC Official e-Catering
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Order Fresh Restaurant Food on Train
          </h1>
          <p className="text-xs sm:text-sm text-amber-100">
            FSSAI-certified hygienic meals delivered warm directly to your berth at railway halt stations.
          </p>
        </div>

        {/* PNR Delivery Box */}
        <div className="bg-white text-slate-900 rounded-2xl p-4 shadow-lg w-full md:w-80 space-y-2 shrink-0">
          <span className="text-[11px] font-bold text-slate-500 uppercase block">
            Deliver To Your Journey
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={foodPnr}
              onChange={e => setFoodPnr(e.target.value)}
              placeholder="10-digit PNR"
              className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-300 focus:outline-none focus:border-amber-600"
            />
            <button
              onClick={() => showToast('PNR linked to meal delivery', 'success')}
              className="px-3 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl hover:bg-amber-700"
            >
              Verify
            </button>
          </div>
          <p className="text-[10px] text-slate-400">
            Auto-syncs station halts & berth allocation.
          </p>
        </div>
      </div>

      {/* CATEGORY TABS & CART TRIGGER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cart Trigger */}
        <button
          onClick={() => setCartDrawerOpen(true)}
          className="relative px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 self-start sm:self-auto shadow-md"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>View Cart (₹{cartTotal})</span>
          {totalItemsCount > 0 && (
            <span className="w-5 h-5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {totalItemsCount}
            </span>
          )}
        </button>
      </div>

      {/* FOOD ITEMS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItems.map(item => {
          const qty = getItemQuantity(item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  {/* Veg / Non-Veg Indicator */}
                  <div
                    className={`w-4 h-4 rounded-sm border p-0.5 flex items-center justify-center ${
                      item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                    />
                  </div>

                  {item.badge && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {item.rating}
                  </span>
                  <span>·</span>
                  <span>{item.calories}</span>
                </div>
              </div>

              {/* Price & Add to Cart Counter */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="text-base font-extrabold text-slate-900">
                  ₹{item.price}
                </div>

                {qty === 0 ? (
                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    + ADD
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-amber-600 text-white rounded-xl px-2 py-1 shadow-xs">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-amber-700 rounded"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-xs px-1">{qty}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="p-1 hover:bg-amber-700 rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CART DRAWER / MODAL */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setCartDrawerOpen(false)}
          />

          <div className="relative bg-white w-full sm:max-w-md h-full z-10 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Your Meal Order</h3>
                  <p className="text-xs text-slate-500">Linked to PNR {foodPnr}</p>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-700"
                >
                  Close
                </button>
              </div>

              {/* Delivery Details */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">
                    Delivery Station Halt
                  </label>
                  <input
                    type="text"
                    value={deliveryStation}
                    onChange={e => setDeliveryStation(e.target.value)}
                    className="w-full mt-0.5 p-2 bg-white rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">
                    Coach & Berth Note
                  </label>
                  <input
                    type="text"
                    value={coachSeat}
                    onChange={e => setCoachSeat(e.target.value)}
                    className="w-full mt-0.5 p-2 bg-white rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Cart Items ({totalItemsCount})
                </span>

                {foodCart.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-4 text-center">Your cart is empty.</p>
                ) : (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                    {foodCart.map(ci => (
                      <div key={ci.item.id} className="p-3 bg-white flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{ci.item.name}</div>
                          <div className="text-slate-500">₹{ci.item.price} each</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(ci.item.id)}
                            className="p-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold w-4 text-center">{ci.quantity}</span>
                          <button
                            onClick={() => addToCart(ci.item)}
                            className="p-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Grand Total</span>
                <span className="text-lg text-amber-700">₹{cartTotal}</span>
              </div>

              <button
                disabled={foodCart.length === 0}
                onClick={handlePlaceOrder}
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Place e-Catering Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
