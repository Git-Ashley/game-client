// This script must be loaded because browsers only understand custom elements
// defined as ES6 classes. But Babel gets rid of ES6 classes after transpilation,
// resulting in errors. So the following script fixes that. It must also be
// placed in a script tag else the custom element gets defined and used
// before the script finishes.
const js = `(function () {'use strict';
(()=>{'use strict';if(!window.customElements)return;const a=window.HTMLElement,b=window.customElements.define,c=window.customElements.get,d=new Map,e=new Map;let f=!1,g=!1;window.HTMLElement=function(){if(!f){const a=d.get(this.constructor),b=c.call(window.customElements,a);g=!0;const e=new b;return e}f=!1;},window.HTMLElement.prototype=a.prototype;Object.defineProperty(window,'customElements',{value:window.customElements,configurable:!0,writable:!0}),Object.defineProperty(window.customElements,'define',{value:(c,h)=>{const i=h.prototype,j=class extends a{constructor(){super(),Object.setPrototypeOf(this,i),g||(f=!0,h.call(this)),g=!1;}},k=j.prototype;j.observedAttributes=h.observedAttributes,k.connectedCallback=i.connectedCallback,k.disconnectedCallback=i.disconnectedCallback,k.attributeChangedCallback=i.attributeChangedCallback,k.adoptedCallback=i.adoptedCallback,d.set(h,c),e.set(c,h),b.call(window.customElements,c,j);},configurable:!0,writable:!0}),Object.defineProperty(window.customElements,'get',{value:(a)=>e.get(a),configurable:!0,writable:!0});})();
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/}());`;

const blob = new Blob([js], {type : 'text/javascript'});
const jsUrl = URL.createObjectURL(blob);

const scriptEle = document.createElement("script");
scriptEle.src = jsUrl;
scriptEle.onload = scriptEle.onreadystatechange = function(){
    scriptEle.onreadystatechange = scriptEle.onload = null;
    customElements.define('test-game', require('./TestGame'));
}
const head = document.getElementsByTagName("head")[0];
(head || document.body).appendChild(scriptEle);
