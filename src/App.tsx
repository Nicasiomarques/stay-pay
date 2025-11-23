import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from '@context';
import { ErrorBoundary, LoadingScreen } from '@components';

// Lazy load all route components for code splitting
const Onboarding = lazy(() => import('@screens/Onboarding'));
const Home = lazy(() => import('@screens/Home'));
const SearchResults = lazy(() => import('@screens/SearchResults'));
const HotelDetail = lazy(() => import('@screens/HotelDetail'));
const Calendar = lazy(() => import('@screens/Calendar'));
const BookingReview = lazy(() => import('@screens/BookingReview'));
const Payment = lazy(() => import('@screens/Payment'));
const Confirmation = lazy(() => import('@screens/Confirmation'));
const Profile = lazy(() => import('@screens/Profile'));
const Favorites = lazy(() => import('@screens/Favorites'));
const Bookings = lazy(() => import('@screens/Bookings'));

export default function App() {
  return (
    <ErrorBoundary>
      <BookingProvider>
        <Router>
          <div className="min-h-screen bg-neutral-50">
            <Suspense fallback={<LoadingScreen />}>
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
            </Suspense>
          </div>
        </Router>
      </BookingProvider>
    </ErrorBoundary>
  );
}