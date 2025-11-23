import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import SearchResults from './screens/SearchResults';
import HotelDetail from './screens/HotelDetail';
import Calendar from './screens/Calendar';
import BookingReview from './screens/BookingReview';
import Payment from './screens/Payment';
import Confirmation from './screens/Confirmation';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import Bookings from './screens/Bookings';

export default function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="min-h-screen bg-neutral-50">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/hotel/:id" element={<HotelDetail />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/booking-review" element={<BookingReview />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </div>
      </Router>
    </BookingProvider>
  );
}