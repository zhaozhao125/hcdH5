<template>
  <div class="select-coupon">
    <div class="top-bar position-fixed width-100 top-0 flex-row justify-content-between align-items-center fz-12 zindex-99 bg-white pl-5 pr-5" @click="handleNoUseCoupon">
      <div>暂不使用优惠券</div>
      <div class="checkbox ml-3 mr-3" :class="{checked: !selectedCouponId}">
        <div class="checkbox-core"></div>
      </div>
    </div>
    <div class="coupon-list-container pd-3">
      <div v-if="couponList && !couponList.length" class="no-data">
        <img src="@/assets/img/no-data.png" alt="">
        <p>暂无优惠券</p>
      </div>
      <ul v-else v-infinite-scroll="loadMore" infinite-scroll-disabled="infiniteScrollDisabled" infinite-scroll-distance="10">
        <li v-for="(item, index) in couponList" :key="index" class="bg-white mb-3" :class="{disabled: !item.canUse}" @click="handleSelectCoupon(item)">
          <div class="coupon-item">
            <div class="top-content color-white flex-row align-items-center">
              <div class="left-part fz-18 text-center">
                <span>
                  <strong class="font-weight-normal">{{item.discount}}</strong>{{item.unit}}
                </span>
              </div>
              <div class="right-part flex-1">
                <h5 class="fz-16">{{item.couponsName}}</h5>
                <p class="date fz-10 mt-1">{{item.beginDate}} - {{item.expireDate}}</p>
                <p class="tip fz-10 mt-1">
                  <span>{{item.discountDesc}}</span>
                </p>
              </div>
              <div class="checkbox reverse ml-3 mr-3" :class="selectedCouponId==item.userCouponId?'checked':'invisible'">
                <div class="checkbox-core"></div>
              </div>
            </div>
            <div class="bottom-content flex-row align-items-center">
              <span class="fz-12 ml-5">{{item.detail}}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="common-loading" v-show="loading && !allLoaded">
        <mt-spinner type="snake"></mt-spinner>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      couponList: null,
      orderSn: null,
      selectedCouponId: null,
      lockClick: false,
      page: 1,
      loading: false,
      allLoaded: false,
    }
  },

  computed: {
    infiniteScrollDisabled() {
      return this.loading || this.allLoaded
    }
  },

  created() {
    this.orderSn = this.$route.query.orderSn
    this.selectedCouponId = this.$route.query.couponId
  },

  methods: {
    loadMore() {
      if (this.orderSn) {
        console.log('====if====')
        this.loading = true
        this.$service.getOrderCoupon(this.orderSn, this.page).then(res => {
          let result = res.data
          if (!this.couponList) {
            this.couponList = []
          }
          this.couponList = this.couponList.concat(result.records)
          if (result.totalPages <= this.page) {
            this.allLoaded = true
          } else {
            this.page++
          }
          this.loading = false
        }).catch(err => {
          this.loading = false
          this.allLoaded = true
        })
      } else {
        console.log('====else====')
        this.$toast('订单ID无效')
        this.loading = false
        this.allLoaded = true
      }
    },
    handleSelectCoupon(couponItem) {
      if (this.lockClick) {
        return
      }
      if (couponItem.canUse) {
        this.selectedCouponId = couponItem.userCouponId
        this.lockClick = true
        setTimeout(() => {
          this.$callHandler('selectCoupon', {
            couponId: this.selectedCouponId,
            couponName: couponItem.couponsName
          })
        }, 300)
      }
    },
    handleNoUseCoupon() {
      if (this.lockClick) {
        return
      }
      this.selectedCouponId = null
      this.lockClick = true
      setTimeout(() => {
        this.$callHandler('selectCoupon', {
          couponId: '',
          couponName: ''
        })
      }, 300)
    }
  }
}
</script>

<style lang="scss">
.select-coupon {
  .top-bar {
    height: px2vw(40);
    border-bottom: 1px solid #efefef;
  }
  .coupon-list-container {
    margin-top: px2vw(40);
  }
}
</style>
