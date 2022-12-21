package game

import "github.com/gorilla/websocket"

type Player struct {
	conn         websocket.Conn
	currentTable *Table
	currentSeat  int
	actions      chan []byte
}
