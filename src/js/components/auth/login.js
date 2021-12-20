import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { issueEmailVerification, signInUser, useGoogleSignIn, useGuestMode } from '../../database/auth'
import { UserContext } from '../Router';

import * as authStyle from './styled/auth.style';

import Road from "../../../data/road.jpg";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FAIcon } from '../styled/template.style';



function Login({ setUserInfo }) {

  const [uid, setUid] = useState("test@test.com");
  const [pw, setPw] = useState("abc123!");
  const [errorMsg, setErrorMsg] = useState("");

  const userInfo = useContext(UserContext);

  function determineErrorMsg(firebaseError) {
    if (firebaseError.includes("wrong-password")) {
      setErrorMsg("No account with that email and password combination was found.")
    } else if (firebaseError.includes("internal-error")) {
      setErrorMsg("Please enter in a password.")
    } else if (firebaseError.includes("too-many-requests")) {
      setErrorMsg("Too many invalid password attempts; account temporarily locked. Please try again later.")
    } else {
      setErrorMsg("Login failed.");
    }
  }

  function onSignInSubmit(e) {
    e.preventDefault();
    signInUser(uid, pw).then((result) => {
      document.querySelector(".verification-email-send").classList.add("no-display");
      if (!userInfo.verified) {
        setErrorMsg("Please verify your email before signing in.");
        document.querySelector(".verification-email-send").classList.remove("no-display");
      } else {
        setErrorMsg("");
      }
      console.log(result);
    }).catch((error) => {
      console.warn("There was a sign-in error...:");
      console.warn(error);
      determineErrorMsg(error.message);
    })
  }



  return (
    <>
      <authStyle.Background bg={Road}>
      </authStyle.Background>
      <authStyle.AuthFormContainer>
        <authStyle.Header>Log in to RoadTrypper</authStyle.Header>
        <authStyle.Form onSubmit={onSignInSubmit}>
          <authStyle.Label htmlFor="uid-email">
            Email
          </authStyle.Label>
          <authStyle.Input
            type="email"
            id="uid-email"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
          <authStyle.Label htmlFor="uid-pw">
            Password
          </authStyle.Label>
          <authStyle.Input
            id="pw"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <authStyle.FormSubmitButton type="submit">Login</authStyle.FormSubmitButton>
          <p className="error-container">{errorMsg}</p>
        </authStyle.Form>
        <button
          onClick={issueEmailVerification}
          className={"verification-email-send no-display"}>
          Resend Verification Email
        </button>
        <authStyle.FormLink>
          <Link to="/forgot_password">Forgot password?</Link>
        </authStyle.FormLink>
        <authStyle.FormDivider>
          <authStyle.FormDividerBreak/>
          <authStyle.FormDividerLabel>Not a member?</authStyle.FormDividerLabel>
        </authStyle.FormDivider>
        <authStyle.FormLink>
          <Link to="/signup/">Sign up here.</Link>
        </authStyle.FormLink>
        <authStyle.Button
         hue={203}
         sat={89}
         lig={61}
         color={"rgb(255,255,255)"}
         onClick={useGoogleSignIn}>
          <FAIcon icon={faGoogle}/>
          Sign in with Google
        </authStyle.Button>
        <authStyle.Button onClick={useGuestMode}>Continue As Guest</authStyle.Button>
      </authStyle.AuthFormContainer>
    </>
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
