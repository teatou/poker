import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
import axios from './axios';

export default function RequireAuth({ children }) {
    var [curColor, setColor] = useState("#d1007e")

    var [elem, setElem] = useState(<div>default</div>)

    const pickElem = useCallback(() => {
        axios.get('/api/validate')
        .then(
            function (response) {
                setColor(response.data.msg.Theme)
                document.documentElement.style.setProperty('--main-color', curColor);
                setElem(<div>{ children }</div>)
            }
        )
        .catch(
            function (error) {
                console.log(error);
                setElem(<div><Link to="/login">Login</Link></div>)
            }
        )
    }, [children, curColor])

    useEffect(() => {
        pickElem();
      }, [pickElem]);

    return (elem)
}
