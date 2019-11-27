import { fetch } from '@/service/fetch'
import store from '@/store/'

/**
 * 查询优惠券列表
 * @param {String} userCouponStatus 状态0:未使用 1:已使用 2:过期的优惠券
 * @param {Number} page 页码
 */
function getCouponList(userCouponStatus, page = 1) {
  let userId = store.getters.user.id
  return fetch('/app/coupons/user/page', {
    userId,
    userCouponStatus,
    page,
    pageSize: 20
  }, {
    showLoading: false
  })
}

/**
 * 获取订单支付时可用优惠券
 * @param {String} orderSn 订单sn
 */
function getOrderCoupon(orderSn, page = 1) {
  return fetch('/app/charging/orders/userCoupons', {
    orderSn,
    page,
    pageSize: 20
  }, {
    showLoading: false
  })
}

export default {
  getCouponList,
  getOrderCoupon
}
