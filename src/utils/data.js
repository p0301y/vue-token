function createX (num) {
	let arr = [],
		i = 0

	while (i < num) {
		arr.push(Math.floor(Math.random() * 100) + 50)
		i++
	}

	return arr
}

export { createX }