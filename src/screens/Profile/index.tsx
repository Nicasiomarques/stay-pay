import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen, BottomNav, HeaderWithBack } from '@components';
import { ProfileInfo, PastReservations, AccountActions } from './components';

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
        <ProfileInfo
          isEditing={isEditing}
          name={name}
          email={email}
          phone={phone}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPhoneChange={setPhone}
        />

        <PastReservations reservations={pastReservations} />

        <AccountActions />
      </div>

      <BottomNav />
    </MobileScreen>
  );
}
