package main

import (
	"errors"
	"fmt"
	"net/url"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func getLinks(pageTitle string) ([]string, error) {
	urlString := "https://en.wikipedia.org/wiki/" + pageTitle
	doc, err := goquery.NewDocument(urlString)
	if err != nil {
		return nil, err
	}

	var links []string
	doc.Find("#mw-content-text a").Each(func(i int, s *goquery.Selection) {
		link, exists := s.Attr("href")
		if exists {
			// Parse the link to handle encoded characters properly
			parsedLink, err := url.Parse(link)
			if err != nil {
				fmt.Println("Error parsing link:", err)
				return
			}
			// fmt.Println(parsedLink)
			// Check if the link is a Wikipedia internal link and does not contain ":" or "."
			if parsedLink.Host == "" && strings.HasPrefix(parsedLink.Path, "/wiki/") && !strings.Contains(parsedLink.Path, ":") && !strings.Contains(parsedLink.Path, ".") {
				// Decode the path to handle encoded characters
				decodedPath, err := url.PathUnescape(parsedLink.Path)
				if err != nil {
					fmt.Println("Error decoding link path:", err)
					return
				}
				// fmt.Println((decodedPath)) matiin dulu ya
				links = append(links, strings.TrimPrefix(decodedPath, "/wiki/"))
			}
		}
	})
	if len(links) == 0 {
		return nil, errors.New("no valid links found")
	}
	return links, nil
}
