import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BjMain from './pages/BjMain';
import Landing from './pages/Landing';
import Login from './pages/Login';
import PokerMain from './pages/PokerMain';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home/poker" element={<Sidebar children={<PokerMain/>}/>} />
            <Route path="/home/blackjack" element={<Sidebar children={<BjMain/>}/>} />
        </Routes>
    </BrowserRouter>
);
