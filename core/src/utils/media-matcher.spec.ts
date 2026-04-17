import { vi } from 'vitest';
import { describe, it, expect, beforeEach, beforeAll } from '@stencil/vitest';

vi.mock('./platform', () => {
  const Platform = vi.fn().mockImplementation(function (this: Record<string, unknown>) {
    return this;
  });
  return { Platform };
});

import { MediaMatcher } from './media-matcher';
import { Platform } from './platform';

describe('MediaMatcher', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: true,
        media: query
      }))
    });
  });

  beforeEach(() => {
    vi.mocked(Platform).mockImplementation(function (this: Record<string, unknown>) {
      return this;
    } as unknown as new () => Platform);
  });

  it('correctly returns a MediaQueryList to check for matches', () => {
    vi.mocked(Platform).mockImplementation(function (this: Record<string, unknown>) {
      Object.assign(this, { FIREFOX: true });
      return this;
    } as unknown as new () => Platform);

    const mediaMatcher = new MediaMatcher();
    expect(mediaMatcher.matchMedia('(min-width: 1px)').matches).toBeTruthy();
  });

  it('should add CSS rules for provided queries when the platform is webkit or blink', () => {
    const width = '123456px';

    vi.mocked(Platform).mockImplementation(function (this: Record<string, unknown>) {
      Object.assign(this, { FIREFOX: false, WEBKIT: true });
      return this;
    } as unknown as new () => Platform);

    const mediaMatcher = new MediaMatcher();

    expect(getStyleTagByString(width)).toBeFalsy();
    mediaMatcher.matchMedia(`(width: ${width})`);
    expect(getStyleTagByString(width)).toBeTruthy();

    function getStyleTagByString(str: string): HTMLStyleElement | undefined {
      return Array.from(document.head.querySelectorAll('style')).find(tag => {
        const rules = tag.sheet ? Array.from((tag.sheet as CSSStyleSheet).cssRules) : [];
        return !!rules.find(rule => rule.cssText.includes(str));
      });
    }
  });
});
