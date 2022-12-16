package main

import (
	"github.com/gin-gonic/gin"
	"github.com/teatou/poker/server/controllers"
	"github.com/teatou/poker/server/initializers"

	cors "github.com/rs/cors/wrapper/gin"
)

func init() {
	initializers.LoadEnvVars()
}

func main() {
	c := cors.New(cors.Options{
		AllowedOrigins:     []string{"http://localhost:3000"},
		AllowedMethods:     []string{"GET"},
		AllowedHeaders:     []string{},
		ExposedHeaders:     []string{},
		AllowCredentials:   true,  // cookies etc
		OptionsPassthrough: false, // preflight requests
	})
	app := gin.Default()
	app.Use(c)

	app.GET("/api/get", controllers.Test)

	app.Run()
}
