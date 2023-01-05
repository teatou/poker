import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/landing.css';

export default function Landing() {
  return (
    <div className="landingContainer">
        <header>
            <Link to="/">Poker33</Link>
            <Link to="/login" className="loginBtn">Log in</Link>
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
