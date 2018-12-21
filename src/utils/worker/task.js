import workerThreadPool from './workerThreadPool'

class Task {
	constructor (taskId) {
		this.taskId = taskId
		this.thread = workerThreadPool.allocateWorker(taskId)
		this.callbacks = []
		this.handerListener = this.handerListener.bind(this)
		this._init()
	}

	_init () {
        let { thread } = this,
            { worker } = thread

        worker.addEventListener('message', this.handerListener)
    }

    handerListener (event) {
        let { taskId } = this,
            { data } = event,
            { taskId: threadTaskId } = data
        if (taskId !== threadTaskId) {
            return
        }

        this.notify(data)
    }

    postMsg (data) {
    	let { thread } = this,
            { worker } = thread

        worker.postMessage(data)
    }

    notify (data) {
        let { callbacks } = this
        for (let i = 0; i < callbacks.length; i++) {
            let func = callbacks[ i ]
            func(data)
        }
    }

    destory () {
    	let { taskId, thread } = this

    	thread.removeTask(taskId)
    }

    addEventListener (callback) {
        let { callbacks } = this,
            exists = callbacks.includes(callback)
        if (exists) {
            return
        }
        callbacks.push(callback)
    }

    removeEventListener (callback) {
        let { callbacks } = this,
            index = callbacks.findIndex(item => item === callback)
        if (index !== -1) {
            callbacks.splice(index, 1)
        }
    }
}

export default Task