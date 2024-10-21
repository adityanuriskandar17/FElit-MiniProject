// app/javascript/components/login-lit.js
import { LitElement, html, css } from 'lit';

class LoginLit extends LitElement {
  static properties = {
    email: { type: String },
    password: { type: String },
    error: { type: String }
  };

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.error = '';
  }

  static styles = css`
    .error { color: red; }
    form { display: flex; flex-direction: column; width: 200px; }
    input { margin-bottom: 10px; padding: 5px; }
    button { padding: 5px; }
  `;

  render() {
    return html`
      <form @submit=${this.login}>
        <input type="email" placeholder="Email" .value=${this.email} @input=${(e) => this.email = e.target.value} required>
        <input type="password" placeholder="Password" .value=${this.password} @input=${(e) => this.password = e.target.value} required>
        <button type="submit">Login</button>
      </form>
      ${this.error ? html`<p class="error">${this.error}</p>` : ''}
    `;
  }

  async login(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email: this.email, password: this.password } })
    });

    if (response.ok) {
      const data = await response.json();
      // Simpan JWT token atau lakukan redirect
      console.log('Login successful:', data);
    } else {
      this.error = 'Login failed. Please check your credentials.';
    }
  }
}

customElements.define('login-lit', LoginLit);
