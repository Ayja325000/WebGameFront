import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Index from '@/views/Index.vue'

export enum ROUTERS {
  INDEX = '/',
  HOME = '/home',
  ABOUT = '/about',
  LOGIN = '/login',
  GAME = '/game',
  TEST = '/test',
  ROOM = '/room/:roomId/:userId',
  NOT_FOUND = '/404'
}

export const toRoomRouter = (roomId: string, userId: string) => {
  return (ROUTERS.ROOM as string).replace(':roomId', roomId).replace(':userId', userId);
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
    },
    {
      path: ROUTERS.ROOM,
      name: 'ROOM',
      component: () => import('@/views/RoomView.vue')
    },
    {
      path: ROUTERS.NOT_FOUND,
      name: '404',
      component: () => import('@/views/404View.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    }
  ]
})

export default router
