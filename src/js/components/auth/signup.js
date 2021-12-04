import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { createUserAccount } from '../../database/auth';


function SignUp() {
  const [uid, setUid] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  function onSignUpSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={onSignUpSubmit}>
        <label for="uid-email">
          Email
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
        <label for="uid-pw">
          Confirm Password
          <input
            id="pw"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
      <Link to="/signup/login/">
        Existing User? Log in here.
      </Link>
    </div>
    /**
     * To add;
     * Password strengths
     */
  )
}


export default SignUp
