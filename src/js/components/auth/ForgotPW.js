import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { issuePwReset } from '../../database/auth';


const ResultMessage = styled.p`
  display: ${props => props.visible ? "initial" : "none"};
`

const successMessageBody = `Success! If the email you entered is found on our record,
you should see an email from us shortly.`


function ForgotPW() {

  const submitButton = useRef(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  
  function submitEmailRequest(e) {
    e.preventDefault();

    submitButton.current.disabled = true;

    submitButton.current.textContent = "Sending...";


    issuePwReset(email)
    .then(() => {
      // don't do anything with the success.
    })
    .catch((error) => {
      // don't do anything with the error.
    })
    .finally(() => {
      submitButton.current.textContent = "Sent!";
      setEmailSent(true);
    })
  }


  return (
    <section>
      <h1>
        Reset Your Password
      </h1>
      <p>Not a problem. Simply enter your email here to get a link to 
        reset your password.
      </p>
      <form onSubmit={submitEmailRequest}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email Address"
          value={email}
          required/>
        <button ref={submitButton}>Reset Password</button>
      </form>
      <ResultMessage visible={emailSent}>
        {successMessageBody}
      </ResultMessage>
      <Link to={"/login"}>Return to Login</Link>
    </section>
  )
}

export default ForgotPW
