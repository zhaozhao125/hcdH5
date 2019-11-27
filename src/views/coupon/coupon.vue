<template>
  <div class="coupon">
    <div class="navbar position-fixed width-100 top-0 flex-row justify-content-around align-items-center fz-12 zindex-99 bg-white">
      <div class="nav-item height-100 pl-3 pr-3"
           :class="{active: currentRoute == 'couponAvailable'}"
           @click="goTo('couponAvailable')">待使用</div>
      <div class="nav-item height-100 pl-3 pr-3"
           :class="{active: currentRoute == 'couponUsed'}"
           @click="goTo('couponUsed')">已使用</div>
      <div class="nav-item height-100 pl-3 pr-3"
           :class="{active: currentRoute == 'couponExpired'}"
           @click="goTo('couponExpired')">已失效</div>
    </div>
    <keep-alive>
      <router-view class="coupon-container"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    goTo(name) {
      this.$router.replace({
        name,
        params: {
          isReplace: true
        }
      })
    }
  },

  computed: {
    currentRoute() {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss">
.coupon {
  .navbar {
    height: px2vw(40);
    border-bottom: 1px solid #efefef;
  }
  .nav-item {
    line-height: px2vw(40);
    &.active {
      font-size: px2vw(14);
      color: $color-main;
    }
  }
  .coupon-container {
    height: 100%;
    margin: 0;
    overflow: auto;
    padding-top: px2vw(40);
    -webkit-overflow-scrolling: touch;
  }
}
</style>
