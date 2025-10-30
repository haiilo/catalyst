import { setCustomElementsManifest } from '@storybook/web-components';
import { setStorybookHelpersConfig } from '@wc-toolkit/storybook-helpers';
import { defineCustomElements } from '../loader/index.js';
import stencilManifest from '../dist/custom-elements.json';

defineCustomElements();

// Import global styles
import '../dist/catalyst/catalyst.css';

// Transform Stencil's custom format to standard Custom Elements Manifest format
const customElementsManifest = {
  schemaVersion: '1.0.0',
  readme: '',
  modules: stencilManifest.components?.map((component: any) => ({
    kind: 'javascript-module',
    path: component.filePath,
    declarations: [
      {
        kind: 'class',
        description: component.docs || '',
        name: component.tag,
        tagName: component.tag,
        customElement: true,
        members: component.props?.map((prop: any) => ({
          kind: 'field',
          name: prop.name,
          type: { text: prop.type },
          default: prop.default,
          description: prop.docs || '',
          attribute: prop.attr,
          reflects: prop.reflectToAttr,
        })) || [],
        attributes: component.props?.map((prop: any) => ({
          name: prop.attr || prop.name,
          type: { text: prop.type },
          default: prop.default,
          description: prop.docs || '',
          fieldName: prop.name,
        })) || [],
        events: component.events?.map((event: any) => ({
          name: event.event,
          type: { text: event.detail || 'CustomEvent' },
          description: event.docs || '',
        })) || [],
        slots: component.slots?.map((slot: any) => ({
          name: slot.name || '',
          description: slot.docs || '',
        })) || [],
        cssProperties: component.styles?.map((style: any) => ({
          name: style.name,
          description: style.docs || '',
        })) || [],
      },
    ],
    exports: [
      {
        kind: 'custom-element-definition',
        name: component.tag,
        declaration: {
          name: component.tag,
        },
      },
    ],
  })) || [],
};

setCustomElementsManifest(customElementsManifest);

setStorybookHelpersConfig({
  /** hides the `arg ref` label on each control */
  hideArgRef: false,
  /** sets the custom type reference in the Custom Elements Manifest */
  typeRef: 'text',
  /** Adds a <script> tag where a `component` variable will reference the story's component */
  setComponentVariable: false,
  /** renders default values for attributes and CSS properties */
  renderDefaultValues: false,
});

const preview = {
  parameters: {
    actions: { argTypesRegex: '^cat[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
