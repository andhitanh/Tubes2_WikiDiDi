package bfs

import(
	"fmt"
)

type queue struct {
	arr []*node
	readIndex int
	writeIndex int
	length int
	capacity int
}

// ctor
func Newqueue(capacity int) *queue {
	return &queue{
		arr:	make([]*node, capacity),
		readIndex: 0,
		writeIndex: 0,
		length: 0,
		capacity: capacity,
	}
}

func (c *queue) Push(val *node) {
	if c.length == c.capacity {
		fmt.Println("CIRCULAR BUFFER FULL")
		return
	}
	index := c.writeIndex % c.capacity
	c.arr[index] = val
	c.writeIndex++
	c.length++
}

func (c *queue) Pop() *node {
	if c.readIndex == c.writeIndex {
		fmt.Println("CIRCULAR BUFFER EMPTY")
		return nil
	}
	index := c.readIndex % c.capacity
	popped := c.arr[index]
	c.arr[index] = nil
	c.readIndex++
	c.length--
	return popped
}

func (c *queue) Print(){
	for _, el := range c.arr{
		fmt.Println(el)
	}
}