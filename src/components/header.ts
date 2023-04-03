import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = 'PWA Starter';
  @property({ type: Boolean }) drawerOpen = false;
  @property({ type: Array }) conversations = [];

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

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      li {
        padding: 0.5em;
        cursor: pointer;
      }

      li:hover {
        background: var(--sl-color-neutral-100);
      }
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/conversations', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const conversations = await response.json();
      this.conversations = conversations.map(([id, title]:[Number,String]) => ({ id, title }));
    }
  }

  render() {
    return html`
      <header>
        <sl-button name="list" @click="${this.toggleDrawer}">></sl-button>
        <span>${this.title}</span>
      </header>
      <sl-drawer label="Conversations"  placement="start" ?open="${this.drawerOpen}">
        <ul>
          ${this.conversations.map(({ id, title }) => html`
            <li @click="${() => this.selectConversation(id)}">${title}</li>
          `)}
        </ul>
      </sl-drawer>
    `;
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  selectConversation(id:Number) {
    console.log(`Selected conversation ${id}`);
  }
}