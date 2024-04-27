package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type InputDat struct {
	Input string `json:"input"`
}

func main() {
	http.HandleFunc("/inputstart", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Set CORS headers to allow requests from localhost:3000
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		var inputData InputDat
		if err := json.NewDecoder(r.Body).Decode(&inputData); err != nil {
			http.Error(w, "Failed to decode request body", http.StatusBadRequest)
			return
		}

		fmt.Println("Received input:", inputData.Input)

		// Process the input data here as needed

		// Send response
		response := map[string]interface{}{
			"message": "Data received successfully",
			"input":   inputData.Input,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	})

	fmt.Println("Server started at :8000")
	http.ListenAndServe(":8000", nil)
}
