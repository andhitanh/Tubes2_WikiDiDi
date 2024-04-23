package main

import (
	"fmt"
	"time"
)

// command to RUN :
// go run bfsweb.go scrap.go queue.go

func breadthFirstSearch(startPage string, currentPage string, targetPage string, visited map[string]bool, appended map[string]bool, path []string, queue *Queue, parent map[string]string) []string {
	if currentPage == targetPage {
		path := []string{currentPage}
			for currentPage != startPage {
				currentPage = parent[currentPage]
				path = append([]string{currentPage}, path...)
			}
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
				parent[link] = currentPage
			}
		}
	}

	if !queue.QueueEmpty(){
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

func main() {
	startPage := "Joko_Widodo"
	targetPage := "Solo_River"
	q := NewQueue()
	visited := make(map[string]bool)
	appended := make(map[string]bool)
	parent := make(map[string]string)

	start := time.Now()

	path := breadthFirstSearch(startPage, startPage, targetPage, visited, appended, []string{startPage}, q, parent)
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
