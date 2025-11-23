import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, Calendar, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Search, label: 'Pesquisar' },
    { path: '/favorites', icon: Heart, label: 'Favoritos' },
    { path: '/bookings', icon: Calendar, label: 'Reservas' },
    { path: '/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-around items-center max-w-md mx-auto z-50"
      aria-label="Main navigation"
      role="navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            type="button"
            aria-label={`Navigate to ${item.label}`}
            aria-current={isActive ? 'page' : undefined}
            className="flex flex-col items-center gap-1 py-2 transition-colors"
          >
            <Icon
              className={`w-6 h-6 ${isActive ? 'text-[#0E64D2]' : 'text-gray-400'}`}
              aria-hidden="true"
            />
            <span className={`text-xs ${isActive ? 'text-[#0E64D2]' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
