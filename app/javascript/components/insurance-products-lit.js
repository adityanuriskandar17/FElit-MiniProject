import { LitElement, html, css } from 'lit';

class InsuranceProductsLit extends LitElement {
  static properties = {
    products: { type: Array },
    error: { type: String },
    loading: { type: Boolean },
    debugInfo: { type: String }
  };

  constructor() {
    super();
    this.products = [];
    this.error = '';
    this.loading = true;
    this.debugInfo = '';
  }

  static styles = css`
    .error { color: red; }
    .debug { color: blue; font-family: monospace; white-space: pre-wrap; }
    .product-list { list-style-type: none; padding: 0; }
    .product-item { 
      border: 1px solid #ddd; 
      margin-bottom: 10px; 
      padding: 10px; 
      border-radius: 4px;
    }
    .loading { font-style: italic; color: #666; }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.fetchProducts();
  }

  render() {
    return html`
      <h2>Insurance Products</h2>
      ${this.loading 
        ? html`<p class="loading">Loading products...</p>`
        : this.renderProducts()}
      ${this.error ? html`<p class="error">Error: ${this.error}</p>` : ''}
      ${this.debugInfo ? html`<pre class="debug">${this.debugInfo}</pre>` : ''}
    `;
  }

  renderProducts() {
    if (this.products.length === 0) {
      return html`<p>No insurance products found.</p>`;
    }
    return html`
      <ul class="product-list">
        ${this.products.map(product => html`
          <li class="product-item">
            <h3>${product.name}</h3>
            <p>ID: ${product.id}</p>
          </li>
        `)}
      </ul>
    `;
  }

  async fetchProducts() {
    try {
      const response = await fetch('http://localhost:3000/api/v1/insurance_products');
      this.debugInfo = `Response status: ${response.status}\n`;
      this.debugInfo += `Response headers: ${JSON.stringify(Object.fromEntries(response.headers), null, 2)}\n`;
      
      if (response.ok) {
        const data = await response.json();
        this.debugInfo += `Response data: ${JSON.stringify(data, null, 2)}\n`;
        
        if (Array.isArray(data)) {
          this.products = data;
        } else {
          this.error = 'Received data is not an array';
          this.products = [];
        }
        
        if (this.products.length === 0) {
          this.debugInfo += "\nNo products in the response.";
        }
      } else {
        this.error = `Failed to fetch insurance products. Status: ${response.status}`;
        const text = await response.text();
        this.debugInfo += `Response body: ${text}`;
      }
    } catch (error) {
      this.error = `Error: ${error.message}`;
      this.debugInfo += `Fetch error: ${error.stack}`;
    } finally {
      this.loading = false;
    }
  }
}

customElements.define('insurance-products-lit', InsuranceProductsLit);