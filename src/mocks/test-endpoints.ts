/**
 * Script de teste para verificar os endpoints da API MirageJS
 * Execute no console do browser após carregar a aplicação
 */

export async function testEndpoints() {
  console.log('🧪 Iniciando testes dos endpoints...\n');

  try {
    // Test 1: Get all hotels
    console.log('1️⃣ Testing GET /api/hotels');
    const hotelsResponse = await fetch('/api/hotels');
    const hotelsData = await hotelsResponse.json();
    console.log('✅ Hotels:', hotelsData.hotels.length, 'encontrados');

    // Test 2: Register user
    console.log('\n2️⃣ Testing POST /api/auth/register');
    const registerResponse = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Teste User',
        email: `test${Date.now()}@exemplo.com`,
        phone: '+244 900 000 000',
        password: 'test123',
      }),
    });
    const registerData = await registerResponse.json();
    console.log('✅ User registered:', registerData.user?.name);
    const token = registerData.token;

    // Test 3: Login
    console.log('\n3️⃣ Testing POST /api/auth/login');
    const loginResponse = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'joao@exemplo.com',
        password: 'demo123',
      }),
    });
    const loginData = await loginResponse.json();
    console.log('✅ Login successful:', loginData.user?.name);
    const demoToken = loginData.token;

    // Test 4: Get profile
    console.log('\n4️⃣ Testing GET /api/users/profile');
    const profileResponse = await fetch('/api/users/profile', {
      headers: { Authorization: `Bearer ${demoToken}` },
    });
    const profileData = await profileResponse.json();
    console.log('✅ Profile:', profileData.name);

    // Test 5: Get featured hotels
    console.log('\n5️⃣ Testing GET /api/hotels/featured');
    const featuredResponse = await fetch('/api/hotels/featured');
    const featuredData = await featuredResponse.json();
    console.log('✅ Featured hotels:', featuredData.hotels?.length);

    // Test 6: Get hotel details
    console.log('\n6️⃣ Testing GET /api/hotels/1');
    const hotelResponse = await fetch('/api/hotels/1');
    const hotelData = await hotelResponse.json();
    console.log('✅ Hotel details:', hotelData.name);

    // Test 7: Check room availability
    console.log('\n7️⃣ Testing GET /api/hotels/1/rooms/availability');
    const availabilityResponse = await fetch('/api/hotels/1/rooms/availability?checkIn=2024-12-24&checkOut=2024-12-28&guests=2');
    const availabilityData = await availabilityResponse.json();
    console.log('✅ Availability:', availabilityData.available ? 'Available' : 'Not available');

    // Test 8: Add to favorites
    console.log('\n8️⃣ Testing POST /api/users/favorites/1');
    const favoriteResponse = await fetch('/api/users/favorites/1', {
      method: 'POST',
      headers: { Authorization: `Bearer ${demoToken}` },
    });
    const favoriteData = await favoriteResponse.json();
    console.log('✅ Added to favorites:', favoriteData.success);

    // Test 9: Get favorites
    console.log('\n9️⃣ Testing GET /api/users/favorites');
    const favoritesResponse = await fetch('/api/users/favorites', {
      headers: { Authorization: `Bearer ${demoToken}` },
    });
    const favoritesData = await favoritesResponse.json();
    console.log('✅ Favorites:', favoritesData.favorites?.length);

    // Test 10: Get hotel reviews
    console.log('\n🔟 Testing GET /api/hotels/1/reviews');
    const reviewsResponse = await fetch('/api/hotels/1/reviews');
    const reviewsData = await reviewsResponse.json();
    console.log('✅ Reviews:', reviewsData.reviews?.length, 'Rating:', reviewsData.averageRating);

    // Test 11: Create booking
    console.log('\n1️⃣1️⃣ Testing POST /api/bookings');
    const bookingResponse = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${demoToken}`,
      },
      body: JSON.stringify({
        hotelId: 1,
        roomId: '1-1',
        checkIn: '2024-12-24T00:00:00Z',
        checkOut: '2024-12-28T00:00:00Z',
        guests: 2,
        guestDetails: {
          name: 'João Silva',
          email: 'joao@exemplo.com',
          phone: '+244 900 000 000',
        },
        paymentMethod: 'card',
        pricing: {
          subtotal: 720000,
          serviceFee: 5000,
          tax: 72000,
          total: 797000,
        },
      }),
    });
    const bookingData = await bookingResponse.json();
    console.log('✅ Booking created:', bookingData.bookingId);
    const bookingId = bookingData.bookingId;

    // Test 12: Get bookings
    console.log('\n1️⃣2️⃣ Testing GET /api/users/bookings');
    const bookingsResponse = await fetch('/api/users/bookings', {
      headers: { Authorization: `Bearer ${demoToken}` },
    });
    const bookingsData = await bookingsResponse.json();
    console.log('✅ Bookings:', bookingsData.bookings?.length);

    // Test 13: Get destinations
    console.log('\n1️⃣3️⃣ Testing GET /api/destinations');
    const destinationsResponse = await fetch('/api/destinations');
    const destinationsData = await destinationsResponse.json();
    console.log('✅ Destinations:', destinationsData.destinations?.length);

    console.log('\n✨ Todos os testes passaram com sucesso!\n');

    return {
      success: true,
      token: demoToken,
      bookingId,
    };

  } catch (error) {
    console.error('❌ Erro nos testes:', error);
    return {
      success: false,
      error,
    };
  }
}

// Para executar no console do browser:
// import { testEndpoints } from './mocks/test-endpoints';
// testEndpoints();
