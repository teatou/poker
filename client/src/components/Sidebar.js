import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import '../styles/home.css';
import { GiCardJackSpades, GiCardAceHearts, GiPokerHand } from 'react-icons/gi';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { IoMdSettings } from 'react-icons/io';

export default function Sidebar({ children }) {
  return (
    <div className="sidebar-window">
        <nav>
            <Link to="/" className="nav-logo"><GiPokerHand size={46} fill={'#d1007e'}/></Link>
            <ul className="mainNav">
                <li className="nav-btn"
                id={window.location.pathname === "/poker" ? "active": ""}>
                    <Link to="/poker"><GiCardAceHearts size={34} fill={'white'} /></Link>
                </li>
                <li className="nav-btn"
                id={window.location.pathname === "/blackjack" ? "active": ""}>
                    <Link to="/blackjack"><GiCardJackSpades size={34} fill={'white'} /></Link>
                </li>
            </ul>
            <div className="mainNav">
                <div className="nav-btn"
                id={window.location.pathname === "/settings" ? "active": ""}>
                    <Link to="/settings"><IoMdSettings size={28} fill={'white'}/></Link>
                </div>
                <div className="nav-btn">
                    <Link to="/login"><AiOutlinePoweroff size={28} fill={'white'} /></Link>
                </div>
            </div>
        </nav>
        <div className="main-section">
            { children }
        </div>
    </div>
  )
}
