import { User, Mail, Phone } from 'lucide-react';
import { Input } from '@components';

interface ProfileInfoProps {
  isEditing: boolean;
  name: string;
  email: string;
  phone: string;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
}

export function ProfileInfo({
  isEditing,
  name,
  email,
  phone,
  onNameChange,
  onEmailChange,
  onPhoneChange,
}: ProfileInfoProps) {
  return (
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
            onChange={(e) => onNameChange(e.target.value)}
            icon={<User className="w-5 h-5" />}
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            icon={<Mail className="w-5 h-5" />}
          />
          <Input
            type="tel"
            label="Phone"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
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
  );
}
