import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { signInUser } from '../../database/auth'
import { UserContext } from '../Router';

// auth data
import { authStateObserver } from '../../database/auth'
import { set } from 'lodash';

function Login({ setUserInfo }) {

  const [uid, setUid] = useState("test@test.com");
  const [pw, setPw] = useState("abc123!");

  function onSignInSubmit(e) {
    e.preventDefault();
    signInUser(uid, pw).then((result) => {
      console.log(result);
    })
  }


  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={onSignInSubmit}>
        <label htmlFor="uid-email">
          Login
          <input
            type="email"
            id="uid-email"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
        </label>
        <label htmlFor="uid-pw">
          Password
          <input
            id="pw"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
      <Link to="/signup/">Create a New Account</Link>
      <button>Sign in with Google</button>
      <button>View Demo Mode</button>
    </div>
    /**
     * To add;
     * Form which lets sign up / login
     * with email / password
     * or google account.
     * 
     * Error if credentials are invalid.
     */
  )
}

export default Login
