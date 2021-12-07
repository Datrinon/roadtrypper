import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { createUserAccount } from '../../database/auth';
import PWRequirements from './PWrequirements';


function SignUp() {
  const [uid, setUid] = useState("guest-account@gmail.com");
  const [pw, setPw] = useState("Test12345!!");
  const [showPWRequirements, setShowPWRequirements] = useState(false);
  const [confirmPw, setConfirmPw] = useState("");
  const [reqsMet, setReqsMet] = useState(false);
  const [error, setError] = useState("");

  function onSignUpSubmit(e) {
    e.preventDefault();

    if (confirmPw !== pw) {
      setError("Passwords do not match.");
    }
  }

  function handlePwChange(e) {
    setPw(e.target.value);

    setReqsMet(false);
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={onSignUpSubmit}>
        <label htmlFor="uid-email">
          Email
          <input
            type="email"
            id="uid-email"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
        </label>
        <div>
          <label htmlFor="uid-pw">
            Password
            <input
              id="uid-pw"
              type="password"
              value={pw}
              onChange={handlePwChange}
              onFocus={(e) => setShowPWRequirements(true)}
              onBlur={(e) => setShowPWRequirements(false)}
            />
          </label>
          <PWRequirements password={pw} setReqsMet={setReqsMet} />
        </div>
        <label htmlFor="uid-confirm-pw">
          Confirm Password
          <input
            id="uid-confirm-pw"
            type="password"
            value={confirmPw}
            onChange={(e) => setPw(e.target.value)}
          />
        <div className="error-field">
          {error}
        </div>
        </label>
        <button disabled={!reqsMet}>Submit</button>
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
