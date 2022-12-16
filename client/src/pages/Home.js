import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Home() {
  axios.get("http://localhost:8080/api/get").then((r) => console.log(r))
  return (
    <Link to="/login">Login</Link>
  )
}
