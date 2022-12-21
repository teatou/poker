import React from 'react'
import axios from 'axios';
import '../styles/home.css';
import PokerMain from './PokerMain';
import BjMain from './BjMain';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

export default function Home() {
  function createTable() {
    axios.post("http://localhost:8080/createTable").then((r) => console.log("Table created"))
  }

  const currentGamePage = [<PokerMain />, <BjMain />]

  return (
    <main>
      <nav>
        <div className="logo">Logo</div>
        <div className="radiobuttons">
          <div className="radio-btn-container">
            <input type="radio" id="Poker" name="currentGame" value="0" defaultChecked></input>
          </div>
          <div className="radio-btn-container">
            <input type="radio" id="BlackJack" name="currentGame" value="1"></input>
          </div>
        </div>
        <div className="logout-btn-container">
          <Link to="/login">Logout</Link>
        </div>
      </nav>
      { currentGamePage[0] }
    </main>
  )
}
