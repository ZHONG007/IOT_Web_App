import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Device from '@/views/device'
import Register from '@/views/register'
import Resetpassword from '@/views/resetpassword'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/device',
        name: 'device manage',
        component: Device
      }

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/resetpassword',
    name: 'resetpassword',
    component: Resetpassword
  }

]

const router = new VueRouter({
  routes
})

export default router
