/**
 * Copyright 2025 FreddyBono5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/scroll-button/scroll-button.js';
import './portfolio-bar.js';
import './portfolio-screeen.js';
import "@haxtheweb/scroll-button/scroll-button.js";


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
    this.pdf = this.addEventListener("screen-change", (e) => {
    let temp = this.screen + parseInt(e.detail.direction);
    if (temp > this.screens.legnth - 1) {
      temp = this.screens.length - 1;
    }
    if (temp < 0) {
      temp = 0;
    }
    this.screen = temp;
    });


    this.addEventListener("screen-ready", (e) => {
      this.screens = [...this.screens, e.detail.screen]
    });


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
      screen: { type: Number, reflect: true },
      screens: { type: Array },
      skipped: { type: Boolean, reflect: true },
      active: { type: Object },
      title: { type: String },
      pages: { type: Array },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        margin: var(--ddd-spacing-0);
        padding: var(--ddd-spacing-0);
        color: var(--ddd-theme-primary);
        background-color: lightblue;
        font-family: var(--ddd-font-navigation);
        
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
  <div class="wrapper">
      <ul>
        ${this.pages.map((page, index) => html` <li><a href="#${page.number}" @click="${this.linkChange}" data-index
        = "${index}">${page.title}</a></li>`)}
        </ul>
    <div class="wrapper" @page-added="${this.addPage}">
      <slot></slot>
      <scroll-button></scroll-button>
    </div>
  </div>`;
  }

  firstUpdated(changedProperties){
    if (super.firstUpdated){
      super.firstUpdated(changedProperties);
    }
    if (parseInt(globalThis.location.hash.replace("#", "")) >= 0)
    {
      this.screen = parseInt(globalThis.location.hash.replace("#", ""));
    }
  }

  updated(changedProperties) {
if (super.updated){
      super.updated(changedProperties);
    }
    if (this.shadowRoot && (changedProperties.has("screeens") || changedProperties.has("screeen")) && this.screens.length > 0)
    {
      globalThis.location.hash = this.screen;
      let active = this.screeens.find((screen) => screen.sid == this.screen);
      if (active) {
        this.screens.map((screen) => {
          if (screen.sid == this.screen) {
            screen.active = true;
          } else {
            screen.active = false;
          }
        });
        this.active = null;
        this.active = active;
        this.active.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
        if (this.screen !== 0)
        {
          this.skpIntro();
        }
      }
    }
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