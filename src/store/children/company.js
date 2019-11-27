export default {
  state: {
    companySn: '',
    companyMoney: {}
  },

  getters: {
    companySn: state => state.companySn,
    companyMoney: state => state.companyMoney
  },

  mutations: {
    setCompanySn: (state, companySn) => {
      state.companySn = companySn
    },
    setCompanyMoney: function (state, data) {
      state.companyMoney = data
    }
  }
}
