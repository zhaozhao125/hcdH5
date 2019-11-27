import Vue from 'vue'
import Vuex from 'vuex'

import wallet from './children/wallet.js'
import invite from './children/invite.js'
import company from './children/company.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    from: null,
    version: 0,
    client: 0 // 1-ios 2-android
  },

  getters: {
    user: state => state.user,
    from: state => state.from,
    version: state => state.version,
    client: state => state.client
  },

  mutations: {
    setUser: function (state, user) {
      if (window.sa && user.id) {
        window.sa.login(user.id)
        window.sa.setProfile({
          phone: user.phone,
          client: user.client
        })
      }
      console.log('====setUser====', user)
      state.version = user.version
      state.client = user.client
      if (user && user.id) {
        state.user = user
      }
    },
    setFrom: function (state, data) {
      state.from = data
    },
    setVersion: function (state, data) {
      state.version = data
    },
    setClient: function (state, data) {
      state.client = data
    }
  },

  modules: {
    wallet,
    invite,
    company
  }
})
