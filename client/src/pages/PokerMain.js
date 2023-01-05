import React from 'react';
import axios from '../api/axios';

export default function PokerMain() {
  const createTable = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.get('/api/validate')
      console.log(response.data)
    } catch (err) {
      console.log(err.response)
    }
};
  return (
    <div className="dashboard">
      <h1>Nickname</h1>
      <div className="table-handler-btns">
        <button id="createTable-btn" onClick={createTable}>Create table</button>
        <button id="joinTable-btn">Join table</button>
      </div>
      <div className="gamesHistory">
        <h2>History</h2>
        <div>
          No games so far
        </div>
      </div>
    </div>
  )
}
