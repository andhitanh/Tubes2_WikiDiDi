package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/rs/cors"
)

// command to RUN :
// go run bfsweb.go scrap.go queue.go
var startPage = ""  // Define startPage globally
var targetPage = "" // Define targetPage globally

type InputData struct {
	Input string `json:"input"`
}

func breadthFirstSearch(startPage string, currentPage string, targetPage string, visited map[string]bool, appended map[string]bool, path []string, queue *Queue, parent map[string]string) []string {
	if currentPage == targetPage {
		path := []string{currentPage}
		for currentPage != startPage {
			currentPage = parent[currentPage]
			path = append([]string{currentPage}, path...)
		}
		return path
	}
	fmt.Println(currentPage)

	visited[currentPage] = true

	links, err := getLinks(currentPage)
	if err != nil {
		fmt.Println("Error pada page: ", currentPage, ":", err)
		return nil
	}

	if links != nil {
		for _, link := range links {
			if !visited[link] && !appended[link] {
				appended[link] = true
				queue.Enqueue(link)
				parent[link] = currentPage
			}
		}
	}

	if !queue.QueueEmpty() {
		frontLink := queue.Dequeue()
		path = append(path, frontLink)
		result := breadthFirstSearch(startPage, frontLink, targetPage, visited, appended, path, queue, parent)
		if result != nil {
			return result
		}
	}

	// Unmark klo gajadi path
	visited[currentPage] = false

	return nil
	// output: list of hyperlink yg jadi path atau nil klo gak ketemu
}

// Fungsi handler suntuk penanganan permintaan BFS
func bfsHandler(w http.ResponseWriter, r *http.Request) {
	startPage := "Vectors"
	targetPage := "Mathematics"
	// var inputData map[string]string
	q := NewQueue()
	visited := make(map[string]bool)
	appended := make(map[string]bool)
	parent := make(map[string]string)

	start := time.Now()

	path := breadthFirstSearch(startPage, startPage, targetPage, visited, appended, []string{startPage}, q, parent)
	duration := time.Since(start)

	response := map[string]interface{}{
		"path":     path,
		"duration": duration.Seconds(), // Konversi durasi menjadi detik
		"visited":  len(visited),
	}

	if path != nil {
		fmt.Println("Path yang ditemukan:", len(path))
		for _, page := range path {
			fmt.Println(page)
		}
		fmt.Println("Jumlah artikel dikunjungi: ", len(visited))
	} else {
		fmt.Println("Path tidak ditemukan.")
	}

	fmt.Println("Durasi:", duration)
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	// Mengirimkan respon JSON ke frontend
	json.NewEncoder(w).Encode(response)
}

func idsHandler(w http.ResponseWriter, r *http.Request) {
	startPage := "Vectors"
	targetPage := "Mathematics"
	// Ambil nilai input dari data input
	// var inputData map[string]string
	// err := json.NewDecoder(r.Body).Decode(&inputData)
	// if err != nil {
	// 	http.Error(w, "Failed to decode request body", http.StatusBadRequest)
	// 	return
	// }
	// startPage := inputData["startPage"]
	maxDepth := 5

	start := time.Now()

	path := iterativeDeepeningWikirace(startPage, targetPage, maxDepth)
	duration := time.Since(start)

	response := map[string]interface{}{
		"path":     path,
		"duration": duration.Seconds(), // Konversi durasi menjadi detik
	}

	if path != nil {
		fmt.Println("Path yang ditemukan:", len(path))
		for _, page := range path {
			fmt.Println(page)
		}
	} else {
		fmt.Println("Path tidak ditemukan.")
	}

	fmt.Println("Durasi:", duration)
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	// Mengirimkan respon JSON ke frontend
	json.NewEncoder(w).Encode(response)
}

func inputStartHandler(w http.ResponseWriter, r *http.Request) {
	// Mendekode body permintaan menjadi struktur data yang diinginkan (misalnya JSON)
	var inputData InputData

	fmt.Println(inputData)

	startPage = inputData.Input
	response := map[string]interface{}{
		"message": "Data received successfully",
		"input":   startPage, // Masukkan input di sini
	}
	// Mengirimkan respons ke frontend
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // Tambahkan header CORS
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	json.NewEncoder(w).Encode(response)
}

func inputTargetHandler(w http.ResponseWriter, r *http.Request) {
	// Mendekode body permintaan menjadi struktur data yang diinginkan (misalnya JSON)
	// var inputData InputData/
	var inputData InputData
	err := json.NewDecoder(r.Body).Decode(&inputData)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	targetPage = inputData.Input
	response := map[string]interface{}{
		"message": "Data received successfully",
		"input":   targetPage, // Masukkan input di sini
	}

	// Mengirimkan respons ke frontend
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // Tambahkan header CORS
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	json.NewEncoder(w).Encode(response)
}

// Fungsi main untuk menjalankan server HTTP
func main() {
	c := cors.AllowAll()

	// Gunakan middleware cors untuk semua handler
	handler := c.Handler(http.DefaultServeMux)

	// Mulai server HTTP dengan handler yang telah dimodifikasi
	http.HandleFunc("/inputstart", inputStartHandler)
	http.HandleFunc("/inputtarget", inputStartHandler)
	http.HandleFunc("/bfs", bfsHandler)
	http.HandleFunc("/ids", idsHandler)
	fmt.Println("Server started at :8000")
	http.ListenAndServe(":8000", handler)
}
