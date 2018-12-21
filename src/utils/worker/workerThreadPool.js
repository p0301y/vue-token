import WorkerThread from './WorkerThread'
// import WK from '../subWorker/worker'

const maxWorkers = navigator.hardwareConcurrency || 4
// const { PUBLIC_URL } = process.env
const subThreadJs = `/static/worker.js`
    // subThreadJs = '/worker/worker.js'

class WorkerThreadPool {
	constructor (threadNum) {
		let cache = [], workerLength

		workerLength = (threadNum && threadNum <= maxWorkers) ? threadNum : maxWorkers

		for (let i = 0; i < workerLength; i++) {
			// let worker = new WK(),
			let worker = new Worker(subThreadJs),
				workerThread = new WorkerThread({
					id: i,
					used: false,
					worker: worker,
					tasks: []
				})

			cache.push(workerThread)
		}

		this.cache = cache
	}

	allocateWorker (taskId) {
		let noParam = taskId === undefined || taskId === null || taskId === ''

		if (noParam) {
			throw new Error('分配worker需要指定taskId！')
		}

		let { cache } = this,
			len = cache.length,
			allTask = cache.map(({ tasks }) => tasks).reduce((prev, next) => {
				return prev.concat(next)
			}, []),
			alreadyRegistered = allTask.includes(taskId)

		if (alreadyRegistered) {
			throw new Error(`${taskId}已经分配woker！`)
		}

		// 未分配的优先
		for (let i = 0; i < len; i++) {
			let workerThread = cache[i],
				{ used } = workerThread

			if (!used) {
				workerThread.addTask(taskId)
				return workerThread
			}
		}

		// 已经分配，按平均值最小分配
		let taskSizeList = cache.map(({ tasks }) => tasks.length),
			min = Math.min.apply(null, taskSizeList),
			workerThread = cache.find(({ tasks }) => tasks.length === min)

		workerThread.addTask(taskId)
		return workerThread
	}
}

let workerThreadPool = new WorkerThreadPool()

export default workerThreadPool