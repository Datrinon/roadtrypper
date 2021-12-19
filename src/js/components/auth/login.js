import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { issueEmailVerification, signInUser, useGoogleSignIn } from '../../database/auth'
import { UserContext } from '../Router';


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
        <button type="submit">Login</button>
        <p className="error-container">{errorMsg}</p>
      </form>
      <button 
        onClick={issueEmailVerification}
        className={"verification-email-send no-display"}>
        Resend Verification Email
        </button>
      <button>Forgot Password?</button>
      <Link to="/signup/">Create a New Account</Link>
      <button onClick={useGoogleSignIn}>Sign in with Google</button>
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
