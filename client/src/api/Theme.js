import React, { useState, useEffect, useCallback } from 'react'
import axios from './axios';

export default function Theme({ children }) {
    var [curColor, setColor] = useState("#d1007e")

    const pickTheme = useCallback(() => {
        let localColor = localStorage.getItem('localColor')
        if (localColor == null) {
            axios.get('/api/validate')
            .then(
                function (response) {
                    setColor(response.data.msg.Theme)
                    document.documentElement.style.setProperty('--main-color', curColor);
                    localStorage.setItem('localColor', curColor)
                }
            )
            .catch(
                function (error) {
                    console.log(error)
                    document.documentElement.style.setProperty('--main-color', '#d1007e');
                    localStorage.setItem('localColor', '#d1007e')
                }
            )
        } else {
            document.documentElement.style.setProperty('--main-color', localColor)
        }
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
