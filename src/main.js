// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import { initComponents, initService, initFilter, initBridge } from '@/util/init-vue'

initComponents(Vue)
initService(Vue)
initFilter(Vue)
initBridge(Vue, store, () => {
  new Vue({
    el: '#app',
    router,
    store,
    components: {
      App
    },
    template: '<App/>'
  })
})

Vue.config.productionTip = false

/* eslint-disable no-new */
if (process.env.NODE_ENV !== 'production') {
  store.commit('setUser', {
    client: '1',
    version: 314,
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0OCIsInVzZXJfdHlwZSI6ImNsaWVudF91c2VyIiwiaWF0IjoxNTQyNjgyMzAwLCJzdWIiOiLotbXluIjlgoUiLCJleHAiOjE1NDc4NjYzMDB9.c6k7z8xYVKx-G_2AMmzrXPMmbVTWH5YHKqP_ZhIOVsY',
    id: 48,
    // id: 23,
    phone: '18860387916'
  })
  new Vue({
    el: '#app',
    router,
    store,
    components: {
      App
    },
    template: '<App/>'
  })
}

document.getElementById('loading-wrapper').remove()
