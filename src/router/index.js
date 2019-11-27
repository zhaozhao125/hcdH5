import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/'
import { Toast } from 'mint-ui'
import loading from '@/components/loading'
import userCenter from './user-center/'
import wallet from './wallet/'
import invoice from './invoice/'
import coupon from './coupon'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'userCenter'
      }
    },
    wallet,
    userCenter,
    invoice,
    coupon,
  ]
})

router.pathStack = []
// 路由拦截
router.beforeEach((to, from, next) => {
  loading.open()
  if (!to.meta.noAuth && (!store.getters.user || !store.getters.user.id)) {
    console.log(
      '====用户信息获取失败--router====',
      to.meta.noAuth,
      store.getters.user
    )
    Toast('请先登录')
    if (store.getters.version >= 315) {
      console.log('====login====')
      Vue.prototype.$callHandler('login')
    } else {
      console.log('====finishWebView====')
      setTimeout(() => {
        Vue.prototype.$callHandler('finishWebView')
      }, 1500)
    }
    return
  }
  to.query.from = from.name
  if (to.params.isReplace) {
    // router.pathStack[router.pathStack.length - 1] = from
  } else if (
    router.pathStack.length &&
    router.pathStack[router.pathStack.length - 1].fullPath == to.fullPath
  ) {
    to.query.direction = 'back'
    router.pathStack.pop()
    if (
      (from.name == 'userCenter' && router.pathStack.length > 1 && to.name) ||
      router.pathStack.length === 0
    ) {
      Vue.prototype.$callHandler('backToHome')
      next(false)
    }
  } else {
    to.query.direction = 'forward'
    router.pathStack.push(from)
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (Vue.prototype.$callHandler) {
    Vue.prototype.$callHandler('pageRedirect', {
      title: to.meta.title || document.title,
      url: to.fullPath,
      name: to.name
    })
  }
  next()
})

router.afterEach(function (to) {
  loading.close()
})

export default router
