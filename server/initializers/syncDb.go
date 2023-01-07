package initializers

import (
	"github.com/teatou/poker/server/models"
)

func SyncDb() {
	DB.AutoMigrate(&models.User{})
}
