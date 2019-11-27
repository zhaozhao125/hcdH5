<template>
  <transition :name="transitionName">
    <router-view class="router"></router-view>
  </transition>
</template>
<script>
import invoiceService from '@/service/invoice/'
import routerTransition from '@/mixins/router-transition'
export default {

  name: 'invoice-index',

  mixins: [routerTransition],

  beforeCreate() {
    Object.assign(this.$service, invoiceService)
  }
}

</script>
<style lang="scss">
</style>
