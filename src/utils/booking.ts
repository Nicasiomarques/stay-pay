export const generateBookingNumber = (): string => {
  const year = new Date().getFullYear();
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `BK-${year}-${randomNumber}`;
};
