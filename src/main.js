// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/less/common.less'
import App from './App'
import router from './router'
import { host } from './utils/http'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = host

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
