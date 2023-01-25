import { h } from '@stencil/core';
import { CatFormHint } from './cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorMap = { [key: string]: any };

export function buildHintSection(
  hostElement: HTMLElement,
  id: string,
  hint: string | string[] | undefined,
  errorMap: ErrorMap | undefined
) {
  const errors = Object.entries(errorMap || {});
  if (errors.length) {
    return (
      <div id={id + '-hint'}>
        {errors.map(([key, params]) => (
          <CatFormHint hint={i18n.t(`error.${key}`, params)} class="cat-text-danger" />
        ))}
      </div>
    );
  }

  const hasSlottedHint = !!hostElement.querySelector('[slot="hint"]');
  return (
    (hint || hasSlottedHint) && (
      <div id={id + '-hint'}>
        <CatFormHint hint={hint} slottedHint={hasSlottedHint && <slot name="hint"></slot>} />
      </div>
    )
  );
}
