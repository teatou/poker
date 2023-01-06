import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './api/RequireAuth';
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
            <Route path="/poker" element={
                <RequireAuth children={<Sidebar children={<PokerMain/>}/>}/>
            } />
            <Route path="/blackjack" element={
                <RequireAuth children={<Sidebar children={<BjMain/>}/>}/>
            } />
            <Route path="/settings" element={
                <RequireAuth children={<Sidebar children={<Settings/>}/>}/>
            } />
        </Routes>
    </BrowserRouter>
);
