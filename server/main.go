package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

type TextResult struct {
	Text string `json:"text"`
}

func textHandler(w http.ResponseWriter, r *http.Request) {
	time.Sleep(2 * time.Second)
	result := TextResult{
		Text: "Hello, world!",
	}
	w.Header().Add("Content-Type", "application/json")
	j, err := json.Marshal(result)
	if err != nil {
		fmt.Fprintln(w, "ERROR")
		return
	}
	w.Write(j)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Println("Starting server on port", port, "...")

	http.HandleFunc("GET /api/text", textHandler)
	http.Handle("/", http.FileServer((http.Dir("./dist"))))
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
