<template>
  <transition :name="transitionName">
    <router-view class="router"></router-view>
  </transition>
</template>
<script>
import couponService from '@/service/coupon/'
import routerTransition from '@/mixins/router-transition'
export default {

  name: 'coupon-index',

  mixins: [routerTransition],

  beforeCreate() {
    Object.assign(this.$service, couponService)
  }
}

</script>
<style lang="scss">
</style>
