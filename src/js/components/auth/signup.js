import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { createUserAccount, issueEmailVerification } from '../../database/auth';
import PWRequirements from './PWrequirements';
import { UserContext } from '../Router';


import * as authStyle from "./styled/auth.style";

const COMPONENT_STATE = {
  ready: "ready",
  verification_sent: "verify"
}

function SignUp() {

  const [pageState, setPageState] = useState(COMPONENT_STATE.ready);
  const [uid, setUid] = useState("guest-account@gmail.com");
  const [pw, setPw] = useState("Test12345!!");
  const [showPWRequirements, setShowPWRequirements] = useState(false);
  const [confirmPw, setConfirmPw] = useState("Test12345!!");
  const [reqsMet, setReqsMet] = useState(false);
  const [error, setError] = useState("");

  async function onSignUpSubmit(e) {
    e.preventDefault();

    if (confirmPw !== pw) {
      setError("Passwords do not match.");
    }

    await createUserAccount(uid, pw);

    await issueEmailVerification();

    setPageState(COMPONENT_STATE.verification_sent);
  }

  function handlePwChange(e) {
    setPw(e.target.value);

    setReqsMet(false);
  }

  function onResend(e) {
    e.target.disabled = true;
    e.target.textContent = "Verification Sent.";

    issueEmailVerification();
  }

  if (pageState === COMPONENT_STATE.verification_sent) {
    return (
      <>
        <h1>
          Please Verify Account
        </h1>
        <p>
          Your account has been registered. An email has been sent to
          confirm your registration. Please check your email in the next few moments.
        </p>
        <p>
          Didn't see the verification email? Try checking your spam folder. If
          nothing is there, please click below to resend a verification email.
        </p>
        <button onClick={onResend}>Resend verification</button>
      </>
    )
  }

  return (
    <>
      <authStyle.AuthFormContainer>
        <authStyle.Header>Sign Up</authStyle.Header>
        <authStyle.Form onSubmit={onSignUpSubmit}>
          <authStyle.Label htmlFor="uid-email">
            Email
          </authStyle.Label>
          <authStyle.Input
            type="email"
            id="uid-email"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            required
          />
          <div>
            <authStyle.Label htmlFor="uid-pw">
              Password
            </authStyle.Label>
            <authStyle.Input
              id="uid-pw"
              type="password"
              value={pw}
              onChange={handlePwChange}
              onFocus={(e) => setShowPWRequirements(true)}
              onBlur={(e) => setShowPWRequirements(false)}
            />
            <PWRequirements password={pw} setReqsMet={setReqsMet} />
          </div>
          <authStyle.Label htmlFor="uid-confirm-pw">
            Confirm Password
          </authStyle.Label>
          <authStyle.Input
            id="uid-confirm-pw"
            type="password"
            value={confirmPw}
            onChange={(e) => setPw(e.target.value)}
          />
          <div className="error-field">
            {error}
          </div>
          <authStyle.FormSubmitButton disabled={!reqsMet}>Submit</authStyle.FormSubmitButton>
        </authStyle.Form>
        <authStyle.FormLink>
          <Link to="/login/">
            Existing User? Log in here.
          </Link>
        </authStyle.FormLink>
      </authStyle.AuthFormContainer>
    </>
  )
}


export default SignUp
