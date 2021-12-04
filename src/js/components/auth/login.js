import React, { useState } from 'react'

function Login() {

  const [uid, setUid] = useState("");
  const [pw, setPw] = useState("");

  function onSignInSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={onSignInSubmit}>
        <label for="uid-email">
          Login
          <input
            type="email"
            id="uid-email"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
        </label>
        <label for="uid-pw">
          Password
          <input
            id="pw"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </label>
      </form>
      <button>Create a New Account</button>
      <button>Sign in with Google</button>
      <button>View Demo Mode</button>
    </div>
    /**
     * To add;
     * Form which lets sign up / login
     * with email / password
     * or google account.
     */
  )
}

export default Login
