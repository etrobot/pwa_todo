import { LitElement, css, html } from 'lit';
import { property, customElement, } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/input/input.js';


@customElement('app-login')
export class AppLogin extends LitElement {
  @property({ type: String }) username = '';
  @property({ type: String }) password = '';

  static get styles() {
    return css`
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
      }
      .error {
        color: red;
      }
    `;
  }

  async handleSubmit(event: Event) {
    event.preventDefault();

    const response = await fetch('http://192.168.1.4:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password
      })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);

      const createConversationResponse = await fetch('http://192.168.1.4:8080/api/create_conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify({
          // conversation data
        })
      });

      if (createConversationResponse.ok) {
        // redirect to home after successful conversation creation
        window.location.href = '/';
      } else {
        const error = await createConversationResponse.text();
        this.dispatchEvent(new CustomEvent('create-conversation-error', { detail: error }));
      }

    } else {
      const error = await response.text();
      this.dispatchEvent(new CustomEvent('login-error', { detail: error }));
    }
  }

  render() {
    return html`
      <form class="input-validation-required" @submit=${this.handleSubmit}>
      <br />
        <sl-input
          type="email"
          id="username"
          label="Username"
          .value=${this.username}
          @input=${(e: any) => (this.username = e.target.value)}
          placeholder="you@example.com"
          required
        ></sl-input>
        <br />
        <sl-input
        label="Password"
          type="password"
          id="password"
          placeholder="password"
          .value=${this.password}
          @input=${(e: any) => (this.password = e.target.value)}
          required
        ></sl-input>
        <br />
        <sl-button type="submit" variant="primary" pill>Login</sl-button>

      </form>
    `;
  }

}
