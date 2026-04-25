import { vi } from 'vitest';
import { describe, it, expect, beforeEach, beforeAll } from '@stencil/vitest';

vi.mock('./platform', () => ({ Platform: vi.fn() }));

import { MediaMatcher } from './media-matcher';
import { Platform } from './platform';

describe('MediaMatcher', () => {
  let mediaMatcher: MediaMatcher;
  let platform: Platform;

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
    vi.mocked(Platform).mockImplementation(function () {
      return platform;
    });
    platform = { FIREFOX: true } as Platform;
    mediaMatcher = new MediaMatcher();
  });

  it('correctly returns a MediaQueryList to check for matches', () => {
    expect(mediaMatcher.matchMedia('(min-width: 1px)').matches).toBeTruthy();
  });

  it('should add CSS rules for provided queries when the platform is webkit or blink', () => {
    const width = '123456px';
    platform.FIREFOX = false;
    platform.WEBKIT = true;

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
