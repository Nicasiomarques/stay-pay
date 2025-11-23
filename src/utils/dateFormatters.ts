export const formatShortDate = (date: Date | null): string => {
  if (!date) return 'Select date';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatFullDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDateRange = (checkIn: Date | null, checkOut: Date | null): string => {
  if (!checkIn || !checkOut) return 'Select dates';
  return `${formatShortDate(checkIn)} - ${formatShortDate(checkOut)}`;
};
