var e=typeof globalThis!=="undefined"?globalThis:typeof window!=="undefined"?window:typeof global!=="undefined"?global:typeof self!=="undefined"?self:{};function n(e,n,o){return o={path:n,exports:{},require:function(e,n){return t()}},e(o,o.exports),o.exports}function t(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var o=n((function(n){(function(e,t){if(n.exports){n.exports=t()}else{e.log=t()}})(e,(function(){var e=function(){};var n="undefined";var t=typeof window!==n&&typeof window.navigator!==n&&/Trident\/|MSIE /.test(window.navigator.userAgent);var o=["trace","debug","info","warn","error"];function i(e,n){var t=e[n];if(typeof t.bind==="function"){return t.bind(e)}else{try{return Function.prototype.bind.call(t,e)}catch(n){return function(){return Function.prototype.apply.apply(t,[e,arguments])}}}}function s(){if(console.log){if(console.log.apply){console.log.apply(console,arguments)}else{Function.prototype.apply.apply(console.log,[console,arguments])}}if(console.trace)console.trace()}function r(o){if(o==="debug"){o="log"}if(typeof console===n){return false}else if(o==="trace"&&t){return s}else if(console[o]!==undefined){return i(console,o)}else if(console.log!==undefined){return i(console,"log")}else{return e}}function a(n,t){for(var i=0;i<o.length;i++){var s=o[i];this[s]=i<n?e:this.methodFactory(s,n,t)}this.log=this.debug}function l(e,t,o){return function(){if(typeof console!==n){a.call(this,t,o);this[e].apply(this,arguments)}}}function c(e,n,t){return r(e)||l.apply(this,arguments)}function d(e,t,i){var s=this;var r;t=t==null?"WARN":t;var l="loglevel";if(typeof e==="string"){l+=":"+e}else if(typeof e==="symbol"){l=undefined}function d(e){var t=(o[e]||"silent").toUpperCase();if(typeof window===n||!l)return;try{window.localStorage[l]=t;return}catch(e){}try{window.document.cookie=encodeURIComponent(l)+"="+t+";"}catch(e){}}function u(){var e;if(typeof window===n||!l)return;try{e=window.localStorage[l]}catch(e){}if(typeof e===n){try{var t=window.document.cookie;var o=t.indexOf(encodeURIComponent(l)+"=");if(o!==-1){e=/^([^;]+)/.exec(t.slice(o))[1]}}catch(e){}}if(s.levels[e]===undefined){e=undefined}return e}function w(){if(typeof window===n||!l)return;try{window.localStorage.removeItem(l);return}catch(e){}try{window.document.cookie=encodeURIComponent(l)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch(e){}}s.name=e;s.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5};s.methodFactory=i||c;s.getLevel=function(){return r};s.setLevel=function(t,o){if(typeof t==="string"&&s.levels[t.toUpperCase()]!==undefined){t=s.levels[t.toUpperCase()]}if(typeof t==="number"&&t>=0&&t<=s.levels.SILENT){r=t;if(o!==false){d(t)}a.call(s,t,e);if(typeof console===n&&t<s.levels.SILENT){return"No console available for logging"}}else{throw"log.setLevel() called with invalid level: "+t}};s.setDefaultLevel=function(e){t=e;if(!u()){s.setLevel(e,false)}};s.resetLevel=function(){s.setLevel(t,false);w()};s.enableAll=function(e){s.setLevel(s.levels.TRACE,e)};s.disableAll=function(e){s.setLevel(s.levels.SILENT,e)};var f=u();if(f==null){f=t}s.setLevel(f,false)}var u=new d;var w={};u.getLogger=function e(n){if(typeof n!=="symbol"&&typeof n!=="string"||n===""){throw new TypeError("You must supply a name when creating a logger.")}var t=w[n];if(!t){t=w[n]=new d(n,u.getLevel(),u.methodFactory)}return t};var f=typeof window!==n?window.log:undefined;u.noConflict=function(){if(typeof window!==n&&window.log===u){window.log=f}return u};u.getLoggers=function e(){return w};u["default"]=u;return u}))}));class i{constructor(){this.id=(Math.random()+1).toString(36).substring(2);this.i18n=new Map;window.addEventListener("cat-i18n-set",(e=>{const{detail:n}=e||{};if(n&&n.id!==this.id){this.set(n.i18n,true)}}));window.addEventListener("cat-i18n-clear",(e=>{const{detail:n}=e||{};if(n&&n.id!==this.id){this.clear(true)}}))}static getInstance(){if(!i.instance){i.instance=new i}return i.instance}getLocale(){return this._locale??window?.navigator?.language??"en"}setLocale(e){try{this._locale=Intl.getCanonicalLocales(e)[0];o.info(`[CatI18nRegistry] Set locale: ${this._locale}`)}catch(n){o.error(`[CatI18nRegistry] Invalid locale: ${e}`)}}set(e,n=false){const t=Object.entries(e);t.forEach((([e,n])=>this.i18n.set(e,n)));o.info(`[CatI18nRegistry] Registered ${t.length!==1?"messages":"message"}`);!n&&window.dispatchEvent(this.buildEvent("cat-i18n-set",{i18n:e,id:this.id}))}clear(e=false){this.i18n.clear();o.info(`[CatI18nRegistry] Cleared messages`);!e&&window.dispatchEvent(this.buildEvent("cat-i18n-clear"))}t(e,n){const t=this.i18n.get(e);if(t===undefined){o.error(`[CatI18nRegistry] Unknown message key: ${e}`);return e}return t.replace(/{{\s*([-a-zA-Z._]+)\s*}}/g,((e,t)=>`${n?.[t]??""}`))}buildEvent(e,n){return new CustomEvent(e,{bubbles:true,composed:true,detail:n})}}const s=i.getInstance();const r=`<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4.53 3.47a.75.75 0 0 0-1.06 1.06L6.94 8l-3.47 3.47a.75.75 0 1 0 1.06 1.06L8 9.06l3.47 3.47a.75.75 0 1 0 1.06-1.06L9.06 8l3.47-3.47a.75.75 0 0 0-1.06-1.06L8 6.94 4.53 3.47Z"/></svg>`;const a=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.25-8a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V8Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z"/></svg>\n`;const l=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm4.768-12.36a1 1 0 1 0-1.536-1.28l-4.3 5.159-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067l5-6Z"/></svg>`;const c=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.47 9.47a.75.75 0 0 1 1.06 0L12 13.94l4.47-4.47a.75.75 0 1 1 1.06 1.06l-5 5a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06Z"/></svg>`;const d=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 6.47a.75.75 0 0 1 0 1.06L10.06 12l4.47 4.47a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 0 1 1.06 0Z"/></svg>`;const u=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06L13.94 12 9.47 7.53a.75.75 0 0 1 0-1.06Z"/></svg>`;const w=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm1-15a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 1 0 0-2h-4V7Z"/></svg>`;const f=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM8.293 8.293a1 1 0 0 1 1.414 0L12 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12 8.293 9.707a1 1 0 0 1 0-1.414Z"/></svg>`;const v=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.47 8.47a.75.75 0 0 1 1.06 0L12 10.94l2.47-2.47a.75.75 0 1 1 1.06 1.06L13.06 12l2.47 2.47a.75.75 0 1 1-1.06 1.06L12 13.06l-2.47 2.47a.75.75 0 0 1-1.06-1.06L10.94 12 8.47 9.53a.75.75 0 0 1 0-1.06Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0Z"/></svg>`;const g=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.53 6.47a.75.75 0 0 0-1.06 1.06L10.94 12l-4.47 4.47a.75.75 0 1 0 1.06 1.06L12 13.06l4.47 4.47a.75.75 0 1 0 1.06-1.06L13.06 12l4.47-4.47a.75.75 0 0 0-1.06-1.06L12 10.94 7.53 6.47Z"/></svg>`;const h=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.25c-.429 0-.85.113-1.22.328a2.5 2.5 0 0 0-.899.891L2.577 16.981a2.554 2.554 0 0 0-.007 2.491c.212.381.519.7.891.926a2.44 2.44 0 0 0 1.234.352h14.61a2.44 2.44 0 0 0 1.233-.352 2.5 2.5 0 0 0 .892-.926 2.553 2.553 0 0 0-.007-2.491L14.119 4.469a2.494 2.494 0 0 0-.899-.891A2.439 2.439 0 0 0 12 3.25ZM12 8a1 1 0 0 1 1 1v3.5a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Zm1 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>`;const p=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-7.82-3.001L12 5 9.82 8.999l-4.477.838 3.129 3.31-.587 4.516L12 15.71l4.114 1.953-.586-4.517 3.13-3.31L14.18 9Z"/></svg>`;class y{constructor(){this.id=(Math.random()+1).toString(36).substring(2);this.icons=new Map;this.addIcons({"alert-danger":f,"alert-primary":p,"alert-secondary":w,"alert-success":l,"alert-warning":h,"dialog-close":g,"input-close":v,"input-error":a,"notification-close":v,"pagination-left":d,"pagination-right":u,"select-clear":r,"select-open":c},"$cat",true);window.addEventListener("cat-icons-added",(e=>{const{detail:n}=e||{};if(n&&n.id!==this.id){this.addIcons(n.icons,n.setName,true)}}));window.addEventListener("cat-icons-removed",(e=>{const{detail:n}=e||{};if(n&&n.id!==this.id){this.removeIcons(n.names,n.setName,true)}}))}static getInstance(){if(!y.instance){y.instance=new y}return y.instance}getIcon(e,n){const t=this.icons.get(this.buildName(e,n));if(!t){o.error(`[CatIconRegistry] Unknown icon${n?` in set ${n}`:""}: ${e}`)}return t}addIcons(e,n,t=false){const i=Object.entries(e);const s=i.length;i.forEach((([e,t])=>this.icons.set(this.buildName(e,n),t)));o.info(`[CatIconRegistry] Added ${s!==1?"icons":"icon"}${n?` to set ${n}`:""}`);!t&&window.dispatchEvent(this.buildEvent("cat-icons-added",{id:this.id,icons:e,setName:n}));return this}removeIcons(e,n,t=false){const i=e.length;e.forEach((e=>this.icons.delete(this.buildName(e,n))));o.info(`[CatIconRegistry] Removed ${i!==1?"icons":"icon"}${n?` from set ${n}`:""}`);!t&&window.dispatchEvent(this.buildEvent("cat-icons-removed",{id:this.id,names:e,setName:n}));return this}buildName(e,n){return n?`${n}:${e}`:e}buildEvent(e,n){return new CustomEvent(e,{bubbles:true,composed:true,detail:n})}}const m=y.getInstance();export{i as C,e as a,s as b,n as c,m as d,y as e,o as l};
//# sourceMappingURL=p-d7dc291a.js.map