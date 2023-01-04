import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BjMain from './pages/BjMain';
import Landing from './pages/Landing';
import Login from './pages/Login';
import PokerMain from './pages/PokerMain';
import Settings from './pages/Settings';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/poker" element={<Sidebar children={<PokerMain/>}/>} />
            <Route path="/blackjack" element={<Sidebar children={<BjMain/>}/>} />
            <Route path="/settings" element={<Sidebar children={<Settings/>}/>} /> 
        </Routes>
    </BrowserRouter>
);
