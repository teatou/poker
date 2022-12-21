import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import '../styles/home.css';

export default function Sidebar({ children }) {
  return (
    <div className="sidebar-window">
        <nav>
            <div className="logo">Logo</div>
            <div className="radiobuttons">
                <div className="radio-btn-container">
                    <Link to="/home/poker">Poker</Link>
                </div>
                <div className="radio-btn-container">
                    <Link to="/home/blackjack">Blackjack</Link>
                </div>
            </div>
            <div className="logout-btn-container">
                <Link to="/login">Logout</Link>
            </div>
        </nav>
        <div>
            { children }
        </div>
    </div>
  )
}
