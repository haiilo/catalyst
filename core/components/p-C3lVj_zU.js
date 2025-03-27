import { h } from './p-DJz_AlH8.js';
import { c as catI18nRegistry } from './p-DYxciDq0.js';

/**
 * CatFormHint is a functional component that represents the hint area of form elements.
 *
 * @param props - {@link CatFormHintProps}
 * @return a JSX.Element
 */
const CatFormHint = props => {
    const { id, hint, slottedHint, errorMap } = props;
    const errors = Object.entries(errorMap || {});
    return (h("div", { "aria-live": "polite", id: id + '-hint', class: "hint-section" }, errors.length
        ? errors.map(([key, params]) => (h("p", { class: (props.class ?? '') + ' input-hint cat-text-danger' }, catI18nRegistry.t(`error.${key}`, params))))
        : [
            hint &&
                (Array.isArray(hint) ? (hint.map(item => h("p", { class: (props.class ?? '') + ' input-hint' }, item))) : (h("p", { class: (props.class ?? '') + ' input-hint' }, hint))),
            slottedHint
        ]));
};

export { CatFormHint as C };
//# sourceMappingURL=p-C3lVj_zU.js.map

//# sourceMappingURL=p-C3lVj_zU.js.map