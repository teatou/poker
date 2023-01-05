package controllers

import (
	"fmt"
	"net/http"
	"net/smtp"
	"os"
	"strconv"

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
		initializers.DB.Model(&user).Update("code", code)
	}

	// sending code
	sendEmail("Poker33 code", strconv.Itoa(code), []string{body.Email})
}

func VerifyCode(c *gin.Context) {
	var body struct {
		Email string
		Code  string
	}
	var codeFind struct {
		Code string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	initializers.DB.Raw("SELECT code FROM users WHERE email = ?", body.Email).Scan(&codeFind)

	if codeFind.Code == body.Code {
		c.JSON(http.StatusOK, gin.H{
			"msg": "Access granted",
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Codes do not match",
		})
	}
}

func sendEmail(subj string, body string, to []string) {
	headers := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";"

	auth := smtp.PlainAuth(
		"",
		"poker33bj@gmail.com",
		os.Getenv("GMAILPWD"),
		"smtp.gmail.com",
	)

	msg := "Subject: " + subj + "\n" + headers + "\n\n" + "<h1>" + body + "</h1>"

	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		"poker33bj@gmail.com",
		to,
		[]byte(msg),
	)
	if err != nil {
		fmt.Println("Error sending email")
	}
}
