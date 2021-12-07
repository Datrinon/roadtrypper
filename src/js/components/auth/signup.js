import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { createUserAccount } from '../../database/auth';
import PWRequirements from './PWrequirements';
import COMPONENT_STATE from '../ComponentState';


function SignUp() {
  const [pageState, setPageState] = useState(COMPONENT_STATE.READY);
  const [uid, setUid] = useState("guest-account@gmail.com");
  const [pw, setPw] = useState("Test12345!!");
  const [showPWRequirements, setShowPWRequirements] = useState(false);
  const [confirmPw, setConfirmPw] = useState("Test12345!!");
  const [reqsMet, setReqsMet] = useState(false);
  const [error, setError] = useState("");

  function onSignUpSubmit(e) {
    e.preventDefault();

    if (confirmPw !== pw) {
      setError("Passwords do not match.");
    }

    createUserAccount(uid, pw);
    setPageState(COMPONENT_STATE.LOADING);
  }

  function handlePwChange(e) {
    setPw(e.target.value);

    setReqsMet(false);
  }

  if (pageState === COMPONENT_STATE.LOADING) {
    return (
      <p>Sign-up successful. Logging you in...</p>
    )
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
