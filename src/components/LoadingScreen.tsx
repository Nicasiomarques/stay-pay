import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-[#0E64D2] animate-spin" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
