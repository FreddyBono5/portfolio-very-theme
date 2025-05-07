/**
 * Copyright 2025 FreddyBono5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/scroll-button/scroll-button.js";

/**
 * `portfolio-very-scroll`
 * 
 * @demo index.html
 * @element portfolio-very-scroll
 */
export class PortfolioVeryScroll extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "portfolio-very-scroll";
  }

  constructor() {
    super();
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
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        background-color: var(--ddd-theme-default-accent);
        padding: var(--ddd-spacing-5);
        overflow: hidden;
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--portfolio-screen-label-font-size, var(--ddd-font-size-s));
      }
      scroll-button{
        position: fixed;
        right: var(--ddd-spacing-5);
        bottom: var(--ddd-spacing-5);
      }



    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3>${this.title}</h3>
    <slot></slot>
    <scroll-button></scroll-button>
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

globalThis.customElements.define(PortfolioVeryScroll.tag, PortfolioVeryScroll);