import { ReactNode } from 'react';

interface MobileScreenProps {
  children: ReactNode;
  className?: string;
}

export default function MobileScreen({ children, className = '' }: MobileScreenProps) {
  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-white shadow-xl">
      <div className={`min-h-screen ${className}`}>
        {children}
      </div>
    </div>
  );
}
