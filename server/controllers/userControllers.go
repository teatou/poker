package controllers

import (
	"fmt"
	"net/http"
	"net/smtp"
	"os"
	"strconv"
	"time"

	"math/rand"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
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

	user := models.User{Email: body.Email, Nickname: "Guest", Code: code, Theme: "pink"}
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

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	codeFind, _ := strconv.Atoi(body.Code)

	var user models.User
	initializers.DB.First(&user, "email = ?", body.Email)

	if user.Code != codeFind {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Codes do not match",
		})
		return
	}

	// jwt
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	// cookie
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"msg": "cookie set",
	})
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{
		"msg": user,
	})
}

func Logout(c *gin.Context) {
	c.SetCookie("Authorization", "", 0, "", "", false, true)
}

func LoginAsGuest(c *gin.Context) {
	user := models.User{ID: 1, Email: "guest", Nickname: "Guest", Code: 999, Theme: "#d1007e"}
	userFind := initializers.DB.First(&user, "email = ?", "guest")
	if userFind.RowsAffected == 0 {
		result := initializers.DB.Create(&user)
		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create user",
			})
			return
		}
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": 1,
		"exp": time.Now().Add(time.Hour * 6).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	// cookie
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*6, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"msg": "cookie set",
	})
}

func ChangeNickname(c *gin.Context) {
	var body struct {
		Nickname string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	var userModel models.User
	user, _ := c.Get("user")
	fmt.Println(user)
	c.JSON(http.StatusOK, gin.H{
		"msg": user,
	})

	initializers.DB.First(&userModel, user)
	initializers.DB.Model(&userModel).Update("nickname", body.Nickname)
}

func ChangeTheme(c *gin.Context) {
	var body struct {
		Theme string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	var userModel models.User
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{
		"msg": user,
	})

	initializers.DB.First(&userModel, user)
	initializers.DB.Model(&userModel).Update("theme", body.Theme)
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
