export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  return { daysInMonth, startingDayOfWeek };
};

export const getNextMonth = (currentMonth: Date): Date => {
  return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
};

export const getPreviousMonth = (currentMonth: Date): Date => {
  return new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
};

export const isDateInRange = (
  date: Date,
  startDate: Date | null,
  endDate: Date | null
): boolean => {
  if (!startDate || !endDate) return false;
  return date > startDate && date < endDate;
};

export const isSameDate = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return date1.toDateString() === date2.toDateString();
};
