// const couponIndex = () =>
//   import(/* webpackChunkName: "coupon" */ '@/views/coupon/')
// const coupon = () =>
//   import(/* webpackChunkName: "coupon" */ '@/views/coupon/coupon')
// const couponAvailable = () =>
//   import(/* webpackChunkName: "coupon" */ '@/views/coupon/children/available')
// const couponUsed = () =>
//   import(/* webpackChunkName: "coupon" */ '@/views/coupon/children/used')
// const couponExpired = () =>
//   import(/* webpackChunkName: "coupon" */ '@/views/coupon/children/expired')
import couponIndex from '@/views/coupon/'
import coupon from '@/views/coupon/coupon'
import couponAvailable from '@/views/coupon/children/available'
import couponUsed from '@/views/coupon/children/used'
import couponExpired from '@/views/coupon/children/expired'
import selectCoupon from '@/views/coupon/select-coupon'

export default {
  path: '/coupon',
  component: couponIndex,
  children: [{
    path: '/',
    name: 'coupon',
    meta: {
      title: '我的优惠券'
    },
    component: coupon,
    redirect: {
      name: 'couponAvailable'
    },
    children: [{
      path: 'available',
      name: 'couponAvailable',
      component: couponAvailable,
      meta: {
        title: '我的优惠券'
      }
    }, {
      path: 'used',
      name: 'couponUsed',
      component: couponUsed,
      meta: {
        title: '我的优惠券'
      }
    }, {
      path: 'expired',
      name: 'couponExpired',
      component: couponExpired,
      meta: {
        title: '我的优惠券'
      }
    }]
  }, {
    path: 'select',
    name: 'selectCoupon',
    component: selectCoupon,
    meta: {
      title: '我的优惠券'
    }
  }]
}
