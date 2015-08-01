package main

import (
	"crypto/md5"
	"fmt"
	"log"
	"testing"

	"github.com/stretchr/testify/assert"
)

func UsersCleanup() {
	_, err := db.Exec("TRUNCATE users CASCADE")
	if err != nil {
		log.Fatal(err)
	}
}

func TestUserDbSave(t *testing.T) {
	UsersCleanup()
	var id string

	goodUser := User{
		Name:     "gallant",
		Password: "password",
		Email:    "gallant@yahoo.com",
	}
	err := goodUser.DbSave()
	assert.Nil(t, err)

	q := fmt.Sprintf(`SELECT id
	    FROM users
	    WHERE email='%v'`, goodUser.Email)
	_ = db.QueryRow(q).Scan(&id)
	assert.Equal(t, goodUser.Id, id)

	id = ""
	badUser := User{
		Name:     "goofus",
		Password: "password",
	}
	err = badUser.DbSave()
	assert.NotNil(t, err)

	q = fmt.Sprintf(`SELECT id
	    FROM users
	    WHERE name='%v'`, badUser.Name)
	_ = db.QueryRow(q).Scan(&id)
	assert.Equal(t, "", id)

	UsersCleanup()
}

func TestUserEncryptPassword(t *testing.T) {
	UsersCleanup()
	u := User{
		Name:     "a",
		Password: "b",
		Email:    "c",
	}
	u.EncryptPassword()
	u.Password = fmt.Sprintf("%x", md5.Sum([]byte("b")))
}
