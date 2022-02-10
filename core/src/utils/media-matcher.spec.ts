import { MediaMatcher } from './media-matcher';

describe.only('MediaMatcher', () => {
  let mediaMatcher: MediaMatcher;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: true,
        media: query
      }))
    });
  });

  beforeEach(() => {
    mediaMatcher = new MediaMatcher();
  });

  it('correctly returns a MediaQueryList to check for matches', () => {
    // (Platform as any).mockImplementation(() => {
    //   return {EDGE: true};
    // });

    jest.mock('./platform', () => {
      return jest.fn().mockImplementation(() => {
        return { Platform: () => ({EDGE: true})}


        ;
      });
    });

    // expect(t).toHaveBeenCalled();
    expect(mediaMatcher.matchMedia('(min-width: 1px)').matches).toBeTruthy();
    // expect(mediaMatcher.matchMedia('(max-width: 1px)').matches).toBeFalsy();
  });

  // it('should add CSS rules for provided queries when the platform is webkit or blink', () => {
  //   const width = '123456px';

  //   expect(getStyleTagByString(width)).toBeFalsy();
  //   mediaMatcher.matchMedia(`(width: ${width})`);

  //   // if (platform.WEBKIT || platform.BLINK) {
  //   //   expect(getStyleTagByString(width)).toBeTruthy();
  //   // } else {
  //   //   expect(getStyleTagByString(width)).toBeFalsy();
  //   // }

  //   function getStyleTagByString(str: string): HTMLStyleElement | undefined {
  //     return Array.from(document.head.querySelectorAll('style')).find(tag => {
  //       const rules = tag.sheet ? Array.from((tag.sheet as CSSStyleSheet).cssRules) : [];
  //       return !!rules.find(rule => rule.cssText.includes(str));
  //     });
  //   }
  // });
});
