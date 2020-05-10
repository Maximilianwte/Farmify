import Vue from 'vue'
import Router from 'vue-router'
import Front from './views/front.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
      path: '/',
      name: 'home',
      component: Front
    },
    {
      path: '/menu',
      name: 'menu',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/MobileMenu.vue')
    },
    {
      path: '/buy',
      name: 'buy',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/postbuy.vue')
    },
    {
      path: '/imprint',
      name: 'imprint',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/imprint.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('./views/map.vue')
    },
    {
      path: '/database',
      name: 'database',
      component: () => import('./views/database.vue')
    },
    {
      path: '/saved',
      name: 'savedfarms',
      component: () => import('./views/savedfarms.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import( /* webpackChunkName: "about" */ './views/profile.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import( /* webpackChunkName: "about" */ './views/signup.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import( /* webpackChunkName: "about" */ './views/signin.vue')
    },
    {
      path: '/forgot',
      name: 'forgotpassword',
      component: () => import( /* webpackChunkName: "about" */ './views/forgotPassword.vue')
    },
  ]
})