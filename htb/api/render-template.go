package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
)

type TemplateRequest struct {
	Code string `json:"code"`
}

func renderTemplate(w http.ResponseWriter, r *http.Request) {
	log.Println("Received request to render template")

	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var tmplReq TemplateRequest
	err := json.NewDecoder(r.Body).Decode(&tmplReq)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		log.Printf("Failed to decode request: %v\n", err)
		return
	}

	log.Printf("Received template code: %s\n", tmplReq.Code)

	tmpl, err := template.New("webpage").Parse(tmplReq.Code)
	if err != nil {
		http.Error(w, "Template parsing error", http.StatusBadRequest)
		log.Printf("Failed to parse template: %v\n", err)
		return
	}

	var rendered bytes.Buffer
	err = tmpl.Execute(&rendered, nil)
	if err != nil {
		http.Error(w, "Template execution error", http.StatusInternalServerError)
		log.Printf("Failed to execute template: %v\n", err)
		return
	}

	w.Header().Set("Content-Type", "text/html")
	w.Write(rendered.Bytes())

	log.Println("Template rendered successfully")
}

func Handler(w http.ResponseWriter, r *http.Request) {
	log.Printf("Handling request for %s\n", r.URL.Path)
	switch r.URL.Path {
	case "/api/render-template":
		renderTemplate(w, r)
	default:
		http.NotFound(w, r)
	}
}

func main() {
	http.HandleFunc("/", Handler)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server starting on port %s\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}
