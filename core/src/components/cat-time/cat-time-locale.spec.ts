import { getHour12 } from './cat-time-locale';

fdescribe('cat-time locale', () => {
  it('returns 12 hours as true for en language', async () => {
    expect(getHour12('en')).toBe(true);
  });

  it('returns 12 hours as true for greek language', async () => {
    expect(getHour12('el')).toBe(true);
  });

  it('returns 12 hours as true for de language', async () => {
    expect(getHour12('de')).toBe(false);
  });
});
