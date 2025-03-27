import { p as proxyCustomElement, H, d as createEvent, h, c as Host } from './p-DJz_AlH8.js';
import { a as autoUpdate, c as computePosition, o as offset, f as flip } from './p-OtWHn5vK.js';
import { g as getDefaultExportFromCjs } from './p-CFH-AGT6.js';
import { c as cjsExports } from './p-BynEaqQM.js';
import { c as coerceBoolean, a as coerceNumber } from './p-DU2Y5oRj.js';
import { C as CatFormHint } from './p-C3lVj_zU.js';
import { c as catI18nRegistry } from './p-DYxciDq0.js';
import { d as defineCustomElement$7 } from './p-Ceq_H4Q6.js';
import { d as defineCustomElement$6 } from './p-BAS0o037.js';
import { d as defineCustomElement$5 } from './p-XwuHLLB9.js';
import { d as defineCustomElement$4 } from './p-tMJhdM6b.js';
import { d as defineCustomElement$3 } from './p-C-DR0IvP.js';
import { d as defineCustomElement$2 } from './p-DItsaqDw.js';
import { d as defineCustomElement$1 } from './p-BWMxUNx3.js';

var autosizeInput$1;
var hasRequiredAutosizeInput;

function requireAutosizeInput () {
	if (hasRequiredAutosizeInput) return autosizeInput$1;
	hasRequiredAutosizeInput = 1;
	var GHOST_ELEMENT_ID = '__autosizeInputGhost';

	var characterEntities = {
	  ' ': 'nbsp',
	  '<': 'lt',
	  '>': 'gt'
	};
	function mapSpecialCharacterToCharacterEntity (specialCharacter) {
	  return '&' + characterEntities[specialCharacter] + ';'
	}
	function escapeSpecialCharacters (string) {
	  return string.replace(/\s|<|>/g, mapSpecialCharacterToCharacterEntity)
	}

	// Create `ghostElement`, with inline styles to hide it and ensure that the text is all
	// on a single line.
	function createGhostElement () {
	  var ghostElement = document.createElement('div');
	  ghostElement.id = GHOST_ELEMENT_ID;
	  ghostElement.style.cssText =
	    'display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;';
	  document.body.appendChild(ghostElement);
	  return ghostElement
	}

	autosizeInput$1 = function (element, options) {
	  var elementStyle = window.getComputedStyle(element);
	  // prettier-ignore
	  var elementCssText = 'box-sizing:' + elementStyle.boxSizing +
	                      ';border-left:' + elementStyle.borderLeftWidth + ' solid red' +
	                      ';border-right:' + elementStyle.borderRightWidth + ' solid red' +
	                      ';font-family:' + elementStyle.fontFamily +
	                      ';font-feature-settings:' + elementStyle.fontFeatureSettings +
	                      ';font-kerning:' + elementStyle.fontKerning +
	                      ';font-size:' + elementStyle.fontSize +
	                      ';font-stretch:' + elementStyle.fontStretch +
	                      ';font-style:' + elementStyle.fontStyle +
	                      ';font-variant:' + elementStyle.fontVariant +
	                      ';font-variant-caps:' + elementStyle.fontVariantCaps +
	                      ';font-variant-ligatures:' + elementStyle.fontVariantLigatures +
	                      ';font-variant-numeric:' + elementStyle.fontVariantNumeric +
	                      ';font-weight:' + elementStyle.fontWeight +
	                      ';letter-spacing:' + elementStyle.letterSpacing +
	                      ';margin-left:' + elementStyle.marginLeft +
	                      ';margin-right:' + elementStyle.marginRight +
	                      ';padding-left:' + elementStyle.paddingLeft +
	                      ';padding-right:' + elementStyle.paddingRight +
	                      ';text-indent:' + elementStyle.textIndent +
	                      ';text-transform:' + elementStyle.textTransform;

	  // Assigns an appropriate width to the given `element` based on its contents.
	  function setWidth () {
	    var string = element.value || element.getAttribute('placeholder') || '';
	    // Check if the `ghostElement` exists. If no, create it.
	    var ghostElement =
	      document.getElementById(GHOST_ELEMENT_ID) || createGhostElement();
	    // Copy all width-affecting styles to the `ghostElement`.
	    ghostElement.style.cssText += elementCssText;
	    ghostElement.innerHTML = escapeSpecialCharacters(string);
	    // Copy the width of `ghostElement` to `element`.
	    var width = window.getComputedStyle(ghostElement).width;
	    element.style.width = width;
	    return width
	  }

	  element.addEventListener('input', setWidth);

	  var width = setWidth();

	  // Set `min-width` only if `options.minWidth` was set, and only if the initial
	  // width is non-zero.
	  if (options && options.minWidth && width !== '0px') {
	    element.style.minWidth = width;
	  }

	  // Return a function for unbinding the event listener and removing the `ghostElement`.
	  return function () {
	    element.removeEventListener('input', setWidth);
	    var ghostElement = document.getElementById(GHOST_ELEMENT_ID);
	    if (ghostElement) {
	      ghostElement.parentNode.removeChild(ghostElement);
	    }
	  }
	};
	return autosizeInput$1;
}

var autosizeInputExports = requireAutosizeInput();
var autosizeInput = /*@__PURE__*/getDefaultExportFromCjs(autosizeInputExports);

const catSelectCss = ".hint-wrapper{flex:0 1 auto;display:flex;gap:0.5rem}.hint-section{flex:1 1 auto;display:flex;flex-direction:column;gap:0.25rem;color:rgb(var(--cat-font-color-muted, 81, 92, 108));font-size:0.875rem;line-height:1.125rem}.hint-section .input-hint,.hint-section ::slotted([slot=hint]){margin:0 !important}.cat-bg-primary{background-color:rgb(var(--cat-primary-bg, 0, 129, 148)) !important;color:rgb(var(--cat-primary-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-primary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-primary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-primary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-primary-hover{transition:background-color 125ms, color 125ms}.cat-bg-primary-hover:hover{background-color:rgb(var(--cat-primary-bg-hover, 1, 115, 132)) !important;color:rgb(var(--cat-primary-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-primary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-primary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-primary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-primary,.cat-link-primary{color:rgb(var(--cat-primary-text, 0, 129, 148)) !important}button.cat-text-primary,button.cat-link-primary{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-primary:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-primary:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-primary,.cat-text-primary-hover{transition:color 125ms}.cat-link-primary:hover,.cat-text-primary-hover:hover{color:rgb(var(--cat-primary-text-hover, 1, 115, 132)) !important}.cat-link-primary:active,.cat-text-primary-hover:active{color:rgb(var(--cat-primary-text-active, 2, 99, 113)) !important}.cat-bg-primaryInverted{background-color:#93b4f2 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-bg-primaryInverted-hover{transition:background-color 125ms, color 125ms}.cat-bg-primaryInverted-hover:hover{background-color:#93b4f2 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-text-primaryInverted,.cat-link-primaryInverted{color:#93b4f2 !important}button.cat-text-primaryInverted,button.cat-link-primaryInverted{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-primaryInverted:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-primaryInverted:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-primaryInverted,.cat-text-primaryInverted-hover{transition:color 125ms}.cat-link-primaryInverted:hover,.cat-text-primaryInverted-hover:hover{color:#93b4f2 !important}.cat-link-primaryInverted:active,.cat-text-primaryInverted-hover:active{color:#93b4f2 !important}.cat-bg-secondary{background-color:rgb(var(--cat-secondary-bg, 105, 118, 135)) !important;color:rgb(var(--cat-secondary-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-secondary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-secondary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-secondary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-secondary-hover{transition:background-color 125ms, color 125ms}.cat-bg-secondary-hover:hover{background-color:rgb(var(--cat-secondary-bg-hover, 105, 118, 135)) !important;color:rgb(var(--cat-secondary-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-secondary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-secondary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-secondary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-secondary,.cat-link-secondary{color:rgb(var(--cat-secondary-text, 0, 0, 0)) !important}button.cat-text-secondary,button.cat-link-secondary{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-secondary:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-secondary:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-secondary,.cat-text-secondary-hover{transition:color 125ms}.cat-link-secondary:hover,.cat-text-secondary-hover:hover{color:rgb(var(--cat-secondary-text-hover, 0, 0, 0)) !important}.cat-link-secondary:active,.cat-text-secondary-hover:active{color:rgb(var(--cat-secondary-text-active, 0, 0, 0)) !important}.cat-bg-secondaryInverted{background-color:#697687 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-bg-secondaryInverted-hover{transition:background-color 125ms, color 125ms}.cat-bg-secondaryInverted-hover:hover{background-color:#697687 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-text-secondaryInverted,.cat-link-secondaryInverted{color:white !important}button.cat-text-secondaryInverted,button.cat-link-secondaryInverted{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-secondaryInverted:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-secondaryInverted:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-secondaryInverted,.cat-text-secondaryInverted-hover{transition:color 125ms}.cat-link-secondaryInverted:hover,.cat-text-secondaryInverted-hover:hover{color:white !important}.cat-link-secondaryInverted:active,.cat-text-secondaryInverted-hover:active{color:white !important}.cat-bg-info{background-color:rgb(var(--cat-info-bg, 0, 115, 230)) !important;color:rgb(var(--cat-info-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-info-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-info-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-info-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-info-hover{transition:background-color 125ms, color 125ms}.cat-bg-info-hover:hover{background-color:rgb(var(--cat-info-bg-hover, 0, 107, 227)) !important;color:rgb(var(--cat-info-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-info-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-info-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-info-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-info,.cat-link-info{color:rgb(var(--cat-info-text, 0, 115, 230)) !important}button.cat-text-info,button.cat-link-info{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-info:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-info:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-info,.cat-text-info-hover{transition:color 125ms}.cat-link-info:hover,.cat-text-info-hover:hover{color:rgb(var(--cat-info-text-hover, 0, 107, 227)) !important}.cat-link-info:active,.cat-text-info-hover:active{color:rgb(var(--cat-info-text-active, 0, 96, 223)) !important}.cat-bg-success{background-color:rgb(var(--cat-success-bg, 0, 132, 88)) !important;color:rgb(var(--cat-success-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-success-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-success-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-success-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-success-hover{transition:background-color 125ms, color 125ms}.cat-bg-success-hover:hover{background-color:rgb(var(--cat-success-bg-hover, 0, 117, 78)) !important;color:rgb(var(--cat-success-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-success-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-success-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-success-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-success,.cat-link-success{color:rgb(var(--cat-success-text, 0, 132, 88)) !important}button.cat-text-success,button.cat-link-success{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-success:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-success:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-success,.cat-text-success-hover{transition:color 125ms}.cat-link-success:hover,.cat-text-success-hover:hover{color:rgb(var(--cat-success-text-hover, 0, 117, 78)) !important}.cat-link-success:active,.cat-text-success-hover:active{color:rgb(var(--cat-success-text-active, 0, 105, 70)) !important}.cat-bg-warning{background-color:rgb(var(--cat-warning-bg, 255, 206, 128)) !important;color:rgb(var(--cat-warning-fill, 0, 0, 0)) !important;--cat-primary-text:var(--cat-warning-fill, 0, 0, 0);--cat-primary-text-hover:var(--cat-warning-fill-hover, 0, 0, 0);--cat-primary-text-active:var(--cat-warning-fill-active, 0, 0, 0);--cat-link-decoration:underline}.cat-bg-warning-hover{transition:background-color 125ms, color 125ms}.cat-bg-warning-hover:hover{background-color:rgb(var(--cat-warning-bg-hover, 255, 214, 148)) !important;color:rgb(var(--cat-warning-fill-hover, 0, 0, 0)) !important;--cat-primary-text:var(--cat-warning-fill, 0, 0, 0);--cat-primary-text-hover:var(--cat-warning-fill-hover, 0, 0, 0);--cat-primary-text-active:var(--cat-warning-fill-active, 0, 0, 0);--cat-link-decoration:underline}.cat-text-warning,.cat-link-warning{color:rgb(var(--cat-warning-text, 159, 97, 0)) !important}button.cat-text-warning,button.cat-link-warning{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-warning:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-warning:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-warning,.cat-text-warning-hover{transition:color 125ms}.cat-link-warning:hover,.cat-text-warning-hover:hover{color:rgb(var(--cat-warning-text-hover, 159, 97, 0)) !important}.cat-link-warning:active,.cat-text-warning-hover:active{color:rgb(var(--cat-warning-text-active, 159, 97, 0)) !important}.cat-bg-danger{background-color:rgb(var(--cat-danger-bg, 217, 52, 13)) !important;color:rgb(var(--cat-danger-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-danger-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-danger-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-danger-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-danger-hover{transition:background-color 125ms, color 125ms}.cat-bg-danger-hover:hover{background-color:rgb(var(--cat-danger-bg-hover, 194, 46, 11)) !important;color:rgb(var(--cat-danger-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-danger-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-danger-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-danger-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-danger,.cat-link-danger{color:rgb(var(--cat-danger-text, 217, 52, 13)) !important}button.cat-text-danger,button.cat-link-danger{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-danger:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-danger:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-danger,.cat-text-danger-hover{transition:color 125ms}.cat-link-danger:hover,.cat-text-danger-hover:hover{color:rgb(var(--cat-danger-text-hover, 194, 46, 11)) !important}.cat-link-danger:active,.cat-text-danger-hover:active{color:rgb(var(--cat-danger-text-active, 174, 42, 10)) !important}.cat-active{color:rgb(var(--cat-primary-text, 0, 129, 148)) !important}.cat-text-active{color:rgb(var(--cat-primary-text, 0, 129, 148)) !important}.cat-muted{color:rgb(var(--cat-font-color-muted, 81, 92, 108)) !important}.cat-text-muted{color:rgb(var(--cat-font-color-muted, 81, 92, 108)) !important}.cat-bg-muted{background-color:#f2f4f7 !important}.cat-text-reset{color:inherit !important}.cat-link-reset{color:inherit !important;text-decoration:inherit !important}.label{overflow:hidden;word-wrap:break-word;word-break:break-word}.input-field:not(.input-horizontal) .label-container.hidden,.textarea-field:not(.textarea-horizontal) .label-container.hidden,.select-field:not(.select-horizontal) .label-container.hidden{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.label-container{flex-basis:var(--label-size, 33.33%)}.label-wrapper{display:flex;gap:0.25rem}.label-metadata{display:flex;flex-shrink:0;flex-grow:1;justify-content:space-between;gap:0.25rem;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.label-optional,.label-character-count{display:inline-flex;align-items:center;max-height:1.25rem;font-size:0.75rem;line-height:1rem}.label-character-count{margin-left:auto}.input-horizontal .label-container.hidden label,.textarea-horizontal .label-container.hidden label,.select-horizontal .label-container.hidden label{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.input-horizontal .label-wrapper,.textarea-horizontal .label-wrapper,.select-horizontal .label-wrapper{flex-direction:column}.input-horizontal label,.textarea-horizontal label,.select-horizontal label{min-height:2.5rem;display:inline-flex;align-items:center}.input-horizontal .label-metadata,.textarea-horizontal .label-metadata,.select-horizontal .label-metadata{justify-content:flex-start}.input-horizontal .label-metadata .label-character-count,.textarea-horizontal .label-metadata .label-character-count,.select-horizontal .label-metadata .label-character-count{margin-left:0}:host{display:flex;flex-direction:column;gap:0.5rem;line-height:1.25rem;position:relative}:host([hidden]){display:none}label{align-self:flex-start}label.hidden{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.select-field,.select-container{display:flex;flex-direction:column;gap:0.5rem;flex:1 1 auto}.select-field.select-horizontal{flex-direction:row;gap:1rem}.select-wrapper{display:flex;align-items:flex-start;background:white;border-radius:var(--cat-border-radius-m, 0.25rem);box-shadow:inset 0 0 0 1px rgb(var(--border-color));transition:box-shadow 125ms linear;padding:0.25rem;--border-color:var(--cat-border-color-dark, 215, 219, 224);}.select-wrapper:not(.select-disabled):hover{box-shadow:inset 0 0 0 1px rgb(var(--border-color)), 0 0 0 1px rgb(var(--border-color))}.select-wrapper:focus-within{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:-1px}.select-wrapper.select-invalid{--border-color:var(--cat-danger-bg, 217, 52, 13), 0.2}.select-wrapper:has(input:-webkit-autofill),.select-wrapper:has(input:-webkit-autofill):hover,.select-wrapper:has(input:-webkit-autofill):focus{background-color:#e8f0fe}:host(.cat-error) .select-wrapper{box-shadow:0 0 0 1px rgb(var(--cat-danger-bg, 217, 52, 13))}:host(.cat-error) .select-wrapper:not(.input-disabled):hover{box-shadow:0 0 0 2px rgb(var(--cat-danger-bg, 217, 52, 13))}.select-disabled{background:#f2f4f7;cursor:not-allowed;color:rgb(var(--cat-font-color-muted, 81, 92, 108));pointer-events:none}.select-wrapper-inner{display:flex;flex:1 1 auto;align-items:center;gap:0.25rem;min-width:0}.select-wrapper-inner>cat-avatar{display:inline-block;padding-left:0.5rem}.select-wrapper-inner>cat-avatar+.select-input{padding-left:0.25rem}.select-wrapper-inner cat-avatar{--cat-avatar-size:1.25rem;--cat-avatar-font-size:0.5rem}.select-multiple .select-wrapper-inner{flex-wrap:wrap}.select-input{font:inherit;background:none;border:none;outline:none;padding:0.375rem 0.5rem;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.select-input::placeholder{color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.select-disabled .select-input{cursor:inherit}.select-pills{display:contents}.pill{display:inline-flex;align-items:center;gap:0.5rem;padding:0.25rem 0.5rem;background:#f2f4f7;border-radius:var(--cat-border-radius-s, 0.125rem);white-space:nowrap;min-width:0}.pill>span{overflow:hidden;text-overflow:ellipsis;flex:1 1 0%}.pill>cat-button{margin-right:-0.25rem;margin-left:-0.25rem}.select-btn{transition:transform 125ms linear}.select-btn::part(button){outline:none}cat-spinner{padding:0.375rem}.icon-suffix{padding:0.25rem}.select-btn-open{transform:rotate(180deg)}.select-dropdown{position:fixed;right:0;background:white;display:none;overflow:auto;box-shadow:0 4px 6px -2px rgba(27, 31, 38, 0.03), 0 12px 16px -4px rgba(27, 31, 38, 0.08);border-radius:var(--cat-border-radius-m, 0.25rem);border:1px solid rgb(var(--cat-border-color, 235, 236, 240));z-index:calc(var(--cat-z-index, 1000) + 100);width:max-content;top:0;left:0}.select-options-wrapper{max-height:16rem;width:100%}.select-empty{margin:1rem 0;padding:0 1.25rem}.select-options{list-style-type:none;margin:0;padding:0.5rem 0}.select-options cat-checkbox,.select-options .select-option-single{margin:0;padding:0.5rem 1rem}.select-option-inner{display:flex;gap:0.5rem}.select-option-inner cat-avatar{--cat-avatar-size:1.25rem;--cat-avatar-font-size:0.5rem}.select-option-text{flex:1 1 0%;min-width:0}.select-option-single{cursor:pointer}.select-input-transparent-caret{caret-color:transparent}.select-option-empty,.select-option-loading{padding:0.5rem 1rem}.select-option:hover{background-color:rgba(var(--cat-secondary-bg, 105, 118, 135), 0.05)}.select-option-active{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:-2px}.select-option-label{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-wrap:break-word;word-break:break-word}.select-option-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}";

const INIT_STATE = {
    term: '',
    isOpen: false,
    isLoading: false,
    isFirstLoading: true,
    isResolving: false,
    options: [],
    selection: [],
    tempSelection: [],
    activeOptionIndex: -1,
    activeSelectionIndex: -1
};
let nextUniqueId = 0;
let nextTagUniqueId = 0;
const CatSelect = /*@__PURE__*/ proxyCustomElement(class CatSelect extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catOpen = createEvent(this, "catOpen");
        this.catClose = createEvent(this, "catClose");
        this.catChange = createEvent(this, "catChange");
        this.catBlur = createEvent(this, "catBlur");
        this._id = `cat-input-${nextUniqueId++}`;
        this.term$ = new cjsExports.Subject();
        this.more$ = new cjsExports.Subject();
        this.valueChangedBySelection = false;
        this.state = INIT_STATE;
        this.hasSlottedLabel = false;
        this.hasSlottedHint = false;
        /**
         * Whether the label need a marker to shown if the select is required or optional.
         */
        this.requiredMarker = 'optional';
        /**
         * Whether the label is on top or left.
         */
        this.horizontal = false;
        /**
         * Enable multiple selection.
         */
        this.multiple = false;
        /**
         * The debounce time for the search.
         */
        this.debounce = 250;
        /**
         * The placement of the select.
         */
        this.placement = 'bottom-start';
        /**
         * Whether the select is disabled.
         */
        this.disabled = false;
        /**
         * The label for the select.
         */
        this.label = '';
        /**
         * Visually hide the label, but still show it to assistive technologies like screen readers.
         */
        this.labelHidden = false;
        /**
         * A value is required or must be checked for the form to be submittable.
         */
        this.required = false;
        /**
         * Whether the select should show a clear button.
         */
        this.clearable = false;
        /**
         * Whether the select should add new items.
         */
        this.tags = false;
        /**
         * Fine-grained control over when the errors are shown. Can be `false` to
         * never show errors, `true` to show errors on blur, or a number to show
         * errors change with the given delay in milliseconds or immediately on blur.
         */
        this.errorUpdate = 0;
    }
    get id() {
        return this.identifier || this._id;
    }
    onConnectorChanged(connector) {
        this.reset(connector);
        this.resolve();
    }
    onValueChanged() {
        !this.valueChangedBySelection ? this.resolve() : (this.valueChangedBySelection = false);
    }
    onErrorsChanged(newValue, _oldValue, update = true) {
        if (!coerceBoolean(this.errorUpdate)) {
            this.errorMap = undefined;
        }
        else {
            this.errorMapSrc = Array.isArray(newValue)
                ? newValue.reduce((acc, err) => ({ ...acc, [err]: undefined }), {})
                : newValue || undefined;
            if (update) {
                this.showErrorsIfTimeout() || this.showErrorsIfNoFocus();
            }
        }
    }
    onStateChanged(newState, oldState) {
        const changed = (key) => newState[key] !== oldState[key];
        if (changed('isOpen')) {
            this.update();
        }
        if (changed('activeOptionIndex') && this.state.activeOptionIndex >= 0) {
            this.dropdown
                ?.querySelector(`#select-${this.id}-option-${this.state.activeOptionIndex}`)
                ?.scrollIntoView({ block: 'nearest' });
        }
        if (changed('selection')) {
            let newValue;
            if (!this.multiple && this.state.selection.length) {
                this.hide();
            }
            const idsSelected = this.state.selection.map(item => item.item.id);
            if (!this.tags) {
                if (this.multiple) {
                    newValue = idsSelected;
                }
                else {
                    newValue = idsSelected.length ? idsSelected[0] : '';
                }
            }
            else {
                const ids = idsSelected.filter(id => !id.startsWith(`select-${this.id}-tag`));
                const tags = this.state.selection
                    .filter(item => item.item.id.startsWith(`select-${this.id}-tag`))
                    .map(item => item.render.label);
                if (this.multiple) {
                    newValue = { ids, tags };
                }
                else {
                    newValue = { id: ids.length ? ids[0] : '', tag: tags.length ? tags[0] : '' };
                }
            }
            if (!oldState.isResolving) {
                this.valueChangedBySelection = true;
                this.value = newValue;
            }
            this.catChange.emit();
            this.showErrorsIfTimeout();
        }
    }
    componentDidLoad() {
        if (this.input) {
            autosizeInput(this.input, { minWidth: true });
        }
        if (this.trigger && this.dropdown) {
            autoUpdate(this.trigger, this.dropdown, () => this.update());
        }
    }
    componentWillLoad() {
        this.onErrorsChanged(this.errors, undefined, false);
    }
    componentWillRender() {
        this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
        this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    }
    onBlur(event) {
        if (!this.multiple && this.state.activeOptionIndex >= 0) {
            if (this.tags && this.state.options[this.state.activeOptionIndex].item.id === `select-${this.id}-option-tag`) {
                this.createTag(this.state.term);
            }
            else {
                this.select(this.state.options[this.state.activeOptionIndex]);
            }
        }
        this.hide();
        // Conditionally remove selection if the option was not manually selected through click or enter key press
        if (!this.multiple && (!this.tags || !this.state.selection?.length)) {
            if (this.state.tempSelection?.length) {
                this.patchState({
                    activeSelectionIndex: -1,
                    selection: this.state.tempSelection,
                    tempSelection: [],
                    options: [],
                    term: this.state.tempSelection[0].render.label
                });
            }
            else if (!this.state.selection?.length) {
                this.patchState({
                    activeSelectionIndex: -1,
                    selection: [],
                    tempSelection: [],
                    options: [],
                    term: ''
                });
            }
        }
        else {
            this.patchState({ activeSelectionIndex: -1 });
        }
        this.catBlur.emit(event);
        if (coerceBoolean(this.errorUpdate)) {
            this.showErrors();
        }
    }
    onKeyDown(event) {
        const isInputFocused = this.hostElement.shadowRoot?.activeElement === this.input;
        if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            this.onArrowKeyDown(event);
        }
        else if (['Enter', ' '].includes(event.key) && isInputFocused) {
            if (this.tags &&
                this.state.activeOptionIndex === 0 &&
                this.state.options[0].item.id === `select-${this.id}-option-tag`) {
                event.preventDefault();
                if (this.multiple) {
                    this.toggleTag(this.state.options[0]);
                }
                else {
                    this.createTag(this.state.options[0].render.label);
                }
            }
            else if (this.state.activeOptionIndex >= 0) {
                event.preventDefault();
                if (this.multiple) {
                    this.toggle(this.state.options[this.state.activeOptionIndex]);
                }
                else {
                    this.select(this.state.options[this.state.activeOptionIndex]);
                }
            }
            else if (this.tags && event.key === 'Enter' && this.state.activeOptionIndex < 0) {
                this.createTag(this.state.term);
            }
        }
        else if (event.key === 'Escape') {
            if (this.hide()) {
                event.stopPropagation();
            }
        }
        else if (event.key === 'Backspace' || event.key === 'Delete') {
            this.input?.focus();
            if (!this.multiple || !this.state.term || (this.input?.selectionStart === 0 && event.key === 'Backspace')) {
                if (this.state.activeSelectionIndex >= 0) {
                    this.deselect(this.state.selection[this.state.activeSelectionIndex].item.id);
                }
                else if (this.state.selection.length) {
                    const selectionClone = [...this.state.selection];
                    selectionClone.pop();
                    this.patchState({
                        selection: selectionClone,
                        tempSelection: this.state.term ? [...this.state.selection] : []
                    });
                }
            }
        }
        else if (event.key === 'Tab') {
            this.trigger?.setAttribute('tabindex', '-1');
            if (this.multiple) {
                this.patchState({ activeSelectionIndex: -1, activeOptionIndex: -1 });
            }
            else if (this.state.activeOptionIndex >= 0) {
                if (this.tags && this.state.options[this.state.activeOptionIndex].item.id === `select-${this.id}-option-tag`) {
                    this.createTag(this.state.term);
                }
                else {
                    this.select(this.state.options[this.state.activeOptionIndex]);
                }
            }
        }
        else if (event.key.length === 1) {
            this.input?.focus();
        }
    }
    onKeyUp(event) {
        if (event.key === 'Tab' && !event.shiftKey) {
            this.hostElement.shadowRoot?.activeElement === this.trigger && this.input?.focus();
            if (this.hostElement.shadowRoot?.activeElement === this.input) {
                this.show();
            }
        }
        else if (event.key === 'Tab' && event.shiftKey) {
            const clearButton = this.trigger?.querySelector(`#select-clear-btn-${this.id}`);
            if (clearButton) {
                this.hostElement.shadowRoot?.activeElement === clearButton && this.show();
            }
            else {
                this.show();
            }
        }
    }
    /**
     * Programmatically move focus to the input. Use this method instead of
     * `input.focus()`.
     *
     * @param options An optional object providing options to control aspects of
     * the focusing process.
     */
    async doFocus(options) {
        this.input?.focus(options);
    }
    /**
     * Programmatically remove focus from the input. Use this method instead of
     * `input.blur()`.
     */
    async doBlur() {
        this.input?.blur();
    }
    /**
     * Clear the input.
     */
    async clear() {
        this.clearInput();
    }
    /**
     * Connect the functions of the select
     *
     * @param connector - The {@link CatSelectConnector} of the select.
     */
    async connect(connector) {
        this.connector = connector;
        let number$;
        this.subscription?.unsubscribe();
        this.subscription = this.term$
            .asObservable()
            .pipe(cjsExports.debounce(term => (term ? cjsExports.timer(this.debounce) : cjsExports.of(0))), cjsExports.distinctUntilChanged(), cjsExports.tap(() => (number$ = this.more$.pipe(cjsExports.filter(() => !this.state.isLoading), cjsExports.scan(n => n + 1, 0), cjsExports.startWith(0)))), cjsExports.switchMap(term => number$.pipe(cjsExports.tap(() => this.patchState({ isLoading: true })), cjsExports.switchMap(number => connector.retrieve(term, number)), cjsExports.tap(page => this.patchState({ isLoading: false, totalElements: page.totalElements, isFirstLoading: false })), cjsExports.takeWhile(page => !page.last, true), cjsExports.scan((items, page) => [...items, ...page.content], []))))
            .subscribe(items => {
            const options = this.toSelectItems(connector, items);
            if (this.tags &&
                this.state.term.trim().length &&
                !options.find(value1 => value1.render.label.toLowerCase() === this.state.term.toLowerCase())) {
                let label;
                if (this.isTagSelected(this.state.term)) {
                    label = this.state.selection.find(item => item.render.label.toLowerCase() === this.state.term.toLowerCase())
                        ?.render.label;
                }
                options.unshift({
                    item: { id: `select-${this.id}-option-tag` },
                    render: { label: label ? label : this.state.term }
                });
            }
            this.patchState({
                options
            });
        });
    }
    render() {
        this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
        return (h(Host, { key: '4ffaec1ec7c59635d3e923912e5bb5b554661973' }, h("div", { key: 'ad9ad59ff47ab4fe9c9485da344b0be8f030f824', class: {
                'select-field': true,
                'select-horizontal': this.horizontal,
                'select-multiple': this.multiple
            } }, h("div", { key: 'd87e3451ded9630ef471c6a0d0230f73bf2001f0', class: { 'label-container': true, hidden: this.labelHidden } }, (this.hasSlottedLabel || this.label) && (h("label", { key: '0eb6bd92232da327fd11a5b8fa5108064216b98d', htmlFor: `select-${this.id}-input`, part: "label" }, h("span", { key: '29b3bc2a6300cf116e85b598c43bc3d590bfca40', class: "label-wrapper" }, (this.hasSlottedLabel && h("slot", { key: '105d69c1c4ebce966d207248d0919713402775fc', name: "label" })) || this.label, h("div", { key: '60d737d4bc621e64c4d60a4454c81d5cd2f14036', class: "label-metadata" }, !this.required && (this.requiredMarker ?? 'optional').startsWith('optional') && (h("span", { key: '3ff4fc174c6769300fecde9b4f3785e7f510b3c5', class: "label-optional", "aria-hidden": "true" }, "(", catI18nRegistry.t('input.optional'), ")")), this.required && this.requiredMarker?.startsWith('required') && (h("span", { key: '44beff5fb235a6ecfe4d3bde6173309ab9374b7d', class: "label-optional", "aria-hidden": "true" }, "(", catI18nRegistry.t('input.required'), ")"))))))), h("div", { key: 'ca853307f93adc14b4ebe5de1f0b5cd255d438d7', class: "select-container" }, h("div", { key: 'fc56c44f4d6b27ca4d7d1c3f344bef6c5495ae84', class: { 'select-wrapper': true, 'select-disabled': this.disabled, 'select-invalid': this.invalid }, ref: el => (this.trigger = el), id: this.id, role: "combobox", "aria-expanded": this.state.isOpen || this.isPillboxActive(), "aria-controls": this.isPillboxActive() ? `select-pillbox-${this.id}` : `select-listbox-${this.id}`, "aria-required": this.required ? 'true' : false, "aria-activedescendant": this.activeDescendant, onClick: e => this.onClick(e) }, h("div", { key: '77d3a48ea7ad111136fb1513aaeb6c3b15533436', class: "select-wrapper-inner" }, this.multiple && this.state.selection.length ? (h("div", { id: `select-pillbox-${this.id}`, role: "listbox", "aria-orientation": "horizontal", class: "select-pills" }, this.state.selection.map((item, i) => (h("span", { class: {
                pill: true,
                'select-no-open': true,
                'select-option-active': this.state.activeSelectionIndex === i
            }, role: "option", "aria-selected": "true", id: `select-${this.id}-selection-${i}` }, item.render.avatar ? (h("cat-avatar", { label: item.render.label, round: item.render.avatar.round, src: item.render.avatar.src, icon: item.render.avatar.icon, initials: item.render.avatar.initials ?? '' })) : null, h("span", null, item.render.label), !this.disabled && (h("cat-button", { size: "xs", variant: "text", icon: "$cat:select-clear", iconOnly: true, a11yLabel: catI18nRegistry.t('select.deselect'), onClick: () => this.deselect(item.item.id), tabIndex: -1, "data-dropdown-no-close": true }))))))) : this.state.selection.length && this.state.selection[0].render.avatar ? (h("cat-avatar", { label: this.state.selection[0].render.label, round: this.state.selection[0].render.avatar.round, src: this.state.selection[0].render.avatar.src, icon: this.state.selection[0].render.avatar.icon, initials: this.state.selection[0].render.avatar.initials ?? '' })) : null, h("input", { key: 'a4e438192ecee41d5acf77de45a1526876409a0f', "data-test": this.testId, ...this.nativeAttributes, part: "input", id: `select-${this.id}-input`, class: "select-input", role: "combobox", ref: el => (this.input = el), "aria-controls": this.isPillboxActive() ? `select-pillbox-${this.id}` : `select-listbox-${this.id}`, "aria-activedescendant": this.activeDescendant, "aria-invalid": this.invalid ? 'true' : undefined, "aria-describedby": this.hasHint ? this.id + '-hint' : undefined, "aria-autocomplete": "list", onInput: this.onInput.bind(this), value: !this.multiple ? this.state.term : undefined, placeholder: this.placeholder, disabled: this.disabled || this.state.isResolving })), this.state.isResolving && h("cat-spinner", { key: '04d53d0d39bc429a6ac9a479c46f42c6b03a9283' }), this.invalid && (h("cat-icon", { key: 'd21136d141632914fc176ea1939164a4d40dc446', icon: "$cat:input-error", class: "icon-suffix cat-text-danger", size: "l" })), (this.state.selection.length || this.state.term.length) &&
            !this.disabled &&
            !this.state.isResolving &&
            this.clearable ? (h("cat-button", { id: `select-clear-btn-${this.id}`, iconOnly: true, icon: "$cat:input-close", variant: "text", size: "s", a11yLabel: catI18nRegistry.t('input.clear'), onCatClick: () => this.clearInput(), "data-dropdown-no-close": true })) : null, !this.state.isResolving && (h("cat-button", { key: 'cd5c84bbc7b04b28acda86d656b2ea9835cbb439', iconOnly: true, icon: "$cat:select-open", class: { 'select-btn': true, 'select-btn-open': this.state.isOpen }, variant: "text", size: "s", a11yLabel: this.state.isOpen ? catI18nRegistry.t('select.close') : catI18nRegistry.t('select.open'), "aria-controls": `select-listbox-${this.id}`, "aria-expanded": this.state.isOpen, tabIndex: -1, disabled: this.disabled || this.state.isResolving, "data-dropdown-no-close": true }))), this.hasHint && (h(CatFormHint, { key: 'd0f3f4f080abf2136e681161802f0b332591a30a', id: this.id, hint: this.hint, slottedHint: this.hasSlottedHint && h("slot", { name: "hint" }), errorMap: this.errorMap })))), h("div", { key: '1fb0555801f6793b6351dbc19f2eba12c7292593', class: "select-dropdown", ref: el => (this.dropdown = el), style: { display: this.state.isOpen ? 'block' : undefined } }, this.state.isOpen && (h("cat-scrollable", { key: '8eea85eea2b000f29d690aafc7fbae106bf275e5', class: "select-options-wrapper", scrolledBuffer: 56, noOverflowX: true, noOverscroll: true, noScrolledInit: true, onScrolledBottom: () => this.more$.next() }, h("ul", { key: 'fa0415a3459967bc8a8591c94e3227c8fb99443d', class: "select-options", role: "listbox", "aria-multiselectable": this.multiple, "aria-setsize": this.state.totalElements, id: `select-listbox-${this.id}` }, this.optionsList, this.state.isFirstLoading
            ? Array.from(Array(CatSelect.SKELETON_COUNT)).map(() => (h("li", { class: "select-option-loading" }, h("cat-skeleton", { variant: "body", lines: 1 }), h("cat-skeleton", { variant: "body", lines: 1 }))))
            : !this.state.options.length &&
                !this.tags && (h("li", { class: "select-option-empty" }, this.noItems ? this.noItems : catI18nRegistry.t('select.empty')))))))));
    }
    get hasHint() {
        return !!this.hint || !!this.hasSlottedHint || this.invalid;
    }
    get invalid() {
        return this.errorMap === true || !!Object.keys(this.errorMap || {}).length;
    }
    get optionsList() {
        return this.state.options.map((item, i) => {
            const isTagOption = this.tags && item.item.id === `select-${this.id}-option-tag`;
            const isOptionSelected = this.isSelected(item.item.id) || (this.tags && this.isTagSelected(item.render.label));
            const getLabel = () => {
                if (isTagOption) {
                    return item.render.label + this.tagTextHelp;
                }
                return item.render.label;
            };
            return (h("li", { role: "option", class: "select-option", id: `select-${this.id}-option-${i}`, "aria-selected": isOptionSelected ? 'true' : 'false' }, this.multiple ? (h("cat-checkbox", { class: { 'select-option-active': this.state.activeOptionIndex === i }, checked: isOptionSelected, tabIndex: -1, labelLeft: true, onFocus: () => this.input?.focus(), onCatChange: e => {
                    !isTagOption ? this.toggle(item) : this.toggleTag(item);
                    e.stopPropagation();
                } }, h("span", { slot: "label", class: "select-option-inner" }, item.render.avatar ? (h("cat-avatar", { label: item.render.label, round: item.render.avatar.round, src: item.render.avatar.src, icon: item.render.avatar.icon, initials: item.render.avatar.initials ?? '' })) : null, h("span", { class: "select-option-text" }, h("span", { class: "select-option-label" }, getLabel()), h("span", { class: "select-option-description" }, item.render.description))))) : (h("div", { class: {
                    'select-option-inner': true,
                    'select-option-single': true,
                    'select-option-active': this.state.activeOptionIndex === i
                }, onFocus: () => this.input?.focus(), onClick: () => (isTagOption ? this.createTag(item.render.label) : this.select(item)), tabIndex: -1 }, item.render.avatar ? (h("cat-avatar", { label: item.render.label, round: item.render.avatar.round, src: item.render.avatar.src, icon: item.render.avatar.icon, initials: item.render.avatar.initials ?? '' })) : null, h("span", { class: "select-option-text" }, h("span", { class: "select-option-label" }, getLabel()), h("span", { class: "select-option-description" }, item.render.description))))));
        });
    }
    resolve() {
        const connector = this.connector;
        if (!connector) {
            return;
        }
        this.patchState({ isResolving: true });
        const ids = this.initIds();
        let tags;
        if (this.tags) {
            tags = this.initTags();
        }
        const data$ = ids.length ? connector.resolve(ids).pipe(cjsExports.first()) : cjsExports.of([]);
        data$.pipe(cjsExports.catchError(() => cjsExports.of([]))).subscribe(items => {
            const selection = this.toSelectItems(connector, items);
            if (this.tags) {
                tags
                    .filter(tag => !this.isTagSelected(tag, selection))
                    .forEach((tag, index) => {
                    const item = { id: `select-${this.id}-tag-${index}`, name: tag };
                    selection.push({ item, render: { label: item.name } });
                });
            }
            const term = !this.multiple && selection.length ? selection[0].render.label : '';
            this.patchState({ isResolving: false, selection, term, activeOptionIndex: -1 });
            this.term$.next(term);
            this.input && (this.input.value = term);
        });
    }
    toSelectItems(connector, items) {
        return items.map(item => ({
            item: { ...item, id: connector.customId ? connector.customId(item) : item.id },
            render: connector.render(item)
        }));
    }
    show() {
        if (!this.state.isOpen && this.connector) {
            // reconnect to reset the connection, i.e. the pagination
            this.connect(this.connector);
            this.patchState({ isOpen: true, isFirstLoading: true, options: [] });
            this.catOpen.emit();
            this.term$.next('');
            this.input?.classList.remove('select-input-transparent-caret');
        }
    }
    hide() {
        if (this.state.isOpen) {
            this.patchState({ isOpen: false, activeOptionIndex: -1 });
            this.catClose.emit();
            return true;
        }
        return false;
    }
    search(term) {
        this.patchState({ term, activeOptionIndex: -1, activeSelectionIndex: -1 });
        this.term$.next(term);
    }
    isSelected(id) {
        return this.state.selection.findIndex(s => s.item.id === id) >= 0;
    }
    select(item) {
        if (!this.isSelected(item.item.id)) {
            let newSelection;
            if (this.multiple) {
                newSelection = [...this.state.selection, item];
            }
            else {
                newSelection = [item];
                this.patchState({ term: item.render.label, activeOptionIndex: -1, activeSelectionIndex: -1 });
            }
            this.patchState({ selection: newSelection, tempSelection: [] });
            if (this.multiple && this.state.term.trim() && this.input) {
                this.patchState({ term: '', activeOptionIndex: -1 });
                this.term$.next('');
                this.input.value = '';
            }
        }
        this.setTransparentCaret();
    }
    deselect(id) {
        if (this.isSelected(id)) {
            this.patchState({
                selection: this.state.selection.filter(item => item.item.id !== id),
                activeSelectionIndex: -1
            });
        }
    }
    toggle(item) {
        this.isSelected(item.item.id)
            ? this.deselect(item.item.id)
            : this.tags && this.isTagSelected(item.render.label)
                ? this.removeTag(item.render.label)
                : this.select(item);
    }
    clearInput() {
        if (this.input && this.state.term) {
            this.patchState({ selection: [], term: '', activeOptionIndex: -1, tempSelection: [] });
            this.term$.next('');
            this.input.value = '';
        }
        else {
            this.patchState({ selection: [], tempSelection: [] });
        }
    }
    reset(connector) {
        this.connector = connector ?? this.connector;
        this.subscription?.unsubscribe();
        this.subscription = undefined;
        this.state = INIT_STATE;
    }
    onClick(event) {
        if (this.disabled) {
            return;
        }
        const elem = event.target;
        this.trigger?.setAttribute('tabindex', '0');
        this.input?.focus();
        if (elem === this.trigger ||
            elem === this.input ||
            elem.classList.contains('select-btn') ||
            elem.nodeName === 'SPAN') {
            this.state.isOpen ? this.hide() : this.show();
        }
    }
    onInput() {
        this.search(this.input?.value.trim() || '');
        if (!this.multiple) {
            if (this.state.selection.length) {
                const selectionClone = [...this.state.selection];
                selectionClone.pop();
                this.patchState({ selection: selectionClone, tempSelection: [...this.state.selection] });
            }
            if (!this.required && !this.input?.value.trim()) {
                this.patchState({ tempSelection: [] });
            }
        }
        this.show();
    }
    update() {
        if (this.trigger && this.dropdown) {
            computePosition(this.trigger, this.dropdown, {
                strategy: 'fixed',
                placement: this.placement,
                middleware: [offset(CatSelect.DROPDOWN_OFFSET), flip()]
            }).then(({ x, y, placement }) => {
                if (this.dropdown) {
                    this.dropdown.dataset.placement = placement;
                    Object.assign(this.dropdown.style, {
                        width: `${this.trigger?.clientWidth}px`,
                        left: `${x}px`,
                        top: `${y}px`
                    });
                }
            });
        }
    }
    patchState(update) {
        this.state = { ...this.state, ...update };
    }
    isPillboxActive() {
        return this.state.activeSelectionIndex >= 0;
    }
    get activeDescendant() {
        let activeDescendant = undefined;
        if (this.state.activeOptionIndex >= 0) {
            activeDescendant = `select-${this.id}-option-${this.state.activeOptionIndex}`;
        }
        else if (this.state.activeSelectionIndex >= 0) {
            activeDescendant = `select-${this.id}-selection-${this.state.activeSelectionIndex}`;
        }
        return activeDescendant;
    }
    onArrowKeyDown(event) {
        let preventDefault = false;
        this.input?.focus();
        switch (event.key) {
            case 'ArrowDown':
                preventDefault = true;
                this.state.isOpen
                    ? this.patchState({
                        activeOptionIndex: Math.min(this.state.activeOptionIndex + 1, this.state.options.length - 1),
                        activeSelectionIndex: -1
                    })
                    : this.show();
                break;
            case 'ArrowUp':
                preventDefault = true;
                this.state.activeOptionIndex >= 0
                    ? this.patchState({
                        activeOptionIndex: Math.max(this.state.activeOptionIndex - 1, -1),
                        activeSelectionIndex: -1
                    })
                    : this.hide();
                break;
            case 'ArrowLeft':
                if (this.input?.selectionStart === 0) {
                    preventDefault = true;
                    let index;
                    this.state.activeSelectionIndex > 0
                        ? (index = Math.max(this.state.activeSelectionIndex - 1, -1))
                        : (index = this.state.selection.length - 1);
                    this.patchState({ activeSelectionIndex: index, activeOptionIndex: -1 });
                }
                break;
            case 'ArrowRight':
                if (this.state.activeSelectionIndex >= 0) {
                    preventDefault = true;
                    let index = -1;
                    if (this.state.activeSelectionIndex < this.state.selection.length - 1) {
                        index = Math.min(this.state.activeSelectionIndex + 1, this.state.selection.length - 1);
                    }
                    else if (!this.state.term) {
                        index = 0;
                    }
                    this.patchState({ activeSelectionIndex: index, activeOptionIndex: -1 });
                }
        }
        if (preventDefault) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    get tagTextHelp() {
        return this.tagHint && !this.isTagSelected(this.state.term) ? ' (' + this.tagHint + ')' : '';
    }
    isTagSelected(term, selection = this.state.selection) {
        return selection.findIndex(item => item.render.label.toLowerCase() === term.toLowerCase()) >= 0;
    }
    createTag(term) {
        if (term.trim().length && !this.isTagSelected(term)) {
            const value = this.value;
            const tags = value?.tags;
            const tag = { id: `select-${this.id}-tag-${tags?.length ? tags?.length + nextTagUniqueId++ : 0}`, name: term };
            this.select({ item: tag, render: { label: tag.name } });
        }
        this.setTransparentCaret();
    }
    removeTag(label) {
        if (this.isTagSelected(label)) {
            const item = this.state.selection.find(item => item.render.label.toLowerCase() === label.toLowerCase());
            item && this.deselect(item.item.id);
        }
    }
    toggleTag(item) {
        this.isTagSelected(item.render.label) ? this.removeTag(item.render.label) : this.createTag(item.render.label);
    }
    initIds() {
        let ids = [];
        if (this.value) {
            if (!this.tags) {
                if (this.multiple) {
                    ids = this.value;
                }
                else {
                    ids = [this.value];
                }
            }
            else {
                if (this.multiple) {
                    const value = this.value;
                    ids = value.ids ? value.ids : [];
                }
                else {
                    const value = this.value;
                    ids = value.id ? [value.id] : [];
                }
            }
        }
        return ids;
    }
    initTags() {
        let tags = [];
        if (this.value) {
            if (this.multiple) {
                const value = this.value;
                tags = value.tags ? value.tags : [];
            }
            else {
                const value = this.value;
                tags = value.tag ? [value.tag] : [];
            }
        }
        return tags;
    }
    setTransparentCaret() {
        if (!this.multiple) {
            this.hide();
            this.input?.classList.add('select-input-transparent-caret');
        }
    }
    showErrors() {
        this.errorMap = this.errorMapSrc;
    }
    showErrorsIfTimeout() {
        const errorUpdate = coerceNumber(this.errorUpdate, null);
        if (errorUpdate !== null) {
            typeof this.errorUpdateTimeoutId === 'number' && window.clearTimeout(this.errorUpdateTimeoutId);
            this.errorUpdateTimeoutId = window.setTimeout(() => this.showErrors(), errorUpdate);
            return true;
        }
        return false;
    }
    showErrorsIfNoFocus() {
        const hasFocus = document.activeElement === this.hostElement || document.activeElement === this.input;
        if (!hasFocus) {
            this.showErrors();
        }
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get watchers() { return {
        "connector": ["onConnectorChanged"],
        "value": ["onValueChanged"],
        "errors": ["onErrorsChanged"],
        "state": ["onStateChanged"]
    }; }
    static get style() { return catSelectCss; }
}, [17, "cat-select", {
        "requiredMarker": [1, "required-marker"],
        "horizontal": [4],
        "multiple": [4],
        "debounce": [2],
        "placement": [1],
        "value": [1025],
        "disabled": [4],
        "placeholder": [1],
        "hint": [1],
        "identifier": [1],
        "label": [1],
        "name": [1],
        "labelHidden": [4, "label-hidden"],
        "required": [4],
        "clearable": [4],
        "tags": [4],
        "tagHint": [1, "tag-hint"],
        "noItems": [1, "no-items"],
        "errors": [4],
        "errorUpdate": [8, "error-update"],
        "nativeAttributes": [16],
        "testId": [1, "test-id"],
        "connector": [32],
        "state": [32],
        "hasSlottedLabel": [32],
        "hasSlottedHint": [32],
        "errorMap": [32],
        "doFocus": [64],
        "doBlur": [64],
        "clear": [64],
        "connect": [64]
    }, [[0, "blur", "onBlur"], [0, "keydown", "onKeyDown"], [0, "keyup", "onKeyUp"]], {
        "connector": ["onConnectorChanged"],
        "value": ["onValueChanged"],
        "errors": ["onErrorsChanged"],
        "state": ["onStateChanged"]
    }]);
CatSelect.SKELETON_COUNT = 4;
CatSelect.DROPDOWN_OFFSET = 4;
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-select", "cat-avatar", "cat-button", "cat-checkbox", "cat-icon", "cat-scrollable", "cat-skeleton", "cat-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-select":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatSelect);
            }
            break;
        case "cat-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "cat-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "cat-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "cat-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "cat-scrollable":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "cat-skeleton":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "cat-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { CatSelect as C, defineCustomElement as d };
//# sourceMappingURL=p-CwkPG6mw.js.map

//# sourceMappingURL=p-CwkPG6mw.js.map