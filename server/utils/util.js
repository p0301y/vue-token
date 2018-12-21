// exports.createX = (num) => {
// 	return new Promise((resolve, reject) => {
// 		let arr = [],
// 			i = 0

// 		while (i < num) {
// 			arr.push(Math.floor(Math.random() * 100) + 50)
// 			i++
// 		}

// 		setTimeout( () => resolve(arr), 800)
// 	}) 
// }

exports.createX = (num) => {
	let arr = [],
		i = 0

	while (i < num) {
		arr.push(Math.floor(Math.random() * 100) + 50)
		i++
	}

	return arr
}