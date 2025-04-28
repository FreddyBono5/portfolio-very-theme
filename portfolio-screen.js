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
        height: 100vh;
        display: block;
        background-color: lightblue;
      }
      h1 {
        text-align: right;
        padding-right: 50px;
      }
      .wrapper {
        padding: 40px;
      }
      .bar-text{
        color: white;
      }
      .bar{
        border: solid 1px darkblue;
        height: 100px;
        width: 1300px;
        background-color: darkblue;
      }
      h3 span {
        font-size: var(--portfolio-screen-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <h1>${this.title}</h1>
<div class="wrapper">
    <slot></slot>
</div>
  <!-- <h3><span>${this.t.title}:</span> ${this.title}</h3>
  <slot></slot>
  -->
</div>`;
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.dispatchEvent(
      new CustomEvent("page-added", {
        bubbles: true,
        composed: true,
        detail: {
          value: this
        }
      })
    );
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