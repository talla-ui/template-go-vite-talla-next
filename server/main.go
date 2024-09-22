package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
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

	reverseProxyPort := os.Getenv("PROXY")
	if reverseProxyPort != "" {
		targetURL, err := url.Parse("http://localhost:" + reverseProxyPort)
		if err != nil {
			panic(err)
		}
		http.Handle("/", httputil.NewSingleHostReverseProxy(targetURL))
		fmt.Println("Reverse proxying port", reverseProxyPort)
		fmt.Println("Use this URL instead -- http://127.0.0.1:" + port)
	} else {
		http.Handle("/", http.FileServer((http.Dir("./dist"))))
		fmt.Println("Serving production files from ./dist")
	}
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
