<template>
	<ul>
		<li v-for="(item, index) in list" :key="index">
			{{ item.label }}
		</li>
		<li>{{ test }}</li>
	</ul>
</template>

<script>
	export default {
		name: 'test',
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data () {
			return {
				test: 'test'
			}
		},
		// mounted () {
		// 	this.test = 'mounted'
		// }
		created () {
			this.test = 'created'
		}
	}
</script>

<style lang="less" scoped>
	ul{
		// list-style: none;
		padding: 10px 0 0 0;
		text-align: left;
		width: 100px;
		margin: 0 auto;
	}
</style>