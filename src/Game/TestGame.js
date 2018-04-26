// Can't use es6 modules in this file... it causes errors with registering the custom element
const {default:content} = require('./content');

module.exports = class TestGame extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    const canvasEle = document.createElement('canvas');
    this.root.appendChild(canvasEle);
    content(canvasEle);
  }

  disconnectedCallback() {
    //clean up
  }

}
