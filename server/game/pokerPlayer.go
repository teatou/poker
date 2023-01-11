package game

import (
	"bytes"
	"fmt"
	"time"

	"github.com/gorilla/websocket"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

type Player struct {
	Nickname     string
	CurrentTable *Table
	Conn         *websocket.Conn
	Actions      chan []byte
}

func (p *Player) ReadPump() {
	defer func() {
		p.CurrentTable.QuitPlayer <- p
		p.Conn.Close()
	}()
	p.Conn.SetReadLimit(maxMessageSize)
	p.Conn.SetReadDeadline(time.Now().Add(pongWait))
	p.Conn.SetPongHandler(func(string) error { p.Conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := p.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				fmt.Println("error: ", err)
			}
			break
		}
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
		p.CurrentTable.Broadcast <- message
	}
}

func (p *Player) WritePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		p.Conn.Close()
	}()
	for {
		select {
		case message, ok := <-p.Actions:
			p.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				p.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := p.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)
			fmt.Println(string(message))

			// Add queued chat messages to the current websocket message.
			n := len(p.Actions)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write(<-p.Actions)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			p.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := p.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
