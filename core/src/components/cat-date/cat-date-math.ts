export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function addDays(date: Date, n: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
}

export function addMonth(date: Date, n: number): Date {
  const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
  const maxDays = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const newDate = new Date(date);
  newDate.setDate(1);
  newDate.setMonth(newDate.getMonth() + n);
  newDate.setDate(Math.min(day, maxDays[(month + (n % 12) + 12) % 12]));
  return newDate;
}

export function isSameYear(date1: Date | null, date2: Date | null): boolean {
  return date1?.getFullYear() === date2?.getFullYear();
}

export function isSameMonth(date1: Date | null, date2: Date | null): boolean {
  return date1?.getMonth() === date2?.getMonth() && isSameYear(date1, date2);
}

export function isSameDay(date1: Date | null, date2: Date | null): boolean {
  return date1?.getDate() === date2?.getDate() && isSameMonth(date1, date2);
}
