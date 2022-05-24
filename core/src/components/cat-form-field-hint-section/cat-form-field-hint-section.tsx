import { h, FunctionalComponent } from '@stencil/core';

interface CatFormFieldHintSectionProps {
  hint?: string | string[];
  slottedHint?: HTMLElement;
}

export const CatFormFieldHintSection: FunctionalComponent<CatFormFieldHintSectionProps> = props => {
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
