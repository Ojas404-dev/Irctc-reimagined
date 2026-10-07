import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { TicketModal } from './components/TicketModal';
import { TrainDetailsModal } from './components/TrainDetailsModal';
import { LoginModal } from './components/LoginModal';

// Pages
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { BookingPage } from './pages/BookingPage';
import { PNRStatusPage } from './pages/PNRStatusPage';
import { LiveStatusPage } from './pages/LiveStatusPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { FoodPage } from './pages/FoodPage';
import { HotelsPage } from './pages/HotelsPage';
import { TourismPage } from './pages/TourismPage';
import { RetiringRoomsPage } from './pages/RetiringRoomsPage';
import { ProfilePage } from './pages/ProfilePage';
import { HelpPage } from './pages/HelpPage';
import { NotificationsPage } from './pages/NotificationsPage';

const AppContent: React.FC = () => {
  const { currentPage, viewingTicket, setViewingTicket, viewingTrain, setViewingTrain } = useApp();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header onOpenLogin={() => setLoginModalOpen(true)} />

      {/* Main Content Router */}
      <div className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'search' && <SearchPage />}
        {currentPage === 'booking' && <BookingPage />}
        {currentPage === 'pnr' && <PNRStatusPage />}
        {currentPage === 'live-status' && <LiveStatusPage />}
        {currentPage === 'bookings' && <MyBookingsPage />}
        {currentPage === 'food' && <FoodPage />}
        {currentPage === 'hotels' && <HotelsPage />}
        {currentPage === 'tourism' && <TourismPage />}
        {currentPage === 'retiring-rooms' && <RetiringRoomsPage />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'help' && <HelpPage />}
        {currentPage === 'notifications' && <NotificationsPage />}
      </div>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />

      {/* Toast Feedback */}
      <Toast />

      {/* Global Modals */}
      <TicketModal
        booking={viewingTicket}
        onClose={() => setViewingTicket(null)}
      />

      <TrainDetailsModal
        train={viewingTrain}
        onClose={() => setViewingTrain(null)}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
