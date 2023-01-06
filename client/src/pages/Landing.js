import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/landing.css';
import axios from '../api/axios';

export default function Landing() {
  const navigate = useNavigate();
  const checkAuth = (e) => {
    e.preventDefault();
    axios.get('/api/validate')
      .then(
          function () {
            navigate('/poker')
          }
      )
      .catch(
          function () {
              navigate('/login')
          }
      )
  }

  return (
    <div className="landingContainer">
        <header>
            <Link to="/">Poker33</Link>
            <button className="loginBtn" onClick={checkAuth}>Log in</button>
        </header>
        <main>
            <h1>
              Playing cards with your friends made fun and simple.
            </h1>
            <h2>What is Casino?</h2>
            <div className="game">
                <div className="gameDescription">
                  <h2>Poker</h2>
                  <span>
                    Description
                  </span>
                </div>
                <div>
                  Pic
                </div>
            </div>
            <div className="game">
                <div>
                  Pic
                </div>
                <div className="gameDescription">
                  <h2>Blackjack</h2>
                  <span>
                      Description
                  </span>
                </div>
            </div>
        </main>
        <Footer/>
    </div>
  )
}
