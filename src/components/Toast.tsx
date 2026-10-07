import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-200 bg-white text-slate-900',
    error: 'border-rose-200 bg-white text-slate-900',
    info: 'border-blue-200 bg-white text-slate-900',
  };

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-4 left-4 sm:left-auto sm:right-8 z-50 flex justify-center sm:justify-end pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border ${
          borders[toast.type]
        } animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-md`}
      >
        {icons[toast.type]}
        <span className="text-xs sm:text-sm font-semibold text-slate-800">{toast.message}</span>
      </div>
    </div>
  );
};
