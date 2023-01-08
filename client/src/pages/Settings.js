import React, { useState } from 'react';
import axios from '../api/axios';
import '../styles/settings.css';

export default function Settings() {
  const [msgNickname, setMsg] = useState("");


  const changeNickname = async (e) => {
    e.preventDefault();

    let newNickname = document.getElementById("newNickname").value;

    try {
      const response = await axios.post('/api/changeNickname', { Nickname: newNickname })
      setMsg("Nickname changed")
      localStorage.setItem('nickname', newNickname)
      console.log(response.data)
    } catch (err) {
        setMsg("Error")
        console.log(err.data)
    }
  };

  const changeTheme = async (e) => {
    e.preventDefault();

    var radioButtonGroup = document.getElementsByName("theme");
    var checkedRadio = Array.from(radioButtonGroup).find(
      (radio) => radio.checked
    );
    let color = checkedRadio.value
    
    try {
      const response = await axios.post('/api/changeTheme', { Theme: color })
      console.log(response.data)
      localStorage.setItem('localColor', color)
      window.location.reload()
    } catch (err) {
        console.log(err.data)
    }
  };

  return (
  <div>
      <div className="settings-container">
        <div className="profileSettings">
          <h2>Profile</h2>
          <span>Change nickname</span>
          <form onSubmit={changeNickname}>
            <input id="newNickname"
            type="text"
            placeholder="nickname"
            required></input>
            <div>
              <input
              type="submit"
              value="Confirm"
              id="submit-nickname"/>
              </div>
          </form>
          <span>{msgNickname}</span>
        </div>
        <div className="profileSettings">
          <h2>Theme</h2>
          <span>Change theme</span>
          <form onSubmit={changeTheme}>
            <div className="theme-btns">
              <input type="radio" name="theme" id="pink" value={'#d1007e'}/>
              <input type="radio" name="theme" id="red" value={'#E94B3CFF'}/>
              <input type="radio" name="theme" id="orange" value={'#F2AA4CFF'}/>
            </div>
            <div>
              <input
              type="submit"
              value="Confirm"
              id="submit-nickname"/>
              </div>
          </form>
          <span>{msgNickname}</span>
        </div>
      </div>
    </div>
  )
}
