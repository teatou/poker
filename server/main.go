package main

import (
	"github.com/gin-gonic/gin"
	"github.com/teatou/poker/server/controllers"
	"github.com/teatou/poker/server/initializers"
	"github.com/teatou/poker/server/middleware"

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

	// run
	router.Run()
}
