export const formatGuestCount = (count: number): string => {
  return `${count} ${count === 1 ? 'guest' : 'guests'}`;
};

export const formatNightCount = (count: number): string => {
  return `${count} ${count === 1 ? 'night' : 'nights'}`;
};
