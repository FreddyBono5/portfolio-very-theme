/**
 * Copyright 2025 FreddyBono5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `portfolio-screen`
 * 
 * @demo index.html
 * @element portfolio-screen
 */
export class PortfolioScreen extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "portfolio-screen";
  }

  constructor() {
    super();
    this.pageNumber = null;
    this.pageName = "";
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      pageName: { type: String },
      pageNumber: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        background-color: lightblue;
        padding: var(--ddd-spacing-5);
        overflow: hidden;
      }
     :host(.about){
      background-color: lightblue;
      height: 100vh;
     }
     :host(.resume){
      background-color: cadetblue;
      height: 100vh;
     }
     :host(.projects){
      background-color: lightblue;
      height: 100vh;
     }
     :host(.interests){
      background-color: cadetblue;
      height: 100vh;
     }
     :host(.contact){
      height: 100vh;    
    }
     

      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        padding-top: var(--ddd-spacing-2);
      }
      h3 span {
        font-size: var(--portfolio-screen-label-font-size, var(--ddd-font-size-s));
      }



    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3>${this.title}</h3>
    <slot></slot>
</div>
  <!-- <h3><span>${this.t.title}:</span> ${this.title}</h3>
  <slot></slot>
  -->
</div>`;
  }





  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(PortfolioScreen.tag, PortfolioScreen);