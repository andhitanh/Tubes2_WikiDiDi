package main

// package imports
import (
	"encoding/json" // mengelola data JSON
	"fmt"           // format I/O
	"log"           // pesan kesalahan
	"regexp"        // regex
	// "strings"
	"time"
	"github.com/gocolly/colly" // framework scraping
)

type Item struct {
	Title string `json:"link"`
	URL   string `json:"url"`
}

func timer(name string) func() {
	start := time.Now()
	fmt.Printf("Starting %s\n", name)
	return func() {
		fmt.Printf("End of %s, took %v\n", name, time.Since(start))
	}
}

func scrapeLinks(url string) ([]Item, error) {
	c := colly.NewCollector()

	var items []Item

	c.OnHTML("#mw-content-text a", func(e *colly.HTMLElement) {
		link := e.Attr("href")
		if isValidWikiURL(link) == false {
			item := Item{
				Title: e.Text,
				URL:   e.Request.AbsoluteURL(link),
			}
			items = append(items, item)
		}
	})

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	err := c.Visit(url)
	if err != nil {
		return nil, err
	}

	return items, nil
}

func isValidWikiURL(url string) bool {
	strings := regexp.MustCompile(`\Ahttps://id\.wikipedia\.org/wiki/[^#:/\.]+\z`)
	return strings.MatchString(url)
	// if strings.HasPrefix(url, "https://id.wikipedia.org/wiki/") {
	// 	// Check if the URL contains /wiki/ to ensure it's a Wikipedia link
	// 	if strings.Contains(url, "id.wikipedia.org/wiki/") {
	// 		if !strings.ContainsAny(url, "#:/.") {
	// 			return true
	// 		}
	// 	}
	// }
	// return false
	// if !strings.ContainsAny(url, "#:/.%") {
	// 	if !Contains(urls, url) && url != Convert(strings.url) {
	// 		return true
	// 	}
	// }
}

func printTitles(links []Item) {
	for _, link := range links {
		fmt.Println(link.Title)
	}
}

func main() {
	defer timer("main")()

	url := "https://id.wikipedia.org/wiki/Melati"
	items, err := scrapeLinks(url)
	if err != nil {
		log.Fatal(err)
	}

	// printTitles(items)

	data, err := json.MarshalIndent(items, "", " ")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string(data))
}

// func main() {
// 	defer timer("main")()
// 	c := colly.NewCollector() // inisialisasi kolektor mode scraping sinkronus(berturu-turut) -- konfigurasi awal

// 	items := []Item{}

// 	// menentukan callback yang akan dipanggil ketika ada elemen HTML <a>
// 	// mengsmbil judul dan url setiap tautan
// 	c.OnHTML("a", func(e *colly.HTMLElement) {
// 		title := e.Text
// 		if title != "" {
// 			link := e.Attr("href")
// 			item := Item{
// 				Title: title,
// 				URL:   e.Request.AbsoluteURL(link),
// 			}
// 			items = append(items, item)
// 		}
// 	})

// 	// menentukan callback yang akan dipanggil ketika permintaan selesai sebelum permintaan HTTP dilakukan
// 	c.OnRequest(func(r *colly.Request) {
// 		fmt.Println("Visiting", r.URL.String()) // cetak URL yang dikunjungi
// 	})

// 	c.Visit("https://id.wikipedia.org/wiki/Melati")

// 	data, err := json.MarshalIndent(items, "", " ") // mengonversi data ke JSON
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	fmt.Println(string(data))
// }
