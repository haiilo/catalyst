const _breakpoints = ['xs', 's', 'm', 'l', 'xl'] as const;

export type Breakpoint = typeof _breakpoints[number];

export const Breakpoints: { [breakpoint in Breakpoint]: string } = {
  xs: '(max-width: 539.98px)',
  s: '(max-width: 767.98px)',
  m: '(max-width: 991.98px)',
  l: '(max-width: 1199.98px)',
  xl: '(max-width: 1399.98px)'
};

export function isBreakpoint(value: unknown): value is Breakpoint {
  return typeof value === 'string' && _breakpoints.includes(value as Breakpoint);
}
