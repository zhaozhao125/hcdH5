import {
  fetch
} from '@/service/fetch'
import store from '@/store/'
import fillParams from '@/util/fillParams.js'

/**
 * 获取用户账户余额
 */
function getUserMoney() {
  let userId = store.getters.user.id
  return fetch(fillParams('/app/user/finance/userMoney/:userId/balance/info', {
    userId
  }))
}

/**
 * 获取用户资金流水
 * @param {Number} page
 */
function getUserMoneyDetail(page = 1) {
  let userId = store.getters.user.id
  return fetch(fillParams('/app/user/finance/userMoney/:userId/record/page', {
    userId
  }), {
    page,
    pageSize: 20
  }, {
    showLoading: false
  })
}

/**
 * 余额充值
 * @param {Number} amount 充值数额
 * @param {String} paymentPluginId alipayMobilePlugin 支付宝；weixinpayMobilePlugin 微信
 */
function balanceRecharge(amount, paymentPluginId) {
  if (Number(amount) <= 0) {
    return Promise.reject(new Error('支付金额不能小于零'))
  }
  let userId = store.getters.user.id
  return fetch('/app/user/finance/payment/recharge/init', {
    paymentType: 'balanceRecharge',
    payerId: userId,
    amount,
    paymentPluginId
  })
}

/**
 * 充值--充值金额列表
 */
function getRechargeList() {
  return fetch('/app/activity/rechargeRules', {}, 'get')
}

export default {
  getUserMoney,
  getUserMoneyDetail,
  balanceRecharge,
  getRechargeList
}
