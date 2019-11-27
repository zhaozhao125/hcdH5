import Vue from 'vue'
import loading from './loading.vue'
// 构造出一个vue子类
const Indicator = Vue.extend(loading)
let instance
export default {
  // 指定默认值維空对象
  open(options = '加载中...') {
    // new一个对象
    if (!instance) {
      instance = new Indicator({
        el: document.createElement('div')
      })
    }
    // 第二次进 直接return
    if (instance.visible) return
    instance.title = options
    document.body.appendChild(instance.$el)
    // Vue.nextTick(() => {
    instance.visible = true
    // })
  },
  close() {
    if (instance) {
      instance.visible = false
    }
  }
}
