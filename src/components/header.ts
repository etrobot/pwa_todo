import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = 'PWA Starter';
  @property({ type: Boolean }) drawerOpen = false;

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
        height: env(titlebar-area-height, 50px);
        width: env(titlebar-area-width, 100%);
        -webkit-app-region: drag;
      }

    `;
  }

  render() {
    return html`
      <header>
        <sl-icon-button name="list" @click="${this.toggleDrawer}">></sl-icon-button>
        <span>${this.title}</span>
      </header>
      <sl-drawer label="Conversations"  placement="start" ?open="${this.drawerOpen}">
      This drawer slides in from the start.
      </sl-drawer>
    `;
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }
}