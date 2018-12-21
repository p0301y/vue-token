importScripts('./thread.js')

let thread = new Thread()

function createX (num) {
    let arr = [],
        i = 0

    while (i < num) {
        arr.push(Math.floor(Math.random() * 100) + 50)
        i++
    }

    return arr
}

function postMsg (data) {
	self.postMessage( data )
}

self.addEventListener('message' , handlerMainThreadMsg)

function handlerMainThreadMsg (event) {
	let { data } = event
    if ( data === null || data === undefined ) {
        return console.warn( '主线程发送postMessage未定义参数' )
    }

    let { type, taskId } = data

    if (type === 'start' && taskId) {
        thread.addTask(taskId)
    }else if (type === 'close' && taskId) {
        thread.remove(taskId)
    }else if (type === 'stopAll') {
        thread.stop()
    }
}