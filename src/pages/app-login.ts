import { LitElement, css, html } from 'lit';
import { property, customElement, } from 'lit/decorators.js';

@customElement('app-login')
export class AppLogin extends LitElement {
  @property({ type: String }) email = '';
  @property({ type: String }) password = '';

  static get styles() {
    return css`
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
      }

      input {
        margin-bottom: 10px;
        padding: 5px;
        border-radius: 5px;
        border: none;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
        width: 200px;
        font-size: 16px;
      }

      button {
        margin-top: 10px;
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        background-color: #007bff;
        color: white;
        font-size: 16px;
        cursor: pointer;
      }

      button:hover {
        background-color: #0069d9;
      }

      .error {
        color: red;
      }
    `;
  }

  async handleSubmit(event: Event) {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password
      })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      this.dispatchEvent(new CustomEvent('login-success'));
      window.location.href = 'about';
    } else {
      const error = await response.text();
      this.dispatchEvent(new CustomEvent('login-error', { detail: error }));
    }
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <label for="email">email:</label>
        <input
          type="text"
          id="email"
          .value=${this.email}
          @input=${(e: any) => (this.email = e.target.value)}
        />

        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          .value=${this.password}
          @input=${(e: any) => (this.password = e.target.value)}
        />

        <button type="submit">Login</button>

      </form>
    `;
  }

}
