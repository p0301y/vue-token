<template>
	<ul class="menu-wrap">
		<li
			v-for="(item, index) in trees"
			:class="isActive(item.url)"
			:key="index"
			@click="goPage(item.url)"
		>
			{{ item.label }}
		</li>
		<!-- <span>{{ activeClass }}</span> -->
	</ul>
</template>

<script>
	export default {
		name: 'side-menu',
		props: {
			trees: {
				type: Array,
				default: () => []
			}
		},
		data () {
			return {
				activeClass: '1234',
				currentType: ''
			}
		},
		watch: {
			$route: {
				handler (val, oldVal) {
					if (val === oldVal) {
						return
					}

					let { path } = val
					this.setCurrentType(path)
				},
				immerdiate: true
			}
		},
		methods: {
			goPage (url) {
				this.$router.push({path: url})
			},
			setCurrentType (val) {
				this.currentType = val
			},
			isActive (url) {
				let { currentType } = this,
					reg = new RegExp(url)

				// console.log('1234')
				return reg.test(currentType) ? 'active' : ''
			},
			init () {
				// 手动设置默认值
				let { trees } = this

				this.currentType = trees[0].url
			}
		},
		updated () {
			console.log(Math.floor(Math.random() * 100))
		},
		created () {
			this.init()
			// console.log('created: ', this)
		},
		mounted () {
			// console.log('mounted: ', this)
		}
	}
</script>

<style lang="less" scoped>
	.menu-wrap{
		li {
			height: 40px;
		    font-size: 14px;
		    display: flex;
		    align-items: center;
		    padding: 0 20px;

		    &:hover{
		    	cursor: pointer;
		    	font-weight: 500;
		    }
		}

		.active{
			background: #ffffff;
			color: #b72626;
		}
	}
</style>