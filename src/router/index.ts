import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Index from '@/views/Index.vue'

export enum ROUTERS {
  INDEX = '/',
  HOME = '/home',
  ABOUT = '/about',
  LOGIN = '/login',
  GAME = '/game',
  TEST = '/test'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTERS.INDEX,
      name: 'index',
      component: Index
    },
    {
      path: ROUTERS.HOME,
      name: 'home',
      component: HomeView
    },
    {
      path: ROUTERS.ABOUT,
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: ROUTERS.LOGIN,
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: ROUTERS.TEST,
      name: 'TEST',
      component: () => import('@/components/games/WebsocketTest.vue')
    }
  ]
})

export default router
