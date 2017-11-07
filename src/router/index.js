import Vue from 'vue'
import Router from 'vue-router'

import user from './user/user'
import error from './error/error'
import admin from './admin/admin'

Vue.use(Router)
const redirectRouter = [{
  path: '/',
  redirect: {
    name: 'wechat'
  }
}]
const routes = [...redirectRouter, ...admin, ...user, ...error]
let router = new Router({
  routes,
  mode: 'history'
})

// 设置title
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({ name: from.name }) : next('/error') // 未定义路由条状到error
  } else {
    let routerTitle = ''
    if (to.meta.title) {
      routerTitle = to.meta.title
    } else {
      routerTitle = 'BaoyiBao'
    }
    document.title = routerTitle
    if (to.name === 'login' || to.name === 'error') {
      next()
    } else {
      next()
    }
  }
})
export default router
