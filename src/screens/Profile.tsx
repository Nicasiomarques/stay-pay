import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen, Button, Input, BottomNav, HeaderWithBack, BookingCard } from '@components';
import { User, Mail, Phone } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');

  const pastReservations = [
    {
      id: 1,
      hotel: 'The Grand Plaza',
      location: 'Downtown, New York',
      dates: 'Nov 15 - Nov 18, 2024',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 2,
      hotel: 'Skyline Boutique',
      location: 'Midtown, New York',
      dates: 'Oct 5 - Oct 8, 2024',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 3,
      hotel: 'Harbor View Hotel',
      location: 'Waterfront, New York',
      dates: 'Sep 12 - Sep 15, 2024',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1716084380738-ea83a1c17716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjBuaWdodHxlbnwxfHx8fDE3NjM4NDI5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <MobileScreen className="bg-neutral-50">
      {/* Header */}
      <HeaderWithBack
        title="Profile"
        onBack={() => navigate('/home')}
        rightActions={
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="text-[#0E64D2]"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        }
      />

      <div className="p-6 space-y-6 pb-24">
        {/* Profile Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-[#0E64D2] rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            {!isEditing && (
              <>
                <h2 className="text-gray-900 mb-1">{name}</h2>
                <p className="text-gray-500">{email}</p>
              </>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <Input
                type="text"
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User className="w-5 h-5" />}
              />
              <Input
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-5 h-5" />}
              />
              <Input
                type="tel"
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={<Phone className="w-5 h-5" />}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{phone}</span>
              </div>
            </div>
          )}
        </div>

        {/* Past Reservations */}
        <div>
          <h2 className="text-gray-900 mb-4">Past Reservations</h2>
          <div className="space-y-3">
            {pastReservations.map((reservation) => (
              <BookingCard
                key={reservation.id}
                hotel={reservation.hotel}
                location={reservation.location}
                dates={reservation.dates}
                status={reservation.status}
                bookingNumber={`BK-2024-${reservation.id}`}
                image={reservation.image}
              />
            ))}
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-3">
          <Button fullWidth variant="secondary">
            Account Settings
          </Button>
          <Button fullWidth variant="ghost" className="text-red-600 hover:bg-red-50">
            Log Out
          </Button>
        </div>
      </div>

      <BottomNav />
    </MobileScreen>
  );
}