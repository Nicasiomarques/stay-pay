import { Hotel } from 'lucide-react';

export function WelcomeHeader() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-8 flex items-center justify-center w-20 h-20 bg-[#0E64D2] rounded-3xl shadow-lg">
        <Hotel className="w-10 h-10 text-white" />
      </div>

      <h1 className="text-gray-900 mb-3">Bem-vindo ao StayGo</h1>
      <p className="text-gray-500 mb-12">
        Reserve a sua estadia perfeita em segundos
      </p>
    </div>
  );
}
