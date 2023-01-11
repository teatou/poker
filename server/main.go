package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/teatou/poker/server/controllers"
	"github.com/teatou/poker/server/game"
	"github.com/teatou/poker/server/initializers"
	"github.com/teatou/poker/server/middleware"

	cors "github.com/rs/cors/wrapper/gin"
)

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return r.Header.Get("Origin") == os.Getenv("CLIENT")
	},
}

func init() {
	initializers.LoadEnvVars()
	initializers.ConnectToDb()
	initializers.SyncDb()
}

func main() {
	var pokerTable *game.Table
	// cors settings
	c := cors.New(cors.Options{
		AllowedOrigins:     []string{os.Getenv("CLIENT")},
		AllowedMethods:     []string{"GET", "POST"},
		AllowedHeaders:     []string{},
		ExposedHeaders:     []string{},
		AllowCredentials:   true,
		OptionsPassthrough: false, // preflight requests
	})

	// gin settings
	router := gin.Default()
	router.Use(c)

	// gin routes
	router.POST("/api/login", controllers.Login)
	router.POST("api/verifyCode", controllers.VerifyCode)
	router.GET("api/validate", middleware.RequireAuth, controllers.Validate)
	router.GET("api/logout", controllers.Logout)
	router.GET("api/loginguest", controllers.LoginAsGuest)
	router.POST("api/changeNickname", middleware.RequireAuth, controllers.ChangeNickname)
	router.POST("api/changeTheme", middleware.RequireAuth, controllers.ChangeTheme)

	// socket routes
	router.GET("/poker/createTable", middleware.RequireAuth, func(c *gin.Context) {
		id := c.Query("id")
		pokerTable = game.NewTable(id)

		c.String(http.StatusOK, "Table id: %s", id)
	})
	router.GET("/ws/poker/startTable", middleware.RequireAuth, func(c *gin.Context) {
		go pokerTable.Run()

		wshandler(c.Writer, c.Request, pokerTable)

		c.String(http.StatusOK, "Table started")
	})
	router.GET("/ws/poker/joinTable", middleware.RequireAuth, func(c *gin.Context) {
		wshandler(c.Writer, c.Request, pokerTable)

		c.String(http.StatusOK, "Player joined")
	})

	// run
	router.Run()
}

func wshandler(w http.ResponseWriter, r *http.Request, table *game.Table) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Failed to set websocket upgrade: ", err)
		return
	}

	player := &game.Player{Nickname: "guest", CurrentTable: table, Conn: conn, Actions: make(chan []byte, 256)}
	player.CurrentTable.JoinPlayer <- player

	// Allow collection of memory referenced by the caller by doing all work in
	// new goroutines.
	go player.WritePump()
	go player.ReadPump()
}
