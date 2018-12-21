class WorkerThread {
	constructor ({ id, worker, used = false, tasks = [] }) {
		Object.assign(this, {
		    id,
		    worker,
		    used,
		    tasks
		})
	}

	addTask (taskId) {
	    let noTaskId = taskId === undefined || taskId === null || taskId === ''
	    if (noTaskId) {
	        return
	    }
	    this.used = true
	    this.tasks.push(taskId)
	}

	removeTask (taskId) {
	    let noTaskId = taskId === undefined || taskId === null || taskId === ''
	    if (noTaskId) {
	        return
	    }
	    let { tasks } = this,
	        index = tasks.findIndex(id => id === taskId),
	        exists = index !== -1
	    if (exists) {
	        tasks.splice(index, 1)
	        let size = tasks.length
	        this.used = size !== 0
	    }
	}
}

export default WorkerThread