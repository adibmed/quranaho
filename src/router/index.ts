import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chapter/:id',
    name: 'Chapter',
    component: () => import('../views/chapter/_id.vue')
  },
  {
    path: '/hizb/:id',
    name: 'Hizb',
    component: () => import('../views/hizb/_id.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
