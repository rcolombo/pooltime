package main

import (
	"crypto/md5"
	"errors"
	"fmt"
	"log"
)

type User struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

func (u *User) DbSave() error {
	if u.Name == "" {
		return errors.New("name cannot be empty")
	}
	if u.Password == "" {
		return errors.New("password cannot be empty")
	}
	if u.Email == "" {
		return errors.New("email cannot be empty")
	}

	err := db.QueryRow(`INSERT INTO users
	    (name, password, email) VALUES($1, $2, $3) RETURNING id`, u.Name, u.Password, u.Email).Scan(&u.Id)

	if err != nil {
		log.Println("Error saving user: ", err)
		return err
	}

	return nil
}

func (u *User) EncryptPassword() {
	u.Password = fmt.Sprintf("%x", md5.Sum([]byte(u.Password)))
}
