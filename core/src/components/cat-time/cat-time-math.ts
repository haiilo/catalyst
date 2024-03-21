export function clampTime(min: string | null, date: Date, max: string | null): Date {
  const [, hhMin, mmMin] = min?.match(/(\d{2}):(\d{2})/)?.map(Number) ?? [];
  const [, hhMax, mmMax] = max?.match(/(\d{2}):(\d{2})/)?.map(Number) ?? [];
  let minTime = -Infinity;
  let maxTime = Infinity;
  if (hhMin !== undefined && mmMin !== undefined) {
    minTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hhMin, mmMin).getTime();
  }
  if (hhMax !== undefined && mmMax !== undefined) {
    maxTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hhMax, mmMax).getTime();
  }
  return new Date(Math.min(Math.max(date.getTime(), minTime), maxTime));
}

export function isBefore(date: Date, time: string | null): boolean {
  const [, hh, mm] = time?.match(/(\d{2}):(\d{2})/)?.map(Number) ?? [];
  if (hh === undefined || mm === undefined) {
    return false;
  }
  return date.getHours() < hh || (date.getHours() === hh && date.getMinutes() < mm);
}

export function isAfter(date: Date, time: string | null): boolean {
  const [, hh, mm] = time?.match(/(\d{2}):(\d{2})/)?.map(Number) ?? [];
  if (hh === undefined || mm === undefined) {
    return false;
  }
  return date.getHours() > hh || (date.getHours() === hh && date.getMinutes() > mm);
}
