import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from './axios';

export default function RequireAuth({ children }) {
    var [elem, setElem] = useState(<div>default</div>)

    const pickElem = () => {
        axios.get('/api/validate')
        .then(
            function (response) {
                console.log(response);
                setElem(<div>{ children }</div>)
            }
        )
        .catch(
            function (error) {
                console.log(error);
                setElem(<div><Link to="/login">Login</Link></div>)
            }
        )
    }

    useEffect(() => {
        pickElem();
      }, []);

    return (elem)
}
