export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatGuestCount = (count: number): string => {
  return `${count} ${count === 1 ? 'hóspede' : 'hóspedes'}`;
};

export const formatNightCount = (count: number): string => {
  return `${count} ${count === 1 ? 'noite' : 'noites'}`;
};
