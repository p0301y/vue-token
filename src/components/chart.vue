<template>
	<div ref="chart" class="chart-item"></div>
</template>

<script>
	import echarts from 'echarts'
	import Task from '@/utils/worker/task'

	export default {
		name: 'chart',
		props: {
			taskId: {
				type: Number,
				default: Date.now()
			}
		},
		data () {
			return {
				chart: undefined,
				option: {},
				task: undefined
			}
		},
		methods: {
			initData (data) {
				this.option = {
					xAxis: {
				        type: 'category',
				        data: []
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [{
				        data: data,
				        type: 'line'
				    }]
				}
				this.drawEcharts()
			},
			initEcharts () {
				let dom = this.$refs.chart,
					{ taskId } = this,
					task = new Task(taskId)

				task.addEventListener((data) => {
					let { list, taskId: chartId } = data,
						{ taskId } = this

					if (chartId === taskId) {
						this.initData(list)
					}
				})

				task.postMsg({type: 'start', taskId: taskId})
				this.chart = echarts.init(dom)
				this.task = task
			},
			drawEcharts () {
				let { option, chart } = this
				chart.setOption(option)
			}
		},
		mounted () {
			this.initEcharts()
		},
		beforeDestroy () {
			this.task.destory()
		}
	}
</script>

<style lang="less" scoped>
	.chart-item{
		height: 200px;
		width: 500px;
		display: inline-block;
		margin: 0 20px 15px 0;
	}
</style>