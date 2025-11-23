import { Download, Share2 } from 'lucide-react';
import { Button } from '@components';

interface ActionButtonsProps {
  onBackToHome: () => void;
}

export function ActionButtons({ onBackToHome }: ActionButtonsProps) {
  return (
    <>
      <div className="space-y-3 w-full max-w-sm mb-6">
        <Button fullWidth variant="secondary">
          <Download className="w-5 h-5 mr-2 inline-block" />
          Download Voucher
        </Button>
        <Button fullWidth variant="secondary">
          <Share2 className="w-5 h-5 mr-2 inline-block" />
          Share Booking
        </Button>
      </div>

      <Button fullWidth className="max-w-sm" onClick={onBackToHome}>
        Back to Home
      </Button>
    </>
  );
}
