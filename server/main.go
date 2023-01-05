package main

import (
	"github.com/gin-gonic/gin"
	"github.com/teatou/poker/server/controllers"
	"github.com/teatou/poker/server/initializers"

	cors "github.com/rs/cors/wrapper/gin"
)

func init() {
	initializers.LoadEnvVars()
	initializers.ConnectToDb()
	initializers.SyncDb()
}

func main() {
	// cors settings
	c := cors.New(cors.Options{
		AllowedOrigins:     []string{"http://localhost:3000"},
		AllowedMethods:     []string{"GET", "POST"},
		AllowedHeaders:     []string{},
		ExposedHeaders:     []string{},
		AllowCredentials:   true,  // cookies etc
		OptionsPassthrough: false, // preflight requests
	})

	// gin settings
	router := gin.Default()
	router.Use(c)

	// gin routes
	router.POST("/createTable", controllers.CreateTable)
	router.POST("/api/login", controllers.Login)

	// run
	router.Run()
}
