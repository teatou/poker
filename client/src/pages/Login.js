import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import emailjs from '@emailjs/browser';


export default function Login() {
  let params = {
    userEmail: undefined,
    authCode: undefined
  };
  const form = useRef();
  const [loginStage, setStage] = useState(true);

  const changeStage = () => {
    setStage(current => !current);
    console.log("enter code")
  };

  const navigate = useNavigate();

  const sendEmail = async (e) => {
      e.preventDefault();

      params = {
        userEmail: document.getElementById("userEmail").value,
        authCode: Math.floor(Math.random() * 9999) + 1000,
      }

      emailjs.send(
          "service_2vmqd4q",
          "template_0ma691a",
          params,
          "vtwF01Po4B8KT12-p",
      )
      .then(
          () => {
          console.log("code sent");
          changeStage()
          },
          (error) => {
          console.log(error.text);
          }
      );
  };

  const sendCode = (e) => {
    let userCode = document.getElementById("userCode").value
    console.log(userCode, typeof(userCode), params.authCode)
    if (userCode === toString(params.authCode)) {
      navigate("/poker")
    } else {
      alert("Wrong code")
    }
  };

  return (
    <>
      <div className="login_container" style={{visibility: loginStage ? 'visible' : 'hidden'}}>
        <h1>Sign up</h1>
        <form ref={form} onSubmit={sendEmail} autoComplete="on">
          <div className="email_container">
            <h2>Email</h2>
            <input
            id="userEmail"
            type="email"
            name="email"
            placeholder="example@email.com"
            required/>
          </div>
          <div className="continue_btn">
            <input
            type="submit"
            value="Confirm email"
            id="submit-email"
            />
          </div>
          <div className="guest">
            <span>Continue as a guest</span>
          </div>
          <div className="foot">
            <p>By continuing, you agree to our Terms and</p>
            <p>Privacy Policy</p>
          </div>
        </form> 
      </div>
      <div className="login_container" onSubmit={sendCode} style={{visibility: loginStage ? 'hidden' : 'visible'}}>
        <h1>Sign up</h1>
        <form ref={form} autoComplete="on">
          <div className="email_container">
            <h2>Code</h2>
            <input
            id="userCode"
            type="text"
            name="code"
            placeholder="Enter your code"
            required/>
          </div>
          <div className="continue_btn">
            <input
            type="submit"
            value="Continue"
            id="submit-email"
            />
          </div>
          <div className="guest">
            <span>We've sent you code via email</span>
          </div>
          <div className="foot">
            <p>By continuing, you agree to our Terms and</p>
            <p>Privacy Policy</p>
          </div>
        </form> 
      </div>
    </>
  )
}
