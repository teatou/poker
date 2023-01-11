package game

type Table struct {
	ID         string
	Players    map[*Player]bool
	Broadcast  chan []byte
	JoinPlayer chan *Player
	QuitPlayer chan *Player
}

func NewTable(Id string) *Table {
	return &Table{
		ID:         Id,
		Players:    make(map[*Player]bool),
		Broadcast:  make(chan []byte),
		JoinPlayer: make(chan *Player),
		QuitPlayer: make(chan *Player),
	}
}

func (t *Table) Run() {
	for {
		select {
		case player := <-t.JoinPlayer:
			t.Players[player] = true
		case player := <-t.QuitPlayer:
			if _, ok := t.Players[player]; ok {
				delete(t.Players, player)
				close(player.Actions)
			}
		case message := <-t.Broadcast:
			for player := range t.Players {
				select {
				case player.Actions <- message:
				default:
					close(player.Actions)
					delete(t.Players, player)
				}
			}
		}
	}
}
