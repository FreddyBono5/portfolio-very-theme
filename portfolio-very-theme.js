/**
 * Copyright 2025 FreddyBono5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/scroll-button/scroll-button.js';
import './portfolio-bar.js';

/**
 * `portfolio-very-theme`
 * 
 * @demo index.html
 * @element portfolio-very-theme
 */
export class PortfolioVeryTheme extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "portfolio-very-theme";
  }

  constructor() {
    super();
    this.pages = [];
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/portfolio-very-theme.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      pages: { type: Array },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        height: 100vh;
        color: var(--ddd-theme-primary);
        background-color: lightblue;
        font-family: var(--ddd-font-navigation);
        
      }
      portfolio-bar{
        display: block;
        flex-wrap: wrap;
        width: 310px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        color: white;
      }
      .wrapper {
        margin-left: 310px;
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
        font-size: var(--portfolio-very-theme-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <portfolio-bar>
      <p>
        ${this.pages.map((page, index) => html` <p><a href="#${page.number}" @click="${this.linkChange}" data-index
        = "${index}">${page.title}</a></p>`)}
      </p>
    </portfolio-bar>
  <div class="wrapper" @page-added="${this.addPage}">
    <slot></slot>
</div>`;
  }

  linkChange(e) {
    let number = parseInt(e.target.getAttribute("data-index"));
    if (number >= 0) {
      this.pages[number].element.scrollIntoView();
    }
  }
  addPage(e){
    const element = e.detail.value
    const page = {
      number: element.pageNumber,
      title: element.title,
      element: element,
    }
    this.pages = [...this.pages, page];
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(PortfolioVeryTheme.tag, PortfolioVeryTheme);