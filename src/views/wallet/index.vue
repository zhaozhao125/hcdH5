<template>
  <transition :name="transitionName">
    <router-view class="router"></router-view>
  </transition>
</template>
<script>
import walletService from '@/service/wallet/'
import routerTransition from '@/mixins/router-transition'
export default {

  name: 'wallet-index',

  mixins: [routerTransition],

  beforeCreate() {
    Object.assign(this.$service, walletService)
  }
}

</script>
<style lang="scss">
</style>
