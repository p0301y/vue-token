// function postMsg (data) {
// 	self.postMessage( data )
// }

// console.log('src: ')

// self.addEventListener('message' , handlerMainThreadMsg)

// function handlerMainThreadMsg (event) {
// 	let { data } = event
//     if ( data === null || data === undefined ) {
//         return console.warn( '主线程发送postMessage未定义参数' )
//     }

//     console.log('from outer: ', event)

//     setTimeout(() => {
//     	postMsg( {name: 'it is first', taskId: 1} )
//     }, 3000)
// }