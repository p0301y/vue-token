class Thread {
	constructor (taskId) {
		this.task = []
		this.flag = false
		this.timer
		this.setLoop()
	}

	addTask (taskId) {
		let { task } = this,
			flag = task.includes(taskId)

		if (!flag) {
			task.push(taskId)
		}

		this.setLoop()
	}

	removeTask (taskId){
		let { task } = this,
			index = task.findIndex(item => item === taskId)

		if (index > -1) {
			task.splice(index, 1)
		}
	}

	setLoop () {
		let { task } = this,
			len = task.length

		this.timer = setInterval(() => {
			if (len > 0) {
				task.forEach(i => {
					let arr = createX(200)

					postMsg({taskId: i, list: arr})
				})
			}
		}, 3000)
	}

	stop () {
		let { timer } = this
		clearInterval(timer)
	}
}