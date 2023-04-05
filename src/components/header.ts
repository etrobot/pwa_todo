import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = 'PWA Starter';
  static get styles() {
    return css`
      header {
        display: flex;
        align-items: center;
        background: var(--app-color-primary);
        height: 4em;
        position: fixed;
        left: env(titlebar-area-x, 0);
        top: env(titlebar-area-y, 0);
      }
    `
  }

  render() {
    return html`
      <header>
        <span>${this.title}</span>
      </header>
    `;
  }

}