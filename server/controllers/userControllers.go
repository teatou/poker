package controllers

import (
	"net/http"

	"math/rand"

	"github.com/gin-gonic/gin"
	"github.com/teatou/poker/server/initializers"
	"github.com/teatou/poker/server/models"
)

func Login(c *gin.Context) {
	var body struct {
		Email string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}
	// creating auth code
	code := 1000 + rand.Intn(9000)

	user := models.User{Email: body.Email, Code: code}
	userFind := initializers.DB.First(&user, "email = ?", body.Email)

	// if user not found
	if userFind.RowsAffected == 0 {
		result := initializers.DB.Create(&user)
		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create user",
			})
			return
		}
	} else {
		initializers.DB.Model(&user).Update("code", &code)
	}
}
