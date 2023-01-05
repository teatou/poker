package models

type User struct {
	ID    uint   `gorm:"primaryKey"`
	Email string `gorm:"unique"`
	Code  int
}
