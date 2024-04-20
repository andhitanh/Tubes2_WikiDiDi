package main 

import (
	"backend/bfs"
)

func main(){
	t := bfs.Newbst()
	t.Push(10)
	t.Push(5)
	t.Push(20)
	t.Push(2)
	t.Push(15)
	t.Push(21)
	t.Bfs()
}