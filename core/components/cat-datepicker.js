import { p as proxyCustomElement, H, d as createEvent, h } from './p-DJz_AlH8.js';
import { f as flatpickr, g as getConfig, a as getFormat, b as getLocale } from './p-BSUmB_WZ.js';
import { f as findClosest, d as defineCustomElement$5 } from './p-BAS0o037.js';
import { c as catI18nRegistry } from './p-DYxciDq0.js';
import { c as computePosition, a as autoUpdate, f as flip } from './p-OtWHn5vK.js';
import { d as defineCustomElement$4 } from './p-tMJhdM6b.js';
import { d as defineCustomElement$3 } from './p-bQjey6hs.js';
import { d as defineCustomElement$2 } from './p-BWMxUNx3.js';

const catDatepickerCss = "@charset \"UTF-8\";.flatpickr-calendar{background:transparent;opacity:0;display:none;text-align:center;visibility:hidden;padding:0;-webkit-animation:none;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:5px;position:absolute;width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-touch-action:manipulation;touch-action:manipulation;background:#fff;-webkit-box-shadow:1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6, 0 -1px 0 #e6e6e6, 0 3px 13px rgba(0,0,0,0.08);box-shadow:1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6, 0 -1px 0 #e6e6e6, 0 3px 13px rgba(0,0,0,0.08)}.flatpickr-calendar.open,.flatpickr-calendar.inline{opacity:1;max-height:640px;visibility:visible}.flatpickr-calendar.open{display:inline-block;z-index:99999}.flatpickr-calendar.animate.open{-webkit-animation:fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);animation:fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1)}.flatpickr-calendar.inline{display:block;position:relative;top:2px}.flatpickr-calendar.static{position:absolute;top:calc(100% + 2px)}.flatpickr-calendar.static.open{z-index:999;display:block}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7){-webkit-box-shadow:none !important;box-shadow:none !important}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1){-webkit-box-shadow:-2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;box-shadow:-2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6}.flatpickr-calendar .hasWeeks .dayContainer,.flatpickr-calendar .hasTime .dayContainer{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.flatpickr-calendar .hasWeeks .dayContainer{border-left:0}.flatpickr-calendar.hasTime .flatpickr-time{height:40px;border-top:1px solid #e6e6e6}.flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto}.flatpickr-calendar:before,.flatpickr-calendar:after{position:absolute;display:block;pointer-events:none;border:solid transparent;content:'';height:0;width:0;left:22px}.flatpickr-calendar.rightMost:before,.flatpickr-calendar.arrowRight:before,.flatpickr-calendar.rightMost:after,.flatpickr-calendar.arrowRight:after{left:auto;right:22px}.flatpickr-calendar.arrowCenter:before,.flatpickr-calendar.arrowCenter:after{left:50%;right:50%}.flatpickr-calendar:before{border-width:5px;margin:0 -5px}.flatpickr-calendar:after{border-width:4px;margin:0 -4px}.flatpickr-calendar.arrowTop:before,.flatpickr-calendar.arrowTop:after{bottom:100%}.flatpickr-calendar.arrowTop:before{border-bottom-color:#e6e6e6}.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff}.flatpickr-calendar.arrowBottom:before,.flatpickr-calendar.arrowBottom:after{top:100%}.flatpickr-calendar.arrowBottom:before{border-top-color:#e6e6e6}.flatpickr-calendar.arrowBottom:after{border-top-color:#fff}.flatpickr-calendar:focus{outline:0}.flatpickr-wrapper{position:relative;display:inline-block}.flatpickr-months{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-months .flatpickr-month{background:transparent;color:rgba(0,0,0,0.9);fill:rgba(0,0,0,0.9);height:34px;line-height:1;text-align:center;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.flatpickr-months .flatpickr-prev-month,.flatpickr-months .flatpickr-next-month{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-decoration:none;cursor:pointer;position:absolute;top:0;height:34px;padding:10px;z-index:3;color:rgba(0,0,0,0.9);fill:rgba(0,0,0,0.9)}.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,.flatpickr-months .flatpickr-next-month.flatpickr-disabled{display:none}.flatpickr-months .flatpickr-prev-month i,.flatpickr-months .flatpickr-next-month i{position:relative}.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,.flatpickr-months .flatpickr-next-month.flatpickr-prev-month{left:0;}.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,.flatpickr-months .flatpickr-next-month.flatpickr-next-month{right:0;}.flatpickr-months .flatpickr-prev-month:hover,.flatpickr-months .flatpickr-next-month:hover{color:#959ea9}.flatpickr-months .flatpickr-prev-month:hover svg,.flatpickr-months .flatpickr-next-month:hover svg{fill:#f64747}.flatpickr-months .flatpickr-prev-month svg,.flatpickr-months .flatpickr-next-month svg{width:14px;height:14px}.flatpickr-months .flatpickr-prev-month svg path,.flatpickr-months .flatpickr-next-month svg path{-webkit-transition:fill 0.1s;transition:fill 0.1s;fill:inherit}.numInputWrapper{position:relative;height:auto}.numInputWrapper input,.numInputWrapper span{display:inline-block}.numInputWrapper input{width:100%}.numInputWrapper input::-ms-clear{display:none}.numInputWrapper input::-webkit-outer-spin-button,.numInputWrapper input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none}.numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;cursor:pointer;border:1px solid rgba(57,57,57,0.15);-webkit-box-sizing:border-box;box-sizing:border-box}.numInputWrapper span:hover{background:rgba(0,0,0,0.1)}.numInputWrapper span:active{background:rgba(0,0,0,0.2)}.numInputWrapper span:after{display:block;content:\"\";position:absolute}.numInputWrapper span.arrowUp{top:0;border-bottom:0}.numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(57,57,57,0.6);top:26%}.numInputWrapper span.arrowDown{top:50%}.numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(57,57,57,0.6);top:40%}.numInputWrapper span svg{width:inherit;height:auto}.numInputWrapper span svg path{fill:rgba(0,0,0,0.5)}.numInputWrapper:hover{background:rgba(0,0,0,0.05)}.numInputWrapper:hover span{opacity:1}.flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;padding:7.48px 0 0 0;line-height:1;height:34px;display:inline-block;text-align:center;-webkit-transform:translate3d(0px, 0px, 0px);transform:translate3d(0px, 0px, 0px)}.flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;margin-left:0.5ch;padding:0}.flatpickr-current-month span.cur-month:hover{background:rgba(0,0,0,0.05)}.flatpickr-current-month .numInputWrapper{width:6ch;width:7ch\\0;display:inline-block}.flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:rgba(0,0,0,0.9)}.flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:rgba(0,0,0,0.9)}.flatpickr-current-month input.cur-year{background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;cursor:text;padding:0 0 0 0.5ch;margin:0;display:inline-block;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:auto;border:0;border-radius:0;vertical-align:initial;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-current-month input.cur-year:focus{outline:0}.flatpickr-current-month input.cur-year[disabled],.flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:rgba(0,0,0,0.5);background:transparent;pointer-events:none}.flatpickr-current-month .flatpickr-monthDropdown-months{appearance:menulist;background:transparent;border:none;border-radius:0;box-sizing:border-box;color:inherit;cursor:pointer;font-size:inherit;font-family:inherit;font-weight:300;height:auto;line-height:inherit;margin:-1px 0 0 0;outline:none;padding:0 0 0 0.5ch;position:relative;vertical-align:initial;-webkit-box-sizing:border-box;-webkit-appearance:menulist;-moz-appearance:menulist;width:auto}.flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-current-month .flatpickr-monthDropdown-months:active{outline:none}.flatpickr-current-month .flatpickr-monthDropdown-months:hover{background:rgba(0,0,0,0.05)}.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month{background-color:transparent;outline:none;padding:0}.flatpickr-weekdays{background:transparent;text-align:center;overflow:hidden;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:28px}.flatpickr-weekdays .flatpickr-weekdaycontainer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}span.flatpickr-weekday{cursor:default;font-size:90%;background:transparent;color:rgba(0,0,0,0.54);line-height:1;margin:0;text-align:center;display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-weight:bolder}.dayContainer,.flatpickr-weeks{padding:1px 0 0 0}.flatpickr-days{position:relative;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;width:307.875px}.flatpickr-days:focus{outline:0}.dayContainer{padding:0;outline:0;text-align:left;width:307.875px;min-width:307.875px;max-width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-wrap:wrap;-ms-flex-pack:justify;-webkit-justify-content:space-around;justify-content:space-around;-webkit-transform:translate3d(0px, 0px, 0px);transform:translate3d(0px, 0px, 0px);opacity:1}.dayContainer+.dayContainer{-webkit-box-shadow:-1px 0 0 #e6e6e6;box-shadow:-1px 0 0 #e6e6e6}.flatpickr-day{background:none;border:1px solid transparent;border-radius:150px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#393939;cursor:pointer;font-weight:400;width:14.2857143%;-webkit-flex-basis:14.2857143%;-ms-flex-preferred-size:14.2857143%;flex-basis:14.2857143%;max-width:39px;height:39px;line-height:39px;margin:0;display:inline-block;position:relative;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center}.flatpickr-day.inRange,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.today.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day:hover,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.nextMonthDay:hover,.flatpickr-day:focus,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.nextMonthDay:focus{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6}.flatpickr-day.today{border-color:#959ea9}.flatpickr-day.today:hover,.flatpickr-day.today:focus{border-color:#959ea9;background:#959ea9;color:#fff}.flatpickr-day.selected,.flatpickr-day.startRange,.flatpickr-day.endRange,.flatpickr-day.selected.inRange,.flatpickr-day.startRange.inRange,.flatpickr-day.endRange.inRange,.flatpickr-day.selected:focus,.flatpickr-day.startRange:focus,.flatpickr-day.endRange:focus,.flatpickr-day.selected:hover,.flatpickr-day.startRange:hover,.flatpickr-day.endRange:hover,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.endRange.prevMonthDay,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.endRange.nextMonthDay{background:#569ff7;-webkit-box-shadow:none;box-shadow:none;color:#fff;border-color:#569ff7}.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange,.flatpickr-day.endRange.startRange{border-radius:50px 0 0 50px}.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange,.flatpickr-day.endRange.endRange{border-radius:0 50px 50px 0}.flatpickr-day.selected.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.startRange.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.endRange.startRange+.endRange:not(:nth-child(7n+1)){-webkit-box-shadow:-10px 0 0 #569ff7;box-shadow:-10px 0 0 #569ff7}.flatpickr-day.selected.startRange.endRange,.flatpickr-day.startRange.startRange.endRange,.flatpickr-day.endRange.startRange.endRange{border-radius:50px}.flatpickr-day.inRange{border-radius:0;-webkit-box-shadow:-5px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;box-shadow:-5px 0 0 #e6e6e6, 5px 0 0 #e6e6e6}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover,.flatpickr-day.prevMonthDay,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.notAllowed.nextMonthDay{color:rgba(57,57,57,0.3);background:transparent;border-color:transparent;cursor:default}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover{cursor:not-allowed;color:rgba(57,57,57,0.1)}.flatpickr-day.week.selected{border-radius:0;-webkit-box-shadow:-5px 0 0 #569ff7, 5px 0 0 #569ff7;box-shadow:-5px 0 0 #569ff7, 5px 0 0 #569ff7}.flatpickr-day.hidden{visibility:hidden}.rangeMode .flatpickr-day{margin-top:1px}.flatpickr-weekwrapper{float:left}.flatpickr-weekwrapper .flatpickr-weeks{padding:0 12px;-webkit-box-shadow:1px 0 0 #e6e6e6;box-shadow:1px 0 0 #e6e6e6}.flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%;line-height:28px}.flatpickr-weekwrapper span.flatpickr-day,.flatpickr-weekwrapper span.flatpickr-day:hover{display:block;width:100%;max-width:none;color:rgba(57,57,57,0.3);background:transparent;cursor:default;border:none}.flatpickr-innerContainer{display:block;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.flatpickr-rContainer{display:inline-block;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}.flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-time:after{content:\"\";display:table;clear:both}.flatpickr-time .numInputWrapper{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:40%;height:40px;float:left}.flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:#393939}.flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:#393939}.flatpickr-time.hasSeconds .numInputWrapper{width:26%}.flatpickr-time.time24hr .numInputWrapper{width:49%}.flatpickr-time input{background:transparent;-webkit-box-shadow:none;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;color:#393939;font-size:14px;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-time input.flatpickr-hour{font-weight:bold}.flatpickr-time input.flatpickr-minute,.flatpickr-time input.flatpickr-second{font-weight:400}.flatpickr-time input:focus{outline:0;border:0}.flatpickr-time .flatpickr-time-separator,.flatpickr-time .flatpickr-am-pm{height:inherit;float:left;line-height:inherit;color:#393939;font-weight:bold;width:2%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400}.flatpickr-time input:hover,.flatpickr-time .flatpickr-am-pm:hover,.flatpickr-time input:focus,.flatpickr-time .flatpickr-am-pm:focus{background:#eee}.flatpickr-input[readonly]{cursor:pointer}@-webkit-keyframes fpFadeInDown{from{opacity:0;-webkit-transform:translate3d(0, -20px, 0);transform:translate3d(0, -20px, 0)}to{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}@keyframes fpFadeInDown{from{opacity:0;-webkit-transform:translate3d(0, -20px, 0);transform:translate3d(0, -20px, 0)}to{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}.flatpickr-calendar{font-size:0.875rem;line-height:1.125rem;font-weight:var(--cat-font-weight-body, 400);box-shadow:0 4px 6px -2px rgba(27, 31, 38, 0.03), 0 12px 16px -4px rgba(27, 31, 38, 0.08);border-radius:var(--cat-border-radius-m, 0.25rem);border:1px solid rgb(var(--cat-border-color, 235, 236, 240));background:white;padding:1rem}.flatpickr-calendar:not(.inline).animate{transform:translateY(-1rem);opacity:0;transition:transform 125ms cubic-bezier(0.3, 0, 0.8, 0.15), opacity 125ms cubic-bezier(0.3, 0, 0.8, 0.15)}.flatpickr-calendar::before,.flatpickr-calendar::after{display:none}.flatpickr-calendar.inline,.flatpickr-calendar.open{display:flex;flex-direction:column;gap:1rem;width:auto !important}.flatpickr-calendar.inline{border:unset;padding:0}.flatpickr-calendar.open{z-index:calc(var(--cat-z-index, 1000) + 100);margin-top:0.75rem;margin-left:-0.75rem}.flatpickr-calendar.open.animate{opacity:1;transform:translateY(0);transition:transform 500ms cubic-bezier(0.05, 0.7, 0.1, 1), opacity 500ms cubic-bezier(0.05, 0.7, 0.1, 1)}.flatpickr-months{gap:0.25rem}.flatpickr-months .flatpickr-month{height:auto}.flatpickr-current-month{font-size:1.125rem;line-height:1.5rem;font-weight:var(--cat-font-weight-head, 600);font-feature-settings:\"pnum\";height:100%;padding:0;display:flex;position:static;width:auto;gap:0.25rem}.flatpickr-current-month .flatpickr-monthDropdown-months{padding:0 0.25rem;flex:1;margin:unset;font-weight:inherit;border-radius:var(--cat-border-radius-m, 0.25rem)}.flatpickr-current-month .flatpickr-monthDropdown-months:hover,.flatpickr-current-month .flatpickr-monthDropdown-months:focus-within{background-color:rgba(var(--cat-primary-bg, 0, 129, 148), 0.05)}.flatpickr-current-month input.cur-year{padding:0;font-weight:inherit;line-height:2.25rem}.flatpickr-current-month .numInputWrapper{width:7ch}.flatpickr-months .flatpickr-prev-month,.flatpickr-months .flatpickr-next-month{position:static;width:2.25rem;height:2.25rem;padding:0;align-items:center;display:flex;justify-content:center;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.flatpickr-months .flatpickr-prev-month:hover,.flatpickr-months .flatpickr-next-month:hover{color:rgb(var(--cat-font-color-base, 0, 0, 0))}.flatpickr-weekdays{height:2rem}.flatpickr-weekdays .flatpickr-weekday{color:rgb(var(--cat-font-color-muted, 81, 92, 108));font-size:0.75rem;line-height:1rem;font-weight:700}.flatpickr-weekwrapper .flatpickr-weekday{height:2rem}.flatpickr-weekwrapper .flatpickr-weeks{box-shadow:none;width:2rem;padding:0;margin-right:0.5rem;background:#f2f4f7;border-radius:var(--cat-border-radius-m, 0.25rem)}.flatpickr-weekwrapper span.flatpickr-day,.flatpickr-weekwrapper span.flatpickr-day:hover{font-size:0.75rem;line-height:1rem;font-weight:700;color:rgb(var(--cat-font-color-muted, 81, 92, 108));text-align:center;line-height:2.25rem}.flatpickr-days{width:15.75rem !important}.dayContainer{width:15.75rem;min-width:15.75rem;max-width:15.75rem}.flatpickr-day{color:rgb(var(--cat-font-color-base, 0, 0, 0));height:2.25rem;line-height:2.25rem;border:0;border-radius:var(--cat-border-radius-m, 0.25rem)}.flatpickr-day:hover{background-color:#f2f4f7;font-weight:700}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover{color:rgb(var(--cat-font-color-muted, 81, 92, 108));font-weight:inherit;background-color:inherit !important}.flatpickr-day.today{color:rgb(var(--cat-primary-text, 0, 129, 148));box-shadow:inset 0 0 0 2px rgb(var(--cat-primary-text, 0, 129, 148))}.flatpickr-day.today:hover,.flatpickr-day.today:focus{background-color:#f2f4f7;color:rgb(var(--cat-primary-text, 0, 129, 148))}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover,.flatpickr-day.prevMonthDay,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.notAllowed.nextMonthDay{color:rgba(var(--cat-font-color-muted, 81, 92, 108), 0.5)}.flatpickr-day.selected,.flatpickr-day.selected:hover,.flatpickr-day.selected:focus,.flatpickr-day.selected.inRange,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.startRange,.flatpickr-day.startRange:hover,.flatpickr-day.startRange:focus,.flatpickr-day.startRange.inRange,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.endRange,.flatpickr-day.endRange:hover,.flatpickr-day.endRange:focus,.flatpickr-day.endRange.inRange,.flatpickr-day.endRange.nextMonthDay,.flatpickr-day.endRange.prevMonthDay{font-weight:700;background-color:rgb(var(--cat-primary-bg, 0, 129, 148)) !important;color:rgb(var(--cat-primary-fill, 255, 255, 255)) !important}.flatpickr-day.inRange,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.today.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day:hover,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.nextMonthDay:hover,.flatpickr-day:focus,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.nextMonthDay:focus{background-color:rgba(var(--cat-primary-bg, 0, 129, 148), 0.1)}.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange,.flatpickr-day.endRange.startRange{border-top-left-radius:var(--cat-border-radius-m, 0.25rem);border-bottom-left-radius:var(--cat-border-radius-m, 0.25rem)}.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange,.flatpickr-day.endRange.endRange{border-top-right-radius:var(--cat-border-radius-m, 0.25rem);border-bottom-right-radius:var(--cat-border-radius-m, 0.25rem)}.numInputWrapper{padding:0 1rem 0 0.5rem;border-radius:var(--cat-border-radius-m, 0.25rem)}.numInputWrapper:hover,.numInputWrapper:focus-within{background-color:rgba(var(--cat-primary-bg, 0, 129, 148), 0.05)}.numInputWrapper span{border:none;background:transparent;width:1rem;padding:0;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.numInputWrapper span.arrowUp::after{content:\"↑\";align-items:flex-end}.numInputWrapper span.arrowDown::after{content:\"↓\";align-items:flex-start}.numInputWrapper span::after{font-size:0.75rem;line-height:1rem;font-weight:700;position:static;border:0 !important;font-size:10px;display:flex;height:100%;justify-content:center}.numInputWrapper span:hover{color:rgb(var(--cat-font-color-base, 0, 0, 0));background:transparent}.flatpickr-calendar.hasTime .flatpickr-time{border:1px solid rgb(var(--cat-border-color, 235, 236, 240));border-radius:var(--cat-border-radius-m, 0.25rem);min-width:12rem;height:auto}.flatpickr-calendar.hasTime .flatpickr-time .numInputWrapper{height:2rem;padding:0;margin:0.25rem;display:flex}.flatpickr-calendar.hasTime.noCalendar{padding:0}.flatpickr-calendar.hasTime.noCalendar .flatpickr-time{border:none}.flatpickr-time .flatpickr-time-separator,.flatpickr-time .flatpickr-am-pm{margin:0 0.25rem;font-size:1.125rem;line-height:1.5rem;font-weight:400;font-feature-settings:\"pnum\";color:rgb(var(--cat-font-color-base, 0, 0, 0));line-height:2.25rem}.flatpickr-time .flatpickr-am-pm{width:25%;padding:0 0.5rem}.flatpickr-time .flatpickr-am-pm:hover,.flatpickr-time .flatpickr-am-pm:focus{border-radius:var(--cat-border-radius-m, 0.25rem);background-color:rgba(var(--cat-primary-bg, 0, 129, 148), 0.05)}.flatpickr-time{max-height:unset}.flatpickr-time input{background:transparent !important;color:rgb(var(--cat-font-color-base, 0, 0, 0));font-size:0.9375rem;line-height:2.25rem;font-family:inherit}.flatpickr-time input.flatpickr-hour{font-weight:inherit}.flatpickr-day.inRange:not(.today),.flatpickr-day.week.selected{box-shadow:none}.flatpickr-day.inRange:nth-child(7n+1),.flatpickr-day.week.selected:nth-child(7n+1){border-top-left-radius:var(--cat-border-radius-m, 0.25rem);border-bottom-left-radius:var(--cat-border-radius-m, 0.25rem)}.flatpickr-day.inRange:nth-child(7n+7),.flatpickr-day.week.selected:nth-child(7n+7){border-top-right-radius:var(--cat-border-radius-m, 0.25rem);border-bottom-right-radius:var(--cat-border-radius-m, 0.25rem)}.flatpickr-day.selected.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.startRange.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.endRange.startRange+.endRange:not(:nth-child(7n+1)){box-shadow:none}.flatpickr-day.selected.startRange.endRange,.flatpickr-day.startRange.startRange.endRange,.flatpickr-day.endRange.startRange.endRange{border-radius:var(--cat-border-radius-m, 0.25rem)}:host{display:flex}:host([hidden]){display:none}cat-input{flex:1 1 auto;margin:0}";

const CatDatepickerFlat = /*@__PURE__*/ proxyCustomElement(class CatDatepickerFlat extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        this.catFocus = createEvent(this, "catFocus");
        this.catBlur = createEvent(this, "catBlur");
        this.hasSlottedLabel = false;
        this.hasSlottedHint = false;
        /**
         * Whether the label need a marker to shown if the input is required or optional.
         */
        this.requiredMarker = 'optional';
        /**
         * Whether the label is on top or left.
         */
        this.horizontal = false;
        /**
         * Hint for form autofill feature.
         */
        this.autoComplete = 'off';
        /**
         * Whether the input should show a clear button.
         */
        this.clearable = false;
        /**
         * Whether the input is disabled.
         */
        this.disabled = false;
        /**
         * Display the icon on the right.
         */
        this.iconRight = false;
        /**
         * The label for the input.
         */
        this.label = '';
        /**
         * Visually hide the label, but still show it to assistive technologies like screen readers.
         */
        this.labelHidden = false;
        /**
         * The mode of the datepicker, to select a date, time, both, a date range or a week number.
         */
        this.mode = 'date';
        /**
         * The value is not editable.
         */
        this.readonly = false;
        /**
         * A value is required or must be check for the form to be submittable.
         */
        this.required = false;
        /**
         * The step size to use when changing the time.
         */
        this.step = 5;
        /**
         * Instead of body, appends the calendar to the cat-datepicker element instead
         */
        this.attachToElement = false;
        /**
         * Fine-grained control over when the errors are shown. Can be `false` to
         * never show errors, `true` to show errors on blur, or a number to show
         * errors change with the given delay in milliseconds or immediately on blur.
         */
        this.errorUpdate = 0;
    }
    get input() {
        return this._input?.shadowRoot?.querySelector('input') ?? undefined;
    }
    onValueChanged(value) {
        if (value) {
            this.pickr?.setDate(value, false);
            if (this.mode !== 'daterange' || value.includes(' - ')) {
                this.catChange.emit(value);
            }
        }
        else {
            this.pickr?.clear(false);
            this.catChange.emit(undefined);
        }
    }
    onDisabledChanged() {
        // Dynamically changing config value is not working due to a bug in the
        // library. We thus need to fully recreate the date picker after the value
        // has been updated.
        this.pickr?.destroy();
        this.pickr = undefined;
        setTimeout(() => {
            this.input ? (this.input.disabled = this.disabled) : null;
            this.pickr = this.initDatepicker(this.input);
        });
    }
    componentDidLoad() {
        this.pickr = this.initDatepicker(this.input);
    }
    componentWillRender() {
        this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
        this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    }
    onMinChanged() {
        this.pickr?.set('minDate', this.min);
        this.pickr?.set('maxDate', this.max);
        if (this.value && !this.pickr?.selectedDates?.length) {
            // Dynamically changing 'minDate' or 'maxDate' does not emit a change if
            // the value is cleared due to an invalid date.
            this.pickr?.clear();
        }
    }
    /**
     * Programmatically move focus to the datepicker. Use this method instead of
     * `input.focus()`.
     *
     * @param options An optional object providing options to control aspects of
     * the focusing process.
     */
    async doFocus(options) {
        this._input?.doFocus(options);
    }
    /**
     * Programmatically remove focus from the datepicker. Use this method instead of
     * `input.blur()`.
     */
    async doBlur() {
        this._input?.doBlur();
    }
    render() {
        return [
            h("cat-input", { key: '472e33835c2ac42e3e648d7b4b80551bfad276bb', ref: el => (this._input = el), requiredMarker: this.requiredMarker, horizontal: this.horizontal, autoComplete: this.autoComplete, clearable: this.clearable, disabled: this.disabled, hint: this.hint, icon: this.icon, iconRight: this.iconRight, identifier: this.identifier, label: this.label, labelHidden: this.labelHidden, name: this.name, placeholder: this.placeholder, textPrefix: this.textPrefix, textSuffix: this.textSuffix, readonly: this.readonly, required: this.required, value: this.value, errors: this.errors, errorUpdate: this.errorUpdate, nativeAttributes: this.nativeAttributes, onCatChange: e => {
                    e.stopPropagation();
                    this.value = e.detail || undefined;
                }, onCatFocus: e => {
                    e.stopPropagation();
                    this.catFocus.emit(e.detail);
                }, onCatBlur: e => {
                    e.stopPropagation();
                    this.catBlur.emit(e.detail);
                } }, this.hasSlottedLabel && (h("span", { key: '9e883cc02c66b78e8be8221a5632f37b016df965', slot: "label" }, h("slot", { key: '892603e7cb7e645e92503a30f2eb89dc5b2be9bc', name: "label" }))), this.hasSlottedHint && (h("span", { key: 'b5f4e4fad0aca02ab0d9c1a94d4f5e7582634490', slot: "hint" }, h("slot", { key: '4d9184fd37321b6b7709a25a3cee17057b5cfcb7', name: "hint" })))),
            h("div", { key: '8eccd0924e6dfcd2fdf2d71feba880ca84d44e87', ref: el => (this._calendarWrapper = el), class: "datepicker-wrapper" })
        ];
    }
    initDatepicker(input) {
        if (!input) {
            return;
        }
        // avoid dropdown closing if datepicker is part of a dropdown
        const withinDropdown = !!findClosest('cat-dropdown', input);
        const nativePickerAttributes = withinDropdown ? { 'data-dropdown-no-close': '' } : {};
        return flatpickr(input, getConfig({
            locale: getLocale(catI18nRegistry.getLocale()),
            format: getFormat(catI18nRegistry.getLocale(), this.mode),
            mode: this.mode,
            min: this.min,
            max: this.max,
            step: this.step,
            disabled: this.disabled,
            readonly: this.readonly,
            appendTo: this.attachToElement ? this._calendarWrapper : undefined,
            nativePickerAttributes: { ...nativePickerAttributes, ...this.nativePickerAttributes },
            // flatpickr has open bug about incorrect positioning when appendTo is used,
            // we have to use custom logic to calculate position
            // https://github.com/flatpickr/flatpickr/issues/1619
            position: this.attachToElement
                ? (flatpickr, positionElement) => {
                    this.updatePosition(flatpickr, positionElement);
                }
                : this.position || undefined,
            onReady: (_dates, _dateStr, flatpickr) => {
                autoUpdate(input, flatpickr.calendarContainer, () => this.updatePosition(flatpickr, flatpickr._input));
            },
            applyChange: value => (this.value = value)
        }));
    }
    updatePosition(flatpickr, positionElement) {
        if (positionElement) {
            computePosition(positionElement, flatpickr.calendarContainer, {
                strategy: 'fixed',
                placement: this.position || 'bottom-start',
                middleware: [flip()]
            }).then(({ x, y, placement }) => {
                if (flatpickr.calendarContainer) {
                    flatpickr.calendarContainer.dataset.placement = placement;
                    Object.assign(flatpickr.calendarContainer.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                        position: 'fixed'
                    });
                }
            });
        }
    }
    get hostElement() { return this; }
    static get watchers() { return {
        "value": ["onValueChanged"],
        "disabled": ["onDisabledChanged"],
        "readonly": ["onDisabledChanged"],
        "mode": ["onDisabledChanged"],
        "min": ["onMinChanged"],
        "max": ["onMinChanged"]
    }; }
    static get style() { return catDatepickerCss; }
}, [1, "cat-datepicker", {
        "requiredMarker": [1, "required-marker"],
        "horizontal": [4],
        "autoComplete": [1, "auto-complete"],
        "clearable": [4],
        "disabled": [4],
        "hint": [1],
        "icon": [1],
        "iconRight": [4, "icon-right"],
        "identifier": [1],
        "label": [1],
        "labelHidden": [4, "label-hidden"],
        "max": [1],
        "min": [1],
        "mode": [1],
        "name": [1],
        "placeholder": [1],
        "textPrefix": [1, "text-prefix"],
        "textSuffix": [1, "text-suffix"],
        "readonly": [4],
        "required": [4],
        "step": [2],
        "attachToElement": [4, "attach-to-element"],
        "position": [1],
        "value": [1025],
        "errors": [4],
        "errorUpdate": [8, "error-update"],
        "nativeAttributes": [16],
        "nativePickerAttributes": [16],
        "hasSlottedLabel": [32],
        "hasSlottedHint": [32],
        "doFocus": [64],
        "doBlur": [64]
    }, undefined, {
        "value": ["onValueChanged"],
        "disabled": ["onDisabledChanged"],
        "readonly": ["onDisabledChanged"],
        "mode": ["onDisabledChanged"],
        "min": ["onMinChanged"],
        "max": ["onMinChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-datepicker", "cat-button", "cat-icon", "cat-input", "cat-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-datepicker":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatDatepickerFlat);
            }
            break;
        case "cat-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "cat-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "cat-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "cat-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const CatDatepicker = CatDatepickerFlat;
const defineCustomElement = defineCustomElement$1;

export { CatDatepicker, defineCustomElement };
//# sourceMappingURL=cat-datepicker.js.map

//# sourceMappingURL=cat-datepicker.js.map