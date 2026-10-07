import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Station,
  Train,
  TrainClass,
  Booking,
  Passenger,
  FoodItem,
  CartItem,
  AppNotification,
  QuotaType,
  ClassCode,
} from '../types';
import {
  STATIONS,
  MOCK_TRAINS,
  INITIAL_BOOKINGS,
  INITIAL_SAVED_PASSENGERS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

export type PageId =
  | 'home'
  | 'search'
  | 'booking'
  | 'pnr'
  | 'live-status'
  | 'bookings'
  | 'food'
  | 'hotels'
  | 'tourism'
  | 'retiring-rooms'
  | 'profile'
  | 'help'
  | 'notifications';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  sbiPoints: number;
  isLoggedIn: boolean;
}

interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;

  // Search State
  fromStation: Station | null;
  toStation: Station | null;
  journeyDate: string;
  quota: QuotaType;
  travelClass: ClassCode | 'ALL';
  setFromStation: (station: Station | null) => void;
  setToStation: (station: Station | null) => void;
  setJourneyDate: (date: string) => void;
  setQuota: (quota: QuotaType) => void;
  setTravelClass: (cls: ClassCode | 'ALL') => void;
  swapStations: () => void;
  startSearch: (from?: Station, to?: Station, date?: string) => void;

  // Search Results Filters
  departureTimeFilter: 'all' | 'morning' | 'afternoon' | 'evening' | 'night';
  setDepartureTimeFilter: (filter: 'all' | 'morning' | 'afternoon' | 'evening' | 'night') => void;
  trainTypeFilter: 'all' | 'Rajdhani' | 'Vande Bharat' | 'Shatabdi' | 'Superfast';
  setTrainTypeFilter: (filter: 'all' | 'Rajdhani' | 'Vande Bharat' | 'Shatabdi' | 'Superfast') => void;
  classFilter: 'all' | ClassCode;
  setClassFilter: (filter: 'all' | ClassCode) => void;
  availableOnly: boolean;
  setAvailableOnly: (avail: boolean) => void;
  sortBy: 'recommended' | 'departure' | 'arrival' | 'duration' | 'fare';
  setSortBy: (sort: 'recommended' | 'departure' | 'arrival' | 'duration' | 'fare') => void;
  filteredTrains: Train[];

  // Booking Flow Draft
  draftTrain: Train | null;
  draftClass: TrainClass | null;
  draftStep: 1 | 2 | 3 | 4;
  draftPassengers: Passenger[];
  draftContactMobile: string;
  draftContactEmail: string;
  draftInsurance: boolean;
  draftAutoUpgrade: boolean;
  setDraftStep: (step: 1 | 2 | 3 | 4) => void;
  startBooking: (train: Train, selectedClass: TrainClass) => void;
  setDraftPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
  setDraftContactMobile: (mobile: string) => void;
  setDraftContactEmail: (email: string) => void;
  setDraftInsurance: (val: boolean) => void;
  setDraftAutoUpgrade: (val: boolean) => void;
  confirmCurrentBooking: (paymentMethod: string) => Booking;
  confirmedBooking: Booking | null;

  // Bookings Record & Cancellation
  bookings: Booking[];
  cancelBooking: (bookingId: string) => { refundAmount: number; fee: number };

  // Saved Passengers
  savedPassengers: Passenger[];
  addSavedPassenger: (passenger: Omit<Passenger, 'id'>) => void;
  removeSavedPassenger: (id: string) => void;

  // Food Cart
  foodCart: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  clearFoodCart: () => void;
  foodPnr: string;
  setFoodPnr: (pnr: string) => void;

  // PNR Search
  searchedPnr: string;
  pnrResult: Booking | null;
  lookupPnr: (pnr: string) => { found: boolean; booking?: Booking };

  // Live Train Status
  searchedTrainNo: string;
  selectedLiveTrain: Train | null;
  trackTrain: (trainNoOrName: string) => boolean;

  // Notifications
  notifications: AppNotification[];
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // User Profile
  user: UserProfile;
  loginUser: (name: string, email: string, phone: string) => void;
  logoutUser: () => void;

  // Modals & Overlays
  viewingTrain: Train | null;
  setViewingTrain: (t: Train | null) => void;
  viewingTicket: Booking | null;
  setViewingTicket: (b: Booking | null) => void;

  // Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper for default tomorrow's date formatted as YYYY-MM-DD
const getTomorrowDateStr = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<PageId>('home');

  const setCurrentPage = (page: PageId) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search State
  const [fromStation, setFromStation] = useState<Station | null>(STATIONS.find(s => s.code === 'MMCT') || STATIONS[1]);
  const [toStation, setToStation] = useState<Station | null>(STATIONS.find(s => s.code === 'NDLS') || STATIONS[0]);
  const [journeyDate, setJourneyDate] = useState<string>(getTomorrowDateStr());
  const [quota, setQuota] = useState<QuotaType>('GN');
  const [travelClass, setTravelClass] = useState<ClassCode | 'ALL'>('ALL');

  // Results Filters
  const [departureTimeFilter, setDepartureTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening' | 'night'>('all');
  const [trainTypeFilter, setTrainTypeFilter] = useState<'all' | 'Rajdhani' | 'Vande Bharat' | 'Shatabdi' | 'Superfast'>('all');
  const [classFilter, setClassFilter] = useState<'all' | ClassCode>('all');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'departure' | 'arrival' | 'duration' | 'fare'>('recommended');

  // Booking Draft
  const [draftTrain, setDraftTrain] = useState<Train | null>(null);
  const [draftClass, setDraftClass] = useState<TrainClass | null>(null);
  const [draftStep, setDraftStep] = useState<1 | 2 | 3 | 4>(1);
  const [draftPassengers, setDraftPassengers] = useState<Passenger[]>([
    {
      id: 'pass-draft-1',
      name: 'Rahul Sharma',
      age: 28,
      gender: 'male',
      berthPreference: 'lower',
      foodPreference: 'veg',
    },
  ]);
  const [draftContactMobile, setDraftContactMobile] = useState('+91 98765 43210');
  const [draftContactEmail, setDraftContactEmail] = useState('rahul.sharma@example.com');
  const [draftInsurance, setDraftInsurance] = useState(true);
  const [draftAutoUpgrade, setDraftAutoUpgrade] = useState(true);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Storage states with localStorage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem('irctc_bookings');
      return stored ? JSON.parse(stored) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [savedPassengers, setSavedPassengers] = useState<Passenger[]>(() => {
    try {
      const stored = localStorage.getItem('irctc_saved_passengers');
      return stored ? JSON.parse(stored) : INITIAL_SAVED_PASSENGERS;
    } catch {
      return INITIAL_SAVED_PASSENGERS;
    }
  });

  const [foodCart, setFoodCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('irctc_food_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [foodPnr, setFoodPnr] = useState('4827163950');

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const stored = localStorage.getItem('irctc_notifications');
      return stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('irctc_user');
      return stored
        ? JSON.parse(stored)
        : {
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            phone: '+91 98765 43210',
            sbiPoints: 1450,
            isLoggedIn: true,
          };
    } catch {
      return {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '+91 98765 43210',
        sbiPoints: 1450,
        isLoggedIn: true,
      };
    }
  });

  // Modals & UI Overlays
  const [viewingTrain, setViewingTrain] = useState<Train | null>(null);
  const [viewingTicket, setViewingTicket] = useState<Booking | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // PNR Search State
  const [searchedPnr, setSearchedPnr] = useState('');
  const [pnrResult, setPnrResult] = useState<Booking | null>(null);

  // Live Train Status
  const [searchedTrainNo, setSearchedTrainNo] = useState('12951');
  const [selectedLiveTrain, setSelectedLiveTrain] = useState<Train | null>(MOCK_TRAINS[0]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('irctc_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('irctc_saved_passengers', JSON.stringify(savedPassengers));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [savedPassengers]);

  useEffect(() => {
    try {
      localStorage.setItem('irctc_food_cart', JSON.stringify(foodCart));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [foodCart]);

  useEffect(() => {
    try {
      localStorage.setItem('irctc_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('irctc_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [user]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
    showToast('Stations swapped', 'info');
  };

  const startSearch = (from?: Station, to?: Station, date?: string) => {
    if (from) setFromStation(from);
    if (to) setToStation(to);
    if (date) setJourneyDate(date);
    setCurrentPage('search');
  };

  // Filter trains based on active station route & filters
  const filteredTrains = MOCK_TRAINS.filter(train => {
    // If from and to stations match route
    if (fromStation && toStation) {
      const matchDirect = train.fromStation.code === fromStation.code && train.toStation.code === toStation.code;
      const matchSubroute =
        train.intermediateStations.some(s => s.station.code === fromStation.code) &&
        train.intermediateStations.some(s => s.station.code === toStation.code);

      // If neither direct nor subroute matches, provide route simulation
      // If none match, we fallback to showing trains so user always sees realistic results
      if (!matchDirect && !matchSubroute) {
        // Return trains that share at least one city or fallback to all for demo delight
        const shareEither = train.fromStation.code === fromStation.code || train.toStation.code === toStation.code;
        if (!shareEither && MOCK_TRAINS.some(t => t.fromStation.code === fromStation.code && t.toStation.code === toStation.code)) {
          return false;
        }
      }
    }

    // Departure time filter
    if (departureTimeFilter !== 'all') {
      const hour = parseInt(train.departureTime.split(':')[0], 10);
      if (departureTimeFilter === 'morning' && (hour < 6 || hour >= 12)) return false;
      if (departureTimeFilter === 'afternoon' && (hour < 12 || hour >= 18)) return false;
      if (departureTimeFilter === 'evening' && (hour < 18 || hour >= 23)) return false;
      if (departureTimeFilter === 'night' && (hour >= 6 && hour < 23)) return false;
    }

    // Train Type filter
    if (trainTypeFilter !== 'all' && train.type !== trainTypeFilter) {
      return false;
    }

    // Class filter
    if (classFilter !== 'all') {
      const hasClass = train.classes.some(c => c.code === classFilter);
      if (!hasClass) return false;
    }

    // Available only filter
    if (availableOnly) {
      const hasAvailable = train.classes.some(c => c.status === 'AVAILABLE' && c.seatsAvailable > 0);
      if (!hasAvailable) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'departure') {
      return a.departureTime.localeCompare(b.departureTime);
    }
    if (sortBy === 'arrival') {
      return a.arrivalTime.localeCompare(b.arrivalTime);
    }
    if (sortBy === 'duration') {
      const durA = a.durationHours * 60 + a.durationMinutes;
      const durB = b.durationHours * 60 + b.durationMinutes;
      return durA - durB;
    }
    if (sortBy === 'fare') {
      const minFareA = Math.min(...a.classes.map(c => c.fare));
      const minFareB = Math.min(...b.classes.map(c => c.fare));
      return minFareA - minFareB;
    }
    // 'recommended'
    return b.rating * b.punctualityScore - a.rating * a.punctualityScore;
  });

  const startBooking = (train: Train, selectedClass: TrainClass) => {
    setDraftTrain(train);
    setDraftClass(selectedClass);
    setDraftStep(1);
    setCurrentPage('booking');
  };

  const confirmCurrentBooking = (paymentMethod: string): Booking => {
    if (!draftTrain || !draftClass) {
      throw new Error('No draft booking to confirm');
    }

    // Generate random 10 digit PNR starting with 4, 6 or 8
    const random10 = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const coachPrefix = draftClass.code === '1A' ? 'H1' : draftClass.code === '2A' ? 'A1' : draftClass.code === '3A' ? 'B2' : draftClass.code === 'CC' ? 'C2' : 'S4';

    const allottedPassengers = draftPassengers.map((p, index) => {
      const berthNo = (24 + index * 2).toString();
      const berthType = p.berthPreference !== 'none' ? p.berthPreference.toUpperCase() : 'LOWER';
      return {
        ...p,
        allottedCoach: coachPrefix,
        allottedBerth: berthNo,
        bookingStatus: 'CNF',
        currentStatus: `CNF / ${coachPrefix} / ${berthNo} (${berthType})`,
      };
    });

    const passCount = draftPassengers.length;
    const baseFareTotal = (draftClass.fare * passCount);
    const reservationFee = 40 * passCount;
    const superfastFee = 45 * passCount;
    const insuranceFee = draftInsurance ? 0.35 * passCount : 0;
    const gst = Math.round((baseFareTotal + reservationFee + superfastFee) * 0.05);
    const totalAmount = baseFareTotal + reservationFee + superfastFee + insuranceFee + gst;

    const newBooking: Booking = {
      id: `book-${random10}`,
      pnr: random10,
      bookingDate: new Date().toISOString().split('T')[0],
      journeyDate: journeyDate,
      train: draftTrain,
      selectedClass: draftClass,
      quota,
      passengers: allottedPassengers,
      contactMobile: draftContactMobile,
      contactEmail: draftContactEmail,
      travelInsurance: draftInsurance,
      autoUpgrade: draftAutoUpgrade,
      fareBreakdown: {
        baseFare: baseFareTotal,
        reservationCharge: reservationFee,
        superfastCharge: superfastFee,
        gst,
        insurance: insuranceFee,
        total: totalAmount,
      },
      paymentMethod,
      status: 'CONFIRMED',
    };

    setBookings(prev => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);
    setDraftStep(4);

    // Add confirmation notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Booking Confirmed: PNR ${random10}`,
      message: `Your journey on ${draftTrain.number} ${draftTrain.name} has been confirmed. Coach: ${coachPrefix}.`,
      timeAgo: 'Just now',
      type: 'success',
      read: false,
      pnr: random10,
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(`Booking Confirmed! PNR: ${random10}`, 'success');

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    let refundAmount = 0;
    let fee = 240;

    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          fee = b.selectedClass.code === '1A' ? 240 : b.selectedClass.code === '2A' ? 200 : b.selectedClass.code === '3A' ? 180 : 120;
          refundAmount = Math.max(0, b.fareBreakdown.total - fee);
          return {
            ...b,
            status: 'CANCELLED',
            cancellationDetails: {
              cancelledAt: new Date().toISOString().split('T')[0],
              refundAmount,
              cancellationCharges: fee,
              refundStatus: 'Initiated',
            },
          };
        }
        return b;
      })
    );

    showToast(`Ticket cancelled. ₹${refundAmount} refund initiated.`, 'info');
    return { refundAmount, fee };
  };

  const addSavedPassenger = (passenger: Omit<Passenger, 'id'>) => {
    const newP: Passenger = {
      ...passenger,
      id: `saved-${Date.now()}`,
    };
    setSavedPassengers(prev => [...prev, newP]);
    showToast(`${passenger.name} added to Saved Passengers`, 'success');
  };

  const removeSavedPassenger = (id: string) => {
    setSavedPassengers(prev => prev.filter(p => p.id !== id));
    showToast('Passenger removed', 'info');
  };

  const addToCart = (item: FoodItem) => {
    setFoodCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => (i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`${item.name} added to cart`, 'success');
  };

  const removeFromCart = (itemId: string) => {
    setFoodCart(prev => {
      const existing = prev.find(i => i.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => (i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i));
      }
      return prev.filter(i => i.item.id !== itemId);
    });
  };

  const clearFoodCart = () => {
    setFoodCart([]);
    showToast('Food order placed! Delivery scheduled at next halt station.', 'success');
  };

  const lookupPnr = (pnr: string) => {
    const cleanPnr = pnr.trim();
    setSearchedPnr(cleanPnr);

    // Look in bookings
    const foundBooking = bookings.find(b => b.pnr === cleanPnr);
    if (foundBooking) {
      setPnrResult(foundBooking);
      return { found: true, booking: foundBooking };
    }

    // Default mock PNR fallback for testing
    if (cleanPnr === '4827163950' || cleanPnr === '6294018274') {
      const match = INITIAL_BOOKINGS.find(b => b.pnr === cleanPnr);
      if (match) {
        setPnrResult(match);
        return { found: true, booking: match };
      }
    }

    setPnrResult(null);
    return { found: false };
  };

  const trackTrain = (trainNoOrName: string) => {
    const query = trainNoOrName.trim().toLowerCase();
    setSearchedTrainNo(trainNoOrName);

    const found = MOCK_TRAINS.find(
      t => t.number.toLowerCase() === query || t.name.toLowerCase().includes(query)
    );

    if (found) {
      setSelectedLiveTrain(found);
      return true;
    }

    // Fallback default train
    setSelectedLiveTrain(MOCK_TRAINS[0]);
    return false;
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const loginUser = (name: string, email: string, phone: string) => {
    setUser({
      name,
      email,
      phone,
      sbiPoints: 1450,
      isLoggedIn: true,
    });
    showToast(`Welcome back, ${name}!`, 'success');
  };

  const logoutUser = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
    showToast('Signed out successfully', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        fromStation,
        toStation,
        journeyDate,
        quota,
        travelClass,
        setFromStation,
        setToStation,
        setJourneyDate,
        setQuota,
        setTravelClass,
        swapStations,
        startSearch,
        departureTimeFilter,
        setDepartureTimeFilter,
        trainTypeFilter,
        setTrainTypeFilter,
        classFilter,
        setClassFilter,
        availableOnly,
        setAvailableOnly,
        sortBy,
        setSortBy,
        filteredTrains,
        draftTrain,
        draftClass,
        draftStep,
        draftPassengers,
        draftContactMobile,
        draftContactEmail,
        draftInsurance,
        draftAutoUpgrade,
        setDraftStep,
        startBooking,
        setDraftPassengers,
        setDraftContactMobile,
        setDraftContactEmail,
        setDraftInsurance,
        setDraftAutoUpgrade,
        confirmCurrentBooking,
        confirmedBooking,
        bookings,
        cancelBooking,
        savedPassengers,
        addSavedPassenger,
        removeSavedPassenger,
        foodCart,
        addToCart,
        removeFromCart,
        clearFoodCart,
        foodPnr,
        setFoodPnr,
        searchedPnr,
        pnrResult,
        lookupPnr,
        searchedTrainNo,
        selectedLiveTrain,
        trackTrain,
        notifications,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        user,
        loginUser,
        logoutUser,
        viewingTrain,
        setViewingTrain,
        viewingTicket,
        setViewingTicket,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
