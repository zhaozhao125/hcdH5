<template>
  <div class="coupon-list-container pd-3" v-infinite-scroll="loadMore" infinite-scroll-disabled="infiniteScrollDisabled" infinite-scroll-distance="10">
    <div v-if="couponList && !couponList.length" class="no-data">
      <img src="@/assets/img/no-data.png" alt="">
      <p>暂无优惠券</p>
    </div>
    <ul v-else>
      <li v-for="(item, index) in couponList" :key="index" class="bg-white mb-3" :class="{disabled: couponType != 0}">
        <div class="coupon-item">
          <div class="top-content color-white flex-row align-items-center fz-18">
            <div class="left-part text-center" :class="calcFontSize(item)">
              <span v-if="item.type==1">
                <strong class="font-weight-normal">{{item.money}}</strong>元
              </span>
              <span v-else>
                <strong class="font-weight-normal">{{item.discount/10}}</strong>折
              </span>
            </div>
            <div class="right-part flex-1 overflow-hidden">
              <h5 class="fz-16 text-overflow-hidden">{{item.couponsName}}</h5>
              <p class="date fz-10 mt-1">{{item.beginDate | dateFilter}} - {{item.expireDate | dateFilter}}</p>
              <p class="tip fz-10 mt-1" v-if="item.type==1&&item.useMoneyCondition>0">
                满{{item.useMoneyCondition}}元可用
              </p>
              <p class="tip fz-10 mt-1" v-if="item.type==2&&item.useMoneyTop>0">
                最高可抵{{item.useMoneyTop}}元
              </p>
            </div>
          </div>
          <div class="bottom-content flex-row align-items-center">
            <span class="fz-12 ml-5 text-overflow-hidden">{{item.detail}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="common-loading" v-show="!allLoaded">
      <mt-spinner type="snake"></mt-spinner>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    couponType: {
      required: true
    }
  },
  data() {
    return {
      couponList: null,
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

  filters: {
    dateFilter(val) {
      let tmp = val.replace(/-/g, '.').split(':')
      tmp.pop()
      return tmp.join(':')
    }
  },

  methods: {
    calcFontSize(item) {
      let txt
      if (item.type == 1) {
        txt = item.money
      } else {
        txt = item.discount
      }
      let length = String(txt).length
      if (length > 5) {
        return 'fz-12'
      }
      if (length > 4) {
        return 'fz-15'
      }
      return 'fz-18'
    },
    loadMore() {
      this.loading = true
      this.$service.getCouponList(this.couponType, this.page).then(res => {
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
    }
  }
}
</script>

<style lang="scss">
.coupon-list-container {
  li {
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
    border-radius: px2vw(4);
    &.disabled {
      .coupon-item .top-content {
        background-image: url('../img/hcd-coupon-disable.png');
      }
    }
  }
  .coupon-item {
    .top-content {
      height: 25vw;
      background-image: url('../img/hcd-coupon.png');
      background-size: contain;
      background-color: white;
      background-repeat: no-repeat;
      .left-part {
        width: 28%;
        border-right: 1px dashed #fff;
        margin-right: 6vw;
        strong {
          font-size: 1.9em;
        }
      }
    }
    .bottom-content {
      height: px2vw(34);
    }
  }
}
</style>
