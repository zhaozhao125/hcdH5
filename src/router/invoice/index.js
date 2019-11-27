
// const invoiceIndex = () =>
// import(/* webpackChunkName: "invoice" */ '@/views/invoice/')
// const invoice = () =>
// import(/* webpackChunkName: "invoice" */ '@/views/invoice/invoice')
// const invoiceList = () =>
// import(/* webpackChunkName: "invoice" */ '@/views/invoice/list')
// const invoiceHistory = () =>
// import(/* webpackChunkName: "invoice" */ '@/views/invoice/history')
// const invoiceRules = () =>
// import(/* webpackChunkName: "invoice" */ '@/views/invoice/rules')
// const applyInvoice = () =>
// import(/* webpackChunkName: "invoice" */ '@/views/invoice/list/apply-form')
// const invoiceDetail = () =>
// import(/* webpackChunkName: "invoice" */ '@/views/invoice/history/detail')
import invoiceIndex from '@/views/invoice/'
import invoice from '@/views/invoice/invoice'
import invoiceList from '@/views/invoice/list'
import invoiceHistory from '@/views/invoice/history'
import invoiceRules from '@/views/invoice/rules'
import applyInvoice from '@/views/invoice/list/apply-form'
import invoiceDetail from '@/views/invoice/history/detail'

export default {
  path: '/invoice',
  component: invoiceIndex,
  children: [{
    path: '/',
    name: 'invoice',
    meta: {
      title: '开具发票'
    },
    component: invoice,
    redirect: {
      name: 'invoiceList'
    },
    children: [{
      path: 'list',
      name: 'invoiceList',
      component: invoiceList,
      meta: {
        title: '开具发票'
      }
    }, {
      path: 'history',
      name: 'invoiceHistory',
      component: invoiceHistory,
      meta: {
        title: '开具发票'
      }
    }, {
      path: 'rules',
      name: 'invoiceRules',
      component: invoiceRules,
      meta: {
        title: '开具发票'
      }
    }]
  }, {
    path: 'apply',
    name: 'applyInvoice',
    component: applyInvoice,
    meta: {
      title: '开具发票'
    }
  }, {
    path: 'detail',
    name: 'invoiceDetail',
    component: invoiceDetail,
    meta: {
      title: '开票详情'
    }
  }]
}
