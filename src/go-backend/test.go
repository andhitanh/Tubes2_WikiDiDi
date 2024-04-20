package main

import (
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"strings"
	"time"
)

// get link tanpa filter
func getLinks(pageTitle string) ([]string, error) {
	url := "https://en.wikipedia.org/wiki/" + pageTitle
	doc, err := goquery.NewDocument(url)
	if err != nil {
		return nil, err
	}

	var links []string
	doc.Find("#mw-content-text a").Each(func(i int, s *goquery.Selection) {
		link, exists := s.Attr("href")
		if exists && strings.HasPrefix(link, "/wiki/") {
			links = append(links, strings.TrimPrefix(link, "/wiki/"))
		}
	})
	return links, nil //output: list of hyperlink
}

func depthLimitedSearch(currentPage string, targetPage string, depthLimit int, visited map[string]bool, path []string) []string {
	if depthLimit == 0 {
		return nil
	}

	if currentPage == targetPage {
		return path 
	}

	//mark yg udah dikunjungi
	visited[currentPage] = true

	links, err := getLinks(currentPage)
	if err != nil {
		fmt.Println("Error pada page: ", currentPage, ":", err)
		return nil
	}

	for _, link := range links {
		if !visited[link] {
			newPath := append(path, link)
			result := depthLimitedSearch(link, targetPage, depthLimit-1, visited, newPath)
			if result != nil {
				return result
			}
		}
	}

	// Unmark klo gajadi path
	visited[currentPage] = false

	return nil
	// output: list of hyperlink yg jadi path atau nil klo gak ketemu
}

func iterativeDeepeningWikirace(startPage string, targetPage string, maxDepth int) []string {
	for depth := 1; depth <= maxDepth; depth++ {
		fmt.Println("Depth: ", depth-1, "...")
		visited := make(map[string]bool)
		path := depthLimitedSearch(startPage, targetPage, depth, visited, []string{startPage})
		if path != nil {
			fmt.Println(path)
			return path
		}
	}
	return nil
}

func main() {
	startPage := "Earth"
	targetPage := "Moon"
	maxDepth := 5

	start := time.Now()

	path := iterativeDeepeningWikirace(startPage, targetPage, maxDepth)
	duration := time.Since(start)
	if path != nil {
		fmt.Println("Path found:")
		for _, page := range path {
			fmt.Println(page)
		}
	} else {
		fmt.Println("Path not found karena depth limit.")
	}

	fmt.Println("Durasi:", duration)
}
