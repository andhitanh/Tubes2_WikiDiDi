package main

// package imports
import (
	"encoding/json" // mengelola data JSON
	"fmt"           // format I/O
	"log"           // pesan kesalahan
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

func main() {
	defer timer("main")()
	c := colly.NewCollector() // inisialisasi kolektor mode scraping sinkronus(berturu-turut) -- konfigurasi awal

	items := []Item{}

	// menentukan callback yang akan dipanggil ketika ada elemen HTML <a>
	// mengsmbil judul dan url setiap tautan
	c.OnHTML("a", func(e *colly.HTMLElement) {
		title := e.Text
		if title != "" {
			link := e.Attr("href")
			item := Item{
				Title: title,
				URL:   e.Request.AbsoluteURL(link),
			}
			items = append(items, item)
		}
	})

	// menentukan callback yang akan dipanggil ketika permintaan selesai sebelum permintaan HTTP dilakukan
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String()) // cetak URL yang dikunjungi
	})

	c.Visit("https://id.wikipedia.org/wiki/Melati")

	data, err := json.MarshalIndent(items, "", " ") // mengonversi data ke JSON
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string(data))
}
