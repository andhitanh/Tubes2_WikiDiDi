package main

import (
	"errors"
	"fmt"
	"net/url"
	"strings"
	"sync"

	"github.com/PuerkitoBio/goquery"
)

// buat struktur data node yang menggambarkan daun pada pohon
type Node struct {
	Name     string
	Children []*Node
	Parent   *Node
}

var cache = struct {
	sync.RWMutex
	data map[string][]string
}{data: make(map[string][]string)}

func getLinksCaching(pageTitle string) ([]string, error) {
	// cek apakah tersimpan di cache memory
	cache.RLock()
	links, found := cache.data[pageTitle]
	cache.RUnlock()
	if found {
		return links, nil
	}

	urlString := "https://en.wikipedia.org/wiki/" + pageTitle
	doc, err := goquery.NewDocument(urlString)
	if err != nil {
		return nil, err
	}

	var validLinks []string
	doc.Find("#mw-content-text a").Each(func(i int, s *goquery.Selection) {
		link, exists := s.Attr("href")
		if exists {
			parsedLink, err := url.Parse(link)
			if err != nil {
				fmt.Println("Error parsing link:", err)
				return
			}

			if parsedLink.Host == "" && strings.HasPrefix(parsedLink.Path, "/wiki/") && !strings.Contains(parsedLink.Path, ":") && !strings.Contains(parsedLink.Path, ".") && !strings.Contains(parsedLink.Path, "%"){
				decodedPath, err := url.PathUnescape(parsedLink.Path)
				if err != nil {
					fmt.Println("Error decoding link path:", err)
					return
				}
				validLinks = append(validLinks, strings.TrimPrefix(decodedPath, "/wiki/"))
			}
		}
	})

	if len(validLinks) == 0 {
		return nil, errors.New("no valid links found")
	}

	cache.Lock()
	cache.data[pageTitle] = validLinks
	cache.Unlock()

	return validLinks, nil
}

func depthLimitedSearch(currentPage *Node, targetPage *Node, depthLimit int, visited map[string]bool, totalVisit map[string]int, parentNode *Node) *Node {
	// hentikan rekursif jika batas kedalaman sudah mencapai nol
	if depthLimit == 0 {
		return nil
	}

	// hentikan rekursif ketika laman yang diperiksa sama dengan target laman
	if currentPage.Name == targetPage.Name {
		return currentPage
	}

	// tandai laman yang telah terkunjungi
	visited[currentPage.Name] = true
	// hitung berapa laman yang telah terkunjungi
	totalVisit[currentPage.Name]++

	// fmt.Println(currentPage.Name)

	// melakukan web scrapping
	links, err := getLinksCaching(currentPage.Name)
	if err != nil {
		fmt.Println("Error pada page:", currentPage.Name, ":", err)
		return nil
	}

	// iterasi setiap link yang didapatkan dari scrapping
	for _, link := range links {
		if !visited[link] {
			childNode := &Node{Name: link, Parent: parentNode}
			parentNode.Children = append(parentNode.Children, childNode)
			// panggil secara rekursif untuk kedalaman selanjutnya
			result := depthLimitedSearch(childNode, targetPage, depthLimit-1, visited, totalVisit, childNode)
			if result != nil {
				return result
			}
		}
	}

	// ubah tanda menjadi false ketika tidak menjadi path hasil
	visited[currentPage.Name] = false
	return nil

	// output berupa alamat node target page yang sudah memiliki parent
	// apabila tidak ditemukan kembalikan nil
}

func iterativeDeepeningWikirace(startPage string, targetPage string, maxDepth int) ([]string, int) {
	// ubah masukan startPage dan targetPage menjadi sebuah Node
	startNode := &Node{Name: startPage}
	targetNode := &Node{Name: targetPage}
	
	// inisiasi
	visited := make(map[string]bool)
	totalVisit := make(map[string]int)
	rootNode := &Node{Name: startNode.Name}

	var totalVisitedPages int

	// iterasi fungsi DLS untuk setiap kedalaman hingga maxDepth
	for depth := 1; depth <= maxDepth; depth++ {
		fmt.Println("Depth: ", depth)
		result := depthLimitedSearch(startNode, targetNode, depth, visited, totalVisit, rootNode)
		if result != nil {
			totalVisitedPages = len(totalVisit)
			var path []string
			current := result
			for current != nil {
				path = append([]string{current.Name}, path...)
				current = current.Parent
			}
			return path, totalVisitedPages
		}
	}

	return nil, totalVisitedPages
	// output berupa slice of string yang berisi daftar laman hasil pencarian dan total laman yang telah dikunjungi
}

