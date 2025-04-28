/**
 * Copyright 2025 FreddyBono5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `portfolio-bar`
 * 
 * @demo index.html
 * @element portfolio-bar
 */
export class PortfolioBar extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "portfolio-bar";
  }

  constructor() {
    super();
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
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: lightblue;
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        width: 300px;
        height: 100vh;
        overflow-x: hidden;
        display: block;
        text-align: center;
        border-right: 10px solid black;
      }
      
      .links{
        margin: auto;
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
    <div class="links">
        <slot></slot>
    </div>
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

globalThis.customElements.define(PortfolioBar.tag, PortfolioBar);