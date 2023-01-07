import React, { useState, useEffect, useCallback } from 'react'
import axios from './axios';

export default function Theme({ children }) {
    var [curColor, setColor] = useState("#d1007e")

    const pickTheme = useCallback(() => {
        axios.get('/api/validate')
        .then(
            function (response) {
                setColor(response.data.msg.Theme)
                document.documentElement.style.setProperty('--main-color', curColor);
            }
        )
        .catch(
            function (error) {
                console.log(error)
                document.documentElement.style.setProperty('--main-color', '#d1007e');
            }
        )
    }, [curColor])

    useEffect(() => {
        pickTheme();
      }, [pickTheme]);

    return (
        <div>
            { children }
        </div>
    )
}
