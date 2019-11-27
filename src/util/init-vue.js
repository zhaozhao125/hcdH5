import loading from '@/components/loading/index'
import {
  Button,
  Toast,
  MessageBox,
  Spinner,
  InfiniteScroll
} from 'mint-ui'
import {
  fetch
} from '@/service/fetch.js'
import getBridge from '@/util/bridge.js'

export function initComponents(Vue) {
  // ==========mint-ui===========
  Vue.component(Button.name, Button)
  Vue.component(Spinner.name, Spinner)
  Vue.use(InfiniteScroll)
  Vue.prototype.$toast = Toast
  Vue.prototype.$message = MessageBox
  // ==========mint-ui===========
  Object.defineProperty(Vue.prototype, '$loading', {
    value: loading,
    writable: false
  })
}

export function initService(Vue) {
  Object.defineProperty(Vue.prototype, '$service', {
    value: {
      extend(obj) {
        if (typeof obj !== 'object') {
          throw new Error('argument of $service.extend must be an Object')
        }
        Object.assign(this, obj)
      }
    },
    writable: false
  })
  Object.defineProperty(Vue.prototype, '$fetch', {
    value: fetch,
    writable: false
  })
}

export function initFilter(Vue) {
  function addZero(param) {
    if (param < 10) {
      return '0' + param
    }
    return param
  }

  const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  // 时间格式化过滤器
  Vue.filter('moneyFilter', (value) => {
    let n = Number(value)
    if (isNaN(n)) {
      console.error('moneyFilter 参数不合法: ' + value)
      return '0.00'
    }
    return n.toFixed(2)
  })

  Vue.filter('timeFilter', (value, type) => {
    var date = new Date(value)
    if (isNaN(date.getDay())) {
      return '-'
    }
    let year = date.getFullYear()
    let month = addZero(date.getMonth() + 1)
    let week = date.getDay()
    let day = addZero(date.getDate())
    let hour = addZero(date.getHours())
    let minite = addZero(date.getMinutes())
    let second = addZero(date.getSeconds())
    if (type == 'cn') {
      return `${year}年${month}月${day}日 ${hour}:${minite}`
    } else if (type == 'week') {
      return `${year}.${month}.${day} ${weekArr[week]} ${hour}:${minite}:${second}`
    } else {
      return `${year}-${month}-${day} ${hour}:${minite}:${second}`
    }
  })
}

export function initBridge(Vue, store, cb) {
  getBridge()
    .then(bridge => {
      bridge.registerHandler('getPayResult', res => {
        try {
          let result = res
          if (typeof res === 'string') {
            result = JSON.parse(res)
          }
          store.commit('setPayResult', result)
        } catch (e) {
          alert(e)
        }
      })
      bridge.registerHandler('refreshWebPage', res => {
        console.log('====call refresh====')
        location.reload()
      })
      bridge.callHandler('getUser', {}, res => {
        try {
          let user
          if (typeof res === 'string') {
            user = JSON.parse(res)
          } else {
            user = res
          }
          console.log('====getUser====', user)
          if (user) {
            store.commit('setUser', {
              id: user.userId,
              phone: user.phone,
              client: user.client,
              uid: user.userId,
              token: user.token,
              version: Number(user.version)
            })
          }
          cb(bridge)
        } catch (e) {
          console.log('====用户信息获取失败--main====')
          console.dir(e)
          // alert('用户信息获取失败，请重新登录...')
          cb()
        }
      })
      bridge.callHandler(
        'pageRedirect', {
          name: 'index'
        },
        () => {}
      )
      Object.defineProperty(Vue.prototype, '$bridge', {
        value: bridge,
        writable: false
      })
      Vue.prototype.$callHandler = function callHandler(bridgeName, prarms = {}) {
        return new Promise((resolve, reject) => {
          bridge.callHandler(bridgeName, prarms, function (data) {
            // console.log('====data====', data, typeof data)
            if (typeof data === 'string') {
              let ret
              try {
                ret = JSON.parse(data)
              } catch (e) {
                console.log('====callHandler err====', e)
                ret = data
              }
              return resolve(ret)
            } else {
              return resolve(data)
            }
          })
        })
      }
    })
    .catch(err => {
      alert('bridge error')
      alert(err)
    })
}
