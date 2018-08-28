import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/containers/Login'
import Home from '@/containers/Home'
import NotFound from '@/containers/NotFound'

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
      component: Home
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
