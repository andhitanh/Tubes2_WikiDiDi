package main

import (
	// "errors"
	"fmt"
	// "net/url"
	// "strings"
	"sync"
	// "time"
	// "github.com/PuerkitoBio/goquery"
)

var cache = struct {
	sync.RWMutex
	data map[string][]string
}{data: make(map[string][]string)}

var cacheLinks = struct {
	sync.RWMutex
	data map[string]bool
}{data: make(map[string]bool)}

// // get link tanpa filter
// func getLinks(pageTitle string) ([]string, error) {
// 	urlString := "https://en.wikipedia.org/wiki/" + pageTitle
// 	doc, err := goquery.NewDocument(urlString)
// 	if err != nil {
// 		return nil, err
// 	}

// 	var links []string
// 	doc.Find("#mw-content-text a").Each(func(i int, s *goquery.Selection) {
// 		link, exists := s.Attr("href")
// 		if exists {
// 			// Parse the link to handle encoded characters properly
// 			parsedLink, err := url.Parse(link)
// 			if err != nil {
// 				fmt.Println("Error parsing link:", err)
// 				return
// 			}

// 			// Check if the link is a Wikipedia internal link and does not contain ":" or "."
// 			if strings.HasPrefix(parsedLink.Path, "/wiki/") && !strings.Contains(parsedLink.Path, ":") && !strings.Contains(parsedLink.Path, ".") {
// 				// Decode the path to handle encoded characters
// 				decodedPath, err := url.PathUnescape(parsedLink.Path)
// 				if err != nil {
// 					fmt.Println("Error decoding link path:", err)
// 					return
// 				}
// 				links = append(links, strings.TrimPrefix(decodedPath, "/wiki/"))
// 			}
// 		}
// 	})
// 	if len(links) == 0 {
// 		return nil, errors.New("no valid links found")
// 	}

// 	cacheLinks.Lock()
// 	cacheLinks.data[pageTitle] = true
// 	cacheLinks.Unlock()

// 	cache.Lock()
// 	cache.data[pageTitle] = links
// 	cache.Unlock()

// 	return links, nil
// }

func depthLimitedSearch(currentPage string, targetPage string, depthLimit int, visited map[string]bool, path []string, total_visit map[string]int) []string {
	if depthLimit == 0 {
		return nil
	}

	if currentPage == targetPage {
		return path
	}

	//mark yg udah dikunjungi
	visited[currentPage] = true
	//hitung jumlah page yang dilalui
	total_visit[currentPage] += 1

	links, err := getLinks(currentPage)
	// fmt.Println(links)
	if err != nil {
		fmt.Println("Error pada page: ", currentPage, ":", err)
		return nil
	}

	for _, link := range links {
		if !visited[link] {
			newPath := append(path, link)
			result := depthLimitedSearch(link, targetPage, depthLimit-1, visited, newPath, total_visit)
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

func iterativeDeepeningWikirace(startPage string, targetPage string, maxDepth int) ([]string, int) {
	for depth := 1; depth <= maxDepth; depth++ {
		fmt.Println("Depth: ", depth-1, "...")
		visited := make(map[string]bool)
		total_visit := make(map[string]int)
		path := depthLimitedSearch(startPage, targetPage, depth, visited, []string{startPage}, total_visit)
		if path != nil {
			fmt.Println(path)
			total := 0
			for _, value := range total_visit {
				total += value
			}
			return path, total
		}
	}
	return nil, 0
} //returnya path hasil akhir, total page yang dicek seluruhnya

// func main() {
// 	startPage := "Joko_Widodo"
// 	targetPage := "Prabowo_Subianto"
// 	maxDepth := 10

// 	start := time.Now()

// 	path, total_visit := iterativeDeepeningWikirace(startPage, targetPage, maxDepth)
// 	duration := time.Since(start)
// 	fmt.Println("Hasil", path)
// 	if path != nil {
// 		fmt.Println("Path found:")
// 		for _, page := range path {
// 			fmt.Println(page)
// 		}
// 		fmt.Print("Total pages: ")
// 		fmt.Println(total_visit)
// 	} else {
// 		fmt.Println("Path not found karena depth limit.")
// 	}

// 	fmt.Println("Durasi:", duration)
// }
