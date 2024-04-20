package bfs

import(
	"fmt"
)

func (n *node) Bfs() {
	root := n
	q := Newqueue(10) // bikin list antrian yg bakal diprint berikutnya setelah list diprint
	q.Push(root) // root adalah node yg pertama dipush ke queue
	for q.length != 0 { // selama antrian atau queue masih ada, lakukan prosedur berikut
		target := q.Pop() // pop node dan print node yg dipop
		fmt.Println(target.val)
			
		if target.left != nil { // kalau ada anak kiri, push ke dalam antrian
			q.Push(target.left)
		}
		if target.right != nil { // kalau ada anak kiri, push ke dalam antrian
			q.Push(target.right)
		}
	}
}

func (b *bst) Bfs() {
	b.root.Bfs()
}