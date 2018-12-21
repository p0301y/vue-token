<template>
	<div>
		<!-- vue code -->
		<button
			class="btn"
			@click="meHandler"
		>
			click me!
		</button>
		<Test v-if="flag" :list="list"/>
	</div>
</template>

<script>
	import Test from './test.vue'

	const list = [
			{label: '秋天'},
			{label: '冬至'}
		]

	export default {
		name: 'vue-code',
		components: {
			Test
		},
		data () {
			return {
				list: list,
				flag: false
			}
		},
		methods: {
			meHandler () {
				let { flag } = this

				this.flag = !flag
			}
		}
	}
</script>

<style lang="less" scoped>
	.btn{
		width: 60px;
		margin-top: 20px;
		height: 20px;
	}
</style>