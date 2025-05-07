/**
 * Copyright 2025 FreddyBono5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `portfolio-card`
 * 
 * @demo index.html
 * @element portfolio-card
 */
export class PortfolioCard extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "portfolio-card";
  }

  constructor() {
    super();
    this.description = "";
    this.image = "";
    this.link = "";
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
      description: { type: String },
      image: { type: String },
      link: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        background-color: lightblue;
        padding: var(--ddd-spacing-6);
        margin: var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-lg);
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      
      h3 span {
        font-size: var(--portfolio-screen-label-font-size, var(--ddd-font-size-s));
      }
      h3 {
        margin: var(--ddd-spacing-0);
      }
      a {
        color: var(--ddd-theme-default-beaverBlue);
        text-decoration: none;
      }
      img {
        width: 800px;
        height: 400px;
        border-radius: var(--ddd-radius-sm);
        border: 4px solid var(--ddd-theme-primary);
        object-fit: cover;
      }

        .wrapper {
            padding: var(--ddd-spacing-19);
            display: flex;
            gap: var(--ddd-spacing-4);
            align-items: center;
            justify-content: center;
        }
        p {
            margin: var(--ddd-spacing-4);
        }



    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
        <img src="${this.image}">
        <div class="text">
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <a href="${this.link}" target="_blank">View Project</a>
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

globalThis.customElements.define(PortfolioCard.tag, PortfolioCard);