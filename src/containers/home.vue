<template>
  <div class="t-wrapper">
    <div class="t-header">
      {{ content }}
      <button
        @click="test"
      >click me</button>
    </div>
    <div class="computed-test">
      {{ bingo }}
    </div>
    <!-- <div class="t-main">
      <div class="t-menu">
        <Menu :trees="trees" />
      </div>
      <div class="t-content">
        <router-view></router-view>
      </div>
    </div> -->
  </div>
</template>

<script>
import Menu from '@/components/Menu'

const menu = [
  {label: 'vue源码测试', url: 'vueCode'},
  {label: 'web worker测试', url: 'webWorker'}
]

export default {
  name: 'Home',
  components: {
    Menu
  },
  data () {
    return {
      content: '',
      // trees: menu
    }
  },
  computed: {
    bingo: function () {
      return this.content + ' bongo'
    }
  },
  methods: {
    init () {
      this.$http.get('/home').then(res => {
        this.content = res.content
        console.log('created is delay')
      })
    },
    test () {
      this.content = "i am comming"
    }
  },
  created () {
    this.init()
    console.log('home created: ', this)
  },
  mounted () {
    console.log('home mounted: ', this)
  }
}
</script>

<style scoped lang="less">
.t-wrapper{
  display: flex;
  min-height: 100%;
  flex-direction: column;
}
.t-header{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
}
.t-main{
  flex: 1;
  display: flex;
  flex-direction: row;

  .t-menu{
    width: 200px;
    background: #eee;
    overflow: auto;
  }
  .t-content{
    flex: 1;
  }
}
</style>
