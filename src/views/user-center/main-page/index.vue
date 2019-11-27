<template>
  <div class="user-center">
    <div class="user-info bg-white flex-row align-items-center pl-5 mb-3">
      <img class="avator mr-5" src="@/assets/img/logo.png" alt="">
      <div class="tel fz-18">{{user.phone | phoneFilter}}</div>
    </div>
    <div class="menu bg-white color-dark pl-5 pr-5 fz-17">
      <mt-cell title="账户余额" :is-link="true" :value="userMoney+'元'" to="/wallet"></mt-cell>
      <mt-cell title="我的订单" :is-link="true" @click.native="handleOpenOrder"></mt-cell>
      <mt-cell title="我的优惠券" :is-link="true" to="/coupon"></mt-cell>
      <mt-cell title="设置" :is-link="true" to="/user-center/settings"></mt-cell>
    </div>
  </div>
</template>

<script>
import { Cell } from 'mint-ui'
export default {
  components: {
    mtCell: Cell
  },

  data() {
    return {
      userMoney: '-'
    }
  },

  computed: {
    user() {
      return this.$store.getters.user
    }
  },

  created() {
    this.$service.getUserMoney().then(res => {
      console.log('====res====', res)
      this.userMoney = res.data.userMoney
    })
  },

  filters: {
    phoneFilter(phone) {
      return phone.substr(0, 3) + '****' + phone.substr(-4, 4)
    }
  },

  methods: {
    handleOpenOrder() {
      console.log('====slslsl====')
      this.$callHandler('openOrderList')
    }
  }
}
</script>

<style lang="scss">
.user-center {
  .user-info {
    height: 25vw;
    .avator {
      width: px2vw(60);
      height: px2vw(60);
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      // border: 2px solid #ffffff;
      box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
    }
  }
  .menu {
    .mint-cell-value {
      color: #262626;
      font-size: px2vw(17);
    }
    .mint-cell {
      &:last-of-type {
        border: 0;
      }
    }
  }
}
</style>
