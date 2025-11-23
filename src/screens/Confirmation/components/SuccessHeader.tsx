import { CheckCircle } from 'lucide-react';

export function SuccessHeader() {
  return (
    <div className="flex flex-col items-center text-center mb-6">
      <div className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>

      <h1 className="text-gray-900 mb-2">Reserva Confirmada!</h1>
      <p className="text-gray-500">
        A sua reserva foi confirmada com sucesso
      </p>
    </div>
  );
}
