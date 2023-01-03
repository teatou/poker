import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import '../styles/home.css';

export default function Sidebar({ children }) {
  return (
    <div className="sidebar-window">
        <nav>
            <div className="nav-logo">Logo</div>
            <ul className="mainNav">
                <li className="nav-btn"
                id={window.location.pathname === "/home/poker" ? "active": ""}>
                    <Link to="/home/poker">A</Link>
                </li>
                <li className="nav-btn"
                id={window.location.pathname === "/home/blackjack" ? "active": ""}>
                    <Link to="/home/blackjack">J</Link>
                </li>
            </ul>
            <div className="nav-btn">
                <Link to="/login">L</Link>
            </div>
        </nav>
        <div className="main-section">
            { children }
        </div>
    </div>
  )
}
