// src/Auth/Auth.js

import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'apocalypse.auth0.com',
    clientID: 'I1g6XeK8iQ7TYizBkuTnctwsJyRI4sFQ',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://apocalypse.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}