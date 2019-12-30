import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const lazyLoad =
  process.env.NODE_ENV === 'production'
    ? file => () => import(/* webpackChunkName: "[request]" */ `./views/${file}`)
    : file => require(`./views/${file}`).default

const routes = [
  {
    path: '/',
    component: lazyLoad('form'),
    name: 'form',
    meta: { title: 'form' },
  },
  // {
  //   path: '/test',
  //   component: lazyLoad('test'),
  //   name: 'test',
  //   meta: { title: 'test' },
  // },
  {
    path: '/test2',
    component: lazyLoad('test2'),
    name: 'test2',
    meta: { title: 'test2' },
  },
]

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes,
})

export default router