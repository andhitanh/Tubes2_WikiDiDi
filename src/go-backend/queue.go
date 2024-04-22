package main

import (
	"fmt"
)

type Queue struct {
	arr        	[]string
	length     	int
}

func NewQueue() *Queue {
	return &Queue{
		arr:        make([]string, 0), // Initialize with an empty slice
		length:     0,
	}
}

func (q *Queue) QueueEmpty() bool {
	if q.length == 0 {
		return true
	}
	return false
}

func (q *Queue) Enqueue(val string) {
	q.arr = append(q.arr, val) 
	q.length++
}

func (q *Queue) Dequeue() string {
	if q.QueueEmpty() {
		fmt.Println("Queue kosong")
		return ""
	}
	val := q.arr[0]
	q.arr = q.arr[1:]
	q.length--
	return val
}
