import { fetch } from '@/service/fetch'
import store from '@/store/'

/**
 * 查询可开发票列表
 * @param {Number} page 页码
 */
function getAvailableInvoiceList(page, pageSize = 20) {
  let uid = store.getters.user.id
  return fetch('/app/serviceUser/invoice/enableInvoiceOrders', {
    page,
    pageSize,
    orderType: 'personal',
    uid
  })
}

/**
 * 查询开票历史
 * @param {Number} page 页码
 */
function getInvoiceHistory(page) {
  let uid = store.getters.user.id
  return fetch('/app/serviceUser/invoice/historyInvoices', {
    page,
    uid
  }, {
    showLoading: false
  })
}

function confirmInvoice(orderIds) {
  let uid = store.getters.user.id
  console.log('====orderIds====', orderIds)
  if (Array.isArray(orderIds)) {
    orderIds = orderIds.join(',')
  }
  return fetch('/app/serviceUser/invoice/apply/preview', {
    uid,
    orderIds,
    orderType: 'personal'
  })
}

function submitInvoice(params) {
  let uid = store.getters.user.id
  params.uid = uid
  return fetch('/app/serviceUser/invoice/apply', params)
}

function getInvoiceDetail(sn) {
  return fetch('/app/serviceUser/invoice/app/detail', {
    sn
  })
}

export default {
  getAvailableInvoiceList,
  getInvoiceHistory,
  confirmInvoice,
  submitInvoice,
  getInvoiceDetail
}
