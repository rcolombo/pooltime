package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/facebookgo/httpdown"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

var (
	host     = flag.String("bind", "0.0.0.0", "Bind host")
	port     = flag.Int("port", 5000, "Port")
	dbstr    = flag.String("dbstr", "dbname=pooltime sslmode=disable", "DB connection string")
	poolsize = flag.Int("poolsize", 10, "DB connection pool size")

	router *mux.Router
	db     *sql.DB
)

func init() {
	flag.Parse()
	initDb()
	initRoutes()
}

func initDb() {
	var (
		err error
		row string
	)

	if db, err = sql.Open("postgres", *dbstr); err != nil {
		log.Println("Could not open database connection")
		log.Fatal(err)
	}

	if err = db.QueryRow("SELECT 'OK'").Scan(&row); err != nil {
		log.Println("Could not connect to database")
		log.Println(*dbstr)
		log.Fatal(err)
	}

	db.SetMaxIdleConns(*poolsize)
}

func initRoutes() {
	router = mux.NewRouter()
	router.HandleFunc("/signup", SignupHandler).Name("signup").Methods("POST")
}

func main() {
	server := &http.Server{
		Addr:    fmt.Sprintf(":%v", *port),
		Handler: router,
	}
	hd := &httpdown.HTTP{
		StopTimeout: 10 * time.Second,
		KillTimeout: 1 * time.Second,
	}

	httpdown.ListenAndServe(server, hd)
}
