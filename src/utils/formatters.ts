export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPriceCompact = (amount: number): string => {
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}k Kz`;
  }
  return `${amount.toLocaleString()} Kz`;
};

export const formatReviewCount = (count: number): string => {
  if (count >= 1000) {
    return `(${(count / 1000).toFixed(1)}K)`;
  }
  return `(${count})`;
};

export const formatGuestCount = (count: number): string => {
  return `${count} ${count === 1 ? 'hóspede' : 'hóspedes'}`;
};

export const formatNightCount = (count: number): string => {
  return `${count} ${count === 1 ? 'noite' : 'noites'}`;
};
