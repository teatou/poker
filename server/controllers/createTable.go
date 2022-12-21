package controllers

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/teatou/poker/server/game"
)

func CreateTable(c *gin.Context) {
	table := game.NewTable()
	fmt.Println("Table crated serv")
	go table.Run()
}
