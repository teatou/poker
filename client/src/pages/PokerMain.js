import React from 'react';

export default function PokerMain() {
  return (
    <div className="dashboard">
      <h1>{localStorage.getItem('nickname')}</h1>
      <div className="table-handler-btns">
        <button id="createTable-btn">Create table</button>
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
