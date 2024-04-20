package bfs

import(
	"fmt"
)

type node struct {
	val int
	left *node
	right *node
}

// ctor binsearchtree
func Newnode(val int) *node {
	return &node{
		val: val,
		left : nil,
		right: nil,
	}
}

// push data ke tree
func (n *node) Push(val int) { // kl value lebih kecil dari root, taro di kiri
	if val == n.val {
		return // biar data unique
	} else if val < n.val {
		if n.left == nil {
			n.left = Newnode(val)
		} else {
			n.left.Push(val)
		}
	} else {
		if n.right == nil {
			n.right = Newnode(val)
		} else {
			n.right.Push(val)
		}
	}
}

func (n *node) preOrdertraverse() {
	if n == nil{
		return
	} 
	fmt.Println(n.val)
	n.left.preOrdertraverse()
	n.right.preOrdertraverse()
}

func (n* node) height() int {
	if n == nil { // sudah sampai dasar/leaf
		return 0
	}
	left := n.left.height()
	right := n.right.height()

	if left > right {
		return left + 1
	} 
	return right + 1
}

// BINARY SEARCH TREE

type bst struct {
	root *node
	height int
}

func Newbst() *bst{
	return &bst {
		root : nil,
		height: 0,
	}
}

func (b *bst) Initiate(val int) {
	b.root = Newnode(val)
}

func (b *bst) Push (val int) {
	if b.root == nil {
		b.Initiate(val)
		return
	}
	b.root.Push(val)
}

func (b *bst) TreeHeight() int {
	return b.root.height()
}

func (b *bst) PreOrdertraverse() {
	b.root.preOrdertraverse()
}
