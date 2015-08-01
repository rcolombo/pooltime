package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type HTTPResponse struct {
	Status struct {
		Code    int
		Message string
	}
}

func (r *HTTPResponse) Respond(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(r.Status.Code)
	fmt.Fprint(w, r.Status.Message)
}

func SignupHandler(w http.ResponseWriter, req *http.Request) {
	var (
		err  error
		body []byte
		r    HTTPResponse
		u    User
	)

	r.Status.Code = 400

	if contentType := req.Header.Get("Content-Type"); contentType != "application/json" {
		r.Status.Message = "Requests must be application/json"
		r.Respond(w)
		return
	}

	if body, err = ioutil.ReadAll(req.Body); err != nil {
		r.Status.Message = "Error reading body"
		r.Respond(w)
		return
	}

	if err = json.Unmarshal(body, &u); err != nil {
		r.Status.Message = "Invalid JSON"
		r.Respond(w)
		return
	}

	if u.Name == "" {
		r.Status.Message = "Request must contain 'name' field"
		r.Respond(w)
		return
	}
	if u.Password == "" {
		r.Status.Message = "Request must contain 'password' field"
		r.Respond(w)
		return
	}
	if u.Email == "" {
		r.Status.Message = "Request must contain 'password' field"
		r.Respond(w)
		return
	}

	u.EncryptPassword()
	if err = u.DbSave(); err != nil {
		r.Status.Message = "Error creating account"
		r.Respond(w)
		return
	}

	r.Status.Code = 200
	r.Status.Message = "OK"
	r.Respond(w)
}
