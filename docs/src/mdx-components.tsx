import { createFileSystemGeneratorCache, createGenerator } from 'fumadocs-typescript';
import { AutoTypeTable } from 'fumadocs-typescript/ui';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { icons } from 'lucide-react';
import type { MDXComponents } from 'mdx/types';
import { CategoryOverview } from './components/category-overview';
import {
  ColorSwatch,
  ColorTokenCards,
  ColorTokenListRows,
  ColorTokenMinimalTable,
  ColorTokenTable,
} from './components/color-swatch';

const generator = createGenerator({
  cache: createFileSystemGeneratorCache('.next/fumadocs-typescript'),
});

export function getMDXComponents(components?: MDXComponents) {
    return {
      ...(icons as unknown as MDXComponents),
      ...defaultMdxComponents,
      AutoTypeTable: (props) => <AutoTypeTable {...props} generator={generator} />,
      CategoryOverview,
      ColorSwatch,
      ColorTokenTable,
      ColorTokenListRows,
      ColorTokenCards,
      ColorTokenMinimalTable,
      ...components,
    } satisfies MDXComponents;
  }