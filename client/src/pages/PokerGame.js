import React, { useEffect, useCallback } from 'react'


export default function PokerGame() {
    var conn, msg

    const first = useCallback(() => {
        conn = new WebSocket('ws://localhost:8080/ws/poker/joinTable');
    }, [conn])

    
    function socketPost() {
        if (!conn) {
            return false;
        }
        conn.send('cheeeck');
        return false;
    }
    
    if (window["WebSocket"]) {
        conn = new WebSocket('ws://localhost:8080/ws/poker/joinTable');
        conn.onclose = function () {
            console.log('closed')
        };
        conn.onmessage = (e) => {
            console.log('server: ', e.data)
        };
    } else {
        console.log('L')
    }

    useEffect(() => {
        first()
      }, [first]);
    
    return (
        <div onClick={socketPost}>
            <span>send</span>
        </div>
    )
}
