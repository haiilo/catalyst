import { h, FunctionalComponent } from '@stencil/core';

/**
 * Properties of CatFormHint.
 *
 * @property hint - Optional hint text(s) of the form field.
 * @property slottedHint - Optional hint element of the form field.
 */
interface CatFormHintProps {
  hint?: string | string[];
  slottedHint?: HTMLSlotElement;
}

/**
 * CatFormHint is a functional component that represents the hint area of form elements.
 *
 * @param props - {@link CatFormHintProps}
 * @return a JSX.Element
 */
export const CatFormHint: FunctionalComponent<CatFormHintProps> = props => {
  const { hint, slottedHint } = props;
  return (
    <div class="hint-section">
      {[
        hint &&
          (Array.isArray(hint) ? hint.map(item => <p class="input-hint">{item}</p>) : <p class="input-hint">{hint}</p>),
        slottedHint
      ]}
    </div>
  );
};
