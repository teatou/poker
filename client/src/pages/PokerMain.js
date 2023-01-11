import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function PokerMain() {
  var conn
  const navigate = useNavigate()

  const [gameCreated, setGameCreated] = useState(true)

  const createTable = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('/poker/createTable?id=1')
      setGameCreated(false)
      console.log(response.data)
    } catch (err) {
      console.log(err.response)
    }
  };

  const startTable = async (e) => {
    e.preventDefault();

    conn = new WebSocket('ws://localhost:8080/ws/poker/startTable');
    console.log("started")
    navigate('/pokerGame')
  };

  const joinTable = async (e) => {
    e.preventDefault();

    navigate('/pokerGame')
  };
  
  return (
    <div className="dashboard">
      <div className="profileSettings">
        <h1>{localStorage.getItem('nickname')}</h1>
        <div className="tableManipulations">
          <div className="createTable">
            <h2>Create table</h2>
            <div className='tableLink' hidden={gameCreated}>Your table code</div>
            <div className="table-handler-btns">
              <button id="createTable-btn" onClick={createTable} hidden={!gameCreated}>Create</button>
              <button id="startTable-btn" onClick={startTable} hidden={gameCreated}>Start game</button>
              <span hidden={gameCreated}>Players: 0</span>
            </div>
          </div>
          <div className="joinTable">
            <h2>Join table</h2>
            <input type="text" placeholder="Table code"></input>
            <div className="table-handler-btns">
              <button id="joinTable-btn" onClick={joinTable}>Join</button>
            </div>
          </div>
        </div>
      </div>
      <div className="profileSettings">
        <h2>History</h2>
        <div>
          No games so far
        </div>
      </div>
    </div>
  )
}
