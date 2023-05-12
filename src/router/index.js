import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/albumdetail',
    name: 'AlbumDetail',
    component: () => import('../views/AlbumDetail.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/reg',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      hiddenHeader: true,
      hiddenFooter: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      hiddenHeader: true,
      hiddenFooter: true,
    }
  },
  {
    path: '/player',
    name: 'Player',
    component: () => import('../views/Player.vue'),
    meta: {
      hiddenHeader: true,
      hiddenFooter: true,
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/album',
    name: 'Album',
    component: () => import('../views/Album.vue'),
  },
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
