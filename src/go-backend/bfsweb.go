package main

import (
	"fmt"
	"time"
)

// command to RUN :
// go run bfsweb.go scrap.go queue.go

func breadthFirstSearch(currentPage string, targetPage string, visited map[string]bool, appended map[string]bool, path []string, queue *Queue) []string {
	if currentPage == targetPage {
		return path
	}

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
			}
		}
	}

	if !queue.QueueEmpty(){
		frontLink := queue.Dequeue()
		path = append(path, frontLink)
		result := breadthFirstSearch(frontLink, targetPage, visited, appended, path, queue)
		if result != nil {
			return result
		}
	}
	
	// Unmark klo gajadi path
	visited[currentPage] = false

	return nil
	// output: list of hyperlink yg jadi path atau nil klo gak ketemu
}

func main() {
	startPage := "Joko_Widodo"
	targetPage := "Solo_River"
	q := NewQueue()
	visited := make(map[string]bool)
	appended := make(map[string]bool)

	start := time.Now()

	path := breadthFirstSearch(startPage, targetPage, visited, appended, []string{startPage}, q)
	duration := time.Since(start)
	if path != nil {
		fmt.Println("Path yang ditemukan:")
		for _, page := range path {
			fmt.Println(page)
		}
		fmt.Println("Jumlah artikel dikunjungi: ", len(visited))
	} else {
		fmt.Println("Path tidak ditemukan.")
	}

	fmt.Println("Durasi:", duration)
}
