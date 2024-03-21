var t=typeof globalThis!=="undefined"?globalThis:typeof window!=="undefined"?window:typeof global!=="undefined"?global:typeof self!=="undefined"?self:{};var n={exports:{}};(function(n){(function(t,e){if(n.exports){n.exports=e()}else{t.log=e()}})(t,(function(){var t=function(){};var n="undefined";var e=typeof window!==n&&typeof window.navigator!==n&&/Trident\/|MSIE /.test(window.navigator.userAgent);var r=["trace","debug","info","warn","error"];var i={};var o=null;function s(t,n){var e=t[n];if(typeof e.bind==="function"){return e.bind(t)}else{try{return Function.prototype.bind.call(e,t)}catch(n){return function(){return Function.prototype.apply.apply(e,[t,arguments])}}}}function l(){if(console.log){if(console.log.apply){console.log.apply(console,arguments)}else{Function.prototype.apply.apply(console.log,[console,arguments])}}if(console.trace)console.trace()}function c(r){if(r==="debug"){r="log"}if(typeof console===n){return false}else if(r==="trace"&&e){return l}else if(console[r]!==undefined){return s(console,r)}else if(console.log!==undefined){return s(console,"log")}else{return t}}function u(){var e=this.getLevel();for(var i=0;i<r.length;i++){var o=r[i];this[o]=i<e?t:this.methodFactory(o,e,this.name)}this.log=this.debug;if(typeof console===n&&e<this.levels.SILENT){return"No console available for logging"}}function a(t){return function(){if(typeof console!==n){u.call(this);this[t].apply(this,arguments)}}}function f(t,n,e){return c(t)||a.apply(this,arguments)}function d(t,e){var s=this;var l;var c;var a;var d="loglevel";if(typeof t==="string"){d+=":"+t}else if(typeof t==="symbol"){d=undefined}function h(t){var e=(r[t]||"silent").toUpperCase();if(typeof window===n||!d)return;try{window.localStorage[d]=e;return}catch(t){}try{window.document.cookie=encodeURIComponent(d)+"="+e+";"}catch(t){}}function w(){var t;if(typeof window===n||!d)return;try{t=window.localStorage[d]}catch(t){}if(typeof t===n){try{var e=window.document.cookie;var r=encodeURIComponent(d);var i=e.indexOf(r+"=");if(i!==-1){t=/^([^;]+)/.exec(e.slice(i+r.length+1))[1]}}catch(t){}}if(s.levels[t]===undefined){t=undefined}return t}function v(){if(typeof window===n||!d)return;try{window.localStorage.removeItem(d)}catch(t){}try{window.document.cookie=encodeURIComponent(d)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch(t){}}function p(t){var n=t;if(typeof n==="string"&&s.levels[n.toUpperCase()]!==undefined){n=s.levels[n.toUpperCase()]}if(typeof n==="number"&&n>=0&&n<=s.levels.SILENT){return n}else{throw new TypeError("log.setLevel() called with invalid level: "+t)}}s.name=t;s.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5};s.methodFactory=e||f;s.getLevel=function(){if(a!=null){return a}else if(c!=null){return c}else{return l}};s.setLevel=function(t,n){a=p(t);if(n!==false){h(a)}return u.call(s)};s.setDefaultLevel=function(t){c=p(t);if(!w()){s.setLevel(t,false)}};s.resetLevel=function(){a=null;v();u.call(s)};s.enableAll=function(t){s.setLevel(s.levels.TRACE,t)};s.disableAll=function(t){s.setLevel(s.levels.SILENT,t)};s.rebuild=function(){if(o!==s){l=p(o.getLevel())}u.call(s);if(o===s){for(var t in i){i[t].rebuild()}}};l=p(o?o.getLevel():"WARN");var g=w();if(g!=null){a=p(g)}u.call(s)}o=new d;o.getLogger=function t(n){if(typeof n!=="symbol"&&typeof n!=="string"||n===""){throw new TypeError("You must supply a name when creating a logger.")}var e=i[n];if(!e){e=i[n]=new d(n,o.methodFactory)}return e};var h=typeof window!==n?window.log:undefined;o.noConflict=function(){if(typeof window!==n&&window.log===o){window.log=h}return o};o.getLoggers=function t(){return i};o["default"]=o;return o}))})(n);const e=n.exports;class r{constructor(){this.id=(Math.random()+1).toString(36).substring(2);this.i18n=new Map;window.addEventListener("cat-i18n-setLocale",(t=>{const{detail:n}=t||{};if(n&&n.id!==this.id){this.setLocale(n.locale,true)}}));window.addEventListener("cat-i18n-set",(t=>{const{detail:n}=t||{};if(n&&n.id!==this.id){this.set(n.i18n,true)}}));window.addEventListener("cat-i18n-clear",(t=>{const{detail:n}=t||{};if(n&&n.id!==this.id){this.clear(true)}}))}static getInstance(){if(!r.instance){r.instance=new r}return r.instance}getLocale(){return this._locale??window?.navigator?.language??"en"}setLocale(t,n=false){try{this._locale=Intl.getCanonicalLocales(t)[0];e.info(`[CatI18nRegistry::${this.id}] Set locale: ${this._locale}`);!n&&window.dispatchEvent(this.buildEvent("cat-i18n-setLocale",{locale:t,id:this.id}))}catch(n){e.error(`[CatI18nRegistry::${this.id}] Invalid locale: ${t}`)}}set(t,n=false){if(typeof t==="function"){this._translator=t;e.info(`[CatI18nRegistry::${this.id}] Registered translator`)}else{const n=Object.entries(t);n.forEach((([t,n])=>this.i18n.set(t,n)));e.info(`[CatI18nRegistry::${this.id}] Registered ${n.length!==1?"messages":"message"}`)}!n&&window.dispatchEvent(this.buildEvent("cat-i18n-set",{i18n:t,id:this.id}))}clear(t=false){this.i18n.clear();e.info(`[CatI18nRegistry::${this.id}] Cleared messages`);!t&&window.dispatchEvent(this.buildEvent("cat-i18n-clear"))}t(t,n){const r=this._translator?.(t,n)??this.i18n.get(t)?.replace(/{{\s*([-a-zA-Z._]+)\s*}}/g,((t,e)=>`${n?.[e]??""}`));if(r===undefined){e.error(`[CatI18nRegistry::${this.id}] Unknown message key: ${t}`);return t}return r}buildEvent(t,n){return new CustomEvent(t,{bubbles:true,composed:true,detail:n})}}const i=r.getInstance();const o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M7.53 4.53a.75.75 0 0 0-1.06-1.06l-4 4a.75.75 0 0 0 0 1.06l4 4a.75.75 0 0 0 1.06-1.06L4.06 8l3.47-3.47Z"/><path d="M12.53 4.53a.75.75 0 0 0-1.06-1.06l-4 4a.75.75 0 0 0 0 1.06l4 4a.75.75 0 1 0 1.06-1.06L9.06 8l3.47-3.47Z"/></svg>`;const s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.53 3.47a.75.75 0 0 0-1.06 1.06L6.94 8l-3.47 3.47a.75.75 0 1 0 1.06 1.06l4-4a.75.75 0 0 0 0-1.06l-4-4Z"/><path d="M9.53 3.47a.75.75 0 0 0-1.06 1.06L11.94 8l-3.47 3.47a.75.75 0 1 0 1.06 1.06l4-4a.75.75 0 0 0 0-1.06l-4-4Z"/></svg>`;const l=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.53 3.47a.75.75 0 0 1 0 1.06L7.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd"/></svg>`;const c=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.47 3.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06-1.06L8.94 8 5.47 4.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>`;const u=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.53 3.47a.75.75 0 0 0-1.06 1.06L6.94 8l-3.47 3.47a.75.75 0 1 0 1.06 1.06L8 9.06l3.47 3.47a.75.75 0 1 0 1.06-1.06L9.06 8l3.47-3.47a.75.75 0 0 0-1.06-1.06L8 6.94 4.53 3.47Z"/></svg>`;const a=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.25-8a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V8Z"/><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z" clip-rule="evenodd"/></svg>`;const f=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M17 2.25a.75.75 0 0 1 .75.75v.25H18A2.75 2.75 0 0 1 20.75 6v12A2.75 2.75 0 0 1 18 20.75H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25h.25V3a.75.75 0 0 1 1.5 0v.25h8.5V3a.75.75 0 0 1 .75-.75ZM6 4.75c-.69 0-1.25.56-1.25 1.25v2.25h14.5V6c0-.69-.56-1.25-1.25-1.25H6Zm-1.25 5V18c0 .69.56 1.25 1.25 1.25h12c.69 0 1.25-.56 1.25-1.25V9.75H4.75Z" clip-rule="evenodd"/></svg>`;const d=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm4.768-12.36a1 1 0 1 0-1.536-1.28l-4.3 5.159-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067l5-6Z" clip-rule="evenodd"/></svg>`;const h=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M6.47 9.47a.75.75 0 0 1 1.06 0L12 13.94l4.47-4.47a.75.75 0 1 1 1.06 1.06l-5 5a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>`;const w=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M14.53 6.47a.75.75 0 0 1 0 1.06L10.06 12l4.47 4.47a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd"/></svg>`;const v=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06L13.94 12 9.47 7.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>`;const p=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm1-15a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 1 0 0-2h-4V7Z" clip-rule="evenodd"/></svg>`;const g=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.75 7a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h5a.75.75 0 0 0 0-1.5h-4.25V7Z"/><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0Z" clip-rule="evenodd"/></svg>`;const y=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM8.293 8.293a1 1 0 0 1 1.414 0L12 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12 8.293 9.707a1 1 0 0 1 0-1.414Z" clip-rule="evenodd"/></svg>`;const m=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.47 8.47a.75.75 0 0 1 1.06 0L12 10.94l2.47-2.47a.75.75 0 1 1 1.06 1.06L13.06 12l2.47 2.47a.75.75 0 1 1-1.06 1.06L12 13.06l-2.47 2.47a.75.75 0 0 1-1.06-1.06L10.94 12 8.47 9.53a.75.75 0 0 1 0-1.06Z"/><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0Z" clip-rule="evenodd"/></svg>`;const b=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.53 6.47a.75.75 0 0 0-1.06 1.06L10.94 12l-4.47 4.47a.75.75 0 1 0 1.06 1.06L12 13.06l4.47 4.47a.75.75 0 1 0 1.06-1.06L13.06 12l4.47-4.47a.75.75 0 0 0-1.06-1.06L12 10.94 7.53 6.47Z"/></svg>`;const x=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 3.25c-.429 0-.85.113-1.22.328a2.5 2.5 0 0 0-.899.891L2.577 16.981a2.554 2.554 0 0 0-.007 2.491c.212.381.519.7.891.926a2.44 2.44 0 0 0 1.234.352h14.61a2.44 2.44 0 0 0 1.233-.352 2.5 2.5 0 0 0 .892-.926 2.553 2.553 0 0 0-.007-2.491L14.119 4.469a2.494 2.494 0 0 0-.899-.891A2.439 2.439 0 0 0 12 3.25ZM12 8a1 1 0 0 1 1 1v3.5a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Zm1 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd"/></svg>`;const Z=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4.608 7.948a.75.75 0 1 0-1.234.853 12.396 12.396 0 0 0 2.255 2.438l-2.574 2.574a.75.75 0 0 0 1.061 1.06l2.738-2.737c1.283.824 2.777 1.433 4.396 1.58V17a.75.75 0 0 0 1.5 0v-3.284c1.618-.148 3.11-.76 4.392-1.584l2.742 2.742a.75.75 0 0 0 1.06-1.06l-2.579-2.58a12.5 12.5 0 0 0 2.251-2.432.75.75 0 0 0-1.232-.855C17.965 9.99 15.144 12.25 12 12.25c-3.153 0-5.978-2.255-7.392-4.302Z"/></svg>`;const M=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM9.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12 4.25c-2.735 0-5.158 1.37-6.872 2.948-.862.794-1.567 1.66-2.062 2.475-.479.79-.816 1.62-.816 2.327 0 .707.337 1.538.816 2.327.495.815 1.2 1.68 2.062 2.475C6.842 18.38 9.265 19.75 12 19.75c2.737 0 5.16-1.379 6.873-2.96.861-.795 1.566-1.662 2.06-2.475.479-.786.817-1.614.817-2.315 0-.7-.338-1.529-.817-2.315-.494-.813-1.199-1.68-2.06-2.475C17.16 5.629 14.737 4.25 12 4.25ZM3.75 12c0-.293.167-.837.598-1.548.416-.685 1.03-1.444 1.796-2.15C7.688 6.88 9.764 5.75 12 5.75c2.234 0 4.31 1.136 5.855 2.562.767.708 1.38 1.468 1.797 2.153.433.71.598 1.25.598 1.535 0 .285-.165.824-.598 1.535-.416.685-1.03 1.445-1.797 2.153-1.544 1.426-3.621 2.562-5.855 2.562-2.235 0-4.312-1.13-5.856-2.552-.767-.706-1.38-1.465-1.796-2.15-.431-.71-.598-1.255-.598-1.548Z" clip-rule="evenodd"/></svg>`;const S=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM13 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 3.5a1 1 0 1 0-2 0V16a1 1 0 1 0 2 0v-4.5Z" clip-rule="evenodd"/></svg>`;const L=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-7.82-3.001L12 5 9.82 8.999l-4.477.838 3.129 3.31-.587 4.516L12 15.71l4.114 1.953-.586-4.517 3.13-3.31L14.18 9Z" clip-rule="evenodd"/></svg>`;class E{constructor(){this.id=(Math.random()+1).toString(36).substring(2);this.icons=new Map;this.addIcons({"alert-primary":L,"alert-secondary":p,"alert-info":S,"alert-success":d,"alert-warning":x,"alert-danger":y,"datepicker-month-prev":l,"datepicker-month-next":c,"datepicker-year-prev":o,"datepicker-year-next":s,"datepicker-calendar":f,"timepicker-clock":g,"dialog-close":b,"input-close":m,"input-error":a,"input-password-show":M,"input-password-hide":Z,"notification-close":m,"pagination-left":w,"pagination-right":v,"select-clear":u,"select-open":h},"$cat",true);window.addEventListener("cat-icons-added",(t=>{const{detail:n}=t||{};if(n&&n.id!==this.id){this.addIcons(n.icons,n.setName,true)}}));window.addEventListener("cat-icons-removed",(t=>{const{detail:n}=t||{};if(n&&n.id!==this.id){this.removeIcons(n.names,n.setName,true)}}))}static getInstance(){if(!E.instance){E.instance=new E}return E.instance}getIcon(t,n){const r=this.icons.get(this.buildName(t,n));if(!r){e.error(`[CatIconRegistry::${this.id}] Unknown icon${n?` in set ${n}`:""}: ${t}`)}return r}addIcons(t,n,r=false){const i=Object.entries(t);const o=i.length;i.forEach((([t,e])=>this.icons.set(this.buildName(t,n),e)));e.info(`[CatIconRegistry::${this.id}] Added ${o!==1?"icons":"icon"}${n?` to set ${n}`:""}`);!r&&window.dispatchEvent(this.buildEvent("cat-icons-added",{id:this.id,icons:t,setName:n}));return this}removeIcons(t,n,r=false){const i=t.length;t.forEach((t=>this.icons.delete(this.buildName(t,n))));e.info(`[CatIconRegistry::${this.id}] Removed ${i!==1?"icons":"icon"}${n?` from set ${n}`:""}`);!r&&window.dispatchEvent(this.buildEvent("cat-icons-removed",{id:this.id,names:t,setName:n}));return this}buildName(t,n){return n?`${n}:${t}`:t}buildEvent(t,n){return new CustomEvent(t,{bubbles:true,composed:true,detail:n})}}const $=E.getInstance();function I(t){return typeof t==="function"}function C(t){const n=t=>{Error.call(t);t.stack=(new Error).stack};const e=t(n);e.prototype=Object.create(Error.prototype);e.prototype.constructor=e;return e}const B=C((t=>function n(e){t(this);this.message=e?`${e.length} errors occurred during unsubscription:\n${e.map(((t,n)=>`${n+1}) ${t.toString()}`)).join("\n  ")}`:"";this.name="UnsubscriptionError";this.errors=e}));function R(t,n){if(t){const e=t.indexOf(n);0<=e&&t.splice(e,1)}}class T{constructor(t){this.initialTeardown=t;this.closed=false;this._parentage=null;this._finalizers=null}unsubscribe(){let t;if(!this.closed){this.closed=true;const{_parentage:n}=this;if(n){this._parentage=null;if(Array.isArray(n)){for(const t of n){t.remove(this)}}else{n.remove(this)}}const{initialTeardown:e}=this;if(I(e)){try{e()}catch(n){t=n instanceof B?n.errors:[n]}}const{_finalizers:r}=this;if(r){this._finalizers=null;for(const n of r){try{k(n)}catch(n){t=t!==null&&t!==void 0?t:[];if(n instanceof B){t=[...t,...n.errors]}else{t.push(n)}}}}if(t){throw new B(t)}}}add(t){var n;if(t&&t!==this){if(this.closed){k(t)}else{if(t instanceof T){if(t.closed||t._hasParent(this)){return}t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}}}_hasParent(t){const{_parentage:n}=this;return n===t||Array.isArray(n)&&n.includes(t)}_addParent(t){const{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t}_removeParent(t){const{_parentage:n}=this;if(n===t){this._parentage=null}else if(Array.isArray(n)){R(n,t)}}remove(t){const{_finalizers:n}=this;n&&R(n,t);if(t instanceof T){t._removeParent(this)}}}T.EMPTY=(()=>{const t=new T;t.closed=true;return t})();const A=T.EMPTY;function _(t){return t instanceof T||t&&"closed"in t&&I(t.remove)&&I(t.add)&&I(t.unsubscribe)}function k(t){if(I(t)){t()}else{t.unsubscribe()}}const O={onUnhandledError:null,onStoppedNotification:null,Promise:undefined,useDeprecatedSynchronousErrorHandling:false,useDeprecatedNextContext:false};const P={setTimeout(t,n,...e){const{delegate:r}=P;if(r===null||r===void 0?void 0:r.setTimeout){return r.setTimeout(t,n,...e)}return setTimeout(t,n,...e)},clearTimeout(t){const{delegate:n}=P;return((n===null||n===void 0?void 0:n.clearTimeout)||clearTimeout)(t)},delegate:undefined};function N(t){P.setTimeout((()=>{const{onUnhandledError:n}=O;if(n){n(t)}else{throw t}}))}function V(){}const U=(()=>H("C",undefined,undefined))();function j(t){return H("E",undefined,t)}function F(t){return H("N",t,undefined)}function H(t,n,e){return{kind:t,value:n,error:e}}let z=null;function D(t){if(O.useDeprecatedSynchronousErrorHandling){const n=!z;if(n){z={errorThrown:false,error:null}}t();if(n){const{errorThrown:t,error:n}=z;z=null;if(t){throw n}}}else{t()}}class Y extends T{constructor(t){super();this.isStopped=false;if(t){this.destination=t;if(_(t)){t.add(this)}}else{this.destination=tt}}static create(t,n,e){return new J(t,n,e)}next(t){if(this.isStopped){X(F(t),this)}else{this._next(t)}}error(t){if(this.isStopped){X(j(t),this)}else{this.isStopped=true;this._error(t)}}complete(){if(this.isStopped){X(U,this)}else{this.isStopped=true;this._complete()}}unsubscribe(){if(!this.closed){this.isStopped=true;super.unsubscribe();this.destination=null}}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}}const W=Function.prototype.bind;function q(t,n){return W.call(t,n)}class G{constructor(t){this.partialObserver=t}next(t){const{partialObserver:n}=this;if(n.next){try{n.next(t)}catch(t){K(t)}}}error(t){const{partialObserver:n}=this;if(n.error){try{n.error(t)}catch(t){K(t)}}else{K(t)}}complete(){const{partialObserver:t}=this;if(t.complete){try{t.complete()}catch(t){K(t)}}}}class J extends Y{constructor(t,n,e){super();let r;if(I(t)||!t){r={next:t!==null&&t!==void 0?t:undefined,error:n!==null&&n!==void 0?n:undefined,complete:e!==null&&e!==void 0?e:undefined}}else{let n;if(this&&O.useDeprecatedNextContext){n=Object.create(t);n.unsubscribe=()=>this.unsubscribe();r={next:t.next&&q(t.next,n),error:t.error&&q(t.error,n),complete:t.complete&&q(t.complete,n)}}else{r=t}}this.destination=new G(r)}}function K(t){{N(t)}}function Q(t){throw t}function X(t,n){const{onStoppedNotification:e}=O;e&&P.setTimeout((()=>e(t,n)))}const tt={closed:true,next:V,error:Q,complete:V};const nt=(()=>typeof Symbol==="function"&&Symbol.observable||"@@observable")();function et(t){return t}function rt(t){if(t.length===0){return et}if(t.length===1){return t[0]}return function n(e){return t.reduce(((t,n)=>n(t)),e)}}class it{constructor(t){if(t){this._subscribe=t}}lift(t){const n=new it;n.source=this;n.operator=t;return n}subscribe(t,n,e){const r=lt(t)?t:new J(t,n,e);D((()=>{const{operator:t,source:n}=this;r.add(t?t.call(r,n):n?this._subscribe(r):this._trySubscribe(r))}));return r}_trySubscribe(t){try{return this._subscribe(t)}catch(n){t.error(n)}}forEach(t,n){n=ot(n);return new n(((n,e)=>{const r=new J({next:n=>{try{t(n)}catch(t){e(t);r.unsubscribe()}},error:e,complete:n});this.subscribe(r)}))}_subscribe(t){var n;return(n=this.source)===null||n===void 0?void 0:n.subscribe(t)}[nt](){return this}pipe(...t){return rt(t)(this)}toPromise(t){t=ot(t);return new t(((t,n)=>{let e;this.subscribe((t=>e=t),(t=>n(t)),(()=>t(e)))}))}}it.create=t=>new it(t);function ot(t){var n;return(n=t!==null&&t!==void 0?t:O.Promise)!==null&&n!==void 0?n:Promise}function st(t){return t&&I(t.next)&&I(t.error)&&I(t.complete)}function lt(t){return t&&t instanceof Y||st(t)&&_(t)}function ct(t){return I(t===null||t===void 0?void 0:t.lift)}function ut(t){return n=>{if(ct(n)){return n.lift((function(n){try{return t(n,this)}catch(t){this.error(t)}}))}throw new TypeError("Unable to lift unknown Observable type")}}function at(t,n,e,r,i){return new ft(t,n,e,r,i)}class ft extends Y{constructor(t,n,e,r,i,o){super(t);this.onFinalize=i;this.shouldUnsubscribe=o;this._next=n?function(e){try{n(e)}catch(n){t.error(n)}}:super._next;this._error=r?function(n){try{r(n)}catch(n){t.error(n)}finally{this.unsubscribe()}}:super._error;this._complete=e?function(){try{e()}catch(n){t.error(n)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){const{closed:n}=this;super.unsubscribe();!n&&((t=this.onFinalize)===null||t===void 0?void 0:t.call(this))}}}function dt(t){return t&&I(t.schedule)}function ht(t){return t[t.length-1]}function wt(t){return dt(ht(t))?t.pop():undefined}function vt(t,n){return typeof ht(t)==="number"?t.pop():n}function pt(t,n,e,r){function i(t){return t instanceof e?t:new e((function(n){n(t)}))}return new(e||(e=Promise))((function(e,o){function s(t){try{c(r.next(t))}catch(t){o(t)}}function l(t){try{c(r["throw"](t))}catch(t){o(t)}}function c(t){t.done?e(t.value):i(t.value).then(s,l)}c((r=r.apply(t,n||[])).next())}))}function gt(t){var n=typeof Symbol==="function"&&Symbol.iterator,e=n&&t[n],r=0;if(e)return e.call(t);if(t&&typeof t.length==="number")return{next:function(){if(t&&r>=t.length)t=void 0;return{value:t&&t[r++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function yt(t){return this instanceof yt?(this.v=t,this):new yt(t)}function mt(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=e.apply(t,n||[]),i,o=[];return i={},s("next"),s("throw"),s("return"),i[Symbol.asyncIterator]=function(){return this},i;function s(t){if(r[t])i[t]=function(n){return new Promise((function(e,r){o.push([t,n,e,r])>1||l(t,n)}))}}function l(t,n){try{c(r[t](n))}catch(t){f(o[0][3],t)}}function c(t){t.value instanceof yt?Promise.resolve(t.value.v).then(u,a):f(o[0][2],t)}function u(t){l("next",t)}function a(t){l("throw",t)}function f(t,n){if(t(n),o.shift(),o.length)l(o[0][0],o[0][1])}}function bt(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t[Symbol.asyncIterator],e;return n?n.call(t):(t=typeof gt==="function"?gt(t):t[Symbol.iterator](),e={},r("next"),r("throw"),r("return"),e[Symbol.asyncIterator]=function(){return this},e);function r(n){e[n]=t[n]&&function(e){return new Promise((function(r,o){e=t[n](e),i(r,o,e.done,e.value)}))}}function i(t,n,e,r){Promise.resolve(r).then((function(n){t({value:n,done:e})}),n)}}typeof SuppressedError==="function"?SuppressedError:function(t,n,e){var r=new Error(e);return r.name="SuppressedError",r.error=t,r.suppressed=n,r};const xt=t=>t&&typeof t.length==="number"&&typeof t!=="function";function Zt(t){return I(t===null||t===void 0?void 0:t.then)}function Mt(t){return I(t[nt])}function St(t){return Symbol.asyncIterator&&I(t===null||t===void 0?void 0:t[Symbol.asyncIterator])}function Lt(t){return new TypeError(`You provided ${t!==null&&typeof t==="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function Et(){if(typeof Symbol!=="function"||!Symbol.iterator){return"@@iterator"}return Symbol.iterator}const $t=Et();function It(t){return I(t===null||t===void 0?void 0:t[$t])}function Ct(t){return mt(this,arguments,(function*n(){const e=t.getReader();try{while(true){const{value:t,done:n}=yield yt(e.read());if(n){return yield yt(void 0)}yield yield yt(t)}}finally{e.releaseLock()}}))}function Bt(t){return I(t===null||t===void 0?void 0:t.getReader)}function Rt(t){if(t instanceof it){return t}if(t!=null){if(Mt(t)){return Tt(t)}if(xt(t)){return At(t)}if(Zt(t)){return _t(t)}if(St(t)){return Ot(t)}if(It(t)){return kt(t)}if(Bt(t)){return Pt(t)}}throw Lt(t)}function Tt(t){return new it((n=>{const e=t[nt]();if(I(e.subscribe)){return e.subscribe(n)}throw new TypeError("Provided object does not correctly implement Symbol.observable")}))}function At(t){return new it((n=>{for(let e=0;e<t.length&&!n.closed;e++){n.next(t[e])}n.complete()}))}function _t(t){return new it((n=>{t.then((t=>{if(!n.closed){n.next(t);n.complete()}}),(t=>n.error(t))).then(null,N)}))}function kt(t){return new it((n=>{for(const e of t){n.next(e);if(n.closed){return}}n.complete()}))}function Ot(t){return new it((n=>{Nt(t,n).catch((t=>n.error(t)))}))}function Pt(t){return Ot(Ct(t))}function Nt(t,n){var e,r;var i,o;return pt(this,void 0,void 0,(function*(){try{for(e=bt(t);r=yield e.next(),!r.done;){const t=r.value;n.next(t);if(n.closed){return}}}catch(t){i={error:t}}finally{try{if(r&&!r.done&&(o=e.return))yield o.call(e)}finally{if(i)throw i.error}}n.complete()}))}function Vt(t,n,e,r=0,i=false){const o=n.schedule((function(){e();if(i){t.add(this.schedule(null,r))}else{this.unsubscribe()}}),r);t.add(o);if(!i){return o}}function Ut(t,n=0){return ut(((e,r)=>{e.subscribe(at(r,(e=>Vt(r,t,(()=>r.next(e)),n)),(()=>Vt(r,t,(()=>r.complete()),n)),(e=>Vt(r,t,(()=>r.error(e)),n))))}))}function jt(t,n=0){return ut(((e,r)=>{r.add(t.schedule((()=>e.subscribe(r)),n))}))}function Ft(t,n){return Rt(t).pipe(jt(n),Ut(n))}function Ht(t,n){return Rt(t).pipe(jt(n),Ut(n))}function zt(t,n){return new it((e=>{let r=0;return n.schedule((function(){if(r===t.length){e.complete()}else{e.next(t[r++]);if(!e.closed){this.schedule()}}}))}))}function Dt(t,n){return new it((e=>{let r;Vt(e,n,(()=>{r=t[$t]();Vt(e,n,(()=>{let t;let n;try{({value:t,done:n}=r.next())}catch(t){e.error(t);return}if(n){e.complete()}else{e.next(t)}}),0,true)}));return()=>I(r===null||r===void 0?void 0:r.return)&&r.return()}))}function Yt(t,n){if(!t){throw new Error("Iterable cannot be null")}return new it((e=>{Vt(e,n,(()=>{const r=t[Symbol.asyncIterator]();Vt(e,n,(()=>{r.next().then((t=>{if(t.done){e.complete()}else{e.next(t.value)}}))}),0,true)}))}))}function Wt(t,n){return Yt(Ct(t),n)}function qt(t,n){if(t!=null){if(Mt(t)){return Ft(t,n)}if(xt(t)){return zt(t,n)}if(Zt(t)){return Ht(t,n)}if(St(t)){return Yt(t,n)}if(It(t)){return Dt(t,n)}if(Bt(t)){return Wt(t,n)}}throw Lt(t)}function Gt(t,n){return n?qt(t,n):Rt(t)}function Jt(...t){const n=wt(t);return Gt(t,n)}export{r as C,A as E,it as O,T as S,i as a,E as b,t as c,$ as d,C as e,D as f,R as g,ut as h,at as i,Rt as j,Vt as k,I as l,et as m,Gt as n,Jt as o,wt as p,xt as q,dt as r,vt as s,V as t,e as u};
//# sourceMappingURL=p-81800b65.js.map