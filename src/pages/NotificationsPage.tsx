import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCheck, Clock, FileText, Info, CheckCircle2, ChevronRight } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markAllNotificationsAsRead, unreadNotificationsCount, setCurrentPage, lookupPnr } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Journey Alerts & Notifications
          </h1>
          <p className="text-xs text-slate-500">
            Real-time updates regarding chart preparation, platform changes, and PNR status.
          </p>
        </div>

        {unreadNotificationsCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-700 hover:bg-blue-50 border border-blue-200 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Read</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
            <Bell className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">No Notifications</h3>
            <p className="text-xs text-slate-500">You are all caught up on journey updates!</p>
          </div>
        ) : (
          notifications.map(n => {
            const isUnread = !n.read;

            return (
              <div
                key={n.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  isUnread
                    ? 'bg-blue-50/50 border-blue-200 shadow-2xs'
                    : 'bg-white border-slate-200/90'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      n.type === 'success'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {n.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Info className="w-5 h-5" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{n.title}</h4>
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-slate-400 block pt-0.5">{n.timeAgo}</span>
                  </div>
                </div>

                {n.pnr && (
                  <button
                    onClick={() => {
                      lookupPnr(n.pnr!);
                      setCurrentPage('pnr');
                    }}
                    className="shrink-0 px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-400 rounded-xl text-xs font-bold text-blue-700 transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <span>View PNR</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
