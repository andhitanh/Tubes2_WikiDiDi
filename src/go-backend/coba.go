package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type test_struct struct {
	Test string
}

func test(rw http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var t test_struct
	err := decoder.Decode(&t)
	if err != nil {
		panic(err)
	}
	log.Println(t.Test)
}

func main() {

	http.HandleFunc("/inputstart", test)
	http.HandleFunc("/bfs", test)
	http.HandleFunc("/ids", test)
	fmt.Println("Server started at :8000")
	log.Fatal(http.ListenAndServe(":8082", nil))
}
