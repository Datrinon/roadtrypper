import React, { useState, useEffect } from 'react'
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
  const [uid, setUid] = useState("");
  const [pw, setPw] = useState("");
  const [showPWRequirements, setShowPWRequirements] = useState(false);
  const [confirmPw, setConfirmPw] = useState("");
  const [reqsMet, setReqsMet] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [error, setError] = useState("");

  async function onSignUpSubmit(e) {
    e.preventDefault();

    if (confirmPw !== pw) {
      setError("Passwords do not match.");
      return;
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

  useEffect(() => {
    if(uid.length 
    && pw.length 
    && confirmPw.length) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [uid, pw, confirmPw]);

  if (pageState === COMPONENT_STATE.verification_sent) {
    return (
      <authStyle.AuthFormContainer>
        <authStyle.Header>
          Please Verify Account
        </authStyle.Header>
        <authStyle.FormText>
          Your account has been registered. An email has been sent to
          confirm your registration. Please check your email in the next few moments.
        </authStyle.FormText>
        <br/>
        <authStyle.FormText>
          No verification email? Click below to resend a verification email.
        </authStyle.FormText>
        <authStyle.FormSubmitButton onClick={onResend}>Resend verification</authStyle.FormSubmitButton>
      </authStyle.AuthFormContainer>
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
            placeholder="Email Address"
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
              placeholder="Password"
              onChange={handlePwChange}
              onFocus={(e) => setShowPWRequirements(true)}
              onBlur={(e) => setShowPWRequirements(false)}
              required
            />
            <PWRequirements password={pw} setReqsMet={setReqsMet} />
          </div>
          <authStyle.Label htmlFor="uid-confirm-pw">
            Confirm Password
          </authStyle.Label>
          <authStyle.Input
            id="uid-confirm-pw"
            type="password"
            placeholder="Confirm Password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            required
          />
          <authStyle.FormTextError className="error-field">
            {error}
          </authStyle.FormTextError>
          <authStyle.FormSubmitButton
          disabled={!reqsMet || !allFieldsFilled}>Submit
          </authStyle.FormSubmitButton>
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
