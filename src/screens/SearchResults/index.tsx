import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen } from '@components';
import { hotels } from '@data';
import { useBooking } from '@context';
import { SearchHeader, SortOptions, ResultsList } from './components';

export default function SearchResults() {
  const navigate = useNavigate();
  const { booking } = useBooking();
  const [sortBy, setSortBy] = useState('recommended');

  return (
    <MobileScreen className="bg-neutral-50">
      <SearchHeader
        location={booking.searchLocation || 'New York'}
        checkIn={booking.checkIn}
        checkOut={booking.checkOut}
        guests={booking.guests}
        onBack={() => navigate('/home')}
        onFilterClick={() => {}}
      />

      <div className="px-6 pt-4">
        <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      <ResultsList hotels={hotels} />
    </MobileScreen>
  );
}
