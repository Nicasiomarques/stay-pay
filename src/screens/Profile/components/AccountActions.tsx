import { Button } from '@components';

export function AccountActions() {
  return (
    <div className="space-y-3">
      <Button fullWidth variant="secondary">
        Account Settings
      </Button>
      <Button fullWidth variant="ghost" className="text-red-600 hover:bg-red-50">
        Log Out
      </Button>
    </div>
  );
}
