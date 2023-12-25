package main

import (
	"fmt"
	"math"
)

func f(n, m, k, set int, memo map[[3]int]int64) int64 {
	if val, ok := memo[[3]int{n, m, set}]; ok { return val }
	cost := int64(n*m-k) * int64(n*m-k)

	if (set & 1) != 0 || (set & 2) != 0 {
		for i := 1; i < n; i++ {
			u := f(i, m, k, set&^8, memo)
			v := f(n-i, m, k, set&^4, memo)
			cost = int64(math.Min(float64(cost), float64(u+v)))
		}
	}

	if (set&4) != 0 || (set&8) != 0 {
		for i := 1; i < m; i++ {
			u := f(n, i, k, set&^2, memo)
			v := f(n, m-i, k, set&^1, memo)
			cost = int64(math.Min(float64(cost), float64(u+v)))
		}
	}

	memo[[3]int{n, m, set}] = cost
	return cost
}

func main() {
	var t int
	fmt.Scan(&t)

	for i := 0; i < t; i++ {
		var n, m, k int
		fmt.Scan(&n, &m, &k)

		memo := make(map[[3]int]int64)

		result := f(n, m, k, 0, memo)
		fmt.Println(result)
	}
}

