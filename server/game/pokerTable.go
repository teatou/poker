package game

type Table struct {
	players    map[*Player]bool
	broadcast  chan []byte
	joinPlayer chan *Player
	quitPlayer chan *Player
}

func NewTable() *Table {
	return &Table{
		players:    make(map[*Player]bool),
		broadcast:  make(chan []byte),
		joinPlayer: make(chan *Player),
		quitPlayer: make(chan *Player),
	}
}

func (t *Table) Run() {
	for {
		select {
		case player := <-t.joinPlayer:
			t.players[player] = true
		case player := <-t.quitPlayer:
			if _, ok := t.players[player]; ok {
				delete(t.players, player)
				close(player.actions)
			}
		case message := <-t.broadcast:
			for player := range t.players {
				select {
				case player.actions <- message:
				default:
					close(player.actions)
					delete(t.players, player)
				}
			}
		}
	}
}
