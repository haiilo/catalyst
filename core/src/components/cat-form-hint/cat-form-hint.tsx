import { h, FunctionalComponent } from '@stencil/core';

interface CatFormHintProps {
  hint?: string | string[];
  slottedHint?: HTMLElement;
}

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
