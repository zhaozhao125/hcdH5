<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import routerTransition from '@/mixins/router-transition'
// import smoothscroll from 'smoothscroll-polyfill'
export default {
  name: 'app',

  mixins: [routerTransition],

  data() {
    return {

    }
  },

  mounted() {
    if (window.FastClick) {
      window.FastClick.attach(document.body)
    }
    // smoothscroll.polyfill()
  }

}
</script>
<style lang="scss">
@import '~@/assets/sass/base.scss';
@import '~@/assets/sass/common.scss';
@import '~@/assets/sass/cover.scss';
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  color: $color-dark;
}
</style>
