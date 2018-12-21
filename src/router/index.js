import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/containers/Login'
import Home from '@/containers/Home'
import NotFound from '@/containers/NotFound'

import WebWorker from '@/containers/home/webWorker'
import VueCode from '@/containers/home/vueCode'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // redirect: '/home/vueCode',
      children: [
        {
          path: 'webWorker',
          component: WebWorker
        },
        {
          path: 'vueCode',
          component: VueCode
        }
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
