<template>
  <div class="wallet flex-col">
    <div class="balance-overview flex-row align-items-center justify-content-between mb-3 bg-white pl-5 pr-5">
      <div class="balance">
        <p class="color-gray fz-13">账户余额</p>
        <div class="fz-13"><strong class="fz-36">{{userMoney}}</strong>元</div>
      </div>
      <mt-button type="primary" size="small" @click="$router.push({name: 'recharge'})">去充值</mt-button>
    </div>
    <div class="balance-detail bg-white flex-1 flex-col">
      <div class="head-title flex-row align-items-center justify-content-between pl-5 pr-5">
        <h3 class="fz-18">余额明细</h3>
        <router-link :to="{name: 'invoice'}" class="has-arrow fz-14 color-dark">开发票</router-link>
      </div>
      <div v-if="dataList && !dataList.length" class="no-data">
        <img src="@/assets/img/no-data.png" alt="">
        <p>暂无明细</p>
      </div>
      <ul v-else class="overflow-auto flex-1 pl-5 pr-5" v-infinite-scroll="loadMore" infinite-scroll-disabled="infiniteScrollDisabled" infinite-scroll-distance="10">
        <li v-for="(item, index) in dataList" :key="index">
          <div class="detail-item flex-row align-items-center justify-content-between">
            <div class="left">
              <div class="title">{{item.actionCodeText}}</div>
              <div class="date">{{item.addTime}}</div>
            </div>
            <div class="right" :class="{desc:item.actionIncDecType=='DEC'}">
              <span v-if="item.amount>0">+</span>{{item.amount | moneyFilter}}
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
      userMoney: '-',
      dataList: null,
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
    this.$service.getUserMoney().then(res => {
      this.userMoney = res.data.userMoney
    })
  },

  methods: {
    loadMore() {
      this.loading = true
      this.$service.getUserMoneyDetail(this.page).then(res => {
        let result = res.data
        if (!this.dataList) {
          this.dataList = []
        }
        this.dataList = this.dataList.concat(result.rows)
        if (result.pages <= this.page) {
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
.wallet {
  .balance-overview {
    height: px2vw(92);
  }
  .balance-detail {
    padding: 4vw 0;
    .head-title {
      margin-bottom: 1vw;
    }
    li {
      border-bottom: 1px solid #e7e7e7;
      &:last-of-type{
        border: 0
      }
    }
    .detail-item {
      .left {
        font-size: px2vw(14);
        .title {
          color: #9b9b9b;
          margin-top: 3vw;
        }
        .date {
          color: #999999;
          margin-top: 2vw;
          margin-bottom: 3vw;
        }
      }
      .right {
        font-size: px2vw(18);
      }
      .desc {
        color: $color-main;
      }
    }
  }
}
</style>
