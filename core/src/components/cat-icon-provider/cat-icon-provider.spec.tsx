// import { newSpecPage } from '@stencil/core/testing';
// import { CatIconProvider } from './cat-icon-provider';
// import { CatIconRegistry } from '../cat-icon/cat-icon-registry';
//
// describe('cat-icon-provider', () => {
//   it('renders slot content', async () => {
//     const page = await newSpecPage({
//       components: [CatIconProvider],
//       html: '<cat-icon-provider><span>child</span></cat-icon-provider>'
//     });
//     expect(page.root).toBeTruthy();
//   });
//
//   describe('handleIconRequest', () => {
//     function makeEvent(name: string): { event: CustomEvent; resolved?: string } {
//       const ctx: { resolved?: string } = {};
//       const event = new CustomEvent('cat-icon-request', {
//         bubbles: true,
//         composed: true,
//         cancelable: true,
//         detail: {
//           name,
//           resolve: (svg: string) => {
//             ctx.resolved = svg;
//           }
//         }
//       });
//       return { event, ...ctx };
//     }
//
//     it('cancels the event and resolves from the scoped registry when the icon exists', async () => {
//       const registry = CatIconRegistry.createInstance();
//       registry.addIcons({ home: '<svg id="mfe"/>' });
//
//       const page = await newSpecPage({
//         components: [CatIconProvider],
//         html: '<cat-icon-provider></cat-icon-provider>'
//       });
//       const instance = page.rootInstance as CatIconProvider;
//       (instance as any).registry = registry;
//
//       const ctx: { resolved?: string } = {};
//       const event = new CustomEvent('cat-icon-request', {
//         bubbles: true,
//         cancelable: true,
//         detail: { name: 'home', resolve: (svg: string) => { ctx.resolved = svg; } }
//       });
//
//       instance.handleIconRequest(event as CustomEvent);
//
//       expect(event.defaultPrevented).toBe(true);
//       expect(ctx.resolved).toBe('<svg id="mfe"/>');
//     });
//
//     it('falls back to global registry when scoped registry does not have the icon', async () => {
//       const { catIconRegistry } = await import('../cat-icon/cat-icon-registry');
//       catIconRegistry.addIcons({ 'global-only': '<svg id="global"/>' });
//
//       const scopedRegistry = CatIconRegistry.createInstance();
//       const page = await newSpecPage({
//         components: [CatIconProvider],
//         html: '<cat-icon-provider></cat-icon-provider>'
//       });
//       const instance = page.rootInstance as CatIconProvider;
//       (instance as any).registry = scopedRegistry;
//
//       const ctx: { resolved?: string } = {};
//       const event = new CustomEvent('cat-icon-request', {
//         bubbles: true,
//         cancelable: true,
//         detail: { name: 'global-only', resolve: (svg: string) => { ctx.resolved = svg; } }
//       });
//
//       instance.handleIconRequest(event as CustomEvent);
//
//       expect(event.defaultPrevented).toBe(true);
//       expect(ctx.resolved).toBe('<svg id="global"/>');
//
//       catIconRegistry.removeIcons(['global-only']);
//     });
//
//     it('cancels the event even when the icon is not found in any registry', async () => {
//       const page = await newSpecPage({
//         components: [CatIconProvider],
//         html: '<cat-icon-provider></cat-icon-provider>'
//       });
//       const instance = page.rootInstance as CatIconProvider;
//
//       const ctx: { resolved?: string } = {};
//       const event = new CustomEvent('cat-icon-request', {
//         bubbles: true,
//         cancelable: true,
//         detail: { name: 'does-not-exist', resolve: (svg: string) => { ctx.resolved = svg; } }
//       });
//
//       instance.handleIconRequest(event as CustomEvent);
//
//       expect(event.defaultPrevented).toBe(true);
//       expect(ctx.resolved).toBeUndefined();
//     });
//
//     it('dispatches cat-icon-request as a bubbling, cancelable event', async () => {
//       // Verifies the event contract that cat-icon consumers depend on
//       const event = new CustomEvent('cat-icon-request', {
//         bubbles: true,
//         composed: true,
//         cancelable: true,
//         detail: { name: 'home', resolve: jest.fn() }
//       });
//       expect(event.bubbles).toBe(true);
//       expect(event.cancelable).toBe(true);
//     });
//   });
// });
