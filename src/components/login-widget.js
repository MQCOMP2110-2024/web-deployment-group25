import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser, storeUser, deleteUser } from '../auth.js';
import { BASE_URL } from '../config.js';

/**
 * LoginWidget <login-widget>
 * Present a login form and handle user authentication, if a user
 * is logged in, display their name and a logout button
 */
class LoginWidget extends LitElement {
  static properties = {
    _loginUrl: { type: String, state: true },
    _user: { type: String, state: true },
    _errorMessage: { type: String, state: true },
  };


  static styles = css`
    :host {
      display: grid;
      font-family: Arial, sans-serif;
      max-width: 100%;
      margin: auto;
      padding: 5px;      
      border-radius: 5px;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.05);
            
  }
  
  form {
      display: grid;
      gap: 5px;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      align-items: center;
  }
  
  .input-group input {
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
  }
  
  input[type="submit"] {
      padding: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
  }
  
  input[type="submit"]:hover {
      background-color: #0056b3;
  }
  
  p {
      color: red;
      margin-bottom: 10px;
      grid-column: 1 / span 5; /* Span all 5 columns */
  }
  
  button {
    padding: 10px;
    background-color: #007bff;;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}`;

  constructor() {
    super();
    this._loginUrl = `${BASE_URL}users/login`;
    console.log(this._loginUrl); // Add by RAHMAN: 06/04
    const user = getUser();
    if (user) {
      this._user = user;
    }
  }

  _submitForm(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch(this._loginUrl, {
      method: 'post',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    }).then((result) => result.json()).then((response) => {
      if (response.error) {
        this._errorMessage = response.error;
      } else {
        this._user = response;
        storeUser(response);
        localStorage.setItem('userLoggedIn', 'true'); // Store login status in localStorage
      }
    });
  }

  _logout() {
    deleteUser();
    const logoutEvent = new CustomEvent('logout');
    window.dispatchEvent(logoutEvent);
    localStorage.setItem('userLoggedIn', 'false'); // Store login status in localStorage
    this._user = null;
  }

  render() {
    if (this._user) {
      return html`
      <p>Logged in as ${this._user.name}<img src="./login_img.png" alt="icon" style="width: 40px; height: 40px; margin-left: 5px; border-radius: 50%;"></p>
              <button @click=${this._logout}>Logout</button>`;
    }
    return html`
      <p>${this._errorMessage}</p>
      <form @submit=${this._submitForm}>
          Username: <input name="username">
          Password: <input type="password" name="password">
          <input type='submit' value='Login'>
      </form>`;
  }
}

customElements.define('login-widget', LoginWidget);
