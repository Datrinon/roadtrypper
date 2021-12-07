import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { signInUser } from '../../database/auth'
import { UserContext } from '../Router';

// auth data
import { authStateObserver } from '../../database/auth'

function Login({ setUserInfo }) {

  const [user, setUser] = useState(undefined);
  const [uid, setUid] = useState("test@test.com");
  const [pw, setPw] = useState("abc123!");

  function onSignInSubmit(e) {
    e.preventDefault();
    signInUser(uid, pw).then((result) => {
      console.log(result);
    })
  }

  useEffect(() => {

    // this is our callback to execute when authentication state changes.
    const manageUserState = (user) => {
      if (user) {
        console.log(user);
        setUserInfo(user);
      } else {
        // signed out, 
        // do not allow access to app
        setUserInfo(null);
      }
    };

    // this method watches the authentication state of the application.
    // it returns a cleanup function, so, we invoke that in 
    // the return of this hook.
    const unsubscribe = authStateObserver(manageUserState);

    return () => {
      unsubscribe();
    }
  }, []);

  if (user === undefined) {
    return <div></div>
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
