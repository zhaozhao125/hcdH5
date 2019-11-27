export default {
  state: {
    inviteData: {}
  },

  getters: {
    inviteData: state => state.inviteData
  },

  mutations: {
    setInviteData: function(state, data) {
      state.inviteData = data
    }
  }
}
