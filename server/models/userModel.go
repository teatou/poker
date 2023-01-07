package models

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Email    string `gorm:"unique"`
	Nickname string
	Code     int
	Theme    string
}
