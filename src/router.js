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
      component: () => import( /* webpackChunkName: "about" */ './views/profile/postbuy.vue')
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
      component: () => import('./views/database/database.vue')
    },
    {
      path: '/saved',
      name: 'savedfarms',
      component: () => import('./views/database/savedfarms.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import( /* webpackChunkName: "about" */ './views/profile/profile.vue')
    },
    {
      path: '/signup/:page',
      name: 'signup',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/profile/signup.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import( /* webpackChunkName: "about" */ './views/profile/signin.vue')
    },
    {
      path: '/forgot',
      name: 'forgotpassword',
      component: () => import( /* webpackChunkName: "about" */ './views/profile/forgotPassword.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import( /* webpackChunkName: "about" */ './views/faq.vue')
    },
  ]
})