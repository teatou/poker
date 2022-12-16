import React from 'react';
import '../styles/login.css';

export default function Login() {
  return (
    <div class="login_container">
      <h1>Sign up</h1>
      <form method="post" autocomplete="on">
        <div class="email_container">
          <h2>Email</h2>
          <input type="email" name="email" placeholder="example@email.com" required/>
        </div>
        <div class="method_container">
          <h2>Method</h2>
          <div class="radio_container">
            <input id="link" type="radio" name="method" value="link"/>
            <label for="link">Magic link</label>
          </div>
          <div class="radio_container">
            <input id="OTP" type="radio" name="method" value="OTP"/>
            <label for="OTP">OTP (One Time Passcode)</label>
          </div>
        </div>
        <div class="continue_btn">
          <input type="submit" value="Continue"/>
        </div>
        <div class="foot">
          <p>By continuing, you agree to our Terms and</p>
          <p>Privacy Policy</p>
        </div>
      </form> 
    </div>
  )
}
