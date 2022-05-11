import { h, FunctionalComponent } from '@stencil/core';
interface CatFormFieldHintSectionProps {
  hint?: string | string[];
  slot?: HTMLElement;
}
export const CatFormFieldHintSection: FunctionalComponent<CatFormFieldHintSectionProps> = props => {
  const { hint, slot } = props;
  return (
    <div class="hint-section">
      {[
        hint ? (
          Array.isArray(hint) ? (
            hint.map(item => <p class="input-hint">{item}</p>)
          ) : (
            <p class="input-hint">{hint}</p>
          )
        ) : null,
        slot
      ]}
    </div>
  );
};
