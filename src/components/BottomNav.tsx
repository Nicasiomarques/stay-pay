import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { springs } from '@/config/animations';

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
          <motion.button
            key={item.path}
            onClick={() => navigate(item.path)}
            type="button"
            aria-label={`Navigate to ${item.label}`}
            aria-current={isActive ? 'page' : undefined}
            className="flex flex-col items-center gap-1 py-2 relative"
            whileTap={{ scale: 0.9 }}
            transition={springs.smooth}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#0E64D2]/10 rounded-xl"
                transition={springs.smooth}
              />
            )}
            <motion.div
              className="relative z-10"
              animate={isActive ? { y: [-2, 0], scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Icon
                className={`w-6 h-6 ${isActive ? 'text-[#0E64D2]' : 'text-gray-400'}`}
                aria-hidden="true"
              />
            </motion.div>
            <motion.span
              className={`text-xs relative z-10 ${isActive ? 'text-[#0E64D2]' : 'text-gray-400'}`}
              animate={{ color: isActive ? '#0E64D2' : '#9CA3AF' }}
              transition={springs.smooth}
            >
              {item.label}
            </motion.span>
          </motion.button>
        );
      })}
    </nav>
  );
}
