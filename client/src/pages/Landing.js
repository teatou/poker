import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div>
        <header>
            <div>Logo</div>
            <Link to="/login">Log in</Link>
        </header>
        <div>
            Info
        </div>
        <Footer/>
    </div>
  )
}
