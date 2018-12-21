<template>
	<div>
		<h1>charts list</h1>
		<div class="charts-list">
			<Chart
				v-for="(item, index) in charts"
				:taskId="item"
				:key="index"
			></Chart>
		</div>
	</div>
</template>

<script>
	import Chart from '@/components/chart'

	export default {
		name: 'web-worker',
		components: {
			Chart
		},
		data () {
			return {
				charts: [1, 2, 3, 4, 5, 6]
			}
		}
	}
</script>