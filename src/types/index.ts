export type QuotaType = 'GN' | 'TQ' | 'LD' | 'SS'; // General, Tatkal, Ladies, Senior Citizen

export interface Station {
  code: string;
  name: string;
  city: string;
  state: string;
  junction?: boolean;
}

export type ClassCode = '1A' | '2A' | '3A' | '3E' | 'SL' | 'CC' | 'EC';

export interface TrainClass {
  code: ClassCode;
  name: string;
  fare: number;
  seatsAvailable: number;
  status: 'AVAILABLE' | 'RAC' | 'WL';
  statusDetail: string; // e.g. "AVL 48", "RAC 12", "WL 34"
  confirmationProbability: 'HIGH' | 'MEDIUM' | 'LOW';
  tatkalFare?: number;
  tatkalAvailable?: number;
}

export interface RouteStop {
  station: Station;
  arrival: string;
  departure: string;
  haltMinutes: number;
  distanceKm: number;
  day: number;
  platform?: string;
  status?: 'departed' | 'current' | 'upcoming';
  delayMinutes?: number;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  type: 'Vande Bharat' | 'Rajdhani' | 'Shatabdi' | 'Superfast' | 'Mail/Express' | 'Duronto';
  fromStation: Station;
  toStation: Station;
  departureTime: string;
  arrivalTime: string;
  durationHours: number;
  durationMinutes: number;
  runsOn: string[]; // ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  classes: TrainClass[];
  intermediateStations: RouteStop[];
  amenities: string[];
  hasPantry: boolean;
  rating: number;
  punctualityScore: number; // e.g. 96 (%)
  coachLayout?: string[]; // e.g. ['ENG', 'EOG', 'B1', 'B2', 'B3', 'A1', 'H1', 'PC', 'EOG']
}

export type BerthPreference = 'lower' | 'middle' | 'upper' | 'side_lower' | 'side_upper' | 'window' | 'none';

export interface Passenger {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'transgender';
  berthPreference: BerthPreference;
  seniorCitizen?: boolean;
  foodPreference?: 'veg' | 'non_veg' | 'jain' | 'none';
  allottedCoach?: string;
  allottedBerth?: string;
  bookingStatus?: string; // e.g. "CNF", "RAC", "WL"
  currentStatus?: string;
}

export interface Booking {
  id: string;
  pnr: string;
  bookingDate: string;
  journeyDate: string;
  train: Train;
  selectedClass: TrainClass;
  quota: QuotaType;
  passengers: Passenger[];
  contactMobile: string;
  contactEmail: string;
  travelInsurance: boolean;
  autoUpgrade: boolean;
  fareBreakdown: {
    baseFare: number;
    reservationCharge: number;
    superfastCharge: number;
    gst: number;
    insurance: number;
    total: number;
  };
  paymentMethod: string;
  status: 'CONFIRMED' | 'RAC' | 'WAITLIST' | 'CANCELLED' | 'COMPLETED';
  cancellationDetails?: {
    cancelledAt: string;
    refundAmount: number;
    cancellationCharges: number;
    refundStatus: 'Initiated' | 'Processed';
  };
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'breakfast' | 'meals' | 'snacks' | 'beverages' | 'regional';
  price: number;
  rating: number;
  isVeg: boolean;
  description: string;
  calories?: string;
  badge?: string;
}

export interface CartItem {
  item: FoodItem;
  quantity: number;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice: number;
  distanceToStation: string;
  amenities: string[];
  tag?: string;
}

export interface TourismPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  departureCity: string;
  destinations: string[];
  pricePerPerson: number;
  originalPrice: number;
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  tourType: 'Bharat Gaurav' | 'Vande Bharat Tour' | 'Heritage' | 'Pilgrimage';
}

export interface RetiringRoom {
  id: string;
  stationCode: string;
  stationName: string;
  roomType: 'AC Deluxe' | 'AC Standard' | 'Non-AC' | 'Dormitory';
  price12h: number;
  price24h: number;
  availableUnits: number;
  amenities: string[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'info' | 'success' | 'alert';
  read: boolean;
  pnr?: string;
}
