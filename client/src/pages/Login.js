import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import axios from '../api/axios';


export default function Login() {
  let params = {
    userEmail: undefined,
    authCode: undefined
  };
  const form = useRef();
  const [loginStage, setStage] = useState(true);
  const [statusMessage, setStatusMessage] = useState("We've sent you code via email");

  const changeStage = () => {
    setStage(current => !current);
  };

  const navigate = useNavigate();

  const login = async (e) => {
      e.preventDefault();

      let userEmail = document.getElementById("userEmail").value;
      
      await axios.post('/api/login', { Email: userEmail })
      .then(() => {
          changeStage()
          },
          (error) => {
          console.log(error.text);
          }
      );
  };

  const verifyCode = async (e) => {
    e.preventDefault();

    let userEmail = document.getElementById("userEmail").value;
    let userCode = document.getElementById("userCode").value;

    try {
      const response = await axios.post('/api/verifyCode', { Email: userEmail, code: userCode })
      console.log(response.data)
      setStatusMessage("Access granted")
    } catch (err) {
      if (err.response?.status === 400) {
        console.log("Access denied")
        setStatusMessage("Wrong code")
      }
    }
    if (userCode === toString(params.authCode)) {
      navigate("/poker")
    }
  };

  return (
    <>
      <div className="login_container" style={{visibility: loginStage ? 'visible' : 'hidden'}}>
        <h1>Sign up</h1>
        <form ref={form} onSubmit={login} autoComplete="on">
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
      <div className="login_container" onSubmit={verifyCode} style={{visibility: loginStage ? 'hidden' : 'visible'}}>
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
            <span>{statusMessage}</span>
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
