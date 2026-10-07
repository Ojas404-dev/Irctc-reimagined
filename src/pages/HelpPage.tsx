import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Search,
  PhoneCall,
  ShieldAlert,
  FileQuestion,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  X,
  MessageSquare
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);
  const [complaintText, setComplaintText] = useState('');
  const [complaintPnr, setComplaintPnr] = useState('4827163950');
  const [registeredTicketNo, setRegisteredTicketNo] = useState<string | null>(null);

  const faqs = [
    {
      q: 'What are the Tatkal booking timings for AC and Non-AC classes?',
      a: 'Tatkal booking opens daily at 10:00 AM IST for AC classes (1A, 2A, 3A, 3E, CC, EC) and at 11:00 AM IST for Non-AC classes (Sleeper SL, Second Seating 2S). On IRCTC Reimagined, use pre-saved passenger lists for 1-click checkout.',
    },
    {
      q: 'How does the cancellation refund matrix work on Indian Railways?',
      a: 'If cancelled more than 48 hours prior to train departure: flat cancellation fees apply (1A: ₹240, 2A: ₹200, 3A: ₹180, SL: ₹120 per passenger). Between 48h and 12h: 25% of fare is deducted. Between 12h and 4h (before chart preparation): 50% is deducted. After chart preparation: no refund is admissible.',
    },
    {
      q: 'What is the difference between RAC and Waitlist (WL)?',
      a: 'RAC (Reservation Against Cancellation) guarantees travel boarding and a confirmed sitting berth (shared lower berth with another RAC passenger). If any confirmed passenger cancels before chart preparation, RAC passengers are automatically upgraded to full berths. Waitlisted passengers cannot board reserved coaches unless their ticket confirms.',
    },
    {
      q: 'When are train reservation charts prepared?',
      a: 'The first reservation chart is prepared approximately 4 hours prior to scheduled train departure from the originating station. The final chart is prepared 30 minutes before departure for any current Tatkal or emergency allocations.',
    },
    {
      q: 'How do I receive meals ordered through e-Catering?',
      a: 'When you order meals through IRCTC e-Catering, our kitchen partners verify train tracking live. A delivery executive delivers the fresh sealed meal package directly to your coach and berth during the train halt at your selected station.',
    },
  ];

  const filteredFaqs = faqs.filter(
    f =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegisterComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim()) return;
    const ticket = `RM-${Math.floor(100000 + Math.random() * 900000)}`;
    setRegisteredTicketNo(ticket);
    setComplaintText('');
    showToast(`Rail Madad Incident Registered: ${ticket}`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-5 text-center">
        <div className="max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full">
            Passenger Assistance & Support
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            How can we help your journey?
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Search answers to ticketing rules, cancellation charges, and 24x7 Rail Madad services.
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. Tatkal, RAC, Refund, Charting)"
            className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          />
        </div>
      </div>

      {/* 24x7 HELPLINE CONTACT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Rail Madad Helpline</span>
            <div className="font-extrabold text-sm sm:text-base text-slate-900">Dial 139</div>
            <span className="text-[10px] text-emerald-600 font-medium">Toll Free 24x7</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">RPF Security Control</span>
            <div className="font-extrabold text-sm sm:text-base text-slate-900">Dial 182</div>
            <span className="text-[10px] text-rose-600 font-medium">Emergency Response</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">File Rail Grievance</span>
            <div className="font-extrabold text-xs text-slate-900 mt-0.5">Rail Madad Portal</div>
          </div>
          <button
            onClick={() => setComplaintModalOpen(true)}
            className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-2xs"
          >
            Raise Ticket
          </button>
        </div>
      </div>

      {/* FAQS ACCORDION */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">
          Frequently Asked Questions
        </h3>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openFaq === i;

            return (
              <div key={i} className="bg-white">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-700' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* COMPLAINT MODAL */}
      {complaintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setComplaintModalOpen(false)} />
          <div className="relative bg-white rounded-3xl p-6 max-w-md w-full z-10 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Rail Madad Grievance</h3>
              <button onClick={() => setComplaintModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {registeredTicketNo ? (
              <div className="text-center py-4 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900">Assistance Ticket Registered</h4>
                <p className="text-xs text-slate-500">
                  Reference: <strong className="font-mono text-slate-900">{registeredTicketNo}</strong>
                </p>
                <p className="text-xs text-slate-500">
                  On-board train supervisor and divisional rail control notified.
                </p>
                <button
                  onClick={() => {
                    setRegisteredTicketNo(null);
                    setComplaintModalOpen(false);
                  }}
                  className="w-full py-2 bg-blue-700 text-white font-bold text-xs rounded-xl mt-2"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterComplaint} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Journey PNR (Optional)</label>
                  <input
                    type="text"
                    value={complaintPnr}
                    onChange={e => setComplaintPnr(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Issue Description</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe cleanliness, AC temperature, pantry, or coach assistance required..."
                    value={complaintText}
                    onChange={e => setComplaintText(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl mt-2 shadow-xs"
                >
                  Submit Incident to Rail Madad
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
