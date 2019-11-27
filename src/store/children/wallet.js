export default {
  state: {
    refundData: {
      money: 0
    },
    payResult: {}
  },
  getters: {
    refundData: state => state.refundData,
    payResult: state => state.payResult
  },

  mutations: {
    setRefundData: function(state, data) {
      state.refundData = data
    },
    applyForRefund: function(state, data) {
      state.refundData.money = data.money
      state.refundData.type = data.type
      state.refundData.amountRate = data.amountRate
    },
    setRefundReason: function(state, reasons) {
      state.refundData.reasons = reasons
    },
    setPayResult: function(state, data) {
      state.payResult = data
    }
  }
}
