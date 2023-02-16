import { h, FunctionalComponent } from '@stencil/core';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorMap = { [key: string]: any };

/**
 * Properties of CatFormHint.
 *
 * @property hint - Optional hint text(s) of the form field.
 * @property slottedHint - Optional hint element of the form field.
 */
interface CatFormHintProps {
  id: string;
  hint?: string | string[];
  slottedHint?: HTMLSlotElement;
  class?: string;
  errorMap?: ErrorMap;
}

/**
 * CatFormHint is a functional component that represents the hint area of form elements.
 *
 * @param props - {@link CatFormHintProps}
 * @return a JSX.Element
 */
export const CatFormHint: FunctionalComponent<CatFormHintProps> = props => {
  const { id, hint, slottedHint, errorMap } = props;
  const errors = Object.entries(errorMap || {});
  return (
    <div id={id + '-hint'} class="hint-section">
      {errors.length
        ? errors.map(([key, params]) => (
            <p class={(props.class ?? '') + ' input-hint cat-text-danger'}>{i18n.t(`error.${key}`, params)}</p>
          ))
        : [
            hint &&
              (Array.isArray(hint) ? (
                hint.map(item => <p class={(props.class ?? '') + ' input-hint'}>{item}</p>)
              ) : (
                <p class={(props.class ?? '') + ' input-hint'}>{hint}</p>
              )),
            slottedHint
          ]}
    </div>
  );
};
