import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen, BottomNav, HeaderWithBack } from '@components';
import { ProfileInfo, PastReservations, AccountActions } from './components';
import { mockPastReservations } from '@data/mockBookings';

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <MobileScreen className="bg-neutral-50">
      <HeaderWithBack
        title="Perfil"
        onBack={() => navigate('/home')}
        rightActions={
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="text-[#0E64D2]"
          >
            {isEditing ? 'Guardar' : 'Editar'}
          </button>
        }
      />

      <div className="p-6 space-y-6 pb-24">
        <ProfileInfo
          isEditing={isEditing}
          name={name}
          email={email}
          phone={phone}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPhoneChange={setPhone}
        />

        <PastReservations reservations={mockPastReservations} />

        <AccountActions />
      </div>

      <BottomNav />
    </MobileScreen>
  );
}
